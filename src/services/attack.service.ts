import { TypeStatusAttack } from '../types/attack.type';
import { TypeShipData, TypeStatusShip } from '../types/ship.type';
import { ShipStatus } from '../utils/constants';
import { getLengthShip } from './ship.service';

export const attackPlayer = (player: TypeShipData, x: number, y: number): TypeStatusAttack | false => {
  let status: TypeStatusAttack = ShipStatus.miss;
  let position: { x: number; y: number; status: TypeStatusShip } | undefined;
  const isShot = player?.shipsModified.find(({ positions }) => {
    position = positions.find((pos) => pos.x === x && pos.y === y);
    return position;
  });

  const isShipKilled = isShot?.positions.some((item) => item.status === ShipStatus.killed);
  const isShipShot = position?.status === ShipStatus.shot;
  if (isShipKilled || isShipShot) return false;

  if (isShot && position) {
    position.status = ShipStatus.shot;
    status = ShipStatus.shot;
  }

  if (isShot && position && !getLengthShip(isShot)) {
    position.status = ShipStatus.killed;
    player.shipsAlive -= 1;
    status = ShipStatus.killed;
  }

  return status;
};
