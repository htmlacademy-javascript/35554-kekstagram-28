//Функция для проверки длины строки
const checkStringLength = function (checkString, maxlength) {
  return checkString.length <= maxlength;
};

checkStringLength('проверяемая строка', 20);


//Функция для проверки, является ли строка палиндромом
const isPalindrome = function (word) {
  return word.split('').reverse().join('') === word;
};
isPalindrome('keks');
isPalindrome('Лёша на полке клопа нашёл');


// Функция возвращает целые положительные числа из строки
const isNumbers = function (string) {
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

const addSymbolsGivenLength = function (originString, minLength, symbols) {
  // originString = 'q';
  // minLength = 4;
  // symbols = 'we';

  if (originString.length > minLength) {
    return String(originString);
  } else {
    minLength = minLength - originString.length;
    if (minLength > symbols.length) {
      symbols += symbols.repeat(minLength / symbols.length);
    }
    return symbols.slice(0,minLength) + String(originString);
  }
};
addSymbolsGivenLength('1', 2, '0');
