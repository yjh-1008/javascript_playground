import FileUploaderBtn from "./components/fileUploaderBtn.js"
import NextBtn from "./components/nextBtn.js";
import PrevBtn from "./components/prevBtn.js";
const fileUploaderBtn = new FileUploaderBtn();
const nextBtn = new NextBtn();
const prevBtn = new PrevBtn();
fileUploaderBtn.setup();
nextBtn.setup();
prevBtn.setup();

window.onload = () => {
  fileUploaderBtn.changeTransform();
}