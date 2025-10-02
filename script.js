// Enhanced Achievement System with Unlockable Badges
const achievements = {
    'first_drop': {
        name: '💧 First Drop',
        description: 'Answer your first question correctly',
        unlocked: false,
        celebration: true
    },
    'water_warrior': {
        name: '⚔️ Water Warrior',
        description: 'Get 3 questions correct in a row',
        unlocked: false,
        celebration: true
    },
    'perfect_streak': {
        name: '🌟 Perfect Flow',
        description: 'Answer all questions correctly',
        unlocked: false,
        celebration: true
    },
    'knowledge_seeker': {
        name: '📚 Knowledge Seeker',
        description: 'Read all explanation texts',
        unlocked: false,
        celebration: false
    },
    'charity_champion': {
        name: '🏆 charity:water Champion',
        description: 'Complete the entire quiz',
        unlocked: false,
        celebration: true
    },
    'speed_learner': {
        name: '⚡ Quick Thinker',
        description: 'Complete quiz in under 5 minutes',
        unlocked: false,
        celebration: true
    },
    'explorer': {
        name: '🗺️ Water Explorer',
        description: 'Try different character classes',
        unlocked: false,
        celebration: false
    }
};

// Power-Up System
const powerUps = {
    'hint_vision': {
        name: '👁️ Hint Vision',
        description: 'Reveals if an answer is correct or incorrect',
        uses: 2,
        unlockLevel: 2
    },
    'double_xp': {
        name: '⭐ Double XP',
        description: 'Next correct answer gives double experience',
        uses: 1,
        unlockLevel: 3
    },
    'wisdom_boost': {
        name: '🧠 Wisdom Boost',
        description: 'Get a helpful hint about the question',
        uses: 3,
        unlockLevel: 1
    }
};

// Streak System
let gameStreak = {
    current: 0,
    best: 0,
    multiplier: 1
};

// Interactive Stories System
const impactStories = [
    {
        character: '👩‍🌾',
        name: 'Maria from Ethiopia',
        story: 'Maria used to walk 6 hours every day to collect water for her family. Now, with a charity:water well in her village, she has time to tend her crops and send her children to school.',
        impact: 'Time saved: 6 hours per day',
        stats: '1 well = 650 people served'
    },
    {
        character: '👦',
        name: 'James from Uganda',
        story: 'Before the well, James missed school because he had to help fetch water. Now he\'s the top student in his class and dreams of becoming a doctor.',
        impact: 'Education unlocked',
        stats: 'Clean water = 25% increase in school attendance'
    },
    {
        character: '👩‍⚕️',
        name: 'Dr. Sarah from Kenya',
        story: 'The local clinic can now focus on healing instead of treating water-borne diseases. Infant mortality in the area dropped by 35% after the well was installed.',
        impact: 'Lives saved',
        stats: 'Clean water prevents 80% of diseases'
    },
    {
        character: '👨‍🌾',
        name: 'David from Cambodia',
        story: 'David\'s rice farm now thrives with clean irrigation water. His family\'s income has tripled, and they\'ve opened a small business selling surplus crops.',
        impact: 'Economic growth',
        stats: 'Clean water = 260% increase in income potential'
    }
];

// Story Functions
function showRandomStory() {
    const story = impactStories[Math.floor(Math.random() * impactStories.length)];
    
    document.getElementById('story-character').textContent = story.character;
    document.getElementById('story-title').innerHTML = `🌟 Meet ${story.name}`;
    document.getElementById('story-text').textContent = story.story;
    document.getElementById('story-stats').innerHTML = `
        <div class="story-impact">
            <strong>Impact:</strong> ${story.impact}
        </div>
        <div class="story-stat">
            <strong>Did you know?</strong> ${story.stats}
        </div>
    `;
    
    showScreen('story-screen');
    effectsSystem.glowPulse(document.querySelector('.story-card'), '#FFC907');
}

function continueFromStory() {
    if (gameState.currentQuestion < gameState.totalQuestions) {
        showScreen('game-screen');
        loadQuestion();
        initializePowerUps();
    } else {
        showResults();
    }
}

// Social Sharing Functions
function shareOnTwitter() {
    const score = gameState.score;
    const total = gameState.totalQuestions;
    const percentage = Math.round((score / total) * 100);
    
    const text = `🌊 I just scored ${score}/${total} (${percentage}%) on the H2O Hero Quiz and learned about charity:water's mission! 💧 Think you can beat my score? #H2OHero #CharityWater #WaterCrisis`;
    const url = window.location.href;
    
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    
    effectsSystem.glowPulse(document.querySelector('.share-btn.twitter'), '#1DA1F2');
}

function shareOnFacebook() {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    
    effectsSystem.glowPulse(document.querySelector('.share-btn.facebook'), '#4267B2');
}

function copyGameLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        showPowerUpFeedback('🔗 Game link copied! Share it with friends!');
        effectsSystem.glowPulse(document.querySelector('.share-btn.copy'), '#FFC907');
    }).catch(() => {
        // Fallback for older browsers
        showPowerUpFeedback('🔗 Copy this link: ' + window.location.href);
    });
}

// Enhanced Results Display
function displayAchievements() {
    const grid = document.getElementById('achievementsGrid');
    grid.innerHTML = '';
    
    Object.entries(achievements).forEach(([id, achievement]) => {
        const item = document.createElement('div');
        item.className = `achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}`;
        
        item.innerHTML = `
            <span class="achievement-icon">${achievement.unlocked ? '🏆' : '🔒'}</span>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-description">${achievement.description}</div>
        `;
        
        grid.appendChild(item);
    });
}

// Achievement Functions
function checkAchievements() {
    // First Drop
    if (!achievements.first_drop.unlocked && gameState.score >= 1) {
        unlockAchievement('first_drop');
    }
    
    // Water Warrior (3 in a row)
    if (!achievements.water_warrior.unlocked && gameStreak.current >= 3) {
        unlockAchievement('water_warrior');
    }
    
    // Perfect Flow (all correct)
    if (!achievements.perfect_streak.unlocked && gameState.score === gameState.totalQuestions && gameState.currentQuestion === gameState.totalQuestions) {
        unlockAchievement('perfect_streak');
    }
    
    // charity:water Champion (complete quiz)
    if (!achievements.charity_champion.unlocked && gameState.currentQuestion === gameState.totalQuestions) {
        unlockAchievement('charity_champion');
    }
}

function unlockAchievement(achievementId) {
    const achievement = achievements[achievementId];
    if (!achievement || achievement.unlocked) return;
    
    achievement.unlocked = true;
    showAchievementNotification(achievement);
    
    if (achievement.celebration) {
        effectsSystem.createFireworks();
        effectsSystem.createConfetti();
        audioSystem.playLevelUp();
    }
    
    // Bonus XP for achievements
    addExperience(25);
}

function showAchievementNotification(achievement) {
    const notification = document.getElementById('achievement-notification');
    const nameEl = document.getElementById('achievement-name');
    const descEl = document.getElementById('achievement-desc');
    
    nameEl.textContent = achievement.name;
    descEl.textContent = achievement.description;
    
    notification.style.display = 'block';
    setTimeout(() => notification.classList.add('show'), 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.style.display = 'none', 500);
    }, 4000);
}

// Power-Up Functions
function initializePowerUps() {
    const panel = document.getElementById('powerupPanel');
    const grid = document.getElementById('powerupGrid');
    
    if (gameState.level >= 2) {
        panel.style.display = 'block';
        grid.innerHTML = '';
        
        Object.entries(powerUps).forEach(([id, powerUp]) => {
            if (gameState.level >= powerUp.unlockLevel && powerUp.uses > 0) {
                const powerUpEl = createPowerUpElement(id, powerUp);
                grid.appendChild(powerUpEl);
            }
        });
    }
}

function createPowerUpElement(id, powerUp) {
    const div = document.createElement('div');
    div.className = 'powerup-item available';
    div.onclick = () => usePowerUp(id);
    
    div.innerHTML = `
        <span class="powerup-icon">${powerUp.name.split(' ')[0]}</span>
        <div class="powerup-name">${powerUp.name}</div>
        <div class="powerup-desc">${powerUp.description}</div>
        <div class="powerup-uses">${powerUp.uses}</div>
    `;
    
    return div;
}

function usePowerUp(powerUpId) {
    const powerUp = powerUps[powerUpId];
    if (!powerUp || powerUp.uses <= 0) return;
    
    powerUp.uses--;
    
    switch(powerUpId) {
        case 'hint_vision':
            activateHintVision();
            break;
        case 'double_xp':
            activateDoubleXP();
            break;
        case 'wisdom_boost':
            activateWisdomBoost();
            break;
    }
    
    initializePowerUps(); // Refresh display
    effectsSystem.glowPulse(document.getElementById('powerupPanel'), '#FFC907');
}

function activateHintVision() {
    // Highlight correct answer with subtle glow
    const answerButtons = document.querySelectorAll('.answer-btn');
    const correctIndex = questions[gameState.currentQuestion].correct;
    
    answerButtons[correctIndex].style.boxShadow = '0 0 15px var(--cw-success)';
    
    showPowerUpFeedback('👁️ Hint Vision activated! The correct answer is glowing!');
}

function activateDoubleXP() {
    gameState.doubleXPActive = true;
    showPowerUpFeedback('⭐ Double XP activated! Next correct answer gives bonus experience!');
}

function activateWisdomBoost() {
    const question = questions[gameState.currentQuestion];
    const hint = getQuestionHint(question);
    showPowerUpFeedback(`🧠 Wisdom Boost: ${hint}`);
}

function getQuestionHint(question) {
    const hints = [
        "Think about charity:water's mission and impact statistics",
        "Consider the global scale of the water crisis",
        "Remember that charity:water focuses on sustainable solutions",
        "Think about what charity:water has achieved since 2006"
    ];
    return hints[Math.floor(Math.random() * hints.length)];
}

function showPowerUpFeedback(message) {
    const feedback = document.createElement('div');
    feedback.className = 'powerup-feedback';
    feedback.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--cw-blue);
        color: white;
        padding: 20px;
        border-radius: 15px;
        z-index: 10001;
        animation: fadeInOut 3s ease-in-out forwards;
        max-width: 300px;
        text-align: center;
        font-weight: bold;
    `;
    feedback.textContent = message;
    
    document.body.appendChild(feedback);
    setTimeout(() => feedback.remove(), 3000);
}

// Enhanced Streak System
function updateStreak(isCorrect) {
    if (isCorrect) {
        gameStreak.current++;
        if (gameStreak.current > gameStreak.best) {
            gameStreak.best = gameStreak.current;
        }
        
        // Streak bonuses
        if (gameStreak.current >= 3) {
            gameStreak.multiplier = 1.5;
        }
        if (gameStreak.current >= 5) {
            gameStreak.multiplier = 2.0;
        }
    } else {
        gameStreak.current = 0;
        gameStreak.multiplier = 1;
    }
    
    updateStreakDisplay();
    checkAchievements();
}

function updateStreakDisplay() {
    const streakElement = document.getElementById('streakCounter');
    if (streakElement) {
        streakElement.textContent = gameStreak.current;
        
        if (gameStreak.current >= 3) {
            streakElement.parentElement.classList.add('streak-display');
            if (gameStreak.current >= 5) {
                streakElement.parentElement.innerHTML += `<div class="streak-multiplier">x${gameStreak.multiplier} XP!</div>`;
            }
        } else {
            streakElement.parentElement.classList.remove('streak-display');
        }
    }
}

// Audio System
const audioSystem = {
    playSuccess() {
        const audio = document.getElementById('successSound');
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.log('Audio play failed:', e));
        }
    },
    
    playError() {
        const audio = document.getElementById('errorSound');
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.log('Audio play failed:', e));
        }
    },
    
    playLevelUp() {
        const audio = document.getElementById('levelUpSound');
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.log('Audio play failed:', e));
        }
    }
};

// Enhanced effects system with spectacular additions
const effectsSystem = {
        // Screen shake effect
        screenShake() {
            const gameContainer = document.getElementById('gameContainer');
            gameContainer.style.animation = 'screenShake 0.5s ease-in-out';
            setTimeout(() => {
                gameContainer.style.animation = '';
            }, 500);
        },

        // Screen glow pulse
        glowPulse(element, color = '#00b4db') {
            element.style.boxShadow = `0 0 30px ${color}`;
            element.style.animation = 'glowPulse 0.8s ease-out';
            setTimeout(() => {
                element.style.animation = '';
                element.style.boxShadow = '';
            }, 800);
        },

        // Screen flash effect
        screenFlash() {
            const flash = document.createElement('div');
            flash.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(255, 255, 255, 0.8);
                z-index: 9999;
                pointer-events: none;
                animation: flash 0.3s ease-out;
            `;
            document.body.appendChild(flash);
            setTimeout(() => flash.remove(), 300);
        },

        // Enhanced fireworks with charity:water brand colors
        createFireworks() {
            const charityWaterColors = ['#FFC907', '#0074D9', '#28A745', '#FFF4CC', '#E6F3FF', '#E6B506', '#005BA6'];
            
            for (let i = 0; i < 15; i++) {
                setTimeout(() => {
                    const firework = document.createElement('div');
                    const color = charityWaterColors[Math.floor(Math.random() * charityWaterColors.length)];
                    firework.className = 'firework';
                    firework.style.cssText = `
                        position: fixed;
                        width: 6px;
                        height: 6px;
                        background: ${color};
                        border-radius: 50%;
                        left: ${Math.random() * window.innerWidth}px;
                        top: ${Math.random() * window.innerHeight}px;
                        z-index: 10000;
                        box-shadow: 0 0 10px ${color};
                        animation: fireworkBurst 1.5s ease-out forwards;
                    `;
                    document.body.appendChild(firework);
                    setTimeout(() => firework.remove(), 1500);
                }, i * 100);
            }
        },

        // Enhanced confetti with charity:water brand colors
        createConfetti() {
            const charityWaterColors = ['#FFC907', '#0074D9', '#ffffff', '#FFF4CC', '#E6F3FF', '#28A745'];
            
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    const color = charityWaterColors[Math.floor(Math.random() * charityWaterColors.length)];
                    confetti.style.cssText = `
                        position: fixed;
                        width: ${Math.random() * 8 + 4}px;
                        height: ${Math.random() * 8 + 4}px;
                        background: ${color};
                        left: ${Math.random() * window.innerWidth}px;
                        top: -10px;
                        z-index: 9999;
                        animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
                        transform: rotate(${Math.random() * 360}deg);
                        box-shadow: 0 0 4px ${color};
                    `;
                    document.body.appendChild(confetti);
                    setTimeout(() => confetti.remove(), 5000);
                }, i * 50);
            }
        },

        // Enhanced particle burst from element
        particleBurst(element) {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                const angle = (Math.PI * 2 * i) / 20;
                const velocity = Math.random() * 100 + 50;
                const size = Math.random() * 6 + 4;
                
                particle.style.cssText = `
                    position: fixed;
                    width: ${size}px;
                    height: ${size}px;
                    background: #FFC907;
                    border-radius: 50%;
                    left: ${centerX}px;
                    top: ${centerY}px;
                    z-index: 9999;
                    pointer-events: none;
                    box-shadow: 0 0 10px #FFC907;
                `;
                
                document.body.appendChild(particle);
                
                const deltaX = Math.cos(angle) * velocity;
                const deltaY = Math.sin(angle) * velocity;
                
                particle.animate([
                    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                    { transform: `translate(${deltaX}px, ${deltaY}px) scale(0)`, opacity: 0 }
                ], {
                    duration: 800,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }).onfinish = () => particle.remove();
            }
        },

        // Water ripple effect for clicks
        waterRipple(element, event) {
            const rect = element.getBoundingClientRect();
            const ripple = document.createElement('div');
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(0, 116, 217, 0.3), transparent);
                border-radius: 50%;
                transform: scale(0);
                animation: waterRippleEffect 0.6s ease-out;
                pointer-events: none;
                z-index: 10;
            `;
            
            element.style.position = 'relative';
            element.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        },

        // Enhanced sparkle burst for special moments
        sparkleBurst(x, y) {
            for (let i = 0; i < 12; i++) {
                const sparkle = document.createElement('div');
                sparkle.innerHTML = '✨';
                sparkle.style.cssText = `
                    position: fixed;
                    left: ${x}px;
                    top: ${y}px;
                    font-size: 1.5rem;
                    z-index: 9999;
                    pointer-events: none;
                    animation: sparkleBurstAnimation 1.2s ease-out forwards;
                    animation-delay: ${i * 0.1}s;
                    transform: rotate(${i * 30}deg);
                `;
                document.body.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 1200 + (i * 100));
            }
        }
    }
};

// Game State Management (Enhanced)
let gameState = {
    heroName: '',
    heroAvatar: 'water-mage',
    heroClass: 'Water Mage',
    currentQuestion: 0,
    score: 0,
    experience: 0,
    level: 1,
    toolsUnlocked: 0,
    achievements: 0,
    totalQuestions: 7,
    answers: [],
    showFactCards: true,
    inventory: {
        tools: [],
        achievements: []
    },
    effects: {
        particlesEnabled: true,
        soundEnabled: true,
        animationsEnabled: true
    }
};

// Avatar Data
const avatarData = {
    'water-mage': {
        emoji: '🧙‍♂️',
        name: 'Water Mage',
        description: 'Master of aquatic magic'
    },
    'ocean-warrior': {
        emoji: '⚔️',
        name: 'Ocean Warrior',
        description: 'Fierce protector of seas'
    },
    'hydro-engineer': {
        emoji: '👷‍♂️',
        name: 'Hydro Engineer',
        description: 'Builder of water systems'
    },
    'rain-shaman': {
        emoji: '🌧️',
        name: 'Rain Shaman',
        description: 'Caller of storms'
    },
    'aqua-scientist': {
        emoji: '👩‍🔬',
        name: 'Aqua Scientist',
        description: 'Water research expert'
    },
    'tide-ranger': {
        emoji: '🏹',
        name: 'Tide Ranger',
        description: 'Guardian of waterways'
    },
    'bubble-guardian': {
        emoji: '💧',
        name: 'Bubble Guardian',
        description: 'Protector of pure water'
    },
    'wave-rider': {
        emoji: '🏄‍♂️',
        name: 'Wave Rider',
        description: 'Surfer of destiny'
    }
};

// Character Creation Steps
let currentStep = 'avatar';

// Avatar Selection Functions (Enhanced with SPECTACULAR effects)
function selectAvatar(avatarId) {
    // Remove previous selection
    document.querySelectorAll('.avatar-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selection to clicked avatar
    const selectedOption = document.querySelector(`[data-avatar="${avatarId}"]`);
    selectedOption.classList.add('selected');
    
    // SPECTACULAR effects cascade!
    effectsSystem.particleBurst(selectedOption);
    effectsSystem.waterRipple(selectedOption, { clientX: selectedOption.getBoundingClientRect().left + selectedOption.getBoundingClientRect().width / 2, clientY: selectedOption.getBoundingClientRect().top + selectedOption.getBoundingClientRect().height / 2 });
    effectsSystem.sparkleBurst(
        selectedOption.getBoundingClientRect().left + selectedOption.getBoundingClientRect().width / 2,
        selectedOption.getBoundingClientRect().top + selectedOption.getBoundingClientRect().height / 2
    );
    effectsSystem.glowPulse(selectedOption, '#ffd700');
    effectsSystem.screenFlash();
    audioSystem.playSuccess();
    
    // Add rainbow shimmer to selected avatar
    selectedOption.classList.add('rainbow-shimmer');
    
    // Store avatar data
    gameState.heroAvatar = avatarId;
    gameState.heroClass = avatarData[avatarId].name;
    
    // Create floating text with character name
    const floatingText = document.createElement('div');
    floatingText.innerHTML = `✨ ${avatarData[avatarId].name} Selected! ✨`;
    floatingText.style.cssText = `
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 2rem;
        font-weight: bold;
        color: #ffd700;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        z-index: 10000;
        animation: floatingTextSpectacular 2s ease-out forwards;
        pointer-events: none;
    `;
    document.body.appendChild(floatingText);
    setTimeout(() => floatingText.remove(), 2000);
    
    // Enable continue to next step with spectacular delay
    setTimeout(() => {
        goToNameStep();
    }, 1500);
}

function goToNameStep() {
    document.getElementById('avatar-step').classList.remove('active');
    document.getElementById('name-step').classList.add('active');
    currentStep = 'name';
}

function goBackToAvatar() {
    document.getElementById('name-step').classList.remove('active');
    document.getElementById('avatar-step').classList.add('active');
    currentStep = 'avatar';
}

function goToSummaryStep() {
    document.getElementById('name-step').classList.remove('active');
    document.getElementById('summary-step').classList.add('active');
    currentStep = 'summary';
    
    // Update summary display
    updateCharacterSummary();
}

function goBackToName() {
    document.getElementById('summary-step').classList.remove('active');
    document.getElementById('name-step').classList.add('active');
    currentStep = 'name';
}

function updateCharacterSummary() {
    const avatar = avatarData[gameState.heroAvatar];
    document.getElementById('summary-avatar').textContent = avatar.emoji;
    document.getElementById('summary-name').textContent = gameState.heroName;
    document.getElementById('summary-class').textContent = avatar.name;
    document.getElementById('summary-description').textContent = avatar.description;
}

// Hero Name Arrays
const heroNames = {
    adjectives: ['Aqua', 'Hydro', 'Splash', 'Droplet', 'Wave', 'Stream', 'Ocean', 'Rain', 'Mist', 'Bubble'],
    nouns: ['Avenger', 'Defender', 'Guardian', 'Captain', 'Warrior', 'Hero', 'Champion', 'Protector', 'Ranger', 'Master'],
    silly: ['Splashy McSplashface', 'Drippy McDripface', 'Bubbly Wubbly', 'Soggy Bottom', 'Wet Willie', 'Drizzle Pants', 'Puddle Jumper', 'Sprinkle Sparkle']
};

// Quiz Questions Database
const questions = [
    {
        question: "How many people worldwide lack access to clean water according to charity:water?",
        answers: [
            "500 million people",
            "785 million people", 
            "1 billion people",
            "2 billion people"
        ],
        correct: 1,
        explanation: "Correct! 🎉 charity:water reports that 785 million people - that's 1 in 9 people worldwide - lack access to clean, safe drinking water. This is why charity:water exists!",
        tool: "charity:water Well"
    },
    {
        question: "What percentage of charity:water's donations go directly to water projects?",
        answers: [
            "80%",
            "90%",
            "95%",
            "100%"
        ],
        correct: 3,
        explanation: "Amazing! � charity:water's unique model ensures that 100% of public donations go directly to funding clean water projects. Private donors cover operating costs!",
        tool: "Transparency Report"
    },
    {
        question: "How much does it cost charity:water to provide one person with clean water for life?",
        answers: [
            "$10",
            "$20",
            "$40",
            "$100"
        ],
        correct: 2,
        explanation: "Incredible knowledge! � charity:water can provide one person with clean water for life for just $40. That's less than most people spend on coffee in a month!",
        tool: "Water Project Fund"
    },
    {
        question: "What technology does charity:water use to prove water projects are working?",
        answers: [
            "Satellite imagery",
            "GPS and remote sensors",
            "Local reports only",
            "Government inspections"
        ],
        correct: 1,
        explanation: "Excellent! 📡 charity:water uses GPS coordinates and remote sensors to track every water project, providing real-time data to donors about their impact!",
        tool: "GPS Tracker"
    },
    {
        question: "In how many countries has charity:water funded clean water projects?",
        answers: [
            "15 countries",
            "29 countries",
            "45 countries",
            "60 countries"
        ],
        correct: 1,
        explanation: "Perfect! 🌍 charity:water has funded over 91,000 water projects in 29 countries, serving more than 14.7 million people with clean water!",
        tool: "Global Impact Map"
    },
    {
        question: "What happens when women and children don't have to walk hours for water?",
        answers: [
            "Nothing changes",
            "Girls can go to school and women can work",
            "Families move away",
            "Water becomes more expensive"
        ],
        correct: 1,
        explanation: "Heartbreaking but important! 🎓 When clean water comes to communities, girls can attend school instead of walking hours to collect water, breaking cycles of poverty!",
        tool: "Education Opportunity"
    },
    {
        question: "How does charity:water ensure transparency in their water projects?",
        answers: [
            "$50 per person",
            "$25 per person",
            "GPS tracking, photos, and completion reports",
            "Trust-based system only"
        ],
        correct: 2,
        explanation: "Amazing! � Every charity:water project includes GPS coordinates, photos, and completion reports, so donors can see exactly where their money went and the impact it made!",
        tool: "Project Documentation"
    }
];

// charity:water Impact Facts for Fact Cards
const waterFacts = [
    "💧 charity:water has helped over 14.7 million people get access to clean water since 2006!",
    "🚰 100% of public donations to charity:water go directly to water projects - no overhead costs taken from your gift!",
    "🌍 Every charity:water project is tracked with GPS and sensors so you can see exactly where your money went!",
    "👨‍👩‍👧‍👦 When women don't have to walk hours for water, they can work and girls can go to school - clean water breaks the cycle of poverty!",
    "� It costs just $40 to give one person clean water for life through charity:water's efficient projects!",
    "🏥 charity:water projects prevent waterborne diseases that kill more people than war, according to the UN!"
];

// Initialize Game
function initGame() {
    showScreen('welcome-screen');
    resetGame();
}

// Screen Management
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Hero Name Functions
function selectPresetName(name) {
    gameState.heroName = name;
    goToSummaryStep();
}

function selectCustomName() {
    const customName = document.getElementById('custom-hero-name').value.trim();
    if (customName) {
        gameState.heroName = customName;
        goToSummaryStep();
    }
}

function generateRandomName() {
    const isSilly = Math.random() < 0.3; // 30% chance for silly name
    
    if (isSilly) {
        gameState.heroName = heroNames.silly[Math.floor(Math.random() * heroNames.silly.length)];
    } else {
        const adj = heroNames.adjectives[Math.floor(Math.random() * heroNames.adjectives.length)];
        const noun = heroNames.nouns[Math.floor(Math.random() * heroNames.nouns.length)];
        gameState.heroName = `${adj} ${noun}`;
    }
    
    goToSummaryStep();
}

// Game Flow Functions
function startGame() {
    const avatar = avatarData[gameState.heroAvatar];
    document.getElementById('game-hero-name').textContent = gameState.heroName;
    document.getElementById('game-hero-class').textContent = avatar.name;
    document.getElementById('game-avatar').textContent = avatar.emoji;
    
    // Initialize RPG elements
    updateLevel();
    updateInventory();
    initializeInventoryPanel();
    
    showScreen('game-screen');
    loadQuestion();
}

function updateLevel() {
    document.getElementById('hero-level').textContent = gameState.level;
    document.getElementById('hero-xp').textContent = gameState.experience;
    
    // Update XP bar (assuming 100 XP per level)
    const xpInCurrentLevel = gameState.experience % 100;
    document.getElementById('xp-fill').style.width = xpInCurrentLevel + '%';
}

function addExperience(amount) {
    gameState.experience += amount;
    
    // Check for level up
    const newLevel = Math.floor(gameState.experience / 100) + 1;
    if (newLevel > gameState.level) {
        gameState.level = newLevel;
        showLevelUpAnimation();
    }
    
    updateLevel();
}

function showLevelUpAnimation() {
    // Spectacular level up effects
    const levelDisplay = document.getElementById('hero-level');
    const characterPanel = document.querySelector('.character-panel');
    
    // Audio and visual effects
    audioSystem.playLevelUp();
    effectsSystem.screenShake(8, 500);
    effectsSystem.createFireworks(3);
    effectsSystem.glowPulse();
    
    // Character panel glow
    characterPanel.style.animation = 'levelUpGlow 2s ease-out';
    
    // Level number animation
    levelDisplay.style.animation = 'levelUp 1.5s ease-out';
    
    // Particle burst from character
    const avatar = document.getElementById('game-avatar');
    effectsSystem.particleBurst(avatar, 25);
    
    // Reset animations
    setTimeout(() => {
        levelDisplay.style.animation = '';
        characterPanel.style.animation = '';
    }, 2000);
    
    // Show level up notification
    showLevelUpNotification();
}

function showLevelUpNotification() {
    // Create floating notification
    const notification = document.createElement('div');
    notification.className = 'level-up-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">🎉</div>
            <div class="notification-text">LEVEL UP!</div>
            <div class="notification-level">Level ${gameState.level}</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after animation
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 500);
    }, 3000);
}

function initializeInventoryPanel() {
    const panel = document.getElementById('inventory-panel');
    panel.classList.add('collapsed');
}

function toggleInventory() {
    const panel = document.getElementById('inventory-panel');
    const icon = document.getElementById('inventory-toggle');
    
    panel.classList.toggle('collapsed');
    icon.textContent = panel.classList.contains('collapsed') ? '▼' : '▲';
}

function addToInventory(type, item) {
    if (type === 'tool') {
        gameState.inventory.tools.push(item);
        gameState.toolsUnlocked++;
    } else if (type === 'achievement') {
        gameState.inventory.achievements.push(item);
        gameState.achievements++;
    }
    
    updateInventory();
    showNewItemAnimation(type, item);
}

function updateInventory() {
    // Update tools inventory
    const toolsGrid = document.getElementById('tools-inventory');
    toolsGrid.innerHTML = '';
    gameState.inventory.tools.forEach(tool => {
        const item = document.createElement('div');
        item.className = 'inventory-item';
        item.textContent = getToolEmoji(tool);
        item.title = tool;
        toolsGrid.appendChild(item);
    });
    
    // Update achievements inventory
    const achievementsGrid = document.getElementById('achievements-inventory');
    achievementsGrid.innerHTML = '';
    gameState.inventory.achievements.forEach(achievement => {
        const item = document.createElement('div');
        item.className = 'inventory-item';
        item.textContent = getAchievementEmoji(achievement);
        item.title = achievement;
        achievementsGrid.appendChild(item);
    });
    
    // Update stat displays
    document.getElementById('achievements-display').textContent = gameState.achievements;
}

function getToolEmoji(toolName) {
    const toolEmojis = {
        'Water Pump': '⚙️',
        'Water Filter': '🧽',
        'Water Container': '🪣',
        'Purification Tablets': '💊',
        'Emergency Water Kit': '🆘',
        'Water Testing Kit': '🧪',
        'Solar Water Disinfection': '☀️'
    };
    return toolEmojis[toolName] || '🛠️';
}

function getAchievementEmoji(achievementName) {
    const achievementEmojis = {
        'First Well': '🥇',
        'Knowledge Seeker': '📚',
        'Water Warrior': '⚔️',
        'Perfect Score': '💯',
        'Fact Master': '🎓'
    };
    return achievementEmojis[achievementName] || '🏆';
}

function showNewItemAnimation(type, item) {
    // Temporarily expand inventory to show new item
    const panel = document.getElementById('inventory-panel');
    const wasCollapsed = panel.classList.contains('collapsed');
    
    if (wasCollapsed) {
        toggleInventory();
        setTimeout(() => {
            if (wasCollapsed) toggleInventory();
        }, 3000);
    }
    
    // Add animation to new item
    setTimeout(() => {
        const items = document.querySelectorAll('.inventory-item');
        if (items.length > 0) {
            items[items.length - 1].classList.add('new');
        }
    }, 100);
}

function loadQuestion() {
    if (gameState.currentQuestion >= gameState.totalQuestions) {
        showResults();
        return;
    }

    const question = questions[gameState.currentQuestion];
    document.getElementById('question-text').textContent = question.question;
    
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer;
        button.onclick = () => selectAnswer(index);
        answersContainer.appendChild(button);
    });
    
    updateProgress();
    updateScore();
    hideFeedback();
}

function selectAnswer(selectedIndex) {
    const question = questions[gameState.currentQuestion];
    const isCorrect = selectedIndex === question.correct;
    
    // Store answer
    gameState.answers.push({
        questionIndex: gameState.currentQuestion,
        selectedIndex: selectedIndex,
        correct: isCorrect
    });
    
    // SPECTACULAR feedback effects!
    const selectedButton = document.querySelectorAll('.answer-btn')[selectedIndex];
    
    if (isCorrect) {
        // SUCCESS - Magnificent celebration!
        gameState.score++;
        
        // Apply XP multiplier for streaks
        let xpGain = 50;
        if (gameState.doubleXPActive) {
            xpGain *= 2;
            gameState.doubleXPActive = false;
            showPowerUpFeedback('⭐ Double XP bonus applied! +100 XP!');
        }
        if (gameStreak.multiplier > 1) {
            xpGain = Math.floor(xpGain * gameStreak.multiplier);
        }
        
        addExperience(xpGain);
        addToInventory('tool', question.tool);
        updateStreak(true);
        
        // Audio and spectacular visual celebration
        audioSystem.playSuccess();
        effectsSystem.screenFlash();
        effectsSystem.particleBurst(selectedButton);
        effectsSystem.waterRipple(selectedButton, { 
            clientX: selectedButton.getBoundingClientRect().left + selectedButton.getBoundingClientRect().width / 2, 
            clientY: selectedButton.getBoundingClientRect().top + selectedButton.getBoundingClientRect().height / 2 
        });
        effectsSystem.sparkleBurst(
            selectedButton.getBoundingClientRect().left + selectedButton.getBoundingClientRect().width / 2,
            selectedButton.getBoundingClientRect().top + selectedButton.getBoundingClientRect().height / 2
        );
        effectsSystem.glowPulse(selectedButton, '#00b894');
        
        // Add rainbow shimmer to correct answer
        selectedButton.classList.add('rainbow-shimmer');
        
        // Check for achievements
        checkAchievements();
        
        // Add achievements for milestones
        if (gameState.score === 1) {
            addToInventory('achievement', 'First Well');
            effectsSystem.createConfetti();
        }
        if (gameState.score === gameState.totalQuestions) {
            addToInventory('achievement', 'Perfect Score');
            effectsSystem.createFireworks();
            effectsSystem.createConfetti();
        }
    } else {
        // Learning experience with gentle spectacular feedback
        addExperience(10);
        updateStreak(false);
        
        // Gentle but spectacular feedback
        audioSystem.playError();
        effectsSystem.screenShake();
        effectsSystem.waterRipple(selectedButton, { 
            clientX: selectedButton.getBoundingClientRect().left + selectedButton.getBoundingClientRect().width / 2, 
            clientY: selectedButton.getBoundingClientRect().top + selectedButton.getBoundingClientRect().height / 2 
        });
    }
    
    // Enhanced visual feedback on buttons
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach((button, index) => {
        button.classList.add('disabled');
        if (index === question.correct) {
            button.classList.add('correct');
            // Correct answer celebration
            setTimeout(() => {
                effectsSystem.particleBurst(button, 15);
            }, 500);
        } else if (index === selectedIndex && !isCorrect) {
            button.classList.add('incorrect');
        }
    });
    
    // Show feedback
    showFeedback(isCorrect, question);
    
    // Show story every 2-3 questions
    if (gameState.currentQuestion > 0 && gameState.currentQuestion % 3 === 0) {
        setTimeout(() => {
            showRandomStory();
        }, 3000); // Show story after feedback
    }
}

function showFeedback(isCorrect, question) {
    const feedbackSection = document.getElementById('feedback-section');
    const feedbackHeader = document.getElementById('feedback-header');
    const feedbackIcon = document.getElementById('feedback-icon');
    const feedbackText = document.getElementById('feedback-text');
    const rewardsEarned = document.getElementById('rewards-earned');
    
    if (isCorrect) {
        feedbackHeader.textContent = '🎉 Quest Success!';
        feedbackIcon.textContent = '✨';
        feedbackText.innerHTML = question.explanation;
        rewardsEarned.innerHTML = `
            <div class="reward-item">
                <span class="reward-icon">${getToolEmoji(question.tool)}</span>
                <span class="reward-text">+${question.tool}</span>
            </div>
            <div class="reward-item">
                <span class="reward-icon">⭐</span>
                <span class="reward-text">+50 XP</span>
            </div>
        `;
    } else {
        feedbackHeader.textContent = '💪 Keep Learning!';
        feedbackIcon.textContent = '�';
        feedbackText.innerHTML = `Not quite! The correct answer was: "${question.answers[question.correct]}". <br><br>But every hero learns from experience! You still earn knowledge points! 💧`;
        rewardsEarned.innerHTML = `
            <div class="reward-item">
                <span class="reward-icon">⭐</span>
                <span class="reward-text">+10 XP</span>
            </div>
        `;
    }
    
    feedbackSection.style.display = 'block';
    updateScore();
}

function hideFeedback() {
    document.getElementById('feedback-section').style.display = 'none';
}

function nextQuestion() {
    gameState.currentQuestion++;
    
    // Show fact card between some questions
    if (gameState.showFactCards && gameState.currentQuestion < gameState.totalQuestions && Math.random() < 0.4) {
        showFactCard();
    } else {
        loadQuestion();
    }
}

function showFactCard() {
    const randomFact = waterFacts[Math.floor(Math.random() * waterFacts.length)];
    document.getElementById('fact-content').textContent = randomFact;
    
    // Add wisdom bonus XP
    addExperience(25);
    
    showScreen('fact-screen');
}

function continueFromFact() {
    showScreen('game-screen');
    loadQuestion();
}

function updateProgress() {
    const progressPercent = ((gameState.currentQuestion + 1) / gameState.totalQuestions) * 100;
    document.getElementById('progress-fill').style.width = progressPercent + '%';
    document.getElementById('progress-text').textContent = `Question ${gameState.currentQuestion + 1} of ${gameState.totalQuestions}`;
}

function updateScore() {
    document.getElementById('score-display').textContent = gameState.score;
    document.getElementById('tools-display').textContent = gameState.toolsUnlocked;
}

// Results and Ranking System
function showResults() {
    showScreen('results-screen');
    
    const percentage = Math.round((gameState.score / gameState.totalQuestions) * 100);
    const rank = calculateRank(gameState.score, gameState.totalQuestions);
    const avatar = avatarData[gameState.heroAvatar];
    
    // Spectacular results presentation
    setTimeout(() => {
        effectsSystem.createFireworks(10);
        effectsSystem.createConfetti(150);
        audioSystem.playLevelUp();
    }, 500);
    
    // Update character display with animation delays
    setTimeout(() => {
        document.getElementById('final-avatar').textContent = avatar.emoji;
        document.getElementById('final-hero-name').textContent = gameState.heroName;
        document.getElementById('final-hero-class').textContent = avatar.name;
        document.getElementById('final-level').textContent = gameState.level;
        
        // Display achievements
        displayAchievements();
    }, 200);
    
    // Animate stats counting up
    setTimeout(() => {
        animateCountUp('final-score', gameState.score, 1000);
        animateCountUp('final-tools', gameState.toolsUnlocked, 1200);
        animateCountUp('final-xp', gameState.experience, 1400);
        animateCountUp('final-percentage', percentage, 1600, '%');
    }, 800);
    
    // Set rank information with dramatic reveal
    setTimeout(() => {
        document.getElementById('rank-icon').textContent = rank.icon;
        document.getElementById('rank-title').textContent = rank.title;
        document.getElementById('rank-description').textContent = rank.description;
        
        // Rank reveal effects
        const rankBadge = document.getElementById('rank-badge');
        effectsSystem.particleBurst(rankBadge, 30);
        effectsSystem.glowPulse();
    }, 1000);
    
    // Show earned rewards with staggered animation
    setTimeout(() => {
        displayFinalRewards();
    }, 1500);
}

function animateCountUp(elementId, target, duration, suffix = '') {
    const element = document.getElementById(elementId);
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

function displayFinalRewards() {
    const rewardsGrid = document.getElementById('final-rewards');
    rewardsGrid.innerHTML = '';
    
    // Add tools
    gameState.inventory.tools.forEach(tool => {
        const reward = document.createElement('div');
        reward.className = 'reward-item final';
        reward.innerHTML = `
            <span class="reward-icon">${getToolEmoji(tool)}</span>
            <span class="reward-name">${tool}</span>
        `;
        rewardsGrid.appendChild(reward);
    });
    
    // Add achievements
    gameState.inventory.achievements.forEach(achievement => {
        const reward = document.createElement('div');
        reward.className = 'reward-item final';
        reward.innerHTML = `
            <span class="reward-icon">${getAchievementEmoji(achievement)}</span>
            <span class="reward-name">${achievement}</span>
        `;
        rewardsGrid.appendChild(reward);
    });
}

function calculateRank(score, total) {
    const percentage = (score / total) * 100;
    
    if (percentage >= 85) {
        return {
            icon: '🏆',
            title: 'Hydration Hero',
            description: 'You are a true champion of clean water! Your knowledge will help save countless lives.'
        };
    } else if (percentage >= 70) {
        return {
            icon: '⚔️',
            title: 'Water Warrior',
            description: 'You fight bravely for water access! With more training, you\'ll become unstoppable.'
        };
    } else if (percentage >= 50) {
        return {
            icon: '🔨',
            title: 'Well Builder',
            description: 'You\'re building a foundation of knowledge! Keep learning to build more wells.'
        };
    } else {
        return {
            icon: '🌱',
            title: 'Water Apprentice',
            description: 'Every hero starts somewhere! Your journey to save the world has just begun.'
        };
    }
}

// Game Management
function restartGame() {
    resetGame();
    showScreen('welcome-screen');
}

function resetGame() {
    gameState = {
        heroName: '',
        heroAvatar: 'water-mage',
        heroClass: 'Water Mage',
        currentQuestion: 0,
        score: 0,
        experience: 0,
        level: 1,
        toolsUnlocked: 0,
        achievements: 0,
        totalQuestions: 7,
        answers: [],
        showFactCards: true,
        inventory: {
            tools: [],
            achievements: []
        }
    };
    
    currentStep = 'avatar';
    
    // Reset UI elements
    document.getElementById('custom-hero-name').value = '';
    document.querySelectorAll('.avatar-option').forEach(option => {
        option.classList.remove('selected');
    });
    document.querySelectorAll('.creation-step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById('avatar-step').classList.add('active');
    hideFeedback();
}

function shareResults() {
    const percentage = Math.round((gameState.score / gameState.totalQuestions) * 100);
    const rank = calculateRank(gameState.score, gameState.totalQuestions);
    
    const shareText = `I just completed the H2O Hero Quiz as ${gameState.heroName}! 💧\n\n` +
                     `🏆 Rank: ${rank.title}\n` +
                     `🏗️ Wells Built: ${gameState.score}\n` +
                     `🛠️ Tools Unlocked: ${gameState.toolsUnlocked}\n` +
                     `📊 Success Rate: ${percentage}%\n\n` +
                     `Join the fight for clean water access! Every drop counts! 🌍💙`;
    
    if (navigator.share) {
        navigator.share({
            title: 'H2O Hero Quiz Results',
            text: shareText,
        });
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Results copied to clipboard! Share with your friends!');
        });
    } else {
        alert('Share this message:\n\n' + shareText);
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', initGame);

// Add some fun easter eggs
let clickCount = 0;
document.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 50) {
        alert('🎉 Wow! You\'ve clicked 50 times! You\'re really dedicated to saving water! 💧');
    }
});

// Konami code easter egg (up, up, down, down, left, right, left, right, B, A)
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((code, index) => code === konamiSequence[index])) {
        
        alert('🎮 KONAMI CODE ACTIVATED! 🌊\nYou\'ve unlocked the secret Water Master rank! 💧✨');
        konamiCode = [];
    }
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= '4') {
        const answerButtons = document.querySelectorAll('.answer-btn');
        const index = parseInt(e.key) - 1;
        if (answerButtons[index] && !answerButtons[index].classList.contains('disabled')) {
            answerButtons[index].click();
        }
    }
    
    if (e.key === 'Enter') {
        const continueBtn = document.querySelector('.continue-btn:not([style*="display: none"])');
        if (continueBtn) {
            continueBtn.click();
        }
    }
});
