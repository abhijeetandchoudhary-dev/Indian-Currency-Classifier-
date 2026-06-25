# AI-Based Currency Classifier for Visually Impaired Users

## Title Page Content
**Project Title:** AI-Based Currency Classifier for Visually Impaired Users  
**Course:** Innovation and Design Thinking Laboratory  
**Course Code:** BSDID208  
**Institution:** East West Institute of Technology  
**Department / Branch:** Department of Computer Science / Information Science  
**Guide:** Asst. Prof. Raksha S R  
**Team Members:** [Student Name 1], [Student Name 2], [Student Name 3], [Student Name 4]

## Certificate
This is to certify that the project entitled **AI-Based Currency Classifier for Visually Impaired Users** has been successfully completed by the students mentioned above under my guidance in partial fulfillment of the requirements for the course mentioned above.

## Declaration
We hereby declare that the work presented in this report is our own and has not been submitted elsewhere for any academic award.

## Acknowledgement
We express our sincere gratitude to our guide, faculty members, and all who supported us during the development of this project. Their guidance and encouragement helped us understand the practical application of computer vision and accessibility technologies.

## Abstract
This project presents an AI-based currency recognition system designed to assist visually impaired users in identifying Indian currency notes. The system uses a camera to capture the image of a note, processes the image, and determines the denomination using image matching and/or AI-based inference. The detected value is displayed on the screen and also spoken aloud using a text-to-speech engine. The main objective of the project is to provide a simple, affordable, and user-friendly solution for improving independence and reducing errors during cash handling.

## 1. Introduction
Currency recognition is an important part of daily life, especially in environments where cash transactions are still common. For visually impaired individuals, identifying paper notes manually can be difficult because different currencies vary in size, color, design, and texture. In such situations, dependence on other people or guesswork may reduce confidence and create the risk of incorrect transactions.

With the advancement of computer vision and artificial intelligence, it has become possible to design systems that can detect and classify currency notes automatically. This project focuses on developing a practical solution that can identify Indian currency notes using camera input and provide both visual and audio feedback. The approach is intended to be accessible, low-cost, and easy to use for people who need assistance in recognizing notes.

## 2. Problem Statement
Visually impaired users often face difficulty in identifying and distinguishing currency notes during everyday activities such as shopping, travel, and banking. Since notes can look similar from certain angles and lighting conditions, recognition errors may lead to confusion, financial loss, and inconvenience. A system that can capture an image, interpret the denomination, and give immediate spoken output can improve accessibility and support more independent handling of cash.

## 3. Objectives
The main objectives of this project are:
- To design a system that detects Indian currency notes using camera input.
- To identify the denomination using image processing and matching techniques.
- To provide both visual display and audio output for better accessibility.
- To create a simple interface that is useful for visually impaired users.
- To develop a practical solution using commonly available software and hardware tools.

## 4. Literature Background
Several studies in computer vision and accessibility have explored the use of image processing for currency recognition. Many approaches use shape, color, texture, and edge information to distinguish one note from another. In addition, speech output has been widely used in assistive systems to provide users with immediate feedback without requiring visual reading.

This project is based on a similar idea but is specifically designed for Indian currency notes. The implementation combines a desktop-based Python application with a web-based version that can use camera access and optional cloud inference. This makes the solution flexible while still focusing on practical usability.

## 5. Methodology / Working Principle
The working of the system is as follows:
1. The camera captures an image of the currency note.
2. The image is processed to improve clarity and remove noise.
3. The system compares the image with stored templates or prediction results.
4. The denomination with the highest similarity is selected.
5. The result is shown on the screen.
6. The identified value is also spoken aloud using a text-to-speech engine.

The desktop version uses Python, OpenCV, and template matching, while the web-based version uses a browser interface and can optionally send the captured image to an inference service for recognition.

## 6. System Design
The system is designed to be simple and accessible. A user points the camera toward the note, the application processes the frame, and the detected denomination is shown to the user. If the system is able to identify the note confidently, the result is also announced through speech output. This design helps reduce the difficulty of recognizing notes without requiring advanced technical knowledge.

## 7. Tools and Technologies
- Python
- OpenCV
- NumPy
- pyttsx3
- HTML, CSS, and JavaScript
- Optional Roboflow API for web-based inference

## 8. Results and Discussion
The system is able to detect and display the denomination when the note is visible clearly and held steadily in front of the camera. The output is shown on the screen and, where supported, spoken aloud to assist the user. This demonstrates that the system can act as a useful support tool for real-time currency recognition.

The performance of the system depends on factors such as lighting, image sharpness, camera quality, and the quality of the template dataset. In cases of poor image quality or partially visible notes, the recognition result may become less reliable. These observations show that environmental conditions are important for maintaining accuracy.

## 9. Advantages and Limitations
### Advantages
- Helps visually impaired users identify currency notes independently.
- Provides both visual and audio feedback.
- Uses affordable and widely available tools.
- Can work with a webcam or mobile camera.

### Limitations
- Accuracy may reduce under poor lighting or blurred images.
- Worn or partially visible notes may be difficult to recognize.
- Template-based recognition depends on the quality of the dataset.
- Web-based inference may depend on internet connectivity.

## 10. Future Scope
The project can be improved in several ways:
- Add support for more currencies and denominations.
- Improve recognition accuracy using advanced AI models.
- Develop a mobile application for easier access.
- Add multilingual voice feedback.
- Support offline recognition for better reliability.
- Include counterfeit detection features.

## 11. Conclusion
The AI-Based Currency Classifier is a practical solution for helping visually impaired users identify Indian currency notes more easily. By combining image processing with voice feedback, the system improves accessibility, reduces uncertainty, and supports safer cash handling. With further development, the project has strong potential to become a more accurate and widely usable assistive tool.

## 12. References
1. Gonzalez, R. C., & Woods, R. E. Digital Image Processing. Pearson Education.
2. Szeliski, R. Computer Vision: Algorithms and Applications. Springer.
3. Bishop, C. M. Pattern Recognition and Machine Learning. Springer.
4. OpenCV Official Documentation. Available at: https://docs.opencv.org/
5. pyttsx3 Official Documentation. Available at: https://pyttsx3.readthedocs.io/
6. Roboflow Documentation. Available at: https://docs.roboflow.com/
7. World Health Organization (WHO). World Report on Vision. Geneva: WHO.
