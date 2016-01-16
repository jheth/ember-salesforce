import { moduleForModel, test } from 'ember-qunit';

moduleForModel('opportunity', 'Unit | Model | opportunity', {
  // Specify the other units that are required for this test.
  needs: ['model:account', 'model:user']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
