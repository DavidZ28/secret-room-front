const roomKeys = new Map();

export function saveRoomKey(roomId, key) {
    roomKeys.set(roomId, key);
}

export function getRoomKey(roomId) {
    return roomKeys.get(roomId);
}
