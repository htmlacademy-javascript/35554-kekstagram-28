const MAX_ID_PHOTO = 25;
const SIMILAR_COMMENT_COUNT = 3;

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const names = [
  'Михаил',
  'Полина',
  'Дарья',
  'Валентина',
  'Максим',
  'Кирилл',
  'Екатерина',
  'Арина',
  'Анастасия',
  'Тимур',
];

const createIdGenerator = (max) => {
  let lastGenerateId = 1;
  return () => {
    if (max < lastGenerateId) {
      lastGenerateId = 1;
    }
    return lastGenerateId++;
  };
};

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomId = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

// Для формирования текста комментария — message — вам необходимо взять одно или два случайных
// предложения из представленных ниже:

const randomId = createIdGenerator(MAX_ID_PHOTO);
const randomIdPhoto = createIdGenerator(MAX_ID_PHOTO);
const randomIdComment = createRandomId(1, 1000);

const createCommentPhoto = () => ({
  id: randomIdComment(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(messages),
  name: getRandomArrayElement(names),
});

const createDescriptionPublishedPhoto = () => ({
  id: randomId(),
  url: `photos/${randomIdPhoto()}.jpg`,
  description: 'Описание фотографии',
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: SIMILAR_COMMENT_COUNT}, createCommentPhoto),
});

console.log(createDescriptionPublishedPhoto());
console.log(createDescriptionPublishedPhoto());
console.log(createDescriptionPublishedPhoto());
console.log(createDescriptionPublishedPhoto());
console.log(createDescriptionPublishedPhoto());
console.log(createDescriptionPublishedPhoto());
console.log(createDescriptionPublishedPhoto());
console.log(createDescriptionPublishedPhoto());
console.log(createDescriptionPublishedPhoto());
console.log(createDescriptionPublishedPhoto());
console.log(createDescriptionPublishedPhoto());
console.log(createDescriptionPublishedPhoto());
console.log(createDescriptionPublishedPhoto());
console.log(createDescriptionPublishedPhoto());
console.log(createDescriptionPublishedPhoto());
console.log(createDescriptionPublishedPhoto());
console.log(createDescriptionPublishedPhoto());
console.log(createDescriptionPublishedPhoto());
console.log(createDescriptionPublishedPhoto());
console.log(createDescriptionPublishedPhoto());
console.log(createDescriptionPublishedPhoto());
console.log(createDescriptionPublishedPhoto());
console.log(createDescriptionPublishedPhoto());
console.log(createDescriptionPublishedPhoto());
console.log(createDescriptionPublishedPhoto());
console.log(createDescriptionPublishedPhoto());
