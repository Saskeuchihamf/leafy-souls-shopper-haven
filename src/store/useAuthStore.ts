
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { userApi } from '@/services/api';

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const { data } = await userApi.login({ email, password });
          set({ 
            user: data, 
            isAuthenticated: true,
            loading: false
          });
          localStorage.setItem('token', data.token);
        } catch (error) {
          set({ 
            loading: false, 
            error: error instanceof Error ? error.message : 'Failed to login'
          });
        }
      },
      
      register: async (name, email, password) => {
        set({ loading: true, error: null });
        try {
          const { data } = await userApi.register({ name, email, password });
          set({ 
            user: data, 
            isAuthenticated: true,
            loading: false
          });
          localStorage.setItem('token', data.token);
        } catch (error) {
          set({ 
            loading: false, 
            error: error instanceof Error ? error.message : 'Failed to register'
          });
        }
      },
      
      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, isAuthenticated: false });
      },
      
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

export default useAuthStore;
