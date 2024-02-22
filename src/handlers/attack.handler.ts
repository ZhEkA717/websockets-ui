import { attackResponse } from '../senders/attack.sender';
import { finish } from '../senders/finish.sender';
import { turn } from '../senders/turn.sender';
import { updateWinners } from '../senders/updateWinners.sender';
import { attackPlayer } from '../services/attack.service';
import { isFinish } from '../services/finish.service';
import { deleteRoom, searchRoomByIdPlayer } from '../services/room.service';
import { searchShip } from '../services/ship.service';
import { TypeDataRequestAttack, TypeRequestAttack, TypeRequestRandomAttack, TypeStatusAttack } from '../types/attack.type';
import { TypeModifyShips, TypeShip, TypeShipData, TypeStatusShip } from '../types/ship.type';
import { CommandTypes, ID_VALUE, ShipStatus, turnInGame } from '../utils/constants';

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
      turn(gameId);
    }
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

export const shipExplosion = (
  player: TypeShipData,
  { indexPlayer, gameId, x, y }: TypeDataRequestAttack,
  type: CommandTypes,
) => {
  let position: { x: number; y: number; status: TypeStatusShip } | undefined;
  const isShot = player.shipsModified.find(({ positions }) => {
    position = positions.find((pos) => pos.x === x && pos.y === y);
    return position;
  });

  const { positions } = isShot as TypeModifyShips;

  const index = position && isShot?.positions.indexOf(position);

  const direction = index && player.ships[index].direction;
  const explosionArray: { x: number; y: number; status: TypeStatusAttack }[] = [];
  positions.forEach(({ x, y }) => {
    const status = ShipStatus.miss;
    explosionArray.push({ x: x - 1, y , status });
    explosionArray.push({ x: x + 1, y, status });  
    explosionArray.push({ x, y: y - 1 , status });
    explosionArray.push({ x, y: y + 1, status });  
    explosionArray.push({ x: x - 1, y: y - 1, status });
    explosionArray.push({ x: x + 1, y: y + 1, status });
    explosionArray.push({ x: x - 1, y: y + 1, status });
    explosionArray.push({ x: x + 1, y: y - 1, status });
  });
  positions.forEach(({ x, y }, i) => {
    const status = ShipStatus.killed;
    explosionArray.forEach(item => {
      if (item.x === x && item.y === y) {
        item.status = status;
      }
    })
  });

  explosionArray.forEach(({ x, y, status }) => {
    attackResponse({ indexPlayer, gameId, x, y }, status, type);
  });
};
