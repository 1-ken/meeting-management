import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase.js';
import { doc, setDoc, getDoc, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore';
import { getUserRole } from '../utils/roleUtils.js';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock authentication - stores session in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('mockUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      loadUserRole(user.uid);
    } else {
      setLoading(false);
    }
  }, []);

  async function loadUserRole(userId) {
    try {
      const role = await getUserRole(userId);
      setUserRole(role);
    } catch (error) {
      console.error('Error loading user role:', error);
    } finally {
      setLoading(false);
    }
  }

  // Sign up function - creates user in Firestore only
  async function signup(email, password, username, role = 'user') {
    try {
      // Check if user already exists
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        return { success: false, error: 'User with this email already exists' };
      }

      // Generate a mock user ID
      const userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', userId), {
        username: username,
        email: email,
        role_id: role,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
      });

      // Create mock user object
      const mockUser = {
        uid: userId,
        email: email,
        displayName: username
      };

      // Store in localStorage for session persistence
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      setCurrentUser(mockUser);
      setUserRole(role);
      
      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message };
    }
  }

  // Login function - checks Firestore for user credentials
  async function login(email, password) {
    try {
      // For demo purposes, we'll use simple credential checking
      // In production, you'd want proper password hashing
      
      // Check for predefined demo accounts
      const demoAccounts = {
        'admin@demo.com': { password: 'admin123', role: 'super_admin', username: 'Demo Admin' },
        'manager@demo.com': { password: 'manager123', role: 'admin', username: 'Demo Manager' },
        'user@demo.com': { password: 'user123', role: 'user', username: 'Demo User' }
      };

      if (demoAccounts[email] && demoAccounts[email].password === password) {
        const account = demoAccounts[email];
        const mockUser = {
          uid: 'demo_' + account.role,
          email: email,
          displayName: account.username
        };

        localStorage.setItem('mockUser', JSON.stringify(mockUser));
        setCurrentUser(mockUser);
        setUserRole(account.role);
        
        return { success: true, user: mockUser };
      }

      // Check Firestore for registered users
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return { success: false, error: 'No user found with this email' };
      }

      // For demo, accept any password for Firestore users
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      
      const mockUser = {
        uid: userDoc.id,
        email: email,
        displayName: userData.username
      };

      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      setCurrentUser(mockUser);
      setUserRole(userData.role_id);
      
      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  }

  // Logout function
  async function logout() {
    try {
      localStorage.removeItem('mockUser');
      setCurrentUser(null);
      setUserRole(null);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get current user data
  async function getCurrentUserData() {
    if (currentUser) {
      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          return userDoc.data();
        }
      } catch (error) {
        console.error('Error getting user data:', error);
      }
    }
    return null;
  }

  const value = {
    currentUser,
    userRole,
    signup,
    login,
    logout,
    getCurrentUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
