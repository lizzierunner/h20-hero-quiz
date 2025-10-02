# H2O Hero RPG - Professional Figma Wireframe Implementation Guide

## 🎨 **FIGMA PROJECT SETUP INSTRUCTIONS**

### **Step 1: Create New Figma File**
1. Open Figma (figma.com)
2. Create new design file: "H2O Hero RPG - charity:water Game"
3. Set up artboards for each screen (1920x1080 for desktop, 375x812 for mobile)

### **Step 2: charity:water Brand Color Palette Setup**
```
Create Color Styles in Figma:
• Primary Blue: #00B4DB (charity:water main brand color)
• Secondary Blue: #0083B0 (gradients and accents)
• Accent Blue: #4FC3F7 (particle effects and highlights)
• Clean White: #FFFFFF (text and backgrounds)
• Light Gray: #F8F9FA (subtle backgrounds)
• Success Green: #00B894 (correct answers)
• CTA Red: #FF6B6B (donation buttons)
• CTA Orange: #EE5A24 (secondary actions)
```

### **Step 3: Typography System Setup**
```
Create Text Styles:
• H1 Title: Poppins Bold 48px (#FFFFFF)
• H2 Headers: Poppins SemiBold 32px (#00B4DB)
• H3 Subheaders: Poppins Medium 24px (#00B4DB)
• Body Text: Poppins Regular 16px (#2D3436)
• Button Text: Poppins SemiBold 18px (#FFFFFF)
• Small Text: Poppins Regular 14px (#636E72)
• Gaming UI: Orbitron Bold 20px (#00B4DB)
```

### **Step 4: Component Library Creation**
```
Design System Components to Create:
• Primary Button (charity:water blue gradient)
• Secondary Button (outlined blue)
• Avatar Card (character selection)
• Question Card (white with blue accents)
• Answer Button (4 variants: default, hover, correct, incorrect)
• Progress Bar (charity:water blue fill)
• Tool Icon (inventory items)
• Fact Card (educational content)
• Level Badge (achievement display)
• Particle Effect (decorative elements)
```

---

## 📱 **SCREEN-BY-SCREEN FIGMA IMPLEMENTATION**

### **SCREEN 1: Welcome Landing Page**
**Figma Frame Size:** 1920x1080 (Desktop), 375x812 (Mobile)

**LAYOUT STRUCTURE:**
```
Background Layer:
- Gradient: Linear 135° from #667EEA to #764BA2 to #667EEA
- Particle overlay: 80+ small circles (8px diameter) in charity:water blues
- Opacity: 60% with blur effect

Header Section (Centered):
- Title: "💧 H2O Hero RPG 💧" 
  - Font: Poppins Bold 48px
  - Color: #FFFFFF
  - Drop shadow: 0 4px 8px rgba(0,0,0,0.3)

- Subtitle: "Join charity: water's Mission to Bring Clean Water to Every Person on Earth!"
  - Font: Poppins Medium 24px
  - Color: #FFFFFF
  - Max width: 600px
  - Center aligned

Mission Box (Card Component):
- Background: rgba(255,255,255,0.15)
- Backdrop blur: 10px
- Border: 1px solid rgba(255,255,255,0.2)
- Border radius: 15px
- Padding: 30px
- Text: "🌍 785 million people lack access to clean water. Your quest: Learn how we can change that together."
- Font: Poppins Medium 18px
- Color: #FFFFFF

CTA Button:
- Background: Linear gradient #00B4DB to #0083B0
- Border radius: 50px
- Padding: 20px 40px
- Text: "🎮 Start Your Quest 🎮"
- Font: Poppins SemiBold 20px
- Color: #FFFFFF
- Drop shadow: 0 8px 25px rgba(0,180,219,0.4)
- Hover state: Scale 1.05x, shadow intensifies
```

### **SCREEN 2: Character Selection Interface**
**Figma Frame Size:** 1920x1080 (Desktop), 375x812 (Mobile)

**LAYOUT STRUCTURE:**
```
Header:
- Title: "🎭 Choose Your Water Hero! 🎭"
- Font: Poppins Bold 36px
- Color: #00B4DB

Avatar Grid (8 Characters - 4x2 Layout):
Component: Avatar Card (200x250px each)
- Background: rgba(255,255,255,0.95)
- Border: 2px solid #00B4DB
- Border radius: 20px
- Padding: 20px
- Hover state: Scale 1.05x, glow effect

Each Avatar Card Contains:
- Character Emoji: 80px size centered
- Character Name: Poppins SemiBold 18px, #00B4DB
- Tooltip on Hover: 
  - Background: #2D3436 with 95% opacity
  - Text: Poppins Regular 14px, #FFFFFF
  - Max width: 250px
  - Border radius: 8px
  - Padding: 12px

Character Options:
1. 🧙‍♂️ Water Mage - "Harnesses clean water magic for charity:water's mission"
2. 🌊 Ocean Warrior - "Fierce protector fighting the water crisis with charity:water"
3. 👷‍♂️ Hydro Engineer - "Builds charity:water wells and water systems"
4. 🌧️ Rain Shaman - "Ancient wisdom partnering with charity:water"
5. 👩‍🔬 Aqua Scientist - "Research expert for charity:water technologies"
6. 🏹 Tide Ranger - "Monitors charity:water projects with GPS"
7. 🫧 Bubble Guardian - "Maintains water purity in charity:water communities"
8. 🏄‍♀️ Wave Rider - "Advocate spreading charity:water's message"

Selection Feedback Panel:
- Background: rgba(255,255,255,0.9)
- Border: 2px solid #00B4DB
- Border radius: 15px
- Padding: 25px
- Text: Selected character name and description
```

### **SCREEN 3: Main Game Interface (RPG Dashboard)**
**Figma Frame Size:** 1920x1080 (Desktop), 375x812 (Mobile)

**LAYOUT STRUCTURE:**
```
Header Bar (Full width, 80px height):
- Background: Linear gradient #00B4DB to #0083B0
- Color: #FFFFFF
- Font: Poppins Medium 16px
- Content: "💧 Hero: [Name] | Level: [X] | charity:water Wells: [X] 💧"

Main Content Area (3-Column Layout):

LEFT COLUMN (300px width):
Character Panel:
- Avatar display: 120px circle with character emoji
- Character name: Poppins SemiBold 20px, #2D3436
- Level indicator: "Level 3" - Orbitron Bold 18px, #00B4DB
- HP Bar: Progress bar component, #00B4DB fill
- XP Bar: Progress bar component, #4FC3F7 fill

CENTER COLUMN (800px width):
Question Card:
- Background: #FFFFFF
- Border: 2px solid #00B4DB
- Border radius: 20px
- Padding: 40px
- Question text: Poppins Medium 24px, #2D3436
- Max width: 700px

Answer Grid (2x2 layout):
Each Answer Button (350x80px):
- Background: #F8F9FA
- Border: 2px solid #DDD
- Border radius: 15px
- Text: Poppins Regular 18px, #2D3436
- Hover: Border color #00B4DB, subtle scale
- Correct: Background #00B894, text #FFFFFF
- Incorrect: Border color #E74C3C

Progress Bar:
- Full width
- Background: #E9ECEF
- Fill: Linear gradient #00B4DB to #4FC3F7
- Height: 12px
- Border radius: 6px
- Text: "Question 5/7" - Poppins Medium 16px

RIGHT COLUMN (300px width):
Inventory Panel:
- Title: "🛠️ Tools Collected" - Poppins SemiBold 18px, #00B4DB
- Background: rgba(255,255,255,0.9)
- Border radius: 15px
- Padding: 20px

Tool Icons Grid:
- Each tool: 60x60px circle
- Background: #00B4DB
- Icon: 30px emoji centered
- Labels: Poppins Regular 12px, #2D3436

Fact Card (appears after answers):
- Background: #E8F4F8
- Border: 2px solid #00B4DB
- Border radius: 15px
- Padding: 20px
- Text: Poppins Regular 16px, #2D3436
- Accent: Blue left border (4px)
```

### **SCREEN 4: Level-Up Celebration Overlay**
**Figma Frame Size:** 1920x1080 (Full screen overlay)

**LAYOUT STRUCTURE:**
```
Background Overlay:
- Background: rgba(0,0,0,0.8)
- Backdrop blur: 15px

Celebration Container (Centered):
- Background: Linear gradient #00B4DB to #0083B0
- Border radius: 30px
- Padding: 60px
- Max width: 600px
- Box shadow: 0 20px 60px rgba(0,0,0,0.3)

Content Structure:
Header:
- "🎉 LEVEL UP! 🎉" - Poppins Bold 48px, #FFFFFF
- Level progression: "Level 2 → 3" - Orbitron Bold 32px, #FFFFFF

Rewards Section:
- Title: "🏆 NEW CHARITY:WATER TOOLS! 🏆" - Poppins SemiBold 24px, #FFFFFF
- Tool grid: 3 columns, each tool in 150x150px card
- Tool cards: White background, #00B4DB borders, 15px radius

Continue Button:
- Background: #FF6B6B to #EE5A24 gradient
- Border radius: 50px
- Padding: 20px 40px
- Text: "🎊 Continue Quest 🎊" - Poppins SemiBold 20px, #FFFFFF

Particle Effects (Decorative):
- Various sized circles in charity:water blues
- Scattered around the container
- Opacity variations: 40-80%
```

### **SCREEN 5: Final Results & charity:water CTA**
**Figma Frame Size:** 1920x1080 (Desktop), 375x812 (Mobile)

**LAYOUT STRUCTURE:**
```
Victory Banner:
- Background: Linear gradient #00B4DB to #0083B0
- Full width, 150px height
- Title: "🏆 Quest Complete! 🏆" - Poppins Bold 42px, #FFFFFF
- Subtitle: "Your legendary adventure has concluded!" - Poppins Medium 20px, #FFFFFF

Character Showcase Section:
- Background: rgba(255,255,255,0.95)
- Border radius: 20px
- Padding: 40px
- Layout: Horizontal flex

Character Summary:
- Final avatar: 150px circle
- Hero name: Poppins Bold 28px, #2D3436
- Class: Poppins Medium 20px, #00B4DB
- Final level: Orbitron Bold 24px, #00B4DB

Achievement Badge:
- Circle: 200px diameter
- Background: Radial gradient #00B4DB to #4FC3F7
- Border: 4px solid #FFFFFF
- Shadow: 0 8px 32px rgba(0,180,219,0.3)
- Badge icon: 60px emoji
- Title: "CHARITY:WATER CHAMPION" - Poppins Bold 18px, #FFFFFF
- Description: Poppins Regular 14px, #FFFFFF

Statistics Grid (4 columns):
Each Stat Card (200x150px):
- Background: #FFFFFF
- Border: 2px solid #00B4DB
- Border radius: 15px
- Padding: 20px
- Icon: 40px emoji centered
- Number: Orbitron Bold 32px, #00B4DB
- Label: Poppins Medium 14px, #2D3436

Stats Display:
1. Wells Built: 🏗️ + score
2. Tools Collected: 🛠️ + tools count
3. XP Earned: ⭐ + total XP
4. Success Rate: 📊 + percentage

charity:water Call-to-Action Section:
- Background: Linear gradient #00B4DB to #0083B0
- Border radius: 25px
- Padding: 50px
- Max width: 800px
- Centered

CTA Content:
- Header: "🌍 Ready to Make Real Impact? 🌍" - Poppins Bold 32px, #FFFFFF
- Message: "You've learned about the water crisis - now join charity:water's mission to solve it!" - Poppins Medium 18px, #FFFFFF

Impact Stats (3 columns):
Each Impact Stat (200x120px):
- Background: rgba(255,255,255,0.15)
- Border: 1px solid rgba(255,255,255,0.3)
- Border radius: 15px
- Padding: 20px
- Number: Poppins Bold 36px, #FFFFFF
- Label: Poppins Regular 14px, #FFFFFF

Impact Data:
1. "785M" - "People Without Clean Water"
2. "$40" - "Provides Water For Life"
3. "100%" - "Of Donations Fund Projects"

Action Buttons:
Primary CTA Button:
- Background: Linear gradient #FF6B6B to #EE5A24
- Border radius: 50px
- Padding: 20px 40px
- Text: "💧 Donate to charity:water" - Poppins SemiBold 18px, #FFFFFF
- Link: https://www.charitywater.org/donate

Secondary CTA Button:
- Background: rgba(255,255,255,0.2)
- Border: 2px solid rgba(255,255,255,0.3)
- Border radius: 50px
- Padding: 20px 40px
- Text: "🌍 Learn More" - Poppins SemiBold 18px, #FFFFFF
- Link: https://www.charitywater.org

Action Buttons (Bottom):
Restart Button:
- Background: #00B4DB
- Border radius: 25px
- Padding: 15px 30px
- Text: "🔄 New Adventure" - Poppins SemiBold 16px, #FFFFFF

Share Button:
- Background: #4FC3F7
- Border radius: 25px
- Padding: 15px 30px
- Text: "📤 Share Victory" - Poppins SemiBold 16px, #FFFFFF
```

---

## 📐 **FIGMA DESIGN SPECIFICATIONS**

### **Spacing System**
```
Consistent spacing scale for professional layouts:
• 4px - Minimal spacing (icon padding)
• 8px - Small spacing (between related elements)
• 12px - Medium spacing (component internal padding)
- 16px - Standard spacing (between components)
• 20px - Large spacing (section padding)
• 24px - XL spacing (between major sections)
• 32px - XXL spacing (screen margins)
• 40px - XXXL spacing (hero sections)
```

### **Grid System**
```
Desktop (1920px): 12-column grid, 80px margins, 20px gutters
Tablet (768px): 8-column grid, 40px margins, 16px gutters  
Mobile (375px): 4-column grid, 20px margins, 12px gutters
```

### **Shadow System**
```
Card Shadow: 0 4px 12px rgba(0,0,0,0.1)
Button Shadow: 0 4px 16px rgba(0,180,219,0.3)
Modal Shadow: 0 20px 60px rgba(0,0,0,0.3)
Hover Shadow: 0 8px 25px rgba(0,180,219,0.4)
```

### **Border Radius System**
```
Small: 8px (buttons, small cards)
Medium: 15px (cards, inputs)
Large: 20px (panels, major components)
XL: 25px (hero sections)
Pill: 50px (CTA buttons)
Circle: 50% (avatars, badges)
```

---

## 🎯 **FIGMA IMPLEMENTATION CHECKLIST**

### **Phase 1: Setup**
- [ ] Create Figma file with proper naming
- [ ] Set up color palette as Figma color styles
- [ ] Create text styles for typography system
- [ ] Set up grid systems for responsive design

### **Phase 2: Component Library**
- [ ] Design button components (primary, secondary, states)
- [ ] Create card components (question, answer, fact, tool)
- [ ] Build avatar selection components
- [ ] Design progress bar components
- [ ] Create badge and achievement components

### **Phase 3: Screen Design**
- [ ] Welcome screen with particle background
- [ ] Character selection with 8 avatar grid
- [ ] Main game interface with 3-column layout
- [ ] Level-up celebration overlay
- [ ] Final results with charity:water CTA

### **Phase 4: Responsive Design**
- [ ] Create mobile versions (375px width)
- [ ] Ensure touch targets meet 44px minimum
- [ ] Test responsive component behavior
- [ ] Optimize for tablet breakpoints

### **Phase 5: Interactive Prototyping**
- [ ] Link screens with transition animations
- [ ] Add hover states for all interactive elements
- [ ] Create click/tap animations
- [ ] Simulate level-up celebration sequence

### **Phase 6: Design Documentation**
- [ ] Create design system documentation
- [ ] Export assets for development
- [ ] Provide CSS specifications
- [ ] Share Figma file with stakeholders

---

## 🔗 **PROFESSIONAL PRESENTATION**

### **Figma File Organization**
```
Pages Structure:
1. 🎨 Design System (colors, typography, components)
2. 💻 Desktop Wireframes (1920x1080)
3. 📱 Mobile Wireframes (375x812)
4. 🔄 User Flow (connected prototype)
5. 📋 Specifications (measurements, export assets)
```

### **Presentation Features**
```
Professional Figma Capabilities to Demonstrate:
• Auto-layout for responsive components
• Component variants for different states
• Interactive prototyping with transitions
• Design tokens for consistent branding
• Collaborative commenting and feedback
• Developer handoff with CSS specifications
• Asset export for implementation
• Version control and design history
```

This comprehensive Figma implementation guide demonstrates professional wireframing and mockup skills while maintaining the charity:water brand integrity and creating a spectacular user experience for the educational RPG game.
