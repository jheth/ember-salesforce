import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    this.sfconn._sessionType = 'soap';

    this.sfconn.logout().then((err) => {
      if (err) {
        this.toast.info(err.toString());
        return console.error(err);
      }

      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      this.set('session.id', null);

      /* reset session hash */
      Object.keys(this.session).forEach((key) => {
        this.session.delete(key);
      });

      document.cookie = 'accessToken=;expires=' + yesterday.toGMTString() + ';';
      document.cookie = 'instanceUrl=;expires=' + yesterday.toGMTString() + ';';
      // now the session has been expired.
      this.transitionTo('login');
    });
  }
});
