/**
 * GraphQL queries
 */

//import { queryNodesAndLinks, queryAddNode } from './query'
import gql from './gqlHasura'

/**
 * Execute GraphQL query
 * @param {Object} gqlQuery valid GraphQL query object
 * @param {String} gqlQuery.query  valid GraphQL query string (use GraphiQL)
 * @returns {Object} data
 */
function execGraphQLQuery(gqlQuery) {
  return fetch(gql.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(gqlQuery)
  })
    .then(resp => {
      return resp.json()
    })
    .then(({ data, errors }) => {
      if (errors) {
        return { errors }
      } else {
        return data
      }
    })
    .catch(err => {
      throw err
    })
}

export const graphqlService = {
  /**
   * Returns nodes and links data arrays
   * @returns {Array} data.nodes
   * @returns {Array} data.links
   */
  getNodesAndLinks: () => {
    return execGraphQLQuery(gql.getLinksAndNodes())
  },
  /**
   * Add node to collection of nodes
   * @param {Object} node
   * @param {String} node.type node type person,product,organisation
   * @param {String} node.label short label
   * @param {String} node.name node name
   * @param {Object} node.data all other data
   * @returns {String} node id
   */
  addNode: node => {
    return execGraphQLQuery(gql.addNode(node)).then(res => {
      if (res.errors) {
        return res
      } else {
        //extract id from node
        let id = res['insert_nodes']['returning'][0]['id']
        return { id }
      }
    })
  },
  /**
   * Update nodes by id. All props of node are updated
   * @param {Object} node
   * @param {String} node.type node type person,product,organisation
   * @param {String} node.label short label
   * @param {String} node.name node name
   * @param {Object} node.data all other data
   * @returns {Number} affected_rows number of row are affected by update
   */
  updateNodeById: node => {
    return execGraphQLQuery(gql.updateNodeById(node)).then(
      res => {
        if (res.errors) {
          return res
        } else {
          let {
            update_nodes: { affected_rows }
          } = res
          return { affected_rows }
        }
      }
    )
  },
  deleteOnlyNodeById: id => {
    return execGraphQLQuery(gql.deleteOnlyNodeById(id)).then(
      res => {
        if (res.errors) {
          return res
        } else {
          let {
            delete_nodes: { affected_rows }
          } = res
          return { affected_rows }
        }
      }
    )
  },
  deleteLinksFromNode: node_id => {
    return execGraphQLQuery(
      gql.deleteLinksFromNode(node_id)
    ).then(res => {
      if (res.errors) {
        return res
      } else {
        let {
          delete_links: { affected_rows }
        } = res
        return { affected_rows }
      }
    })
  },
  /**
   * Add link to collection of nodes
   * @param {Object} node
   * @param {String} node.type node type person,product,organisation
   * @param {String} node.label short label
   * @param {String} node.name node name
   * @param {Object} node.data all other data
   * @returns {String} node id
   */
  addLink: link => {
    return execGraphQLQuery(gql.addLink(link)).then(res => {
      if (res.errors) {
        return res
      } else {
        let {
          insert_links: {
            returning: {
              0: { id }
            }
          }
        } = res
        return { id }
      }
    })
  },
  deleteLinkById: id => {
    return execGraphQLQuery(gql.deleteLinkById(id)).then(
      res => {
        if (res.errors) {
          return res
        } else {
          let {
            delete_links: { affected_rows }
          } = res
          return { affected_rows }
        }
      }
    )
  },
  deleteNodeAndLinksByNodeId: id => {
    return execGraphQLQuery(gql.deleteNodeAndLinksByNodeId(id))
  }
}

export default graphqlService
