/*
<step1>
1. 카드 클릭
2. 클릭한 카드에 on 클래스 붙임.
3. 클릭한 카드의 정보를 변수에 저장.

<step2>
1. 두번째 카드 클릭.
2, 클릭한 카드에 on 클래스 붙임
3. 클릭한 카드의 정보를 변수에 저장.

<step3>
1. 두 카드가 같은 카드인지 비교
2. 값이 같다면 두 요소를 숨긴다.
3. 값이 다르다면 두 요소의 on 클래스 제거.
4. 저장해뒀던 카드의 정보를 삭제.

*/


class EventCard {
  constructor() {
    this.cards = document.querySelector('.list-card');
    this.cardEl = [];
  }

  setup() {
    console.log('here');
    this.bindEvent();
  }

  bindEvent(){
    this.cards.addEventListener('click',(event) => {
      const elClicked = event.target;
      console.log(event);
      if(elClicked.localName === "li") {
       
        //저장된 데이터가 2개 미만이고 중보된 카드를 클릭한게 아니라면
        if(this.cardEl.length <2 && this.cardEl[0] !== elClicked) {
          this.cardEl.push(elClicked);//클릭한 카드 데이터 저장.
          elClicked.classList.add("on");
          if(this.cardEl.length === 2) {
            setTimeout(() => {
              //같은 카드를 선택했을 경우
              if(this.cardEl[0].dataset.name === this.cardEl[1].dataset.name) {
                this.cardEl.forEach((v) => {
                  v.style.visibility = "hidden";
                })
              }else {
                this.cardEl.forEach((v) => {
                  v.classList.remove("on");
                })
              }
              this.cardEl=[];
            },500);
          
          }
        }
      }
    })
  }
}

export default EventCard;