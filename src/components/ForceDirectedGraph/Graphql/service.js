/**
 * GraphQL queries
 */

import { queryNodesAndLinks, queryAddNode } from './query'

//uri to graphQL backend
const gqlUrl = 'http://localhost:8080/v1alpha1/graphql'
/**
 * Execute GraphQL query
 * @param {Object} gqlQuery valid GraphQL query object
 * @param {String} gqlQuery.query  valid GraphQL query string (use GraphiQL)
 * @returns {Object} data
 */
function execGraphQLQuery(gqlQuery) {
  return fetch(gqlUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(gqlQuery)
  })
    .then(resp => {
      return resp.json()
    })
    .then(({ data }) => {
      return data
    })
    .catch(err => {
      throw err
    })
}

export const graphqlService = {
  getNodesAndLinks: () => {
    return execGraphQLQuery(queryNodesAndLinks)
  },
  /**
   * Add node to collection of nodes
   * @param {Object} node
   * @param {String} node.type node type person,product,organisation
   * @param {String} node.label short label
   * @param {String} node.name node name
   * @param {Object} node.data all other data
   */
  addNode: node => {
    return execGraphQLQuery(queryAddNode(node))
  },
  addLink: link => {},
  deleteNode: _id => {},
  deleteLink: _id => {}
}

export default graphqlService
