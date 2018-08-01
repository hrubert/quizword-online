// Create a board object

function Board(size) {
    this.size = size;
    this.board = [];
    this.clueList = [];
    this.unplacedWords = [];

    // create an empty board to the given specifications
    this.makeEmptyBoard = function () {
        for (let i = 0; i < this.size; i++) {
            let row = [];
            for (let j = 0; j < this.size; j++) {
                row.push(" ");
            }
            this.board.push(row);
        }
    }

    // cycle through the wordlist, placing words
    this.placeWords = function (wordArr) {
        // for each word
        for (let i = 0; i < wordArr.length; i++) {
            // decide if the word is going horizontal or vertical
            if (Math.floor(Math.random() * 2) == 0) { //horizontal
                this.placeHorizontal(wordArr[i][0], wordArr[i][1]);
            } else { //vertical
                this.placeVertical(wordArr[i][0], wordArr[i][1]);
            }
        }
    }

    // finds a random location to see if the word will fit. Try 10 times
    this.getHorPos = function (word) {
        for (let i = 0; i < 10; i++) {
            y = Math.floor(Math.random() * (this.size));
            x = Math.floor(Math.random() * (this.size - word.length));
            if (this.canFitHor(word, x, y)) {
                return(x, y);
            } 
        }
        this.unplacedWords.push(word);
    }

    // checks to see if the word will fit horizontally in that spot.
    this.canFitHor = function (word, x, y,) {
        for (let i = 0; i < word.length; i++) {
            if (this.board[y][x + i] != word[i] && this.board[y][x + i] != ' ') {
                return false
            }
        }
        return true;
    }

    // places a word horizontally 
    this.placeHorizontal = function (word, clue) {
        this.getHorPos(word);
        if (!this.unplacedWords.includes(word)) {
            this.clueList.push(clue);            
            for (let i = 0; i < word.length; i++) {
                this.board[y][x + i] = word[i];
            }
        }
    }

    // finds a random location to see if the word will fit. Try 10 times
    this.getVerPos = function (word) {
        for (let i = 0; i < 10; i++) {
            x = Math.floor(Math.random() * (this.size));
            y = Math.floor(Math.random() * (this.size - word.length));
            if (this.canFitVer(word, x, y)) {
                return(x, y);
            } 
        }
        this.unplacedWords.push(word);
    }

    // checks to see if the word will fit vertically in that spot.
    this.canFitVer = function (word, x, y) {
        for (let i = 0; i < word.length; i++) {
            if (this.board[y + i][x] != word[i] && this.board[y + i][x] != ' ') {
                return false
            }
        }
        return true;
    }

    // places a word verically
    this.placeVertical = function (word, clue) {
        this.getVerPos(word);
        if (!this.unplacedWords.includes(word)) {   
            this.clueList.push(clue);                 
            for (let i = 0; i < word.length; i++) {
                this.board[y + i][x] = word[i];
            }
        }
    }

    this.fillBoard = function () {
        let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
            "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
        ];
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j] == ' ') {
                    this.board[i][j] = alphabet[Math.floor(Math.random() * 26)];
                }
            }
        }
    }
}


function makeWordSearch(wordArr) {
    let wSBoard = new Board(10);
    wSBoard.makeEmptyBoard();
    wSBoard.placeWords(wordList);
    wSBoard.fillBoard();
    return ([wSBoard.board, wSBoard.clueList]);
}

var wordList = [
    ["cat", 'kitten'],
    ['dog', 'puppy'],
    ['horse', 'foal'],
    ['pig', 'piglet'],
    ['duck', 'gosling']
];

console.log(makeWordSearch(wordList));