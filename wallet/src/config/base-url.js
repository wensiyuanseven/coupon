// const SERVER_URL = process.env.NODE_ENV === 'production' ? 'https://api.1byongche.com:7101/v25' : 'http://101.132.26.45:8181'
const SERVER_URL = 'http://101.132.26.45:8089/v26'
// const SERVER_URL = 'http://192.168.0.108:8080/proxy'
// const SERVER_URL = 'http://192.168.0.117:8080'

const BASE_URL = process.env.NODE_ENV === 'production' ? SERVER_URL : 'http://192.168.0.108:8080/proxy'

export default BASE_URL
