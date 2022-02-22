import { isEscEvent } from './util.js';
import { zoomIn, zoomOut } from './zoom.js';
import { resetEffectImage, createSlider, destroySlider } from './editor.js';
import { validationText } from './validation.js';
import { showSuccessLoad, showErrorLoad } from './modal.js';
import { request } from './network.js';

const body = document.querySelector('body');
const imgUploadForm = body.querySelector('.img-upload__form');
const uploadFileInput = imgUploadForm.querySelector('#upload-file');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');

const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview img');
const imgUploadScale = imgUploadForm.querySelector('.img-upload__scale');
const scaleControlValue = imgUploadScale.querySelector('.scale__control--value');
const scaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');

const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const resetForm = () => {
  scaleControlValue.value = '100%';
  imgUploadPreview.style = '';

  resetEffectImage();
};

const openUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  resetForm();
  createSlider();

  document.addEventListener('keydown', onPopupEscKeydown);
  imgUploadCancel.addEventListener('click', closeUploadForm);
  scaleControlSmaller.addEventListener('click', zoomIn);
  scaleControlBigger.addEventListener('click', zoomOut);
  textHashtags.addEventListener('input', onHashtagsInput);
  textDescription.addEventListener('input', onDescriptionInput);
};

const closeUploadForm = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFileInput.value = '';
  destroySlider();

  document.removeEventListener('keydown', onPopupEscKeydown);
  imgUploadCancel.removeEventListener('click', closeUploadForm);
  scaleControlSmaller.removeEventListener('click', zoomIn);
  scaleControlBigger.removeEventListener('click', zoomOut);
  textHashtags.removeEventListener('input', onHashtagsInput);
  textDescription.removeEventListener('input', onDescriptionInput);
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();

    if (!document.activeElement.matches('.text__hashtags') && !document.activeElement.matches('.text__description')) {
      closeUploadForm();
    }
  }
};

const onHashtagsInput = () => validationText(textHashtags, 'hashtag');
const onDescriptionInput = () => validationText(textDescription, 'description');

const onSuccess = () => {
  closeUploadForm();
  showSuccessLoad();
};

uploadFileInput.addEventListener('change', openUploadForm);

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  request(onSuccess, showErrorLoad, 'POST', new FormData(evt.target));
});
