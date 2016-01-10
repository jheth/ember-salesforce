import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('contact');
  },
  actions: {
    save: function(model) {
      model.save().then(() => {
        this.transitionTo('contacts');
      });
    },
    delete: function(model) {
      model.destroyRecord().then(() => {
        this.transitionTo('contacts');
      });
    }
  }
});
