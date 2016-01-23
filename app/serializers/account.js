import SalesforceSerializer from 'ember-force/serializers/salesforce';

export default SalesforceSerializer.extend({
  attrs: {
    CreatedBy: { embedded: 'always' },
    Opportunities: { embedded: 'always' }
  }
});
