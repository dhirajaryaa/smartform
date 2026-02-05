# 🚀 SmartForm – AI-Powered Smart Form Auto Filler

> Fill any form instantly with intelligent, AI-generated data.

SmartForm is a Chrome extension that automatically detects and fills web forms with context-aware data using AI. It eliminates repetitive typing and saves time when signing up, applying, testing, or submitting forms online.

---

## ❗ Problem

Users repeatedly fill out forms across:

* Login pages
* Signup forms
* Contact forms
* Surveys
* Applications

Typing the same information again and again is repetitive, boring, and inefficient.

---

## 💡 Solution

SmartForm enables **one-click intelligent form filling** using AI.

Instead of using random dummy data, it:

* Understands field context
* Generates meaningful values
* Matches labels intelligently
* Preserves user privacy

---

## ✨ Features

### 🖱 One-Click Auto Fill

* Detects input fields automatically
* Fills forms instantly
* Supports native HTML inputs (`label`, `name`, `id`)

### 🧠 AI-Powered Personalization

* Context-aware value generation
* More realistic than random generators
* Smart field matching

### 🔒 Privacy First

* User data stored locally
* API keys stored in browser local storage
* No external database
* No tracking

---

## ⚠️ Current Limitation (v1.0.0)

* Works primarily on native form structures
* Limited support for SPA or `contenteditable` fields
* Advanced frameworks (React/Angular dynamic forms) partially supported

---

## 🚧 Upcoming Features

* ✉️ Temporary Email Generator
* 📱 Temporary Phone Number Generator
* 🧠 Full SPA / Google Form support
* 🎯 Better context extraction for div-based forms
* ⚙️ Field customization settings
* 💾 Save multiple user profiles

---

## 🛠 Tech Stack

* **WXT Framework** – Modern Chrome extension development
* **TypeScript** – Type safety & scalability
* **Tailwind CSS** – Clean UI styling
* **Gemini AI API** – AI-based data generation

---

## 📦 Installation

You can install SmartForm in two ways:

---

# 📦 Install from Release (For Normal Users)

### 1️⃣ Download Release ZIP

* Go to GitHub repository
* Open **Releases**
* Download latest `.zip`

### 2️⃣ Extract ZIP

* Right-click → Extract
* Or extract to any folder

### 3️⃣ Add to Chrome

1. Open `chrome://extensions/`
2. Enable **Developer Mode**
3. Click **Load Unpacked**
4. Select the extracted folder

Extension is ready to use ✅

---

# 🧑‍💻 Development Setup (For Developers)

### 1️⃣ Clone Repository

```bash
git clone https://github.com/dhirajaryaa/smartform.git
cd smartform
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run Development Mode

```bash
npm run dev
```

### 4️⃣ Build for Production

```bash
npm run build
```

### 5️⃣ Load Extension in Chrome

1. Open:

```
chrome://extensions/
```

2. Enable **Developer Mode**
3. Click **Load Unpacked**
4. Select:

   * `.output/chrome-mv3/` (dev)
   * `dist/` (production build)

---


## 🎯 How It Works

1. User clicks the extension
2. Content script collects editable fields
3. Field metadata (id, label, name, placeholder) is extracted
4. Background script sends structured prompt to Gemini API
5. AI returns structured JSON
6. Safe JSON parsing fills fields automatically

---

## 🔐 Data Privacy

* All saved user data remains in browser storage
* API key stored locally
* No remote logging
* No cloud storage

SmartForm is designed with privacy as a core principle.

---

## 🧪 Ideal Use Cases

* QA testing forms
* Rapid signup testing
* Demo environments
* Developers testing validation logic
* Power users filling repetitive forms

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create feature branch
3. Commit changes
4. Open Pull Request

Let’s make form filling smarter together 🚀

---

## 📄 License

MIT License
Free to use, modify, and distribute.

---

## 👨‍💻 Author

Built with focus and persistence by **Dhiraj Arya**

