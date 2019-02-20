import Hasura from './service'

function testHasura() {
  Hasura.getNodesAndLinks().then(data => {
    //debugger
    console.log('Get data...', data)
    addNode()
  })
}

/**
 * TEST CRUD FOR NODE
 */
function addNode() {
  let node = {
    type: 'person',
    label: 'CC',
    name: 'This is my name',
    data: {
      hrs: 45,
      test: '1111'
    }
  }
  Hasura.addNode(node).then(res => {
    if (res.errors) {
      console.log('Add node failed...', res.errors[0].message)
    } else {
      console.log('Node added...', res)
      //extract id from node
      updateNode(res.id)
    }
  })
}

function updateNode(id) {
  let node = {
    id: id,
    label: 'CC',
    name: 'Updated name',
    type: 'person',
    data: {
      hrs: 45,
      test: '1111'
    }
  }
  Hasura.updateNodeById(node).then(res => {
    if (res.errors) {
      console.log(
        'Update node failed...',
        res.errors[0].message
      )
    } else {
      console.log(`Node ${node.id} updated...`, res)
      deleteOnlyNodeById(id)
    }
  })
}

function deleteOnlyNodeById(id) {
  Hasura.deleteOnlyNodeById(id).then(res => {
    if (res.errors) {
      console.log(
        'Delete node failed...',
        res.errors[0].message
      )
    } else {
      console.log(`Only node ${id} deleted...`, res)
      deleteNodeAndLinksByNodeId(id)
    }
  })
}

function deleteNodeAndLinksByNodeId(id) {
  Hasura.deleteNodeAndLinksByNodeId(id).then(res => {
    if (res.errors) {
      console.log(
        'Delete node failed...',
        res.errors[0].message
      )
    } else {
      console.log(`Node and links deleted...`, res)
      deleteLinksFromNode(id)
    }
  })
}

/**
 * TEST CRUD FOR LINKS
 */
function deleteLinksFromNode(id) {
  Hasura.deleteLinksFromNode(id).then(res => {
    if (res.errors) {
      console.log(
        `Delete links from node ${id} failed...`,
        res.errors[0].message
      )
    } else {
      console.log(
        `${res.affected_rows} links from node ${id}...deleted`
      )
      addLink()
    }
  })
}

function addLink() {
  let link = {
    source: 'source1',
    target: 'target1',
    data: {
      hrs: 45,
      test: '1111'
    }
  }
  Hasura.addLink(link).then(res => {
    if (res.errors) {
      console.log('Add link failed...', res.errors[0].message)
    } else {
      console.log('Link added...', res)
      //extract id from node
      deleteLinkById(res.id)
    }
  })
}

function deleteLinkById(id) {
  Hasura.deleteLinkById(id).then(res => {
    if (res.errors) {
      console.log(
        'Delete link failed...',
        res.errors[0].message
      )
    } else {
      console.log('Link deleted...', id)
    }
  })
}

export default testHasura
