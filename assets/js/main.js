let words = [];
let currentIndex = 0;
let currentLetter = 'A';
let dictionary = {};

// Load dictionary data
fetch('assets/data/dictionary.json')
    .then(response => response.json())
    .then(data => {
        dictionary = data;
        populateLetterSelect();
        loadWords(currentLetter);
    })
    .catch(error => console.error('Error loading dictionary:', error));

// Populate A-Z dropdown
function populateLetterSelect() {
    const select = document.getElementById('letter-select');
    Object.keys(dictionary).forEach(letter => {
        const option = document.createElement('option');
        option.value = letter;
        option.textContent = letter;
        select.appendChild(option);
    });
    select.addEventListener('change', () => {
        currentLetter = select.value;
        loadWords(currentLetter);
    });
}

// Load words for selected letter
function loadWords(letter) {
    words = dictionary[letter] || [];
    currentIndex = 0;
    updateFlashcard();
    updateProgress();
}

// Update flashcard display
function updateFlashcard() {
    const wordElement = document.getElementById('word');
    const flashcard = document.querySelector('.flashcard');
    flashcard.style.transform = 'none';
    flashcard.style.opacity = '1';
    flashcard.classList.remove('swiping-left', 'swiping-right');
    wordElement.textContent = words[currentIndex] || 'No words';
}

// Update progress text
function updateProgress() {
    document.getElementById('progress').textContent = `${currentIndex + 1} / ${words.length}`;
}

// Play audio using SpeechSynthesis
function playAudio() {
    const word = words[currentIndex];
    if (word) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
    }
}

// Swipe handling with Hammer.js
const flashcardContainer = document.getElementById('flashcard-container');
const hammer = new Hammer(flashcardContainer);

hammer.on('swipeleft', () => {
    if (currentIndex < words.length - 1) {
        const flashcard = document.querySelector('.flashcard');
        flashcard.classList.add('swiping-left');
        setTimeout(() => {
            currentIndex++;
            updateFlashcard();
            updateProgress();
        }, 600);
    }
});

hammer.on('swiperight', () => {
    if (currentIndex > 0) {
        const flashcard = document.querySelector('.flashcard');
        flashcard.classList.add('swiping-right');
        setTimeout(() => {
            currentIndex--;
            updateFlashcard();
            updateProgress();
        }, 600);
    }
});

// Theme toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const button = document.getElementById('theme-toggle');
    button.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});
