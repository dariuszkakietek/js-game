const game = {

    // ilośćprób na zgadnięcie hasła
    attempts: 6,
    // czas na gre
    time: 60,

    interval: null,
    //pojemnik na czas
    elemTime: document.querySelector('.game-time'),
    // pojemnik na litery
    elemAttempts: document.querySelector('.game-attempts'),
    // pojemnik na próby
    elemLetters: document.querySelector('.game-letters'),
    // pojemnik na kategorie
    elemCategory: document.querySelector('.game-category'),
    // obecna kategoria
    currentCategory: null,
    // wylosowane hasło
    currentSentence: null,
    // wylosowane hasło - same litery
    currentSentenceLetters: null,
    // pojemnik na hasło
    elemSentence: document.querySelector('.game-sentence'),

    showCategory: function () {
        this.elemCategory.innerHTML = this.currentCategory
    },

    // pokaż ilość prób
    showAttempts: function () {
        this.elemAttempts.innerText = this.attempts;
    },

    // pokaż czas
    showTime: function () {
        this.elemTime.innerText = this.time;
    },

    // ukryj czas
    hideTime: function () {
        this.elemTime.innerText = '';
    },

    // generowanie liter
    generateLetterButtons: function () {
        const alphabet = ["a", "ą", "b", "c", "ć", "d", "e", "ę", "f", "g", "h", "i", "j", "k", "l", "ł", "m", "n", "ń", "o", "ó", "p", "q", "r", "s", "ś", "t", "u", "v", "w", "x", "y", "z", "ź", "ż"];
        alphabet.forEach((letter) => {
            const button = document.createElement('button');
            button.classList.add('game-letter');
            button.innerHTML = letter;
            button.addEventListener('click', (event) => {
                const letter = event.target.innerText;
                event.target.disabled = true;
                this.checkLetterInSentence(letter);
            });
            this.elemLetters.appendChild(button);
        });
    },

    checkLetterInSentence: function (letter) {

        if (this.currentSentence.includes(letter)) {

            for (let i = 0; i < this.currentSentence.length; i++) {
                if (this.currentSentence[i] === letter) {
                    this.elemSentence.querySelectorAll('.game-sentence-box')[i].innerText = letter;
                }
            }

            this.currentSentenceLetters = this.currentSentenceLetters.replace(new RegExp(letter, "g"), '');

            if (this.currentSentenceLetters.length === 0) {
                this.win();
            }

        } else {
            //this.attempts = this.attempts - 1;
            this.attempts--;
            this.showAttempts();
            if (this.attempts <= 0) {
                this.gameOver('Koniec prób.');
            }
        }
    },

    // wyłączenie liter
    disableLetters: function () {
        const letters = this.elemLetters.querySelectorAll('.game-letter')
        letters.forEach((letter) => {
            letter.disabled = true;
        });
    },

    // włączenie liter
    enableLetters: function () {
        const letters = this.elemLetters.querySelectorAll('.game-letter')
        letters.forEach((letter) => {
            letter.disabled = false;
        });
    },

    randomSentence: function () {
        this.elemSentence.innerText = '';
        let randomArrayIndex = Math.floor(Math.random() * phrases.length);
        let randomPhrase = phrases[randomArrayIndex];
        this.currentCategory = randomPhrase.category;
        this.showCategory();
        this.currentSentence = randomPhrase.slogan.toUpperCase();
        this.currentSentenceLetters = this.currentSentence.replace(/\s/g, '');

        let letters = this.currentSentence.split('');

        letters.forEach((letter) => {
            const div = document.createElement('div');
            div.classList.add('game-sentence-box');

            if (letter === ' ') {
                div.classList.add('game-sentence-box-space');
            }

            this.elemSentence.appendChild(div);

        });
    },

    startGame: function () {
        this.attempts = 6;
        this.enableLetters();
        this.showAttempts();
        this.randomSentence();

        this.time = 60;
        this.showTime();
        this.interval = setInterval(() => {
            this.time--;

            if (this.time <= 0) {
                clearInterval(this.interval);
                this.gameOver('Koniec czasu.');
            } else {
                this.showTime();
            }
        }, 1000);
    },

    win: function () {
        setTimeout(() => {
            alert('Gratulacje, wygrałeś!');
        }, 300)
        this.disableLetters();
        clearInterval(this.interval);
        this.hideTime();
    },

    gameOver: function (reason) {
        alert('Przegrałeś! - ' + reason + ' Hasło to: ' + this.currentSentence);

        this.disableLetters();
        clearInterval(this.interval);
        this.hideTime();
    },

    // inicjowanie gry
    initBoard: function () {
        this.generateLetterButtons();
        this.disableLetters();
    }
}

game.initBoard();

document.querySelector('.game-start').addEventListener('click', () => {
    game.startGame();
});