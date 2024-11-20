import logger from '../utils/logger'

describe('Logger', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should call console.log with correct arguments for info', () => {
    logger.info('Info message', { key: 'value' })

    expect(console.log).toHaveBeenCalledTimes(1)
    expect(console.log).toHaveBeenCalledWith('Info message', { key: 'value' })
  })

  it('should call console.error with correct arguments for error', () => {
    logger.error('Error message', { key: 'Test error' })

    expect(console.error).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenCalledWith('Error message', {
      key: 'Test error',
    })
  })
})
