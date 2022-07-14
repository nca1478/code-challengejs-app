import { types } from '../types/types'

const initialState = {
  listFiles: [],
  activeFile: null,
  loaded: false,
}

export const filesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.fileGetList:
      return {
        ...state,
        listFiles: [...action.payload],
      }

    case types.fileLoaded:
      return {
        ...state,
        loaded: true,
      }

    case types.fileUnloaded:
      return {
        ...state,
        loaded: false,
      }

    case types.fileSetActive:
      return {
        ...state,
        activeFile: action.payload,
      }

    case types.fileClearActive:
      return {
        ...state,
        activeFile: null,
      }

    default:
      return state
  }
}
