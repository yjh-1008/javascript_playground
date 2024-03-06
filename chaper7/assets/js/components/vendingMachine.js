class VendingMachine {
  constructor(){
    this.btnPut = document.querySelector('.btn-put');
    this.myMoney = document.querySelector('.money');
    this.balance = document.querySelector('.balance');
    this.itemList = document.querySelector('.colaWrapper');
    this.inputCostEl = document.querySelector('.input-put');
    this.buttonReturn = document.querySelector('.btn-return');
    this.btnGet = document.querySelector('btn-get');
    this.stagedList = document.querySelector('.info-wrapper .order-item');
    this.gotList = document.querySelector('.cart-list .order-item');
    this.totalTxt = document.querySelector('.price')
  }

  setup() {
    this.bindEvents();
  }

  bindEvents() {
    //입금 버튼 기능  .
    this.btnPut.addEventListener('click', () => {
      const inputCost = parseInt(this.inputCostEl.value);
      const myMoneyVal = this.myMoney.innerText.replaceAll(",",'').replace("원","");
      const balanceValue = this.balance.innerText.replaceAll(",","").replace("원","");


      

      if(inputCost) {
        console.log(myMoneyVal);
        if(inputCost <= myMoneyVal) {
          this.myMoney.innerText = new Intl.NumberFormat().format( myMoneyVal - inputCost) + '원';
          this.balance.innerText = new Intl.NumberFormat().format(parseInt(balanceValue ? balanceValue : 0)+inputCost)+' 원';
          this.inputCostEl.value = null;
        } else {
          alert("소지금이 부족합니다.");
          this.inputCostEl.value = null;
        }
      }
      // console.log(inputCost)
    })
  }

}

export default VendingMachine;