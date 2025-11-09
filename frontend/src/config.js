// Configuration for API URL
const getApiUrl = () => {
  // Priority 1: Environment variable from build time
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Priority 2: Check if running on localhost
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:3001';
  }
  
  // Priority 3: Production - UPDATE THIS with your Render backend URL
  return 'https://querychain-backend.onrender.com';
};

const config = {
  API_URL: getApiUrl()
};

export default config;
