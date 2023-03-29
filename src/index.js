import { PixabayAPI } from './pixabay-api';

const searchFormEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

loadMoreBtn.classList.add('is-hidden');

const pixabayAPI = new PixabayAPI();

function onFormSubmit(e) {
  e.preventDefault();
  galleryEl.innerHTML = '';

  const searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  pixabayAPI.query = searchQuery;

  pixabayAPI.fetchPhotos().then(data => {
    galleryEl.insertAdjacentHTML(createGalleryCard(data.hits));
  });

  function createGalleryCard(hits) {
    const markup = hits
      .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>`;
      })
      .join('');
    galleryEl.insertAdjacentHTML('beforeend', markup);
  }
}

function onLoadMoreBtnClick() {
  pixabayAPI.page += 1;
  pixabayAPI.fetchPhotos().then(data => {
    galleryEl.insertAdjacentHTML(createGalleryCard(data.hits));
  });

  function createGalleryCard(hits) {
    const markup = hits
      .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>`;
      })
      .join('');
    galleryEl.insertAdjacentHTML('beforeend', markup);
  }
}

searchFormEl.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
