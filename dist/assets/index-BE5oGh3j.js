(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=``,t=``,n=``,r=[],i=[],a=[],o=``,s=!1,c={Code:{blue:`/assets/game/coding-theme/label_blue.svg`,orange:`/assets/game/coding-theme/label_orange.svg`},Gaming:{blue:`/assets/game/game-theme/chess_blue.svg`,orange:`/assets/game/game-theme/chess_orange.svg`}},l={blue:0,orange:0},u=document.getElementById(`app`);d();function d(){f()}function f(){u.innerHTML=P(),document.getElementById(`start-btn`).addEventListener(`click`,p)}function p(){u.innerHTML=F(),m(),h()}function m(){let n=document.querySelectorAll(`input[name="player"]`),r=document.querySelectorAll(`input[name="size"]`);document.querySelectorAll(`input[name="theme"]`).forEach(e=>{e.addEventListener(`change`,e=>{o=e.target.value,i(),D()})});function i(){let e=document.getElementById(`theme-preview`);e&&(o===`Code`&&(e.src=`/assets/settings/coding-theme.png`),o===`Gaming`&&(e.src=`/assets/settings/game-theme.png`))}n.forEach(t=>{t.addEventListener(`change`,t=>{e=t.target.value,D()})}),r.forEach(e=>{e.addEventListener(`change`,e=>{t=e.target.value,D()})})}function h(){document.getElementById(`start-game-btn`).addEventListener(`click`,g)}function g(){if(!e||!t){alert(`Bitte wähle Player und Spielfeldgröße`);return}n=e,i=T(Number(t)),a=[],r=[],l={blue:0,orange:0},u.innerHTML=I(),_(),A()}function _(){document.querySelectorAll(`.card`).forEach(e=>{e.addEventListener(`click`,()=>{v(e)})})}function v(e){s||r.length!==2&&(e.classList.contains(`active`)||(e.classList.add(`active`),r.push(e),r.length===2&&(s=!0,y())))}function y(){let[e,t]=r,n=e.dataset.value;n===t.dataset.value?setTimeout(()=>{b(n)},500):C(e,t)}function b(e){a.push(Number(e)),r.forEach(e=>{e.classList.add(`matched`)}),x(),r=[],s=!1,S()}function x(){l[n]++;let e=document.getElementById(`score-blue`),t=document.getElementById(`score-orange`);e&&(e.textContent=`${l.blue}`),t&&(t.textContent=`${l.orange}`)}function S(){let e=document.querySelectorAll(`.card`),t=document.querySelectorAll(`.card.active`);e.length===t.length&&(u.innerHTML=z(),setTimeout(()=>{u.innerHTML=R();let e=document.querySelector(`.winner-code-section, .winner-gaming-section`);setTimeout(()=>{e?.classList.add(`active`)},50),document.getElementById(`restart-btn`).addEventListener(`click`,()=>d())},3e3))}function C(e,t){setTimeout(()=>{e.classList.remove(`active`),t.classList.remove(`active`),r=[],setTimeout(()=>{w(),s=!1},400)},800)}function w(){n=n===`blue`?`orange`:`blue`,u.innerHTML=I(),_(),A()}function T(e){let t=[];for(let n=0;n<e/2;n++)t.push(n),t.push(n);return t.sort(()=>Math.random()-.5)}function E(){return l.blue>l.orange?`blue`:l.orange>l.blue?`orange`:`draw`}function D(){let n=document.getElementById(`summary-theme`),r=document.getElementById(`summary-player`),i=document.getElementById(`summary-size`);n&&o&&(n.textContent=o+` theme`,O(),k()),r&&e&&(r.textContent=e+` Player`,O()),i&&t&&(i.textContent=`Board-`+t+` Cards`,O())}function O(){let n=document.getElementById(`start-game-btn`);n&&(o&&e&&t?n.disabled=!1:n.disabled=!0)}function k(){let n=document.querySelectorAll(`.summary-divider`);o&&e&&t?n.forEach(e=>e.classList.add(`active`)):n.forEach(e=>e.classList.remove(`active`))}function A(){let e=document.getElementById(`game-btn`),t=document.getElementById(`exit-overlay`),n=document.getElementById(`cancel-exit`),r=document.getElementById(`confirm-exit`);!e||!t||(e.addEventListener(`click`,()=>{t.classList.add(`active`)}),n?.addEventListener(`click`,()=>{t.classList.remove(`active`)}),r?.addEventListener(`click`,()=>{d()}),t.addEventListener(`click`,e=>{e.target===t&&t.classList.remove(`active`)}))}function j(e){return{Code:[`/assets/game/coding-theme/HTML.svg`,`/assets/game/coding-theme/Javascript.svg`,`/assets/game/coding-theme/Node.js.svg`,`/assets/game/coding-theme/Angular.svg`,`/assets/game/coding-theme/Clip.svg`,`/assets/game/coding-theme/CSS.svg`,`/assets/game/coding-theme/django.svg`,`/assets/game/coding-theme/Firebase.svg`,`/assets/game/coding-theme/git-icon 1.svg`,`/assets/game/coding-theme/github-logo.svg`,`/assets/game/coding-theme/Group-17.svg`,`/assets/game/coding-theme/Group.svg`,`/assets/game/coding-theme/python.svg`,`/assets/game/coding-theme/Sass.svg`,`/assets/game/coding-theme/SQL.svg`,`/assets/game/coding-theme/terminal.svg`,`/assets/game/coding-theme/TypeScript.svg`,`/assets/game/coding-theme/VS-code.svg`],Gaming:[`/assets/game/game-theme/ass.svg`,`/assets/game/game-theme/asset-würfel.svg`,`/assets/game/game-theme/Asset1.svg`,`/assets/game/game-theme/Asset2.svg`,`/assets/game/game-theme/Asset3.svg`,`/assets/game/game-theme/banana.svg`,`/assets/game/game-theme/block.svg`,`/assets/game/game-theme/coin.svg`,`/assets/game/game-theme/controller.svg`,`/assets/game/game-theme/gamboy.svg`,`/assets/game/game-theme/mandala.svg`,`/assets/game/game-theme/medaille.svg`,`/assets/game/game-theme/mushroom.svg`,`/assets/game/game-theme/pacman-big.svg`,`/assets/game/game-theme/pacman.svg`,`/assets/game/game-theme/playbutton.svg`,`/assets/game/game-theme/puzzle.svg`,`/assets/game/game-theme/snake.svg`]}[o][e]}function M(e){return c[o][e]}function N(e){return c.Gaming[e]}function P(){return`
    <main class="home">
      <section class="home-content">
      <div class="home-div">
      <p>It's play time.</p>
        <h2>Ready to play?</h2>
      </div>
      <button class="home-btn" id="start-btn" type="button"><img class="home-btn_controller" src="/assets/startscreen/stadia_controller.svg" alt="Controller icon"></img> Play <img class="home-btn_arrow" src="/assets/startscreen/Arrow.svg" alt="Arrow icon"></img></button>
      </section>
    </main>
  `}function F(){return`
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
  `}function I(){let e=Number(t),r=o===`Code`?120:105,i=16,a=16;o===`Gaming`&&(e===24&&(i=12,a=12),e===36&&(i=8,a=10)),o===`Code`&&(e===24&&(i=12,a=12),e===36&&(i=10,a=10));let s=4;e===24&&(s=6),e===36&&(s=6);let u=o===`Code`?`theme-code`:`theme-gaming`;return c[o][n],`
    <main>
      <section class="game ${u}">
      <nav>
       <div class="score">
        <div class="score-div">
         <img src="${M(`blue`)}" alt="Player icon blue"/>
            ${o===`Code`?`<span class="label score-blue">Blue</span>`:``}
         <span class="score-blue" id="score-blue">${l.blue}</span>
         </div>

  <div class="score-div">
    <img src="${M(`orange`)}" alt="Player icon orange"/>
    ${o===`Code`?`<span class="label score-orange">Orange</span>`:``}
    <span class="score-orange" id="score-orange">${l.orange}</span>
  </div>
</div>
  <div class="current ${o===`Gaming`?n:``}">

  <h2>Current player:</h2>

  <div class="current-icon">

    <img src="${o===`Gaming`?`/assets/game/game-theme/chess_white.svg`:M(n)}" alt="Current Player icon"/>

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
    grid-template-columns: repeat(${s}, ${r}px);
    gap: ${a}px ${i}px;
  "
>
          ${L()}
        </div>

        <div id="exit-overlay" class="exit-overlay">
  <div class="exit-modal">
    <h2>Are you sure you want to quit the game?</h2>

    <div class="exit-actions">
    ${o===`Code`?`

  <button id="cancel-exit" class="btn-primary btn" type="button">Back to game</button>

  <button id="confirm-exit" class="btn-secondary btn" type="button">Exit game</button>

`:`

  <button id="cancel-exit" class="btn-primary btn" type="button">No, back to game</button>

  <button id="confirm-exit" class="btn-secondary btn" type="button">Yes, quit game</button>

`}
    </div>
  </div>
</div>
      </section>
    </main>
  `}function L(){let e=``;return i.forEach(t=>{let n=a.includes(t);e+=`
<div class="card 
  ${n?`matched active`:``}" 
  data-value="${t}">
  <div class="card-inner">
    <div class="card-front">
    </div>
    <div class="card-back">
      <img src="${j(t)}" alt="Memory card"/>
    </div>
  </div>
</div>
    `}),e}function R(){return o===`Code`?H():U()}function z(){return o===`Code`?B():V()}function B(){return`
    <main class="gameover-code">
      <section class="gameover-content">
        <h2>Game Over</h2>
        <h3>Final score</h3>
        <div class="winner">
        <div> 
        <img src="/assets/game/coding-theme/label_blue.svg" alt="Blue Player icon"/>
        <p class="blue">Blue ${l.blue}</p>
        </div>
        <div>
        <img src="/assets/game/coding-theme/label_orange.svg" alt="Orange Player icon"/>
        <p class="orange">Orange ${l.orange}</p></div>
        </div>
      </section>
    </main>
  `}function V(){return`
    <main class="gameover-game">
      <section class="gameover-content">

        <h2 class="gameover-title">GAME OVER</h2>
        <h3>Final score</h3>
        <div class="gameover-scores">
          <div class="score-box">
            <img src="${M(`orange`)}" alt="Orange Player icon"/>
            <span class="orange">${l.orange}</span>
          </div>
          <div class="score-box">
            <img src="${M(`blue`)}" alt="Blue Player icon"/>
            <span class="blue">${l.blue}</span>
          </div>
        </div>

      </section>
    </main>
  `}function H(){return`
    <main class="winner-code">
    <img class="confetti" src="/assets/winner/confetti.svg" alt="Confetti"/>
      <section class="winner-code-section">
      <div>
        <h2>The Winner is</h2>
        <h3 class="winner ${E()}">${E()} Player</h3>
        </div>
        <img src="${N(E())}" alt="Winner icon"/>
        <button id="restart-btn" type="button">
        Back to start
        </button>
      </section>
    </main>
  `}function U(){return`
    <main class="winner-gaming">
      <section class="winner-gaming-section">
      <div>
        <h2 class="winner-title">The winner is</h2>
        <h3 class="winner ${E()}">${E()} Player</h3>
        </div>
        <div class="winner-icon">
          <img src="/assets/winner/pockal.svg" alt="Pokal"/>
        </div>
        <button id="restart-btn" type="button">
          Home
        </button>
      </section>
    </main>
  `}