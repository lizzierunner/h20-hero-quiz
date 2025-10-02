import CharacterCard from '../CharacterCard';

export default function CharacterCardExample() {
  return (
    <div className="p-8 bg-background">
      <div className="max-w-xs">
        <CharacterCard 
          avatarId="water-mage"
          heroName="Aqua Avenger"
          level={3}
          xp={245}
          currentQuestion={5}
          totalQuestions={10}
        />
      </div>
    </div>
  );
}
