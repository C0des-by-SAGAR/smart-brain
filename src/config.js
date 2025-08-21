// src/config.js
// Reads API base URL from REACT_APP_API_URL at build time (fallback to localhost for dev)
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';


