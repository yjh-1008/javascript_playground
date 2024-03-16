const resultWrap = document.querySelector('#app');
const url = window.location.href;
const urlSplit = url.split("/");
const developerPk = parseInt(urlSplit[urlSplit.length-1]);

function getData() {
  const loadingContainer = document.querySelector('.loading');
  const resultContainer = document.querySelector('.result');

  fetch("../../data/result.json")
  .then((response) => response.json())
  .then((data) => {
    // loadingContainer.style.display = "none";
    // resultContainer.style.display = "block";
    const developerData = data[developerPk - 1];
    // console.log(data);
    setElement(developerData);
  })
}

getData();

function setElement(data) {
  const tempContainer = document.createElement('ul');
  tempContainer.classList.add('character-info')

  for(let feature of data.features) {
    const li = document.createElement('li');
    li.innerHTML=`${feature}`
    tempContainer.appendChild(li);
  }
  console.log(tempContainer.innerHTML);
  resultWrap.innerHTML = 
  `
  <article class="result">
    <div class="type-comment">${data.title}</div>
    <div class="type">${data.name}</div>
    <img class="character" src="${data.img}" />
    <div class="character-title">나와 맞는 개발 유형은 ${data.name}?!</div>
    <ul class="character-info">
      ${tempContainer.innerHTML}
    </ul>
    <button class="gameBtn" onclick="location.href='/'">
      테스트 다시하기
    </button>
    </article>
  `
  tempContainer.remove();
}