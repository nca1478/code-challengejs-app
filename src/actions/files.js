import { types } from '../types/types'

export const fileGetList = (files) => ({
  type: types.fileGetList,
  payload: files,
})

export const fileSetActive = (file) => ({
  type: types.fileSetActive,
  payload: file,
})

export const fileClearActive = () => ({
  type: types.fileClearActive,
})

export const fileLoaded = () => ({
  type: types.fileLoaded,
})

export const fileUnloaded = () => ({
  type: types.fileUnloaded,
})
