export function initialize( container, application ) {

  var conn = new jsforce.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
    // loginUrl : 'https://test.salesforce.com'
    proxyUrl: application.jsforceProxyUrl
  });

  application.register('service:sfconn', conn, { instantiate: false });

  application.inject('route', 'sfconn', 'service:sfconn');
  application.inject('adapter', 'sfconn', 'service:sfconn');
}

export default {
  name: 'sfconn',
  initialize: initialize
};
