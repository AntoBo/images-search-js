import '../sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { notifyOptions } from './notifyOptions.js';
import getPictures from './fetch.js';
import * as Markup from './markup';

Notify.success('hello!', notifyOptions);
//get controls
const formSearch = document.querySelector('#search-form');
const btnLoadMore = document.querySelector('.load-more');
let query = '';
let page = 1;

formSearch.addEventListener('submit', onSearchSubmit);
btnLoadMore.addEventListener('click', onLoadMoreClick);

async function onSearchSubmit(event) {
  event.preventDefault();
  query = formSearch.searchQuery.value;

  //async part
  try {
    const data = await getPictures(query, 1);
    console.log('drawing data: ', data);
    //draw data here
    Markup.newDraw(data);
  } catch (error) {
    console.log('query failed with error: ', error);
  }
}
async function onLoadMoreClick(event) {
  page += 1;
  //toogle button
  event.target.disabled = true;
  event.target.textContent = 'Loading...';

  //async part
  try {
    const data = await getPictures(query, page);
    console.log('appendDraw data: ', data);
    //draw data here
    Markup.appendDraw(data);
    //toogle button
    event.target.disabled = false;
    event.target.textContent = 'Load more!';
  } catch (error) {
    console.log('query failed with error: ', error);
  }
}