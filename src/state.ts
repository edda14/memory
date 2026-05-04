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
    }
};