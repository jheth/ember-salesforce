import DS from 'ember-data';

export default DS.Model.extend({
  Name: DS.attr('string'),
  Account: DS.belongsTo('account'),
  CreatedBy: DS.belongsTo('user'),
  attributes: DS.attr('')
});
