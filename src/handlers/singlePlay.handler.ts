import { WebSocket } from 'ws';
import { CommandTypes, ID_VALUE, players } from '../utils/constants';
import { TypePlayer } from '../types/player.type';
import { createGame } from '../senders/game.sender';
import { createRoomWithBot, getRandom, getShips } from '../services/bot.service';
import { TypeRequestAddShips, TypeRequestDataAddShips, TypeShip, TypeShipData } from '../types/ship.type';
import { savePlayer } from '../services/player.service';
import { v4 } from 'uuid';
import { EventEmitter } from 'events';
import { attackRequest } from './attack.handler';
import { addShipRequest } from './ship.handler';
import { TypeDataRequestAttack, TypeRequestAttack } from '../types/attack.type';

export const eventEmitter = new EventEmitter();

export const singlePlayRequest = async (msg: string, ws: WebSocket) => {
  const player: TypePlayer | undefined = players.find((item) => item.ws === ws);
  const { name, id: index } = player as TypePlayer;
  const nameBot = v4();
  const { id } = await savePlayer({
    name: nameBot,
    password: v4(),
  });

  const roomId = createRoomWithBot({ name, index }, { name: nameBot, index: id });
  const gameId = createGame(roomId);
  const ships = getShips();

  const data: TypeRequestDataAddShips = { gameId, ships, indexPlayer: id };
  const resBot: TypeRequestAddShips = {
    type: CommandTypes.addShips,
    data: JSON.stringify(data),
    id: ID_VALUE,
  };
  addShipRequest(JSON.stringify(resBot));

  eventEmitter.on(CommandTypes.attack, (currentPlayer) => {
    console.log(currentPlayer === id);
    if (currentPlayer === id) {
      console.log(currentPlayer);
      setTimeout(() => {
        const {x, y} = generatePos();
        botAttack(gameId, id, {x, y});
      }, 0);
    }
  });
};

const botAttack = (gameId: number, indexPlayer: number, {x, y}: {x: number, y: number}) => {
  const data: TypeDataRequestAttack = { gameId, indexPlayer, x, y }; 
  attackRequest(
    JSON.stringify({
      type: CommandTypes.attack,
      data: JSON.stringify(data),
      id: ID_VALUE,
    } as TypeRequestAttack),
  );
}

const generatePos = (): {x: number, y: number} => {
  const x = getRandom(9);
  const y = getRandom(9);

  return {x, y};
}