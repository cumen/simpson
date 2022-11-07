import axios from 'axios';
import constants from '../helpers/constants';

export default {
  getList() {
    return axios.get(`${constants.BASE_API_URL}/simpsons`);
  },
};
