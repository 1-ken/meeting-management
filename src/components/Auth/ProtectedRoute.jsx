import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { hasRole } from '../../utils/roleUtils';

function ProtectedRoute({ children, requiredRole = null }) {
  const { currentUser, userRole } = useAuth();

  // If not authenticated, show login message
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Access Denied
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please log in to access this page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If role is required and user doesn't have sufficient role
  if (requiredRole && !hasRole(userRole, requiredRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Insufficient Permissions
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              You don't have the required permissions to access this page.
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Required role: {requiredRole} | Your role: {userRole}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
