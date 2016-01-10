import DS from 'ember-data';

export default DS.Model.extend({
  Username: DS.attr('string'),
  FirstName: DS.attr('string'),
  LastName: DS.attr('string'),
  Name: DS.attr('string'),
  Title: DS.attr('string'),
  Email: DS.attr('string'),
  FullPhotoUrl: DS.attr('string'),
  SmallPhotoUrl: DS.attr('string'),
  attributes: DS.attr()
});
