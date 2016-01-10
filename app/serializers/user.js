import DS from 'ember-data';
import SalesforceSerializer from 'ember-salesforce/serializers/salesforce';

export default SalesforceSerializer.extend({
  attrs: {
    CreatedBy: { embedded: 'always' }
  }
});
