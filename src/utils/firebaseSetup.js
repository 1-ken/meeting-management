import { db } from '../firebase.js';
import { collection, doc, setDoc, addDoc, serverTimestamp } from 'firebase/firestore';

export async function setupSchema() {
  try {
    // Create roles
    const roles = ['super_admin', 'admin', 'user'];
    for (const roleName of roles) {
      const roleRef = doc(db, 'roles', roleName);
      await setDoc(roleRef, { role_name: roleName });
      console.log(`Role ${roleName} created`);
    }

    // Example: Create a super admin user
    const superAdminRef = doc(db, 'users', 'superadmin');
    await setDoc(superAdminRef, {
      username: 'superadmin',
      password: 'hashed_password_here', // You should hash passwords before storing
      role_id: 'super_admin',
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });
    console.log('Super admin user created');

    // Sample meetings
    const meeting1Ref = doc(db, 'meetings', 'meeting1');
    await setDoc(meeting1Ref, {
      serial_number: 'M-0001',
      org_logo: 'https://example.com/logo1.png',
      title: 'Annual General Meeting',
      description: 'Discuss company performance and plans.',
      created_by: 'superadmin',
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });
    console.log('Sample meeting1 created');

    // Sample attendees for meeting1
    const attendees = [
      {
        name: 'John Doe',
        designation: 'Manager',
        organization: 'Company A',
        email: 'john.doe@example.com',
        cell: '123-456-7890',
        signature: 'https://example.com/signatures/johndoe.png',
        timestamp: serverTimestamp()
      },
      {
        name: 'Jane Smith',
        designation: 'Director',
        organization: 'Company B',
        email: 'jane.smith@example.com',
        cell: '987-654-3210',
        signature: 'https://example.com/signatures/janesmith.png',
        timestamp: serverTimestamp()
      }
    ];

    for (const attendee of attendees) {
      await addDoc(collection(db, 'meetings', 'meeting1', 'attendees'), attendee);
    }
    console.log('Sample attendees added to meeting1');

    // Sample report for meeting1
    const reportRef = doc(db, 'reports', 'report1');
    await setDoc(reportRef, {
      meeting_id: 'meeting1',
      report_data: JSON.stringify({ summary: 'Meeting was successful', attendees_count: 2 }),
      created_at: serverTimestamp()
    });
    console.log('Sample report created for meeting1');

    console.log('Firebase schema setup with sample data completed.');
    return { success: true, message: 'Schema setup completed successfully' };
  } catch (error) {
    console.error('Error setting up schema:', error);
    return { success: false, message: error.message };
  }
}
