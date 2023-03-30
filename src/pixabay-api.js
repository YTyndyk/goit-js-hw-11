export class PixabayAPI {
  // #API_KEY = '34817162-971eedaf32c7e25faa7cfc9b5';
  // #BASE_URL = 'https://pixabay.com/api/';

  query = '';
  page = 1;

  fetchPhotos() {
    const searchParams = new URLSearchParams({
      page: this.page,
      q: this.query,
      per_page: 40,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });

    return fetch(
      `https://pixabay.com/api/?key=34817162-971eedaf32c7e25faa7cfc9b5&${searchParams}`
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
}
