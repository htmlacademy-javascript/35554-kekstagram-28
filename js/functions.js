//Функция для проверки длины строки
const checkStringLength = function (checkString, maxlength) {
  return checkString.length <= maxlength;
};

checkStringLength('проверяемая строка', 20);


//Функция для проверки, является ли строка палиндромом
const isPalindrome = (word) => {
  let newString = '';
  word = word.toLowerCase().split(' ').join('');

  for (let i = word.length - 1; i >= 0; i--) {
    newString += word[i];
  }
  return word === newString;
};

isPalindrome('Лёша на полке клопа нашёл');


// Функция возвращает целые положительные числа из строки
const isNumbers = (string) => {
  let newArray = '';
  for (let i = 0; i < string.length; i++) {
    if (!isNaN(parseInt(string[i], 10))) {
      newArray += string[i];
    }
  }
  return Number(newArray);
};
isNumbers('2023 год');


// Функция возвращает исходную строку, дополненную указанными символами до заданной длины

const addSymbolsGivenLength = (originString, minLength, symbols) => {

  if (originString.length > minLength) {
    return String(originString);
  } else {
    minLength = minLength - originString.length;
    return symbols.slice(0, minLength % symbols.length) + symbols.repeat(minLength / symbols.length) + String(originString);
  }
};
addSymbolsGivenLength('q', 4, 'we');
