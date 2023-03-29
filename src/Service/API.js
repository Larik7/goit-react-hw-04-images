import axios from "axios";

const KEY = '33216528-23de23ca9469467d8b488f0af';
const URL = 'https://pixabay.com/api/';
const IMAGE_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const SAFESEARCH = 'true';


export const fetchApi = async (inputValue, page = 1) => {
    const response = await axios.get(`${URL}?key=${KEY}&q=${inputValue}&image_type=${IMAGE_TYPE}&orientation=${ORIENTATION}&safesearch=${SAFESEARCH}&page=${page}&per_page=12`);
    return response.data
}