class FileUploaderBtn {

  constructor() {
    this.uploadBtn = document.querySelector('#image-upload-input');
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

  bindEvents() {
    this.uploadBtn.addEventListener('change', (e) => {

      const file = e.target.files[0];
      const carouselList = document.querySelector('.carousel-list');
      const items = carouselList.querySelectorAll('.carousel-item');
      const first = items[0];
      const img = document.createElement('img');
      const li = document.createElement('li');
      img.src = URL.createObjectURL(file);
      li.classList.add("carousel-item");
      li.classList.add("now");
      li.appendChild(img);
      first.classList.remove('now');

      carouselList.insertBefore(li,items[0]);
      this.changeTransform();
    })

  }
}

export default FileUploaderBtn;