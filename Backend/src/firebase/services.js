import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  limit,
  serverTimestamp,
  onSnapshot 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from './config';

// Contact Form Service
export const contactService = {
  async submitContact(formData) {
    const docRef = await addDoc(collection(db, 'contacts'), {
      ...formData,
      createdAt: serverTimestamp(),
      status: 'unread'
    });
    return docRef.id;
  },

  async getContacts() {
    const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async updateContactStatus(id, status) {
    const docRef = doc(db, 'contacts', id);
    await updateDoc(docRef, { status });
  },

  async deleteContact(id) {
    await deleteDoc(doc(db, 'contacts', id));
  }
};

// Teacher Application Service
export const teacherService = {
  async submitApplication(formData) {
    let resumeUrl = null;
    
    if (formData.resume) {
      const resumeRef = ref(storage, `resumes/${Date.now()}_${formData.resume.name}`);
      const resumeSnapshot = await uploadBytes(resumeRef, formData.resume);
      resumeUrl = await getDownloadURL(resumeSnapshot.ref);
    }

    const docRef = await addDoc(collection(db, 'teacherApplications'), {
      ...formData,
      resume: resumeUrl,
      createdAt: serverTimestamp(),
      status: 'pending'
    });
    return docRef.id;
  },

  async getApplications() {
    const q = query(collection(db, 'teacherApplications'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async updateApplicationStatus(id, status) {
    const docRef = doc(db, 'teacherApplications', id);
    await updateDoc(docRef, { status });
  },

  async deleteApplication(id) {
    await deleteDoc(doc(db, 'teacherApplications', id));
  }
};

// Alumni Service
export const alumniService = {
  async submitAlumni(formData) {
    let photoUrl = null;
    
    if (formData.photo) {
      const photoRef = ref(storage, `alumni_photos/${Date.now()}_${formData.photo.name}`);
      const photoSnapshot = await uploadBytes(photoRef, formData.photo);
      photoUrl = await getDownloadURL(photoSnapshot.ref);
    }

    const docRef = await addDoc(collection(db, 'alumni'), {
      ...formData,
      photo: photoUrl,
      createdAt: serverTimestamp(),
      status: 'approved'
    });
    return docRef.id;
  },

  async getAlumni() {
    const q = query(collection(db, 'alumni'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async updateAlumni(id, data) {
    const docRef = doc(db, 'alumni', id);
    await updateDoc(docRef, data);
  },

  async deleteAlumni(id) {
    await deleteDoc(doc(db, 'alumni', id));
  }
};

// Notice Service
export const noticeService = {
  async createNotice(noticeData) {
    const docRef = await addDoc(collection(db, 'notices'), {
      ...noticeData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  },

  async getNotices() {
    const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async updateNotice(id, data) {
    const docRef = doc(db, 'notices', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  },

  async deleteNotice(id) {
    await deleteDoc(doc(db, 'notices', id));
  },

  // Real-time listener for notices
  onNoticesChange(callback) {
    const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (querySnapshot) => {
      const notices = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(notices);
    });
  }
};

// Faculty Service
export const facultyService = {
  async createFaculty(facultyData) {
    let photoUrl = null;
    
    if (facultyData.photo) {
      const photoRef = ref(storage, `faculty_photos/${Date.now()}_${facultyData.photo.name}`);
      const photoSnapshot = await uploadBytes(photoRef, facultyData.photo);
      photoUrl = await getDownloadURL(photoSnapshot.ref);
    }

    const docRef = await addDoc(collection(db, 'faculty'), {
      ...facultyData,
      photo: photoUrl,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  },

  async getFaculty() {
    const q = query(collection(db, 'faculty'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async updateFaculty(id, data) {
    const docRef = doc(db, 'faculty', id);
    await updateDoc(docRef, data);
  },

  async deleteFaculty(id) {
    await deleteDoc(doc(db, 'faculty', id));
  }
};