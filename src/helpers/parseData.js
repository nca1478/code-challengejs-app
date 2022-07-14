export const parseData = (data) => {
  return data.files.map((item, i) => ({
    value: i,
    label: item,
  }))
}
