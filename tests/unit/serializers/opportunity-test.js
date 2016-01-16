import { moduleForModel, test } from 'ember-qunit';

moduleForModel('opportunity', 'Unit | Serializer | opportunity', {
  // Specify the other units that are required for this test.
  needs: ['serializer:opportunity', 'model:account', 'model:user']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  var record = this.subject();

  var serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
