class FakeTimestampsProvider {
  constructor() {
    this._now = 1000;
  }

  now() {
    const now = this._now;
    this._now += 100;
    return now;
  }
}

const timestampStub = new FakeTimestampsProvider();
module.exports = timestampStub.now.bind(timestampStub);
