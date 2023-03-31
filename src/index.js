import './sass/_example.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PixabayAPI } from './pixabay-api';
import { lightbox } from './lightbox';

const searchFormEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

loadMoreBtn.classList.add('is-hidden');

let isShown = 0;
const pixabayAPI = new PixabayAPI();

function onFormSubmit(e) {
  e.preventDefault();
  galleryEl.innerHTML = '';

  const searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  pixabayAPI.query = searchQuery;
  if (searchQuery === '') {
    Notify.warning('Please, fill the main field');
    return;
  }

  isShown = 0;

  pixabayAPI.fetchPhotos().then(({ data }) => {
    console.log(data);
    galleryEl.insertAdjacentHTML('beforeend', createGalleryCard(data.hits));
    loadMoreBtn.classList.remove('is-hidden');
    lightbox.refresh();

    if (!data.hits.length) {
      Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMoreBtn.classList.add('is-hidden');
      return;
    }
    isShown += data.hits.length;

    if (isShown < data.total) {
      Notify.success(`Hooray! We found ${data.total} images !!!`);
      loadMoreBtn.classList.remove('is-hidden');
    }

    if (isShown >= data.total) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      loadMoreBtn.classList.add('is-hidden');
    }
  });
}

function createGalleryCard(hits) {
  return hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
    <a href="${largeImageURL}">
      <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${downloads}
      </p>
    </div>
    </div>`;
      }
    )
    .join('');
}

function onLoadMoreBtnClick() {
  pixabayAPI.page += 1;
  pixabayAPI.fetchPhotos().then(({ data }) => {
    galleryEl.insertAdjacentHTML('beforeend', createGalleryCard(data.hits));
    lightbox.refresh();
  });
}

searchFormEl.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
