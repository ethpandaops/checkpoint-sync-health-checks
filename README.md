# Ethereum Beacon Chain checkpoint sync endpoints with health checks

This project is an extension of [https://github.com/eth-clients/checkpoint-sync-endpoints](https://github.com/eth-clients/checkpoint-sync-endpoints) that adds a health check column to the endpoint tables.

On [schedule](./.github/workflows/check.yaml#L5) a Github action is triggered that;
- pulls down the remote [`endpoints/*.yaml`](https://github.com/eth-clients/checkpoint-sync-endpoints/blob/master/endpoints/)
- runs a health check on each endpoint
- updates the `health` field on every endpoint
- commits new `health` changes of [`./_data/endpoints.yaml`](./_data/endpoints.yaml)
- triggers the Github pages deploy with health check updates

-----
<p align="center" style="display: inline-block"> 
  <a target=”_blank” href="https://ethpandaops.github.io/checkpoint-sync-health-checks">View the list here </a>
</p>

-----

## Get started

```bash
# copy current stored endpoints
cp _data/endpoints.yaml endpoints.yaml

# OR combine the endpoints from https://github.com/eth-clients/checkpoint-sync-endpoints/tree/master/endpoints
```

### Update `_data/endpoints.yaml`

Requirements;
- Node 18

```bash
# install node modules
npm install

# update _data/endpoints.yaml
npm start
```
