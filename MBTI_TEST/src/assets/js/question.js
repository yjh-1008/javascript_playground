

// import * from '../datas/data.json'
(() => {

  fetch("../../data/data.json").then((res) => 
    // console.log
    res.json()
  ).then(data => {
    const form = document.querySelector('.test-content');
    const questions = data.questions;
    const answers = data.answers;

    questions.forEach((question) => {
      let questionNumber = question.pk;
      let answerArr = [];
      answers.forEach((answer) => {
        if(questionNumber == answer.question) {
          answerArr.push(answer);
        }
      })
      form.appendChild(setElement(question, answerArr));
    })
    const questionItem = document.querySelectorAll('.question-wrapper');
    const firstQuestionItem = questionItem[0];
    firstQuestionItem.classList.add("on");

    const buttonBoxes = document.querySelectorAll('.button-box');
    const firstButtonBox = buttonBoxes[0];
    const lastButtonBox = buttonBoxes[buttonBoxes.length-1];
    firstButtonBox.innerHTML = 
    `
      <button>다음</button>
    `
    firstButtonBox.classList.add('style-center');

    lastButtonBox.innerHTML = `
    <button>이전</button>
    <button>제출</button>
    `

  })
})();

function setElement(question, answerArr) {
  const questionItem = document.createElement('div');
  questionItem.classList.add("question-wrapper")
  const tempContainer = document.createElement('div');
  tempContainer.classList.add('question-list')
  for(let idx in answerArr) {
    let answer = answerArr[idx];
    tempContainer.innerHTML +=`
    <label>
      <input type="radio" name="question-${question.pk}" value="${question.developer}" />
      <span>${Number(idx)+1}. ${answer.content}</span>
    </label>
    `
  }

  questionItem.innerHTML=`
  <article class="test-content">
  <div class="progress-bar">
    <div class="page">${question.pk}/10</div>
    <progress id="progress" min="1" max="10" value="1"></progress>
  </div>

   <div class="question-box">
      <div class="question">
      Q. ${question.content}
      </div>
      <div class="question-list">
        ${tempContainer.innerHTML}
     </div>
     <div class="button-box">
       <button>이전</button>
        <button>다음</button>
      </div>
    </div>
  </article>
  `
  tempContainer.remove();
  return questionItem;
}