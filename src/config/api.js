const baseUrl = process.env.REACT_APP_API_URL

const get = (pathUrl) =>
  fetch(`${baseUrl}${pathUrl}`, {
    method: 'GET',
  }).then((res) => res.json())

export { get }
