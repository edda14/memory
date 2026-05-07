export const state = {
    selectedPlayer: '',
    selectedSize: '',
    currentPlayer: '',
    flippedCards: [] as HTMLElement[],
    cardValues: [] as number[],
    matchedValues: [] as number[],
    selectedTheme: '',
    isLocked: false,
    score: {
        blue: 0,
        orange: 0
    },

};

export const playerImages = {
    Code: {
        blue: '/assets/game/coding-theme/label_blue.svg',
        orange: '/assets/game/coding-theme/label_orange.svg'
    },
    Gaming: {
        blue: '/assets/game/game-theme/chess_blue.svg',
        orange: '/assets/game/game-theme/chess_orange.svg'
    }
};

export const cardImages = {
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