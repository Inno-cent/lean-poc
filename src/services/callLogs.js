import axios from 'axios';

// Base URL of your server
const API_BASE_URL = 'http://localhost:8000/call/v1'; 

// API Service
const ApiService = {
  /**
   * Fetch call logs
   * @param {string} token - Bearer token for authentication
   * @param {number} offset - Offset for pagination
   * @param {number} limit - Limit for pagination
   * @returns {Promise<any>} - List of call logs
   */
  async getCallLogs(token, offset = 0, limit = 15) {
    try {
      const response = await axios.get(API_BASE_URL, {
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

export default ApiService;
