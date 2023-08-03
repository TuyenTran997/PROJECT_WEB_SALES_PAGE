import React from 'react'

import User from './Component/user/User'
import Admin from './Component/admin/Admin'
import Login from './Component/headerComponent/Login'


function App() {
  const userLogin = JSON.parse(localStorage.getItem('user-login'));

  return (
    <div>
      {/* <Login /> */}
      <Admin />
      {/* <User /> */}
    </div>
  )
}

export default App
