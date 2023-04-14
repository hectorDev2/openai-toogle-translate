import { type AUTO_LANGUAGE, type SUPPORTED_LANGUAGES } from './constants'
export type typeAutoDetect = typeof AUTO_LANGUAGE
export type Language = keyof typeof SUPPORTED_LANGUAGES
export type FromLanguages = Language | typeAutoDetect

export type Action =
  | {
      type: 'INTERCHANGE_LANGUAGE'
    }
  | { type: 'SET_FROM_LANGUAGE'; payload: FromLanguages | Language }
  | { type: 'SET_TO_LANGUAGE'; payload: Language | FromLanguages }
  | { type: 'SET_FROM_TEXT'; payload: string }
  | { type: 'SET_RESULT'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }

export interface State {
  fromLanguage: FromLanguages | Language
  toLanguage: Language | FromLanguages
  fromText: string
  result: string
  loading: boolean
  error: boolean
}

export type PropsInput =
  | {
      type: 'from'
      onChange: (language: FromLanguages) => void
      value: FromLanguages | Language
    }
  | {
      type: 'to'
      onChange: (language: Language) => void
      value: Language | FromLanguages
    }
