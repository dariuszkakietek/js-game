const game = {

    attempts: 6,
    elemAttempts: document.querySelector('.game-attempts'),
    elemLetters: document.querySelector('.game-letters'),

    // show attempts count function
    showAttempts: function () {
        this.elemAttempts.innerText = this.attempts;
    },

    // generate letter function
    generateLetterButtons: function () {
        const alphabet = ["a", "ą", "b", "c", "ć", "d", "e", "ę", "f", "g", "h", "i", "j", "k", "l", "ł", "m", "n", "ń", "o", "ó", "p", "q", "r", "s", "ś", "t", "u", "v", "w", "x", "y", "z", "ź", "ż"];
        alphabet.forEach((letter) => {
            const button = document.createElement('button');
            button.classList.add('game-letter');
            button.innerHTML = letter;
            this.elemLetters.appendChild(button);
        });
    },

    // disable letters function
    disableLetters: function () {
        const letters = this.elemLetters.querySelectorAll('.game-letter')
        letters.forEach((letter) => {
            letter.disabled = true;
        });
    },

    // enable letters function
    enableLetters: function () {
        const letters = this.elemLetters.querySelectorAll('.game-letter')
        letters.forEach((letter) => {
            letter.disabled = false;
        });
    },

    // create game board
    initBoard: function () {
        this.generateLetterButtons();
        this.disableLetters();
    },

    startGame: function () {
        this.attempts = 6;
        this.enableLetters();
        this.showAttempts();
    }
}

game.initBoard();

document.querySelector('.game-start').addEventListener('click', () => {
    game.startGame();
});