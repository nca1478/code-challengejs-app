// Dependencies
import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fileClearActive, fileUnloaded } from '../../../actions/files'

export const MainNavbar = () => {
  const dispatch = useDispatch()

  const handleReset = () => {
    dispatch(fileClearActive())
    dispatch(fileUnloaded())
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="navbar-brand" onClick={handleReset}>
            Fullstack JS - Code Challenge
          </Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}
