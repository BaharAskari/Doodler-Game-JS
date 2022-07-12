const grid = document.querySelector('.grid')
const doodler = document.createElement('div')
const startBtn = document.querySelector('.button')
const result = document.querySelector('.result')
const gameOverText =document.getElementById('game-over')
let doodlerLeftSpace = 50
let startPoint = 150
let doodlerBottomSpace = startPoint
let isGameOver = false
let platformCount = 5
let platformsArray = []
let upTimerId
let downTimerId
let isJumping = true
let isGoingLeft = false
let isGoingRight = false
let leftTimerId 
let rightTimerId
let score = 0



//Creating Doodler guy
function createDoodler() {
  grid.appendChild(doodler)
  doodlerLeftSpace = platformsArray[0].left
  doodler.classList.add('doodler')
  doodler.style.left = doodlerLeftSpace + 'px'
  doodler.style.bottom = doodlerBottomSpace + 'px'
}


//creating paltforms
 
class Platform {
  constructor(newPlatformBottom) {
    this.bottom = newPlatformBottom
    this.left = Math.random() * 315
    this.visual = document.createElement('div')

    const visual = this.visual
    visual.classList.add('platform')
    visual.style.left = this.left + 'px'
    visual.style.bottom = this.bottom + 'px'
    grid.appendChild(visual)
 }
}

function createPlatforms() {
  for (let i = 0; i < platformCount; i++){
    let platGap = 600 / platformCount
    let newPlatformBottom = 100 + i * platGap
    let newPlatform = new Platform(newPlatformBottom)
    //putting platforms in an array
    platformsArray.push(newPlatform)
    console.log(platformsArray)
  }
}

function movePlatforms() {
  if (doodlerBottomSpace > 200) {
    platformsArray.forEach(platform => {
      platform.bottom -= 4
      let visual = platform.visual
      visual.style.bottom = platform.bottom + 'px'

      if (platform.bottom < 10) {
        let firstPlatform = platformsArray[0].visual
        firstPlatform.classList.remove('platform')
        platformsArray.shift()
        score++
        console.log(platformsArray)
        let newPlatform = new Platform(600)
        platformsArray.push(newPlatform)
      }
    })
  }
}

//making doodler jump
//jump 
function jump() {
  clearInterval(downTimerId)
  isJumping = true
  upTimerId = setInterval(function () {
    doodlerBottomSpace += 20
    doodler.style.bottom = doodlerBottomSpace + 'px'
    if (doodlerBottomSpace > startPoint + 200) {
      fall()
    }
  },30)
}

//fall
function fall() {
  clearInterval(upTimerId)
  isJumping = false
  downTimerId = setInterval(function () {
    doodlerBottomSpace -= 5
    doodler.style.bottom = doodlerBottomSpace + 'px'
    if (doodlerBottomSpace <= 0) {
      gameOver()
      activeStartBtn()
    }
        platformsArray.forEach(platform => {
      if ((doodlerBottomSpace >= platform.bottom) &&
        (doodlerBottomSpace <= platform.bottom + 15) &&
        ((doodlerLeftSpace + 85) >= platform.left) &&
        (doodlerLeftSpace <= platform.left + 85) &&
        !isJumping) {
        console.log('landed')
        result.innerHTML = score
        startPoint = doodlerBottomSpace
        jump()
        }
          
    })
  },30)
}

function gameOver() {
  gameOverText.innerHTML = 'GAME OVER!'
  isGameOver = true
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild)
  }
  clearInterval(upTimerId)
  clearInterval(downTimerId)
  clearInterval(leftTimerId)
  clearInterval(rightTimerId)
}

function activeStartBtn() {
  if (!isGameOver) {
  startBtn.addEventListener('click', start)
}
}



//control doodler
function control(e) {
  if(e.key === "ArrowLeft") {
    moveLeft()
  }else if (e.key === "ArrowRight") {
    moveRight()
  }else if (e.key === "ArrowUp") {
    moveStrainght()
  }
}

function moveLeft() {
  if (isGoingRight) {
    clearInterval(rightTimerId)
    isGoingRight = false
  }
  isGoingLeft = true
  leftTimerId = setInterval(function () {
    if (doodlerLeftSpace >= 0) {
      doodlerLeftSpace -= 5
      doodler.style.left = doodlerLeftSpace + 'px'
    }else moveRight()
  },20)
}

function moveRight() {
  if (isGoingLeft) {
    clearInterval(leftTimerId)
    isGoingLeft = false
  }
  isGoingRight = true
  rightTimerId = setInterval(function () {
    if (doodlerLeftSpace <= 340) {
      doodlerLeftSpace += 5
      doodler.style.left = doodlerLeftSpace + 'px'
    }else moveLeft()
  },20)
}


function moveStrainght() {
  isGoingRight = false
  isGoingRight = false
  clearInterval(rightTimerId)
  clearInterval(leftTimerId)
}



// start function for starting the game
function start() {
  if (!isGameOver) {
    startBtn.removeEventListener('click', start)
    createPlatforms()
    createDoodler()
    setInterval(movePlatforms, 30)
    jump()
    document.addEventListener('keyup', control)
    
  } 
}


//can attach a button here
 startBtn.addEventListener('click' , start)
  
    





