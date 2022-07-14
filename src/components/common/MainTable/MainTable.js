import React from 'react'
import { Table } from 'react-bootstrap'

export const MainTable = (props) => {
  const { fileData } = props
  return (
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th className="text-center">Filename</th>
          <th>Text</th>
          <th>Number</th>
          <th>Hex</th>
        </tr>
      </thead>
      <tbody>
        {fileData.lines.map((f) => {
          return (
            <tr key={f.hex}>
              <td className="text-center">{fileData.file}</td>
              <td>{f.text}</td>
              <td>{f.number}</td>
              <td>{f.hex}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}
