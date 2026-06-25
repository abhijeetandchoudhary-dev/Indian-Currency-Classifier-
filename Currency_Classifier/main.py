import cv2
import time
from utils import init_speech, speak_denomination, load_templates, detect_currency

def main():
    print("=========================================")
    print("Initializing Indian Currency Classifier...")
    print("=========================================")
    
    # 1. Initialize text-to-speech engine
    engine = init_speech()
    if engine is None:
        print("Failed to start voice engine. Visuals only.")

    # 2. Load currency templates from dataset folder
    templates = load_templates("dataset")
    if not templates:
        print("No templates found in 'dataset/' folder.")
        print("Please add images (like 10.jpg, 100.jpg) and restart.")
        return

    # 3. Open the laptop webcam
    # cv2.VideoCapture(0) usually points to the built-in webcam
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Error: Could not open webcam.")
        return

    print("Starting webcam. Show currency notes to the camera.")
    print("Press 'q' in the video window to quit.")

    last_speech_time = 0
    speech_cooldown = 3.0  # Seconds between announcements

    while True:
        # Read a frame from the webcam
        ret, frame = cap.read()
        if not ret:
            print("Failed to grab frame.")
            break

        # Detect currency in the frame
        denomination, top_left, shape = detect_currency(frame, templates, threshold=0.55)

        if denomination and top_left and shape:
            # Draw a bounding box around the detected note
            bottom_right = (top_left[0] + shape[0], top_left[1] + shape[1])
            cv2.rectangle(frame, top_left, bottom_right, (0, 255, 0), 2)
            
            # Put text label on the frame
            label = f"Rupees: {denomination}"
            cv2.putText(frame, label, (top_left[0], top_left[1] - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

            # Check if cooldown has passed to announce the note again
            current_time = time.time()
            if current_time - last_speech_time > speech_cooldown:
                announcement = f"{denomination} Rupees"
                print(f"Detected: {announcement}")
                speak_denomination(engine, announcement)
                last_speech_time = current_time

        # Display the resulting frame
        cv2.imshow('Indian Currency Classifier (Press "q" to quit)', frame)

        # Wait for 1 ms and check if the user pressed 'q'
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Clean up and release resources
    cap.release()
    cv2.destroyAllWindows()
    print("Application closed.")

if __name__ == "__main__":
    main()
