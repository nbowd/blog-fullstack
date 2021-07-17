import React from 'react'

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
  <button data-cy="login-button" type="submit">login</button>
</form>
}

export default LoginForm
