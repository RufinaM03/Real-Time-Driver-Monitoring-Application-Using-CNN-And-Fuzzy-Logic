# 🚗 Real-Time Driver Monitoring Application Using CNN and Fuzzy Logic

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![TensorFlow](https://img.shields.io/badge/TensorFlow-Deep%20Learning-orange.svg)
![Flask](https://img.shields.io/badge/Flask-Backend-green.svg)
![Computer Vision](https://img.shields.io/badge/Computer%20Vision-OpenCV-blueviolet.svg)
![MediaPipe](https://img.shields.io/badge/MediaPipe-Face%20Mesh-red.svg)
![Status](https://img.shields.io/badge/Project-Academic-success.svg)

A real-time **Driver Monitoring System (DMS)** that detects **driver drowsiness and distraction** using **Convolutional Neural Networks (CNN)**, **Fuzzy Logic**, **MediaPipe**, and **Computer Vision**.

## 📌 Overview

Driver fatigue and distraction are among the leading causes of road accidents.  
This project presents a **non-intrusive, camera-based AI solution** that continuously monitors the driver and classifies attention levels in real time.

The system categorizes driver state as:
- **Focused**
- **Slightly Drowsy**
- **Drowsy**
- **Distracted**

Alerts are generated when unsafe driving behavior is detected.

## 🧠 System Architecture

**Processing Pipeline**
1. Webcam captures 4-second video clips
2. Backend converts video and extracts frames
3. MediaPipe detects facial landmarks
4. CNN predicts eye openness
5. Head pose estimation detects distraction
6. Fuzzy Logic infers driver attention state
7. Result is sent to frontend with alerts

<img width="1079" height="793" alt="image" src="https://github.com/user-attachments/assets/b8b4024b-3bc8-4779-9303-c803f609447d" />

## 📂 Repository Structure

```
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
├── eye_status_model.h5
│
└── README.md
```

## 🛠️ Technologies Used

### Programming & Frameworks
- Python
- Flask
- TensorFlow / Keras
- OpenCV
- MediaPipe
- NumPy
- Matplotlib

### AI & Vision Techniques
- Convolutional Neural Networks (CNN)
- Fuzzy Logic Inference System
- Facial Landmark Detection
- Head Pose Estimation (`solvePnP`)

## 📊 Dataset

- **Dataset**: UnityEyes Drowsiness Detection Dataset
- **Total Images**: 1,363
  - Open Eyes: 659
  - Closed Eyes: 704

### Preprocessing
- Grayscale conversion
- Resize to `64 × 64`
- Normalization (0–1)
- Data augmentation (flip, brightness, rotation)
- Train / Validation / Test split: **70 / 15 / 15**

## 🧠 CNN Model Architecture

- Input: `64 × 64 × 1`
- Conv2D + ReLU + MaxPooling (3 layers)
- Dense (256 neurons)
- Dropout (0.5)
- Output: Sigmoid (binary classification)

**Optimizer**: Adam  
**Loss Function**: Binary Crossentropy  
**Epochs**: 50  
**Batch Size**: 32  

## 🧩 Fuzzy Logic Decision System

CNN eye-openness predictions are mapped into fuzzy membership functions:

| State | Description |
|------|-------------|
| Focused | Eyes open consistently |
| Slightly Drowsy | Partial eye closure |
| Drowsy | Prolonged eye closure |

If head pose angles exceed **±15°**, the system overrides the result to **Distracted**.

## ⚙️ Backend Implementation

- Flask-based REST API
- Endpoint: `/upload`
- Converts `.webm` → `.mp4` using FFmpeg
- Samples frames and performs CNN inference
- Returns JSON response:

```json
{
  "pred": 0.2653,
  "result": "Focused"
}
```

## 🚀 How to Run the Project
1️⃣ Clone the Repository
```bash
git clone https://github.com/RufinaM03/Real-Time-Driver-Monitoring-Application-Using-CNN-And-Fuzzy-Logic.git
cd Real-Time-Driver-Monitoring-Application-Using-CNN-And-Fuzzy-Logic
```

2️⃣ Install Dependencies
```bash
pip install tensorflow opencv-python mediapipe flask numpy matplotlib
```

3️⃣ Run Backend

Open and run:

Driver_Monitoring_System_Backend.ipynb

4️⃣ Run Frontend

Open:

Web-page/index.html


Allow webcam access and start monitoring.

## 🎯 Results

- Accurate real-time detection of drowsiness and distraction

- Robust under varying lighting conditions

- Low-latency predictions suitable for real-time use

- Visual alerts and live prediction graphs

## 📈 Future Enhancements

- Mobile and embedded deployment

- Night-time infrared camera support

- Driver emotion recognition

- Cloud-based analytics dashboard

- Multi-driver tracking

## 👩‍💻 Author

Rufina M
Integrated M.Tech (Computer Science Engineering)
Vellore Institute of Technology, Vellore
March 2025

## 📜 License

This project is for academic and educational purposes.

