// eslint-disable-next-line
const { expect } = require('chai');
const app = require('../app');

describe('server 构建正常吗？', () => {
  it('通过', () => {
    expect(app).to.be.an('object');
  });
});
