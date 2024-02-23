import { attackResponse } from '../senders/attack.sender';
import { finish } from '../senders/finish.sender';
import { currentPlayer, turn } from '../senders/turn.sender';
import { updateWinners } from '../senders/updateWinners.sender';
import { attackPlayer } from '../services/attack.service';
import { isFinish } from '../services/finish.service';
import { deleteRoom, searchRoomByIdPlayer } from '../services/room.service';
import { searchShip, shipExplosion } from '../services/ship.service';
import { TypeDataRequestAttack, TypeRequestAttack, TypeRequestRandomAttack, TypeStatusAttack } from '../types/attack.type';
import { TypeShip, TypeShipData } from '../types/ship.type';
import { CommandTypes, ID_VALUE, ShipStatus, turnInGame } from '../utils/constants';
import { eventEmitter } from './singlePlay.handler';

export const attackRequest = (msg: string) => {
  const { type, data } = JSON.parse(msg) as TypeRequestAttack;
  const { indexPlayer, gameId, x, y } = JSON.parse(data as string) as TypeDataRequestAttack;
  const ship = searchShip(gameId) as TypeShip;
  const player = ship.data.find((item) => item.id !== indexPlayer) as TypeShipData;
  if (indexPlayer === turnInGame[gameId]) {
    const status = attackPlayer(player, x, y);
    status && attackResponse({ indexPlayer, gameId, x, y }, status, type);
    status === ShipStatus.killed && shipExplosion(player, { indexPlayer, gameId, x, y }, type);
    if (isFinish(gameId)) {
      finish(ship?.data, indexPlayer);
      const room = searchRoomByIdPlayer(indexPlayer);
      room && deleteRoom(room.roomId);
      updateWinners();
      return;
    }
  
    if (status !== ShipStatus.shot && status !== ShipStatus.killed) {
      status && turn(gameId); 
    }
    eventEmitter.emit(CommandTypes.attack, currentPlayer);
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
