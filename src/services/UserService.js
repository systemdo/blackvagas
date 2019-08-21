import Service from './Service';
export const signUp = user => {
    return Service.post('/signup', { user });
}