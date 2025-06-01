const { Container }        = require('inversify');
const MongoBooksRepository = require('./repositories/MongoBooksRepository');

const container = new Container();
container.bind(MongoBooksRepository).toSelf();

module.exports = { container };
