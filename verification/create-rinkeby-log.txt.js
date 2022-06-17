const fs = require('fs')

const latest_deployment = require('../deployments/rinkeby/example.json')

const addressFactory = Object.entries(latest_deployment)

let addressesMap = new Map(addressFactory);

keys = Array.from(addressesMap.keys())

const logger = fs.createWriteStream('./verification/rinkeby-log.txt', {
  flags: 'a' // 'a' means appending (old data will be preserved)
})

keys.map((key) => {
  if (!key.includes("UErc20_")) {
    logger.write('\n' + key)
  }
})

logger.end()