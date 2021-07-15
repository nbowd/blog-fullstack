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
        type="text"
        value={username}
        name="Username"
        onChange={handleUsernameChange}
      />
  </div>
  <div>
    Password: 
      <input
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
      />
  </div>
  <button type="submit">login</button>
</form>
}

export default LoginForm
