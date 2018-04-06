import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import CoinDetails from '../coin-details'
import './style.css'

const App = () => (
  <div>
    <header>
      <Link to="/" className='headerText'>NaiNai Cryptos</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/coin-details/:coinType" component={CoinDetails} />
    </main>
  </div>
)

export default App
