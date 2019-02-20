/**
 * Common Ground Network utility functions
 * handling bussiness logic
 */

import ContextMenu from '../ContextMenu/ContextMenu'

/**
 * Returns array of menu items used by ContextMenu.
 * The active items are different per node type.
 * @param {Object} node d3 node object
 * @param {Function} fn callback function
 * @returns {Array} of menu item objects for ContextMenu
 */
export function getContextMenuNode(node, fn) {
  let { type } = node.data
  return [
    {
      text: 'Add person',
      icon:
        '<img class="cm-svg-icon" src="baseline-face-24px.svg" alt="add person"/>',
      enabled: isValidConnection(type.toLowerCase(), 'person'),
      events: {
        click: e => {
          fn({
            type: 'ADD_NODE',
            node
          })
        }
      }
    },
    {
      text: 'Add product',
      icon:
        '<img class="cm-svg-icon" src="baseline-widgets-24px.svg" alt="add product"/>',
      enabled: isValidConnection(type.toLowerCase(), 'product'),
      events: {
        click: e => {
          fn({
            type: 'ADD_NODE',
            node
          })
        }
      }
    },
    {
      text: 'Add organization',
      icon:
        '<img class="cm-svg-icon" src="baseline-business-24px.svg" alt="add organization"/>',
      enabled: isValidConnection(
        type.toLowerCase(),
        'organization'
      ),
      events: {
        click: e => {
          fn({
            type: 'ADD_NODE',
            node
          })
        }
      }
    },
    {
      // This item is a divider (shows only gray line, no text etc.)
      type: ContextMenu.DIVIDER
    },
    {
      text: `Delete ${node.data.label}`,
      icon:
        '<img class="cm-svg-icon" src="baseline-delete-24px.svg" alt="add organization"/>',
      enabled: true,
      events: {
        click: e => {
          fn({
            type: 'DELETE_NODE',
            node
          })
        }
      }
    }
  ]
}
/**
 * Returns array of menu items used by general context menu on the page.
 * @param {Function} fn callback function
 * @returns {String} node type value: person, product, orgnization
 */
export function getContextMenuPage(fn) {
  return [
    {
      text: 'Add person',
      icon: '<i class="fas fa-exclamation-circle"></i>',
      enabled: true,
      events: {
        click: e => {
          fn('person')
        }
      }
    },
    {
      text: 'Add product',
      icon: '<i class="fas fa-exclamation-circle"></i>',
      enabled: true,
      events: {
        click: e => {
          fn('product')
        }
      }
    },
    {
      text: 'Add organization',
      icon: '<i class="fas fa-exclamation-circle"></i>',
      enabled: true,
      events: {
        click: e => {
          fn('organization')
        }
      }
    }
  ]
}
/**
 * Check if connection between nodes is allowed
 * @param {String} sourceType type of source node; eg. person, product, organization
 * @param {String} targetType type of target node; eg. person, product, organization
 * @returns {Boolean} true if connection between nodes is allowed
 */
export function isValidConnection(sourceType, targetType) {
  const allowedLinks = {
    person: ['product', 'organization'],
    product: ['person', 'organization'],
    organization: ['person']
  }
  let srcAccepts = allowedLinks[sourceType]
  if (srcAccepts) {
    return srcAccepts.indexOf(targetType) !== -1
  } else {
    return false
  }
}
/**
 * Configuration object for simulation definitions
 */
export const simulationCfg = {
  //distance between nodes
  linkDistance: 100,
  //if positive the nodes attract eachother
  //negative values repel nodes
  chargeStrength: -50,
  // used for organizations
  defaultNodeRadius: 30,
  // person node radius is based on
  // amount of hrs * personNodeRatio
  personNodeRatio: 1,
  // product node radius is based on
  // importance score * productNodeRatio
  productNodeRatio: 1
}

export default {
  getContextMenuNode,
  getContextMenuPage,
  isValidConnection,
  simulationCfg
}
