import './styles/style.scss'
import { state } from './state';
import {
    renderHome,
    renderSettings,
    renderGame,
    renderWinner,
    renderGameOver,
} from './render';

const app = document.getElementById('app') as HTMLElement;

init();

/**
 * Initializes the app by rendering the home screen
 */
function init(): void {
    renderHomeScreen();
}

/**
 * Renders the home screen and sets up start button
 */
function renderHomeScreen(): void {
    app.innerHTML = renderHome();

    const startBtn = document.getElementById('start-btn') as HTMLButtonElement;
    startBtn.addEventListener('click', renderSettingsScreen);
}

/**
 * Renders settings screen and initializes inputs + start button
 */
function renderSettingsScreen(): void {
    app.innerHTML = renderSettings();

    setupSettingsInputs();
    setupStartGameButton();
}

/**
 * Handles all settings inputs (theme, player, board size)
 * and updates UI preview + summary
 */
function setupSettingsInputs(): void {
    const playerInputs = document.querySelectorAll('input[name="player"]');
    const sizeInputs = document.querySelectorAll('input[name="size"]');

    const themeInputs = document.querySelectorAll('input[name="theme"]');

    themeInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            state.selectedTheme = (e.target as HTMLInputElement).value;
            updateThemePreview();
            updateSummary();
        });
    });

    function updateThemePreview(): void {
        const img = document.getElementById('theme-preview') as HTMLImageElement;

        if (!img) return;

        if (state.selectedTheme === 'Code') {
            img.src = '/assets/settings/coding-theme.png';
        }

        if (state.selectedTheme === 'Gaming') {
            img.src = '/assets/settings/game-theme.png';
        }
    }

    playerInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            state.selectedPlayer = (e.target as HTMLInputElement).value;
            updateSummary();
        });
    });

    sizeInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            state.selectedSize = (e.target as HTMLInputElement).value;
            updateSummary();
        });
    });
}

/**
 * Enables start button click and triggers game start
 */
function setupStartGameButton(): void {
    const startGameBtn = document.getElementById('start-game-btn') as HTMLButtonElement;

    startGameBtn.addEventListener('click', startGame);
}

/**
 * Starts the game:
 * - validates input
 * - resets game state
 * - renders game board
 */
function startGame(): void {
    if (!state.selectedPlayer || !state.selectedSize) {
        alert('Bitte wähle Player und Spielfeldgröße');
        return;
    }

    state.currentPlayer = state.selectedPlayer;
    state.cardValues = generateCardValues(Number(state.selectedSize));
    state.matchedValues = [];
    state.flippedCards = [];

    state.score = {
        blue: 0,
        orange: 0
    };

    app.innerHTML = renderGame();
    addCardEvents();
    setupExitModal();
}

function generateCardValues(amount: number): number[] {
    const values: number[] = [];

    for (let i = 0; i < amount / 2; i++) {
        values.push(i);
        values.push(i);
    }

    return values.sort(() => Math.random() - 0.5);
}

function switchPlayer(): void {
    state.currentPlayer = state.currentPlayer === 'blue' ? 'orange' : 'blue';
}

/**
 * Updates score display in UI
 */
function updateScore(): void {
    state.score[state.currentPlayer as 'blue' | 'orange']++;

    const blueEl = document.getElementById('score-blue');
    const orangeEl = document.getElementById('score-orange');

    if (blueEl) {
        blueEl.textContent = `${state.score.blue}`;
    }

    if (orangeEl) {
        orangeEl.textContent = `${state.score.orange}`;
    }
}

/**
 * Adds click listeners to all cards
 */
function addCardEvents(): void {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            handleCardClick(card as HTMLElement);
        });
    });
}

/**
 * Handles click on a card:
 * - prevents invalid clicks
 * - flips card
 * - triggers pair check
 */
function handleCardClick(card: HTMLElement): void {
    if (state.isLocked) return;
    if (state.flippedCards.length === 2) return;
    if (card.classList.contains('active')) return;

    card.classList.add('active');
    state.flippedCards.push(card);

    if (state.flippedCards.length === 2) {
        state.isLocked = true;
        handleCardPair();
    }
}


/**
 * Updates settings summary UI
 */
function updateSummary(): void {
    const themeEl = document.getElementById('summary-theme');
    const playerEl = document.getElementById('summary-player');
    const sizeEl = document.getElementById('summary-size');

    if (themeEl && state.selectedTheme) {
        themeEl.textContent = state.selectedTheme + ' theme';
        updateStartButton();
        updateDividerState();
    }

    if (playerEl && state.selectedPlayer) {
        playerEl.textContent = state.selectedPlayer + ' Player';
        updateStartButton();
    }

    if (sizeEl && state.selectedSize) {
        sizeEl.textContent = 'Board-' + state.selectedSize + ' Cards';
        updateStartButton();
    }
}

/**
 * Enables/disables start button depending on selections
 */
function updateStartButton(): void {
    const btn = document.getElementById('start-game-btn') as HTMLButtonElement;

    if (!btn) return;

    if (state.selectedTheme && state.selectedPlayer && state.selectedSize) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

/**
 * Updates divider visuals when all selections are made
 */
function updateDividerState(): void {
    const dividers = document.querySelectorAll('.summary-divider');

    if (state.selectedTheme && state.selectedPlayer && state.selectedSize) {
        dividers.forEach(d => d.classList.add('active'));
    } else {
        dividers.forEach(d => d.classList.remove('active'));
    }
}

/**
 * Handles exit modal (open, close, confirm exit)
 */
function setupExitModal(): void {
    const exitBtn = document.getElementById('game-btn');
    const overlay = document.getElementById('exit-overlay');
    const cancelBtn = document.getElementById('cancel-exit');
    const confirmBtn = document.getElementById('confirm-exit');

    if (!exitBtn || !overlay) return;

    exitBtn.addEventListener('click', () => {
        overlay.classList.add('active');
    });

    cancelBtn?.addEventListener('click', () => {
        overlay.classList.remove('active');
    });

    confirmBtn?.addEventListener('click', () => {
        init();
    });
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
        }
    });
}

/**
 * Handles wrong match:
 * - flips cards back
 * - switches player
 */
 function handleMismatch(card1: HTMLElement, card2: HTMLElement): void {
    setTimeout(() => {
        card1.classList.remove('active');
        card2.classList.remove('active');

        state.flippedCards = [];

        setTimeout(() => {
            switchPlayer();

            app.innerHTML = renderGame();

            addCardEvents();

            setupExitModal();
            state.isLocked = false;
        }, 400);
    }, 800);
}

/**
 * Checks if all cards are matched and triggers game over
 */
 function checkGameOver(): void {
    const allCards = document.querySelectorAll('.card');
    const allFlipped = document.querySelectorAll('.card.active');

    if (allCards.length === allFlipped.length) {
        app.innerHTML = renderGameOver();

        setTimeout(() => {
            app.insertAdjacentHTML('beforeend', renderWinner());

            const winnerEl = document.querySelector('.winner-code, .winner-gaming');

            setTimeout(() => {
                winnerEl?.classList.add('active');
            }, 50);

            const restartBtn = document.getElementById('restart-btn') as HTMLButtonElement;
            restartBtn.addEventListener('click', () => init());

        }, 3000);
    }
}

/**
 * Handles correct match:
 * - marks cards
 * - updates score
 * - checks game end
 */
function handleMatch(value: string) {
    state.matchedValues.push(Number(value));

    state.flippedCards.forEach(card => {
        card.classList.add('matched');
    });

    updateScore();

    state.flippedCards = [];
    state.isLocked = false;

    checkGameOver();
}

/**
 * Checks if two flipped cards match
 */
function handleCardPair(): void {
    const [card1, card2] = state.flippedCards;

    const value1 = card1.dataset.value!;
    const value2 = card2.dataset.value!;

    if (value1 === value2) {
        setTimeout(() => {
            handleMatch(value1);
        }, 500);
    } else {
        handleMismatch(card1, card2);
    }
}
