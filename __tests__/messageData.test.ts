// __tests__/messageData.test.ts

import { messagesData, Message } from '../script/messageData'

describe('messageData', () => {
  it('should export an array of messages', () => {
    expect(Array.isArray(messagesData)).toBe(true)
    expect(messagesData.length).toBeGreaterThan(0)
  })

  it('each message should have required fields', () => {
    messagesData.forEach((msg: Message) => {
      expect(msg).toHaveProperty('id')
      expect(msg).toHaveProperty('sender')
      expect(msg).toHaveProperty('preview')
      expect(typeof msg.id).toBe('string')
      expect(typeof msg.sender).toBe('string')
      expect(typeof msg.preview).toBe('string')
    })
  })

  it('each message id should be unique', () => {
    const ids = messagesData.map((m) => m.id)
    const unique = new Set(ids)
    expect(unique.size).toBe(ids.length)
  })

  it('sender names should not be empty', () => {
    messagesData.forEach((msg) => {
      expect(msg.sender.trim().length).toBeGreaterThan(0)
    })
  })
})
