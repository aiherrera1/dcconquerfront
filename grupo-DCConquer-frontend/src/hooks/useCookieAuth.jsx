import { useContext } from 'react';
import { cookieAuth } from '../contexts/cookieAuth';

export default () => useContext(cookieAuth);
