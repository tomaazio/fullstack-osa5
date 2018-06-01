import React from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      title: '',
      author: '',
      url: '',
      message: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  login = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      console.log(exception)
      this.setState({
        message: 'wrong username or password',
        username: '',
        password: ''
      })
      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)
    }
  }

  logout = () => {
    window.localStorage.removeItem('loggedUser')
    this.setState({ user: null })
  }


  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addNewBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }

    const newBlog = await blogService.create(blogObject)
    this.setState((prevState) => {
      return {
        blogs: prevState.blogs.concat(newBlog),
        title: '',
        author: '',
        url: '',
        message: `a new blog ${newBlog.title} by ${newBlog.author} added`
      }
    })
    setTimeout(() => {
      this.setState({ message: null })
    }, 5000)
  }


  render() {
    if (this.state.user === null) {
      return(
        <div>
          <Notification message={this.state.message}
            className="error"
          />
          <LoginForm username={this.state.username}
            password={this.state.password}
            handleChange={this.handleInputChange}
            submit={this.login}
          />
        </div>
      )
    } else {
      return(
        <div>
          <h2>blogs</h2>
          <Notification message={this.state.message}
            className="success"
          />
          <p>
            {this.state.user.name} logged in
            <button onClick={this.logout}>logout</button>
          </p>
          <NewBlogForm handleChange={this.handleInputChange}
            titleValue={this.state.title}
            authorValue={this.state.author}
            urlValue={this.state.url}
            addBlog={this.addNewBlog}
          />
          <br/>
          {this.state.blogs.map(blog =>
            <Blog key={blog.id} blog={blog}/>
          )}
        </div>
      )
    }
  }
}

export default App
