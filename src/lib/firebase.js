import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

export const initFirebase = async () => {
  try {
    // 1. Agar pehle se koi App hai, to check karo usme URL hai ya nahi
    if (firebase.apps.length) {
      const currentApp = firebase.app();
      if (currentApp.options.databaseURL) {
        return firebase; // Sab sahi hai
      } else {
        console.log("Old connection broken, resetting...");
        await currentApp.delete(); // Purana delete karo
      }
    }

    // 2. Naya Connection banao
    const response = await fetch('/api/config');
    const data = await response.json();

    // Hardcoded URL taaki error ka chance hi na rahe
    const config = {
      ...data.firebase,
      databaseURL: "https://bank-master-data-default-rtdb.asia-southeast1.firebasedatabase.app"
    };

    firebase.initializeApp(config);
    console.log("Firebase initialized with URL:", config.databaseURL);

    return firebase;
  } catch (error) {
    console.error("Firebase Init Error:", error);
    return null;
  }
};

export default firebase;
