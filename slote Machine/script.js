// Prize configuration
const prizes = [
    { key: 1, value: "1000$", prizeName: "1st Prize" },
    { key: 2, value: "500$", prizeName: "2nd Prize" },
    { key: 3, value: "250$", prizeName: "3rd Prize" }
];

// Slot symbols (including prize symbols and other interesting symbols)
const symbols = ['🎰', '💎', '🌟', '🎲', '7️⃣', '🍀', '⭐', '🎯', '🎪'];

// DOM elements
const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const slot3 = document.getElementById('slot3');
const spinButton = document.getElementById('spinButton');
const resultDisplay = document.getElementById('result');
const probabilityInput = document.getElementById('probability');

// Game state
let isSpinning = false;

// Function to get a random symbol
function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// Function to check if player won based on probability
function checkWinProbability() {
    const probability = parseInt(probabilityInput.value);
    return Math.random() * 100 <= probability;
}

// Function to get a random prize
function getRandomPrize() {
    return prizes[Math.floor(Math.random() * prizes.length)];
}

// Function to animate slots
function animateSlots() {
    const slots = [slot1, slot2, slot3];
    slots.forEach(slot => {
        slot.classList.add('spinning');
        const interval = setInterval(() => {
            slot.textContent = getRandomSymbol();
        }, 100);
        return { slot, interval };
    });
}

// Function to stop animation and show final symbols
function stopAnimation(slots, shouldWin) {
    if (shouldWin) {
        const prize = getRandomPrize();
        const winSymbol = '🎰';
        slots.forEach(slot => {
            slot.textContent = winSymbol;
        });
        resultDisplay.innerHTML = `<p>Congratulations! You won ${prize.value} (${prize.prizeName})! 🎉</p>`;
    } else {
        slots.forEach(slot => {
            slot.textContent = getRandomSymbol();
        });
        resultDisplay.innerHTML = "<p>Better luck next time! 🍀</p>";
    }
}

// Spin function
function spin() {
    if (isSpinning) return;
    isSpinning = true;
    spinButton.disabled = true;

    // Clear previous results
    resultDisplay.innerHTML = "<p>Spinning... 🎲</p>";

    // Start animation
    const slots = [slot1, slot2, slot3];
    slots.forEach(slot => {
        slot.classList.add('spinning');
    });

    // Animate random symbols
    const intervals = slots.map(slot => {
        return setInterval(() => {
            slot.textContent = getRandomSymbol();
        }, 100);
    });

    // Stop animation after random time between 2-4 seconds
    const stopTime = 2000 + Math.random() * 2000;
    setTimeout(() => {
        // Stop all animations
        intervals.forEach(interval => clearInterval(interval));
        slots.forEach(slot => slot.classList.remove('spinning'));

        // Determine if player won based on probability
        const shouldWin = checkWinProbability();
        stopAnimation(slots, shouldWin);

        // Reset game state
        isSpinning = false;
        spinButton.disabled = false;
    }, stopTime);
}

// Event listeners
spinButton.addEventListener('click', spin);

// Input validation for probability
probabilityInput.addEventListener('input', (e) => {
    let value = parseInt(e.target.value);
    if (value < 0) value = 0;
    if (value > 100) value = 100;
    e.target.value = value;
});