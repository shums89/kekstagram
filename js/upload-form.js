import { isEscEvent } from './util.js';
import { zoomIn, zoomOut } from './editor.js';

const body = document.querySelector('body');
const imgUpload = body.querySelector('.img-upload');
const uploadFileInput = imgUpload.querySelector('#upload-file');
const imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');

const imgUploadPreview = document.querySelector('.img-upload__preview');
const imgUploadScale = document.querySelector('.img-upload__scale');
const scaleControlValue = imgUploadScale.querySelector('.scale__control--value');
const scaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');

const resetForm = () => {
  uploadFileInput.value = '';

  scaleControlValue.value = '100%';
  imgUploadPreview.style = 'transform: scale(1)';
};

const openUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  resetForm();

  document.addEventListener('keydown', onPopupEscKeydown);
  imgUploadCancel.addEventListener('click', closeUploadForm);
  scaleControlSmaller.addEventListener('click', zoomIn);
  scaleControlBigger.addEventListener('click', zoomOut);
};

const closeUploadForm = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
  imgUploadCancel.removeEventListener('click', closeUploadForm);
  scaleControlSmaller.removeEventListener('click', zoomIn);
  scaleControlBigger.removeEventListener('click', zoomOut);
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    if (!document.activeElement.matches('.text__hashtags')) {
      evt.preventDefault();
      closeUploadForm();
    }
  }
};

uploadFileInput.addEventListener('change', openUploadForm);

// openUploadForm();
