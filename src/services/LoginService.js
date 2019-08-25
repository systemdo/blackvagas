import { FirebaseAuth, AuthGoogleProvider } from '../utils/FirebaseUtils';

class LoginService  {
    constructor(){
        this.auth = FirebaseAuth;
        this.GoogleAuthProvider = AuthGoogleProvider;
    }

    signGoogle  = () => {
        return this.auth.signInWithPopup(this.GoogleAuthProvider);
    }
    
    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();
}
export default LoginService;