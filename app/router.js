import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('leads', function() {
    this.route('show', { path: '/:id'});
    this.route('edit', { path: "/:id/edit" });
  });
  this.route('contacts', function() {
    this.route('show', { path: '/:id'});
    this.route('edit', { path: "/:id/edit" });
    this.route('create');
  });
  this.route('accounts', function() {
    this.route('edit', { path: '/:id'});
    this.route('show', { path: "/:id/edit" });
  });
  this.route('connection');
});

export default Router;
