import React, { useState, useEffect } from 'react';
import { adminService } from '../lib/adminService.js';
import {
  Shield,
  ShieldCheck,
  Lock,
  User,
  Mail,
  Key,
  LogOut,
  RefreshCw,
  Search,
  Phone,
  CheckCircle2,
  Clock,
  Copy,
  Database,
  X,
  Sparkles,
  AlertCircle,
  FileText,
  Bell,
  KeyRound,
  ArrowLeft,
  Zap
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon.jsx';

export const AdminPanelModal = ({ isOpen, onClose }) => {
  const [checking, setChecking] = useState(true);
  const [adminExists, setAdminExists] = useState(false);
  const [session, setSession] = useState(null);

  // Form states: 'login' | 'register' | 'forgot'
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('admin123');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Forgot password specific states
  const [forgotIdentifier, setForgotIdentifier] = useState('admin');
  const [forgotPin, setForgotPin] = useState('70077');
  const [forgotNewPass, setForgotNewPass] = useState('');
  const [forgotConfirmPass, setForgotConfirmPass] = useState('');

  // Dashboard states
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loadingData, setLoadingData] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [newOrderAlert, setNewOrderAlert] = useState(null);

  useEffect(() => {
    if (isOpen) {
      initCheck();
    }
  }, [isOpen]);

  // Real-time EventSource listener for new food orders from backend
  useEffect(() => {
    if (!isOpen || !session) return;

    let eventSource;
    try {
      eventSource = new EventSource('/api/events');
      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'NEW_FOOD_ORDER') {
            setNewOrderAlert(data.order);
            loadDashboardData(true);
            setTimeout(() => setNewOrderAlert(null), 8000);
          }
        } catch (e) {
          console.error('SSE parse error:', e);
        }
      };
      eventSource.onerror = () => {
        // Gracefully close on network or static deployment error
        if (eventSource) {
          eventSource.close();
        }
      };
    } catch {
      // Ignore if unsupported
    }

    return () => {
      if (eventSource) eventSource.close();
    };
  }, [isOpen, session]);

  const initCheck = async () => {
    setChecking(true);
    setFormError('');
    setFormSuccess('');

    const current = adminService.getCurrentSession();
    const { exists } = await adminService.checkAdminExists();

    setAdminExists(exists);
    setSession(current);

    if (!exists) {
      setMode('register');
    } else {
      setMode('login');
    }

    if (current) {
      loadDashboardData();
    }

    setChecking(false);
  };

  const loadDashboardData = async (forceRefresh = false) => {
    setLoadingData(true);
    try {
      const [{ orders: fetchedOrders }, fetchedInquiries] = await Promise.all([
        adminService.fetchAllOrders(forceRefresh),
        adminService.fetchAllInquiries(forceRefresh)
      ]);
      setOrders(fetchedOrders || []);
      setInquiries(fetchedInquiries || []);
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    setIsSubmitting(true);

    if (!username || !email || !password) {
      setFormError('Please fill in all fields.');
      setIsSubmitting(false);
      return;
    }

    if (password.length < 4) {
      setFormError('Password must be at least 4 characters long.');
      setIsSubmitting(false);
      return;
    }

    const res = await adminService.registerAdmin(username, email, password);
    setIsSubmitting(false);

    if (res.success) {
      setFormSuccess(res.message);
      setAdminExists(true);
      const current = adminService.getCurrentSession();
      setSession(current);
      loadDashboardData(true);
    } else {
      setFormError(res.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    setIsSubmitting(true);

    if (!username || !password) {
      setFormError('Please provide username/email and password.');
      setIsSubmitting(false);
      return;
    }

    const res = await adminService.loginAdmin(username, password);
    setIsSubmitting(false);

    if (res.success && res.user) {
      setSession(res.user);
      setFormSuccess(res.message);
      loadDashboardData(true);
    } else {
      setFormError(res.message || 'Invalid credentials.');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!forgotNewPass || forgotNewPass.length < 4) {
      setFormError('New password must be at least 4 characters.');
      return;
    }

    if (forgotConfirmPass && forgotNewPass !== forgotConfirmPass) {
      setFormError('Passwords do not match. Please verify.');
      return;
    }

    setIsSubmitting(true);
    const res = await adminService.forgotPassword(forgotIdentifier, forgotPin, forgotNewPass);
    setIsSubmitting(false);

    if (res.success) {
      setFormSuccess(res.message);
      setPassword(forgotNewPass);
      if (res.user) {
        setSession(res.user);
        loadDashboardData(true);
      }
    } else {
      setFormError(res.message);
    }
  };

  const handleQuickReset = async () => {
    setIsSubmitting(true);
    setFormError('');
    const res = await adminService.quickResetPassword();
    setIsSubmitting(false);

    if (res.success) {
      setUsername('admin');
      setPassword('admin123');
      setFormSuccess('Password successfully reset to default "admin123"!');
      if (res.user) {
        setSession(res.user);
        loadDashboardData(true);
      }
    } else {
      setFormError('Quick reset failed. Please try manual reset.');
    }
  };

  const handleFillDefaults = () => {
    setUsername('admin');
    setPassword('admin123');
    setFormError('');
  };

  const handleLogout = () => {
    adminService.logoutAdmin();
    setSession(null);
    setUsername('admin');
    setPassword('admin123');
    setEmail('');
    initCheck();
  };

  const handleStatusChange = async (orderId, newStatus) => {
    await adminService.updateOrderStatus(orderId, newStatus);
    setOrders(prev => prev.map(o => o.order_id === orderId ? { ...o, status: newStatus } : o));
  };

  const sqlCode = `-- Run this SQL script in your Supabase SQL Editor
-- (Project ID: zkyfufsqtmhpseidtxfm)

-- 1. Create food_orders table
CREATE TABLE IF NOT EXISTS food_orders (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  order_id TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  delivery_area TEXT,
  address TEXT,
  meal_type TEXT,
  diet_preference TEXT,
  day_selected TEXT,
  menu_details TEXT,
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  inquiry_type TEXT DEFAULT 'General',
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create admin_users table (Single Slot Account)
CREATE TABLE IF NOT EXISTS admin_users (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`;

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  if (!isOpen) return null;

  // Filtered Orders
  const filteredOrders = orders.filter(o => {
    const matchesSearch =
      o.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.phone?.includes(searchQuery) ||
      o.order_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.delivery_area?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1070 }}>
      <div className="modal-dialog modal-xl modal-dialog-centered" style={{ maxWidth: '1000px' }}>
        <div className="modal-content bg-dark text-light rounded-4 border border-secondary shadow-lg overflow-hidden">
          
          {/* Top Header Bar */}
          <div className="modal-header bg-black border-bottom border-secondary px-4 py-3">
            <div className="d-flex align-items-center gap-3">
              <div className="rounded-3 p-2 bg-warning text-dark d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px' }}>
                <Shield size={22} />
              </div>
              <div>
                <div className="d-flex align-items-center gap-2">
                  <h5 className="modal-title font-serif fw-bold text-white fs-6 mb-0">
                    Shree Balaji Admin Portal
                  </h5>
                  <span className="badge bg-warning text-dark" style={{ fontSize: '0.65rem' }}>
                    Secured Access
                  </span>
                </div>
                <div className="small text-secondary" style={{ fontSize: '0.75rem' }}>
                  Full-stack order dashboard & real-time kitchen alerts
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2">
              {session && (
                <button
                  onClick={() => loadDashboardData(true)}
                  disabled={loadingData}
                  className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
                >
                  <RefreshCw size={14} className={loadingData ? 'animate-spin' : ''} />
                  <span className="d-none d-sm-inline">Refresh</span>
                </button>
              )}

              {session && (
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                >
                  <LogOut size={14} />
                  <span className="d-none d-sm-inline">Logout</span>
                </button>
              )}

              <button
                type="button"
                className="btn btn-sm btn-outline-light rounded-circle p-1"
                onClick={onClose}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* New Order Realtime Toast Alert */}
          {newOrderAlert && (
            <div className="alert alert-warning m-3 mb-0 d-flex align-items-center justify-content-between p-3 rounded-3 shadow">
              <div className="d-flex align-items-center gap-2">
                <Bell size={20} className="text-danger animate-bounce" />
                <div>
                  <strong>New Food Order Alert!</strong> Order ID: {newOrderAlert.orderId} from {newOrderAlert.customerName} ({newOrderAlert.phone})
                </div>
              </div>
              <button
                className="btn btn-sm btn-dark"
                onClick={() => setNewOrderAlert(null)}
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Modal Body */}
          <div className="modal-body p-4" style={{ maxHeight: '82vh', overflowY: 'auto' }}>
            {checking ? (
              <div className="py-5 text-center">
                <RefreshCw size={32} className="text-warning animate-spin mx-auto mb-3" />
                <p className="small text-secondary">Verifying Admin Account Access...</p>
              </div>
            ) : !session ? (
              /* Auth Form (Login / Register / Forgot Password) */
              <div className="mx-auto py-3" style={{ maxWidth: '460px' }}>
                
                {formError && (
                  <div className="alert alert-danger py-2 px-3 small d-flex align-items-center gap-2 mb-3">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {formSuccess && (
                  <div className="alert alert-success py-2 px-3 small d-flex align-items-center gap-2 mb-3">
                    <CheckCircle2 size={16} className="flex-shrink-0" />
                    <span>{formSuccess}</span>
                  </div>
                )}

                {/* 1. FORGOT PASSWORD MODE */}
                {mode === 'forgot' ? (
                  <div className="card bg-black border-secondary p-4 rounded-4 shadow">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <button
                        onClick={() => { setMode('login'); setFormError(''); setFormSuccess(''); }}
                        className="btn btn-sm btn-outline-secondary p-1 rounded-circle"
                        title="Back to login"
                      >
                        <ArrowLeft size={16} />
                      </button>
                      <div>
                        <h5 className="font-serif fw-bold text-white mb-0 fs-6">
                          Reset Admin Password
                        </h5>
                        <span className="small text-secondary" style={{ fontSize: '0.75rem' }}>
                          पासवर्ड भूल गए? यहाँ से नया पासवर्ड सेट करें
                        </span>
                      </div>
                    </div>

                    <form onSubmit={handleForgotPassword} className="d-flex flex-column gap-3">
                      <div>
                        <label className="form-label small fw-bold text-uppercase text-secondary mb-1">
                          Admin Username / Email
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-dark border-secondary text-secondary">
                            <User size={16} />
                          </span>
                          <input
                            type="text"
                            required
                            value={forgotIdentifier}
                            onChange={(e) => setForgotIdentifier(e.target.value)}
                            placeholder="admin or your email"
                            className="form-control bg-dark text-white border-secondary small"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <label className="form-label small fw-bold text-uppercase text-secondary mb-0">
                            Master Recovery PIN
                          </label>
                          <span className="badge bg-secondary-subtle text-warning-emphasis" style={{ fontSize: '0.7rem' }}>
                            Default PIN: 70077
                          </span>
                        </div>
                        <div className="input-group">
                          <span className="input-group-text bg-dark border-secondary text-secondary">
                            <Lock size={16} />
                          </span>
                          <input
                            type="text"
                            value={forgotPin}
                            onChange={(e) => setForgotPin(e.target.value)}
                            placeholder="Enter 70077"
                            className="form-control bg-dark text-white border-secondary small"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="form-label small fw-bold text-uppercase text-secondary mb-1">
                          New Password *
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-dark border-secondary text-secondary">
                            <Key size={16} />
                          </span>
                          <input
                            type="password"
                            required
                            value={forgotNewPass}
                            onChange={(e) => setForgotNewPass(e.target.value)}
                            placeholder="Enter your new password"
                            className="form-control bg-dark text-white border-secondary small"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="form-label small fw-bold text-uppercase text-secondary mb-1">
                          Confirm New Password
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-dark border-secondary text-secondary">
                            <Key size={16} />
                          </span>
                          <input
                            type="password"
                            value={forgotConfirmPass}
                            onChange={(e) => setForgotConfirmPass(e.target.value)}
                            placeholder="Re-type new password"
                            className="form-control bg-dark text-white border-secondary small"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-warning text-dark fw-bold py-2 mt-2 d-flex align-items-center justify-content-center gap-2"
                      >
                        <KeyRound size={18} />
                        <span>{isSubmitting ? 'Resetting Password...' : 'Save New Password & Login'}</span>
                      </button>

                      {/* Emergency Quick Reset Button */}
                      <button
                        type="button"
                        onClick={handleQuickReset}
                        disabled={isSubmitting}
                        className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center gap-2 text-warning"
                      >
                        <Zap size={14} />
                        <span>Instant 1-Click Reset to Default (admin / admin123)</span>
                      </button>

                      <div className="text-center mt-2">
                        <button
                          type="button"
                          onClick={() => { setMode('login'); setFormError(''); setFormSuccess(''); }}
                          className="btn btn-link btn-sm text-secondary text-decoration-none"
                        >
                          Back to Sign In
                        </button>
                      </div>
                    </form>
                  </div>
                ) : mode === 'register' ? (
                  /* 2. REGISTER MODE */
                  <div className="card bg-black border-secondary p-4 rounded-4 shadow">
                    <div className="text-center mb-3">
                      <h4 className="font-serif fw-bold text-white mb-1">Create Admin Account</h4>
                      <p className="small text-secondary mb-0">Set up your master admin account</p>
                    </div>

                    <form onSubmit={handleRegister} className="d-flex flex-column gap-3">
                      <div>
                        <label className="form-label small fw-bold text-uppercase text-secondary">
                          Admin Username *
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-dark border-secondary text-secondary">
                            <User size={16} />
                          </span>
                          <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="e.g. admin or balaji_admin"
                            className="form-control bg-dark text-white border-secondary small"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="form-label small fw-bold text-uppercase text-secondary">
                          Admin Email *
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-dark border-secondary text-secondary">
                            <Mail size={16} />
                          </span>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@shreebalajitiffin.com"
                            className="form-control bg-dark text-white border-secondary small"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="form-label small fw-bold text-uppercase text-secondary">
                          Password *
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-dark border-secondary text-secondary">
                            <Key size={16} />
                          </span>
                          <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••••••"
                            className="form-control bg-dark text-white border-secondary small"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-warning text-dark fw-bold py-2 mt-2 d-flex align-items-center justify-content-center gap-2"
                      >
                        <ShieldCheck size={18} />
                        <span>{isSubmitting ? 'Creating...' : 'Create Admin & Lock Slot'}</span>
                      </button>

                      <div className="text-center mt-2">
                        <button
                          type="button"
                          onClick={() => { setMode('login'); setFormError(''); setFormSuccess(''); }}
                          className="btn btn-link btn-sm text-secondary text-decoration-none"
                        >
                          Already have credentials? Sign In
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  /* 3. LOGIN MODE */
                  <div className="card bg-black border-secondary p-4 rounded-4 shadow">
                    
                    {/* Default Credentials Helper Callout */}
                    <div className="alert alert-secondary bg-dark border-secondary py-2 px-3 small d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <span className="text-secondary d-block" style={{ fontSize: '0.72rem' }}>Quick Admin Credentials:</span>
                        <strong className="text-warning font-monospace">admin / admin123</strong>
                      </div>
                      <button
                        type="button"
                        onClick={handleFillDefaults}
                        className="btn btn-xs btn-outline-warning py-1 px-2"
                        style={{ fontSize: '0.75rem' }}
                      >
                        Auto Fill
                      </button>
                    </div>

                    <div className="text-center mb-3">
                      <h4 className="font-serif fw-bold text-white mb-1">Admin Sign In</h4>
                      <p className="small text-secondary mb-0">Manage customer bookings & orders</p>
                    </div>

                    <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
                      <div>
                        <label className="form-label small fw-bold text-uppercase text-secondary">
                          Username or Email *
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-dark border-secondary text-secondary">
                            <User size={16} />
                          </span>
                          <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username (admin)"
                            className="form-control bg-dark text-white border-secondary small"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <label className="form-label small fw-bold text-uppercase text-secondary mb-0">
                            Password *
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setMode('forgot');
                              setForgotIdentifier(username || 'admin');
                              setFormError('');
                              setFormSuccess('');
                            }}
                            className="btn btn-link p-0 text-warning text-decoration-none small"
                            style={{ fontSize: '0.78rem' }}
                          >
                            Forgot Password?
                          </button>
                        </div>
                        <div className="input-group">
                          <span className="input-group-text bg-dark border-secondary text-secondary">
                            <Key size={16} />
                          </span>
                          <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password (admin123)"
                            className="form-control bg-dark text-white border-secondary small"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-warning text-dark fw-bold py-2 mt-2 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                      >
                        <Shield size={18} />
                        <span>{isSubmitting ? 'Authenticating...' : 'Sign In as Admin'}</span>
                      </button>

                      {/* Forgot Password / Reset Link */}
                      <div className="d-flex justify-content-between align-items-center mt-2 small">
                        <button
                          type="button"
                          onClick={() => {
                            setMode('forgot');
                            setForgotIdentifier(username || 'admin');
                            setFormError('');
                            setFormSuccess('');
                          }}
                          className="btn btn-sm btn-link text-warning-emphasis text-decoration-none p-0"
                        >
                          🔑 Reset / Forgot Password
                        </button>

                        <button
                          type="button"
                          onClick={handleQuickReset}
                          className="btn btn-sm btn-link text-secondary text-decoration-none p-0"
                        >
                          ⚡ 1-Click Reset to Default
                        </button>
                      </div>
                    </form>
                  </div>
                )}

              </div>
            ) : (
              /* Logged In Dashboard */
              <div className="d-flex flex-column gap-4">
                {/* Stats Bar */}
                <div className="row g-3">
                  <div className="col-6 col-md-3">
                    <div className="card p-3 rounded-3 bg-black border-secondary text-light">
                      <div className="small fw-bold text-secondary text-uppercase">Total Bookings</div>
                      <div className="d-flex justify-content-between align-items-baseline mt-2">
                        <span className="fs-4 fw-bold text-white">{orders.length}</span>
                        <FileText size={20} className="text-warning" />
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-3">
                    <div className="card p-3 rounded-3 bg-black border-secondary text-light">
                      <div className="small fw-bold text-secondary text-uppercase">Pending Orders</div>
                      <div className="d-flex justify-content-between align-items-baseline mt-2">
                        <span className="fs-4 fw-bold text-warning">
                          {orders.filter(o => o.status === 'Pending').length}
                        </span>
                        <Clock size={20} className="text-warning" />
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-3">
                    <div className="card p-3 rounded-3 bg-black border-secondary text-light">
                      <div className="small fw-bold text-secondary text-uppercase">Delivered / Confirmed</div>
                      <div className="d-flex justify-content-between align-items-baseline mt-2">
                        <span className="fs-4 fw-bold text-success">
                          {orders.filter(o => o.status === 'Confirmed' || o.status === 'Delivered').length}
                        </span>
                        <CheckCircle2 size={20} className="text-success" />
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-3">
                    <div className="card p-3 rounded-3 bg-black border-secondary text-light">
                      <div className="small fw-bold text-secondary text-uppercase">Total Inquiries</div>
                      <div className="d-flex justify-content-between align-items-baseline mt-2">
                        <span className="fs-4 fw-bold text-info">{inquiries.length}</span>
                        <Mail size={20} className="text-info" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs & Search */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 border-bottom border-secondary pb-3">
                  <div className="btn-group">
                    <button
                      onClick={() => setActiveTab('orders')}
                      className={`btn btn-sm ${activeTab === 'orders' ? 'btn-warning text-dark fw-bold' : 'btn-outline-secondary text-light'}`}
                    >
                      Food Bookings ({orders.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('inquiries')}
                      className={`btn btn-sm ${activeTab === 'inquiries' ? 'btn-warning text-dark fw-bold' : 'btn-outline-secondary text-light'}`}
                    >
                      Inquiries ({inquiries.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('sql')}
                      className={`btn btn-sm ${activeTab === 'sql' ? 'btn-warning text-dark fw-bold' : 'btn-outline-secondary text-light'}`}
                    >
                      Supabase SQL
                    </button>
                  </div>

                  {activeTab === 'orders' && (
                    <div className="d-flex gap-2">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search name, phone, order ID..."
                        className="form-control form-control-sm bg-black text-white border-secondary"
                        style={{ maxWidth: '220px' }}
                      />
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="form-select form-select-sm bg-black text-white border-secondary"
                        style={{ maxWidth: '140px' }}
                      >
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Orders List */}
                {activeTab === 'orders' && (
                  <div className="d-flex flex-column gap-3">
                    {filteredOrders.length === 0 ? (
                      <div className="text-center py-5 bg-black rounded-3 border border-secondary text-secondary">
                        <FileText size={32} className="mb-2 opacity-50" />
                        <p className="mb-0">No orders found.</p>
                      </div>
                    ) : (
                      filteredOrders.map((order, idx) => (
                        <div key={order.order_id || idx} className="card p-3 rounded-3 bg-black border border-secondary text-light">
                          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center pb-2 border-bottom border-secondary gap-2 mb-3">
                            <div className="d-flex align-items-center gap-2">
                              <span className="badge bg-warning text-dark font-monospace">{order.order_id}</span>
                              <strong className="fs-6 text-white">{order.customer_name}</strong>
                              <span className="text-secondary small">
                                {order.created_at ? new Date(order.created_at).toLocaleString() : ''}
                              </span>
                            </div>

                            <div className="d-flex align-items-center gap-2">
                              <span className="small text-secondary">Status:</span>
                              <select
                                value={order.status || 'Pending'}
                                onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                                className="form-select form-select-sm bg-dark text-white border-secondary"
                                style={{ width: 'auto' }}
                              >
                                <option value="Pending">🟡 Pending</option>
                                <option value="Confirmed">🟢 Confirmed</option>
                                <option value="Out for Delivery">🛵 Out for Delivery</option>
                                <option value="Delivered">✅ Delivered</option>
                                <option value="Cancelled">❌ Cancelled</option>
                              </select>
                            </div>
                          </div>

                          <div className="row g-2 small text-light">
                            <div className="col-sm-6 col-lg-3">
                              <span className="text-secondary d-block" style={{ fontSize: '0.75rem' }}>Phone</span>
                              <div className="d-flex align-items-center gap-2 mt-1">
                                <span>{order.phone}</span>
                                <a href={`tel:${order.phone}`} className="btn btn-xs btn-outline-warning p-1 py-0">
                                  <Phone size={12} />
                                </a>
                                <a
                                  href={`https://wa.me/${order.phone?.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(order.customer_name)},%20regarding%20your%20Shree%20Balaji%20Tiffin%20Order%20${order.order_id}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-xs btn-outline-success p-1 py-0"
                                >
                                  <WhatsAppIcon size={12} />
                                </a>
                              </div>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                              <span className="text-secondary d-block" style={{ fontSize: '0.75rem' }}>Meal & Diet</span>
                              <span>{order.meal_type} Meal ({order.diet_preference})</span>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                              <span className="text-secondary d-block" style={{ fontSize: '0.75rem' }}>Area</span>
                              <span>{order.delivery_area}</span>
                            </div>

                            <div className="col-sm-6 col-lg-3">
                              <span className="text-secondary d-block" style={{ fontSize: '0.75rem' }}>Address</span>
                              <span className="text-truncate d-block">{order.address || 'Via WhatsApp'}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Inquiries List */}
                {activeTab === 'inquiries' && (
                  <div className="d-flex flex-column gap-3">
                    {inquiries.length === 0 ? (
                      <div className="text-center py-5 bg-black rounded-3 border border-secondary text-secondary">
                        <Mail size={32} className="mb-2 opacity-50" />
                        <p className="mb-0">No inquiries recorded yet.</p>
                      </div>
                    ) : (
                      inquiries.map((inq, idx) => (
                        <div key={idx} className="card p-3 rounded-3 bg-black border border-secondary text-light">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <strong className="text-white">{inq.name}</strong>
                            <span className="text-secondary small">{inq.created_at ? new Date(inq.created_at).toLocaleString() : ''}</span>
                          </div>
                          <div className="d-flex align-items-center gap-2 small text-warning mb-2">
                            <span>{inq.phone}</span>
                            <span className="badge bg-secondary text-light">{inq.inquiry_type || 'General'}</span>
                          </div>
                          {inq.message && (
                            <p className="small text-light bg-dark p-2 rounded-2 mb-0 border border-secondary">
                              {inq.message}
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* SQL Script */}
                {activeTab === 'sql' && (
                  <div className="card p-4 rounded-3 bg-black border border-secondary">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <h6 className="font-serif fw-bold text-white mb-0">Supabase SQL Schema</h6>
                        <span className="small text-secondary">Run this in your Supabase SQL Editor if setting up from scratch.</span>
                      </div>
                      <button
                        onClick={copySqlToClipboard}
                        className="btn btn-sm btn-warning text-dark fw-bold d-flex align-items-center gap-1"
                      >
                        <Copy size={14} />
                        <span>{copiedSql ? 'Copied! ✅' : 'Copy Script'}</span>
                      </button>
                    </div>
                    <pre className="p-3 rounded-3 bg-dark text-warning small font-monospace overflow-auto" style={{ maxHeight: '300px' }}>
                      {sqlCode}
                    </pre>
                  </div>
                )}

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
