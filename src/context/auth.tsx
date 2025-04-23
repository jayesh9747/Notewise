'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type AuthState = {
  mobileVerified: boolean;
  emailVerified: boolean;
  termsAccepted: boolean;
  mobileNumber: string;
  email: string;
};

type AuthContextType = {
  authState: AuthState;
  updateMobileVerification: (mobileNumber: string) => void;
  updateEmailVerification: (email: string) => void;
  acceptTerms: () => void;
  resetAuth: () => void;
};

const initialState: AuthState = {
  mobileVerified: false,
  emailVerified: false,
  termsAccepted: false,
  mobileNumber: '',
  email: '',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  const updateMobileVerification = (mobileNumber: string) => {
    setAuthState(prev => ({
      ...prev,
      mobileVerified: true,
      mobileNumber
    }));
  };

  const updateEmailVerification = (email: string) => {
    setAuthState(prev => ({
      ...prev,
      emailVerified: true,
      email
    }));
  };

  const acceptTerms = () => {
    setAuthState(prev => ({
      ...prev,
      termsAccepted: true
    }));
  };

  const resetAuth = () => {
    setAuthState(initialState);
  };

  return (
    <AuthContext.Provider value={{
      authState,
      updateMobileVerification,
      updateEmailVerification,
      acceptTerms,
      resetAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}