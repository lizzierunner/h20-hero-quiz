import AvatarSelection from '../AvatarSelection';
import { useState } from 'react';

export default function AvatarSelectionExample() {
  const [selected, setSelected] = useState('water-mage');
  
  return (
    <div className="p-8 bg-background min-h-screen">
      <AvatarSelection 
        onSelect={(id) => {
          console.log('Selected:', id);
          setSelected(id);
        }}
        selectedAvatarId={selected}
      />
    </div>
  );
}
