import React from 'react'
import Button from './Button'

function LoginForm({
  username,
  password,
  handleLogin,
  handleUsernameChange,
  handlePasswordChange
}) {
  return <form onSubmit={handleLogin}>
  <div>
    Username: 
      <input
        data-cy="username"
        type="text"
        value={username}
        name="Username"
        onChange={handleUsernameChange}
      />
  </div>
  <div>
    Password: 
      <input
        data-cy="password"
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
      />
  </div>
  <Button dataCy="login-button" type="submit" text="Login"/>
</form>
}

export default LoginForm
