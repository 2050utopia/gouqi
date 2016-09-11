import {
  login,
  setCookie,
  getUserID
} from '../../lib/services/api.js'

import crypto from 'crypto'
import test from 'ava'

test('getUserID return null', (t) => {
  t.is(getUserID(), null)
})

test('setCookie can change header', (t) => {
  const randomStr = crypto.randomBytes(20).toString('hex')
  const request = setCookie(randomStr)
  t.deepEqual(request.defaults.headers.common['Cookie'], randomStr)
})

test('email login works', async (t) => {
  const { config } = await login('苟', '岂')
  t.is(config.url, 'http://music.163.com/weapi/login/')
})

test('should login algorithm works', async (t) => {
  const { data, headers } = await login('18502080838', 'if(country)noEsc')
  setCookie(headers['set-cookie'])
  t.is(data.code, 200)
})
