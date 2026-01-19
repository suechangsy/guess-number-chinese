let secretNumber;
let min;
let max;
let guessCount = 0;

const digits = ["零","一","二","三","四","五","六","七","八","九"];
const pinyin = ["líng","yī","èr","sān","sì","wǔ","liù","qī","bā","jiǔ"];

// 数字转换中文 + 拼音
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

// 语音播放函数
function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'zh-CN';
  speechSynthesis.speak(utter);
}

// 实时显示输入数字中文 + 拼音
function updateInputDisplay() {
  const guess = parseInt(document.getElementById("guess").value);
  const display = document.getElementById("input-display");
  if (!isNaN(guess)) {
    display.textContent = numberToChinese(guess);

    // 可选：根据偏大/偏小改变颜色
    if (secretNumber !== undefined) {
      if (guess > secretNumber) display.style.color = "red";
      else if (guess < secretNumber) display.style.color = "blue";
      else display.style.color = "green";
    } else {
      display.style.color = "black";
    }
  } else {
    display.textContent = "";
  }
}

// 开始游戏
function startGame() {
  min = parseInt(document.getElementById("min").value);
  max = parseInt(document.getElementById("max").value);
  guessCount = 0;
  document.getElementById("guess-count").textContent = guessCount;
  document.getElementById("input-display").textContent = "";
  document.getElementById("message").textContent = "";
  document.getElementById("message").style.color = "black";
  document.getElementById("secret-display").textContent = "";

  if (min >= max) {
    alert("最小值必须小于最大值！");
    return;
  }

  secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  document.getElementById("game").classList.remove("hidden");

  document.getElementById("range-info").innerHTML = `
    我想的数字在 ${numberToChinese(min)} 到 ${numberToChinese(max)} 之间
    <button onclick="speak('${min}')">🔊</button> 
    <button onclick="speak('${max}')">🔊</button>
  `;
}

// 检查猜测
function checkGuess() {
  const guess = parseInt(document.getElementById("guess").value);
  const message = document.getElementById("message");
  const display = document.getElementById("secret-display");
  guessCount++;
  document.getElementById("guess-count").textContent = guessCount;

  if (isNaN(guess)) return;

  let feedback = "";
  let color = "";

  if (guess > secretNumber + 1) {
    feedback = "太大了！";
    color = "red";
  } else if (guess === secretNumber + 1) {
    feedback = "有一点大！";
    color = "red";
  } else if (guess < secretNumber - 1) {
    feedback = "太小了！";
    color = "blue";
  } else if (guess === secretNumber - 1) {
    feedback = "有一点小！";
    color = "blue";
  } else {
    feedback = " 猜对了！";
    color = "green";
  }

  message.textContent = feedback;
  message.style.color = color;

  // 点击播放提示词
  message.onclick = () => speak(feedback);

  // 点击播放答案
  if (guess === secretNumber) {
    display.innerHTML = `答案是 ${numberToChinese(secretNumber)} <button onclick="speak('${secretNumber}')">🔊</button>`;
  }

  // 更新输入显示颜色
  updateInputDisplay();
}
