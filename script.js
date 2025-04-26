const wheel = document.getElementById('wheel');
const spinButton = document.getElementById('spinButton');
const result = document.getElementById('result');

let isSpinning = false;
let currentRotation = 0;

const values = [1000, 2000, 500, 1500, 3000, 800, 2500, 1200, 4000, 750];

function getSegmentValue(degree) {
    // Adjust degree to be positive and within 360
    const normalizedDegree = (360 - (degree % 360)) % 360;
    // Each segment is 36 degrees (360/10)
    const segment = Math.floor(normalizedDegree / 36);
    return values[segment];
}

function spin() {
    if (isSpinning) {
        return; // Prevent spin if already spinning
    }
    
    isSpinning = true;
    spinButton.disabled = true;
    result.textContent = '';
    result.classList.remove('show');
    
    // Random number of rotations (3-5) for consistent timing
    const rotations = Math.floor(Math.random() * 3) + 3;
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalDegrees = rotations * 360 + extraDegrees;
    
    wheel.style.transform = `rotate(${totalDegrees}deg)`;
    currentRotation = totalDegrees;
    
    // Set exact 3 second timeout for result
    setTimeout(() => {
        const selectedValue = getSegmentValue(totalDegrees);
        result.textContent = `You won: $${selectedValue}!`;
        result.classList.add('show');
        isSpinning = false;
        spinButton.disabled = false;

        // Reset the wheel's rotation to the final position within 360 degrees
        wheel.style.transition = 'none';
        const finalRotation = totalDegrees % 360;
        wheel.style.transform = `rotate(${finalRotation}deg)`;
        currentRotation = finalRotation;
        // Force a reflow
        wheel.offsetHeight;
        wheel.style.transition = '';
    }, 3000);
}

spinButton.addEventListener('click', spin);