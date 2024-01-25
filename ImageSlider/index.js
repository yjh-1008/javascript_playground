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

  async pageClick(cur) {
    const pagination = document.querySelector('.pagination');
    let prev;
    for(let i=0;i<pagination.childNodes.length; i++) {
      if(pagination.childNodes[i].className === 'picked') {
        prev = Number(pagination.childNodes[i].textContent)-1;
        pagination.childNodes[i].className = '';
        pagination.childNodes[cur-1].className = 'picked';
        break;
      }
    }
    console.log(cur, prev);
    if(cur-1 === prev) return;
    this.page = cur-1;
    if(cur-1 > prev) {
      await this.imageLoad('left');
    }else await this.imageLoad('right');
  }

  generatePage() {
    //페이지네이션
    const pagination = document.querySelector('.pagination');
    for(let i=1;i<=10;i++) {
      const button = document.createElement('button');
      button.textContent = i;
      button.addEventListener('click', () => {
        this.pageClick(i);
      });
      pagination.appendChild(button);
    }
    pagination.childNodes[0].className = 'picked'
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


    this.generatePage();
    
  }
}

const app = new App();
app.start();