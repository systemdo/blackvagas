import { FirebaseAuth, AuthGoogleProvider } from '../utils/FirebaseUtils';

class UserService  {
    constructor(){
        this.auth = FirebaseAuth;
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
}

export default UserService;