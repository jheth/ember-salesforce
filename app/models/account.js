import DS from 'ember-data';

export default DS.Model.extend({
  attributes: DS.attr(''),
  Name: DS.attr('string'),
  BillingCity: DS.attr('string'),
  BillingState: DS.attr('string'),
  BillingPostalCode: DS.attr('string'),
  BillingCountry: DS.attr('string'),
  Opportunities: DS.hasMany('opportunity'),
  CreatedBy: DS.belongsTo('user')
});
