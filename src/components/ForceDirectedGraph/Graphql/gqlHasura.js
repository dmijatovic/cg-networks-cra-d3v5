import { createId, createdAt, encodeData } from './gqlHelpers'
/**
 * Hasura GraphQL queries
 * based on queries construced with GraphiQL in Hasura
 * local version http://localhost:8080/console/api-explorer
 * for use with fetch POST key query need to be added
 */
export const gqlHasura = {
  //url: 'http://localhost:8080/v1alpha1/graphql',
  url: 'https://cg-network-d3v5.herokuapp.com/v1alpha1/graphql',

  getLinksAndNodes: () => {
    return {
      query: `{
        nodes{
          id
          name
        }
        links{
          id
          source
          target
        }
      }`
    }
  },

  addNode: node => {
    return {
      query: `mutation{
          insert_nodes(objects:[{
            id:"${createId()}"
            createdAt:"${createdAt()}"
            label:"${node.label}"
            name:"${node.name}"
            type:"${node.type}"
            dataB64:"${encodeData(node.data)}"}])
          {
            returning{
              id
              createdAt
            }
          }
        }
        `
    }
  },
  updateNodeById: node => {
    return {
      query: `
        mutation{
          update_nodes(
            _set:{
              label:"${node.label}"
              name:"${node.name}"
              type:"${node.type}"
              dataB64:"${encodeData(node.data)}"
            }
            where:{id:{_eq:"${node.id}"}}){
            affected_rows
          }
        }
      `
    }
  },
  deleteOnlyNodeById: id => {
    return {
      query: `
        mutation{
          delete_nodes(
            where:{
              id:{_eq:"${id}"}
            }){
              affected_rows
            }
        }
        `
    }
  },
  deleteNodeAndLinksByNodeId: id => {
    return {
      query: `mutation{
        delete_nodes(
          where:{
            id:{_eq:"${id}"}
          }){
          affected_rows
        }
        delete_links(
          where:{
            _or:[
              {source:{_eq:"${id}"}}
              {target:{_eq:"${id}"}}
            ]
          }){
            affected_rows
          }
      }`
    }
  },
  addLink: link => {
    return {
      query: `
      mutation{
        insert_links(objects:[{
          id:"${createId()}"
          createdAt:"${createdAt()}"
          source:"${link.source}"
          target:"${link.target}"
          dataB64:"${encodeData(link.data)}"}]){
          returning{
            id
            createdAt
          }
        }
      }
      `
    }
  },
  deleteLinkById: id => {
    return {
      query: `
      mutation{
        delete_links(
          where:{id:{_eq:"${id}"}}
        ){
          affected_rows
        }
      }
      `
    }
  },
  deleteLinksFromNode: node_id => {
    return {
      query: `
        mutation{
          delete_links(
            where:{
            _or:[
              {source:{_eq:"${node_id}"}}
              {target:{_eq:"${node_id}"}}
            ]
          }){
            affected_rows
          }
        }
        `
    }
  }
}

export default gqlHasura
