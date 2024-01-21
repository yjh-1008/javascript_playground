import aixos from 'axios';
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
    await this.imageLoad();
  }
  async onNext() {
    // if(this.page-1 <0) return;
    this.page+=1;
    await this.imageLoad();
  }

  async imageLoad() {
    const imageLoader = document.querySelector('.image_container');
    const parent = document.querySelector('.parent');
    parent.removeChild(imageLoader);
    const nextImageLoader = document.createElement('div');
    nextImageLoader.className='image_container';
    // imageLoader = documment.createElement('div');
    nextImageLoader.setAttribute("style","width:100%;max-height: 200px;display:flex")
    const {data} = await aixos.get(`https://picsum.photos/v2/list?page=${this.page}&limit=10`);
    data.forEach((v) => {
      const img = document.createElement('img');
      img.src = v.download_url;
      img.className = "list_img"
      img.setAttribute("style","width:100px")
      img.addEventListener('click', () => {
        document.location.href= 'img.src';
      })
      nextImageLoader.appendChild(img);
    });
    console.log(nextImageLoader);
    parent.appendChild(nextImageLoader);
  }

  async start() {
    const parent = document.querySelector('.parent');
    const prevBtn = document.createElement('button');
    parent.setAttribute("style","width:100%;max-height: 200px;display:flex")
    prevBtn.textContent='이전';
    prevBtn.addEventListener('click', () => this.onPrev());
    const nextBtn = document.createElement('button');
    nextBtn.textContent = '댜음';
    nextBtn.addEventListener('click', () => this.onNext());
    await this.imageLoad();
    parent.appendChild(prevBtn);
    parent.appendChild(nextBtn);

  }
}

const app = new App();
app.start();