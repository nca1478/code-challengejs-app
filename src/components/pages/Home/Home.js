// Dependencies
import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { Container, Button } from 'react-bootstrap'
import queryString from 'query-string'

// Custom Dependencies
import { get } from '../../../config/api'
import { MainNavbar } from '../../common/MainNavbar/MainNavbar'
import { MainTable } from '../../common/MainTable/MainTable'
import { SelectForm } from '../../common/SelectForm/SelectForm'
import { parseData } from '../../../helpers/parseData'
import { Loader } from '../../common/Spinners/Loader'
import {
  fileClearActive,
  fileSetActive,
  fileGetList,
  fileLoaded,
  fileUnloaded,
} from '../../../actions/files'

export const Home = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { listFiles, activeFile, loaded } = useSelector((state) => state.files)
  const { filename = '' } = queryString.parse(location.search)
  const [fileSelected, setFileSelected] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchFiles = useCallback(async () => {
    await get('/')
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
  }, [dispatch])

  const fetchFileData = useCallback(async () => {
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
  }, [dispatch, filename])

  useEffect(() => {
    fetchFiles().catch(console.error)
  }, [fetchFiles])

  useEffect(() => {
    fetchFileData().catch(console.error)
  }, [filename, fetchFileData])

  const handleFilesChange = ({ value, label }) => {
    setFileSelected({ value, label })
    navigate(`?filename=${label}`)
    dispatch(fileUnloaded())
  }

  const handleReset = () => {
    dispatch(fileClearActive())
    dispatch(fileUnloaded())
    navigate('/', { replace: true })
  }

  return (
    <>
      <MainNavbar />

      <Container>
        <SelectForm
          controlId="formBasicFiles"
          value={fileSelected}
          options={listFiles}
          onChange={handleFilesChange}
          placeholder="Select the CSV file to display..."
        />

        {loading ? (
          <div className="d-flex justify-content-center">
            <Loader />
          </div>
        ) : null}

        {loaded ? <MainTable fileData={activeFile} /> : null}

        <div className="d-flex justify-content-end">
          <Button variant="danger" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </Container>

      <ToastContainer />
    </>
  )
}
