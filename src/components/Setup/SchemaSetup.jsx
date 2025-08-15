import React, { useState } from 'react';
import { setupSchema } from '../../utils/firebaseSetup';
import { Link } from 'react-router-dom';

function SchemaSetup() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function handleSetupSchema() {
    setLoading(true);
    setResult(null);
    
    try {
      const setupResult = await setupSchema();
      setResult(setupResult);
    } catch (error) {
      setResult({
        success: false,
        message: 'Failed to setup schema: ' + error.message
      });
    }
    
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Database Schema Setup
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Initialize the Firebase database with required collections and sample data
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {result && (
            <div className={`border px-4 py-3 rounded ${
              result.success 
                ? 'bg-green-100 border-green-400 text-green-700' 
                : 'bg-red-100 border-red-400 text-red-700'
            }`}>
              {result.message}
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">
              This will create:
            </h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Roles collection (super_admin, admin, user)</li>
              <li>• Sample super admin user</li>
              <li>• Sample meeting with attendees</li>
              <li>• Sample report</li>
            </ul>
          </div>

          <div>
            <button
              onClick={handleSetupSchema}
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {loading ? 'Setting up schema...' : 'Setup Database Schema'}
            </button>
          </div>

          <div className="text-center space-y-2">
            <Link
              to="/login"
              className="block font-medium text-indigo-600 hover:text-indigo-500"
            >
              Back to Login
            </Link>
            {result?.success && (
              <p className="text-sm text-gray-600">
                You can now login with the created accounts
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchemaSetup;
