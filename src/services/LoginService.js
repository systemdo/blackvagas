import Service from './Service';
export const LoginService = user => {
    return Service.post('/login', { user });
}