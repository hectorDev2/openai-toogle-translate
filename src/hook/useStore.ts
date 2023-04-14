import { log } from 'console'
import { useReducer } from 'react'
import { ActionType } from '../interfaces/enum'
import { Action, FromLanguages, Language, State } from '../interfaces/types'

export const initialState: State = {
  fromLanguage: 'en',
  toLanguage: 'es',
  fromText: '',
  result: '',
  loading: false,
  error: false
}
//make a reducer


const reducer = (
  state: State = initialState,
  /* :typeof initialState */ action: Action
) => {
  if (action.type === ActionType.INTERCHANGE_LANGUAGE) {
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }
  if (action.type === ActionType.SET_FROM_LANGUAGE) {
    if(state.fromLanguage===action.payload) return state
    const loading=state.fromText.length>0
    console.log('loading',loading);
    
    return { ...state, fromLanguage: action.payload,loading }
  }
  if (action.type === ActionType.SET_TO_LANGUAGE) {
    if(state.fromLanguage===action.payload) return state
    const loading=state.fromText.length>0
    return { ...state, toLanguage: action.payload,loading }
  }
  if (action.type === ActionType.SET_FROM_TEXT) {
    if(state.fromLanguage===action.payload) return state
    const loading=state.fromText.length>1
    return { ...state, fromText: action.payload,loading }
  }
  if (action.type === ActionType.SET_RESULT) {
    return { ...state, result: action.payload,loading:false }
  }
}

export function useStore () {
  const [state, dispatch] = useReducer(reducer, initialState)
  if (!state) {
    throw new Error('State is null or undefined')
  }

  const { fromLanguage, fromText, toLanguage, result,loading } = state

  function interChangeLanguage () {
    if (fromLanguage === 'auto') return
    dispatch({ type: ActionType.INTERCHANGE_LANGUAGE })
  }

  function setToLanguage (payload: Language) {
    dispatch({ type: ActionType.SET_TO_LANGUAGE, payload })
  }

  function setFromLanguage (payload: FromLanguages) {
    dispatch({ type: ActionType.SET_FROM_LANGUAGE, payload })
  }

  function setFromText (payload: string) {
    dispatch({ type: ActionType.SET_FROM_TEXT, payload })
  }

  function setResult (payload: string) {
    dispatch({ type: ActionType.SET_RESULT, payload })
  }



  return {
    fromLanguage,
    fromText,
    toLanguage,
    result,
    loading,
    setToLanguage,
    interChangeLanguage,
    setFromLanguage,
    setFromText,
    setResult,
  }
}
