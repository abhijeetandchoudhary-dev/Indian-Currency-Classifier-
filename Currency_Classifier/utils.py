import cv2
import numpy as np
import pyttsx3
import os

def init_speech():
    """
    Initialize the pyttsx3 text-to-speech engine.
    """
    try:
        engine = pyttsx3.init()
        # Set speech rate to be comfortable
        engine.setProperty('rate', 150)
        return engine
    except Exception as e:
        print(f"Error initializing speech engine: {e}")
        return None

def speak_denomination(engine, text):
    """
    Speak the given text.
    """
    if engine:
        engine.say(text)
        engine.runAndWait()

def load_templates(dataset_path="dataset"):
    """
    Load all currency templates from the dataset folder.
    Filenames should be like '10.jpg', '100.jpg', etc.
    Returns a dictionary mapping denomination (string) to grayscale image template.
    """
    templates = {}
    if not os.path.exists(dataset_path):
        os.makedirs(dataset_path)
        print(f"Created '{dataset_path}' folder. Please add currency images (e.g., 10.jpg, 100.jpg) here.")
        return templates

    for filename in os.listdir(dataset_path):
        if filename.endswith(".jpg") or filename.endswith(".png"):
            # Extract denomination from filename (e.g., '10.jpg' -> '10')
            denomination = os.path.splitext(filename)[0]
            img_path = os.path.join(dataset_path, filename)
            
            # Read the template image in grayscale
            template = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
            if template is not None:
                templates[denomination] = template
            else:
                print(f"Failed to load {img_path}")
                
    print(f"Loaded {len(templates)} templates.")
    return templates

def detect_currency(frame, templates, threshold=0.6):
    """
    Detect the highest matching currency template in the given frame.
    Returns the detected denomination, its location bounding box, and template shape.
    """
    if not templates:
        return None, None, None

    # Convert the current webcam frame to grayscale
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
    best_match = None
    best_val = 0
    best_loc = None
    best_template_shape = None

    for denomination, template in templates.items():
        # Ensure frame is larger than template
        if gray_frame.shape[0] < template.shape[0] or gray_frame.shape[1] < template.shape[1]:
            continue
            
        # Perform template matching
        res = cv2.matchTemplate(gray_frame, template, cv2.TM_CCOEFF_NORMED)
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
        
        # If this template is the best match so far, save it
        if max_val > best_val:
            best_val = max_val
            best_match = denomination
            best_loc = max_loc
            best_template_shape = template.shape[::-1] # (width, height)

    # Return match if it exceeds the confidence threshold
    if best_val >= threshold:
        return best_match, best_loc, best_template_shape
    return None, None, None
