import { isFinish } from "../services/attack.service";
import { searchShip } from "../services/ship.service";
import { TypeDataRequestAttack, TypeDataResponseAttack, TypeStatusAttack } from "../types/attack.type";
import { CommandTypes, ID_VALUE, ShipStatus } from "../utils/constants";
import { finishResponse } from "./finish.sender";
import { turn } from "./turn.sender";

export const attackResponse = (data: TypeDataRequestAttack, status: TypeStatusAttack) => {
    const { indexPlayer, gameId, x, y } = data;
    const shipInGame = searchShip(gameId);

    shipInGame?.data.forEach(item => {
        const data: TypeDataResponseAttack = {
            position: {x, y},
            currentPlayer: indexPlayer,
            status
        }
        const response = {
            type: CommandTypes.attack,
            data: JSON.stringify(data),
            id: ID_VALUE
        }

        item.ws.send(JSON.stringify(response));
    })

    if (isFinish(gameId)) {
        shipInGame?.data.forEach(({ws}) => {
            ws.send(finishResponse(indexPlayer));
        })
        return;
    }

    if (status !== ShipStatus.shot && status !== ShipStatus.killed) {
        turn(gameId);
    }
}