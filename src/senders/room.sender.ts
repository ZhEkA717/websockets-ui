import { saveRoom } from "../services/room.service";
import { TypePlayer } from "../types/player.type";
import { TypeResponseUpdateRoom, TypeRoom } from "../types/room.type"
import { CommandTypes, players, rooms } from "../utils/constants";

export const createRoom = (index: number, roomId: number) => {
    const { name } = players.find(item => item.id === index) as TypePlayer;
    const roomUsers = [{ name, index }];
    const newRoom: TypeRoom = {roomId, roomUsers};
    const isSave = saveRoom(newRoom);
    isSave && updateRoom();   
}

export const updateRoom = () => {
    const roomsWithOnePlayer = rooms.filter(item => item.roomUsers.length === 1);

    const responseUpdateRoom: TypeResponseUpdateRoom = {
        type: CommandTypes.updateRoom,
        data: JSON.stringify(roomsWithOnePlayer),
        id: 0
    }

    players.forEach( ({ws}) => {
        ws.send(JSON.stringify(responseUpdateRoom));
    })
}