import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { Home, DollarSign, TrendingUp, FileText, PieChart, Settings, Menu, X, Plus, LogOut } from 'lucide-react';
import Expenses from './pages/Expenses';
import Categories from './pages/Categories';
import Analytics from './pages/Analytics';
import SettingsPage from './pages/Settings';
import Login from './pages/Login';
import './App.css';

// Overview Page Component
const Overview = () => {
  const features = [
    {
      icon: <DollarSign size={48} color="#2563eb" />,
      title: "Expense Management",
      description: "Track and manage all your expenses"
    },
    {
      icon: <TrendingUp size={48} color="#16a34a" />,
      title: "Analytics",
      description: "Visualize spending patterns and trends"
    },
    {
      icon: <FileText size={48} color="#ca8a04" />,
      title: "Reports",
      description: "Generate detailed expense reports"
    },
    {
      icon: <PieChart size={48} color="#9333ea" />,
      title: "Categories",
      description: "Organize expenses by categories"
    }
  ];

  const quickStartCards = [
    {
      icon: <Plus size={24} color="#2563eb" />,
      title: "Add Expense",
      description: "Quickly add new expenses with ease",
      link: "/expenses"
    },
    {
      icon: <TrendingUp size={24} color="#16a34a" />,
      title: "View Dashboard",
      description: "See your spending overview and analytics",
      link: "/analytics"
    },
    {
      icon: <FileText size={24} color="#ea580c" />,
      title: "Export Reports",
      description: "Download detailed expense reports",
      link: "/expenses"
    }
  ];

  return (
    <div className="content-area">
      {/* Banner */}
      <div className="banner">
        <div className="banner-left">
          <div className="banner-icon">
            <DollarSign size={24} color="#9333ea" />
          </div>
          <div>
            <div className="banner-title">Complete Expense Tracking System now available!</div>
            <div className="banner-description">Rich analytics, advanced reports, and category management are now included.</div>
          </div>
        </div>
        <button className="banner-link">Learn more</button>
      </div>

      {/* Page Title */}
      <h1 className="page-title">Expense Tracker</h1>
      <div className="page-breadcrumb">
        <Home size={16} />
        <span>/</span>
        <span>Expenses</span>
        <span>/</span>
        <span>Overview</span>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <div className="tabs">
          <button className="tab-button active">Overview</button>
          <button className="tab-button">Navigation</button>
          <button className="tab-button">Reports</button>
          <button className="tab-button">Analytics</button>
          <button className="tab-button">Settings</button>
        </div>
      </div>

      {/* Component Overview */}
      <h2 className="section-title">Feature Overview</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Quick Start Section */}
      <h2 className="quick-start-title">Quick Start</h2>
      <div className="status-banner">
        <div className="status-header">
          <div className="status-icon">✓</div>
          <span className="status-title">System Ready!</span>
        </div>
        <p className="status-description">All features are configured and ready to use.</p>
      </div>

      <div className="quick-start-grid">
        {quickStartCards.map((card, index) => (
          <Link key={index} to={card.link} className="quick-start-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card-content">
              <div className="card-icon-wrapper">{card.icon}</div>
              <div className="card-text">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activities */}
      <h2 className="quick-start-title">Recent Activities</h2>
      <div className="activities-container">
        <div className="activities-header">
          <h3>Expense Items</h3>
        </div>
        <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>
          <Link to="/expenses" style={{ color: '#2563eb', textDecoration: 'none' }}>
            View all expenses →
          </Link>
        </div>
      </div>
    </div>
  );
};

// Main Layout Component
const Layout = ({ children, isAuthenticated, userName, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className={`sidebar ${!sidebarOpen ? 'closed' : ''}`}>
        <div className="sidebar-content">
          <div className="logo-container">
            <div className="logo-icon">
              <DollarSign size={20} />
            </div>
            <span className="logo-text">Expense Tracker</span>
          </div>

          {isAuthenticated && (
            <nav className="nav-menu">
            <Link to="/" className={`nav-button ${isActive('/') ? 'active' : ''}`}>
              <Home className="nav-icon" size={20} />
              <span>Your work</span>
            </Link>
            <Link to="/expenses" className={`nav-button ${isActive('/expenses') ? 'active' : ''}`}>
              <FileText className="nav-icon" size={20} />
              <span>Expenses</span>
            </Link>
            <Link to="/categories" className={`nav-button ${isActive('/categories') ? 'active' : ''}`}>
              <PieChart className="nav-icon" size={20} />
              <span>Categories</span>
            </Link>
            <Link to="/analytics" className={`nav-button ${isActive('/analytics') ? 'active' : ''}`}>
              <TrendingUp className="nav-icon" size={20} />
              <span>Analytics</span>
            </Link>
            <Link to="/settings" className={`nav-button ${isActive('/settings') ? 'active' : ''}`}>
              <Settings className="nav-icon" size={20} />
              <span>Settings</span>
            </Link>
            </nav>
          )}

          <div className="sidebar-divider">
            <div className="sidebar-section-title">PROJECTS</div>
            <div className="project-item">
              <div className="project-dot"></div>
              <span style={{ fontSize: '14px' }}>Project Alpha</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <div className="header-left">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="menu-toggle">
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div className="breadcrumb">
                <Home size={16} />
                <span>/</span>
                <span>Expenses</span>
                <span>/</span>
                <span className="breadcrumb-current">Overview</span>
              </div>
            </div>
            <div className="header-right">
              <input 
                type="search" 
                placeholder="Search expenses..." 
                className="search-input"
              />
              <Link to="/expenses" className="add-button" style={{ textDecoration: 'none' }}>
                <Plus size={16} />
                <span>Add Expense</span>
              </Link>
              {isAuthenticated ? (
                <div className="user-info">
                  <span className="user-name">{userName}</span>
                  <button className="logout-button" onClick={onLogout} title="Logout">
                    <LogOut size={16} />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        {/* Page Content */}
        {children}
      </div>
    </div>
  );
};

  // Main App Component
const App = () => {
  // Do not auto-login; show login screen at root when not authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [userName, setUserName] = useState(localStorage.getItem('userName'));

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setUserName(localStorage.getItem('userName'));
    // don't use navigate here — let Login component redirect after setting auth state
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    setUserName(null);
    window.location.href = '/';
  };
  return (
    <Router>
      {isAuthenticated ? (
        <Layout isAuthenticated={isAuthenticated} userName={userName} onLogout={handleLogout}>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;