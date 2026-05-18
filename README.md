Word Wander is an open-source, dark-themed web platform designed to make learning regional Indian languages accessible and engaging. Starting with Kannada, our mission is to preserve and celebrate linguistic diversity by teaching users to read and communicate in India's regional languages, one letter at a time.



 ✨ Features

🔤 **Kannada Alphabet Learning** – Master consonants, vowels, and conjuncts with interactive step-by-step lessons
🗣️ **Native Voice Assistance** – Hear authentic Kannada pronunciation from native speakers
💬 **Common Phrases** – Learn 15+ essential phrases for everyday conversations
📖 **Interactive Reading Exercises** – Practice reading with guided feedback and pronunciation tips
🏪 **Market Scenario Quiz** – Real-world challenge: navigate a Kannada-speaking market and complete transactions
⭐ **Automated Grading** – Instant feedback on vocabulary, pronunciation, grammar, and fluency
🎨 **Dark Theme UI** – Beautiful, modern interface optimized for learning
📱 **Responsive Design** – Works seamlessly on mobile, tablet, and desktop
💭 **User Feedback System** – Share your experience and help us improve
📊 **Progress Tracking** – Monitor your learning journey and achievements

---

## 🚀 Quick Start

### **Prerequisites**

- Node.js (v14 or higher)
- npm or yarn
- A modern web browser with microphone support (for voice features)

### **Installation**

1. Clone the repository:

```bash
git clone https://github.com/yourusername/word-wander.git
cd word-wander
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```
Update `.env` with your configuration (API keys for Google Text-to-Speech, etc.)

4. Start the development server:

```bash
npm run dev
```

5. Open your browser: Navigate to `http://localhost:3000`

---

## 📖 Usage

### **For Learners**

- Start on the Home Page – Explore features and get oriented
- Begin Lessons – Learn the Kannada alphabet at your own pace
- Practice Phrases – Build vocabulary with common, practical phrases
- Take the Quiz – Test your skills in an interactive market scenario
- Share Feedback – Help us improve your learning experience

### **For Developers**
See `CONTRIBUTING.md` for detailed development guidelines.

---

## 🛠️ Tech Stack

**Frontend:**
- React 18+ / Next.js
- Tailwind CSS (dark theme)
- Framer Motion (animations)
- Web Audio API (voice recording)

**Backend:**
- Node.js / Express (optional, for quiz grading & feedback)
- MongoDB / Firebase (for storing progress & feedback)

**Audio & Language:**
- Google Cloud Text-to-Speech API (for native pronunciations)
- Web Speech API (for user voice recording & recognition)

**Tools:**
- Vite / Webpack (bundling)
- Jest + React Testing Library (testing)
- ESLint + Prettier (code quality)

---

## 📁 Project Structure

```
word-wander/
├── public/
│   ├── audio/              # Kannada audio files
│   └── images/             # UI assets
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Home.jsx
│   │   ├── Lessons.jsx
│   │   ├── Quiz.jsx
│   │   └── Feedback.jsx
│   ├── pages/              # Page components
│   │   ├── HomePage.jsx
│   │   ├── LessonPage.jsx
│   │   ├── QuizPage.jsx
│   │   └── FeedbackPage.jsx
│   ├── data/               # Kannada content & lessons
│   │   ├── alphabet.json
│   │   ├── phrases.json
│   │   └── quizScenarios.json
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Helper functions
│   ├── styles/             # Global CSS & theme
│   └── App.jsx
├── .env.example            # Environment variables template
├── package.json
└── README.md
```

---

## 🎯 Content Modules

### **Kannada Alphabet (ಕನ್ನಡ ಅಕ್ಷರಗಳು)**
- 49 letters with native pronunciation
- Visual representation with example words
- Letter-by-letter interactive learning

### **Common Phrases (ಸಾಮಾನ್ಯ ವಾಕ್ಯಗಳು)**
- 15+ essential phrases for daily use
- Context and usage examples
- Audio playback for each phrase
- Phonetic transliteration guide

### **Reading Exercises**
- Progressive difficulty levels
- Sentence construction breakdown
- Real-time feedback and guidance
- Pronunciation verification

### **Market Quiz (ಮಾರುಕಟ್ಟೆ)**
- 7 interactive scenarios
- Real-world market interactions
- Grading across 4 dimensions:
  - Vocabulary Accuracy (25%)
  - Pronunciation Clarity (25%)
  - Grammar Correctness (25%)
  - Fluency & Confidence (25%)
- Pass threshold: 70%

---

## 🎨 Design

### **Color Scheme (Dark Theme)**
```
Primary Background:   #1a1a1a (Deep Charcoal)
Secondary:            #252525 (Card Backgrounds)
Text Primary:         #f5f5f5 (Off-white)
Accent (Primary):     #d4a373 (Gold/Orange)
Accent (Secondary):   #00bcd4 (Teal)
Error:                #ef5350 (Soft Red)
Success:              #66bb6a (Green)
```

### **Responsive Breakpoints**
- Mobile: < 640px
- Tablet: 640px – 1024px
- Desktop: > 1024px

---

## 🔊 Audio Features

- **Native Speaker Pronunciations** – High-quality audio files for all letters and phrases
- **Voice Recording** – Users can record their attempts and compare with native pronunciation
- **Playback Controls** – Simple, intuitive audio player with speed adjustment
- **Offline Support** – Audio files can be cached for offline learning (future feature)

---

## 📊 Quiz Grading System

The quiz evaluates learners on four key dimensions:

| Dimension | Points | Criteria |
|-----------|--------|----------|
| Vocabulary | 0–25 | Correct word choice, appropriate phrases |
| Pronunciation | 0–25 | Clarity, accent, phonetic accuracy |
| Grammar | 0–25 | Correct sentence structure, case usage |
| Fluency | 0–25 | Natural delivery, confidence, pacing |

**Total Score:** 100 points  
**Pass Threshold:** 70 points

---

## 🤝 Contributing

We welcome contributions! Whether you're a developer, linguist, translator, or educator, there are many ways to help.

### **How to Contribute**

1. Fork the repository
2. Create a feature branch:
```bash
git checkout -b feature/add-new-phrases
```
3. Make your changes (see guidelines below)
4. Commit with clear messages:
```bash
git commit -m "Add 10 new Kannada phrases for food vocabulary"
```
5. Push to your fork:
```bash
git push origin feature/add-new-phrases
```
6. Submit a Pull Request with a description of your changes

### **Contribution Areas**

- 📝 **Content Development** – Add new phrases, lessons, or languages
- 🎨 **UI/UX Improvements** – Enhance design and user experience
- 🐛 **Bug Fixes** – Report and fix issues
- 🧪 **Testing** – Write tests for better code quality
- 📚 **Documentation** – Improve README, guides, and comments
- 🌐 **Localization** – Translate interface to other languages
- 🎤 **Audio Recording** – Provide native speaker pronunciations

### **Contribution Guidelines**

- Follow the existing code style (ESLint config included)
- Test your changes thoroughly
- Ensure Kannada content is accurate (consult native speakers if needed)
- Write clear commit messages
- Update documentation for new features
- Include a description of your changes in the PR

For detailed guidelines, see `CONTRIBUTING.md`

---

## 🐛 Issues & Bug Reports

Found a bug? Please create an issue with:

- **Description** – What happened?
- **Steps to Reproduce** – How can we replicate it?
- **Expected Behavior** – What should happen?
- **Screenshots/Logs** – If applicable
- **Environment** – Browser, device, OS

---

## 📋 Roadmap

### **Phase 1 (Current) ✅**
- ✅ Kannada alphabet module
- ✅ Common phrases library
- ✅ Interactive reading exercises
- ✅ Market scenario quiz
- ✅ Dark-themed UI
- ✅ Feedback collection system

### **Phase 2 (Q3 2024) 🚧**
- ⬜ User authentication & progress tracking
- ⬜ Spaced repetition system for better retention
- ⬜ Interactive flashcard mode
- ⬜ Achievement badges & gamification
- ⬜ Leaderboard system

### **Phase 3 (Q4 2024) 📋**
- ⬜ Additional languages (Tamil, Telugu, Malayalam)
- ⬜ AI chatbot for practice conversations
- ⬜ Mobile app (React Native)
- ⬜ Community forum for learners
- ⬜ Offline learning support

### **Phase 4 (2025) 🔮**
- ⬜ Advanced grammar lessons
- ⬜ Video-based lessons
- ⬜ Live tutor sessions
- ⬜ Integration with schools/education platforms
- ⬜ More regional Indian languages

---

## 💡 Tips for Learning

- **Start with the Alphabet** – Master the basic letters before moving to phrases
- **Listen & Repeat** – Use the audio features to develop proper pronunciation
- **Practice Regularly** – Consistent daily practice is more effective than sporadic sessions
- **Try the Quiz** – Test yourself in realistic scenarios to build confidence
- **Don't Rush** – Learning is a journey; take your time and enjoy the process
- **Share Your Feedback** – Help us improve by telling us what works for you

---

## 📄 License

This project is licensed under the **MIT License** – see the `LICENSE` file for details.
You're free to use, modify, and distribute this project, even for commercial purposes, as long as you include the license and attribution.

---

## 🙌 Acknowledgments

- **Kannada Community** – For guidance and cultural insights
- **Native Speakers** – For authentic pronunciations and phrase validation
- **Contributors** – All volunteers who've helped improve this platform
- **Inspiration** – Duolingo, Babbel, and other language learning platforms
- **Open Source** – Built with love using incredible open-source technologies

---

## 📧 Contact & Support

- Questions? Open an issue
- Email: hello@wordwander.dev
- Website: wordwander.dev
- Twitter: @WordWander
- Discord: Join our community

---

## 🌟 Show Your Support

If you find Word Wander helpful, please consider:

- ⭐ **Star this repository** – It helps others discover the project
- 📢 **Share with others** – Spread the word about learning regional languages
- 🤝 **Contribute** – Share your skills and knowledge
- 💬 **Give feedback** – Help us understand what works and what doesn't

---

## 📖 Learn More

- Getting Started Guide
- Developer Setup
- Kannada Language Basics
- Quiz Grading Rubric
- API Documentation

