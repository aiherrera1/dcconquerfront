import { useContext } from 'react';
import { tokenAuth } from '../contexts/tokenAuth';

export default () => useContext(tokenAuth);
