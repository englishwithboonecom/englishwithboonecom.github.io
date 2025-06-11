let words = [];
let currentIndex = 0;
let currentLetter = '';

function toggleMenu() {
    document.getElementById('menuContent').classList.toggle('show');
}

async function loadWords() {
    const select = document.getElementById('letterSelect');
    currentLetter = select.value;
    if (!currentLetter) return;

    try {
        const response = await fetch(`data/${currentLetter}.csv`);
        const text = await response.text();
        words = text.split('\n').slice(1).map(line => {
            const [word] = line.split(',');
            return word.trim();
        }).filter(word => word);
        currentIndex = 0;
        displayWord();
    } catch (error) {
        console.error('Error loading CSV:', error);
        document.getElementById('wordDisplay').textContent = 'Error loading words';
    }
}

function displayWord() {
    const wordDisplay = document.getElementById('wordDisplay');
    if (words.length === 0) {
        wordDisplay.textContent = 'No words available';
        return;
    }
    wordDisplay.textContent = words[currentIndex];

    // Swipe animation
    wordDisplay.classList.remove('swipe-left', 'swipe-right');
    void wordDisplay.offsetWidth; // Trigger reflow
    wordDisplay.classList.add(currentIndex > 0 ? 'swipe-right' : 'swipe-left');
}

function playAudio() {
    if (words.length === 0 || !currentLetter) return;
    const audio = new Audio(`audio/${currentLetter}/${words[currentIndex]}.mp3`);
    audio.play().catch(error => console.error('Audio playback error:', error));
}

function prevWord() {
    if (currentIndex > 0) {
        currentIndex--;
        displayWord();
    }
}

function nextWord() {
    if (currentIndex < words.length - 1) {
        currentIndex++;
        displayWord();
    }
}

// Swipe Gesture Support
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('flashcard').addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.getElementById('flashcard').addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) nextWord(); // Swipe left
    if (touchEndX > touchStartX + 50) prevWord(); // Swipe right
});
