// created src/app.js file 11/14/18
(function() {
    //initialize firebase
    const config = {
        apiKey: "AIzaSyBI2AJDiKYoM4iLRn-vueueT_1lLhht_rk",
        authDomain: "where-to-go-2acea.firebaseapp.com",
        databaseURL: "https://where-to-go-2acea.firebaseio.com",
        projectId: "where-to-go-2acea",
        storageBucket: "where-to-go-2acea.appspot.com",
        messagingSenderId: "508678585482"
      };
      firebase.initializeApp(config);

      //Get Dom Elements
      const txtEmail = document.getElementById('txtEmail');
      const txtpassword = document.getElementById('txtPassword');
      const btnLogin = document.getElementById('txtPassword');
      const btnSignup = document.getElementById('btnSignup');
      const btnLogout = document.getElementById('btnSignUp');
      const btnLogout = document.getElementById('btnLogout');

      //Add Login event
      btnLogin.addEventListener.EventListener('click', e =>{
          //Get email pass
          const email = txtEmail.value;
          const pass = txtPassword.value;
          const auth = firebase.auth();
          //sign
          auth.signInWithEmailAndPassword(email, password)
    });

}());