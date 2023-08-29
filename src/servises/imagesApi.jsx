import axios from 'axios';
const BASE_URL = 'http://pixabay.com/api';
const API_KEY = '39014637-350db469d238078cedfe93bb7';

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

// function fetchImages(name) {
//   return fetch(
//     `${BASE_URL}/?q=${name}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//   ).then(res => {
//     if (res.ok) {
//       return res.json();
//     }

//     return Promise.reject(new Error(`NO images with ${name}`));
//   });
// }

// async function fetchImages(name, page) {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//     );
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export default fetchImages;

const fetchData = async (request, page) => {
  const { data } = await axios.get(
    `${BASE_URL}?q=${request}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};

export default fetchData;
