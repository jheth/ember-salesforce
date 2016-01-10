import SalesforceSerializer from 'ember-salesforce/serializers/salesforce';

export default SalesforceSerializer.extend({
  attrs: {
    CreatedBy: { embedded: 'always' },
    Opportunities: { embedded: 'always' }
  }
});
