import SalesforceSerializer from 'ember-force/serializers/salesforce';

export default SalesforceSerializer.extend({
  attrs: {
    CreatedBy: { embedded: 'always' },
    Account: { embedded: 'always' }
  }
});
