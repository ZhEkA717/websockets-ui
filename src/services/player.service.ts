import { WebSocket } from 'ws';
import { TypePlayer } from '../types/player';
import { players } from '../utils/constants';


export const deletePlayer = (id:number) => {
    const player: TypePlayer | undefined = players.find(item => item.id === id);

    if (player) {
        const index: number = players.indexOf(player);
        players.splice(index, 1);
    }
}

export const savePlayer = (id: number, name: string, ws: WebSocket): boolean => {
    const isExist: TypePlayer | undefined = players.find((item) => item.name === name);
  
    if (!isExist) players.push({ id, name, ws });
    return !!isExist;
  };
