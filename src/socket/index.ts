import { io, Socket } from 'socket.io-client';

const url = 'http://localhost:4000'

const socket: Socket = io(url)

export default socket;
