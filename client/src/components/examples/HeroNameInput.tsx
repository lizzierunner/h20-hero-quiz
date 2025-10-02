import HeroNameInput from '../HeroNameInput';
import { useState } from 'react';

export default function HeroNameInputExample() {
  const [name, setName] = useState('');
  
  return (
    <div className="p-8 bg-background min-h-screen">
      <HeroNameInput 
        heroName={name}
        onNameChange={(newName) => {
          console.log('Name changed:', newName);
          setName(newName);
        }}
        onContinue={() => console.log('Continue with name:', name)}
      />
    </div>
  );
}
