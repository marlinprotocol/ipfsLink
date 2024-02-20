const fs = require("fs");
const { Command } = require('commander');
const program = new Command();

const { init } = require("./src");

program
    .option('-p, --port <port>', 'Port to run SpaceLink on')
    .option('-g, --ipfs-gateway <ipfsGateway>', 'IPFS gateway to use')
    .option('-c, --config <config>', 'Path to config file');
program.parse(process.argv);

const { port, ipfsGateway, config } = program.opts();

console.log(`Using IPFS gateway ${ipfsGateway}`);
console.log(`Using config from ${config}`);
console.log(`Running server on ${port}`);

async function readConfig(pathToConfig) {
    const rawConfig = fs.readFileSync(pathToConfig);
    const config = JSON.parse(rawConfig);
    return config;
}

async function extractResolverConfig(config) {
    const activeResolvers = config.activeResolvers;
    const resolverConfig = {};
    for(let i=0; i < activeResolvers.length; i++) {
        const resolver = activeResolvers[i];
        resolverConfig[resolver] = config[resolver];
    }
    return resolverConfig;
}

async function main(port, ipfsGateway, pathToConfig) {
    const config = await readConfig(pathToConfig);
    const resolverConfig = await extractResolverConfig(config);

    await init(port, ipfsGateway, resolverConfig);
}

main(port, ipfsGateway, config);