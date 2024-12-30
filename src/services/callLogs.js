// callLogs.js
import axios from 'axios';
import {API_BASE_URL} from '@env';
import { getToken } from '../screens/auth/auth'; // Adjust the path to the auth.js file

const CallService = {
  /**
   * Fetch call logs
   * @param {number} offset - Offset for pagination
   * @param {number} limit - Limit for pagination
   * @returns {Promise<any>} - List of call logs
   */
  async getCallLogs(offset = 0, limit = 15) {
    try {
      // Retrieve the token
      const token = await getToken();

      if (!token) {
        throw new Error('No token available');
      }

      // Make the API call
      const response = await axios.get(`${API_BASE_URL}/v1/call`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { offset, limit },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching call logs:', error);
      throw error;
    }
  },
};

export default CallService;
