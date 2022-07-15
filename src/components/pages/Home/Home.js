// Dependencies
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Button } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import queryString from 'query-string'

// Custom Dependencies
import { MainNavbar } from '../../common/MainNavbar/MainNavbar'
import { MainTable } from '../../common/MainTable/MainTable'
import { SelectForm } from '../../common/SelectForm/SelectForm'
import { Loader } from '../../common/Spinners/Loader'
import {
  fileClearActive,
  fileUnloaded,
  startFileGetList,
  startFileGetData,
} from '../../../actions/files'

export const Home = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { listFiles, activeFile, loaded } = useSelector((state) => state.files)
  const { filename = '' } = queryString.parse(location.search)
  const [fileSelected, setFileSelected] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    dispatch(startFileGetList())
  }, [dispatch])

  useEffect(() => {
    if (filename.length > 0) {
      dispatch(startFileGetData(filename, setLoading))
    }
  }, [filename, dispatch])

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
          <Button variant="danger" onClick={handleReset} className="mb-3">
            Reset
          </Button>
        </div>
      </Container>

      <ToastContainer />
    </>
  )
}
