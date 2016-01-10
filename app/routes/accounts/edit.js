import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('account', params.id).then(function(account) {
      return account.reload();
    });
  },
  afterModel: function(model) {
    if (Ember.isEmpty(model)) {
      model.reload();
    }
  }
});
