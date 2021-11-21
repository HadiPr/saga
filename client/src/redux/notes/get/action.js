import { generateSagaAction, generateSagaWatcher } from "../../../helpers";


export const getNotes = () => ({
     type: 'GET_NOTES',
     request: {
          url: 'http://localhost:3001/notes',
          method: 'GET',
     },
})
export const getNotesWatcher = generateSagaWatcher('GET_NOTES', generateSagaAction())