import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/authService';
import { TOKEN_KEY } from '../../services/api';

export const AuthContext = createContext(null);
const USER_KEY = 'campus_connect_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(window.localStorage.getItem(USER_KEY) || 'null'); }
    catch { return null; }
  });
  const [loading, setLoading] = useState(() => Boolean(window.localStorage.getItem(TOKEN_KEY)));

  const clearSession = useCallback(() => {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  useEffect(() => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return undefined;
    }
    authService.me()
      .then((identity) => {
        setUser((current) => current && current.email === identity.email
          ? { ...current, role: identity.role }
          : { email: identity.email, role: identity.role });
      })
      .catch(clearSession)
      .finally(() => setLoading(false));
    return undefined;
  }, [clearSession]);

  useEffect(() => {
    window.addEventListener('campus-connect:unauthorized', clearSession);
    return () => window.removeEventListener('campus-connect:unauthorized', clearSession);
  }, [clearSession]);

  const saveSession = useCallback((session) => {
    window.localStorage.setItem(TOKEN_KEY, session.token);
    window.localStorage.setItem(USER_KEY, JSON.stringify(session.user));
    setUser(session.user);
    return session.user;
  }, []);

  const login = useCallback(async (email, password) => saveSession(await authService.login(email, password)), [saveSession]);
  const register = useCallback(async (details) => saveSession(await authService.register(details)), [saveSession]);

  const value = useMemo(() => ({
    user,
    loading,
    login,
    register,
    logout: clearSession,
    validateCollegeEmail: authService.validateCollegeEmail
  }), [user, loading, login, register, clearSession]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
