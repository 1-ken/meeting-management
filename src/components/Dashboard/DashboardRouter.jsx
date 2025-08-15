import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import SuperAdminDashboard from './SuperAdminDashboard';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

function DashboardRouter() {
  const { userRole } = useAuth();

  // Route to appropriate dashboard based on user role
  switch (userRole) {
    case 'super_admin':
      return <SuperAdminDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'user':
    default:
      return <UserDashboard />;
  }
}

export default DashboardRouter;
