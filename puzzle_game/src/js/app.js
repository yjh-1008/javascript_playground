const defaultLocation = [];
const movePeaceArr = [];

const tiles = document.querySelectorAll('.tile');
const voidTile = document.querySelector('.none');
const moveCount = document.querySelector('.move-count');
const timer = document.querySelector('.timer');
const answer = document.querySelector('.answer');
const puzzle = document.querySelector('.puzzle');

let move = 0;
let time = 0;
let timeCounter = null;

function convertNum(num) {
  return num > 9 ? num : '0'+num;
}

function setTime() {
  const minute = Math.floor(time/60);
  const second = time - minute*60;
  timer.innerHTML = `${convertNum(minute)}:${convertNum(second)}`;
}

function timeCount() {
  time++;
  setTime();
}

function moveCountDisplay() {
  move += 1;
  moveCount.innerHTML = move;
}

function initMoveTime() {
  move = 0;
  time = 0;
  moveCount.innerHTML = 0;
  if(timeCounter) {
    clearInterval(timeCounter);
    setTime();
  }
}

function answerCheck() {
  let isAnswer = true;
  for(let i=0; i<movePeaceArr.length;i++) {
    if(movePeaceArr[i][0] !== 0 || movePeaceArr[i][1] !== 0){
      isAnswer = false;
      break;
    }
  }
  if(isAnswer) {
    answerView();
  }
}

function peaceMove(target, checkVoid, dir) {
  if(checkVoid) {
    movePeaceArr[target.id-1] = [movePeaceArr[target.id-1][0] + dir[0], movePeaceArr[target.id-1][1] + dir[1]];
    movePeaceArr[checkVoid.id-1] = [movePeaceArr[checkVoid.id-1][0] - dir[0], movePeaceArr[checkVoid.id-1][1] - dir[1]];
    console.log(target)
    target.style.transform = `translate(${movePeaceArr[target.id-1][0]}px, ${movePeaceArr[target.id-1][1]}px)`;
    // console.log(el.style);
  // });
    voidTile.style.transform = `translate(${movePeaceArr[checkVoid.id-1][0]}px, ${movePeaceArr[checkVoid.id-1][1]}px)`;
  }
}

function isVoid(chkVoid) {
  if(chkVoid.className) {
    if(chkVoid.className === 'none') {
      return true;
    }
  }
  return false;
}

function answerView() {
  document.querySelector('.answer_move').innerHTML = `move : ${moveCount.innerHTML}`;
  document.querySelector('.answer_time').innerHTML = `time : ${timer.innerHTML}`;
  puzzle.removeEventListener('click', moveEvent);
  initMoveTime();
  answer.style.display = 'block';
}

function findVoid(target, x, y) {
  const dir = [[0,-80],[0,80],[-80,0],[80,0]];
  const X = x+35;
  const Y = y+35;
  console.log(X,Y);
  for(const d of dir) {
    const checkVoid = document.elementFromPoint(X + d[0],Y+d[1]);
    console.log(checkVoid)
    if(isVoid(checkVoid)) {
      return [checkVoid, d];
    }
  }
}

function moveEvent(e) {
  const target = e.target;
  if(target.className.includes('tile')) {
    const {x, y} = target.getBoundingClientRect();
    resultFind = findVoid(target,x, y); 
    console.log(resultFind)
    peaceMove(target,...resultFind);
    moveCountDisplay();
    answerCheck();
  }
}

function random() {
  const sample = [5,3,12, 4, 6, 13, 1, 7, 9, 14, 16, 8, 11, 10,2, 15];
  const moveLocation = [];
  for(const idx in sample) {
    moveLocation[sample[idx]-1] = defaultLocation[idx];
  }
   
  for(let i=0;i<defaultLocation.length;i++) {
    movePeaceArr[i] = [
      moveLocation[i][0] - defaultLocation[i][0],
      moveLocation[i][1] - defaultLocation[i][1]
    ]
  }
}

function setPeace() {
  tiles.forEach((el, i) => {
    el.style.transform = `translate(${movePeaceArr[i][0]}px, ${movePeaceArr[i][1]}px)`;
  });
  voidTile.style.transform = `translate(${movePeaceArr[movePeaceArr.length-1][0]}px, ${movePeaceArr[movePeaceArr.length-1][1]}px)`
}

function gameStart() {
  initMoveTime();
  random();
  puzzle.addEventListener('click',moveEvent);
  setPeace();
  timeCounter = setInterval(timeCount,1000);
} 

function resetGame() {
  setPeace();
  puzzle.removeEventListener('click',moveCount);
  initMoveTime();
}

function init() {
  document.querySelector('.start-btn').addEventListener('click',gameStart);
  document.querySelector('.reset-btn').addEventListener('click',resetGame);
  document.querySelector('.answer_button').addEventListener('click',() => {
    answer.style.display = 'none';
  });

  tiles.forEach((el) => {
    const {x, y} = el.getBoundingClientRect();
    defaultLocation.push([x,y]);
  });
  const {x,y} = voidTile.getBoundingClientRect();
  console.log(x,y);
  defaultLocation.push([x,y]);

  for(let i=0; i<tiles.length;i++) {
    movePeaceArr[i] = [0,0];
  }
}

init();