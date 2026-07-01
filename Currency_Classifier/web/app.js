// DOM Elements
const video = document.getElementById('webcam');
const clickOverlay = document.getElementById('clickOverlay');
const scanBtn = document.getElementById('scanBtn');
const resultBox = document.getElementById('resultBox');
const resultText = document.getElementById('resultText');
const confidenceText = document.getElementById('confidenceText');
const scannerLine = document.getElementById('scannerLine');
const cameraBtn = document.getElementById('cameraBtn');

let isScanning = false;
let currentFacingMode = 'environment';
let currentStream = null;

function stopCurrentStream() {
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
        currentStream = null;
    }

    if (video.srcObject) {
        video.srcObject = null;
    }
}

// Initialize Webcam
async function setupWebcam(facingMode = currentFacingMode) {
    try {
        // Request rear or front camera on mobile
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode },
            audio: false
        });
        stopCurrentStream();
        currentFacingMode = facingMode;
        currentStream = stream;
        video.srcObject = stream;
    } catch (err) {
        console.error("Camera access denied or error:", err);
        showResult("Camera access denied", "Please enable camera permissions.");
        speak("Camera access denied. Please enable camera permissions.");
    }
}

async function toggleCamera() {
    const nextFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
    await setupWebcam(nextFacingMode);
}

function cleanupCamera() {
    stopCurrentStream();
}

// Convert video frame to base64 string
function captureFrameAsBase64() {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Canvas context unavailable');
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    // Return base64 string (remove the "data:image/jpeg;base64," prefix for Roboflow)
    return canvas.toDataURL('image/jpeg').split(',')[1];
}

// Speak text out loud using Web Speech API
function speak(text) {
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
    } else {
        console.warn("Text-to-Speech not supported in this browser.");
    }
}

// Update UI
function showResult(title, subtitle = "", isSuccess = false) {
    resultBox.classList.remove('hidden');
    resultText.innerText = title;
    confidenceText.innerText = subtitle;

    if (isSuccess) {
        resultBox.classList.add('success');
    } else {
        resultBox.classList.remove('success');
    }
}

// The core scanning logic
async function performScan() {
    if (isScanning) return;

    // Client now calls server-side /api/infer, so no frontend API key check is needed.
    if (!video.videoWidth || !video.videoHeight) {
        showResult("Camera not ready", "Wait a moment and try again");
        speak("Camera is not ready yet. Please try again.");
        return;
    }

    isScanning = true;

    // UI Updates
    scannerLine.classList.remove('hidden');
    showResult("Scanning...", "Please hold the camera steady");

    // Play a small feedback sound if needed (optional)
    speak("Scanning");

    try {
        // 1. Capture the image
        const base64Image = captureFrameAsBase64();

        // 2. Call local Vercel API proxy (API key is stored server-side).
        const apiUrl = `/api/infer`;

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ image: base64Image })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Roboflow Response:", data);

        // 3. Process the results
        if (data.predictions && data.predictions.length > 0) {
            // Sort predictions by confidence (highest first)
            data.predictions.sort((a, b) => b.confidence - a.confidence);

            const bestMatch = data.predictions[0];
            const className = bestMatch.class;
            const confidenceVal = bestMatch.confidence * 100;
            const confidenceStr = confidenceVal.toFixed(1);

            if (confidenceVal >= 60) {
                // High confidence - definitely correct
                showResult(`${className} ₹`, `High Confidence: ${confidenceStr}%`, true);
                speak(`${className} Rupees.`);
            } else if (confidenceVal >= 30) {
                // Medium confidence - might be correct, but warn user
                showResult(`${className} ₹ (?)`, `Low Confidence: ${confidenceStr}%. Try again.`, false);
                speak(`I think it is ${className} Rupees, but please scan again to be sure.`);
            } else {
                // Very low confidence - likely a false positive
                showResult("Unsure", `Confidence too low (${confidenceStr}%). Try again.`);
                speak("I am not sure. Please bring the note closer to the camera and scan again.");
            }

        } else {
            showResult("No currency detected", "Try bringing it closer");
            speak("No currency detected. Please try again.");
        }

    } catch (error) {
        console.error("Scanning Error:", error);
        showResult("Error scanning", "Check internet or API key");
        speak("Error scanning. Please check your internet connection.");
    } finally {
        isScanning = false;
        scannerLine.classList.add('hidden');
    }
}

// Event Listeners
// Both clicking the big button OR tapping the video feed triggers the scan
scanBtn.addEventListener('click', performScan);
clickOverlay.addEventListener('click', performScan);
cameraBtn.addEventListener('click', toggleCamera);

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    setupWebcam();
    // Warm up the speech engine (browsers require user interaction to allow speech)
    // We attach a one-time invisible speech init to the first click
    const warmUpSpeech = () => {
        const u = new SpeechSynthesisUtterance('');
        u.volume = 0;
        window.speechSynthesis.speak(u);
        document.removeEventListener('click', warmUpSpeech);
    };
    document.addEventListener('click', warmUpSpeech);
});

window.addEventListener('pagehide', cleanupCamera);
window.addEventListener('beforeunload', cleanupCamera);
