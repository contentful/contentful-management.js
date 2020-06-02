import test from 'blue-tape'
import errorHandler from '../../lib/error-handler'
import { cloneMock } from './mocks/entities'

// Best case scenario where an error is a known and expected situation and the
// server returns an error with a JSON payload with all the information possible
test('Throws well formed error with details from server', (t) => {
  const error = cloneMock('error')
  error.response.data = {
    sys: {
      id: 'SpecificError',
      type: 'Error',
    },
    message: 'datamessage',
    requestId: 'requestid',
    details: 'errordetails',
  }

  try {
    errorHandler(error)
  } catch (err) {
    const parsedMessage = JSON.parse(err.message)
    t.equals(err.name, 'SpecificError', 'error name')
    t.equals(parsedMessage.request.url, 'requesturl', 'request url')
    t.equals(parsedMessage.message, 'datamessage', 'error payload message')
    t.equals(parsedMessage.requestId, 'requestid', 'request id')
    t.equals(parsedMessage.details, 'errordetails', 'error payload details')
  }
  t.end()
})

// Second best case scenario, where we'll still get a JSON payload from the server
// but only with an Unknown error type and no additional details
test('Throws unknown error received from server', (t) => {
  const error = cloneMock('error')
  error.response.data = {
    sys: {
      id: 'Unknown',
      type: 'Error',
    },
    requestId: 'requestid',
  }
  error.response.status = 500
  error.response.statusText = 'Internal'

  try {
    errorHandler(error)
  } catch (err) {
    const parsedMessage = JSON.parse(err.message)
    t.equals(err.name, '500 Internal', 'error name defaults to status code and text')
    t.equals(parsedMessage.request.url, 'requesturl', 'request url')
    t.equals(parsedMessage.requestId, 'requestid', 'request id')
  }
  t.end()
})

// Wurst case scenario, where we have no JSON payload and only HTTP status information
test('Throws error without additional detail', (t) => {
  const error = cloneMock('error')
  error.response.status = 500
  error.response.statusText = 'Everything is on fire'

  try {
    errorHandler(error)
  } catch (err) {
    const parsedMessage = JSON.parse(err.message)
    t.equals(err.name, '500 Everything is on fire', 'error name defaults to status code and text')
    t.equals(parsedMessage.request.url, 'requesturl', 'request url')
  }
  t.end()
})

test('Obscures management token in any error message', (t) => {
  const responseError = cloneMock('error')
  responseError.config.headers = {
    Authorization: 'Bearer secret-management-token',
  }

  try {
    errorHandler(responseError)
  } catch (err) {
    const parsedMessage = JSON.parse(err.message)
    t.equals(
      parsedMessage.request.headers.Authorization,
      'Bearer ...token',
      'Obscures management token'
    )
  }

  const requestError = {
    config: {
      url: 'requesturl',
      headers: {},
    },
    data: {},
    request: {
      status: 404,
      statusText: 'Not Found',
    },
  }

  requestError.config.headers = {
    Authorization: 'Bearer secret-management-token',
  }

  try {
    errorHandler(requestError)
  } catch (err) {
    t.equals(err.config.headers.Authorization, 'Bearer ...token', 'Obscures management token')
  }
  t.end()
})
