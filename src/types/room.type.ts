import { CommandTypes } from "../utils/constants";

export type TypeRequestCreateRoom = {
    type: CommandTypes.createRoom,
    data: string,
    id: 0
}

export type TypeResponseUpdateRoom = {
    type: CommandTypes.updateRoom,
    data: TypeRoom[] | string,
    id: 0
}

export type TypeRoom = {
    roomId: number,
    roomUsers: {
        name: string,
        index: number
    }[]
}