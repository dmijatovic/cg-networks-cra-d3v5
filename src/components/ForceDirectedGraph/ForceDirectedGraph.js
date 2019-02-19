import React, { Component } from 'react'

import testData from './Graphql/testData'

import d3u from './Helpers/d3.util'
import cgu from './Helpers/cg.util'
import ContextMenu from './ContextMenu/ContextMenu'
import Toolbox from './Toolbox/Toolbox'

import './ForceDirectedGraph.scss'

class ForceGraph extends Component {
  chartDiv = React.createRef()
  svg = null
  svgNodes = null
  svgLinks = null
  sim = null
  sourceNode = null
  targetNode = null
  nodePopUpMenu = null

  initForce() {
    let svgSize = d3u.getChartSize(
      document.querySelector('#d3-force-graph')
    )
    this.svg = d3u.createSvg(this.chartDiv.current, svgSize)
    this.svgLinks = d3u.createLinks(this.svg, testData.links, {
      click: this.selectLink,
      contextmenu: this.showLinkPopUp
    })
    this.svgNodes = d3u.createNodes(this.svg, testData.nodes, {
      click: this.selectNode,
      contextmenu: this.showNodePopUp
    })
    this.sim = d3u.createSimulation(
      testData,
      cgu.simulationCfg,
      svgSize
    )
    d3u.addDragFeatureToNodes(this.sim, this.svgNodes)
    d3u.runSimulation(this, svgSize)
  }

  addLink = (sourceNode, targetNode) => {
    console.log('Link nodes...', sourceNode, targetNode)
    const link = {
      id: `${sourceNode.data.id}_${targetNode.data.id}`,
      source: sourceNode.data.id,
      target: targetNode.data.id,
      data: {
        source: sourceNode.data,
        target: targetNode.data
      }
    }
    testData.links.push(link)
    //create new link between nodes
    this.svgLinks = d3u.createLinks(this.svg, testData.links)
  }

  selectLink = link => {
    console.log('Select link')
  }

  selectNode = node => {
    console.log('Select node...', node)

    if (this.sourceNode) {
      const {
        data: { type: sourceType }
      } = this.sourceNode
      const {
        data: { type: targetType }
      } = node
      if (cgu.isValidConnection(sourceType, targetType)) {
        this.targetNode = node
        this.addLink(this.sourceNode, this.targetNode)
      } else {
        debugger
        alert(
          `${node.data.name} cannot be connected with ${
            this.sourceNode.data.name
          }`
        )
      }
    } else {
      //save as source node
      this.sourceNode = node
      //select node
      d3u.toggleSelectedNode(node.item)
    }
  }
  showNodePopUp = node => {
    //define context menu
    let menuItems = cgu.getContextMenuNode(
      node,
      this.nodePopUpAction
    )

    if (this.nodePopUpMenu) {
      //update menu items
      this.nodePopUpMenu.update(menuItems)
      //reload does not works
      //this.nodePopUpMenu.reload()
    } else {
      this.nodePopUpMenu = new ContextMenu(menuItems)
    }
    //show context menu
    this.nodePopUpMenu.display(node.event, node.item)
  }
  // TODO
  nodePopUpAction = action => {
    console.log(action.type, action.node)
  }
  render() {
    return (
      <React.Fragment>
        <Toolbox />
        <div id="d3-force-graph" ref={this.chartDiv} />
      </React.Fragment>
    )
  }
  componentDidMount() {
    setTimeout(() => {
      this.initForce()
    }, 500)
  }
}

export default ForceGraph
