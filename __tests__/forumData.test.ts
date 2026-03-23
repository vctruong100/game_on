// __tests__/forumData.test.ts

import { forumData, addPost, deletePost, updatePost, CURRENT_USER_ID, ForumPost } from '../script/forumData'

describe('forumData', () => {
  const originalLength = forumData.length

  afterEach(() => {
    // Reset forumData to original state after each test
    while (forumData.length > originalLength) {
      forumData.shift()
    }
  })

  it('should have initial forum posts', () => {
    expect(forumData.length).toBeGreaterThan(0)
  })

  it('should have correct ForumPost shape', () => {
    const post = forumData[0]
    expect(post).toHaveProperty('id')
    expect(post).toHaveProperty('userId')
    expect(post).toHaveProperty('author')
    expect(post).toHaveProperty('message')
    expect(post).toHaveProperty('time')
    expect(post).toHaveProperty('location')
    expect(post).toHaveProperty('sport')
    expect(post).toHaveProperty('needed')
  })

  it('should export CURRENT_USER_ID as a string', () => {
    expect(typeof CURRENT_USER_ID).toBe('string')
    expect(CURRENT_USER_ID.length).toBeGreaterThan(0)
  })

  it('addPost should prepend a post with CURRENT_USER_ID', () => {
    const before = forumData.length
    addPost({
      id: 'test-1',
      author: 'TestUser',
      message: 'Test message',
      time: '1:00PM',
      location: 'Test Park',
      sport: 'Tennis',
      needed: '2 more',
    })
    expect(forumData.length).toBe(before + 1)
    expect(forumData[0].id).toBe('test-1')
    expect(forumData[0].userId).toBe(CURRENT_USER_ID)
  })

  it('deletePost should remove a post by id', () => {
    const idToDelete = forumData[forumData.length - 1].id
    const before = forumData.length
    deletePost(idToDelete)
    expect(forumData.length).toBe(before - 1)
    expect(forumData.find((p) => p.id === idToDelete)).toBeUndefined()
  })

  it('updatePost should modify an existing post', () => {
    const target = forumData[0]
    const updatedMessage = 'Updated message content'
    updatePost({ ...target, message: updatedMessage })
    const found = forumData.find((p) => p.id === target.id)
    expect(found?.message).toBe(updatedMessage)
  })

  it('deletePost with non-existent id should not change length', () => {
    const before = forumData.length
    deletePost('non-existent-id-999')
    expect(forumData.length).toBe(before)
  })
})
