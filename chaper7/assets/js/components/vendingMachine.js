class VendingMachine {
  constructor(){
    this.btnPut = document.querySelector('.btn-put');
    this.myMoney = document.querySelector('.money');
    this.balance = document.querySelector('.balance');
    this.itemList = document.querySelector('.cola-wrapper');
    this.inputCostEl = document.querySelector('.input-put');
    this.buttonReturn = document.querySelector('.btn-return');
    this.btnGet = document.querySelector('.btn-get');
    this.stagedList = document.querySelector('.order-list');
    this.gotList = document.querySelector('.cart-list');
    this.totalTxt = document.querySelector('.price')
  }

  setup() {
    this.bindEvents();
  }

  stagedItemGenerator(target) {
    const stagedItem = document.createElement('div');
    stagedItem.classList.add('order-item');
    stagedItem.dataset.item = target.dataset.item;
    stagedItem.dataset.price = target.dataset.price;

    stagedItem.innerHTML = 
    `
      <img src="./assets/img/${target.dataset.item}.png" alt="cola" />
      <div class="order-name">${target.dataset.item}</div>
      <div class="order-count">1</div>
    `

    this.stagedList.appendChild(stagedItem);
  }

  bindEvents() {
    //입금 버튼 기능  .
    this.btnPut.addEventListener('click', () => {
      const inputCost = parseInt(this.inputCostEl.value);
      const myMoneyVal = this.myMoney.innerText.replaceAll(",",'').replace("원","");
      const balanceValue = this.balance.innerText.replaceAll(",","").replace("원","");

      if(inputCost) {
        if(inputCost <= myMoneyVal) {
          this.myMoney.innerText = new Intl.NumberFormat().format( myMoneyVal - inputCost) + '원';
          this.balance.innerText = new Intl.NumberFormat().format(parseInt(balanceValue ? balanceValue : 0)+inputCost)+' 원';
          this.inputCostEl.value = null;
        } else {
          alert("소지금이 부족합니다.");
          this.inputCostEl.value = null;
        }
      }
    });

    this.buttonReturn.addEventListener('click', () => {
      const myMoneyVal = this.myMoney.innerText.replaceAll(",",'').replace("원","");
      const balanceValue = this.balance.innerText.replaceAll(",","").replace("원","");

      if(balanceValue) {
        this.myMoney.innerText = new Intl.NumberFormat().format(parseInt(myMoneyVal) + parseInt(balanceValue) ) + '원';
        this.balance.innerText = '원';
      }
    });

    this.itemList.addEventListener('click', (event) => {
      const tarteEl = event.target;
      const balanceValue = this.balance.innerText.replaceAll(",","").replace("원","");

      const targetElBtn = tarteEl.querySelector('.price-button');
      let isStaged = false;
      if(tarteEl.tagName === 'ARTICLE') {
        const targetElPrice= parseInt(targetElBtn.dataset.price);
        if(balanceValue >= targetElPrice) {
          this.balance.innerText = new Intl.NumberFormat().format(balanceValue - targetElPrice) + '원';
          if(this.stagedList.querySelectorAll('.order-item').length > 0) {
            this.stagedList.querySelectorAll('.order-item').forEach((item) => {
              if(item.dataset.item === targetElBtn.dataset.item) {
                item.querySelector('.order-count').innerHTML++;
                isStaged=true;
              }
            })
            if(!isStaged) {
              this.stagedItemGenerator(targetElBtn);
            }
          } else {
            this.stagedItemGenerator(targetElBtn);
          }
          targetElBtn.dataset.count -= 1;
          if(targetElBtn.dataset.count <= 0) {
            tarteEl.classList.add('sold-out')
          }
        } else {
          alert('잔액이 부족합니다.');
        }
      }
    })

    this.btnGet.addEventListener('click' ,() => {
      let totalPrice = 0;
      let got= false;
      this.stagedList.querySelectorAll('.order-item').forEach((item) => {
        this.gotList.querySelectorAll('.order-item').forEach((itemGot) => {
          let itemGotCount = itemGot.querySelector('.order-count');
          if(item.dataset.item === itemGot.dataset.item) {
            // console.log(parseInt(itemGotCount.innerTexr) + parseInt(item.querySelector('.order-count').innerText));
            itemGot.querySelector('.order-count').innerText = parseInt(itemGotCount.innerText) + parseInt(item.querySelector('.order-count').innerText);
            this.stagedList.removeChild(item);
            got = true;
            return;
          }
        });
        if(!got) {
          this.gotList.appendChild(item);
        }
      })

      this.gotList.querySelectorAll('.order-item').forEach((item) => {
        totalPrice = totalPrice + parseInt(item.dataset.price)* parseInt(item.querySelector('.order-count').innerText);
      });
      console.log(totalPrice)
      this.totalTxt.innerText = new Intl.NumberFormat().format(totalPrice) + '원';
    })


  }
}

export default VendingMachine;