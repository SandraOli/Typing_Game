const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];

/* inicializacr word score i time */
let randomWord;
let score = 0;
let time = 10;

/* set difficulty to value or medium */
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

/* set difficulty select value */
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';


/* focus on text on start */
text.focus();

/* start counting time */
const timeInterval = setInterval(updateTime, 1000);



/* get a random word from array*/
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];

}

/* add word to DOM */
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

 /* update score */
 function updateScore() {
    score++;
    scoreEl.innerHTML = score;
 }

/* updatee time */
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if (time === 0) {
        clearInterval(timeInterval);
        /* end game */
        gameOver();
    }
};

/* game over, show end screen*/
function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time Ran Out</h1>
    <p> Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;

    endgameEl.style.display = 'flex';
}



addWordToDOM();



/* event listener */

/* typing */
text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();
        /* clear*/
        e.target.value = '';

        if (difficulty === 'hard') {
            time +=3;
        } else if (difficulty === 'medium') {
            time +=3;
        } else {
            time +=5;
        }

        updateTime();
    }
});

/* settings btn click */
settingsBtn.addEventListener('click', () => settingsBtn.classList.toggle('hide'));


/* setting select */
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
   
});