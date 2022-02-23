const MODAL_SHOW_TIME = 3000;

const receiveErrorTemplate = document.querySelector('#error-receive').content.querySelector('.error');
const loadSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const loadErrorTemplate = document.querySelector('#error').content.querySelector('.error');

const createModalFragment = (template, message) => {
  const modalFragment = document.createDocumentFragment();

  const modalBlock = template.cloneNode(true);
  modalBlock.classList.add('modal-show-active');
  if (message) {
    modalBlock.querySelector('.error__title').textContent = message;
  }

  modalFragment.appendChild(modalBlock);

  return modalFragment;
};

const removeModal = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      document.querySelector('.modal-show-active').remove();
      resolve();
    }, MODAL_SHOW_TIME);
  });
};

const showErrorReceive = (message) => {
  document.body.append(createModalFragment(receiveErrorTemplate, message));
  return removeModal();
};

const showSuccessLoad = () => {
  document.body.append(createModalFragment(loadSuccessTemplate));
  removeModal();
};

const showErrorLoad = (message) => {
  document.body.append(createModalFragment(loadErrorTemplate, message));
  removeModal();
};

export { showErrorReceive, showSuccessLoad, showErrorLoad };
