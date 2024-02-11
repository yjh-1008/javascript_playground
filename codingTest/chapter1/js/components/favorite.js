class Faviorite {
  constructor() {
    console.log('contructor');
    this.favorite = document.querySelector('.content-favorite');
  }

  setup() {
    this.bindEvnets();
  }

  bindEvnets() {
    this.favorite.addEventListener('click', function(e) {
      const cPath = e.composedPath();
      const element = cPath.find(element => element.tagName === 'BUTTON');
      if(!element) return;
      element.classList.toggle("on");
    })
  }
}

export default Faviorite;