import { getRandomInt, getRandomElement, getUniqueValue } from './util.js';

const POSTS_DATA = {
  count_posts: 25,
  count_random_posts: 10,
  names: ['Иван', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  comments: [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ],
  count_likes: {
    min: 15,
    max: 200,
  },
  count_comments: {
    min: 0,
    max: 10,
  },
  count_avatar: 6,
  comment_max_length: 140,
};

let posts;
const arrayIds = [];  // массив идентификаторов комментарий

// генерация комментариев
const createComment = () => {
  const comments = [];
  let commentId;

  for (let i = 0; i < getRandomInt(POSTS_DATA.count_comments.min, POSTS_DATA.count_comments.max); i++) {
    commentId = getUniqueValue(arrayIds, 1, 999);
    arrayIds.push(commentId);

    let messages = new Array(2)                                         // объявляем массив
      .fill(null)                                                       // присваиваем null всум элементам
      .map(() => getRandomElement(POSTS_DATA.comments))                 // заполняем случайными значениями
      .filter((_, index) => index ? getRandomInt(0, 1) : 1)             // оставляем первый элемент (чтоб не был пустым), остальные выводим рандомно
      .reduce((result, item) => {                                       // удаляем дубликаты
        return result.includes(item) ? result : [...result, item];
      }, [])
      .join(' ');                                                       // склеиваем в строку

    comments.push({
      id: commentId,
      avatar: `img/avatar-${getRandomInt(1, POSTS_DATA.count_avatar)}.svg`,
      message: messages.substr(0, POSTS_DATA.comment_max_length),
      name: getRandomElement(POSTS_DATA.names),
    });
  }

  return comments;
};

// генерация постов
const createPosts = () => {
  posts = new Array(POSTS_DATA.count_posts)
    .fill(null)
    .map((item, index) => {
      return {
        id: index + 1,
        url: `photos/${index + 1}.jpg`,
        description: `Описание #${index + 1}`,
        likes: getRandomInt(15, 200),
        comments: createComment(),
      };
    });
};

export { POSTS_DATA, createPosts, posts };
