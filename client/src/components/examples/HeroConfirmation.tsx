import HeroConfirmation from '../HeroConfirmation';

export default function HeroConfirmationExample() {
  return (
    <div className="p-8 bg-background min-h-screen">
      <HeroConfirmation 
        avatarId="water-mage"
        heroName="Aqua Avenger"
        onBack={() => console.log('Go back clicked')}
        onStartMission={() => console.log('Start mission clicked')}
      />
    </div>
  );
}
