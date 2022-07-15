const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000/files'

const get = (pathUrl) =>
  fetch(`${baseUrl}${pathUrl}`, {
    method: 'GET',
  }).then((res) => res.json())

export { get }
