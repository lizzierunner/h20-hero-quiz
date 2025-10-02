# H2O Hero Quiz - Wireframe Application

## Project Overview
An interactive quiz application wireframe for charity:water's mission to bring clean water to everyone. Users create a water hero character, answer questions about global water access, learn impact stories, and receive personalized results.

## Current Implementation Status
**Status:** ✅ Fully Functional Wireframe - Ready for user testing and feedback

### Completed Features
1. **Landing Page** - Hero section with mission stats and call-to-action
2. **Character Creation Flow** - Three-step process with avatar selection, name input, and confirmation
3. **Quiz System** - 10 questions with multiple choice answers and instant feedback
4. **Progress Tracking** - Character card with level, XP, and question progress
5. **Impact Stories** - Real-world stories shown between questions
6. **Results Page** - Final score, achievements, ranking system, and social sharing options
7. **Responsive Design** - Works on mobile, tablet, and desktop
8. **Interactive Animations** - Hover effects, transitions, and visual feedback

## Application Structure

### Frontend Components
- `HeroLanding.tsx` - Main landing page with mission statistics
- `AvatarSelection.tsx` - Character avatar selection (8 hero types)
- `HeroNameInput.tsx` - Hero name input with preset suggestions
- `HeroConfirmation.tsx` - Review hero before starting mission
- `CharacterCard.tsx` - Persistent character info display during quiz
- `QuizQuestion.tsx` - Question display with answer selection and feedback
- `ImpactStory.tsx` - Impact story cards between questions
- `QuizResults.tsx` - Final results with score, achievements, and ranking
- `StepIndicator.tsx` - Visual progress indicator for character creation

### Data & Logic
- `quizData.ts` - Contains 10 water-related quiz questions and 3 impact stories
- `HomePage.tsx` - Main application logic and state management

### Design System
- **Colors:** Ocean blue primary, aqua accents, coral for alerts
- **Typography:** Poppins for headings, Inter for body text
- **Components:** Built with shadcn/ui for consistency
- **Animations:** Subtle hover effects and transitions

## User Flow
1. **Landing** → View mission stats → Click "Start Your Mission"
2. **Avatar Selection** → Choose from 8 hero types → Auto-advance
3. **Name Input** → Enter custom name or select preset → Continue
4. **Confirmation** → Review hero character → Start Mission
5. **Quiz** → Answer 10 questions → See correct/incorrect feedback
6. **Impact Stories** → View real stories every 3 questions
7. **Results** → See final score, ranking, and achievements → Play Again or Learn More

## Features

### Character Creation
- 8 unique avatar types (Water Mage, Ocean Warrior, etc.)
- Custom hero names or 4 preset options
- Level and XP system (starts at Level 1, 0 XP)

### Quiz Mechanics
- 10 multiple-choice questions about water access
- Instant visual feedback (green for correct, red for incorrect)
- 100 XP per correct answer
- Progress bar showing completion percentage
- Character card shows live level/XP updates

### Gamification
- XP and leveling system
- Achievement ranking based on score:
  - 90%+: Water Champion 🏆
  - 70-89%: Water Guardian ⭐
  - 50-69%: Water Warrior 💪
  - <50%: Water Explorer 🌊

### Impact Stories
- Shown after questions 3, 6, and 9
- Real-world examples from Ethiopia, Kenya, and Guatemala
- Emotional connection to charity:water's mission

## Technology Stack
- **Frontend:** React, TypeScript, Tailwind CSS
- **Components:** shadcn/ui (Cards, Buttons, Badges, Progress bars)
- **Routing:** Wouter for client-side navigation
- **State:** React hooks (useState) for local state management
- **Icons:** Lucide React

## Design Philosophy
- **Playful yet purposeful** - Fun quiz experience with serious mission
- **Accessible** - Clear contrast, readable fonts, responsive design
- **Engaging** - Immediate feedback, smooth animations, visual rewards
- **Mission-driven** - Keeps focus on charity:water's impact

## Future Enhancements (Not Yet Implemented)
- Backend API for question randomization
- Database to store user scores/achievements
- Social sharing functionality (Twitter, Facebook)
- Power-ups system (Hint Vision, Double XP, Second Chance)
- Leaderboard for top heroes
- More quiz questions and impact stories
- Achievement badges with unlock animations
- Dark mode support
- Accessibility improvements (screen reader labels, keyboard navigation)

## Running the Application
The app is currently running on port 5000. The workflow "Start application" handles both the Express backend and Vite frontend automatically.

## Project Date
Created: October 2, 2025
