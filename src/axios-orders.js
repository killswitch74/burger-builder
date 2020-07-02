import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-11.firebaseio.com/'
});

export default instance;