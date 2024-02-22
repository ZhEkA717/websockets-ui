import { attackResponse } from '../senders/attack.sender';
import { attackPlayer } from '../services/attack.service';
import { searchShip } from '../services/ship.service';
import { TypeDataRequestAttack, TypeRequestAttack, TypeRequestRandomAttack } from '../types/attack.type';
import { TypeShip, TypeShipData } from '../types/ship.type';
import { CommandTypes, ID_VALUE, turnInGame } from '../utils/constants';

export const attackRequest = (msg: string) => {
  const { data } = JSON.parse(msg) as TypeRequestAttack;
  const { indexPlayer, gameId, x, y } = JSON.parse(data as string) as TypeDataRequestAttack;
  const ship = searchShip(gameId) as TypeShip;
  const player = ship.data.find((item) => item.id !== indexPlayer) as TypeShipData;
  if (indexPlayer === turnInGame[gameId]) {
    const status = attackPlayer(player, x, y);
    status && attackResponse({ indexPlayer, gameId, x, y }, status);
  }
};

export const randomAttackRequest = (msg: string) => {
  const req = JSON.parse(msg) as TypeRequestRandomAttack;
  const data = JSON.parse(req.data as string);
  const [x, y] = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
  const newReq: TypeRequestAttack = {
    type: CommandTypes.attack,
    data: JSON.stringify({ ...data, x, y }),
    id: ID_VALUE,
  };

  attackRequest(JSON.stringify(newReq));
};
