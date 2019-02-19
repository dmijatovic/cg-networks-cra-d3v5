import React, { Component } from 'react'

import './App.scss'
import Header from './components/Header/Header'
import ForceDirectedGraph from './components/ForceDirectedGraph/ForceDirectedGraph'

class App extends Component {
  render() {
    return (
      <article className="App">
        <Header />
        <main className="App-main">
          <ForceDirectedGraph />
        </main>
      </article>
    )
  }
}

export default App
