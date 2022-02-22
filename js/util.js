const DEBOUNCE_INTERVAL = 500;

const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};

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

const removeDuplicate = (arr) => [...new Set(arr)];

// Перемешать массив
const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};

const checkingMaxLength = (text, count) => {
  return text.length <= count;
};

// checkingMaxLength('Какая интересная фотка', POSTS_DATA.comment_max_length);

const isEscEvent = (evt) => {
  return evt.key === Keys.ESC || evt.key === Keys.ESCAPE;
};

const debounce = (callback) => {
  let lastTimeout = null;

  return (...args) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(() => {
      callback(...args);
    }, DEBOUNCE_INTERVAL);
  };
};

export { getRandomInt, getRandomElement, getUniqueValue, removeDuplicate, shuffle, checkingMaxLength, isEscEvent, debounce };
