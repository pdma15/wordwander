import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(null); // null = not chosen yet

  useEffect(() => {
    const saved = localStorage.getItem('ww_language');
    if (saved === 'en' || saved === 'hi') setLanguage(saved);
  }, []);

  const chooseLanguage = (lang) => {
    localStorage.setItem('ww_language', lang);
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, chooseLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

// Translation strings used across the app
export const t = (language, key) => {
  const strings = {
    en: {
      // Home
      start_learning: 'Start Learning Now',
      try_quiz: 'Try the Quiz',
      start_alphabet: 'Start with the Alphabet',
      hero_subtitle: 'Journey through the beauty of Kannada — one of the world\'s oldest living languages. Learn to read, speak, and connect through step-by-step lessons and immersive experiences.',
      cta_title: 'Begin Your Kannada Journey Today',
      cta_subtitle: 'From the ancient scripts carved in Hampi\'s stones to modern everyday conversations — discover the richness of Karnataka\'s language and culture.',
      features_label: 'Features We Provide',
      features_title: 'Everything You Need to Learn Kannada',
      footer_tagline: 'Preserving and teaching regional Indian languages, one word at a time.',
      feat_alphabet_title: 'Learn the Alphabet',
      feat_alphabet_desc: 'Master Kannada vowels and consonants with interactive pronunciation guides.',
      feat_phrases_title: 'Common Phrases',
      feat_phrases_desc: 'Essential everyday phrases with audio playback and cultural context.',
      feat_quiz_title: 'Market Scenario Quiz',
      feat_quiz_desc: 'Test your skills in a realistic Kannada market conversation.',
      feat_progress_title: 'Track Progress',
      feat_progress_desc: 'Monitor your learning journey with detailed progress tracking.',
      feat_chatbot_title: 'Q&A Chatbot',
      feat_chatbot_desc: 'Got questions? Our built-in chatbot answers anything about the app and Kannada learning instantly.',
      // Alphabet
      alphabet_title: 'Kannada Alphabet',
      alphabet_subtitle: 'Tap a letter to reveal its example word and meaning.',
      alphabet_tab_vowels: 'Vowels',
      alphabet_tab_consonants: 'Consonants',
      alphabet_legend: 'Tap a card to see its example word and meaning',
      alphabet_disclaimer: '* The English pronunciations shown are the closest approximations to the original Kannada sounds. Some Kannada sounds have no exact English equivalent.',
      alphabet_next_label: 'Ready for the next step?',
      alphabet_next_cta: 'Head to Common Phrases →',
      // Phrases
      phrases_title: 'Common Phrases',
      phrases_subtitle: 'Essential Kannada phrases for everyday conversations. Listen, practice, and use them in real situations.',
      phrases_next_label: 'Ready to practice reading?',
      phrases_next_cta: 'Head to Reading Exercises →',
      // Reading
      reading_title: 'Reading Exercise',
      reading_subtitle: 'Read Kannada text and type the phonetic transliteration. Build your reading skills step by step.',
      reading_tab_transliteration: 'Transliteration',
      reading_tab_signboards: '📍 Signboards',
      reading_read_aloud: 'Read this aloud',
      reading_type_label: 'Type the phonetic transliteration:',
      reading_check: 'Check Answer',
      reading_correct: 'Excellent!',
      reading_incorrect: 'Not quite right',
      reading_correct_answer: 'Correct answer:',
      reading_next: 'Next Exercise',
      reading_restart: 'Restart Level',
      reading_next_label: 'Think you\'re ready?',
      reading_next_cta: 'Head to the Quiz →',
      // Quiz
      quiz_random_badge: 'Random Scenario',
      quiz_scenarios_label: 'Scenarios',
      quiz_pass_label: 'Pass: 70%',
      quiz_done_label: 'done',
      quiz_description: 'You\'ll face {n} scenarios. Choose the best Kannada response for each situation.',
      quiz_scenario_label: 'Scenario',
      quiz_score_label: 'Score:',
      quiz_submit: 'Submit Answer',
      quiz_next_scenario: 'Next Scenario',
      quiz_see_results: 'See Results',
      quiz_complete_title: 'Quiz Complete!',
      quiz_feedback_label: 'How was your experience?',
      quiz_feedback_cta: 'Share your Feedback →',
      // Feedback
      feedback_title: 'Your Feedback',
      feedback_subtitle: 'Help us improve Word Wander. Your honest feedback guides our journey.',
      feedback_overall: 'Overall Satisfaction',
      feedback_overall_q: 'How satisfied are you with Word Wander?',
      feedback_difficulty: 'Difficulty Level',
      feedback_too_easy: 'Too Easy',
      feedback_just_right: 'Just Right',
      feedback_too_difficult: 'Too Difficult',
      feedback_feature_ratings: 'Feature Ratings',
      feedback_alphabet_label: 'Alphabet Lessons',
      feedback_phrases_label: 'Common Phrases',
      feedback_voice_label: 'Voice Assistance',
      feedback_quiz_label: 'Quiz Interactivity',
      feedback_design_label: 'Dark Theme Design',
      feedback_tell_more: 'Tell Us More',
      feedback_liked_most: 'What did you like most?',
      feedback_improvements: 'What could be improved?',
      feedback_learn_next: 'What would you like to learn next?',
      feedback_optional: 'Optional',
      feedback_email_label: 'Email (for follow-up)',
      feedback_subscribe: 'Subscribe for updates on other languages',
      feedback_submit: 'Submit Feedback',
      feedback_thanks_title: 'Thank You!',
      feedback_thanks_body: 'Your feedback helps us improve Word Wander and bring more languages to learners everywhere.',
      // Settings
      settings_title: 'Settings',
      settings_lang_title: 'Language / भाषा',
      settings_lang_desc: 'Switch the app interface language.',
      settings_delete_title: 'Delete Account',
      settings_delete_desc: 'Permanently delete your account and all associated data. This action cannot be undone.',
      settings_delete_btn: 'Delete My Account',
      settings_delete_confirm_title: 'Are you absolutely sure?',
      settings_delete_confirm_desc: 'This will permanently delete your account and all your learning progress. This action cannot be undone.',
      settings_delete_cancel: 'Cancel',
      settings_delete_yes: 'Yes, delete my account',
    },
    hi: {
      // Home
      start_learning: 'अभी सीखना शुरू करें',
      try_quiz: 'क्विज़ आज़माएं',
      start_alphabet: 'वर्णमाला से शुरू करें',
      hero_subtitle: 'कन्नड़ की खूबसूरती में सफर करें — दुनिया की सबसे पुरानी जीवित भाषाओं में से एक। चरण-दर-चरण पाठों और गहन अनुभवों के माध्यम से पढ़ना, बोलना और जुड़ना सीखें।',
      cta_title: 'आज ही अपनी कन्नड़ यात्रा शुरू करें',
      cta_subtitle: 'हम्पी की पत्थरों पर उकेरी प्राचीन लिपियों से लेकर आधुनिक दैनिक बातचीत तक — कर्नाटक की भाषा और संस्कृति की समृद्धि खोजें।',
      features_label: 'हमारी सुविधाएं',
      features_title: 'कन्नड़ सीखने के लिए सब कुछ',
      footer_tagline: 'क्षेत्रीय भारतीय भाषाओं को संरक्षित और सिखाना, एक शब्द एक समय।',
      feat_alphabet_title: 'वर्णमाला सीखें',
      feat_alphabet_desc: 'इंटरैक्टिव उच्चारण गाइड के साथ कन्नड़ स्वर और व्यंजन में महारत हासिल करें।',
      feat_phrases_title: 'सामान्य वाक्यांश',
      feat_phrases_desc: 'ऑडियो प्लेबैक और सांस्कृतिक संदर्भ के साथ आवश्यक दैनिक वाक्यांश।',
      feat_quiz_title: 'बाज़ार परिदृश्य क्विज़',
      feat_quiz_desc: 'एक वास्तविक कन्नड़ बाज़ार बातचीत में अपने कौशल का परीक्षण करें।',
      feat_progress_title: 'प्रगति ट्रैक करें',
      feat_progress_desc: 'विस्तृत प्रगति ट्रैकिंग के साथ अपनी सीखने की यात्रा की निगरानी करें।',
      feat_chatbot_title: 'Q&A चैटबॉट',
      feat_chatbot_desc: 'सवाल हैं? हमारा बिल्ट-इन चैटबॉट ऐप और कन्नड़ सीखने के बारे में कुछ भी तुरंत जवाब देता है।',
      // Alphabet
      alphabet_title: 'कन्नड़ वर्णमाला',
      alphabet_subtitle: 'उदाहरण शब्द और अर्थ देखने के लिए किसी अक्षर पर टैप करें।',
      alphabet_tab_vowels: 'स्वर',
      alphabet_tab_consonants: 'व्यंजन',
      alphabet_legend: 'उदाहरण शब्द और अर्थ देखने के लिए कार्ड पर टैप करें',
      alphabet_disclaimer: '* दिखाए गए अंग्रेज़ी उच्चारण मूल कन्नड़ ध्वनियों के सबसे करीबी अनुमान हैं। कुछ कन्नड़ ध्वनियों का कोई अंग्रेज़ी समकक्ष नहीं है।',
      alphabet_next_label: 'अगले चरण के लिए तैयार हैं?',
      alphabet_next_cta: 'सामान्य वाक्यांशों पर जाएं →',
      // Phrases
      phrases_title: 'सामान्य वाक्यांश',
      phrases_subtitle: 'रोज़मर्रा की बातचीत के लिए ज़रूरी कन्नड़ वाक्यांश। सुनें, अभ्यास करें और वास्तविक परिस्थितियों में उपयोग करें।',
      phrases_next_label: 'पढ़ने का अभ्यास करने के लिए तैयार हैं?',
      phrases_next_cta: 'पठन अभ्यास पर जाएं →',
      // Reading
      reading_title: 'पठन अभ्यास',
      reading_subtitle: 'कन्नड़ पाठ पढ़ें और ध्वन्यात्मक लिप्यंतरण टाइप करें। चरण दर चरण अपनी पठन कौशल बनाएं।',
      reading_tab_transliteration: 'लिप्यंतरण',
      reading_tab_signboards: '📍 साइनबोर्ड',
      reading_read_aloud: 'इसे ज़ोर से पढ़ें',
      reading_type_label: 'ध्वन्यात्मक लिप्यंतरण टाइप करें:',
      reading_check: 'उत्तर जांचें',
      reading_correct: 'शानदार!',
      reading_incorrect: 'बिल्कुल सही नहीं',
      reading_correct_answer: 'सही उत्तर:',
      reading_next: 'अगला अभ्यास',
      reading_restart: 'स्तर फिर से शुरू करें',
      reading_next_label: 'क्या आप तैयार हैं?',
      reading_next_cta: 'क्विज़ पर जाएं →',
      // Quiz
      quiz_random_badge: 'यादृच्छिक परिदृश्य',
      quiz_scenarios_label: 'परिदृश्य',
      quiz_pass_label: 'उत्तीर्ण: 70%',
      quiz_done_label: 'पूर्ण',
      quiz_description: 'आपको {n} परिदृश्यों का सामना करना होगा। प्रत्येक स्थिति के लिए सबसे अच्छी कन्नड़ प्रतिक्रिया चुनें।',
      quiz_scenario_label: 'परिदृश्य',
      quiz_score_label: 'अंक:',
      quiz_submit: 'उत्तर जमा करें',
      quiz_next_scenario: 'अगला परिदृश्य',
      quiz_see_results: 'परिणाम देखें',
      quiz_complete_title: 'क्विज़ पूर्ण!',
      quiz_feedback_label: 'आपका अनुभव कैसा था?',
      quiz_feedback_cta: 'अपनी प्रतिक्रिया साझा करें →',
      // Feedback
      feedback_title: 'आपकी प्रतिक्रिया',
      feedback_subtitle: 'Word Wander को बेहतर बनाने में हमारी मदद करें। आपकी ईमानदार प्रतिक्रिया हमारी यात्रा का मार्गदर्शन करती है।',
      feedback_overall: 'समग्र संतुष्टि',
      feedback_overall_q: 'आप Word Wander से कितने संतुष्ट हैं?',
      feedback_difficulty: 'कठिनाई स्तर',
      feedback_too_easy: 'बहुत आसान',
      feedback_just_right: 'बिल्कुल सही',
      feedback_too_difficult: 'बहुत कठिन',
      feedback_feature_ratings: 'सुविधा रेटिंग',
      feedback_alphabet_label: 'वर्णमाला पाठ',
      feedback_phrases_label: 'सामान्य वाक्यांश',
      feedback_voice_label: 'आवाज़ सहायता',
      feedback_quiz_label: 'क्विज़ इंटरएक्टिविटी',
      feedback_design_label: 'डार्क थीम डिज़ाइन',
      feedback_tell_more: 'हमें और बताएं',
      feedback_liked_most: 'आपको सबसे ज़्यादा क्या पसंद आया?',
      feedback_improvements: 'क्या बेहतर किया जा सकता है?',
      feedback_learn_next: 'आप आगे क्या सीखना चाहेंगे?',
      feedback_optional: 'वैकल्पिक',
      feedback_email_label: 'ईमेल (फ़ॉलो-अप के लिए)',
      feedback_subscribe: 'अन्य भाषाओं के अपडेट के लिए सदस्यता लें',
      feedback_submit: 'प्रतिक्रिया जमा करें',
      feedback_thanks_title: 'धन्यवाद!',
      feedback_thanks_body: 'आपकी प्रतिक्रिया हमें Word Wander को बेहतर बनाने और दुनिया भर के शिक्षार्थियों के लिए अधिक भाषाएं लाने में मदद करती है।',
      // Settings
      settings_title: 'सेटिंग्स',
      settings_lang_title: 'Language / भाषा',
      settings_lang_desc: 'ऐप इंटरफ़ेस भाषा बदलें।',
      settings_delete_title: 'खाता हटाएं',
      settings_delete_desc: 'अपना खाता और सभी संबंधित डेटा स्थायी रूप से हटाएं। यह क्रिया पूर्ववत नहीं की जा सकती।',
      settings_delete_btn: 'मेरा खाता हटाएं',
      settings_delete_confirm_title: 'क्या आप बिल्कुल सुनिश्चित हैं?',
      settings_delete_confirm_desc: 'यह आपका खाता और सभी सीखने की प्रगति स्थायी रूप से हटा देगा। यह क्रिया पूर्ववत नहीं की जा सकती।',
      settings_delete_cancel: 'रद्द करें',
      settings_delete_yes: 'हाँ, मेरा खाता हटाएं',
    },
  };
  return strings[language]?.[key] || strings['en'][key];
};