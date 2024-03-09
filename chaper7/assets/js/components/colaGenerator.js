// import test from '../../api/api.json'
class ColaGenerator{
  constructor() {
    this.colaWrapper =document.querySelector('.cola-wrapper');
  }

  setup(){
    this.loadData((json) => {
      this.colaFactory(json);
    });
  }

  loadData(callback) {
    const requestObj = new XMLHttpRequest();
    requestObj.open('GET','/assets/js/components/api.json');
    requestObj.onreadystatechange = () => {
      if(requestObj.readyState === 4 ) {
        callback(JSON.parse(requestObj.responseText));
      }
    }
    requestObj.send(null);
  }

  colaFactory(data) {
    data.forEach((el) => {
      const article = document.createElement('article');
      let articleItem = `  
        <img src="./assets/img/${el.img}" alt="이미지" />
        <p>${el.name}</p>
        <button
          data-name="cola"
          class="price-button"
          type="button" 
          data-price=${el.price}
          data-item=${el.name}
          data-count=${el.count}
          data-img=${el.img}
        >
          ${el.price + '원'}
        </button>
      `
      article.classList.add("item");
      article.innerHTML = articleItem;
      this.colaWrapper.prepend(article);
    });

  }
}

/*
 <article class="item">
  <img src="./assets/img/Original_Cola.png" alt="이미지" />
  <p>Original_Cola</p>
  <button data-name="cola" class="price-button" type="button">
    1000원
  </button>
</article>
*/

export default ColaGenerator;