class NextBtn {
  constructor() {
    this.nextBtn = document.querySelector('.next-btn');
  }

  setup() {
    this.bindEvents();
  }


  changeTransform() {
    const carouselList = document.querySelector('.carousel-list');
    const items = carouselList.querySelectorAll('.carousel-item');
    items.forEach((e,i) => {
      let degree = 360 / items.length;

      if(items.length > 1) {
        if(i === 0) {
          e.style.transform = "rotateY(0deg) translateZ(250px)";
        } else {
          e.style.transform = `rotateY(${degree * i}deg) translateZ(250px) rotateY(-${degree*i}deg)`
        }
      }

    if(items.length >= 5) {
      if(i == 0) {
        e.style.transform = "rotateY(0deg) translateZ(250px)";
      } else if (i===1) {
        e.style.transform = `rotateY(72deg) translateZ(250px) rotateY(-72deg)`
      } else if(i == 2) {
        e.style.transform = `rotateY(144deg) translateZ(250px) rotateY(-144deg) translateX(400px)`
      }else if(i===items.length - 2) {
        e.style.transform = `rotateY(216deg) translateZ(250px) rotateY(-216deg) translateX(-400px)`
      } else if( i ===items.length -1) {
        e.style.transform = `rotateY(288deg) translateZ(250px) rotateY(-288deg) `
      } else {
        e.style.transform = `rotateY(${degree * i}deg) translateZ(250px) rotateY(-${degree*i}deg)`
      }

    }
    })

  }

  onSlide() {
    const lists = document.querySelector('.carousel-list');
    let imgs = document.querySelectorAll('.carousel-item');
    if(imgs.length > 1) {
      const now = document.querySelector('.now');
      const next = now.nextElementSibling;
      lists.appendChild(now);
      now.classList.remove('now');
      next.classList.add('now');
      this.changeTransform();
    }
  }

  bindEvents() {
    this.nextBtn.addEventListener('click', (e) => {
      this.onSlide();
      this.changeTransform();
    });
    
  }

}

export default NextBtn;