import ImpactStory from '../ImpactStory';

export default function ImpactStoryExample() {
  return (
    <ImpactStory 
      title="Clean Water Changes Everything"
      story="In rural Ethiopia, 14-year-old Selam used to walk 6 hours every day to collect water from a dirty pond. Now, with a new well in her village built by charity:water, she has clean water just 10 minutes from her home. She's back in school, pursuing her dream of becoming a teacher, and her community is thriving with better health and new opportunities."
      location="Ethiopia, East Africa"
      icon="🌍"
      onContinue={() => console.log('Continue clicked')}
    />
  );
}
