// import iconEmptyStar from
const starImageSourceMap = {
  empty: '../../assets/icon_empty_star.png',
  half:  '../../assets/icon_half_star.png',
  full:  '../../assets/icon_star.png',
}

class StartPoint{
  constructor() {
    this.contentStar = document.querySelector('.content-star');
    this.starBackgroundElement = this.contentStar.querySelector('.star-background');
    this.starImages = this.starBackgroundElement.querySelectorAll('img');
    this.starPointResetButton = this.contentStar.querySelector('.icon-remove-star');
    this.lockedStarPoint = false;
  }

  setup() {
    this.bindEvent();
  }

  unLockedStarPoint() {
    this.lockedStarPoint=false;
  }

  lockStarPoint() {
    this.lockedStarPoint = true;
  }
  getLockedStarPoint() {
    return this.lockedStarPoint;
  }

  bindEvent() {
     if(this.getLockedStarPoint()) {
        return;
      }

    //마우스 이벤트
    this.starBackgroundElement.addEventListener('mousemove', (e) => {
      const {target, offsetX: currentUserPoint} = e;
      
      //별점이 고정되어 있다면 이벤트 중지
      if(this.getLockedStarPoint()) {
        return;
      }
      const {point} = target.dataset;
      const starPointIndex = parseInt(point,10)-1;
      const [starImageClientRect] = target.getClientRects();
      const starImageWidth = starImageClientRect.width;
      const isOverHalf = starImageWidth/2 < currentUserPoint;

      this.renderStarPointImages({drawableLimitIndex : starPointIndex, isOverHalf});

    })
    //마우스 클릭시 고정.
    this.starBackgroundElement.addEventListener("click", (e) => {
      this.lockStarPoint();
    });

    this.starBackgroundElement.addEventListener("mouseout",(e) => {
      this.resetStarPointImages();
    })

    this.starPointResetButton.addEventListener('click',(e) => {
      this.unLockedStarPoint();
      this.resetStarPointImages();
    })
  }

  resetStarPointImages() {
    if(!this.getLockedStarPoint()) {
      this.renderStarPointImages();
    }

  }

  renderStarPointImages(payload = {}) {
    const {drawableLimitIndex=-1, isOverHalf = false} = payload;
    Array.prototype.forEach.call(this.starImages, (starImage, index) => {
      
      let imageSource = index < drawableLimitIndex ? starImageSourceMap.full : starImageSourceMap.empty;
      if(index === drawableLimitIndex) {
        imageSource = isOverHalf ?starImageSourceMap.full : starImageSourceMap.half;
      }
      starImage.src = imageSource;
    })
  }
}

export default StartPoint