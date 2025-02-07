import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc, setDoc } from "firebase/firestore";

export default class FireBaseAgent {

    firebaseConfig = {
        apiKey: "AIzaSyDKHP_Nw828U0ub2LWl69l62GogHZ7Efmg",
        authDomain: "tondo-83b67.firebaseapp.com",
        projectId: "tondo-83b67",
        storageBucket: "tondo-83b67.firebasestorage.app",
        messagingSenderId: "1027399791856",
        appId: "1:1027399791856:web:292ebdb96c8c4ae202fe35",
        measurementId: "G-726YM4JD2T"
      };

    app = null;
    db = null;
    auth = null;

    constructor() {
        this.app = initializeApp(this.firebaseConfig);
        this.db = getFirestore(this.app);
        this.auth = getAuth(this.app);

        signInWithEmailAndPassword(this.auth, "pankimatick@gmail.com", "")
            .then((userCred) =>
                console.log("LOGGED IN")
            ).catch((error) => {
                console.log("LOGIN FAILED");
              })

    }

    async addNote() {
        const notesRef = collection(this.db, "notes");

        await setDoc(doc(notesRef, "TEST001"), {
            userID: "TEST",
            screenLocationX: 100,
            screenLocationY: 100,
            noteText: "SAMPLE NOTE TEXT"
        })
    }

    async getNote() {
        const docRef = doc(this.db, "notes", "TEST001");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
          } else {
            console.log("No such document!");
          }
    }
}