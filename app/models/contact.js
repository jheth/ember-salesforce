import DS from 'ember-data';

export default DS.Model.extend({
  attributes: DS.attr(),
  FirstName: DS.attr('string'),
  LastName: DS.attr('string'),
  Title: DS.attr('string'),
  Department: DS.attr('string'),
  CreatedBy: DS.belongsTo('user')
});
