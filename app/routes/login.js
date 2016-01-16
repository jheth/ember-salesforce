import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    authenticate: function(username, password) {

      /* sfconn is injected into routes */
      this.sfconn.login(username, password, (err, userInfo) => {
        if (err) {
          this.toast.info(err.toString());
          return console.error(err);
        }

        // Now you can get the access token and instance URL information.
        // Save them to establish connection next time.
        console.log(this.sfconn.accessToken);
        console.log(this.sfconn.instanceUrl);

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        document.cookie = "accessToken=" + this.sfconn.accessToken + "; expires=" + tomorrow.toGMTString() + "; path=/";
        document.cookie = "instanceUrl=" + this.sfconn.instanceUrl + "; expires=" + tomorrow.toGMTString() + "; path=/";

        // logged in user property
        console.log("User ID: " + userInfo.id);
        console.log("Org ID: " + userInfo.organizationId);

        /* assign attributes to session service object */
        Object.keys(userInfo).forEach((key) => {
          var value = userInfo[key];
          this.set('session.' + key, value);
        })

        this.transitionTo('accounts');
      });
    }
  }
});
