# H2O Hero Quiz - Design Guidelines

## Design Approach: Reference-Based with Gamification

**Primary References:**
- Duolingo: Gamified progression, character-based UI, achievement system
- charity:water's brand: Mission-driven, emotional storytelling, clean aesthetics
- Kahoot: Playful quiz mechanics, vibrant interactions

**Core Principle:** Create an engaging, game-like experience that balances playfulness with the serious mission of water access advocacy. The design should feel approachable and fun while maintaining credibility for the charitable cause.

---

## Color Palette

**Primary Colors:**
- Deep Ocean Blue: 210 85% 25% (primary brand, headers, CTAs)
- Aqua Bright: 190 75% 55% (accents, highlights, progress indicators)
- Wave Cyan: 195 85% 65% (secondary actions, badges)

**Supporting Colors:**
- Success Green: 165 70% 45% (correct answers, achievements)
- Coral Alert: 15 80% 60% (incorrect answers, alerts)
- Cloud White: 0 0% 98% (backgrounds, cards)
- Deep Navy: 215 65% 15% (text, dark mode base)

**Gradients:**
- Hero: Ocean Blue to Aqua Bright (diagonal, top-left to bottom-right)
- Achievement cards: Subtle radial gradient from center

---

## Typography

**Font Families:**
- Primary: 'Poppins' (headings, hero names, stats) - Bold, rounded, friendly
- Secondary: 'Inter' (body text, questions, descriptions) - Clean, readable

**Scale:**
- Hero Headline: 4xl to 6xl, bold (900)
- Section Headers: 3xl to 4xl, semibold (600)
- Character Names: 2xl, bold (700)
- Quiz Questions: xl to 2xl, medium (500)
- Body Text: base to lg, regular (400)
- Stats/Numbers: 3xl to 5xl, extrabold (800) with tabular-nums

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Tight spacing: 2-4 (icons, badges)
- Component padding: 6-8 (cards, buttons)
- Section spacing: 12-20 (vertical rhythm)
- Page margins: 16-24 (container padding)

**Grid Strategy:**
- Character Selection: 4-column grid (lg), 2-column (md), 1-column (mobile)
- Quiz Layout: Single column centered (max-w-3xl)
- Results Achievements: 3-column grid (lg), 2-column (md), 1-column (mobile)
- Impact Stories: Full-width cards with 2-column internal layout

---

## Component Library

### Navigation & Structure
- Fixed top navigation with character avatar, progress bar, and XP counter
- Floating character card (persistent left sidebar on desktop, collapsible on mobile)
- Bottom action bar for mobile quiz navigation

### Hero Section (Landing)
- Full-viewport hero with animated water ripple background image
- Centered mission statement with bold typography
- Three-stat horizontal display (771M people, 2.2B people, etc.)
- Large primary CTA button "Start Your Mission" with glow effect

### Character Creation Flow
- Step indicator (1/3, 2/3, 3/3) with line connectors
- Avatar grid: Large clickable cards (8 options) with hover scale and selected state (border + shadow)
- Name input: Large text field with preset name chips below (pill-shaped, clickable)
- Confirmation: Full character card preview with stats initialization

### Quiz Interface
- Question card: Elevated white card with question number, progress bar, question text
- Answer options: Large clickable cards (4 options) with hover lift, selected border, and result states (green/red)
- Character sidebar: Persistent card showing avatar, name, level, XP with circular progress ring
- Power-ups: Floating badges (top-right) for hints, double XP, second chance

### Impact Story Cards
- Full-width section between questions
- Split layout: Image left (60%), story text right (40%)
- Emotional photography showcasing real beneficiaries
- "Continue Your Mission" CTA at bottom

### Results Page
- Centered score circle (large, animated) with final percentage
- Character card evolution showing level progression
- Achievement grid: Cards with icons, titles, descriptions (unlock animation)
- Ranking badge: Large centered emblem with tier title
- Impact statistics: Three-column stat cards
- Social sharing: Horizontal button row (Twitter, Facebook, Copy)
- Secondary actions: "Play Again" and "Learn More" buttons

### Micro-Interactions
- Button states: Subtle scale on hover (scale-105), pressed state (scale-95)
- Card reveals: Staggered fade-in-up animations
- Progress bars: Smooth width transitions with gradient fills
- Achievement unlocks: Modal with confetti particle effect
- Water droplet cursor trail on character selection (desktop only)

---

## Images

**Hero Section:**
- Large hero image: Aerial view of clean water source or community gathering around new water well, overlaid with subtle blue gradient for text contrast
- Size: Full viewport width, 70vh height

**Impact Story Cards:**
- 4-6 authentic photographs showing beneficiaries, water infrastructure, community impact
- Aspect ratio: 3:2 or 4:3
- Style: Documentary photography, warm tones, human connection

**Character Avatars:**
- Illustrated icons (not photos) for 8 hero types
- Style: Playful, emoji-like but detailed
- Size: 120px × 120px at 2x resolution

**Achievement Badges:**
- Custom illustrated icons for each achievement tier
- Style: Medal/badge design with water motifs
- Size: 80px × 80px

**Background Patterns:**
- Subtle water ripple SVG pattern for hero background
- Gentle wave pattern for section dividers

---

## Accessibility & Dark Mode

- Maintain WCAG AA contrast ratios (4.5:1 for text)
- Dark mode: Deep Navy base with Aqua Bright accents, reduced saturation for comfort
- Focus states: 3px solid rings with 2px offset
- All interactive elements: Minimum 44px touch target
- Screen reader labels for all gamification elements (XP, levels, progress)

---

## Animation Budget

**Use Sparingly:**
- Page transitions: Simple fade (200ms)
- Achievement unlocks: One celebration animation
- Progress updates: Smooth counter animations
- Quiz result reveals: Quick color transition (300ms)

**Avoid:**
- Scroll-triggered animations
- Parallax effects
- Continuous background animations
- Auto-playing carousels