import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // Adjust the server URL if needed

export default socket;
