const API_BASE_URL = 'http://localhost:8080/api';

// Get JWT token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

const getUserId = () => {
  const userId = localStorage.getItem('userId');
  return userId ? userId : null;
};

// API call helper with authentication
const apiCall = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const userId = getUserId();
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...(userId && { 'userId': userId }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('token');
        window.location.href = '/';
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Auth APIs

export const authAPI = {
  login: async (email, password) => {
    let response;
    try {
      response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
    } catch (err) {
      console.error('Login fetch error:', err);
      throw new Error(`Unable to reach the backend at ${API_BASE_URL}. Check the backend is running and CORS is configured.`);
    }

    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Login failed');
    }

    // data.data contains UserResponse {userId, name, email, token, createdAt}
    const user = data.data;
    if (user && user.token) {
      localStorage.setItem('token', user.token);
      localStorage.setItem('userId', user.userId);
      localStorage.setItem('userName', user.name);
    }
    return user;
  },

  register: async (name, email, password) => {
    let response;
    try {
      response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
    } catch (err) {
      console.error('Register fetch error:', err);
      throw new Error(`Unable to reach the backend at ${API_BASE_URL}. Check the backend is running and CORS is configured.`);
    }

    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Registration failed');
    }
    return data.data; // user response
  },

  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  },

  isAuthenticated: () => {
    return !!getAuthToken();
  }
};

// Expenses APIs
export const expensesAPI = {
  getAll: () => apiCall('/expenses'),
  
  getById: (id) => apiCall(`/expenses/${id}`),
  
  create: (expense) => apiCall('/expenses', {
    method: 'POST',
    body: JSON.stringify(expense),
  }),
  
  update: (id, expense) => apiCall(`/expenses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(expense),
  }),
  
  delete: (id) => apiCall(`/expenses/${id}`, {
    method: 'DELETE',
  }),
  
  getByDateRange: (startDate, endDate) => 
    apiCall(`/expenses/date-range?start=${startDate}&end=${endDate}`),
};

// Categories APIs (if you have them)
export const categoriesAPI = {
  getAll: () => apiCall('/categories'),
  
  create: (category) => apiCall('/categories', {
    method: 'POST',
    body: JSON.stringify(category),
  }),
};

// Analytics APIs (if you have them)
export const analyticsAPI = {
  getSummary: () => apiCall('/analytics/summary'),
  
  getByCategory: () => apiCall('/analytics/by-category'),
};