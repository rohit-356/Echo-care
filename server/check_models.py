import requests
import os
from dotenv import load_dotenv

# Load your API Key
load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")

if not API_KEY:
    print("❌ Error: API Key not found. Check your .env file!")
else:
    print(f"🔑 Using API Key: {API_KEY[:5]}...***")
    
    # URL to list all available models
    url = f"https://generativelanguage.googleapis.com/v1beta/models?key={API_KEY}"
    
    try:
        response = requests.get(url)
        data = response.json()
        
        if "models" in data:
            print("\n✅ SUCCESS! Here are the models your key can use:\n")
            found_flash = False
            for model in data["models"]:
                # We only care about models that can "generateContent"
                if "generateContent" in model["supportedGenerationMethods"]:
                    name = model["name"].replace("models/", "")
                    print(f" - {name}")
                    if "flash" in name:
                        found_flash = True
            
            if not found_flash:
                print("\n⚠️ WARNING: No 'Flash' models found. Try using 'gemini-pro' instead.")
        else:
            print("\n❌ API Error:", data)
            
    except Exception as e:
        print(f"\n❌ Connection Error: {e}")