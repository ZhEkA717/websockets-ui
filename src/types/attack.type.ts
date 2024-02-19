import { CommandTypes, ID_TYPE } from "../utils/constants"

export type TypeRequestAttack = {
    type: CommandTypes.attack,
    data: TypeDataRequestAttack | string,
    id: ID_TYPE,
}

export type TypeDataRequestAttack = {
    gameId: number,
    x: number,
    y: number,
    indexPlayer: number
}

export type TypeResponseAttack = {
    type: CommandTypes.attack,
    data: TypeDataResponseAttack | string
}

export type TypeDataResponseAttack = {
    position: {
        x: number,
        y: number,
    },
    currentPlayer: number,
    status: TypeStatusAttack;
}

export type TypeStatusAttack = "miss" | "killed" | "shot";