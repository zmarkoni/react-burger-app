import axios from 'axios';

const axiosInstance = axios.create({
   baseURL: 'https://react-my-burger-e5a66.firebaseio.com/'
});
export default axiosInstance;