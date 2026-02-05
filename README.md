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

```

### 2. Setup Frontend (The Interface)

```bash
# Go to the main project folder
npm install

# Start the frontend server
npm run dev

```

*The app will run at `http://localhost:8080*`

### 3. Setup Backend (The Brain)

Open a **new terminal** and run:

```bash
cd server

# Create virtual environment (Mac/Linux)
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the Python Server
uvicorn main:app --reload --port 8001

```

*The server will run at `http://127.0.0.1:8001*`

---

## 🔑 Environment Variables

To make the AI work, you need a Google Gemini API Key.

1. Create a `.env` file in the `server/` folder.
2. Add your key:

```env
GOOGLE_API_KEY=your_actual_api_key_here

```

---

## 📸 How It Works

1. **The Chat:** Users talk to the AI. If they type a safe message, the AI replies helpful advice.
2. **The Trigger:** If a user types "I am suicidal", the **Safety Net** activates immediately, showing the Red Alert Box.
3. **The Journal:** Users submit daily thoughts. The Python backend calculates a stress score (e.g., 8/10) and saves it to `journal.db`.
4. **The Graph:** The Insights page fetches these scores to draw the recovery curve.

---

## 🛡️ Future Improvements

* [ ] Integration with real SMS/WhatsApp APIs (Twilio) for alerts.
* [ ] User authentication (Login/Signup).
* [ ] Voice-to-Text journaling support.

---

Made with ❤️ by Rohit and team.

```

