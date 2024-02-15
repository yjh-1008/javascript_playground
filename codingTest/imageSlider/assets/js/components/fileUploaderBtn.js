class FileUploaderBtn {

  constructor() {
    this.uploadBtn = document.querySelector('#image-upload-input');
  }

  setup() {
    this.bindEvents();
  }

  bindEvents() {
    this.uploadBtn.addEventListener('change', function(e) {
      const file = e.target.files[0];
      const carouselList = document.querySelector('.carousel-list');
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.className = "carousel-item";
      carouselList.appendChild(img);
    })
  }
}

export default FileUploaderBtn;