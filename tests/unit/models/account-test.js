import { moduleForModel, test } from 'ember-qunit';

import Opportunity from 'ember-salesforce/models/opportunity';
import User from 'ember-salesforce/models/user';

moduleForModel('account', 'Unit', 'Unit | Model | account', {
  // Specify the other units that are required for this test.
  needs: ['model:opportunity', 'model:user']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
