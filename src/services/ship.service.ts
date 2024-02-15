import { TypeShips } from "../types/ship.type"
import { shipsInGame } from "../utils/constants"

export const saveShip = (ships: TypeShips) => {
    shipsInGame.push(ships)
}
