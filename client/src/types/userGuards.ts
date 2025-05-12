// utils/userGuards.ts
import type { UserState } from '../redux/slices/user/UserSlice';
import type { UserType } from './userTypes';

 const isLogged = (user: UserState): user is UserType & { status: 'logged' } =>
     user.status === 'logged';
 
 export default isLogged
