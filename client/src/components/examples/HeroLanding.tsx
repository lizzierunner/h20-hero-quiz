import HeroLanding from '../HeroLanding';

export default function HeroLandingExample() {
  return (
    <HeroLanding 
      onStartMission={() => console.log('Start mission clicked')} 
    />
  );
}
