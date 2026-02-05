# 🧠 EchoCare - AI-Powered Mental Health Companion

**EchoCare** is an early-intervention mental health platform designed to bridge the gap between students and professional help. It uses AI to detect high-stress markers in real-time conversations and journaling, providing immediate "Safety Net" alerts and tracking mental well-being over time.

---

## 🚀 Key Features

### 1. 🤖 Empathetic AI Companion ("Dr. Sharma")
- A real-time chat interface powered by **Google Gemini AI**.
- Trained to listen without judgment and provide grounding techniques.
- **Safety Net Logic:** Instantaneously detects high-risk keywords (e.g., "suicidal", "kill", "die") locally on the frontend to trigger emergency protocols, even if the AI response is blocked.

### 2. 🚨 Emergency Risk Detection
- **Real-time Alert System:** If high stress is detected, a prominent "High Stress Detected" alert appears.
- **One-Click Connection:** A "Connect to Doctor" button that simulates (or sends) an urgent email with the user's status to a designated medical professional.

### 3. 📔 AI-Analysed Journaling
- Guided prompts like *"What emotion have I been carrying today?"*.
- **Sentiment Analysis:** The backend analyzes every entry to calculate a "Stress Score" (1-10) and detects emotional tone (Happy, Sad, Stressed, Calm).

### 4. 📊 Weekly Mental Health Insights
- Visualizes the user's stress trends over the last 7 days using dynamic graphs.
- Helps users and counselors track improvements or declines in mental state.

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Python, FastAPI, Uvicorn
- **AI Model:** Google Gemini 1.5 Flash (via API)
- **Database:** SQLite (Lightweight local storage)
- **Visualization:** Recharts (for data graphs)

---

## ⚙️ Installation & Setup

Follow these steps to run EchoCare locally on your machine.

### Prerequisites
- Node.js & npm installed
- Python 3.10+ installed

### 1. Clone the Repository
```bash
git clone [https://github.com/rohit-356/Echo-care.git](https://github.com/rohit-356/Echo-care.git)
cd Echo-care
