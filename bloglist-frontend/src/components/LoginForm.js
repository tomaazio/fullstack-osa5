import React from 'react'

const LoginForm = (props) => {
  return(
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={props.submit}>
        <div>
          <label>
            Username:
            <input
              name="username"
              type="text"
              onChange={props.handleChange}
              value={props.username}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              name="password"
              type="password"
              onChange={props.handleChange}
              value={props.password}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
