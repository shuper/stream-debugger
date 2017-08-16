import {expect} from 'chai';
import {fetch} from 'isomorphic-fetch';
import {atob} from 'atob';
import btoa from 'btoa';
import nock from 'nock';
import {streamUrl, requestKinesis, sendEventToKinesis} from '../../../src/lib/requester';

global.atob = atob;
const host = 'dsfuupgo82.execute-api.eu-west-1.amazonaws.com';
const path = '/Test/streams/myStream/';
const SUCCESS_CODE = 200;

describe('.streamUrl', () => {
  it('works with no parameters', () => {
    expect(streamUrl()).to.be.equal(`https://${host}${path}`);
  });

  it('supports extra path', () => {
    const expectedUrl = `https://${host}${path}some_page/`;
    expect(streamUrl({extraPath: 'some_page/'})).to.be.equal(expectedUrl);
  });

  it('accepts query string parameters', () => {
    const parameters = {
      a: 'a_value',
      b: 'b_value'};
    const expectedUrl = `https://${host}${path}?a=a_value&b=b_value`;
    expect(streamUrl({params: parameters})).to.be.equal(expectedUrl);
  });

  it('accepts extra path and query string parameters', () => {
    const parameters = {
      a: 'a_value',
      b: 'b_value'};
    const expectedUrl = `https://${host}${path}some_page?a=a_value&b=b_value`;
    expect(streamUrl({
      extraPath: 'some_page',
      params: parameters})).to.be.equal(expectedUrl);
  });
});

describe('.requestKinesis', () => {
  afterEach(() => nock.cleanAll());

  const eventData = btoa('{"event": "name 1"}');
  const records = () => [{
    SequenceNumber: 123,
    Data: eventData}, {

    SequenceNumber: 124,
    Data: eventData},
  ];
  const mockRequestKinesisRecords = shardIterator => {
    nock(`https://${host}`, {reqheaders: {'shard-iterator': shardIterator}})
      .get(`${path}records`)
      .reply(SUCCESS_CODE, {
        Records: records(),
        NextShardIterator: 'next SI'});
  };
  const mockRequestShardIterator = shardIterator => {
    nock(`https://${host}`)
      .get(`${path}sharditerator?shard-id=shardId-000000000000&type=LATEST`)
      .reply(SUCCESS_CODE, {ShardIterator: shardIterator});
  };

  const expectedEvents = () => [{
    event: 'name 1',
    id: 123}, {

    event: 'name 1',
    id: 124},
  ];

  it('requests records with a shard iterator', async () => {
    mockRequestKinesisRecords('long uid');

    const result = await requestKinesis('long uid');
    expect(result).to.deep.equal({
      events: expectedEvents(),
      shardIterator: 'next SI'});
  });

  it('requests shardIterator and then requests records', async () => {
    mockRequestShardIterator('long uid');

    mockRequestKinesisRecords('long uid');
    const result = await requestKinesis();
    expect(result).to.deep.equal({
      events: expectedEvents(),
      shardIterator: 'next SI'});
  });
});

describe('.sendEventToKinesis', () => {
  afterEach(() => nock.cleanAll());

  it('sends an event to Kinesis', async () => {
    nock(`https://${host}`)
      .post(`${path}t`, JSON.stringify({event: 'Video Heartbeat'}))
      .reply(SUCCESS_CODE, 'really OK');
    const result = await sendEventToKinesis({event: 'Video Heartbeat'});
    expect(await result.text()).to.equal('really OK');
  });
});
