import Cookies from 'js-cookie'

const originSet = Cookies.set
const cookie = Cookies
cookie.set = function (
  name: string,
  value: string,
  opt: Cookies.CookieAttributes = {}
) {
  const _opt: Cookies.CookieAttributes = {
    expires: 720,
    ...opt,
  }
  return originSet(name, value, _opt)
}

export default cookie
