document.addEventListener("DOMContentLoaded", () => {
    const cardsArray = [
        { name: "A", img: "A" },
        { name: "B", img: "B" },
        { name: "C", img: "C" },
        { name: "D", img: "D" },
        { name: "A", img: "A" },
        { name: "B", img: "B" },
        { name: "C", img: "C" },
        { name: "D", img: "D" },
        { name: "E", img: "E" },
        { name: "F", img: "F" },
        { name: "E", img: "E" },
        { name: "F", img: "F" },
        { name: "G", img: "G" },
        { name: "H", img: "H" },
        { name: "G", img: "G" },
        { name: "H", img: "H" },
    ];

    const gameBoard = document.getElementById("game-board");
    const restartButton = document.getElementById("restart-button");
    let firstCard, secondCard;
    let lockBoard = false;
    let matchCount = 0;

    function createBoard() {
        matchCount = 0;
        const shuffledArray = cardsArray.sort(() => 0.5 - Math.random());
        gameBoard.innerHTML = "";
        shuffledArray.forEach(card => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card");
            cardElement.dataset.name = card.name;
            cardElement.innerHTML = `
                <div class="card-front">${card.img}</div>
                <div class="card-back"></div>
            `;
            cardElement.addEventListener("click", flipCard);
            gameBoard.appendChild(cardElement);
        });
    }

    function flipCard() {
        if (lockBoard || this === firstCard) return;

        this.classList.add("flipped");

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;

        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.name === secondCard.dataset.name;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        resetBoard();
        matchCount++;
        if (matchCount === cardsArray.length / 2) {
            setTimeout(() => alert("You won!"), 500);
        }
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    restartButton.addEventListener("click", createBoard);

    createBoard();
});
