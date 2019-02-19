import React from 'react'

import './Header.scss'
import Network from '../../styles/icons/network.svg'

const Header = () => {
  return (
    <header className="Header">
      <div className="Header-logo">
        <h1>Common Ground</h1>
      </div>
      <div className="Header-title">
        <img src={Network} alt="network logo" />
        <h1>Network</h1>
      </div>
    </header>
  )
}

export default Header
