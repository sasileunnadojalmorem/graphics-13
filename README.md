# graphics-13
그래픽스 조별과제
뱀 게임 소개 
구현한 기능

# 뱀 게임
## 구현 기능
  
1. 시작 화면 만들기(난이도 설정 가능한 시작화면)
  + 난이도 설정(쉬움, 보통, 어려움)
  + 난이도에 따라 프레임 레이트 변경하기
  + 현재 난이도를 시작 화면에 표시
  + 게임 배경 수정
* * *
<시작 화면>     
![Alt text]("https://github.com/rex6928/code/blob/main/menu.PNG"  )   
<난이도 설정 화면>   
![Alt text](https://github.com/rex6928/code/blob/main/difficult%20menu.PNG,width="400" height="400")   

* * *
  2. 종료화면
  3. 뱀게임 내에서의 적 - 전재민
    <p align="center">
    <img src="https://github.com/sasileunnadojalmorem/graphics-13/assets/79616817/5b4ca7c9-5435-40fa-8e3e-480a574a293e" width="400" height="400">
    </p>
  
    뱀게임 내에서 사용자의 입력을 받아 움직이는 snake 말고도 스스로 움직이는 enemy함수를 작성하였다
    enemy함수의 특징으로는 키입력을 받지않고도 스스로 움직일수 있는 특징이있다.//

    또한 enemy함수와 snake함수끼리 이벤트를 추가하고자 했다.
    enemy의 머리와 snake의 몸통이 만나거나, snake의 머리와 enemy의 몸통이 만났을때의 상호작용을 추가하였고
    후자의 경우에는 enemy.tail.length 만큼의 보너스 점수를 획득하도록 설정하였다
     
