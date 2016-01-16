import Ember from 'ember';

export function initialize( container, application ) {
  application.register('service:session', Ember.Map.create(), { instantiate: false });
  application.inject('route', 'session', 'service:session');
  application.inject('controller', 'session', 'service:session');
}

export default {
  name: 'session',
  initialize: initialize
};
