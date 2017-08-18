import QueryString from 'query-string';
import {generateEvents} from './eventGenerator';

async function requestEventsAsync() {
  const API_URL = 'http://127.0.0.1:8881/?delay=0.5';
  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(generateEvents()),
  });
  const json = await response.json();
  return {events: parseRecords(json.Records)};
}

function parseRecords(records) {
  return records ? records.map(e => {
    const j = JSON.parse(atob(e.Data));
    return {...j,
      id: e.SequenceNumber};
  }) : [];
}

async function requestKinesis(shardIterator) {
  const iterator = shardIterator || await requestShardIterator();
  const url = `${streamUrl()}records`;
  const response = await fetch(url, {
    mode: 'cors',
    headers: new Headers({'Shard-Iterator': iterator})});
  const json = await response.json();
  return {
    events: parseRecords(json.Records),
    shardIterator: json.NextShardIterator};
}

async function requestShardIterator() {
  const url = streamUrl({
    extraPath: 'sharditerator',
    params: {
      'shard-id': 'shardId-000000000000',
      'type': 'LATEST'}});
  const response = await fetch(url);
  const json = await response.json();
  return json.ShardIterator;
}

function streamUrl({extraPath, params} = {}) {
  const queryString = params ? `?${QueryString.stringify(params)}` : '';
  const host = 'dsfuupgo82.execute-api.eu-west-1.amazonaws.com';
  return `https://${host}/Test/streams/myStream/${extraPath || ''}${queryString}`;
}

async function sendEventToKinesis(event) {
  return fetch(streamUrl({extraPath: 't'}), {
    method: 'POST',
    body: JSON.stringify(event)});
}

export {sendEventToKinesis, streamUrl, requestKinesis, requestEventsAsync, parseRecords};
export default requestEventsAsync;
// export default requestKinesis;
