/* global jsforce */

export function initialize( container, application ) {

  var forceConfig = application.jsforce || {};
  var conn = new jsforce.Connection(forceConfig);

  application.register('service:sfconn', conn, { instantiate: false });

  application.inject('route', 'sfconn', 'service:sfconn');
  application.inject('adapter', 'sfconn', 'service:sfconn');
}

export default {
  name: 'sfconn',
  initialize: initialize
};
