export const testData = {
  nodes: [
    {
      id: 'dusan',
      type: 'person',
      label: 'DM',
      name: 'Dusan Mijatovic',
      data: { hrs: 24 }
    },
    {
      id: 'niels',
      type: 'person',
      label: 'ND',
      name: 'Niels Dequeker',
      data: { hrs: 40 }
    },
    {
      id: 'bart',
      type: 'person',
      label: 'BJ',
      name: 'Bart Jeukendrup',
      data: { hrs: 24 }
    },
    {
      id: 'fabian',
      type: 'person',
      label: 'FB',
      name: 'Fabian Buijing',
      data: { hrs: 16 }
    },
    {
      id: 'ronald',
      type: 'person',
      label: 'RK',
      name: 'Ronald Koster',
      data: { hrs: 32 }
    },
    {
      id: 'eelco',
      type: 'person',
      label: 'EH',
      name: 'Eelco Hotting',
      data: { hrs: 16 }
    },
    {
      id: 'nlx',
      type: 'product',
      label: 'NLX',
      name: 'NLX project',
      data: { importance: 30 }
    },
    {
      id: 'cgn',
      type: 'product',
      label: 'CGN',
      name: 'CG Network visualzation',
      data: { importance: 20 }
    },
    {
      id: 'don',
      type: 'product',
      label: 'DON',
      name: 'Developer Overheid NL',
      data: { importance: 20 }
    },
    {
      id: 'vng',
      type: 'organization',
      label: 'VNG',
      name: 'Vereningin Nederlands Gementen',
      data: { url: 'https://vng.nl' }
    },
    {
      id: 'geh',
      type: 'organization',
      label: 'GEH',
      name: 'Gemeente Haarlem',
      data: { url: 'https://gemeente.haarlem.nl' }
    }
  ],
  links: [
    {
      id: 'link1',
      source: 'ronald',
      target: 'vng',
      data: { test: 'link1' }
    },
    {
      id: 'link11',
      source: 'dusan',
      target: 'vng',
      data: { test: 'link11' }
    },
    {
      id: 'link11',
      source: 'fabian',
      target: 'vng',
      data: { test: 'link11' }
    },
    {
      id: 'link2',
      source: 'don',
      target: 'bart',
      data: { test: 'link2' }
    },
    {
      id: 'link3',
      source: 'don',
      target: 'niels',
      data: { test: 'link3' }
    },
    {
      id: 'link4',
      source: 'niels',
      target: 'vng',
      data: { test: 'link4' }
    },
    {
      id: 'link5',
      source: 'niels',
      target: 'nlx',
      data: { test: 'link5' }
    },
    {
      id: 'link6',
      source: 'bart',
      target: 'nlx',
      data: { test: 'link6' }
    },
    {
      id: 'link7',
      source: 'bart',
      target: 'vng',
      data: { test: 'link6' }
    },
    {
      id: 'link8',
      source: 'dusan',
      target: 'cgn',
      data: { test: 'link7' }
    },
    {
      id: 'link9',
      source: 'eelco',
      target: 'vng',
      data: { test: 'link7' }
    },
    {
      id: 'link10',
      source: 'eelco',
      target: 'geh',
      data: { test: 'link7' }
    }
  ]
}

export default testData
