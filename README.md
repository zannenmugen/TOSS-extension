Terms of Service Scanner (Chrome Extension)

An interactive Chrome extension that finds and analyzes Terms of Service, Privacy Policies, and similar legal documents with ease.

## 🔍 Features
- **Link Scraping**  
  Automatically detects ToS, Privacy Policy, and other legal links on any webpage.
- **URL Input**  
  Manually enter a URL to fetch its legal documents.
- **Data Analysis**  
  - **Gemini API Integration**: Queries top-level domain for immediate insights.  
  - **(Upcoming) Python Selenium Support**: Falls back to Selenium scraping when needed.
- **History Page**  
  Review a log of previously analyzed links.
- **Full Interactivity**  
  Smooth, user-friendly UI for seamless navigation.

## 🛠️ Tech Stack
- **Frontend**  
  React • TypeScript • Webpack • Chrome Extension APIs • Local Storage
- **Backend**  
  FastAPI • Gemini API • (Optional) Selenium
- **Additional**  
  MIT License

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/sachinpandit140/toss.git
cd toss
```

### 2. Install dependencies

#### Frontend
```bash
npm install
```

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate     # or `/.venv/Scripts/Activate.ps1` on Windows
pip install -r requirements.txt
```

### 3. Run the backend server
```bash
cd backend
uvicorn main:app --reload
```

### 4. Build the extension
```bash
cd ..
npm run build
```

### 5. Load into Chrome
1. Open `chrome://extensions/`  
2. Enable **Developer mode**  
3. Click **Load unpacked** and select `toss/frontend/build`

## ⚙️ Usage
- Click the extension icon in your toolbar.  
- Let it scan the current page or enter a custom URL.  
- View or analyze results from Gemini or Selenium.  
- Check your History for past scans.
