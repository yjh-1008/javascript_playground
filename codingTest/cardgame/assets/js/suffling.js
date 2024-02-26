export default class Suffling {
  constructor() {
    this.data=['mura','gary','binky','licat','javadoc'];
    this.parent = document.querySelector('.list-card');
  }
  setup() {
    this.bindEvent();
  }

  generateCards(name) {
    const li = document.createElement("li");
    li.classList.add(name);
    li.dataset.name = name;
    this.parent.appendChild(li);
  }

  bindEvent() {
    let dataDouble = this.data.concat(this.data);
    while(dataDouble.length > 0) {
      const randomNum = Math.floor(Math.random() * 10);
      if(dataDouble[randomNum]) {
        this.generateCards(dataDouble[randomNum]);
        dataDouble.splice(randomNum,1);
      }

    }
  }
}