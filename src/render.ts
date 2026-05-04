import { state } from './state';
export {
  renderHome,
  renderSettings,
  renderGame,
  renderCards,
  renderWinner,
  renderGameOver,
  getPlayerIcon,
  getWinnerIcon,
  getCardImage,
};


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

/**
 * Returns correct image path for a card based on theme
 */
function getCardImage(value: number): string {
    const theme = state.selectedTheme as 'Code' | 'Gaming';

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
    return playerImages[state.selectedTheme as 'Code' | 'Gaming'][color];
}

/**
 * Returns winner icon
 */
function getWinnerIcon(color: 'blue' | 'orange'): string {
    return playerImages['Gaming'][color];
}

/**
 * Determines the winner based on score
 */
function getWinner(): string {
    if (state.score.blue > state.score.orange) return 'blue';
    if (state.score.orange > state.score.blue) return 'orange';
    return 'draw';
}


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
    const size = Number(state.selectedSize);
    let cardWidth = state.selectedTheme === 'Code' ? 120 : 105;
    let cardHeight = state.selectedTheme === 'Code' ? 120 : 120;
    let gap = 16;

    let gapX = 16;
    let gapY = 16;

    if (state.selectedTheme === 'Gaming') {
        if (size === 24) {
            gapX = 12;
            gapY = 12;
        }

        if (size === 36) {
            gapX = 8;
            gapY = 10;
        }
    }

    if (state.selectedTheme === 'Code') {
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

    const themeClass = state.selectedTheme === 'Code'
        ? 'theme-code'
        : 'theme-gaming';

    const playerImg =
        playerImages[state.selectedTheme as 'Code' | 'Gaming']
        [state.currentPlayer as 'blue' | 'orange'];

    return `
    <main>
      <section class="game ${themeClass}">
      <nav>
       <div class="score">
        <div class="score-div">
         <img src="${getPlayerIcon('blue')}" alt="Player icon blue"/>
            ${state.selectedTheme === 'Code' ? `<span class="label score-blue">Blue</span>` : ''}
         <span class="score-blue" id="score-blue">${state.score.blue}</span>
         </div>

  <div class="score-div">
    <img src="${getPlayerIcon('orange')}" alt="Player icon orange"/>
    ${state.selectedTheme === 'Code' ? `<span class="label score-orange">Orange</span>` : ''}
    <span class="score-orange" id="score-orange">${state.score.orange}</span>
  </div>
</div>
  <div class="current ${state.selectedTheme === 'Gaming' ? state.currentPlayer : ''}">

  <h2>Current player:</h2>

  <div class="current-icon">

    <img src="${state.selectedTheme === 'Gaming'

            ? '/assets/game/game-theme/chess_white.svg'

            : getPlayerIcon(state.currentPlayer as 'blue' | 'orange')

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
    ${state.selectedTheme === 'Code' ? `

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

    state.cardValues.forEach((value) => {
        const isMatched = state.matchedValues.includes(value);

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
    return state.selectedTheme === 'Code'
        ? renderWinnerCode()
        : renderWinnerGaming();
}

/**
 * Chooses correct game over screen based on theme
 */
function renderGameOver(): string {
    return state.selectedTheme === 'Code'
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
        <p class="blue">Blue ${state.score.blue}</p>
        </div>
        <div>
        <img src="/assets/game/coding-theme/label_orange.svg" alt="Orange Player icon"/>
        <p class="orange">Orange ${state.score.orange}</p></div>
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
            <span class="orange">${state.score.orange}</span>
          </div>
          <div class="score-box">
            <img src="${getPlayerIcon('blue')}" alt="Blue Player icon"/>
            <span class="blue">${state.score.blue}</span>
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
