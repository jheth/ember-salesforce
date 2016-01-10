import { moduleForModel, test } from 'ember-qunit';

import User from 'ember-salesforce/models/user';

moduleForModel('contact', 'Unit', 'Unit | Model | contact', {
  // Specify the other units that are required for this test.
  needs: ['model:user']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
