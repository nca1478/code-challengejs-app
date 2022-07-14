// Dependencies
import { Form } from 'react-bootstrap'
import Select from 'react-select'

export const SelectForm = (props) => {
  return (
    <Form.Group className="my-3" controlId={props.controlId}>
      <Select
        className="mb-2 selectform"
        value={props.value}
        options={props.options}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </Form.Group>
  )
}
