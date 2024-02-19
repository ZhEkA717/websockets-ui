import { attackResponse } from "../senders/attack.sender";
import { attackPlayer } from "../services/attack.service";
import { searchShip } from "../services/ship.service";
import { TypeDataRequestAttack, TypeRequestAttack } from "../types/attack.type"
import { TypeShip, TypeShipData } from "../types/ship.type";
import { turnInGame } from "../utils/constants";

export const attackRequest = (msg: string) => {
    const { data } = JSON.parse(msg) as TypeRequestAttack;
    const { indexPlayer, gameId, x, y } = JSON.parse(data as string) as TypeDataRequestAttack;
    const ship = searchShip(gameId) as TypeShip;
    const player = ship.data.find(item => item.id !== indexPlayer) as TypeShipData;
    if (indexPlayer === turnInGame[gameId]) {
        const status = attackPlayer(player, x, y);
        status && attackResponse({ indexPlayer, gameId, x, y }, status);
    }
}