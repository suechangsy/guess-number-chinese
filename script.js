let secretNumber;
let min;
let max;

const digits = ["零","一","二","三","四","五","六","七","八","九"];
const pinyin = ["líng","yī","èr","sān","sì","wǔ","liù","qī","bā","jiǔ"];

function numberToChinese(num) {
  if (num < 10) return `${digits[num]} [${pinyin[num]}]`;
  let ten = Math.floor(num / 10);
  let one = num % 10;
  let str = "";
  if (ten === 1) str = "十";
  else str = digits[ten] + "十";
  if (one !== 0) str += digits[one];
  let strPinyin = (ten === 1 ? "shí" : pinyin[ten] + " shí") + (one === 0 ? "" : " " + pinyin[one]);
  return `${str} [${strPinyin}]`;
}

function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'zh-CN';
  speechSynthesis.speak(utter);
}

function startGame() {
  min = parseInt(document.getElementById("min").value);
  max = parseInt(document.getElementById("max").value);

  if (min >= max) {
    alert("最小值必须小于最大值！");
    return;
  }

  secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  document.getElementById("game").classList.remove("hidden");
  document.getElementById("message").textContent = "";
  document.getElementById("secret-display").textContent = "";
  document.getElementById("guess").value = "";

  document.getElementById("range-info").innerHTML = `
    我想的数字在 ${numberToChinese(min)} 到 ${numberToChinese(max)} 之间
    <button onclick="speak('${min}')">🔊</button> 
    <button onclick="speak('${max}')">🔊</button>
  `;
}

function checkGuess() {
  const guess = parseInt(document.getElementById("guess").value);
  const message = document.getElementById("message");
  const display = document.getElementById("secret-display");

  if (guess > secretNumber) {
    message.textContent = "太大了！";
  } else if (guess < secretNumber) {
    message.textContent = "太小了！";
  } else {
    message.textContent = "🎉 猜对了！";
    display.innerHTML = `答案是 ${numberToChinese(secretNumber)} <button onclick="speak('${secretNumber}')">🔊</button>`;
  }
}
