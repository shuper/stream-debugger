import {events} from './eventGenerator'

async function requestEventsAsync() {
  const data = new FormData();
  data.append("json", JSON.stringify(events()));
  const response = await fetch(`http://127.0.0.1:8881/?delay=0.5`, {
    method: "POST",
    body: JSON.stringify(events())
  });
  const json = await response.json();
  return {events: parseRecords(json.Records)};
}

function parseRecords(records) {
  return records ? records.map(e => {
      const j = JSON.parse(atob(e.Data));
      return {...j, id: e.SequenceNumber}
    }
  ) : [];
}

async function requestKinesis(shardIterator) {
  if (!shardIterator) {
    shardIterator = await requestShardIterator();
  }
  const url = streamUrl() + "records";
  const response = await fetch(url, {mode: "cors", headers: new Headers({"Shard-Iterator": shardIterator})});
  const json = await response.json();

  return {events: parseRecords(json.Records), shardIterator: json.NextShardIterator};
}

async function requestShardIterator() {
  const url = streamUrl() +
    "sharditerator?" +
    "shard-id=shardId-000000000000" +
    "&type=LATEST";
  const response = await fetch(url);
  const json = await response.json();
  return json.ShardIterator;
}

function streamUrl() {
  return "https://dsfuupgo82.execute-api.eu-west-1.amazonaws.com/Test/streams/myStream/";
}

function sendEventToKinesis(eventName) {
  fetch(streamUrl() + 't', {
    method: "POST",
    body: JSON.stringify(events(1, eventName)[0] )
  }).then(response => response.json())
    .catch(e => console.log("Error sending an event", e))
}

export {requestEventsAsync, requestKinesis, sendEventToKinesis};
