var MessageSignatures = artifacts.require('./MessageSignatures.sol');

contract('MessageSignatures', accounts => {
  before(async () => {
    this.messageSignatures = await MessageSignatures.deployed();
  });

  it('deploys successfully', async () => {
    const address = await this.messageSignatures.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, '');
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  it('gets signatures', async () => {
    const signature = await this.messageSignatures.signatures(0);
    assert.equal(signature.id.toNumber(), 0);
    assert.equal(
      signature.content,
      '48411096a05de4ff7377de74c8585114d9a64f67461a210b07bc3ff0d2fef98b0126ca0d3416030b57c3954c093d9196878f2fe0fc563a04ac4292d9b48aaa39'
    );
  });

  it('creates signatures', async () => {
    const output = await this.messageSignatures.createSignature('abcdef', 1);
    const event = output.logs[0].args;
    assert.equal(event.id.toNumber(), 1);
    assert.equal(event.content, 'abcdef');
  });
});
