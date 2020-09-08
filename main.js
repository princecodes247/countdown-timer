console.log('Hello World!');


//Variables
const startSec = 10
const startMin = 0
const startHour = 0
let isTimerRunning = false
let isPaused = false
let isMenuOpen = false
let numTimers = 0
const header = document.querySelector('header');
const ham = document.querySelector('.ham');
const menu = document.querySelector('#menu')
const inSec = document.getElementById('in-sec');
const inMin = document.getElementById('in-min');
const inHour = document.getElementById('in-hour');
const inAdd = document.getElementById('add');
const card = document.querySelector('.card');
const number = document.querySelector('.number h2');
const addHour = document.querySelector('#add-hour');
const pauseBtn = document.querySelector('.pause');
const clock = document.querySelector('svg circle:nth-child(2)');
const restartBtn = document.querySelector('.restart');



//Event listeners
ham.addEventListener('click', function (){
  if (isMenuOpen) {
    
    ham.classList.add('ham-norm')
    
      ham.classList.remove('click')
      isMenuOpen = !isMenuOpen
      menu.style.opacity = 0;
      menu.style.pointerEvents = 'none'
   header.classList.toggle('cheader')
  } else if (!isMenuOpen) {
    ham.classList.add('click')
   
          ham.classList.remove('ham-norm')
          isMenuOpen = !isMenuOpen
          header.classList.toggle('cheader')
          menu.style.opacity = 1;
          menu.style.pointerEvents = 'auto'
  }
    
  
})


inSec.addEventListener('focus', function() {
  inSec.value = ""

})

inMin.addEventListener('focus', function() {
  inMin.value = ""
})

inHour.addEventListener('focus', function() {
  inHour.value = ""
})

inSec.addEventListener('blur', function() {
  if (!Number.isInteger(parseInt(inSec.value))) {
    inSec.value = 0
  }
  
  let d = Math.floor(inSec.value / 60)
    inSec.value = inSec.value % 60
    inMin.value = parseInt(inMin.value) + d
    inMin.value = parseInt(inMin.value)
  
  d = Math.floor(inMin.value / 60)
  inMin.value = inMin.value % 60

    inHour.value = parseInt(inHour.value) + d
    inHour.value = parseInt(inHour.value)

if (inSec.value > 9999) {
  inSec.value = 9999
}
if (inMin.value > 9999) {
  inMin.value = 9999
}
if (inHour.value > 9999) {
  inHour.value = 9999
}
})

inMin.addEventListener('blur', function() {
  if (!Number.isInteger(parseInt(inMin.value))) {
    inMin.value = 0
  }
  if (inMin.value > 9999) {
    inMin.value = 9999
  }
  if (inHour.value > 9999) {
    inHour.value = 9999
  }
  let d = Math.floor(inMin.value / 60)
  inMin.value = inMin.value % 60
  
  inHour.value = parseInt(inHour.value) + d
  inHour.value = parseInt(inHour.value)
  if (inMin.value > 9999) {
    inMin.value = 9999
  }
  if (inHour.value > 9999) {
    inHour.value = 9999
  }
})

inHour.addEventListener('blur', function() {
  if (!Number.isInteger(parseInt(inHour.value))) {
    inHour.value = 0
  }
  if (inHour.value > 9999) {
    inHour.value = 9999
  }
})


inAdd.addEventListener('click', function() {
  
  
  if (!isTimerRunning ) {
    startTimer(parseInt(inSec.value), parseInt(inMin.value), parseInt(inHour.value), numTimers);
    isTimerRunning = true
  }
  inMin.value = 0
  inSec.value = 0
  inHour.value = 0
  
})

pauseBtn.addEventListener('click', function (){
  if (isTimerRunning) {
  isPaused = !isPaused;
  card.classList.add('paused');
  restartBtn.classList.toggle('restart-active')
  setTimeout(function (){
    card.classList.remove('paused');
  }, 1000)
  }
})


//Functions 
function startTimer(startSec, startMin, startHour, pos) {
  // body...
  restartBtn.classList.remove('restart-active')
  if (!(startHour == 0)) {
    addHour.style.display = 'inline';
    
  }
  card.classList.add('active')
  clock.style.strokeDashoffset = 440;
  let startTime = [startHour, startMin, startSec];
  const tsec = startSec + startMin * 60 + startHour * 3600;
  const update = setInterval(function() {
    if (startTime[0] === 0 && startTime[1] === 0 && startTime[2] === 0) {
      
      clearInterval(update)
      isTimerRunning = false
      card.classList.remove('warning')
      card.classList.remove('active')
      isPaused = false;
      addHour.style.display = 'none';
      restartBtn.classList.remove('restart-active')
    }
    // body...
    if (!isPaused) {

      updateTime(startTime, tsec, pos)

      startTime[2] -= 1
    }
  }, 1000);
  restartBtn.addEventListener('click', function() {
    if (true) {
      clearInterval(update)
      isTimerRunning = false
      card.classList.remove('warning')
      card.classList.remove('active')
      isPaused = false;
      addHour.style.display = 'none';
      let secondsTimer = document.getElementsByClassName('sec');
        secondsTimer[pos].innerHTML = '00';
        let minsTimer = document.getElementsByClassName('min');
          minsTimer[pos].innerHTML = '00';
        let hoursTimer = document.getElementsByClassName('hour');
          hoursTimer[pos].innerHTML = '00';
          clock.style.strokeDashoffset = 440;
          
    }
  })
}

function updateTime(startTime, tsec, pos) {
  // body...

  if (startTime[0] !== 0 && startTime[1] < 0) {
    startTime[0] -= 1
    startTime[1] = 59;
  }
  if (startTime[1] !== 0 && startTime[2] < 0) {
    startTime[1] -= 1
    startTime[2] = 59;
  } else if (startTime[0] !== 0 && startTime[2] < 0) {
    startTime[0] -= 1
    startTime[1] = 59;
    startTime[2] = 59;
  }

  let a = startTime[0] * 3600 + startTime[1] * 60 + startTime[2];
  if (a === 5 || a === 1) {
    card.classList.add('warning');
  }
  updateSecs(startTime[2], pos)
  updateMins(startTime[1], pos);
  updateHours(startTime[0], pos);
  moveClock(a, tsec)
}

function updateSecs(a, pos) {
  // body...
  let secondsTimer = document.getElementsByClassName('sec');
  if (a < 10) {
    secondsTimer[pos].innerHTML = '0' + a;
  } else {
    secondsTimer[pos].innerHTML = a;
  }
  
}

function updateMins(a, pos) {
  // body...
  let minsTimer = document.getElementsByClassName('min');
  if (a < 10) {
    minsTimer[pos].innerHTML = '0' + a;
  } else {
    minsTimer[pos].innerHTML = a;
  }
}

function updateHours(a, pos) {
  // body...
  let hoursTimer = document.getElementsByClassName('hour');
  if (a < 10) {
    hoursTimer[pos].innerHTML = '0' + a;
  } else {
    hoursTimer[pos].innerHTML = a;
  }
}

function moveClock(a, tsec) {
  // body...
  
  let move = 440 - (440 * (100 - (a / tsec) * 100) / 100);
  clock.style.strokeDashoffset = move;
  isPaused = false;
}