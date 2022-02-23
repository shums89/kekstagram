const DEBOUNCE_INTERVAL = 500;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

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

// words = [1, 2, 5] => [один символ, два символа, пять символов]
const getWordEnding = (number, words) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

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

const getPhotoSrc = (fileChooser) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  return new Promise((resolve, reject) => {
    if (FILE_TYPES.some((it) => fileName.endsWith(it))) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.addEventListener('load', () => resolve(reader.result), { once: true });
    } else {
      reject('Неверный формат файла');
    }
  });
};

export { getRandomInt, getRandomElement, getUniqueValue, removeDuplicate, shuffle, getWordEnding, isEscEvent, debounce, getPhotoSrc };
