import { TypeRoom } from "../types/room.type";
import { rooms } from "../utils/constants";

export const saveRoom = (room: TypeRoom):boolean => {
    const { roomId } = room;

    const isExist = rooms.find(item => item.roomId === roomId);
    
    if (!isExist) rooms.push(room);

    return !isExist;
}

export const deleteRoom = (id: number) => {
    const room = rooms.find(item => item.roomId === id);

    if (room) {
        const index = rooms.indexOf(room);
        rooms.splice(index, 1);
    }
}