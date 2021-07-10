const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')
const Blog = require('../models/blog')

const baseUrl = '/api/blogs'

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
 
})

describe('when database has initial blogs', () => {
  test('blogs are returned as json type', async () => {
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

  test('New id has been defined. Not default _id', async () => {
    const response = await api.get(baseUrl)
    expect(response.body[0].id).toBeDefined()
  })
})

describe('adding a post', () => {
  test('succeeds with valid data', async () => {
    const userLogin = await api.post('/api/login').send({ username: 'root', password:'sekret'})

    const usersAtStart = await helper.usersInDb()

    const newBlog = {
      title: 'test title',
      author: 'chucasdf',
      url: 'asdlfasdlfkj',
      likes: '90',
      userId: usersAtStart[0].id
    }

    await api
      .post(baseUrl)
      .send(newBlog)
      .set('Authorization', `bearer ${userLogin.body.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const response = await api.get(baseUrl)
    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('test title')
  })

  test('succeeds missing likes: defaulted to 0', async () => {
    const userLogin = await api.post('/api/login').send({ username: 'root', password:'sekret'})

    const usersAtStart = await helper.usersInDb()

    const newBlog = {
      title: 'missing',
      author: 'the likes',
      url: 'property',
      // missing likes
      userId: usersAtStart[0].id
    }

    await api
      .post(baseUrl)
      .send(newBlog)
      .set('Authorization', `bearer ${userLogin.body.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get(baseUrl)

    expect(response.body[response.body.length - 1].likes).toBe(0)
  })

  test('fails if token is not provided', async () => {
    const usersAtStart = await helper.usersInDb()

    const newBlog = {
      title: 'test title',
      author: 'chucasdf',
      url: 'asdlfasdlfkj',
      likes: '90',
      userId: usersAtStart[0].id
    }

    await api
      .post(baseUrl)
      .send(newBlog)
      .expect(401)
    

    const currentBlogs = await helper.blogsInDb()
    expect(currentBlogs).toHaveLength(helper.initialBlogs.length)
  })

  test('fails with status code 400 if invalid/missing data', async () => {
    const userLogin = await api.post('/api/login').send({ username: 'root', password:'sekret'})

    const newBlog = {
      author: 'missing',
      likes: 12
    }

    await api
      .post(baseUrl)
      .send(newBlog)
      .set('Authorization', `bearer ${userLogin.body.token}`)
      .expect(400)

    const currentBlogs = await helper.blogsInDb()
    expect(currentBlogs).toHaveLength(helper.initialBlogs.length)
    
  })
})

// User tests
describe('when there is initially one user in db', () => {
  test('get users returns json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

  })
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

test('creation fails with proper status code and message if username already taken', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'root',
    name: 'Superuser',
    password: 'salainen',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('`username` to be unique')

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})

test('creation fails with status code 400 if invalid data', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'hi',
    name: 'Sleepy',
    password: 'ho'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})



afterAll(() => {
  mongoose.connection.close()
}, 10000)