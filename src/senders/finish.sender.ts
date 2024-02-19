import { TypeFinishResponse } from "../types/finish.type"
import { CommandTypes, ID_VALUE } from "../utils/constants"

export const finishResponse = (idPlayer: number):string => {
    const response: TypeFinishResponse = {
        type: CommandTypes.finish,
        data: JSON.stringify({
            winPlayer: idPlayer
        }),
        id: ID_VALUE
    }
    return JSON.stringify(response);
}