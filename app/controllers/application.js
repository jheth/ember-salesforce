import Ember from 'ember';

export default Ember.Controller.extend({
  isAuthenticated: function() {
    return Ember.isPresent(this.get('session.id'));
  }.property('session.id')
});
