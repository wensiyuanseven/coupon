export default function fillParams(url, params) {
  let index = 0
  return url.split(/{|}/).map(item => {
    if (item && !(/\//.test(item))) {
      return params[index++]
    }
    return item
  }).filter(item => item).join('')
}