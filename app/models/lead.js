import DS from 'ember-data';

export default DS.Model.extend({
  attributes: DS.attr(''),
  Name: DS.attr('string'),
  Company: DS.attr('string'),
  Title: DS.attr('string'),
  Phone: DS.attr('string'),
  Email: DS.attr('string'),
  LeadSource: DS.attr('string'),
  CreatedBy: DS.belongsTo('user')
});
