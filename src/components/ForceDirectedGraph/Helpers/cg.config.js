/**
 * Configuration object for simulation definitions
 */
export const simulationConfig = {
  //distance between nodes
  linkDistance: 70,
  //if positive the nodes attract eachother
  //negative values repel nodes
  chargeStrength: -150,
  // used for organizations
  defaultNodeRadius: 24,
  // person node radius is based on
  // amount of hrs * personNodeRatio
  personNodeRatio: 1,
  // product node radius is based on
  // importance score * productNodeRatio
  productNodeRatio: 1
}

export default simulationConfig
