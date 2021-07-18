import React from 'react'
import Button from './Button'
import Wrapper from './FormWrapper'

function LoginForm({
  username,
  password,
  handleLogin,
  handleUsernameChange,
  handlePasswordChange
}) {
  return <form onSubmit={handleLogin}>
  <Wrapper>
    Username: 
      <input
        data-cy="username"
        type="text"
        value={username}
        name="Username"
        onChange={handleUsernameChange}
      />
  </Wrapper>
  <Wrapper>
    Password: 
      <input
        data-cy="password"
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
      />
  </Wrapper>
  <Button dataCy="login-button" type="submit" text="Login" primary/>
</form>
}

export default LoginForm
