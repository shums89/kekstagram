import { renderPosts } from './preview.js';
import './upload-form.js';
import { request } from './network.js';
import { showErrorReceive } from './modal.js';

request(renderPosts, showErrorReceive, 'GET');
