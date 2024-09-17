document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById('start-screen');
    const gameContainer = document.getElementById('game-container');
    const gameBoard = document.getElementById('game-board');
    const congratulations = document.getElementById('congratulations');
    const restartBtn = document.getElementById('restart-btn');
    const playAgainBtn = document.getElementById('play-again-btn');
    const startBtn = document.getElementById('start-btn');
    const moveCounter = document.getElementById('move-counter');
    let moves = 0;
    let matchedPairs = 0;
    const totalPairs = 8; 
    let firstCard, secondCard;
    let lockBoard = false;

    // Start Game
    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', resetGame);
    playAgainBtn.addEventListener('click', resetGame);

    // Function to start the game
    function startGame() {
        startScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        resetGame(); // In case it's not the first game
    }

    // Function to reset the game
    function resetGame() {
        matchedPairs = 0;
        moves = 0;
        moveCounter.textContent = moves;
        congratulations.classList.add('hidden');
        shuffleCards();
        lockBoard = false;
        // Reset all cards
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('flipped');
            card.addEventListener('click', flipCard);
        });
    }

    // Shuffle cards logic
    function shuffleCards() {
        const cards = Array.from(gameBoard.children);
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * cards.length);
            card.style.order = randomPos;
        });
    }

    // Card flip logic
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    // Check for matching pair
    function checkForMatch() {
        let isMatch = firstCard.querySelector('.card-back img').src === secondCard.querySelector('.card-back img').src;
        isMatch ? disableCards() : unflipCards();
        moves++;
        moveCounter.textContent = moves;
    }

    // Disable cards if they match
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        matchedPairs++;

        if (matchedPairs === totalPairs) {
            showCongratulations();
        }

        resetBoard();
    }

    // Unflip cards if they don't match
    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }

    // Reset board after each turn
    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    // Show congratulations when all pairs are matched
    function showCongratulations() {
        setTimeout(() => {
            congratulations.classList.remove('hidden');
            congratulations.style.display = 'block'; // Ensure it's visible
        }, 500); // Delay for visual effect
    }
});
