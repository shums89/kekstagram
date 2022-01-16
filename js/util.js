const getRandomInt = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (max < min) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomElement = (array) => {
  return array[getRandomInt(0, array.length - 1)];
};

const getUniqueValue = (array, min, max) => {
  const id = getRandomInt(min, max);

  if (array.some((item) => item === id)) {
    getUniqueValue(array, min, max);
  }

  return id;
};

const checkingMaxLength = (text, count) => {
  return text.length <= count;
};

// checkingMaxLength('Какая интересная фотка', POSTS_DATA.comment_max_length);

export { getRandomInt, getRandomElement, getUniqueValue, checkingMaxLength };