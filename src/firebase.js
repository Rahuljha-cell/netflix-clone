
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyAUkvM7gtclMh15MMCvVO-0N1RXRSEHMtY",
  authDomain: "netflix-clone-f5fbc.firebaseapp.com",
  projectId: "netflix-clone-f5fbc",
  storageBucket: "netflix-clone-f5fbc.firebasestorage.app",
  messagingSenderId: "1041536798615",
  appId: "1:1041536798615:web:8ada5362bc671c2b753ed2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const res=await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch(error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}

const login = async (email, password)=>{
    try{
        await signInWithEmailAndPassword(auth, email, password);
    } catch(error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}
const logout = ()=>{
    signOut(auth);
}
export {auth, db, login, signup, logout};