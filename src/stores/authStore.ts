import { create } from 'zustand';
import { 
  auth, 
  googleProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from '../lib/firebase';
import { 
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  AuthError
} from 'firebase/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  quickSignUp: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkRedirectResult: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  signInWithGoogle: async () => {
    try {
      set({ loading: true, error: null });
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      set({ 
        error: (error as AuthError).message,
        loading: false,
        user: null
      });
    }
  },
  signInWithEmail: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const result = await signInWithEmailAndPassword(auth, email, password);
      set({ user: result.user, loading: false, error: null });
    } catch (error) {
      set({ 
        error: (error as AuthError).message,
        loading: false,
        user: null
      });
    }
  },
  quickSignUp: async (email: string) => {
    try {
      set({ loading: true, error: null });
      // Generate a random password (12 characters)
      const password = Math.random().toString(36).slice(-12);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      set({ user: result.user, loading: false, error: null });
    } catch (error) {
      set({ 
        error: (error as AuthError).message,
        loading: false,
        user: null
      });
    }
  },
  signOut: async () => {
    try {
      set({ loading: true, error: null });
      await firebaseSignOut(auth);
      set({ user: null, loading: false, error: null });
    } catch (error) {
      set({ 
        error: (error as AuthError).message,
        loading: false 
      });
    }
  },
  checkRedirectResult: async () => {
    try {
      const result = await getRedirectResult(auth);
      if (result) {
        set({ user: result.user, loading: false, error: null });
      } else {
        set({ loading: false });
      }
    } catch (error) {
      set({ 
        error: (error as AuthError).message,
        loading: false,
        user: null
      });
    }
  },
  clearError: () => set({ error: null })
}));

// Initialize auth state immediately
auth.onAuthStateChanged((user) => {
  useAuthStore.setState({ user, loading: false });
});