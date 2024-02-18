class NextBtn {
  constructor() {
    this.nextBtn = document.querySelector('.next-btn');
  }

  setup() {
    this.bindEvents();
  }

  onSlide() {
    const lists = document.querySelector('.carousel-list');
    console.log(lists);
    let imgs = lists.querySelectorAll('.carousel-item');
    imgs[0].classList.remove('now');
    imgs[1].classList.add('now');
    const head = imgs[0];
    const tmp = Array.prototype.slice.call(imgs,0, 1);
    imgs = [...tmp, head];
    console.log(imgs);
  }

  bindEvents() {
    this.nextBtn.addEventListener('click', this.onSlide);
    
  }

}

export default NextBtn;