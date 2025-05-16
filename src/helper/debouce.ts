export function debounceWrapper(callback: (text: string) => void, timeout = 250) {
  let id: undefined | number
  return (text: string) => {
    clearTimeout(id)
    id = setTimeout(() => {
      callback(text)
    }, timeout)
  }
}
