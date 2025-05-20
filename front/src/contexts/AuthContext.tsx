import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'tester' | 'programmer';
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isTester: boolean;
  isProgrammer: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('tcmsUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call
    if (email === 'admin@example.com' && password === 'password') {
      const mockUser = {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin' as const
      };
      setUser(mockUser);
      localStorage.setItem('tcmsUser', JSON.stringify(mockUser));
      return;
    } else if (email === 'tester@example.com' && password === 'password') {
      const mockUser = {
        id: '2',
        name: 'Tester User',
        email: 'tester@example.com',
        role: 'tester' as const
      };
      setUser(mockUser);
      localStorage.setItem('tcmsUser', JSON.stringify(mockUser));
      return;
    } else if (email === 'programmer@example.com' && password === 'password') {
      const mockUser = {
        id: '3',
        name: 'Programmer User',
        email: 'programmer@example.com',
        role: 'programmer' as const
      };
      setUser(mockUser);
      localStorage.setItem('tcmsUser', JSON.stringify(mockUser));
      return;
    }
    throw new Error('Invalid email or password');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tcmsUser');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isTester: user?.role === 'tester',
    isProgrammer: user?.role === 'programmer',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};