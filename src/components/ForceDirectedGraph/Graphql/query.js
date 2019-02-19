
import { createId, createdAt } from './utils'

export const queryNodesAndLinks = {
  query: `{
    nodes{
      _id
      name
      data
    }
    links{
      _id
      source
      target
    }
  }`
}
/**
 * AddNode GraphQL query string
 * @param {Object} node
 * @param {String} node.type node type person,product,organisation
 * @param {String} node.label short label
 * @param {String} node.name node name
 * @param {Object} node.data all other data
 */
export function queryAddNode(node) {
  debugger
  //let str = JSON.stringify(node.data)
  return {
    query: `mutation{
      insert_nodes(objects:[{
        _id:"${createId()}"
        _createdAt:"${createdAt()}"
        type:"person"
        label:"DM"
        name:"Dusan Mijatovic"
        data_raw:{test: 1, level: 2}
      }]){
        returning{
          _id
          name
          data_raw
        }
      }
    }
    `
  }
}
