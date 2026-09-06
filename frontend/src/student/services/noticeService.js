import api from '../../services/api';
import { mockNoticesData } from '../mock/mockNotices';

export const noticeService = {
  async getNotices() {
    return Promise.resolve(mockNoticesData);
  }
};
