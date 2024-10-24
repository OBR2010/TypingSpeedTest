// State Management
const state = {
    currentText: '',
    typed: '',
    startTime: null,
    endTime: null,
    timer: null,
    timeLimit: 60,
    wpm: 0,
    accuracy: 0,
    errors: 0,
    currentIndex: 0,
    isTestActive: false,
    testHistory: [],
    settings: {
        theme: 'light',
        soundEffects: true,
        smoothCaret: true,
        fontSize: 16
    }
};

// DOM Elements
const elements = {
    textDisplay: document.getElementById('textDisplay'),
    textInput: document.getElementById('textInput'),
    wpmDisplay: document.getElementById('wpm'),
    accuracyDisplay: document.getElementById('accuracy'),
    timerDisplay: document.getElementById('timer'),
    restartBtn: document.getElementById('restartBtn'),
    timeSelect: document.getElementById('timeSelect'),
    modeSelect: document.getElementById('modeSelect'),
    themeToggle: document.getElementById('themeToggle'),
    settingsBtn: document.getElementById('settingsBtn'),
    resultsModal: document.getElementById('results'),
    settingsModal: document.getElementById('settings'),
    fontSelect: document.getElementById('fontSelect'),
    soundToggle: document.getElementById('soundToggle'),
    smoothCaret: document.getElementById('smoothCaret'),
    fontSize: document.getElementById('fontSize')
};

// Sound Effects
const sounds = {
    keypress: new Audio('assets/sounds/keypress.mp3'),
    error: new Audio('assets/sounds/error.mp3'),
    success: new Audio('assets/sounds/success.mp3')
};

// Test Texts
const testTexts = {
    words: [
        "the quick brown fox jumps over the lazy dog",
        "pack my box with five dozen liquor jugs",
        "how vexingly quick daft zebras jump",
        "Cameron, jumps over the wall",
        "The fox runs with haste",
        "The sun sets beyond the horizon, painting the sky in hues of orange and pink.",
        "Birds chirped as the morning light peeked through the curtains.",
        "A gentle breeze swept across the open field, rustling the tall grass.",
        "Clouds gathered slowly, hinting at an approaching storm.",
        "She walked through the forest, enjoying the crisp scent of pine needles.",
        "The old clock on the wall ticked steadily, marking the passage of time.",
        "Cars zoomed past on the highway as commuters rushed home.",
        "Leaves crunched beneath his boots as he strolled through the park.",
        "The bakery on the corner always smells like fresh bread in the morning.",
        "A small cat slept peacefully on the windowsill, bathed in sunlight.",
        "The waterfall cascaded down the rocks, filling the air with mist.",
        "People gathered in the square to celebrate the town's anniversary.",
        "Rain pattered softly on the roof, creating a soothing rhythm.",
        "A stack of books sat untouched on the dusty shelf.",
        "The children played joyfully in the backyard all afternoon.",
        "Her coffee mug was warm in her hands as she stared out the window.",
        "The classroom was silent except for the scratching of pencils on paper.",
        "The lighthouse stood tall, guiding ships safely to shore.",
        "Buses lined up at the station, waiting for passengers to board.",
        "The garden bloomed with vibrant flowers after the spring rain.",
        "He arranged the chairs neatly before the meeting began.",
        "The football match ended with a thrilling penalty shootout.",
        "A rainbow stretched across the sky after the storm cleared.",
        "The market bustled with activity as vendors sold their goods.",
        "She knitted quietly by the fireplace, lost in thought.",
        "The dog wagged its tail happily when it saw its owner return.",
        "The museum displayed ancient artifacts from distant lands.",
        "Stars glittered faintly in the clear night sky.",
        "A train whistled in the distance, echoing through the hills.",
        "The chef garnished the dish with fresh herbs and a drizzle of sauce.",
        "He unlocked the door and stepped into the empty house.",
        "A group of hikers ascended the mountain trail at dawn.",
        "The artist blended colors skillfully on the canvas.",
        "The plane soared through the sky, leaving a trail of white vapor.",
        "Waves crashed against the shore with a rhythmic pulse.",
        "The concert ended with fireworks lighting up the night.",
        "The bicycle's wheels spun freely as it rolled down the hill.",
        "Shadows lengthened as the day came to an end.",
        "The farmer planted seeds in neat rows across the field.",
        "The pianist played a beautiful melody that filled the room.",
        "Lanterns illuminated the narrow streets during the festival.",
        "He packed his suitcase and prepared for the journey ahead.",
        "The library was a quiet refuge from the noisy city streets.",
        "A flock of birds took off suddenly from the treetops.",
        "The bridge connected two bustling parts of the city.",
        "She found an old photograph tucked between the pages of a book.",
        "Snowflakes drifted slowly, covering the ground in a white blanket.",
        "The waiter carried a tray of drinks to the busy table.",
        "A pair of butterflies danced through the garden.",
        "The tower clock chimed, signaling the start of the new hour."
        // Add more text samples
    ],
    quotes: [
        "To be or not to be, that is the question",
        "All that glitters is not gold",
        "Life is what happens while you're busy making other plans",
        "Success is not final, failure is not fatal; it is the courage to continue that counts.",
        "Believe you can, and you’re halfway there.",
        "Do what you can with what you have, where you are.",
        "The best way to predict the future is to create it.",
        "Dream big and dare to fail.",
        "Your limitation—it’s only your imagination.",
        "Success usually comes to those who are too busy to be looking for it.",
        "Don't watch the clock; do what it does—keep going.",
        "Hardships often prepare ordinary people for an extraordinary destiny.",
        "Don't let yesterday take up too much of today.",
        "Great things never come from comfort zones.",
        "You are never too old to set another goal or to dream a new dream.",
        "If you want something you never had, you have to do something you’ve never done.",
        "A winner is just a loser who tried one more time.",
        "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
        "Every day is a second chance.",
        "Start where you are. Use what you have. Do what you can.",
        "Failure will never overtake me if my determination to succeed is strong enough.",
        "It’s not whether you get knocked down; it’s whether you get back up.",
        "Don’t limit your challenges; challenge your limits.",
        "Success is the sum of small efforts, repeated day in and day out.",
        "Happiness is not something ready made. It comes from your own actions.",
        "You don’t have to be great to start, but you have to start to be great.",
        "Doubt kills more dreams than failure ever will.",
        "Opportunities don't happen. You create them.",
        "Act as if what you do makes a difference. It does.",
        "Believe in yourself and all that you are.",
        "Strength does not come from physical capacity; it comes from an indomitable will.",
        "It always seems impossible until it's done.",
        "Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart.",
        "The only way to achieve the impossible is to believe it is possible.",
        "Success isn’t about how much money you make; it’s about the difference you make in people’s lives.",
        "Keep your face always toward the sunshine, and shadows will fall behind you.",
        "Do not wait to strike till the iron is hot; but make it hot by striking.",
        "Success is not how high you have climbed, but how you make a positive difference to the world.",
        "You are confined only by the walls you build yourself.",
        "Courage is not the absence of fear, but the triumph over it.",
        "A little progress each day adds up to big results.",
        "You only fail when you stop trying.",
        "Success is getting what you want. Happiness is wanting what you get.",
        "The harder you work for something, the greater you’ll feel when you achieve it.",
        "Do not be embarrassed by your failures; learn from them and start again.",
        "The future depends on what you do today.",
        "Perseverance is not a long race; it is many short races one after another.",
        "Hustle until your haters ask if you’re hiring.",
        "You don’t need to see the whole staircase; just take the first step.",
        "Go confidently in the direction of your dreams. Live the life you have imagined.",
        "Success is not the key to happiness. Happiness is the key to success.",
        "When you arise in the morning, think of what a precious privilege it is to be alive.",
        "Do what makes you happy, be with those who make you smile, and laugh as much as you breathe."
        // Add more quotes
    ],
    code: [
        "function factorial(n) { return n <= 1 ? 1 : n * factorial(n - 1); }",
        "const sum = array.reduce((a, b) => a + b, 0);",
        "class Node { constructor(value) { this.value = value; this.next = null; } }",
        "print('Hello, World!')  # Python",
        "console.log('Hello, World!');  // JavaScript",
        "System.out.println('Hello, World!');  // Java",
        "echo 'Hello, World!';  // PHP",
        "fmt.Println('Hello, World!')  // Go",
        "print *, 'Hello, World!'  ! Fortran",
        "puts 'Hello, World!'  # Ruby",
        "console.log(`Hello, ${name}!`);  // JavaScript (Template Literal)",
        "SELECT * FROM users;  -- SQL",
        "document.getElementById('demo').innerHTML = 'Hello, World!';  // JavaScript (DOM)",
        "#include <stdio.h>\nint main() { printf('Hello, World!'); return 0; }  // C",
        "echo \"Hello, World!\"  # Bash",
        "let greeting = 'Hello, World!';  // JavaScript (Variable Declaration)",
        "const pi = 3.14159;  // JavaScript (Constant)",
        "x = [1, 2, 3, 4, 5]; print(len(x))  # Python (List Length)",
        "[x*x for x in range(10)]  # Python (List Comprehension)",
        "console.log(Array.from('Hello'));  // JavaScript (Convert String to Array)",
        "$('p').hide();  // jQuery (Hide Paragraphs)",
        "printfn \"Hello, World!\"  // F#",
        "data class User(val name: String)  // Kotlin",
        "def greet(): print('Hello')  # Python (Function Definition)",
        "x, y = y, x  # Python (Swap Variables)",
        "print('Even' if n % 2 == 0 else 'Odd')  # Python (Ternary Operator)",
        "result = 10 if x > 0 else -10  # Python (Ternary Assignment)",
        "let square = x => x * x;  // JavaScript (Arrow Function)",
        "let person = {name: 'John', age: 30};  // JavaScript (Object Literal)",
        "def fib(n): return n if n <= 1 else fib(n-1) + fib(n-2)  # Python (Recursion)",
        "grep 'pattern' file.txt  # Bash (Search for Pattern)",
        "public int add(int a, int b) { return a + b; }  // Java (Method Definition)",
        "trait Greet { def greet() = println('Hi!') }  // Scala",
        "echo $(uname -a)  # Bash (Print System Info)",
        "SELECT NOW();  -- SQL (Current Timestamp)",
        "let nums = [1, 2, 3]; let doubled = nums.map(n => n * 2);  // JavaScript (Array Map)",
        "for i in range(5): print(i)  # Python (For Loop)",
        "foreach($x in 1..5) { echo $x; }  # PowerShell",
        "val numbers = listOf(1, 2, 3)  // Kotlin (List Declaration)",
        "printf(\"%.2f\", pi);  // C (Formatted Print)",
        "int[] arr = {1, 2, 3};  // Java (Array Declaration)",
        "my_list = [x for x in range(10) if x % 2 == 0]  # Python (Filter Even Numbers)",
        "alert('Hello, World!');  // JavaScript (Alert Dialog)",
        "let today = new Date();  // JavaScript (Current Date)",
        "lambda x: x * 2  # Python (Lambda Function)",
        "{% if user %} Welcome, {{ user.name }}! {% endif %}  <!-- Django Template -->",
        "import numpy as np; np.zeros((2,2))  # Python (Numpy Array)",
        "text = File.read('file.txt')  # Ruby (Read File)",
        "cargo build --release  # Rust (Build Project)",
        "print(42 in [1, 2, 42])  # Python (Check Membership)",
        "defer fmt.Println('Done')  // Go (Defer Statement)",
    
        // Add more code samples
    ]
};

// Initialize Application
function initializeApp() {
    loadSettings();
    setupEventListeners();
    generateNewTest();
    createChart();
}

// Event Listeners
function setupEventListeners() {
    elements.textInput.addEventListener('input', handleInput);
    elements.restartBtn.addEventListener('click', restartTest);
    elements.timeSelect.addEventListener('change', handleTimeChange);
    elements.modeSelect.addEventListener('change', generateNewTest);
    elements.themeToggle.addEventListener('click', toggleTheme);
    elements.settingsBtn.addEventListener('click', toggleSettings);
    elements.fontSelect.addEventListener('change', updateFont);
    elements.soundToggle.addEventListener('change', toggleSound);
    elements.smoothCaret.addEventListener('change', toggleSmoothCaret);
    elements.fontSize.addEventListener('input', updateFontSize);
}

// Handle Input
function handleInput(e) {
    if (!state.isTestActive) {
        startTest();
    }

    const inputValue = e.target.value;
    updateTyping(inputValue);
    updateStats();
    playSound(inputValue);
    updateCaret();
}

// Update Typing
function updateTyping(input) {
    state.typed = input;
    state.currentIndex = input.length;
    
    // Update text display with correct/incorrect characters
    const displayHTML = state.currentText.split('').map((char, index) => {
        if (index >= input.length) {
            return `<span>${char}</span>`;
        }
        
        if (input[index] === char) {
            return `<span class="correct">${char}</span>`;
        }
        
        return `<span class="incorrect">${char}</span>`;
    }).join('');
    
    elements.textDisplay.innerHTML = displayHTML;
}

// Calculate Stats
function updateStats() {
    const timeElapsed = (Date.now() - state.startTime) / 1000;
    const wordsTyped = state.typed.split(' ').length;
    const minutesElapsed = timeElapsed / 60;
    
    // Calculate WPM
    state.wpm = Math.round(wordsTyped / minutesElapsed);
    
    // Calculate accuracy
    const correctChars = state.typed.split('').filter((char, index) => 
        char === state.currentText[index]
    ).length;
    
    state.accuracy = Math.round((correctChars / state.typed.length) * 100);
    state.errors = state.typed.length - correctChars;
    
    // Update displays
    elements.wpmDisplay.textContent = state.wpm;
    elements.accuracyDisplay.textContent = `${state.accuracy}%`;
}

// Timer Management
function startTimer() {
    state.startTime = Date.now();
    state.timer = setInterval(() => {
        const timeLeft = state.timeLimit - Math.floor((Date.now() - state.startTime) / 1000);
        
        if (timeLeft <= 0) {
            endTest();
            return;
        }
        
        elements.timerDisplay.textContent = `${timeLeft}s`;
    }, 1000);
}

function endTest() {
    clearInterval(state.timer);
    state.endTime = Date.now();
    state.isTestActive = false;
    
    // Save test results
    const result = {
        wpm: state.wpm,
        accuracy: state.accuracy,
        errors: state.errors,
        timestamp: new Date().toISOString()
    };
    
    state.testHistory.push(result);
    saveTestHistory();
    showResults();
}

// Results Display
function showResults() {
    const finalWpm = document.getElementById('finalWpm');
    const finalAccuracy = document.getElementById('finalAccuracy');
    const finalChars = document.getElementById('finalChars');
    const finalErrors = document.getElementById('finalErrors');
    
    finalWpm.textContent = state.wpm;
    finalAccuracy.textContent = `${state.accuracy}%`;
    finalChars.textContent = state.typed.length;
    finalErrors.textContent = state.errors;
    
    updateChart();
    elements.resultsModal.classList.remove('hidden');
}

// Chart Management
let wpmChart;

function createChart() {
    const ctx = document.getElementById('wpmHistory').getContext('2d');
    wpmChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'WPM History',
                data: [],
                borderColor: '#2563eb',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateChart() {
    const recentTests = state.testHistory.slice(-10);
    wpmChart.data.labels = recentTests.map((_, index) => `Test ${index + 1}`);
    wpmChart.data.datasets[0].data = recentTests.map(test => test.wpm);
    wpmChart.update();
}

// Settings Management
function loadSettings() {
    const savedSettings = localStorage.getItem('typingTestSettings');
    if (savedSettings) {
        state.settings = JSON.parse(savedSettings);
        applySettings();
    }
}

function applySettings() {
    document.body.setAttribute('data-theme', state.settings.theme);
    elements.fontSelect.value = state.settings.font;
    elements.soundToggle.checked = state.settings.soundEffects;
    elements.smoothCaret.checked = state.settings.smoothCaret;
    elements.fontSize.value = state.settings.fontSize;
    
    // Apply font settings
    document.body.style.fontFamily = state.settings.font;
    elements.textDisplay.style.fontSize = `${state.settings.fontSize}px`;
    elements.textInput.style.fontSize = `${state.settings.fontSize}px`;
}

function saveSettings() {
    localStorage.setItem('typingTestSettings', JSON.stringify(state.settings));
}

// Theme Management
function toggleTheme() {
    state.settings.theme = state.settings.theme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', state.settings.theme);
    
    // Update theme toggle icon
    const icon = elements.themeToggle.querySelector('i');
    icon.className = state.settings.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    
    saveSettings();
}

// Sound Management
function toggleSound(e) {
    state.settings.soundEffects = e.target.checked;
    saveSettings();
}

function playSound(input) {
    if (!state.settings.soundEffects) return;
    
    const lastChar = input[input.length - 1];
    const isCorrect = lastChar === state.currentText[input.length - 1];
    
    if (isCorrect) {
        sounds.keypress.currentTime = 0;
        sounds.keypress.play();
    } else {
        sounds.error.currentTime = 0;
        sounds.error.play();
    }
}

// Caret Management
let caret;

function initializeCaret() {
    if (caret) caret.remove();
    caret = document.createElement('div');
    caret.className = state.settings.smoothCaret ? 'smooth-caret' : 'caret';
    elements.textDisplay.appendChild(caret);
}

function updateCaret() {
    if (!caret) return;
    
    const currentChar = elements.textDisplay.children[state.currentIndex];
    if (currentChar) {
        const rect = currentChar.getBoundingClientRect();
        const parentRect = elements.textDisplay.getBoundingClientRect();
        
        caret.style.left = `${rect.left - parentRect.left}px`;
        caret.style.top = `${rect.top - parentRect.top}px`;
    }
}

function toggleSmoothCaret(e) {
    state.settings.smoothCaret = e.target.checked;
    initializeCaret();
    saveSettings();
}

// Text Generation
function generateNewTest() {
    const mode = elements.modeSelect.value;
    const texts = testTexts[mode];
    state.currentText = texts[Math.floor(Math.random() * texts.length)];
    
    // Reset state
    state.typed = '';
    state.currentIndex = 0;
    state.isTestActive = false;
    
    // Update display
    elements.textDisplay.innerHTML = state.currentText.split('').map(char => 
        `<span>${char}</span>`
    ).join('');
    
    elements.textInput.value = '';
    elements.wpmDisplay.textContent = '0';
    elements.accuracyDisplay.textContent = '0%';
    elements.timerDisplay.textContent = `${state.timeLimit}s`;
    
    initializeCaret();
}

// Test Management
function startTest() {
    state.isTestActive = true;
    state.startTime = Date.now();
    startTimer();
    elements.textInput.focus();
}

function restartTest() {
    clearInterval(state.timer);
    generateNewTest();
}

function handleTimeChange(e) {
    state.timeLimit = parseInt(e.target.value);
    elements.timerDisplay.textContent = `${state.timeLimit}s`;
}

// Achievement System
const achievements = {
    speedDemon: {
        title: 'Speed Demon',
        description: 'Reach 100 WPM',
        check: () => state.wpm >= 100
    },
    perfectAccuracy: {
        title: 'Perfect Accuracy',
        description: 'Complete a test with 100% accuracy',
        check: () => state.accuracy === 100
    },
    marathon: {
        title: 'Marathon Runner',
        description: 'Complete 10 tests in a row',
        check: () => state.testHistory.length >= 10
    }
};

function checkAchievements() {
    Object.entries(achievements).forEach(([key, achievement]) => {
        if (achievement.check()) {
            showAchievement(achievement);
        }
    });
}

function showAchievement(achievement) {
    const achievementDiv = document.createElement('div');
    achievementDiv.className = 'achievement';
    achievementDiv.innerHTML = `
        <div class="achievement-icon">🏆</div>
        <div class="achievement-text">
            <div class="achievement-title">${achievement.title}</div>
            <div class="achievement-description">${achievement.description}</div>
        </div>
    `;
    
    document.body.appendChild(achievementDiv);
    sounds.success.play();
    
    setTimeout(() => {
        achievementDiv.remove();
    }, 3000);
}

// Keyboard Heat Map
const keyboardHeatMap = new Map();

function updateHeatMap(char) {
    if (!keyboardHeatMap.has(char)) {
        keyboardHeatMap.set(char, 0);
    }
    keyboardHeatMap.set(char, keyboardHeatMap.get(char) + 1);
    renderHeatMap();
}

function renderHeatMap() {
    const heatMap = document.querySelector('.heat-map');
    if (!heatMap) return;
    
    const maxHits = Math.max(...keyboardHeatMap.values());
    
    keyboardHeatMap.forEach((hits, char) => {
        const intensity = hits / maxHits;
        const cell = heatMap.querySelector(`[data-char="${char}"]`);
        if (cell) {
            cell.style.backgroundColor = `rgba(37, 99, 235, ${intensity})`;
        }
    });
}

// Export Results
function exportResults() {
    const results = {
        wpm: state.wpm,
        accuracy: state.accuracy,
        errors: state.errors,
        testHistory: state.testHistory,
        timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'typing-test-results.json';
    a.click();
    
    URL.revokeObjectURL(url);
}

// Share Results
function shareResults() {
    const text = `Just completed a typing test with ${state.wpm} WPM and ${state.accuracy}% accuracy! 🚀`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Typing Test Results',
            text: text,
            url: window.location.href
        });
    } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(text).then(() => {
            showToast('Results copied to clipboard!');
        });
    }
}

// Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast fade-in';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', initializeApp);

// Handle visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden && state.isTestActive) {
        endTest();
    }
});