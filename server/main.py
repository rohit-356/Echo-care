from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import requests
import sqlite3 
import datetime
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- CONFIGURATION ---
GOOGLE_API_KEY = "AIzaSyCdT0Hw_cGmpEQthe-96JmRs5c0E7NXDqM"
DEV_MODE = False  
MODEL_NAME = "gemini-1.5-flash"

# --- KEYWORDS ---
KEYWORDS_GOOD = ["happy", "calm", "peaceful", "relaxed", "motivated", "hopeful", "confident", "grateful", "content", "balanced", "energetic", "excited", "proud", "optimistic", "satisfied", "comfortable", "joyful", "cheerful", "focused", "productive", "inspired", "secure", "thankful", "steady", "mindful", "encouraged", "refreshed", "positive", "stable", "supported", "loved", "great", "good"]
KEYWORDS_STRESS = ["tired", "stressed", "anxious", "worried", "nervous", "overwhelmed", "distracted", "frustrated", "confused", "restless", "pressured", "exhausted", "uneasy", "irritated", "burned out", "drained", "tense", "lonely", "bored", "disappointed", "uncertain", "afraid", "demotivated", "unhappy", "overthinking", "stuck", "weak", "insecure", "low", "uncomfortable", "bad", "angry"]
KEYWORDS_RISK = ["hopeless", "worthless", "empty", "numb", "broken", "isolated", "helpless", "lost", "useless", "tired of everything", "no purpose", "giving up", "nothing matters", "alone always", "hate myself", "failure", "unwanted", "trapped", "scared of future", "done with life", "mentally exhausted", "emotionally drained", "no motivation", "feel invisible", "cannot cope", "pointless", "dead inside", "overwhelming pain", "suicid", "hurt myself", "hurt", "die"]

def init_db():
    conn = sqlite3.connect('journal.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS entries
                 (id INTEGER PRIMARY KEY, timestamp TEXT, user_text TEXT, ai_response TEXT, mood TEXT, risk_score INTEGER)''')
    conn.commit()
    conn.close()

init_db()

class JournalEntry(BaseModel):
    text: str

def save_to_db(text, ai_response, mood, risk_score):
    try:
        conn = sqlite3.connect('journal.db')
        c = conn.cursor()
        timestamp = datetime.datetime.now().isoformat()
        c.execute("INSERT INTO entries (timestamp, user_text, ai_response, mood, risk_score) VALUES (?, ?, ?, ?, ?)",
                  (timestamp, text, ai_response, mood, risk_score))
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"❌ DB ERROR: {e}")

def detect_mood_locally(text):
    text = text.lower()
    if any(w in text for w in KEYWORDS_RISK): return "stressed", 8
    if any(w in text for w in KEYWORDS_STRESS): return "stressed", 5
    if any(w in text for w in KEYWORDS_GOOD): return "happy", 2
    return "neutral", 1

@app.post("/analyze")
async def analyze_journal(entry: JournalEntry):
    # 1. Local Check
    local_mood, local_risk = detect_mood_locally(entry.text)

    # 2. AI Request (With Safety Settings Unlocked)
    ai_response_text = "I am listening. Please tell me more."
    final_mood = local_mood
    final_risk = local_risk

    if not DEV_MODE:
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_NAME}:generateContent?key={GOOGLE_API_KEY}"
            prompt = f"""
            You are an empathetic mental health companion named EchoCare. 
            User input: "{entry.text}"
            
            Task:
            1. Respond with deep empathy, validation, and a specific, helpful suggestion.
            2. Keep it under 3 sentences.
            3. Do not be generic.
            
            Format:
            [Your Message Here] ||MOOD:one_word|| ||RISK:1-10||
            """
            
            # UNLOCKING THE SAFETY FILTERS HERE:
            payload = {
                "contents": [{"parts": [{"text": prompt}]}],
                "safetySettings": [
                    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
                    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
                    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
                    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"}
                ]
            }
            
            response = requests.post(url, json=payload)
            data = response.json()
            
            # DEBUGGING: Print error if it happens
            if "error" in data:
                print(f"⚠️ GOOGLE API ERROR: {data['error']}")
            
            if "candidates" in data and data["candidates"]:
                raw_text = data["candidates"][0]["content"]["parts"][0]["text"]
                ai_response_text = raw_text.split("||")[0].strip()
                
                if "MOOD:" in raw_text:
                    final_mood = raw_text.split("MOOD:")[1].split("||")[0].strip().lower()
                if "RISK:" in raw_text:
                    try:
                        risk_string = raw_text.split("RISK:")[1].split("||")[0].strip().replace("*", "")
                        final_risk = int(risk_string)
                    except:
                        pass
            else:
                print("⚠️ AI blocked the response due to safety filters.")
                
        except Exception as e:
            print(f"❌ SERVER CRASH: {e}")

    # 3. Save & Return
    save_to_db(entry.text, ai_response_text, final_mood, final_risk)
    return {"analysis": ai_response_text, "mood": final_mood, "alert": final_risk >= 7}

# --- HISTORY & DELETE ENDPOINTS ---
@app.get("/history")
def get_history():
    conn = sqlite3.connect('journal.db')
    c = conn.cursor()
    c.execute("SELECT * FROM entries ORDER BY id DESC LIMIT 20")
    rows = c.fetchall()
    conn.close()
    return [{"id": r[0], "timestamp": r[1], "text": r[2], "ai_response": r[3], "mood": r[4], "risk_score": r[5]} for r in rows]

@app.get("/pattern")
def analyze_pattern():
    conn = sqlite3.connect('journal.db')
    c = conn.cursor()
    seven_days_ago = (datetime.datetime.now() - timedelta(days=7)).isoformat()
    c.execute("SELECT user_text FROM entries WHERE timestamp > ?", (seven_days_ago,))
    rows = c.fetchall()
    conn.close()
    
    full_text = " ".join([r[0] for r in rows]).lower()
    good = sum(1 for w in KEYWORDS_GOOD if w in full_text)
    stress = sum(1 for w in KEYWORDS_STRESS if w in full_text)
    risk = sum(1 for w in KEYWORDS_RISK if w in full_text)

    status, msg, color = "Neutral", "Your week has been quiet.", "gray"
    if risk > 0: status, msg, color = "Requires Attention", "High distress detected. Prioritize self-care.", "red"
    elif stress > good: status, msg, color = "High Stress", "You seem overwhelmed. Try breathing exercises.", "orange"
    elif good > stress: status, msg, color = "Positive Flow", "You're doing great!", "green"

    return {"status": status, "message": msg, "color": color, "breakdown": {"good": good, "stress": stress, "risk": risk}}

@app.delete("/clear_data")
def clear_data():
    try:
        conn = sqlite3.connect('journal.db')
        c = conn.cursor()
        c.execute("DELETE FROM entries")
        conn.commit()
        conn.close()
        return {"message": "Deleted"}
    except Exception as e:
        return {"error": str(e)}
    # --- NEW: EMAIL ALERT SYSTEM ---
class EmailRequest(BaseModel):
    user_email: str

@app.post("/send-alert")
async def send_alert(req: EmailRequest):
    print(f"🚨 URGENT: High Stress Alert received for {req.user_email}")
    
    # --- OPTION 1: SIMULATION (Works Instantly) ---
    print(f"📧 SIMULATED EMAIL SENT TO: help@echocare.com")
    print(f"Subject: URGENT HELP NEEDED")
    print(f"Body: User {req.user_email} has reported high stress/risk.")
    
    # --- OPTION 2: REAL GMAIL (Uncomment to use) ---
    # import smtplib
    # from email.mime.text import MIMEText
    # sender = "YOUR_GMAIL@gmail.com"
    # password = "YOUR_APP_PASSWORD"  # Get this from Google Account > Security
    # receiver = "DOCTOR_EMAIL@gmail.com"
    
    # msg = MIMEText(f"High risk detected for user: {req.user_email}. Please contact immediately.")
    # msg["Subject"] = "🚨 EchoCare Emergency Alert"
    # msg["From"] = sender
    # msg["To"] = receiver
    
    # with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
    #    server.login(sender, password)
    #    server.send_message(msg)
    
    return {"status": "sent", "message": "Help is on the way!"}