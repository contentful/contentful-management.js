/* global expect, test */

import errorHandler from '../../lib/error-handler'
import {cloneMock} from './mocks/entities'

// Best case scenario where an error is a known and expected situation and the
// server returns an error with a JSON payload with all the information possible
test('Throws well formed error with details from server', () => {
  const error = cloneMock('error')
  error.response.data = {
    sys: {
      id: 'SpecificError',
      type: 'Error'
    },
    message: 'datamessage',
    requestId: 'requestid',
    details: 'errordetails'
  }

  try {
    errorHandler(error)
  } catch (err) {
    const parsedMessage = JSON.parse(err.message)
    expect(err.name).toBe('SpecificError')
    expect(parsedMessage.request.url).toBe('requesturl')
    expect(parsedMessage.message).toBe('datamessage')
    expect(parsedMessage.requestId).toBe('requestid')
    expect(parsedMessage.details).toBe('errordetails')
  }
})

// Second best case scenario, where we'll still get a JSON payload from the server
// but only with an Unknown error type and no additional details
test('Throws unknown error received from server', () => {
  const error = cloneMock('error')
  error.response.data = {
    sys: {
      id: 'Unknown',
      type: 'Error'
    },
    requestId: 'requestid'
  }
  error.response.status = 500
  error.response.statusText = 'Internal'

  try {
    errorHandler(error)
  } catch (err) {
    const parsedMessage = JSON.parse(err.message)
    expect(err.name).toBe('500 Internal')
    expect(parsedMessage.request.url).toBe('requesturl')
    expect(parsedMessage.requestId).toBe('requestid')
  }
})

// Wurst case scenario, where we have no JSON payload and only HTTP status information
test('Throws error without additional detail', () => {
  const error = cloneMock('error')
  error.response.status = 500
  error.response.statusText = 'Everything is on fire'

  try {
    errorHandler(error)
  } catch (err) {
    const parsedMessage = JSON.parse(err.message)
    expect(err.name).toBe('500 Everything is on fire')
    expect(parsedMessage.request.url).toBe('requesturl')
  }
})
