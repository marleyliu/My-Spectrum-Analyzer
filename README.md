# Signal Visualizer (React + Flask)

An interactive web application that allows users to generate and visualize signals in both the time domain and frequency domain.

Users can create custom signals by combining multiple tones, adjusting parameters like amplitude, frequency, sampling rate, number of cycles, and adding optional noise.

---

## Features

- Generate sine waves with customizable:
  - Amplitude
  - Frequency
  - Sampling rate
  - Number of cycles
- Add **multiple tones** to create composite signals
- Optional **white noise injection**
- Real-time visualization of:
  - Time-domain signal
  - Frequency-domain (FFT)
- Dynamic UI for adding/removing tones

---

## Tech Stack

### Frontend
- React (Vite)
- Chart.js (for plotting graphs)

### Backend
- Flask (Python)
- NumPy (signal generation & FFT)

<!-- TODO: Add any additional libraries or tools you used -->

# 📡 Signal Visualizer (React + Flask)

An interactive web application that allows users to generate and visualize signals in both the time domain and frequency domain.

Users can create custom signals by combining multiple tones, adjusting parameters like amplitude, frequency, sampling rate, number of cycles, and adding optional noise.

---

## 🚀 Features

- Generate sine waves with customizable:
  - Amplitude
  - Frequency
  - Sampling rate
  - Number of cycles
- Add **multiple tones** to create composite signals
- Optional **white noise injection**
- Real-time visualization of:
  - Time-domain signal
  - Frequency-domain (FFT)
- Dynamic UI for adding/removing tones

<!-- TODO: Add any extra features you implemented -->

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Chart.js (for plotting graphs)

### Backend
- Flask (Python)
- NumPy (signal generation & FFT)

<!-- TODO: Add any additional libraries or tools you used -->

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/marleyliu/My-Spectrum-Analyzer.git
cd react-vite-flask

**### Backend Setup**
cd server
python -m venv venv
source venv/bin/activate   # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python app.py
