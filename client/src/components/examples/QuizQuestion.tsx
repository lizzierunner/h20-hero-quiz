import QuizQuestion from '../QuizQuestion';

export default function QuizQuestionExample() {
  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="max-w-3xl mx-auto">
        <QuizQuestion 
          questionNumber={3}
          totalQuestions={10}
          question="How many people worldwide lack access to clean drinking water?"
          options={[
            "771 million people",
            "500 million people",
            "1 billion people",
            "2 billion people"
          ]}
          correctAnswerIndex={0}
          onAnswer={(index, correct) => console.log('Answered:', index, 'Correct:', correct)}
        />
      </div>
    </div>
  );
}
