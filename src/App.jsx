import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HomePage, LoginPage, LandingPage } from './pages';
import '../global.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authView, setAuthView] = useState(null); // null = landing, 'login' | 'register' = LoginPage

  useEffect(() => {
    const stored = localStorage.getItem('limpaocao_currentUser');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setAuthView(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('limpaocao_currentUser');
    setUser(null);
  };

  const handleLoginClick = (view) => {
    setAuthView(view);
  };

  const handleBackToLanding = () => {
    setAuthView(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="text-emerald-600 text-lg">Carregando...</div>
      </div>
    );
  }

  let content;
  if (!user) {
    if (authView) {
      content = <LoginPage onLogin={handleLogin} initialMode={authView} onBack={handleBackToLanding} />;
    } else {
      content = <LandingPage onLoginClick={handleLoginClick} />;
    }
  } else {
    content = <HomePage user={user} onLogout={handleLogout} />;
  }

  return (
    <>
      {content}
      <ToastContainer position="bottom-right" autoClose={3000} theme="light" />
    </>
  );
}

export default App;