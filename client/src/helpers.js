import { call, put, takeLatest } from "redux-saga/effects"
import axios from "axios"

const startProgress = action => `_${action}`
const fail = action => `${action}__fail__`
const reset = action => `${action}__reset__`
const success = action => `${action}__success__`

export function generateReducer(type) {
     const initState = {
          data: null,
          loading: false,
          hasError: false,
          errorMessage: '',
          message: '',
     }
     return function (state = initState, action) {
          switch (action.type) {
               case startProgress(type):
                    return { ...state, loading: true }
               case success(type):
                    const data = action.payload
                    return { ...state, loading: false, data }
               case fail(type):
                    const { errorMessage } = action.payload
                    return { ...state, errorMessage, hasError: true, }
               case reset(type):
                    return initState
               default:
                    return state
          }
     }
}
//===============================================================================


export const generateSagaAction = () => function* sagaAction(action) {
     if (!action.request) {
          throw new Error("action should have request");
     }
     yield put({ type: startProgress(action.type) })
     try {
          const request = {
               ...action.request,
               headers: { Authorization: `Bearer token for example` }
          }
          const { data } = yield call(axios, request)
          action.onSuccess && action.onSuccess()
          yield put({ type: success(action.type), payload: data })
     } catch (error) {
          if (error.response?.status === 401) {
               try {
                    const {data: response} = yield call(()=>{}) // get token
                    console.log(response) //set token for example
                    yield takeLatest(action, sagaAction);
               } catch (e) {
                    // clear cookies
                    // history.push("/");
               }
          }
          if (error.response?.status === 500) {
               // history.push("/500");
          }
          const payload = { hasError: true, errorMessage: error.message }
          yield put({ type: fail(action.type), payload })
     }
}
export const generateSagaWatcher = (actionType, handler) => function* () {
     yield takeLatest(actionType, handler)
}