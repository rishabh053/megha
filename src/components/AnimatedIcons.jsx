// Animated SVG Icons Component

export function LockIcon() {
  return (
    <div className="icon-container">
      <svg className="animated-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes lockShake {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-5deg); }
            75% { transform: rotate(5deg); }
          }
          .lock-body { animation: lockShake 2s ease-in-out infinite; transform-origin: center; }
        `}</style>
        <rect className="lock-body" x="30" y="45" width="40" height="35" rx="5" fill="#ff99cc" stroke="#ff6b9d" strokeWidth="3"/>
        <path d="M 35 45 V 35 C 35 25 40 20 50 20 C 60 20 65 25 65 35 V 45" stroke="#ff6b9d" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <circle cx="50" cy="62" r="4" fill="#ff6b9d"/>
      </svg>
    </div>
  )
}

export function RoseIcon() {
  return (
    <div className="icon-container">
      <svg className="animated-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes roseBloom {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }
          .petal { animation: roseBloom 3s ease-in-out infinite; transform-origin: center; }
        `}</style>
        <ellipse className="petal" cx="50" cy="35" rx="12" ry="18" fill="#ff6b9d" opacity="0.9"/>
        <ellipse className="petal" cx="35" cy="45" rx="12" ry="18" fill="#ff6b9d" opacity="0.9" transform="rotate(-60 35 45)"/>
        <ellipse className="petal" cx="65" cy="45" rx="12" ry="18" fill="#ff6b9d" opacity="0.9" transform="rotate(60 65 45)"/>
        <ellipse className="petal" cx="40" cy="58" rx="12" ry="18" fill="#ff99cc" opacity="0.9" transform="rotate(-30 40 58)"/>
        <ellipse className="petal" cx="60" cy="58" rx="12" ry="18" fill="#ff99cc" opacity="0.9" transform="rotate(30 60 58)"/>
        <circle cx="50" cy="50" r="8" fill="#ffb3d9"/>
        <path d="M 50 65 Q 48 75, 50 85" stroke="#4ade80" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M 50 70 Q 45 72, 42 75" stroke="#4ade80" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

export function RingIcon() {
  return (
    <div className="icon-container">
      <svg className="animated-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes ringSparkle {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.2); }
          }
          .diamond { animation: ringSparkle 2s ease-in-out infinite; }
        `}</style>
        <ellipse cx="50" cy="65" rx="20" ry="5" fill="#ffd700" opacity="0.6"/>
        <path d="M 35 65 L 38 70 L 62 70 L 65 65 Z" fill="#ffd700"/>
        <path d="M 38 70 L 42 75 L 58 75 L 62 70 Z" fill="#ffed4e"/>
        <polygon className="diamond" points="50,35 45,45 50,55 55,45" fill="#e0f2ff" stroke="#93c5fd" strokeWidth="2"/>
        <line x1="50" y1="35" x2="48" y2="40" stroke="#fff" strokeWidth="1.5" opacity="0.8"/>
        <circle className="diamond" cx="47" cy="38" r="1.5" fill="#fff" opacity="0.9"/>
      </svg>
    </div>
  )
}

export function ChocolateIcon() {
  return (
    <div className="icon-container">
      <svg className="animated-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes chocolateMelt {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          .choco-piece { animation: chocolateMelt 2s ease-in-out infinite; }
        `}</style>
        <rect x="25" y="35" width="50" height="40" rx="3" fill="#8B4513" stroke="#654321" strokeWidth="2"/>
        <line x1="50" y1="35" x2="50" y2="75" stroke="#654321" strokeWidth="2"/>
        <line x1="25" y1="55" x2="75" y2="55" stroke="#654321" strokeWidth="2"/>
        <rect className="choco-piece" x="28" y="38" width="19" height="14" rx="2" fill="#A0522D"/>
        <rect className="choco-piece" x="53" y="38" width="19" height="14" rx="2" fill="#A0522D"/>
        <rect className="choco-piece" x="28" y="58" width="19" height="14" rx="2" fill="#A0522D"/>
        <rect className="choco-piece" x="53" y="58" width="19" height="14" rx="2" fill="#A0522D"/>
      </svg>
    </div>
  )
}

export function TeddyIcon() {
  return (
    <div className="icon-container">
      <svg className="animated-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes teddyWave {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-10deg); }
            75% { transform: rotate(10deg); }
          }
          .teddy-arm { animation: teddyWave 2s ease-in-out infinite; transform-origin: 35px 55px; }
        `}</style>
        <circle cx="30" cy="35" r="12" fill="#D2691E"/>
        <circle cx="70" cy="35" r="12" fill="#D2691E"/>
        <circle cx="50" cy="50" r="25" fill="#D2691E"/>
        <circle cx="43" cy="45" r="3" fill="#333"/>
        <circle cx="57" cy="45" r="3" fill="#333"/>
        <path d="M 45 55 Q 50 58, 55 55" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <circle cx="50" cy="50" r="4" fill="#8B4513"/>
        <circle className="teddy-arm" cx="28" cy="65" r="8" fill="#D2691E"/>
        <circle cx="72" cy="65" r="8" fill="#D2691E"/>
      </svg>
    </div>
  )
}

export function HugIcon() {
  return (
    <div className="icon-container">
      <svg className="animated-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes hugPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          .heart-hug { animation: hugPulse 1.5s ease-in-out infinite; transform-origin: center; }
        `}</style>
        <path className="heart-hug" d="M 50 75 L 35 55 C 30 50, 30 40, 35 35 C 40 30, 50 35, 50 35 C 50 35, 60 30, 65 35 C 70 40, 70 50, 65 55 Z" fill="#ff6b9d"/>
        <circle cx="35" cy="45" r="15" fill="#ffb3d9" opacity="0.7"/>
        <circle cx="65" cy="45" r="15" fill="#ffb3d9" opacity="0.7"/>
      </svg>
    </div>
  )
}

export function KissIcon() {
  return (
    <div className="icon-container">
      <svg className="animated-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes kissFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          .lips { animation: kissFloat 2s ease-in-out infinite; }
        `}</style>
        <ellipse className="lips" cx="50" cy="45" rx="25" ry="15" fill="#ff6b9d"/>
        <ellipse cx="38" cy="40" rx="12" ry="8" fill="#ff99cc"/>
        <ellipse cx="62" cy="40" rx="12" ry="8" fill="#ff99cc"/>
        <path d="M 30 45 Q 35 50, 40 45" fill="#ff6b9d"/>
        <path d="M 60 45 Q 65 50, 70 45" fill="#ff6b9d"/>
        <path d="M 40 48 Q 50 52, 60 48" stroke="#ff1a75" strokeWidth="2" fill="none"/>
      </svg>
    </div>
  )
}

export function HeartIcon() {
  return (
    <div className="icon-container">
      <svg className="animated-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes heartBeat {
            0%, 100% { transform: scale(1); }
            25% { transform: scale(1.1); }
            50% { transform: scale(1); }
            75% { transform: scale(1.15); }
          }
          .main-heart { animation: heartBeat 1.5s ease-in-out infinite; transform-origin: center; }
        `}</style>
        <path className="main-heart" d="M 50 80 L 25 55 C 15 45, 15 30, 25 20 C 35 10, 50 20, 50 20 C 50 20, 65 10, 75 20 C 85 30, 85 45, 75 55 Z" fill="#ff6b9d"/>
        <path d="M 35 35 Q 40 30, 45 35" stroke="#fff" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

export function EnvelopeIcon() {
  return (
    <div className="icon-container">
      <svg className="animated-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes envelopeFloat {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-5px) rotate(2deg); }
          }
          .envelope { animation: envelopeFloat 3s ease-in-out infinite; }
        `}</style>
        <g className="envelope">
          <rect x="20" y="35" width="60" height="40" rx="3" fill="#ffb3d9" stroke="#ff99cc" strokeWidth="2"/>
          <path d="M 20 35 L 50 55 L 80 35" fill="#ff99cc" stroke="#ff99cc" strokeWidth="2"/>
          <circle cx="50" cy="55" r="8" fill="#ffd700" stroke="#ffed4e" strokeWidth="2"/>
          <path d="M 46 55 L 50 58 L 54 52" stroke="#ff6b9d" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      </svg>
    </div>
  )
}
