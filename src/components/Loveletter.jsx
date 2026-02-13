import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import hugGif from "../assets/hug.gif" 

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [noScale, setNoScale] = useState(1);
  const [yesScale, setYesScale] = useState(1);
  const [isCelebrated, setIsCelebrated] = useState(false);
  const [emojis, setEmojis] = useState([]);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      spawnEmojis();
    }
  };

  const spawnEmojis = () => {
    const newEmojis = [];
    const emojiTypes = ['❤️', '💋', '💕'];
    for (let i = 0; i < 15; i++) {
      newEmojis.push({
        id: Date.now() + i,
        char: emojiTypes[Math.floor(Math.random() * emojiTypes.length)],
        left: Math.random() * 80 + 10 + '%',
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2
      });
    }
    setEmojis(newEmojis);
    setTimeout(() => setEmojis([]), 4000);
  };

  const startCelebration = () => {
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff4d6d', '#ff758f', '#ffb3c1'],
        shapes: ['circle']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff4d6d', '#ff758f', '#ffb3c1'],
        shapes: ['circle']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleNo = (e) => {
    e.stopPropagation();
    if (noScale > 0.2) {
      setNoScale(noScale - 0.15);
      setYesScale(yesScale + 0.2);
    }
  };

  const handleYes = (e) => {
    e.stopPropagation();
    setIsCelebrated(true);
    startCelebration();
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Inter:wght@400;700&display=swap');
          
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          @keyframes floatUp {
            0% { transform: translateY(0) scale(1); opacity: 0; }
            20% { opacity: 1; }
            100% { transform: translateY(-250px) scale(1.5); opacity: 0; }
          }

          /* Prevents zooming on mobile when clicking buttons */
          button {
            touch-action: manipulation;
          }
        `}
      </style>

      <div style={styles.envelopeWrapper} onClick={handleOpen}>
        
        {emojis.map(emoji => (
          <span
            key={emoji.id}
            style={{ 
              ...styles.floatingEmoji,
              left: emoji.left,
              animation: `floatUp ${emoji.duration}s ease-out ${emoji.delay}s forwards`
            }}
          >
            {emoji.char}
          </span>
        ))}

        <div style={{
          ...styles.flap,
          transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
          zIndex: isOpen ? 1 : 15, 
        }}></div>

        <div style={styles.envelopeBase}>
          <div style={{
            ...styles.letter,
            // Reduced upward translation slightly for mobile height safety
            transform: isOpen ? 'translateY(-140px)' : 'translateY(0)',
            opacity: isOpen ? 1 : 0, 
            zIndex: 5 
          }}>
            {!isCelebrated ? (
              <div style={styles.letterContent}>
                <h2 style={styles.title}>To the love of my life...</h2>
                <p style={styles.text}>
                  You are the 'commit' I'll never revert. My life's best logic started the day I met you.<br />
                  <b>You're my favorite person to merge with.</b> ❤️
                </p>
                <p style={styles.question}>Will you be my Valentine?</p>
                <div style={styles.btnGroup}>
                  <button onClick={handleYes} style={{...styles.yesBtn, transform: `scale(${yesScale})`}}>YES</button>
                  {noScale > 0.2 && (
                    <button onClick={handleNo} style={{...styles.noBtn, transform: `scale(${noScale})`}}>No</button>
                  )}
                </div>
              </div>
            ) : (
              <div style={styles.celebration}>
                <img 
                  src={hugGif}
                  alt="Cute bears" 
                  style={styles.gifStyle} 
                />
                <h2 style={styles.celebrationTitle}>I Love You</h2>
                <p style={styles.celebrationSubtext}> <b>Merge Request Accepted Forever.</b> </p>
              </div>
            )}
          </div>

          <div style={styles.frontCover}></div>
        </div>

        {!isOpen && <p style={styles.hint}>Click to open 💌</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#fff0f3',
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    perspective: '1000px',
    overflow: 'hidden', // Prevents any weird scrolling on mobile
    padding: '20px',
    boxSizing: 'border-box'
  },
  envelopeWrapper: {
    position: 'relative',
    width: 'min(90vw, 320px)', // Takes 90% of screen width, but maxes at 320px
    height: '200px',
    cursor: 'pointer',
  },
  floatingEmoji: {
    position: 'absolute',
    bottom: '50px',
    fontSize: '24px',
    pointerEvents: 'none',
    zIndex: 20
  },
  envelopeBase: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#ff758f',
    borderRadius: '0 0 10px 10px',
    zIndex: 2,
    boxShadow: '0 10px 30px rgba(255, 77, 109, 0.2)',
  },
  flap: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '110px',
    backgroundColor: '#ff4d6d',
    clipPath: 'polygon(0 0, 50% 100%, 100% 0)', 
    transformOrigin: 'top',
    transition: 'transform 0.5s ease-in-out',
  },
  frontCover: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#ff85a1', 
    clipPath: 'polygon(0 40%, 50% 75%, 100% 40%, 100% 100%, 0 100%)',
    zIndex: 10,
    borderRadius: '0 0 10px 10px',
  },
  letter: {
    position: 'absolute',
    bottom: '10px',
    left: '2.5%',
    width: '95%',
    height: '280px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
    transition: 'all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    padding: '20px 15px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    overflow: 'hidden'
  },
  letterContent: { width: '100%' },
  title: { 
    fontFamily: 'Dancing Script', 
    color: '#c9184a', 
    margin: '0 0 8px 0', 
    fontSize: 'min(1.4rem, 6vw)' 
  },
  text: { 
    fontFamily: 'Inter', 
    fontSize: 'min(0.85rem, 4vw)', 
    color: '#590d22', 
    lineHeight: '1.4' 
  },
  question: { 
    fontFamily: 'Inter', 
    fontWeight: 'bold', 
    color: '#ff4d6d', 
    margin: '15px 0 10px 0',
    fontSize: 'min(0.9rem, 4.5vw)'
  },
  btnGroup: { 
    display: 'flex', 
    gap: '10px', 
    justifyContent: 'center', 
    alignItems: 'center',
    width: '100%' 
  },
  yesBtn: { 
    backgroundColor: '#ff4d6d', 
    color: '#fff', 
    border: 'none', 
    padding: '10px 20px', 
    borderRadius: '20px', 
    fontWeight: 'bold', 
    cursor: 'pointer'
  },
  noBtn: { 
    backgroundColor: '#f0f0f0', 
    color: '#666', 
    border: 'none', 
    padding: '10px 20px', 
    borderRadius: '20px', 
    cursor: 'pointer'
  },
  celebration: { 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gifStyle: { 
    width: 'min(100px, 30vw)', 
    height: 'auto', 
    marginBottom: '5px' 
  },
  celebrationTitle: { 
    fontFamily: 'Dancing Script', 
    color: '#ff4d6d', 
    fontSize: 'min(1.8rem, 8vw)',
    margin: '5px 0'
  },
  celebrationSubtext: { 
    fontSize: 'min(0.75rem, 3.5vw)', 
    color: '#800f2f' 
  },
  hint: {
    position: 'absolute',
    bottom: '-60px',
    width: '100%',
    textAlign: 'center',
    color: '#ff4d6d',
    fontWeight: 'bold',
    fontFamily: 'Inter',
    animation: 'bounce 2s infinite',
  }
};

export default LoveLetter;