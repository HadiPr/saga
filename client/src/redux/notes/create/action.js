import { generateSagaAction, generateSagaWatcher } from "../../../helpers"

export const addNote = (title, {onSuccess}) => ({
     type: 'ADD_NOTE',
     request: {
          url: 'http://localhost:3001/notes',
          method: 'POST',
          data: {title},
     },
     onSuccess
})
export const addNoteWatcher = generateSagaWatcher('ADD_NOTE', generateSagaAction())