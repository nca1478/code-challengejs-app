// Dependencies
import { toast } from 'react-toastify'

// Custom Dependencies
import { types } from '../types/types'
import { parseData } from '../helpers/parseData'
import { get } from '../config/api'

export const startFileGetList = () => {
  return async (dispatch, getState) => {
    await get('/list')
      .then((response) => {
        if (response.data === null) {
          toast.error('No files found')
        } else {
          const filesList = parseData(response.data)
          dispatch(fileGetList(filesList))
        }
      })
      .catch((error) => {
        toast.error('Error try to fetching file list')
        console.log(error)
      })
  }
}

export const fileGetList = (files) => ({
  type: types.fileGetList,
  payload: files,
})

export const startFileGetData = (filename, setLoading) => {
  return async (dispatch, getState) => {
    setLoading(true)
    await get(`/data?filename=${filename}`)
      .then((response) => {
        if (response.data === null) {
          toast.error(`${filename} is empty or not found`)
        } else {
          dispatch(fileSetActive(response.data))
          dispatch(fileLoaded())
        }
      })
      .catch((error) => {
        toast.error('Error try to fetching file data')
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }
}

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
