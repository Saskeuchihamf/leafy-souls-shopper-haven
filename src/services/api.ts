
import axios from 'axios';

// Define the base URL for API requests
const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Products API
export const productApi = {
  getAll: (params?: any) => api.get('/products', { params }),
  getById: (id: string) => api.get(`/products/${id}`),
  create: (product: any) => api.post('/products', product),
  update: (id: string, product: any) => api.put(`/products/${id}`, product),
  delete: (id: string) => api.delete(`/products/${id}`),
};

// User API
export const userApi = {
  register: (userData: any) => api.post('/users/register', userData),
  login: (credentials: any) => api.post('/users/login', credentials),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData: any) => api.put('/users/profile', userData),
  getWishlist: () => api.get('/users/wishlist'),
  addToWishlist: (productId: string) => api.post(`/users/wishlist/${productId}`),
  removeFromWishlist: (productId: string) => api.delete(`/users/wishlist/${productId}`),
};

// Cart API
export const cartApi = {
  getCart: () => api.get('/cart'),
  addToCart: (cartItem: any) => api.post('/cart/add', cartItem),
  updateQuantity: (itemId: string, quantity: number) => 
    api.put(`/cart/update/${itemId}`, { quantity }),
  removeItem: (itemId: string) => api.delete(`/cart/remove/${itemId}`),
  clearCart: () => api.delete('/cart/clear'),
};

// Order API
export const orderApi = {
  create: (orderData: any) => api.post('/orders', orderData),
  getById: (id: string) => api.get(`/orders/${id}`),
  getMyOrders: () => api.get('/orders'),
  updateToPaid: (id: string, paymentResult: any) => 
    api.put(`/orders/${id}/pay`, paymentResult),
};

export default api;
