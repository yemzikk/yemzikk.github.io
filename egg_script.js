const spaghetti = document.getElementById('spaghetti');
const easterEgg = document.getElementById('easterEgg');
let keySequence = [];
const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

// Function to handle key presses
window.addEventListener('keydown', (e) => {
    keySequence.push(e.key);
    keySequence = keySequence.slice(-secretCode.length);

    // Check if the key sequence matches the secret code
    if (JSON.stringify(keySequence) === JSON.stringify(secretCode)) {
        easterEgg.classList.remove('hidden');
        spaghetti.classList.remove('hidden');
    }
});
