const Hashtags = {
  MAX_SYMBOLS: 20,
  MAX_COUNT: 5,
};

const validationHashtag = (hashtagText) => {
  if (!hashtagText.length) {
    return;
  }

  let inputArray = hashtagText.toLowerCase().trim().split(/\s+/);

  if (inputArray.length > Hashtags.MAX_COUNT) {
    return `Максимум ${Hashtags.MAX_COUNT} хэш-тегов`;
  }

  let messageError = '';

  inputArray.some((item, index, array) => {
    if (item[0] !== '#') {
      messageError = 'Хэш-тег начинается с символа # (решётка)';
      return;
    }

    if (item === '#') {
      messageError = 'Хеш-тег не может состоять только из одной решётки';
      return;
    }

    if (item.indexOf('#', 1) >= 1) {
      messageError = 'Хэш-теги разделяются пробелами';
      return;
    }

    if (item.length > Hashtags.MAX_SYMBOLS) {
      messageError = `Максимальная длина одного хэш-тега ${Hashtags.MAX_SYMBOLS} символов, включая решетку`;
      return;
    }

    if (array.indexOf(item, index + 1) >= index + 1) {
      messageError = 'Хэш-теги не должны повторяться';
      return;
    }

    if (/[^a-z0-9а-я#]/.test(item)) {
      messageError = 'Строка после решётки должна состоять только из букв и чисел';
      return;
    }
  });

  return messageError;
};

export { validationHashtag };
