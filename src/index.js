const express = require('express');
const cors = require('cors');
const needle = require('needle');
const { caching } = require('cache-manager');

const resolvers = require("./resolver/index.js");
const matcher = require("./matcher.js");

let memoryCache, ipfsGateway;

const app = express();
app.use(cors());

app.get('/*', async (req, res) => {
    const deconstructedDomain = matcher.matchResolver(req.hostname);
    if(!deconstructedDomain.baseDomain || !deconstructedDomain.domain) {
        res.status(404).send(`Resolver doesn't exist`);
        return;
    }
    const routePath = req.path;
    const ipfsPath = await resolvers.resolvers[deconstructedDomain.baseDomain](deconstructedDomain.domain);
    if(!ipfsPath) {
        res.status(404).send(`IPFS record not found for ${deconstructedDomain.domain}.${deconstructedDomain.baseDomain}`);
        return;
    }

    // get the ipfs data from the ipfs hash and send it to the client
    needle.get(`${ipfsGateway}/${ipfsPath}${routePath}`, (error, response) => {
        if (!error && response.statusCode == 200) {
            res.setHeader('Content-Type', response.headers['content-type'])
            res.send(response.body);
        } else {
            console.log(`Error while fetching data from IPFS for ${ipfsPath}`, error);
            res.status(404).send('Error while fetching data from IPFS');
        }
    });
});

async function init(port, _ipfsGateway, config) {
    await matcher.init(config);
    await resolvers.init(config);

    memoryCache = await caching('memory', {
        max: 10000,
        ttl: 60 * 1000 /*milliseconds*/,
    });
    ipfsGateway = _ipfsGateway;
    app.listen(port, async () => {
        console.log(`SpaceLink is listening at http://localhost:${port}`);
    });
}

module.exports = {
    init
}