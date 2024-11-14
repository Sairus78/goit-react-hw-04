import axios from 'axios';
const KEY = 'ytKzikcJXuflZrKrGDcLxVvtfielh4TOrMshxushgXA';
const BASE_URL = 'https://api.unsplash.com/search/photos/';

export function search(element = 'cat', page = 1) {
  const url = `${BASE_URL}?client_id=${KEY}&orientation=landscape&query=${element}&page=${page}&per_page=12`;
  return axios.get(url);
}
