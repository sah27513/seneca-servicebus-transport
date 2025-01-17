'use strict';
/**
 * @module seneca-servicebus-transport
 */
const defaults = require('./defaults');
const hooks = require('./lib/hooks');

const PLUGIN_NAME = 'servicebus-transport';
const TRANSPORT_TYPE = 'servicebus';

const debug = require('debug')('seneca-servicebus-transport');

module.exports = opts => {
  var seneca = this;
  var so = seneca.options();
  var options = seneca.util.deepextend(defaults, so.transport, opts);

  debug('Initializing plugin with options %%O', options.servicebus);
  console.log('Initializing Service Bus');

  var listener = hooks.listenerHook(seneca);
  var client = hooks.clientHook(seneca);
  seneca.add(
    {
      role: 'transport',
      hook: 'listen',
      type: TRANSPORT_TYPE
    },
    listener.hook(options, 'listen')
  );
  seneca.add(
    {
      role: 'transport',
      hook: 'client',
      type: TRANSPORT_TYPE
    },
    client.hook(options, 'client')
  );

  return {
    name: PLUGIN_NAME
  };
};
