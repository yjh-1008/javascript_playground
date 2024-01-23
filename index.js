import aixos from 'axios';
import './style.css';
var div = document.querySelector('.container');
div.innerText = 'Webpack loadd!!';

class App{
  page=0;
  constuctor() {
    this.start();
    this.page = 0;
  }

  async onPrev() {
    if(this.page-1 <0) return;
    this.page-=1;
    await this.imageLoad('right');
  }
  async onNext() {
    // if(this.page-1 <0) return;
    console.log('here');
    this.page+=1;
    await this.imageLoad('left');
  }

  async imageLoad(dir='') {
    const imageLoader = document.querySelector('.image_container');
    const parent = document.querySelector('.parent');
    if(dir !== '')imageLoader.classList.add(dir);
    imageLoader.setAttribute("style","width:100%;max-height: 200px;display:flex");
    
    const {data} = await aixos.get(`https://picsum.photos/v2/list?page=${this.page}&limit=10`);
    imageLoader.replaceChildren();
    data.forEach((v,i) => {
      const img = document.createElement('img');
      img.className = "list_img"
      img.src = v.download_url;
      img.loading="lazy";
      img.setAttribute("style","width:100px")
      img.addEventListener('click', () => {
        document.location.href= 'img.src';
      })
      imageLoader.appendChild(img);
    });
    if(dir !== '')imageLoader.classList.remove(dir);
    console.log(imageLoader.childNodes);
    // parent.appendChild(nextImageLoader);
  }

  async start() {
    const parent = document.querySelector('.parent');
    const prevBtn = document.querySelector('.prev');
    prevBtn.textContent='이전';
    prevBtn.addEventListener('click', () => this.onPrev());
    const nextBtn = document.querySelector('.forward');
    nextBtn.textContent = '댜음';
    nextBtn.addEventListener('click', () => this.onNext());
    await this.imageLoad();
    parent.appendChild(prevBtn);
    parent.appendChild(nextBtn);

  }
}

const app = new App();
app.start();