let s; // 뱀 객체
let scl = 60; // 뱀의 한 칸의 크기
let food; // 음식 객체
let playfield = 600; // 게임 화면의 크기

// 내가 추가한 함수들(7개)
let startButton; // 시작 버튼
let highscoreText; // 최고점 텍스트
let bounsscore; //  보너스 점수
let difficultyButton; // 난이도 설정 버튼
let gameState = 'start'; // 게임 상태를 나타내는 변수
let difficulty = 'normal'; // 난이도를 나타내는 변수
let speed = 10; // 프레임 속도 조절
let backgroundImage; // 배경 이미지 변수

// 전재민 추가함수 
let combinedMovement  = 0;//랜덤 이동 기준
let enemy;// 적을 나타내는 함수

function preload() {
  backgroundImage = loadImage('https://www.google.com/logos/fnbx/snake_arcade/cta_alt.png'); 
}

function setup() {
  createCanvas(playfield, 640); // 캔버스 생성
  startScreenSetup(); // 시작 화면 설정 함수 호출
}

function draw() {
  if (gameState === 'start') { // 시작 화면 상태일 때
    showStartScreen(); // 시작 화면 표시 함수 호출
  } else if (gameState === 'playing') { // 게임 플레이 중일 때
    background(51); // 배경 색상 설정
    scoreboard(); // 스코어보드 표시
    if (s.eat(food) || e.eat(food)) { // 뱀이 음식을 먹었을 때
      pickLocation(); // 새로운 음식 위치 설정
    }
    combinedMovement += abs(s.xspeed * scl) + abs(s.yspeed * scl);

  
    if (combinedMovement > 200) {
        e.rotate(); // 적의 방향 변경
        combinedMovement = 0;
    }
    s.death();

    s.checkCollision(e);
    e.checkCollision(s);
 
    s.update();
    e.update();
  
    s.show();
    e.show();
  
    s.checkCollision(e);
    e.checkCollision(s);
 

    fill (255,0,100);

    rect(food.x,food.y, scl, scl);
    rect(food.x,food.y, scl, scl);
    rect(food.x,food.y, scl, scl);
  }
    else if (gameState === 'gameover') {
    showGameOverScreen();
  }
}

function startScreenSetup() {
    // 배경 이미지 표시
    image(backgroundImage, 0, 0, width, height);
  
    // 시작 화면 요소들 생성
    startButton = createButton('시작');
    startButton.size(150, 50);
    startButton.position(220, 280);
    startButton.mousePressed(startGame);
    
    difficultyButton = createButton('난이도 설정');
    difficultyButton.size(150, 50);
    difficultyButton.position(220, 340);
    difficultyButton.mousePressed(showDifficultyButtons);
  }

function showStartScreen() {
    // 배경 이미지 표시
    image(backgroundImage, 0, 0, width, height);
  
    // '스네이크 게임' 텍스트 표시
    push();
    textSize(50);
    fill(255);
    stroke(0);
    strokeWeight(6);
    textStyle(BOLD);
    textAlign(CENTER);
    text('스네이크 게임', width / 2, 170);
    // 현재 난이도 표시
    textSize(24);
    strokeWeight(4);
    text('현재 난이도: ' + difficulty.toUpperCase(), width / 2, 240);
    pop();
  }
  
function showGameOverScreen() {
    // 게임 오버 스크린 표시
    fill(0);
    rect(50, 100, 500, 300);
    
    push();
    textSize(64);
    fill(255);
    textStyle(BOLD);
    textAlign(CENTER);
    text('GAME OVER', width / 2, 190);
    textSize(24);
    text('당신의 점수는?', width / 2, 240);
    textSize(50);
    if (s.score + s.bounsscore < s.highscore + s.bounsscore) {
        text(s.score + s.bounsscore + "점!", width / 2, 300);
      } else {
        text(s.highscore + s.bounsscore + "점!!!", width / 2, 300);
        textSize(24);
        fill(255, 255, 0);
        text("신기록 달성!", width / 2 + 160, 290);
      }
    pop();
    
    // 게임 오버 요소들 생성
    retryButton = createButton('다시 시작');
    retryButton.size(150, 50);
    retryButton.position(140, 330);
    retryButton.mousePressed(reStartGame);
    
    menuButton = createButton('메뉴로 돌아가기');
    menuButton.size(150, 50);
    menuButton.position(320, 330);
    menuButton.mousePressed(returnToMenu);
}
  function returnToMenu() { // 메뉴로 돌아가는 함수
    gameState = 'start';
    clearButtons(); 
    startScreenSetup();
  }
function clearButtons() {
  // 버튼을 숨기는 함수
  for (let element of document.querySelectorAll('button')) {
    element.remove(); // 모든 버튼 제거
  }
}
function startGame() {
  gameState = 'playing'; // 게임 상태를 'playing'으로 변경
  startButton.hide(); // 시작 버튼 숨기기
  difficultyButton.hide(); // 난이도 설정 버튼 숨기기
  s = new Snake(); // 새로운 뱀 객체 생성
  e = new Enemy();
  frameRate(speed); // 프레임 속도 설정
  pickLocation(); // 초기 음식 위치 설정
}
function reStartGame() { // 게임 재시작
    gameState = 'playing'; // 게임 상태를 'playing'으로 변경
    s.score = 0; // 점수 초기화
    clearButtons(); // 게임오버 화면 버튼 숨기기
    frameRate(speed); // 프레임 속도 설정
    pickLocation(); // 초기 음식 위치 설정
  }

  function showDifficultyButtons() {
    // 난이도 설정 버튼을 누르면 실행되는 함수
    // 난이도 설정 버튼을 숨기고, 난이도 선택 버튼들을 표시
    difficultyButton.hide(); // 난이도 설정 버튼 숨기기
    
    let easyButton = createButton('EASY');
    easyButton.size(80, 40);
    easyButton.position(160, 350);
    easyButton.mousePressed(setEasy);
    
    let normalButton = createButton('NORMAL');
    normalButton.size(80, 40);
    normalButton.position(250, 350);
    normalButton.mousePressed(setNormal);
  
    let hardButton = createButton('HARD');
    hardButton.size(80, 40);
    hardButton.position(340, 350);
    hardButton.mousePressed(setHard);
  }

function setEasy() {
  difficulty = 'easy'; // 난이도를 'easy'로 설정
  speed = 5; // 속도를 조절
  gameState = 'start'; // 시작 화면으로 변경
  clearDifficultyButtons(); // 난이도 버튼 숨기기
  startScreenSetup(); // 시작 화면 초기화
}

function setNormal() {
  difficulty = 'normal'; // 난이도를 'normal'로 설정
  speed = 10; // 속도를 조절
  gameState = 'start'; // 시작 화면으로 변경
  clearDifficultyButtons(); // 난이도 버튼 숨기기
  startScreenSetup(); // 시작 화면 초기화
}

function setHard() {
  difficulty = 'hard'; // 난이도를 'hard'로 설정
  speed = 20; // 속도를 조절
  gameState = 'start'; // 시작 화면으로 변경
  clearDifficultyButtons(); // 난이도 버튼 숨기기
  startScreenSetup(); // 시작 화면 초기화
}

function clearDifficultyButtons() {
  // 난이도 버튼을 숨기는 함수
  for (let element of document.querySelectorAll('button')) {
    element.remove(); // 모든 버튼 제거
  }
}

// 음식 위치 설정 함수
function pickLocation() {
  let cols = floor(playfield / scl); // 열 개수 계산
  let rows = floor(playfield / scl); // 행 개수 계산
  food = createVector(floor(random(cols)), floor(random(rows))); // 랜덤한 위치에 음식 생성
  food.mult(scl); // 음식의 위치를 단위에 맞게 조정

  // 음식이 뱀의 꼬리 안에 생성되지 않도록 확인
  for (let i = 0; i < s.tail.length; i++) {
    let pos = s.tail[i]; // 뱀의 꼬리 위치
    let d = dist(food.x, food.y, pos.x, pos.y); // 음식과 꼬리 사이의 거리 계산
    if (d < 1) { // 거리가 너무 가까우면
      pickLocation(); // 다시 음식 위치 설정
    }
  }
}

function scoreboard() {
  fill(0); // 색상 설정
  rect(0, 600, 600, 40); // 스코어 보드 영역 그리기
  fill(255); // 색상 설정
  textFont("Georgia"); // 폰트 설정
  textSize(18); // 텍스트 크기 설정
  text("점수: ", 30, 625); // 점수 텍스트 표시
  text("최고점: ", 540, 625); // 최고 점수 텍스트 표시
  text("보너스 점수: " ,250 ,625);
  text(s.bounsscore, 320,625);
  text(s.score, 60, 625); // 현재 점수 표시
  text(s.highscore, 580, 625); // 최고 점수 표시
}

function keyPressed() {
  if (keyCode === UP_ARROW){
      s.dir(0, -1); // 위쪽 화살표 키 입력 시 뱀의 방향을 위로 설정
  } else if (keyCode === DOWN_ARROW) {
      s.dir(0, 1); // 아래쪽 화살표 키 입력 시 뱀의 방향을 아래로 설정
  } else if (keyCode === RIGHT_ARROW) {
      s.dir(1, 0); // 오른쪽 화살표 키 입력 시 뱀의 방향을 오른쪽으로 설정
  } else if (keyCode === LEFT_ARROW) {
      s.dir(-1, 0); // 왼쪽 화살표 키 입력 시 뱀의 방향을 왼쪽으로 설정
  }
}

function Snake() {

    this.x =0;
  
    this.y =0;
  
    this.xspeed = 1;
  
    this.yspeed = 0;
  
    this.total = 0;
  
    this.tail = [];
  
    this.score = 1;
  
    this.bounsscore = 0;
  
    this.highscore = 1;
  
   
  
    this.dir = function(x,y) {
  
      this.xspeed = x;
  
      this.yspeed = y;
  
    }
    this.checkCollision = function(enemy) {
      for (let i = 0; i < enemy.tail.length; i++) {
          let pos = enemy.tail[i];
          let d = dist(this.x, this.y, pos.x, pos.y);
          if (d < 1) {
              this.death();
          }
      }
  }
   
  
    this.eat = function(pos) {
  
      let d = dist(this.x, this.y, pos.x, pos.y);
  
      if (d < 1) {
  
        this.total++;
  
        this.score++;
  
        text(this.score, 70, 625);
  
        if (this.score > this.highscore) {
  
          this.highscore = this.score;
  
        }
  
        text(this.bounsscore,300,625);
  
  
        text(this.highscore, 540, 625);
  
        return true;
  
      } else {
  
        return false;
  
      }
  
    }
  
   
  
    this.death = function() {
  
      for (let i = 0; i < this.tail.length; i++) {
  
        let pos = this.tail[i];
  
        let d = dist(this.x, this.y, pos.x, pos.y);
  
        if (d < 1) {
  
          this.total = 0;
  
          
          this.tail = [];
          this.snakeDead();
  
        }
  
      }
  
    }
  
    this.snakeDead = function() {
        gameState = 'gameover'
      }
  
    this.update = function(){
  
      if (this.total === this.tail.length) {
  
        for (let i = 0; i < this.tail.length-1; i++) {
  
          this.tail[i] = this.tail[i+1];
  
      }
  
   
  
      }
  
      this.tail[this.total-1] = createVector(this.x, this.y);
  
   
  
      this.x = this.x + this.xspeed*scl;
  
      this.y = this.y + this.yspeed*scl;
  
   
  
      this.x = constrain(this.x, 0, playfield-scl);
  
      this.y = constrain(this.y, 0, playfield-scl);
  
   
  
   
  
    }
    
    
  this.show = function() {
      
      for (let i = 0; i < this.tail.length; i++) {
        let alphaValue = map(i, 0, this.tail.length - 1, 100, 255); // 투명도 범위를 조정
        fill(alphaValue); // 흰색 및 변화하는 투명도
        rect(this.tail[i].x, this.tail[i].y, scl, scl);
      }
    
      if (this.tail.length === 0) {
        // Snake의 길이가 0인 경우 원으로 헤드를 그립니다.
        ellipseMode(CORNER);
        ellipse(this.x, this.y, scl, scl);
      } else {
        // 첫 번째 몸통의 위치 계산
        let firstBodyPart = this.tail[this.total-1];
        let centerX = (this.x + firstBodyPart.x) / 2;
        let centerY = (this.y + firstBodyPart.y) / 2;
        
        // 반원을 그리기 위한 각도 계산
        let angle;
        if (this.xspeed === 1) {
          angle = HALF_PI; // 오른쪽으로 90도 회전
        } else if (this.xspeed === -1) {
          angle = -HALF_PI; // 왼쪽으로 90도 회전
        } else if (this.yspeed === -1) {
          angle = PI; // 아래로 180도 회전
        } else if (this.yspeed === 1) {
          angle = 0; // 위로 회전하지 않음
        }
        
        // 첫 번째 몸통과의 거리 계산
        let distance = dist(this.x, this.y, firstBodyPart.x, firstBodyPart.y);
        let radius = distance / 2;
        
        // 반원을 그립니다.
        arc(centerX , centerY , radius * 2, radius * 2, -angle, PI - angle, PIE);
      }
  }
  
    
  
   
  
  }
  function Enemy(){
    this.x =400;
  
    this.y =400;
  
    this.xspeed = 1;
  
    this.yspeed = 0;
  
    this.rotation = [[0,1],[1,0],[-1,0],[0,-1]];
  
    this.total = 0;
  
    this.tail = [];
    
    this.checkCollision = function(enemy) {
      for (let i = 0; i < enemy.tail.length; i++) {
          let pos = enemy.tail[i];
          let d = dist(this.x, this.y, pos.x, pos.y);
          if (d < 1) {
              enemy.bounsscore += this.tail.length;
              this.tail = [];
              this.total = 0;
              
          }
      }
    }
    
    this.rotate = function(){
      const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
      let direction = getRandom(-1, 3);
      if (direction === 0) {
        // 위로 향하는 방향
        this.xspeed = 0;
        this.yspeed = -1;
      } else if (direction === 1) {
        // 오른쪽으로 향하는 방향
        this.xspeed = 1;
        this.yspeed = 0;
      } else if (direction === 2) {
        // 아래로 향하는 방향
        this.xspeed = 0;
        this.yspeed = 1;
      } else {
        // 왼쪽으로 향하는 방향
        this.xspeed = -1;
        this.yspeed = 0;
      }
    }
    this.eat = function(pos) {
  
      let d = dist(this.x, this.y, pos.x, pos.y);
  
      if (d < 1) {
  
        this.total++;
  
        
  
        return true;
  
      } else {
  
        return false;
  
      }
      
      
  
    }
    this.update = function() {
      
      if (this.total === this.tail.length) {
        for (let i = 0; i < this.tail.length - 1; i++) {
          this.tail[i] = this.tail[i + 1];
        }
      }
      this.tail[this.total - 1] = createVector(this.x, this.y);
      // 현재 방향으로 이동
      this.x = this.x + this.xspeed * scl;
      this.y = this.y + this.yspeed * scl;
      // 화면 경계를 넘어가지 않도록 제약 설정
      
      this.x = constrain(this.x, 0, playfield-scl);
  
      this.y = constrain(this.y, 0, playfield-scl);
      
      // 바닥에 부딪혔을 때 위로 올라가도록 수정
      if (this.y >= playfield - scl) {
        this.rotate();
      } else if (this.y < 0) {
        this.rotate();
      }
      if (this.x > playfield - scl) {
        this.rotate();
      } else if (this.x < 0) {
        this.rotate();
      }
      
  }
  this.show = function() {
    fill(255,255,0);
    for (let i = 0; i < this.tail.length; i++) {
        let alphaValue = map(i, 0, this.tail.length - 1, 100, 255); // 투명도 범위를 조정
    
        
        rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
  
    if (this.tail.length === 0) {
      // Snake의 길이가 0인 경우 원으로 헤드를 그립니다.
      ellipseMode(CORNER);
      ellipse(this.x, this.y, scl, scl);
    } else {
      // 첫 번째 몸통의 위치 계산
      let firstBodyPart = this.tail[this.total-1];
      let centerX = (this.x + firstBodyPart.x) / 2;
      let centerY = (this.y + firstBodyPart.y) / 2;
      
      // 반원을 그리기 위한 각도 계산
      let angle;
      if (this.xspeed === 1) {
        angle = HALF_PI; // 오른쪽으로 90도 회전
      } else if (this.xspeed === -1) {
        angle = -HALF_PI; // 왼쪽으로 90도 회전
      } else if (this.yspeed === -1) {
        angle = PI; // 아래로 180도 회전
      } else if (this.yspeed === 1) {
        angle = 0; // 위로 회전하지 않음
      }
      
      // 첫 번째 몸통과의 거리 계산
      let distance = dist(this.x, this.y, firstBodyPart.x, firstBodyPart.y);
      let radius = distance / 2;
      
      // 반원을 그립니다.
      arc(centerX , centerY , radius * 2, radius * 2, -angle, PI - angle, PIE);
    }
  }
  
  
  
  }
