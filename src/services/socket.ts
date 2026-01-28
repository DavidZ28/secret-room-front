import {io, Socket} from 'socket.io-client'

class SocketService {

    private socket: Socket | null = null;
    private readonly URL = import.meta.env.VITE_WS_URL;

    connect() { 
        if (this.socket) return;

        this.socket = io(this.URL, {
            transports: ['websocket'],
            autoConnect: false,
            reconnection: false,
        })

        this.socket.connect();
    }

    disconnect() {
        if (!this.socket) return;

        this.socket.removeAllListeners();
        this.socket.disconnect();
        this.socket = null;
    }

    emit(event: string, payload: unknown) {
        if (!this.socket || !this.socket.connected) {
            throw new Error("Socket not connected");
        }

        this.socket.emit(event, payload);
    }

    isConnected() {
        return this.socket?.connected ?? false;
    }

    onConnect(handler: () => void) {
        this.socket?.on('connect', handler);
    }

    on<T = any>(event: string, handler: (payload: T) => void) {
        this.socket?.on(event, handler)
    }

    off<T = any>(event: string, handler: (payload: T) => void){
        this.socket?.off(event, handler)
    }
}

export const socketService = new SocketService();