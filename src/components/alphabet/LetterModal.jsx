import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { letterExamples } from '@/lib/letterExamples';

// Curated working Unsplash photo IDs for reliable display
const imageMap = {
  'mother love': 'photo-1507003211169-0a1dd7228f2d',
  'market shop': 'photo-1555396273-367ea4eb4db5',
  'cooking food': 'photo-1556909114-f6e7ad7d3136',
  'elephant': 'photo-1557050543-4d5f4e07ef46',
  'blue sky': 'photo-1504701954957-2010ec3bcec1',
  'children playing': 'photo-1474552226712-ac0f0961a954',
  'mouse animal': 'photo-1425082661705-1834bfd09dca',
  'swimming pool': 'photo-1519315901367-f34ff9154487',
  'clock time': 'photo-1495364141860-b0d03eccd065',
  'salt spice': 'photo-1518110925495-5fe2fda0442c',
  'garden park': 'photo-1585320806297-9794b3e4eeae',
  'traditional clothing': 'photo-1583391733956-3750e0ff4e8b',
  'indian meal food': 'photo-1567620905732-2d1ec7ab7445',
  'village india': 'photo-1524492412937-b28074a5d7da',
  'meditation sage': 'photo-1506905925346-21bda4d32df4',
  'seasons nature': 'photo-1504701954957-2010ec3bcec1',
  'green leaf nature': 'photo-1508739773434-c26b3d09e071',
  'bull ox': 'photo-1546445317-29f4545e9d53',
  'question mark thinking': 'photo-1434030216411-0b793f4b4173',
  'swimming': 'photo-1530549387789-4c1017266635',
  'number five hand fingers': 'photo-1624555130581-1d9cca783bc0',
  'ice cream': 'photo-1501443762994-82bd5dace89a',
  'camel desert': 'photo-1524492412937-b28074a5d7da',
  'one single object': 'photo-1518611012118-696072aa579a',
  'reading book': 'photo-1456513080510-7bf3a84b82f8',
  'running race': 'photo-1461896836934-ffe607ba8211',
  'medicine herbs': 'photo-1584308666744-24d5c474f2ae',
  'sad emotion': 'photo-1474552226712-ac0f0961a954',
  'sunrise dawn': 'photo-1500534314209-a25ddb2bd429',
  'lotus flower': 'photo-1568702846914-96b305d2aaeb',
  'forest jungle': 'photo-1448375240586-882707db888b',
  'cuckoo bird': 'photo-1444464666168-49d633b86797',
  'sword weapon': 'photo-1589652717521-10c0d092dea9',
  'dates fruit': 'photo-1558642452-9d2a7deb7f62',
  'ganesha idol': 'photo-1598300042247-d088f8ab3a91',
  'plant sapling': 'photo-1466781783364-36c955e42a7f',
  'wind nature breeze': 'photo-1504701954957-2010ec3bcec1',
  'temple bell': 'photo-1582510003544-4d00b7f74220',
  'clay pot pitcher': 'photo-1565193566173-7a0ee3dbe261',
  'flowers fragrance': 'photo-1490750967868-88df5691cc3a',
  'moon night sky': 'photo-1532693322450-2cb5c511067d',
  'butterfly': 'photo-1558618666-fcd25c85cd64',
  'tea cup': 'photo-1564890369478-c89ca6d9cde9',
  'umbrella rain': 'photo-1534274988757-a28bf1a57c17',
  'water river': 'photo-1433086966358-54859d0ed716',
  'stream waterfall': 'photo-1448375240586-882707db888b',
  'knowledge books wisdom': 'photo-1456513080510-7bf3a84b82f8',
  'tomato red vegetable': 'photo-1558818498-28c1e002b655',
  'oil lamp diya': 'photo-1604599340287-2042e85a3802',
  'hindu temple': 'photo-1582510003544-4d00b7f74220',
  'grapes fruit': 'photo-1537640538966-79f369143f8f',
  'wealth gold money': 'photo-1579621970563-ebec7560ff3e',
  'meditation yoga': 'photo-1506905925346-21bda4d32df4',
  'river nature': 'photo-1433086966358-54859d0ed716',
  'peacock bird': 'photo-1548550023-2bdb3c5beed7',
  'books reading': 'photo-1481627834876-b7833e8f5570',
  'bird flying': 'photo-1444464666168-49d633b86797',
  'mountain peak': 'photo-1464822759023-fed622ff2c3b',
  'tropical fruits': 'photo-1490885578174-acda8905c2c6',
  'cat cute': 'photo-1514888286974-6c03e2ca1dba',
  'banana fruit': 'photo-1528825871115-3581a5387919',
  'hill landscape': 'photo-1464822759023-fed622ff2c3b',
  'earth planet globe': 'photo-1614730321146-b6fa6a46bcb4',
  'house home': 'photo-1568605114967-8130f3a36994',
  'rain drops': 'photo-1498931299472-f7a63a5a1cfa',
  'tree nature': 'photo-1542601906897-ecd01a8db7af',
  'school classroom': 'photo-1580582932707-520aed937b7b',
  'sun sunrise': 'photo-1500534314209-a25ddb2bd429',
  'ocean sea waves': 'photo-1505118380757-91f5f5632de0',
  'lion wild': 'photo-1546182990-dffeafbe841d',
  'bird colorful': 'photo-1444464666168-49d633b86797',
  'snake reptile': 'photo-1531386151447-fd76ad50012f',
  'flower bloom': 'photo-1490750967868-88df5691cc3a',
  'old antique vintage': 'photo-1568652203975-f738daa1d594',
  'bangle bracelet indian': 'photo-1583391733956-3750e0ff4e8b',
  'king crown royal': 'photo-1578662996442-48f60103fc96',
  'road street': 'photo-1464822759023-fed622ff2c3b',
  'colorful paint rainbow': 'photo-1541701494587-cb58502866ab',
  'vine creeper plant': 'photo-1466781783364-36c955e42a7f',
  'world globe earth': 'photo-1614730321146-b6fa6a46bcb4',
  'student study school': 'photo-1509062522246-3755977927d7',
  'number six': 'photo-1518611012118-696072aa579a',
  'deer forest': 'photo-1484406566174-9da000fda645',
  'honey bees': 'photo-1558642452-9d2a7deb7f62',
  'star constellation': 'photo-1532693322450-2cb5c511067d',
  'coins money': 'photo-1579621970563-ebec7560ff3e',
};

function getUnsplashUrl(imageQuery) {
  const id = imageMap[imageQuery];
  if (id) return `https://images.unsplash.com/${id}?w=120&h=120&fit=crop&q=80`;
  // fallback to a safe generic photo
  return `https://images.unsplash.com/photo-1490750967868-88df5691cc3a?w=120&h=120&fit=crop&q=80`;
}

export default function LetterModal({ letter, phonetic, onClose }) {
  const examples = letterExamples[letter] || [];

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 24 }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #2e1f0a 0%, #1a1006 100%)',
          border: '1px solid rgba(200,148,42,0.35)',
          boxShadow: '0 30px 70px rgba(0,0,0,0.7), 0 0 40px rgba(180,120,40,0.08)',
        }}
      >
        {/* Corner accents */}
        <div className="absolute top-2 left-2 w-4 h-4" style={{ borderTop: '1.5px solid #c8942a', borderLeft: '1.5px solid #c8942a', opacity: 0.5 }} />
        <div className="absolute top-2 right-2 w-4 h-4" style={{ borderTop: '1.5px solid #c8942a', borderRight: '1.5px solid #c8942a', opacity: 0.5 }} />
        <div className="absolute bottom-2 left-2 w-4 h-4" style={{ borderBottom: '1.5px solid #c8942a', borderLeft: '1.5px solid #c8942a', opacity: 0.5 }} />
        <div className="absolute bottom-2 right-2 w-4 h-4" style={{ borderBottom: '1.5px solid #c8942a', borderRight: '1.5px solid #c8942a', opacity: 0.5 }} />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5" style={{ borderBottom: '1px solid rgba(140,90,30,0.25)' }}>
          <div className="flex items-center gap-4">
            <span
              className="font-kannada font-bold"
              style={{ fontSize: '3.5rem', lineHeight: 1, color: '#f0c060', textShadow: '0 2px 20px rgba(200,148,42,0.55)' }}
            >
              {letter}
            </span>
            <div>
              <span className="font-inter text-[10px] tracking-widest uppercase block mb-0.5" style={{ color: '#7a5828' }}>phonetic</span>
              <span className="font-inter text-xl font-semibold" style={{ color: '#e8b84b' }}>{phonetic}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{ background: 'rgba(140,90,30,0.2)', color: '#a07840' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Examples */}
        <div className="px-6 py-5 space-y-3">
          <p className="font-inter text-[10px] uppercase tracking-widest mb-4" style={{ color: '#6a4820' }}>Examples</p>
          {examples.map((ex, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 + 0.1 }}
              className="flex items-center gap-4 rounded-xl p-3"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(140,90,30,0.2)' }}
            >
              <div
                className="w-14 h-14 rounded-lg overflow-hidden shrink-0"
                style={{ border: '1px solid rgba(180,120,40,0.3)' }}
              >
                <img
                  src={getUnsplashUrl(ex.imageQuery)}
                  alt={ex.meaning}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="font-kannada text-xl font-bold" style={{ color: '#f0c060' }}>{ex.word}</p>
                <p className="font-inter text-sm mt-0.5" style={{ color: '#9a7040' }}>{ex.meaning}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}