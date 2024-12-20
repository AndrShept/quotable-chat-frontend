import { io } from 'socket.io-client';

import { SOCKET_URL } from './constants';

// "undefined" means the URL will be computed from the `window.location` object

export const socket = io(SOCKET_URL!);
