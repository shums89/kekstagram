const Hashtags = {
  MAX_SYMBOLS: 20,
  MAX_COUNT: 5,
};

const validationHashtag = (hashtagText) => {
  if (!hashtagText.length) {
    return;
  }

  let inputArray = hashtagText.toLowerCase().trim().split(/\s+/);

  const isStartNotHashtag = inputArray.some((item) => {
    return item[0] !== '#';
  });
  if (isStartNotHashtag) {
    return 'Хэш-тег начинается с символа # (решётка)';
  }

  const isOnlyLatticeHashtag = inputArray.some((item) => {
    return item === '#';
  });
  if (isOnlyLatticeHashtag) {
    return 'Хеш-тег не может состоять только из одной решётки';
  }

  const isSplitSpaceHashtag = inputArray.some((item) => {
    return item.indexOf('#', 1) >= 1;
  });
  if (isSplitSpaceHashtag) {
    return 'Хэш-теги разделяются пробелами';
  }

  const isLongHashtag = inputArray.some((item) => {
    return item.length > Hashtags.MAX_SYMBOLS;
  });
  if (isLongHashtag) {
    return `Максимальная длина одного хэш-тега ${Hashtags.MAX_SYMBOLS} символов, включая решетку`;
  }

  if (inputArray.length > Hashtags.MAX_COUNT) {
    return `Максимум ${Hashtags.MAX_COUNT} хэш-тегов`;
  }

  const isRepeatingHashtag = inputArray.some((item, i, arr) => {
    return arr.indexOf(item, i + 1) >= i + 1;
  });
  if (isRepeatingHashtag) {
    return 'Хэш-теги не должны повторяться';
  }

  const isNotOnlyLetAndNum = inputArray.some((item) => {
    let regex = /[^a-z0-9а-я#]/;
    return regex.test(item);
  });
  if (isNotOnlyLetAndNum) {
    return 'Строка после решётки должна состоять только из букв и чисел';
  }

  return;
};

export { validationHashtag };
