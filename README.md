🚗 Real-Time Driver Monitoring Application Using CNN and Fuzzy Logic

A real-time Driver Monitoring System (DMS) that detects driver drowsiness and distraction using Convolutional Neural Networks (CNN), Fuzzy Logic, MediaPipe, and Computer Vision.
The system analyzes eye states and head pose from live video streams to classify the driver’s attention level and trigger alerts when unsafe behavior is detected.

In the 'Web-page directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

.

📌 Project Overview

Road accidents caused by driver fatigue and inattention are a major global concern.
This project proposes a non-intrusive, camera-based solution that continuously monitors the driver and classifies their state as:

Focused

Slightly Drowsy

Drowsy

Distracted

The system combines:

Deep Learning (CNN) for eye-state detection

MediaPipe Face Mesh for facial landmark detection

Head Pose Estimation for distraction detection

Fuzzy Logic for human-like decision-making

🧠 System Architecture

Pipeline Overview:

Frontend captures 4-second webcam video

Backend converts video and extracts frames

MediaPipe detects face & eye landmarks

CNN predicts eye openness

Head pose is estimated (yaw, pitch, roll)

Fuzzy Logic classifies attention level

Result is sent back to frontend with alerts

📂 Repository Structure
├── Web-page/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── Driver_Monitoring_Model_Training.ipynb
│   # CNN training notebook
│
├── Driver_Monitoring_System_Backend.ipynb
│   # Flask backend for real-time inference
│
├── best_model.h5
│   # Trained CNN model
│
├── eye_status_model.h5
│   # Eye-state classification model
│
├── README.md

🛠️ Technologies Used
🔹 Programming & Frameworks

Python

Flask

TensorFlow / Keras

OpenCV

MediaPipe

NumPy

Matplotlib

🔹 AI & ML Techniques

Convolutional Neural Networks (CNN)

Fuzzy Logic Inference System

Computer Vision

Facial Landmark Detection

Head Pose Estimation (solvePnP)

📊 Dataset Details

Dataset: UnityEyes Drowsiness Detection Dataset (Kaggle)

Classes: Open Eyes / Closed Eyes

Total Images: 1,363

Open: 659

Closed: 704

Preprocessing Steps

Grayscale conversion

Image resizing to 64×64

Normalization (0–1)

Data augmentation (flip, brightness, rotation)

Train / Validation / Test split: 70 / 15 / 15

🧠 CNN Model Architecture

Input: 64 × 64 × 1 grayscale image

Conv2D (32 filters) + ReLU

MaxPooling (2×2)

Conv2D (64 filters) + ReLU

MaxPooling (2×2)

Conv2D (128 filters) + ReLU

MaxPooling (2×2)

Flatten

Dense (256) + ReLU

Dropout (0.5)

Output Layer (Sigmoid)

Loss Function: Binary Crossentropy
Optimizer: Adam
Epochs: 50
Batch Size: 32

🧩 Fuzzy Logic Decision System

The fuzzy inference system uses eye openness prediction values to classify driver state:

State	Description
Focused	Eyes open consistently
Slightly Drowsy	Intermittent eye closure
Drowsy	Prolonged eye closure

Head pose angles exceeding ±15° override predictions as Distracted for safety.

⚙️ Backend Implementation

Flask-based REST API

Accepts video via /upload endpoint

Converts .webm → .mp4 using FFmpeg

Extracts 10 frames per video

Processes each frame independently

Returns JSON response:

{
  "pred": 0.2653,
  "result": "Focused"
}

🎯 Results

Accurate real-time detection of:

Drowsiness

Slight drowsiness

Distraction

Robust performance across lighting conditions

Low-latency predictions suitable for real-time usage

Clear visual feedback and alerts on frontend

🚀 How to Run the Project
1️⃣ Clone the Repository
git clone https://github.com/RufinaM03/Real-Time-Driver-Monitoring-Application-Using-CNN-And-Fuzzy-Logic.git
cd Real-Time-Driver-Monitoring-Application-Using-CNN-And-Fuzzy-Logic

2️⃣ Install Dependencies
pip install tensorflow opencv-python mediapipe flask numpy matplotlib

3️⃣ Run Backend

Open and run:

Driver_Monitoring_System_Backend.ipynb

4️⃣ Open Frontend

Open Web-page/index.html in a browser
Allow webcam access and start monitoring.

📌 Future Enhancements

Mobile and embedded deployment

Driver emotion recognition

Multi-driver tracking

Night-time infrared camera support

Cloud-based analytics dashboard

👩‍💻 Author

Rufina M
Integrated M.Tech (CSE)
Vellore Institute of Technology, Vellore
📅 March 2025

📜 License

This project is for academic and educational purposes.

