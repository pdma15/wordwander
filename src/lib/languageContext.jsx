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
    },
    hi: {
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
    },
  };
  return strings[language]?.[key] || strings['en'][key];
};