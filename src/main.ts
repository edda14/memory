import './styles/style.scss'

let selectedPlayer: string = '';
let selectedSize: string = '';
let currentPlayer: string = '';
let flippedCards: HTMLElement[] = [];
let cardValues: number[] = [];
let matchedValues: number[] = [];
let selectedTheme: string = '';
let isLocked = false;
const playerImages = {
    Code: {
        blue: '/assets/game/coding-theme/label_blue.svg',
        orange: '/assets/game/coding-theme/label_orange.svg'
    },
    Gaming: {
        blue: '/assets/game/game-theme/chess_blue.svg',
        orange: '/assets/game/game-theme/chess_orange.svg'
    }
};

let score = {
    blue: 0,
    orange: 0
};

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
            selectedTheme = (e.target as HTMLInputElement).value;
            updateThemePreview();
            updateSummary(); // 👈 HIER
        });
    });

    function updateThemePreview(): void {
        const img = document.getElementById('theme-preview') as HTMLImageElement;

        if (!img) return;

        if (selectedTheme === 'Code') {
            img.src = '/assets/settings/coding-theme.png';
        }

        if (selectedTheme === 'Gaming') {
            img.src = '/assets/settings/game-theme.png';
        }
    }

    playerInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            selectedPlayer = (e.target as HTMLInputElement).value;
            updateSummary(); // 👈 HIER
        });
    });

    sizeInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            selectedSize = (e.target as HTMLInputElement).value;
            updateSummary(); // 👈 HIER
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
    if (!selectedPlayer || !selectedSize) {
        alert('Bitte wähle Player und Spielfeldgröße');
        return;
    }

    currentPlayer = selectedPlayer;
    cardValues = generateCardValues(Number(selectedSize));
    matchedValues = [];
    flippedCards = [];

    score = {
        blue: 0,
        orange: 0
    };

    app.innerHTML = renderGame();
    addCardEvents();
    setupExitModal();
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
    if (isLocked) return; // 👈 WICHTIG
    if (flippedCards.length === 2) return;
    if (card.classList.contains('active')) return;

    card.classList.add('active');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        isLocked = true; // 👈 sperren
        handleCardPair();
    }
}

/**
 * Checks if two flipped cards match
 */
function handleCardPair(): void {
    const [card1, card2] = flippedCards;

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

/**
 * Handles correct match:
 * - marks cards
 * - updates score
 * - checks game end
 */
function handleMatch(value: string) {
    matchedValues.push(Number(value));

    // 👉 DIREKT im DOM markieren
    flippedCards.forEach(card => {
        card.classList.add('matched');
    });

    updateScore();

    flippedCards = [];
    isLocked = false;

    checkGameOver();
}

/**
 * Updates score display in UI
 */
function updateScore(): void {
    score[currentPlayer as 'blue' | 'orange']++;

    const blueEl = document.getElementById('score-blue');
    const orangeEl = document.getElementById('score-orange');

    if (blueEl) {
        blueEl.textContent = `${score.blue}`;
    }

    if (orangeEl) {
        orangeEl.textContent = `${score.orange}`;
    }
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
            app.innerHTML = renderWinner();

            const winnerEl = document.querySelector('.winner-code-section, .winner-gaming-section');

            setTimeout(() => {
                winnerEl?.classList.add('active');
            }, 50);

            const restartBtn = document.getElementById('restart-btn') as HTMLButtonElement;
            restartBtn.addEventListener('click', () => init());

        }, 3000);
    }
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

        flippedCards = [];

        setTimeout(() => {
            switchPlayer();
            isLocked = false; // 👈 entsperren
        }, 400);
    }, 800);
}

/**
 * Switches active player and re-renders game
 */
function switchPlayer(): void {
    currentPlayer = currentPlayer === 'blue' ? 'orange' : 'blue';

    app.innerHTML = renderGame();
    addCardEvents();
    setupExitModal();
}

/**
 * Generates shuffled pairs of card values
 */
function generateCardValues(amount: number): number[] {
    const values: number[] = [];

    for (let i = 0; i < amount / 2; i++) {
        values.push(i);
        values.push(i);
    }

    return values.sort(() => Math.random() - 0.5);
}

/**
 * Determines the winner based on score
 */
function getWinner(): string {
    if (score.blue > score.orange) return 'blue';
    if (score.orange > score.blue) return 'orange';
    return 'draw';
}

/**
 * Updates settings summary UI
 */
function updateSummary(): void {
    const themeEl = document.getElementById('summary-theme');
    const playerEl = document.getElementById('summary-player');
    const sizeEl = document.getElementById('summary-size');

    if (themeEl && selectedTheme) {
        themeEl.textContent = selectedTheme + ' theme';
        updateStartButton();
        updateDividerState();
    }

    if (playerEl && selectedPlayer) {
        playerEl.textContent = selectedPlayer + ' Player';
        updateStartButton();
    }

    if (sizeEl && selectedSize) {
        sizeEl.textContent = 'Board-' + selectedSize + ' Cards';
        updateStartButton();
    }
}

/**
 * Enables/disables start button depending on selections
 */
function updateStartButton(): void {
    const btn = document.getElementById('start-game-btn') as HTMLButtonElement;

    if (!btn) return;

    if (selectedTheme && selectedPlayer && selectedSize) {
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

    if (selectedTheme && selectedPlayer && selectedSize) {
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

    // 👉 öffnen
    exitBtn.addEventListener('click', () => {
        overlay.classList.add('active');
    });

    // 👉 schließen (Back)
    cancelBtn?.addEventListener('click', () => {
        overlay.classList.remove('active');
    });

    // 👉 bestätigen (Exit Game)
    confirmBtn?.addEventListener('click', () => {
        init();
    });

    // 👉 optional: Klick außerhalb
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
        }
    });
}

/**
 * Returns correct image path for a card based on theme
 */
function getCardImage(value: number): string {
    const theme = selectedTheme as 'Code' | 'Gaming';

    const images = {
        Code: [
            '/assets/game/coding-theme/HTML.svg',
            '/assets/game/coding-theme/Javascript.svg',
            '/assets/game/coding-theme/Node.js.svg',
            '/assets/game/coding-theme/Angular.svg',
            '/assets/game/coding-theme/Clip.svg',
            '/assets/game/coding-theme/CSS.svg',
            '/assets/game/coding-theme/django.svg',
            '/assets/game/coding-theme/Firebase.svg',
            '/assets/game/coding-theme/git-icon 1.svg',
            '/assets/game/coding-theme/github-logo.svg',
            '/assets/game/coding-theme/Group-17.svg',
            '/assets/game/coding-theme/Group.svg',
            '/assets/game/coding-theme/python.svg',
            '/assets/game/coding-theme/Sass.svg',
            '/assets/game/coding-theme/SQL.svg',
            '/assets/game/coding-theme/terminal.svg',
            '/assets/game/coding-theme/TypeScript.svg',
            '/assets/game/coding-theme/VS-code.svg'
        ],
        Gaming: [
            '/assets/game/game-theme/ass.svg',
            '/assets/game/game-theme/asset-würfel.svg',
            '/assets/game/game-theme/Asset1.svg',
            '/assets/game/game-theme/Asset2.svg',
            '/assets/game/game-theme/Asset3.svg',
            '/assets/game/game-theme/banana.svg',
            '/assets/game/game-theme/block.svg',
            '/assets/game/game-theme/coin.svg',
            '/assets/game/game-theme/controller.svg',
            '/assets/game/game-theme/gamboy.svg',
            '/assets/game/game-theme/mandala.svg',
            '/assets/game/game-theme/medaille.svg',
            '/assets/game/game-theme/mushroom.svg',
            '/assets/game/game-theme/pacman-big.svg',
            '/assets/game/game-theme/pacman.svg',
            '/assets/game/game-theme/playbutton.svg',
            '/assets/game/game-theme/puzzle.svg',
            '/assets/game/game-theme/snake.svg'

        ]
    };

    return images[theme][value];
}

/**
 * Returns player icon based on theme and color
 */
function getPlayerIcon(color: 'blue' | 'orange'): string {
    return playerImages[selectedTheme as 'Code' | 'Gaming'][color];
}

/**
 * Returns winner icon
 */
function getWinnerIcon(color: 'blue' | 'orange'): string {
    return playerImages['Gaming'][color];
}

/**
 * Renders home screen HTML
 */
function renderHome(): string {
    return `
    <main class="home">
      <section class="home-content">
      <div class="home-div">
      <p>It's play time.</p>
        <h2>Ready to play?</h2>
      </div>
      <button class="home-btn" id="start-btn" type="button"><img class="home-btn_controller" src="/assets/startscreen/stadia_controller.svg" alt="Controller icon"></img> Play <img class="home-btn_arrow" src="/assets/startscreen/Arrow.svg" alt="Arrow icon"></img></button>
      </section>
    </main>
  `;
}

/**
 * Renders settings screen HTML
 */
function renderSettings(): string {
    return `
    <main class="settings">
     <h2>Settings</h2>
      <section class="settings-content">
       <div class="settings-content-left">
         <section class="option">
          <div class="option-title">
          <img src="/assets/settings/palette.svg" alt="Theme icon"></img>
          <h3>Game themes</h3>
          </div>
           <div class="option-content">

            <label>
                <input type="radio" name="theme" value="Code">
                <span class="option-content-dot"></span>
                <span class="option-content-text">Code vibes</span>
                <span class="option-content-arrow"></span>
               
            </label>

            <label>
                <input type="radio" name="theme" value="Gaming">
                <span class="option-content-dot"></span>
                <span class="option-content-text">Gaming</span>
                <span class="option-content-arrow"></span>
            </label>
            </div>
         </section>
            

        <section class="option">
         <div class="option-title">
         <img src="/assets/settings/chess_pawn.svg" alt="Player icon"></img>
          <h3>Choose player</h3>
          </div>
          <div class="option-content">
          <label>
            <input type="radio" name="player" value="blue">
            <span class="option-content-dot"></span>
            <span class="option-content-text">Blue</span>
            <span class="option-content-arrow"></span>
          </label>
          <label>
            <input type="radio" name="player" value="orange">
            <span class="option-content-dot"></span>
            <span class="option-content-text">Orange</span>
            <span class="option-content-arrow"></span>
          </label>
          </div>
        </section>

        <section class="option">
        <div class="option-title">
        <img src="/assets/settings/style.svg" alt="Board size icon"></img>
          <h3>Board size</h3>
          </div>
          <div class="option-content">
          <label>
            <input type="radio" name="size" value="16">
            <span class="option-content-dot"></span>
            <span class="option-content-text">16 cards</span>
            <span class="option-content-arrow"></span>
          </label>
          <label>
            <input type="radio" name="size" value="24">
            <span class="option-content-dot"></span>
            <span class="option-content-text">24 cards</span>
            <span class="option-content-arrow"></span>
          </label>
          <label>
            <input type="radio" name="size" value="36">
            <span class="option-content-dot"></span>
            <span class="option-content-text">36 cards</span>
            <span class="option-content-arrow"></span>
          </label>
          </div>
         </section>
    </div>

       <div class="settings-content-right">
    <div class="settings-preview">
  <img id="theme-preview" src="/assets/settings/coding-theme.png" alt="Theme preview">
</div>
<div class="settings-content-right-start" >
  <span id="summary-theme">Theme</span>
  <span class="summary-divider"></span>
  <span id="summary-player">Player</span>
  <span class="summary-divider"></span>
  <span id="summary-size">Board size</span>

<button id="start-game-btn" disabled type="button"> <img src="/assets/settings/smart_display.svg" alt="Start icon"></img> Start</button>
</div>
</div>
      </section>
    </main>
  `;
}

/**
 * Renders game board including cards and UI
 */
function renderGame(): string {
    const size = Number(selectedSize);
    let cardWidth = selectedTheme === 'Code' ? 120 : 105;
    let cardHeight = selectedTheme === 'Code' ? 120 : 120;
    let gap = 16;

    let gapX = 16;
    let gapY = 16;

    if (selectedTheme === 'Gaming') {
        if (size === 24) {
            gapX = 12;
            gapY = 12;
        }

        if (size === 36) {
            gapX = 8;
            gapY = 10;
        }
    }

    if (selectedTheme === 'Code') {
        if (size === 24) {
            gapX = 12;
            gapY = 12;
        }

        if (size === 36) {
            gapX = 10;
            gapY = 10;
        }
    }

    let columns = 4;
    if (size === 24) columns = 6;
    if (size === 36) columns = 6;

    const themeClass = selectedTheme === 'Code'
        ? 'theme-code'
        : 'theme-gaming';

    const playerImg =
        playerImages[selectedTheme as 'Code' | 'Gaming']
        [currentPlayer as 'blue' | 'orange'];

    return `
    <main>
      <section class="game ${themeClass}">
      <nav>
       <div class="score">
        <div class="score-div">
         <img src="${getPlayerIcon('blue')}" alt="Player icon blue"/>
            ${selectedTheme === 'Code' ? `<span class="label score-blue">Blue</span>` : ''}
         <span class="score-blue" id="score-blue">${score.blue}</span>
         </div>

  <div class="score-div">
    <img src="${getPlayerIcon('orange')}" alt="Player icon orange"/>
    ${selectedTheme === 'Code' ? `<span class="label score-orange">Orange</span>` : ''}
    <span class="score-orange" id="score-orange">${score.orange}</span>
  </div>
</div>
  <div class="current ${selectedTheme === 'Gaming' ? currentPlayer : ''}">

  <h2>Current player:</h2>

  <div class="current-icon">

    <img src="${selectedTheme === 'Gaming'

            ? '/assets/game/game-theme/chess_white.svg'

            : getPlayerIcon(currentPlayer as 'blue' | 'orange')

        }" alt="Current Player icon"/>

  </div>

</div>
        <button id="game-btn" type="button"> 
        <img src="/assets/game/game-theme/move_item.svg" alt="Move icon"></img>
        Exit Game
        </button>
        </nav>

      <div 
  id="grid" 
  style="
    grid-template-columns: repeat(${columns}, ${cardWidth}px);
    gap: ${gapY}px ${gapX}px;
  "
>
          ${renderCards()}
        </div>

        <div id="exit-overlay" class="exit-overlay">
  <div class="exit-modal">
    <h2>Are you sure you want to quit the game?</h2>

    <div class="exit-actions">
    ${selectedTheme === 'Code' ? `

  <button id="cancel-exit" class="btn-primary btn" type="button">Back to game</button>

  <button id="confirm-exit" class="btn-secondary btn" type="button">Exit game</button>

` : `

  <button id="cancel-exit" class="btn-primary btn" type="button">No, back to game</button>

  <button id="confirm-exit" class="btn-secondary btn" type="button">Yes, quit game</button>

`}
    </div>
  </div>
</div>
      </section>
    </main>
  `;
}

/**
 * Renders all cards based on generated values
 */
function renderCards(): string {
    let html = '';

    cardValues.forEach((value) => {
        const isMatched = matchedValues.includes(value);

        html += `
<div class="card 
  ${isMatched ? 'matched active' : ''}" 
  data-value="${value}">
  <div class="card-inner">
    <div class="card-front">
    </div>
    <div class="card-back">
      <img src="${getCardImage(value)}" alt="Memory card"/>
    </div>
  </div>
</div>
    `;
    });

    return html;
}

/**
 * Chooses correct winner screen based on theme
 */
function renderWinner(): string {
    return selectedTheme === 'Code'
        ? renderWinnerCode()
        : renderWinnerGaming();
}

/**
 * Chooses correct game over screen based on theme
 */
function renderGameOver(): string {
    return selectedTheme === 'Code'
        ? renderGameOverCode()
        : renderGameOverGaming();
}

/**
 * Renders game over screen (Code theme)
 */
function renderGameOverCode(): string {
    return `
    <main class="gameover-code">
      <section class="gameover-content">
        <h2>Game Over</h2>
        <h3>Final score</h3>
        <div class="winner">
        <div> 
        <img src="/assets/game/coding-theme/label_blue.svg" alt="Blue Player icon"/>
        <p class="blue">Blue ${score.blue}</p>
        </div>
        <div>
        <img src="/assets/game/coding-theme/label_orange.svg" alt="Orange Player icon"/>
        <p class="orange">Orange ${score.orange}</p></div>
        </div>
      </section>
    </main>
  `;
}

/**
 * Renders game over screen (Gaming theme)
 */
function renderGameOverGaming(): string {
    return `
    <main class="gameover-game">
      <section class="gameover-content">

        <h2 class="gameover-title">GAME OVER</h2>
        <h3>Final score</h3>
        <div class="gameover-scores">
          <div class="score-box">
            <img src="${getPlayerIcon('orange')}" alt="Orange Player icon"/>
            <span class="orange">${score.orange}</span>
          </div>
          <div class="score-box">
            <img src="${getPlayerIcon('blue')}" alt="Blue Player icon"/>
            <span class="blue">${score.blue}</span>
          </div>
        </div>

      </section>
    </main>
  `;
}

/**
 * Renders winner screen (Code theme)
 */
function renderWinnerCode(): string {
    return `
    <main class="winner-code">
    <img class="confetti" src="/assets/winner/confetti.svg" alt="Confetti"/>
      <section class="winner-code-section">
      <div>
        <h2>The Winner is</h2>
        <h3 class="winner ${getWinner()}">${getWinner()} Player</h3>
        </div>
        <img src="${getWinnerIcon(getWinner() as 'blue' | 'orange')}" alt="Winner icon"/>
        <button id="restart-btn" type="button">
        Back to start
        </button>
      </section>
    </main>
  `;
}

/**
 * Renders winner screen (Gaming theme)
 */
function renderWinnerGaming(): string {
    return `
    <main class="winner-gaming">
      <section class="winner-gaming-section">
      <div>
        <h2 class="winner-title">The winner is</h2>
        <h3 class="winner ${getWinner()}">${getWinner()} Player</h3>
        </div>
        <div class="winner-icon">
          <img src="/assets/winner/pockal.svg" alt="Pokal"/>
        </div>
        <button id="restart-btn" type="button">
          Home
        </button>
      </section>
    </main>
  `;
}
