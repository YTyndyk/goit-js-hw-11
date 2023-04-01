import axios from 'axios';

export class PixabayAPI {
  #API_KEY = '34817162-971eedaf32c7e25faa7cfc9b5';
  #BASE_URL = 'https://pixabay.com/api/';

  query = '';
  page = 1;

  fetchPhotos() {
    return axios.get(`${this.#BASE_URL}`, {
      params: {
        page: this.page,
        q: this.query,
        per_page: 40,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        key: this.#API_KEY,
      },
    });
  }
  resetPage() {
    this.page = 1;
  }
}
