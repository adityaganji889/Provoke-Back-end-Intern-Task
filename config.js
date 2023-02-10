const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyDLks3vOOo7kTJx7rQY9YWkQt7vDcIujsg",
  authDomain: "blog-465d7.firebaseapp.com",
  projectId: "blog-465d7",
  storageBucket: "blog-465d7.appspot.com",
  messagingSenderId: "983305568958",
  appId: "1:983305568958:web:eb50847782bcde679854ef",
  measurementId: "G-YQN85SYRDD"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const Blog = db.collection("Blogs");
module.exports = Blog;
