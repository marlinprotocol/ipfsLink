import express from 'express';
import cors from 'cors';
import needle from 'needle';
import { caching } from 'cache-manager';

import resolvers from "./resolver/index.js";
import matcher from "./matcher.js";

let memoryCache,
ipfsGateway,
reqCount = 0, // total requests sent irrespective of tld
tldReqCount = {}, // tld => reqCount mapping
uniqueDomainCount = 0, // total unique domain count 
tldUniqueDomainCount = {}, // tld => uniqueDomainCount mapping
domainMap = {}; // domainName => visited mapping

const app = express();
app.use(cors());
app.use(express.json());

app.get("/stats", async (req, res) => {
    try {
        const deconstructedUrl = matcher.statsMatchResolver(req.body.hostname);
        if (!deconstructedUrl.baseDomain || !deconstructedUrl.urlTld) {
            res.status(404).send(`Resolver doesn't exist`);
            return;
        }

        const stats = {
            "reqCount": tldReqCount[deconstructedUrl.baseDomain] ?? 0,
            "uniqueDomainCount": tldUniqueDomainCount[deconstructedUrl.baseDomain] ?? 0
        };
        res.send(stats);
    } catch (error) {
        console.log("Error in /stats: ", error);
        res.status(404).send('Error while fetching stats');
    }
})

app.get("/allStats", async (req, res) => {
    try {
        const stats = {
            reqCount,
            tldReqCount,
            uniqueDomainCount,
            tldUniqueDomainCount
        };
        res.send(stats);
    } catch (error) {
        console.log("Error in /allStats: ", error);
        res.status(404).send('Error while fetching all stats');
    }
})

app.get('/*', async (req, res) => {
    const deconstructedDomain = matcher.matchResolver(req.hostname);
    if (!deconstructedDomain.baseDomain || !deconstructedDomain.domain) {
        res.status(404).send(`Resolver doesn't exist`);
        return;
    }
    const routePath = req.path;
    const ipfsPath = await resolvers.resolvers[deconstructedDomain.baseDomain](deconstructedDomain.domain);
    if (!ipfsPath) {
        res.status(404).send(`IPFS record not found for ${deconstructedDomain.domain}.${deconstructedDomain.baseDomain}`);
        return;
    }

    // get the ipfs data from the ipfs hash and send it to the client
    needle.get(`${ipfsGateway}/${ipfsPath}${routePath}`, (error, response) => {
        ++reqCount;
        // if tld key doesn't exist
        if (!tldReqCount[deconstructedDomain.baseDomain])
            tldReqCount[deconstructedDomain.baseDomain] = 0;
        ++tldReqCount[deconstructedDomain.baseDomain];

        const domainName = deconstructedDomain.domain + "." + deconstructedDomain.baseDomain;
        // if the request is from a new domain
        if (!domainMap[domainName]) {
            domainMap[domainName] = true;
            ++uniqueDomainCount;
            // if tld key doesn't exist
            if (!tldUniqueDomainCount[deconstructedDomain.baseDomain])
                tldUniqueDomainCount[deconstructedDomain.baseDomain] = 0;
            ++tldUniqueDomainCount[deconstructedDomain.baseDomain];
        }

        if (!error && response.statusCode == 200) {
            res.setHeader('Content-Type', response.headers['content-type'])
            res.send(response.body);
        } else {
            console.log(`Error while fetching data from IPFS for ${ipfsPath}`, error);
            res.status(404).send('Error while fetching data from IPFS');
        }
    });
});

export async function init(port, _ipfsGateway, config) {
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