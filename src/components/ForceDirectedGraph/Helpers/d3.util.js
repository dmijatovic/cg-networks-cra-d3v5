//global d3
//it needs global import
import * as d3 from 'd3'

import { simulationCfg as simCfg } from './cg.util'
/**
 * Calculating chart (svg) size based on the
 * parent dimenensions. This function is used
 * to create svg element to fits parent
 * @param {HTMLElement} parent
 * @returns {Object}
 * {
 *  width: Number
 *  height: Number
 *  margins: Array of Numbers for top, right, bottom and left margin
 * }
 */
export function getChartSize(parent) {
  let w = 600,
    h = 600,
    innerMargin = 8

  if (parent) {
    let ps = window.getComputedStyle(parent, null)
    w =
      parseInt(ps.width) -
      (parseInt(ps.marginLeft) +
        parseInt(ps.marginRight) +
        parseInt(ps.paddingLeft) +
        parseInt(ps.paddingRight) +
        innerMargin)
    //minimum width of 400px
    if (w < 400) w = 400
    h =
      parseInt(ps.height) -
      (parseInt(ps.marginTop) +
        parseInt(ps.marginBottom) +
        parseInt(ps.paddingTop) +
        parseInt(ps.paddingBottom) +
        innerMargin)
    // minimum height of 400 px
    if (h < 400) h = 400
  }
  return {
    width: w,
    height: h
  }
}

/**
 * Create SVG element
 * @param {HTMLElement} parent parent element
 * @param {Object} size chart size
 */
export const createSvg = (parent, size) => {
  let svg = d3
    .select(parent)
    .append('svg')
    .attr('width', size.width)
    .attr('height', size.height)

  return svg
}
/**
 * Creates links between nodes
 * @param {Object} svg d3 reference to svg object
 * @param {Object} data array of links definitions
 * @param {String} data.source node id
 * @param {String} data.target node id
 * @param {Object} fn callback functions for interaction
 */
export function createLinks(svg, links, fn) {
  // console.log('Create new link...', links)

  let svgLinks = svg
    .selectAll('line')
    .data(links)
    .enter()
    .append('line')
    .attr('stroke-width', 1)
    .attr('stroke', '#999')

  return svgLinks
}

// export function updateLinks(svg, links, fn){

// }

/**
 * Creates circle nodes in svg using d3 svg reference provided and
 * binds mouse events for provided function
 * @param {Object} svg d3 reference to svg object
 * @param {Object} data all node data available
 * @param {String} data.type str
 * @param {Object} fn callback functions for interaction
 * @param {Function} fn.click callback functions on node click
 * @param {Function} fn.contextmenu callback functions on right mouse click
 */
export const createNodes = (svg, data, fn) => {
  let svgNodes = svg
    .selectAll('.node-item')
    .data(data)
    .enter()
    //append groups
    .append('g')
    .attr('class', 'node-item')
    .on('mousedown', function() {
      // debugger
      d3.select(this).attr('cursor', 'move')
    })
    .on('mouseup', function() {
      //debugger
      d3.select(this).attr('cursor', 'default')
    })
    .on('mouseout', function() {
      // debugger
      d3.select(this).attr('cursor', 'default')
    })
    .on('contextmenu', function(d, i) {
      //prevent default events
      d3.event.preventDefault()
      d3.event.stopPropagation()
      /**
       * callback function passing following data
       * e: mouseEvent, c: circle object, d: data, i: circle instance
       */
      fn.contextmenu({
        event: d3.event,
        item: this,
        data: d,
        index: i
      })
    })

  //add circles to groups
  svgNodes
    .append('circle')
    .attr('r', d => {
      //add radius
      //debugger
      d['radius'] = calcRadius(d)
      return d['radius']
    })
    .attr('class', d => {
      // debugger
      return `node-type-${d.type}`
    })
    .on('click', function(d, i) {
      fn.click({
        item: this,
        data: d,
        index: i
      })
    })

  //add text to groups
  svgNodes
    .append('text')
    .attr('class', 'node-text')
    //.attr('stroke', 'red')
    .attr('text-anchor', 'middle')
    .attr('font-size', d => {
      //50% of circle radius
      return d.radius * 0.5
    })
    .attr('alignment-baseline', 'central')
    .text(d => `${d.label}`)

  //return complete node
  return svgNodes

  function calcRadius(d) {
    switch (d.type) {
      case 'person':
        return d.data.hrs * simCfg.personNodeRatio
      case 'product':
        return d.data.importance * simCfg.productNodeRatio
      default:
        // for organizations
        return simCfg.defaultNodeRadius
    }
  }
}

/**
 * Selects node by appending class selected-node
 * @param {Object} node d3 circle object
 */
export function selectNode(node) {
  node.classList.append('selected-node')
}
/**
 * Removes class selected-node from the node
 * @param {Object} node
 */
export function deselectNode(node) {
  node.classList.remove('selected-node')
}

/**
 * Toggles the node class 'selected-node'
 * @param {Object} node
 */
export function toggleSelectedNode(node) {
  node.classList.toggle('selected-node')
}
/**
 * Creates D3 simulation object
 * @param {Array} nodes array of node data objects
 * @param {Array} links array of node data objects
 *
 */
export function createSimulation(
  { nodes, links },
  { linkDistance, chargeStrength },
  { width, height }
) {
  const simulation = d3
    .forceSimulation(nodes)
    .force(
      'links',
      d3
        .forceLink()
        .id(d => d.id)
        .links(links)
        .distance(linkDistance)
    )
    .force(
      'charge',
      d3.forceManyBody().strength(chargeStrength)
    )
    .force('center', d3.forceCenter(width / 2, height / 2))

  return simulation
}
/**
 * Executes simulation for position of nodes and links
 * @param {Object} sim D3 simulation object
 * @param {Array} svgNodes D3 array of svg nodes (svg group tag)
 * @param {Array} svgLinks D3 array of svg links
 * @param {Number} width svg with - used to constrain nodes from going outside
 * @param {Number} height svg height - used to constrain nodes from going outside
 */
export function runSimulation(
  { sim, svgNodes, svgLinks },
  { width, height }
) {
  //start simulation on tick
  sim.on('tick', function(d) {
    let alpha = sim.alpha()
    console.log('tick on...alpha...', alpha)

    //position nodes
    svgNodes.attr('transform', d => {
      //prevent node of exiting visible svg area
      //see https://bl.ocks.org/mbostock/1129492
      d.x = Math.max(d.radius, Math.min(width - d.radius, d.x))
      d.y = Math.max(d.radius, Math.min(height - d.radius, d.y))
      return `translate(${d.x},${d.y})`
    })
    //position links
    svgLinks
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)
  })
}
/**
 * Adds D3 drag event handlers to svg nodes
 * @param {Object} sim D3 simulation object
 * @param {Array} svgNodes D3 array of svg nodes
 */
export function addDragFeatureToNodes(sim, svgNodes) {
  svgNodes.call(
    d3
      .drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended)
  )
  // drag action started
  function dragstarted(d) {
    if (!d3.event.active) {
      sim.alphaTarget(0.7).restart()
      //debugger
      d.fx = d.x
      d.fy = d.y
    }
  }
  //drag action in progress
  function dragged(d) {
    //reposition node
    d.fx = d3.event.x
    d.fy = d3.event.y
  }
  //drag action ended
  function dragended(d) {
    console.log('drag...ended')
    if (!d3.event.active) {
      sim.alphaTarget(0)
      //remove fixed position
      d.fx = null
      d.fy = null
    }
  }
}

export default {
  getChartSize,
  createSvg,
  createNodes,
  toggleSelectedNode,
  createLinks,
  createSimulation,
  addDragFeatureToNodes,
  runSimulation
}
