import { searchShip } from '../services/ship.service';
import { TypeDataRequestAttack, TypeDataResponseAttack, TypeStatusAttack } from '../types/attack.type';
import { CommandTypes, ID_VALUE, ShipStatus } from '../utils/constants';
import { log } from '../services/log.service';

export const attackResponse = (data: TypeDataRequestAttack, status: TypeStatusAttack, type: CommandTypes) => {
  const { indexPlayer, gameId, x, y } = data;
  const shipInGame = searchShip(gameId);

  shipInGame?.data.forEach((item) => {
    const data: TypeDataResponseAttack = {
      position: { x, y },
      currentPlayer: indexPlayer,
      status,
    };
    const response = {
      type: CommandTypes.attack,
      data: JSON.stringify(data),
      id: ID_VALUE,
    };
    if (item.ws)
      item.ws.send(JSON.stringify(response));
  });

  log(type, indexPlayer, status);
};
