// Fully reset game and return to welcome screen
function resetGameAndGoHome() {
    resetGame();
    showScreen('welcome-screen');
}
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
        description: 'Get all questions correct in a game',
        unlocked: false,
        celebration: true
    }
};

// Simulate real-time impact numbers
function animateCounterNumbers() {
    const peopleServed = document.getElementById('people-served');
    const projectsFunded = document.getElementById('projects-funded');

    if (peopleServed) {
        animateNumber(peopleServed, 0, 1234567, 3000);
    }

    if (projectsFunded) {
        animateNumber(projectsFunded, 0, 12045, 3000);
    }
}

function animateNumber(element, start, end, duration) {
    const range = end - start;
    const minTimer = 50;
    const stepTime = Math.abs(Math.floor(duration / (range || 1)));
    const timer = Math.max(stepTime, minTimer);

    const startTime = Date.now();

    function run() {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.round(start + (end - start) * progress);
        element.textContent = value.toLocaleString();

        if (progress < 1) {
            setTimeout(run, timer);
        } else {
            try { element.style.animation = 'counter-celebrate 0.5s ease-out'; } catch(e) {}
        }
    }

    run();
}

// Initialize spectacular effects when page loads
function initSpectacularEffects() {
    // Start counter animations
    setTimeout(animateCounterNumbers, 1000);

    // Add CSS for counter celebration
    const style = document.createElement('style');
    style.textContent = `@keyframes counter-celebrate { 0% { transform: scale(1); } 50% { transform: scale(1.2); color: var(--cw-yellow); } 100% { transform: scale(1); } }`;
    document.head.appendChild(style);
}

// Call initialization
document.addEventListener('DOMContentLoaded', initSpectacularEffects);

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

// Impact Stories Array
const impactStories = [
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
        story: "David's rice farm now thrives with clean irrigation water. His family's income has tripled, and they've opened a small business selling surplus crops.",
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
        createFireworks(count = 12) {
            const colors = [
                getBrandColor('--cw-yellow', '#FFC907'),
                getBrandColor('--cw-blue', '#0074D9'),
                getBrandColor('--cw-success', '#28A745'),
                getBrandColor('--cw-yellow-light', '#FFF4CC'),
                getBrandColor('--cw-blue-light', '#E6F3FF')
            ];
            const max = Math.min(count, window.innerWidth <= 480 ? 8 : 20);
            for (let i = 0; i < max; i++) {
                setTimeout(() => {
                    const firework = document.createElement('div');
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    firework.className = 'firework';
                    const size = Math.random() * 8 + 6;
                    firework.style.cssText = `
                        position: fixed;
                        width: ${size}px;
                        height: ${size}px;
                        background: ${color};
                        border-radius: 50%;
                        left: ${Math.random() * window.innerWidth}px;
                        top: ${Math.random() * (window.innerHeight * 0.6)}px;
                        z-index: 10000;
                        box-shadow: 0 0 16px ${color};
                        animation: fireworkBurst ${1.2 + Math.random() * 0.8}s ease-out forwards;
                    `;
                    document.body.appendChild(firework);
                    setTimeout(() => firework.remove(), 2000);
                }, i * 120);
            }
        },

        // Enhanced confetti with charity:water brand colors
        createConfetti(count = 60) {
            const colors = [
                getBrandColor('--cw-yellow', '#FFC907'),
                getBrandColor('--cw-blue', '#0074D9'),
                '#ffffff',
                getBrandColor('--cw-yellow-light', '#FFF4CC'),
                getBrandColor('--cw-blue-light', '#E6F3FF'),
                getBrandColor('--cw-success', '#28A745')
            ];
            const max = Math.min(count, window.innerWidth <= 480 ? 30 : 120);
            for (let i = 0; i < max; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    const w = Math.random() * 10 + 6;
                    const h = Math.random() * 6 + 6;
                    const left = Math.random() * window.innerWidth;
                    const sway = (Math.random() - 0.5) * 200;
                    const rotation = Math.random() * 360;
                    confetti.style.cssText = `
                        position: fixed;
                        width: ${w}px;
                        height: ${h}px;
                        background: ${color};
                        left: ${left}px;
                        top: -20px;
                        z-index: 9999;
                        animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
                        transform: rotate(${rotation}deg);
                        box-shadow: 0 0 6px ${color};
                    `;
                    document.body.appendChild(confetti);
                    // Sway animation via JS for slight physics
                    const duration = 2000 + Math.random() * 3000;
                    const start = Date.now();
                    const initialTop = -20;
                    const endTop = window.innerHeight + 50;
                    const swayAmp = sway;
                    const anim = setInterval(() => {
                        const t = (Date.now() - start) / duration;
                        if (t >= 1) {
                            clearInterval(anim);
                            if (confetti.parentNode) confetti.remove();
                            return;
                        }
                        confetti.style.transform = `translateX(${swayAmp * Math.sin(t * Math.PI)}px) rotate(${rotation + t * 360}deg)`;
                        confetti.style.top = (initialTop + t * (endTop - initialTop)) + 'px';
                    }, 16);
                }, i * 30);
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
};

// Helper to read brand CSS variables safely at runtime
function getBrandColor(varName, fallback) {
    try {
        const val = getComputedStyle(document.documentElement).getPropertyValue(varName);
        return (val && val.trim()) ? val.trim() : fallback;
    } catch (e) {
        return fallback;
    }
}

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
        
        // Update score display with spectacular animation
        updateScoreDisplay();
        
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
        playSound('success');
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

// Enhanced score display update with spectacular animation
function updateScoreDisplay() {
    const scoreElement = document.getElementById('score-display');
    if (scoreElement) {
        // Add animation class
        scoreElement.classList.add('score-increase');
        
        // Update the score with counting animation
        const startScore = parseInt(scoreElement.textContent);
        const endScore = gameState.score;
        const duration = 600;
        const startTime = Date.now();
        
        function animateScore() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth counting
            const eased = 1 - Math.pow(1 - progress, 3);
            const currentScore = Math.floor(startScore + (endScore - startScore) * eased);
            
            scoreElement.textContent = currentScore;
            
            if (progress < 1) {
                requestAnimationFrame(animateScore);
            } else {
                // Remove animation class after completion
                setTimeout(() => {
                    scoreElement.classList.remove('score-increase');
                }, 200);
                
                // Create score celebration effect
                createScoreCelebration(scoreElement);
            }
        }
        
        animateScore();
    }
}

// Create celebration effect when score increases
function createScoreCelebration(scoreElement) {
    const rect = scoreElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create floating +1 indicator
    const pointsIndicator = document.createElement('div');
    pointsIndicator.innerHTML = '+1 💧';
    pointsIndicator.style.cssText = `
        position: fixed;
        left: ${centerX}px;
        top: ${centerY - 20}px;
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--cw-success);
        pointer-events: none;
        z-index: 10000;
        text-shadow: 0 2px 4px rgba(40, 167, 69, 0.5);
        transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(pointsIndicator);
    
    // Animate the indicator
    pointsIndicator.animate([
        { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
        { transform: 'translate(-50%, -80px) scale(1.2)', opacity: 1 },
        { transform: 'translate(-50%, -120px) scale(1)', opacity: 0 }
    ], {
        duration: 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    // Create sparkles around the score
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.cssText = `
                position: fixed;
                left: ${centerX + (Math.random() - 0.5) * 60}px;
                top: ${centerY + (Math.random() - 0.5) * 40}px;
                font-size: 1rem;
                pointer-events: none;
                z-index: 9999;
                animation: sparkleFloat 0.8s ease-out forwards;
            `;
            
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 800);
        }, i * 50);
    }
    
    // Remove the points indicator
    setTimeout(() => pointsIndicator.remove(), 1000);
    
    // Play celebration sound
    playSound('sparkle');
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
        // Show spectacular win overlay
        const winOverlay = document.getElementById('win-celebration-overlay');
        if (winOverlay) {
            winOverlay.classList.add('active');
            setTimeout(() => {
                winOverlay.classList.remove('active');
            }, 5000);
        }
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

// Example: call this when win condition is met
// triggerWinCelebration();

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

// Ensure script file ends cleanly


// ===========================
// MOBILE & RESPONSIVE OPTIMIZATIONS
// ===========================

// Detect mobile device and screen size
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isTablet = /iPad|Android|Tablet/i.test(navigator.userAgent) && window.innerWidth >= 768;
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Responsive utilities
class ResponsiveManager {
    constructor() {
        this.breakpoints = {
            mobile: 480,
            tablet: 768,
            desktop: 1024
        };
        this.currentBreakpoint = this.getCurrentBreakpoint();
        this.initializeResponsiveFeatures();
    }

    getCurrentBreakpoint() {
        const width = window.innerWidth;
        if (width <= this.breakpoints.mobile) return 'mobile';
        if (width <= this.breakpoints.tablet) return 'tablet';
        return 'desktop';
    }

    initializeResponsiveFeatures() {
        // Add device class to body
        document.body.classList.add(this.currentBreakpoint);
        if (isMobile) document.body.classList.add('mobile-device');
        if (isTablet) document.body.classList.add('tablet-device');
        if (isTouchDevice) document.body.classList.add('touch-device');

        // Handle window resize
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // Optimize for mobile performance
        if (isMobile || isTouchDevice) {
            this.optimizeForMobile();
        }

        // Handle orientation changes
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.handleOrientationChange(), 100);
        });
    }

    handleResize() {
        const newBreakpoint = this.getCurrentBreakpoint();
        if (newBreakpoint !== this.currentBreakpoint) {
            document.body.classList.remove(this.currentBreakpoint);
            document.body.classList.add(newBreakpoint);
            this.currentBreakpoint = newBreakpoint;
            this.adjustLayoutForBreakpoint(newBreakpoint);
        }
    }

    handleOrientationChange() {
        // Adjust collectible drops for new orientation
        if (collectibleDrops) {
            collectibleDrops.forEach(drop => {
                const x = Math.random() * (window.innerWidth - 60) + 30;
                const y = Math.random() * (window.innerHeight - 60) + 30;
                drop.style.left = x + 'px';
                drop.style.top = y + 'px';
            });
        }

        // Recalculate particle positions
        if (window.particlesJS) {
            window.particlesJS.load('particles-js', 'particles.json');
        }
    }

    optimizeForMobile() {
        // Reduce particle count on mobile
        const particleContainer = document.getElementById('particles-js');
        if (particleContainer) {
            particleContainer.style.opacity = '0.3';
        }

        // Reduce collectible drop spawn rate on mobile
        if (this.currentBreakpoint === 'mobile') {
            // Limit collectibles to 2 max instead of 3
            maxCollectibleDrops = 2;
        }

        // Add touch-friendly enhancements
        this.addTouchEnhancements();
    }

    addTouchEnhancements() {
        // Add touch feedback to interactive elements
        const touchElements = document.querySelectorAll('.answer-btn, .avatar-option, .cw-primary-btn, .cw-secondary-btn');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', (e) => {
                element.style.transform = 'scale(0.95)';
                element.style.transition = 'transform 0.1s ease';
            });

            element.addEventListener('touchend', (e) => {
                setTimeout(() => {
                    element.style.transform = '';
                    element.style.transition = '';
                }, 100);
            });
        });

        // Prevent double-tap zoom on specific elements
        const preventZoomElements = document.querySelectorAll('.water-drop-collectible, .answer-btn');
        preventZoomElements.forEach(element => {
            element.addEventListener('touchend', (e) => {
                e.preventDefault();
            });
        });
    }

    adjustLayoutForBreakpoint(breakpoint) {
        // Adjust collectible drop sizes
        const drops = document.querySelectorAll('.water-drop-collectible');
        drops.forEach(drop => {
            if (breakpoint === 'mobile') {
                drop.style.fontSize = '1.5rem';
            } else if (breakpoint === 'tablet') {
                drop.style.fontSize = '1.8rem';
            } else {
                drop.style.fontSize = '2rem';
            }
        });

        // Adjust animation intensities
        if (breakpoint === 'mobile') {
            // Reduce animation complexity on mobile
            document.documentElement.style.setProperty('--animation-scale', '0.7');
        } else {
            document.documentElement.style.setProperty('--animation-scale', '1');
        }
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Enhanced collectible system with mobile optimizations
let maxCollectibleDrops = 3;

// Modify createCollectibleDrop for mobile optimization
function createCollectibleDropMobile() {
    if (collectibleDrops.length >= maxCollectibleDrops) return;
    
    const drop = document.createElement('div');
    drop.className = 'water-drop-collectible';
    drop.innerHTML = '💧';
    
    // Mobile-optimized positioning (avoid edges)
    const margin = window.innerWidth <= 480 ? 60 : 30;
    const x = Math.random() * (window.innerWidth - margin * 2) + margin;
    const y = Math.random() * (window.innerHeight - margin * 2) + margin;
    
    drop.style.left = x + 'px';
    drop.style.top = y + 'px';
    
    // Enhanced touch handling
    if (isTouchDevice) {
        drop.style.padding = '10px';
        drop.style.borderRadius = '50%';
        drop.style.background = 'rgba(87, 197, 182, 0.1)';
        
        // Touch events
        drop.addEventListener('touchstart', (e) => {
            e.preventDefault();
            drop.style.transform = 'scale(1.2)';
        });
        
        drop.addEventListener('touchend', (e) => {
            e.preventDefault();
            collectDrop(drop);
        });
    }
    
    // Click handler for desktop
    drop.onclick = () => collectDrop(drop);
    
    const container = document.getElementById('collectible-drops');
    if (container) {
        container.appendChild(drop);
        collectibleDrops.push(drop);
        
        // Mobile-optimized timeout
        const timeout = window.innerWidth <= 480 ? 12000 : 15000;
        setTimeout(() => {
            if (drop.parentNode) {
                removeDrop(drop);
            }
        }, timeout);
    }
}

// Initialize responsive manager
const responsiveManager = new ResponsiveManager();

// Performance optimization for mobile
if (isMobile) {
    // Reduce animation frequency
    document.addEventListener('DOMContentLoaded', () => {
        const style = document.createElement('style');
        style.textContent = `
            .water-droplet {
                animation-duration: 12s !important;
            }
            .floating-droplets .water-droplet:nth-child(even) {
                display: none;
            }
        `;
        document.head.appendChild(style);
    });
}

// ===========================
// INTERACTIVE COLLECTIBLE SYSTEM
// ===========================

// Game state for collectibles
let bonusDropsCollected = 0;
let collectibleDrops = [];

// Initialize collectible water drops system
function initializeCollectibleDrops() {
    // Create initial drops on welcome screen
    if (isMobile || isTouchDevice) {
        createCollectibleDropMobile();
    } else {
        createCollectibleDrop();
    }
    
    // Create new drops periodically with responsive timing
    const interval = window.innerWidth <= 480 ? 7000 : 5000;
    setInterval(() => {
        if (collectibleDrops.length < maxCollectibleDrops) {
            if (isMobile || isTouchDevice) {
                createCollectibleDropMobile();
            } else {
                createCollectibleDrop();
            }
        }
    }, interval);
}

// Create a single collectible water drop
function createCollectibleDrop() {
    const drop = document.createElement('div');
    // 15% chance to spawn a contaminated drop, 10% chance to spawn a purifier drop
    const rand = Math.random();
    let isContaminated = false;
    let isPurifier = false;
    if (rand < 0.15) {
        isContaminated = true;
        drop.className = 'contaminated-drop-collectible';
        drop.innerHTML = '🦠';
        drop.setAttribute('aria-label', 'Contaminated drop. Penalty if collected.');
    } else if (rand < 0.25) {
        isPurifier = true;
        drop.className = 'purifier-drop-collectible';
        drop.innerHTML = '🧴';
        drop.setAttribute('aria-label', 'Purifier drop. Removes penalty or grants temporary immunity.');
    } else {
        drop.className = 'water-drop-collectible';
        drop.innerHTML = '💧';
        drop.setAttribute('aria-label', 'Collectible water drop. Grants bonus XP.');
    }
    // Random position
    const x = Math.random() * (window.innerWidth - 60) + 30;
    const y = Math.random() * (window.innerHeight - 60) + 30;
    drop.style.left = x + 'px';
    drop.style.top = y + 'px';
    // Make focusable and keyboard accessible
    drop.setAttribute('tabindex', '0');
    // Add click handler
    drop.onclick = () => {
        if (isContaminated) {
            collectContaminatedDrop(drop);
        } else if (isPurifier) {
            collectPurifierDrop(drop);
        } else {
            collectDrop(drop);
        }
    };
    // Keyboard interaction: Enter or Space to trigger click
    drop.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            drop.click();
        }
    });
    // Track if player is immune to contaminated drops
let contaminatedImmunity = false;
let contaminatedPenaltyStack = 0;

// Purifier drop logic
function collectPurifierDrop(drop) {
    if (drop.classList.contains('collected')) return;
    drop.classList.add('collected');
    // If player has a penalty, remove it; else grant immunity for 20 seconds
    if (contaminatedPenaltyStack > 0) {
        addExperience(30); // Refund last penalty
        contaminatedPenaltyStack--;
        showPurifierMessage('Penalty Cleared! +30 XP', drop);
    } else {
        contaminatedImmunity = true;
        showPurifierMessage('Immunity: 20s', drop);
        // Visual indicator for immunity
        document.body.classList.add('contaminated-immune');
        setTimeout(() => {
            contaminatedImmunity = false;
            document.body.classList.remove('contaminated-immune');
        }, 20000);
    }
    playSound('success');
    createPurifierEffect(drop);
    setTimeout(() => {
        removeDrop(drop);
    }, 600);
}

function showPurifierMessage(message, element) {
    const rect = element.getBoundingClientRect();
    const purifierText = document.createElement('div');
    purifierText.innerHTML = message;
    purifierText.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top - 30}px;
        font-size: 1.2rem;
        font-weight: bold;
        color: #0074D9;
        pointer-events: none;
        z-index: 10000;
        text-shadow: 0 2px 4px #0074D988;
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(purifierText);
    purifierText.animate([
        { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
        { transform: 'translate(-50%, -80px) scale(1.2)', opacity: 1 },
        { transform: 'translate(-50%, -120px) scale(1)', opacity: 0 }
    ], {
        duration: 1500,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    setTimeout(() => purifierText.remove(), 1500);
}

function createPurifierEffect(drop) {
    const rect = drop.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Blue ripple
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        left: ${centerX}px;
        top: ${centerY}px;
        width: 10px;
        height: 10px;
        border: 3px solid #0074D9;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(ripple);
    ripple.animate([
        { width: '10px', height: '10px', opacity: 0.8 },
        { width: '100px', height: '100px', opacity: 0 }
    ], {
        duration: 600,
        easing: 'ease-out'
    });
    setTimeout(() => ripple.remove(), 600);
}

// Penalty for contaminated drop
function collectContaminatedDrop(drop) {
    if (drop.classList.contains('collected')) return;
    drop.classList.add('collected');
    // If immune, no penalty
    if (contaminatedImmunity) {
        showPenaltyMessage('Immune! No penalty.', drop);
        playSound('success');
        createPurifierEffect(drop);
    } else {
        // Decrease score or XP
        addExperience(-30);
        contaminatedPenaltyStack++;
        showPenaltyMessage('-30 XP! Contaminated drop!', drop);
        playSound('error');
        createContaminatedEffect(drop);
    }
    setTimeout(() => {
        removeDrop(drop);
    }, 600);
}

function showPenaltyMessage(message, element) {
    const rect = element.getBoundingClientRect();
    const penaltyText = document.createElement('div');
    penaltyText.innerHTML = message;
    penaltyText.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top - 30}px;
        font-size: 1.2rem;
        font-weight: bold;
        color: #DC3545;
        pointer-events: none;
        z-index: 10000;
        text-shadow: 0 2px 4px #DC354588;
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(penaltyText);
    penaltyText.animate([
        { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
        { transform: 'translate(-50%, -80px) scale(1.2)', opacity: 1 },
        { transform: 'translate(-50%, -120px) scale(1)', opacity: 0 }
    ], {
        duration: 1500,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    setTimeout(() => penaltyText.remove(), 1500);
}

function createContaminatedEffect(drop) {
    const rect = drop.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Red warning ripple
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        left: ${centerX}px;
        top: ${centerY}px;
        width: 10px;
        height: 10px;
        border: 3px solid #DC3545;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(ripple);
    ripple.animate([
        { width: '10px', height: '10px', opacity: 0.8 },
        { width: '100px', height: '100px', opacity: 0 }
    ], {
        duration: 600,
        easing: 'ease-out'
    });
    setTimeout(() => ripple.remove(), 600);
}


// Collect a water drop
function collectDrop(drop) {
    // Prevent multiple clicks
    if (drop.classList.contains('collected')) return;
    
    drop.classList.add('collected');
    
    // Increase bonus score
    bonusDropsCollected++;
    updateBonusDisplay();
    
    // Play collection sound
    playSound('waterDrop');
    
    // Create collection effect
    createCollectionEffect(drop);
    
    // Remove from tracking and DOM
    setTimeout(() => {
        removeDrop(drop);
    }, 600);
    
    // Add small score bonus to main game if quiz is active
    if (document.getElementById('game-screen').classList.contains('active')) {
        // Add bonus XP for collecting during quiz
        addExperience(25);
        showBonusMessage('+25 XP Bonus!', drop);
    }
}

// Remove drop from tracking
function removeDrop(drop) {
    const index = collectibleDrops.indexOf(drop);
    if (index > -1) {
        collectibleDrops.splice(index, 1);
    }
    if (drop.parentNode) {
        drop.parentNode.removeChild(drop);
    }
}

// Update bonus drops display
function updateBonusDisplay() {
    const bonusElement = document.getElementById('bonus-drops-count');
    if (bonusElement) {
        bonusElement.classList.add('bonus-increase');
        bonusElement.textContent = bonusDropsCollected;
        
        setTimeout(() => {
            bonusElement.classList.remove('bonus-increase');
        }, 800);
    }
}

// Create spectacular collection effect
function createCollectionEffect(drop) {
    const rect = drop.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        left: ${centerX}px;
        top: ${centerY}px;
        width: 10px;
        height: 10px;
        border: 3px solid rgba(87, 197, 182, 0.8);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9999;
    `;
    
    document.body.appendChild(ripple);
    
    ripple.animate([
        { width: '10px', height: '10px', opacity: 0.8 },
        { width: '100px', height: '100px', opacity: 0 }
    ], {
        duration: 600,
        easing: 'ease-out'
    });
    
    // Create sparkle burst
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.cssText = `
                position: fixed;
                left: ${centerX + (Math.random() - 0.5) * 80}px;
                top: ${centerY + (Math.random() - 0.5) * 80}px;
                font-size: 1.2rem;
                pointer-events: none;
                z-index: 9998;
                animation: sparkleFloat 1s ease-out forwards;
            `;
            
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }, i * 50);
    }
    
    setTimeout(() => ripple.remove(), 600);
}

// Show bonus message
function showBonusMessage(message, element) {
    const rect = element.getBoundingClientRect();
    const bonusText = document.createElement('div');
    bonusText.innerHTML = message;
    bonusText.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top - 30}px;
        font-size: 1.2rem;
        font-weight: bold;
        color: var(--cw-success);
        pointer-events: none;
        z-index: 10000;
        text-shadow: 0 2px 4px rgba(40, 167, 69, 0.5);
        transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(bonusText);
    
    bonusText.animate([
        { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
        { transform: 'translate(-50%, -80px) scale(1.2)', opacity: 1 },
        { transform: 'translate(-50%, -120px) scale(1)', opacity: 0 }
    ], {
        duration: 1500,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    setTimeout(() => bonusText.remove(), 1500);
}

// Win celebration function
function triggerWinCelebration() {
  // Show win overlay
  const winOverlay = document.getElementById('win-celebration-overlay');
  if (winOverlay) {
    winOverlay.classList.add('active');
    setTimeout(() => {
      winOverlay.classList.remove('active');
    }, 5000);
  }
  // Create confetti burst
  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-40px';
    confetti.style.background = `hsl(${Math.random()*360},90%,60%)`;
    confetti.style.position = 'fixed';
    confetti.style.width = '16px';
    confetti.style.height = '16px';
    confetti.style.borderRadius = '50%';
    confetti.style.zIndex = 99999;
    document.body.appendChild(confetti);
    confetti.animate([
      { transform: 'translateY(0)', opacity: 1 },
      { transform: `translateY(${window.innerHeight-60}px)`, opacity: 0 }
    ], {
      duration: 1800 + Math.random()*800,
      easing: 'cubic-bezier(.7,.2,.2,1)',
      fill: 'forwards'
    });
    setTimeout(() => confetti.remove(), 2200);
  }
  // Fireworks burst
  for (let j = 0; j < 6; j++) {
    setTimeout(() => {
      const firework = document.createElement('div');
      firework.className = 'firework';
      firework.style.left = (window.innerWidth/2 + (Math.random()-0.5)*180) + 'px';
      firework.style.top = (window.innerHeight/2 + (Math.random()-0.5)*120) + 'px';
      firework.textContent = '🎆';
      firework.style.position = 'fixed';
      firework.style.fontSize = '2.5rem';
      firework.style.zIndex = 99999;
      document.body.appendChild(firework);
      firework.animate([
        { transform: 'scale(0)', opacity: 1 },
        { transform: 'scale(1.5)', opacity: 1 },
        { transform: 'scale(2)', opacity: 0 }
      ], {
        duration: 1200,
        easing: 'ease-out',
        fill: 'forwards'
      });
      setTimeout(() => firework.remove(), 1400);
    }, 300 + j*180);
  }
}

// Enhanced charity:water integration with spectacular effects
function visitCharityWater() {
    window.open('https://www.charitywater.org', '_blank', 'noopener,noreferrer');
}

function donateToCharityWater() {
    window.open('https://www.charitywater.org/donate', '_blank', 'noopener,noreferrer');
}

function learnAboutCharityWater() {
    window.open('https://www.charitywater.org/about', '_blank', 'noopener,noreferrer');
}

// ===========================
// SPECTACULAR CHARITY:WATER EFFECTS
// ===========================

// 3D Card Movement Effects
function handleMissionCardMove(event) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
}

function resetMissionCard() {
    const card = document.querySelector('.mission-card');
    if (card) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
}

function handleCtaCardMove(event) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
}

function resetCtaCard() {
    const card = document.querySelector('.cta-card');
    if (card) {
        card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
}

// Ripple Effect on Button Click
function triggerRippleEffect(event) {
    const button = event.currentTarget;
    const ripple = button.querySelector('.btn-ripple');
    
    if (ripple) {
        ripple.style.width = '300px';
        ripple.style.height = '300px';
        
        setTimeout(() => {
            ripple.style.width = '0';
            ripple.style.height = '0';
        }, 600);
    }
    
    // Add success sound effect
    playSound('successSound');
}

// Spectacular Donate Button Effect
function triggerDonateEffect(event) {
    const button = event.currentTarget;
    
    // Create fireworks effect
    createDonateFireworks(button);
    
    // Create floating hearts
    createFloatingHearts(button);
    
    // Screen flash effect
    createDonateFlash();
    
    // Play level up sound for donation
    playSound('levelUpSound');
    
    // Show thank you message
    setTimeout(() => {
        showDonateThankYou();
    }, 500);
}

// Mega Donate Effect (for CTA section)
function triggerMegaDonateEffect(event) {
    const button = event.currentTarget;
    
    // Create massive fireworks
    createMegaDonateFireworks();
    
    // Create particle explosion
    createDonateParticleExplosion(button);
    
    // Create rainbow flash
    createRainbowFlash();
    
    // Show spectacular thank you
    setTimeout(() => {
        showMegaDonateThankYou();
    }, 1000);
    
    // Play success sound
    playSound('levelUpSound');
}

// Create Fireworks for Donate Button
function createDonateFireworks(sourceElement) {
    const container = document.getElementById('fireworks-container') || document.body;
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'donate-firework';
            firework.style.position = 'fixed';
            firework.style.left = Math.random() * window.innerWidth + 'px';
            firework.style.top = Math.random() * window.innerHeight + 'px';
            firework.style.width = '4px';
            firework.style.height = '4px';
            firework.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
            firework.style.borderRadius = '50%';
            firework.style.pointerEvents = 'none';
            firework.style.zIndex = '9999';
            document.body.appendChild(firework);
            // Animate firework
            firework.animate([
                { transform: 'scale(0)', opacity: 1 },
                { transform: 'scale(1.5)', opacity: 1 },
                { transform: 'scale(2)', opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out'
            });
            setTimeout(() => firework.remove(), 1000);
        }, i * 100);
    }
}

// Create Mega Fireworks for CTA
function createMegaDonateFireworks() {
    const container = document.getElementById('fireworks-container') || document.body;
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.innerHTML = ['💧', '🌟', '💙', '✨', '🎆'][Math.floor(Math.random() * 5)];
            firework.style.position = 'fixed';
            firework.style.left = (window.innerWidth/2 + (Math.random()-0.5)*180) + 'px';
            firework.style.top = (window.innerHeight/2 + (Math.random()-0.5)*120) + 'px';
            firework.textContent = '🎆';
            firework.style.position = 'fixed';
            firework.style.fontSize = '2.5rem';
            firework.style.zIndex = 99999;
            document.body.appendChild(firework);
            firework.animate([
                { transform: 'scale(0)', opacity: 1 },
                { transform: 'scale(1.5)', opacity: 1 },
                { transform: 'scale(2)', opacity: 0 }
            ], {
                duration: 1200,
                easing: 'ease-out',
                fill: 'forwards'
            });
            setTimeout(() => firework.remove(), 1400);
        }, i * 50);
    }
}

// Create Floating Hearts
function createFloatingHearts(sourceElement) {
    const rect = sourceElement.getBoundingClientRect();
    
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💙';
            heart.style.position = 'fixed';
            heart.style.left = (rect.left + rect.width / 2) + 'px';
            heart.style.top = (rect.top + rect.height / 2) + 'px';
            heart.style.fontSize = '1.5rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            
            document.body.appendChild(heart);
            
            const angle = (i / 12) * 2 * Math.PI;
            const distance = 100 + Math.random() * 100;
            const endX = rect.left + rect.width / 2 + Math.cos(angle) * distance;
            const endY = rect.top + rect.height / 2 + Math.sin(angle) * distance - 100;
            
            heart.animate([
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
                { transform: `translate(${endX - rect.left - rect.width / 2}px, ${endY - rect.top - rect.height / 2}px) scale(1.5)`, opacity: 0 }
            ], {
                duration: 2000,
                easing: 'ease-out'
            });
            
            setTimeout(() => heart.remove(), 2000);
        }, i * 100);
    }
}

// Create Particle Explosion
function createDonateParticleExplosion(sourceElement) {
    const rect = sourceElement.getBoundingClientRect();
    
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = (rect.left + rect.width / 2) + 'px';
        particle.style.top = (rect.top + rect.height / 2) + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.background = `hsl(${45 + Math.random() * 60}, 100%, 50%)`;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        document.body.appendChild(particle);
        
        const angle = Math.random() * 2 * Math.PI;
        const velocity = 50 + Math.random() * 150;
        const endX = Math.cos(angle) * velocity;
        const endY = Math.sin(angle) * velocity;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${endX}px, ${endY}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1500,
            easing: 'ease-out'
        });
        
        setTimeout(() => particle.remove(), 1500);
    }
}

// Screen Flash Effects
function createDonateFlash() {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100vw';
    flash.style.height = '100vh';
    flash.style.background = 'rgba(255, 201, 7, 0.3)';
    flash.style.pointerEvents = 'none';
    flash.style.zIndex = '9998';
    
    document.body.appendChild(flash);
    
    flash.animate([
        { opacity: 0 },
        { opacity: 1 },
        { opacity: 0 }
    ], {
        duration: 300,
        easing: 'ease-in-out'
    });
    
    setTimeout(() => flash.remove(), 300);
}

function createRainbowFlash() {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100vw';
    flash.style.height = '100vh';
    flash.style.background = 'linear-gradient(45deg, #ff0000, #ff8800, #ffff00, #88ff00, #00ff88, #0088ff, #8800ff, #ff0088)';
    flash.style.pointerEvents = 'none';
    flash.style.zIndex = '9998';
    
    document.body.appendChild(flash);
    
    flash.animate([
        { opacity: 0 },
        { opacity: 0.4 },
        { opacity: 0 }
    ], {
        duration: 500,
        easing: 'ease-in-out'
    });
    
    setTimeout(() => flash.remove(), 500);
}

// Thank You Messages
function showDonateThankYou() {
    showAchievementNotification(
        '💙 Thank You!',
        'Every donation brings clean water closer to those who need it most!'
    );
}

function showMegaDonateThankYou() {
    showAchievementNotification(
        '🌟 You\'re Amazing!',
        'Your generosity is changing lives around the world!'
    );
}

// Animated Counter Functions
function animateCounterNumbers() {
    // Simulate real-time impact numbers
    const peopleServed = document.getElementById('people-served');
    const projectsFunded = document.getElementById('projects-funded');
    
    if (peopleServed) {
        animateNumber(peopleServed, 0, 1234567, 3000);
    }
    
    if (projectsFunded) {
        animateNumber(projectsFunded, 0, 12045, 3000);
    }
}

function animateNumber(element, start, end, duration) {
    const range = end - start;
    const minTimer = 50;
    const stepTime = Math.abs(Math.floor(duration / (range || 1)));
    const timer = Math.max(stepTime, minTimer);

    const startTime = Date.now();

    function run() {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.round(start + (end - start) * progress);
        element.textContent = value.toLocaleString();

        if (progress < 1) {
            setTimeout(run, timer);
        } else {
            try { element.style.animation = 'counter-celebrate 0.5s ease-out'; } catch(e) {}
        }
    }

    run();
}

// Initialize spectacular effects when page loads
function initSpectacularEffects() {
    // Start counter animations
    setTimeout(animateCounterNumbers, 1000);

    // Add CSS for counter celebration
    const style = document.createElement('style');
    style.textContent = `@keyframes counter-celebrate { 0% { transform: scale(1); } 50% { transform: scale(1.2); color: var(--cw-yellow); } 100% { transform: scale(1); } }`;
    document.head.appendChild(style);
}

// Call initialization
document.addEventListener('DOMContentLoaded', initSpectacularEffects);

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

