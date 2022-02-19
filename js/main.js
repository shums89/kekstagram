// import { posts } from './data.js';
import { renderPosts } from './preview.js';
import './upload-form.js';
import { request } from './network.js';

const onFail = (error) => {
  console.log(error);
};

request(renderPosts, onFail, 'GET');
