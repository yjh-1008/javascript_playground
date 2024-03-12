const express =require('express');
const app = express();
const path = require('path');
//json 파일을 파싱
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "src")));

app.get("/",(reg,res) => {
  res.sendFile(path.join(__dirname, "src/index.html"));
})

app.get("/question",(reg,res) => {
  res.sendFile(path.join(__dirname, "src/component/question.html"));
})

app.get("/result/[1-5]",(reg,res) => {
  res.sendFile(path.join(__dirname, "src/component/result.html"));
})

app.listen(3000,() => {
  console.log("Server running on 3000");
})
