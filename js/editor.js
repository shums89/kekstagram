import { isEscEvent } from './util.js';

const body = document.querySelector('body');
const imgUpload = body.querySelector('.img-upload');
const uploadFileInput = imgUpload.querySelector('#upload-file');
const imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');

const openUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
  imgUploadCancel.addEventListener('click', closeUploadForm);
};

const closeUploadForm = () => {
  uploadFileInput.value = '';

  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
  imgUploadCancel.removeEventListener('click', closeUploadForm);
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    if (!document.activeElement.matches('.text__hashtags')) {
      evt.preventDefault();
      closeUploadForm();
    }
  }
};

uploadFileInput.addEventListener('change', () => {
  openUploadForm();
});

openUploadForm();
