import { db } from '../firebase.js';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

// Get user role from Firestore
export async function getUserRole(userId) {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data().role_id;
    }
    return null;
  } catch (error) {
    console.error('Error getting user role:', error);
    return null;
  }
}

// Check if user has specific role
export function hasRole(userRole, requiredRole) {
  const roleHierarchy = {
    'super_admin': 3,
    'admin': 2,
    'user': 1
  };
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

// Get all users with specific role
export async function getUsersByRole(role) {
  try {
    const q = query(collection(db, 'users'), where('role_id', '==', role));
    const querySnapshot = await getDocs(q);
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return users;
  } catch (error) {
    console.error('Error getting users by role:', error);
    return [];
  }
}

// Role display names
export const roleDisplayNames = {
  'super_admin': 'Super Administrator',
  'admin': 'Administrator',
  'user': 'User'
};

// Get role display name
export function getRoleDisplayName(role) {
  return roleDisplayNames[role] || role;
}
