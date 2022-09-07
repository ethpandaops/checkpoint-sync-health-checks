import fs from 'fs'
import YAML from 'yaml'

if (!fs.existsSync('./endpoints.yaml')) throw new Error('remote endpoints.yaml not found');
if (!fs.existsSync('./_data/endpoints.yaml')) throw new Error('_data/endpoints.yaml not found');

const remoteEndpoints = YAML.parse(fs.readFileSync('./endpoints.yaml', 'utf8')) ?? [];
const currentEndpoints = YAML.parse(fs.readFileSync('./_data/endpoints.yaml', 'utf8')) ?? [];

async function updateEndpoint(network, remote, current) {
  // health check
  let healthy = false;
  try {
    const { data: { finalized: { epoch } } } = await (await fetch(`${remote.endpoint}/eth/v1/beacon/states/head/finality_checkpoints`)).json();
    healthy = Boolean(epoch);
  } catch (error) {
    // silent fail
    console.log(`failed to get finality_checkpoints on ${remote.endpoint}: ${error.message}`);
  }
  return {
    network,
    endpoint: {
      ...remote,
      health: [
        { result: healthy, date: new Date().toISOString() },
        ...current?.health?.slice(0, 9) ?? [],
      ],
    }
  };
}

const newEndpoints = {};

const promises = Object.entries(remoteEndpoints).reduce((acc,[network, endpoints]) => {
  acc.push(...endpoints.map((remote) => (
    updateEndpoint(network, remote, currentEndpoints?.[network]?.find((currentEndpoint) => currentEndpoint.endpoint === remote.endpoint)))));
  return acc;
}, []);
for await (const data of promises) {
  if (!newEndpoints[data.network]) newEndpoints[data.network] = [];
  newEndpoints[data.network].push(data.endpoint);
}

fs.writeFileSync('./_data/endpoints.yaml', YAML.stringify(newEndpoints));
