import QuizResults from '../QuizResults';

export default function QuizResultsExample() {
  return (
    <QuizResults 
      avatarId="water-mage"
      heroName="Aqua Avenger"
      score={8}
      totalQuestions={10}
      finalLevel={3}
      totalXp={850}
      onPlayAgain={() => console.log('Play again clicked')}
      onLearnMore={() => console.log('Learn more clicked')}
    />
  );
}
