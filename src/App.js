import React, { Component } from 'react'

import './App.scss'
import Header from './components/Header/Header'
import ForceDirectedGraph from './components/ForceDirectedGraph/ForceDirectedGraph'

import testHasura from './components/ForceDirectedGraph/Graphql/testHasura'

class App extends Component {
  testHasuraQueries() {
    console.log('Start testing hasura')
    testHasura()
  }
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
  componentDidMount() {
    this.testHasuraQueries()
  }
}

export default App
