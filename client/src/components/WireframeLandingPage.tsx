interface WireframeLandingPageProps {
  onStartMission: () => void;
}

export default function WireframeLandingPage({ onStartMission }: WireframeLandingPageProps) {
  return (
    <div className="wireframe-mobile">
      {/* Header */}
      <header className="wireframe-header">
        <h1 className="wireframe-title">H2O HERO QUIZ</h1>
        <p className="wireframe-subtitle">Water Conservation Education</p>
      </header>

      {/* Mission Briefing Section */}
      <section className="wireframe-section">
        <h2>MISSION BRIEFING</h2>
        <p>Join the fight against the global water crisis! Test your knowledge and become a water conservation hero.</p>
      </section>

      {/* Water Crisis Stats Section */}
      <section className="wireframe-section">
        <h2>WATER CRISIS STATS</h2>
        <div className="wireframe-grid-2">
          <div className="wireframe-stat">
            <p>PEOPLE WITHOUT WATER: 703M</p>
          </div>
          <div className="wireframe-stat">
            <p>CHILDREN AFFECTED: 1 IN 3</p>
          </div>
        </div>
      </section>

      {/* Charity: Water Info Section */}
      <section className="wireframe-section">
        <h2>CHARITY: WATER INFO</h2>
        <div className="wireframe-placeholder">
          <p>[LOGO]</p>
        </div>
        <p>charity: water is a non-profit organization bringing clean and safe drinking water to people in developing countries.</p>
      </section>

      {/* Quiz Features Section */}
      <section className="wireframe-section">
        <h2>QUIZ FEATURES</h2>
        <ul>
          <li>10 Educational Questions</li>
          <li>XP Progression System</li>
          <li>Impact Stories</li>
          <li>Trophy Rankings</li>
          <li>Social Sharing</li>
        </ul>
      </section>

      {/* Navigation Footer */}
      <footer className="wireframe-section">
        <p>Screen 1 of 7</p>
        <button 
          className="wireframe-button wireframe-button-primary"
          onClick={onStartMission}
        >
          START MISSION
        </button>
      </footer>
    </div>
  );
}
