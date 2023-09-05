
const display = document.getElementById('display');
let s = [];

function updateDisplay(value) {
  const specialValuesToHide = ['AC', 'DEL', '=', 'Enter'];
  if (!specialValuesToHide.includes(value)) {
    s.push(value);
    if (value === '%') {
      display.value += '/100';
    } else {
      display.value += value;
    }
  }
}

const buttons = document.querySelectorAll('.button2');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    updateDisplay(button.textContent);
  });
});

const buttonk = document.querySelectorAll('.button1');
buttonk.forEach(button => {
  button.addEventListener('click', () => {
    updateDisplay(button.textContent);
  });
});

document.querySelector('.button1.sp').addEventListener('click', () => {
  display.value = '';
  s = [];
});

document.querySelector('.button1.sp2').addEventListener('click', () => {
  s.pop();
  display.value = display.value.slice(0, -1);
});


document.querySelector('.button2.sp').addEventListener('click', () => {
  try {
    let result = eval(display.value);
    if (Number.isFinite(result)) {
      result = result.toFixed(10); // Adjust the number of decimal places as needed
      display.value = result;
      s = [result];
    } else {
      display.value = 'Error';
      s = [];
    }
  } catch (error) {
    display.value = 'Error';
    s = [];
  }
});

document.addEventListener('keydown', event => {
  const key = event.key;

  if (/[0-9/*\-+%.]/.test(key)) {
    event.preventDefault();
    updateDisplay(key);
  } else if (key === 'Enter' || key === '=') {
    event.preventDefault();
    try {
      let result = eval(display.value);
      if (Number.isFinite(result)) {
        result = result.toFixed(10); // Adjust the number of decimal places as needed
        display.value = result;
        s = [result];
      } else {
        display.value = 'Error';
        s = [];
      }
    } catch (error) {
      display.value = 'Error';
      s = [];
    }
  } else if (key === 'Backspace') {
    event.preventDefault();
    s.pop();
    display.value = display.value.slice(0, -1);
  }
});