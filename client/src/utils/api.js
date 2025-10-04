import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
})

// Request interceptor for adding auth tokens or other headers
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle common error scenarios
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken')
      // Redirect to login if needed
    } else if (error.response?.status >= 500) {
      // Handle server errors
      console.error('Server error:', error.response.data)
    }
    return Promise.reject(error)
  }
)

// API helper functions
export const apiHelpers = {
  // Contact form submission
  submitContactForm: async (formData) => {
    try {
      const response = await api.post('/contact', formData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to submit contact form')
    }
  },

  // Get FAQ data
  getFAQs: async () => {
    try {
      const response = await api.get('/faq')
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch FAQs')
    }
  },

  // Dashboard data (placeholder for future implementation)
  getDashboardData: async () => {
    try {
      const response = await api.get('/dashboard')
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch dashboard data')
    }
  },

  // STL model data (placeholder for future implementation)
  getSTLModels: async () => {
    try {
      const response = await api.get('/stl-models')
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch STL models')
    }
  }
}

// Error handling utilities
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data?.message || 'An error occurred',
      status: error.response.status,
      data: error.response.data
    }
  } else if (error.request) {
    // Request was made but no response received
    return {
      message: 'Network error - please check your connection',
      status: 0,
      data: null
    }
  } else {
    // Something else happened
    return {
      message: error.message || 'An unexpected error occurred',
      status: -1,
      data: null
    }
  }
}

export default api
