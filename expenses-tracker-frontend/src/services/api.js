const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Get user ID from localStorage (set during login)
const getUserId = () => {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user).userId;
  }
  return null;
};

const getHeaders = () => {
  const userId = getUserId();
  return {
    'Content-Type': 'application/json',
    'userId': userId || '',
  };
};

// Auth API
export const authAPI = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.success) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data));
    }
    return data;
  },

  register: async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    return response.json();
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// Accounts API
export const accountsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/accounts`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/accounts/${id}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return response.json();
  },

  create: async (accountData) => {
    const response = await fetch(`${API_BASE_URL}/accounts`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        accountName: accountData.accountName || '',
        accountType: (accountData.accountType || 'cash').toUpperCase(),
        balance: parseFloat(accountData.balance) || 0,
      }),
    });
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/accounts/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return response.json();
  },
};

// Helper function to normalize category data from backend
const normalizeCategory = (category) => {
  return {
    ...category,
    classification: category.classification ? category.classification.toLowerCase() : 'want',
    categoryType: category.categoryType ? category.categoryType.toLowerCase() : 'expense',
  };
};

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const data = await response.json();
    if (data.success && Array.isArray(data.data)) {
      return {
        ...data,
        data: data.data.map(normalizeCategory),
      };
    }
    return data;
  },

  create: async (categoryData) => {
    // Map frontend property names to backend property names
    const backendData = {
      categoryName: categoryData.name,
      categoryType: (categoryData.type || 'EXPENSE').toUpperCase(),
      classification: (categoryData.classification || 'want').toUpperCase(),
    };

    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(backendData),
    });
    const data = await response.json();
    if (data.success && data.data) {
      return {
        ...data,
        data: normalizeCategory(data.data),
      };
    }
    return data;
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return response.json();
  },
};

// Helper function to normalize transaction data from backend
const normalizeTransaction = (transaction) => {
  return {
    ...transaction,
    transactionType: transaction.transactionType ? transaction.transactionType.toLowerCase() : 'expense',
  };
};

// Transactions API
export const transactionsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const data = await response.json();
    if (data.success && Array.isArray(data.data)) {
      return {
        ...data,
        data: data.data.map(normalizeTransaction),
      };
    }
    return data;
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const data = await response.json();
    if (data.success && data.data) {
      return {
        ...data,
        data: normalizeTransaction(data.data),
      };
    }
    return data;
  },

  create: async (transactionData) => {
    // Convert frontend format to backend format
    const backendData = {
      accountId: parseInt(transactionData.accountId) || null,
      categoryId: parseInt(transactionData.categoryId) || null,
      amount: parseFloat(transactionData.amount) || 0,
      description: transactionData.description || '',
      transactionDate: transactionData.transactionDate || new Date().toISOString().split('T')[0],
      transactionType: 'EXPENSE',  // Default to EXPENSE - all transactions from form are expenses
    };

    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(backendData),
    });
    const data = await response.json();
    if (data.success && data.data) {
      return {
        ...data,
        data: normalizeTransaction(data.data),
      };
    }
    return data;
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return response.json();
  },
};

// Budgets API
export const budgetsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/budgets`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/budgets/${id}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return response.json();
  },

  create: async (budgetData) => {
    const response = await fetch(`${API_BASE_URL}/budgets`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        categoryId: parseInt(budgetData.categoryId) || null,
        amountLimit: parseFloat(budgetData.amountLimit) || 0,
        startDate: budgetData.startDate || new Date().toISOString().split('T')[0],
        endDate: budgetData.endDate || new Date().toISOString().split('T')[0],
      }),
    });
    return response.json();
  },

  update: async (id, budgetData) => {
    const response = await fetch(`${API_BASE_URL}/budgets/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(budgetData),
    });
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/budgets/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return response.json();
  },
};

// Utility function to extract data from API response
export const getDataFromResponse = (response) => {
  if (response.success) {
    return response.data;
  }
  throw new Error(response.message || 'API Error');
};
