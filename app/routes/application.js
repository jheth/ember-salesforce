import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(transition) {

    if (!this.session.hasOwnProperty('id') && transition.targetName != 'login') {
      /* Check for exisiting cookie */
      var tokenMatches = document.cookie.match(/accessToken\=([^;]*)/);
      var instanceMatches = document.cookie.match(/instanceUrl\=([^;]*)/);

      if (tokenMatches && instanceMatches) {
        this.sfconn.instanceUrl = instanceMatches[1];
        this.sfconn.accessToken = tokenMatches[1];
      } else {
        this.transitionTo('login');
      }
    }
  },
  model: function() {
    if (this.sfconn.accessToken && this.sfconn.instanceUrl) {
      return this.sfconn.identity((err, res) => {
        if (err) { return console.error(err); }
        console.log("user ID: " + res.user_id);
        console.log("organization ID: " + res.organization_id);
        console.log("username: " + res.username);
        console.log("display name: " + res.display_name);

        /* assign attributes to session service object */
        Object.keys(res).forEach((key) => {
          var value = res[key];
          this.set('session.' + key, value);
        })
      });
    } else {
      console.log('sfconn not satisfied');
    }
  },
  actions: {
    error: function(error, transition) {
      // Manage your errors
      // Ember.onerror(error);
      this.toast.info(error.toString());

      if (transition.targetName != 'login') {
        // this.transitionTo('login');
      }

      // substate implementation when returning `true`
      // return true;
    }
  }
});
