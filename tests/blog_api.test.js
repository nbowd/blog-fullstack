const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const baseUrl = '/api/blogs'

beforeEach(async () => {
  await Blog.deleteMany({})
  // Creates new array of mongoose objects using the Blog constructor
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  
  // New array of promises by calling .save() on each
  const promiseArray = blogObjects.map(blog => blog.save())

  // Transforms an array of promises into a SINGLE promise when ALL have completed
  await Promise.all(promiseArray)
})

describe('when there are some blogs saved initially', () => {
  test('blogs are returned as json', async () => {
    await api
      .get(baseUrl)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('All blogs returned', async () => {
    const response = await api.get(baseUrl)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('Contains a specific test title', async () => {
    const response = await api.get(baseUrl)
    const titles = response.body.map(r => r.title)
    expect(titles).toContain('React patterns')
  })

  test('Right id is defined. Not _id', async () => {
    const response = await api.get(baseUrl)
    expect(response.body[0].id).toBeDefined()
  })

})

describe('adding a post', () => {
  test('successfully creates new blog post', async () => {
    const newBlog = {
      title: 'test title',
      author: 'chucasdf',
      url: 'asdlfasdlfkj',
      likes: '90'
    }

    await api
      .post(baseUrl)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const response = await api.get(baseUrl)
    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('test title')
  })

  test('new blog missing likes is defaulted to 0', async () => {
    const newBlog = {
      title: 'missing',
      author: 'the likes',
      url: 'property'
      // missing likes
    }

    await api
      .post(baseUrl)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get(baseUrl)

    expect(response.body[response.body.length - 1].likes).toBe(0)
  })

  test('blog missing title/url is not added', async () => {
    // No Title
    const newBlog = {
      author: 'missing',
      likes: 12
    }

    await api
      .post(baseUrl)
      .send(newBlog)
      .expect(400)

    const currentBlogs = await helper.blogsInDb()
    expect(currentBlogs).toHaveLength(helper.initialBlogs.length)
    
  })
})

// SAMPLE BAD POST URL IS TOO SHORT RETURNS BLOG VALIDATION ERROR
// test('successfully creates new blog post', async () => {
//   const newBlog = {
//     title: 'test title 2',
//     author: 'chuc',
//     url: 'bad',
//     likes: '90'
//   }

//   await api
//     .post(baseUrl)
//     .send(newBlog)
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
  
//   const response = await api.get(baseUrl)
//   const titles = response.body.map(r => r.title)
//   expect(titles).toContain('test title')
// })


// test('blog length', async () => {
//   const response = await api.get('/api/blogs')
//   expect(response.body).toHaveLength(2)
// })

afterAll(() => {
  mongoose.connection.close()
}, 10000)