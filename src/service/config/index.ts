let BASE_URL = ''

if (import.meta.env.PROD) {
  // 生产环境
  BASE_URL = 'http://10.1.0.107:12581/api'
} else {
  // 开发环境
  BASE_URL = 'http://10.1.0.107:12581/api'
}

export const TIME_OUT = 5000

export { BASE_URL }
