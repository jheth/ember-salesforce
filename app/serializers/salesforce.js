import DS from 'ember-data';

export default DS.JSONSerializer.extend(DS.EmbeddedRecordsMixin, {
  primaryKey: 'Id',
  isNewSerializerAPI: true,

  attrs: {
    attributes: {
      serialize: false
    }
  },

  normalizeResponse: function(store, primaryModelClass, payload, id, requestType) {
    payload.Id = payload.id;
    return this._super(store, primaryModelClass, payload, id, requestType);
  },
  extractRelationships: function(modelClass, resourceHash) {
    if (resourceHash.Id) {
      resourceHash.id = resourceHash.Id;
    }

    modelClass.eachRelationship((key, relationshipMeta) => {
      var relationshipKey = this.keyForRelationship(key, relationshipMeta.kind, "deserialize");
      if (resourceHash.hasOwnProperty(relationshipKey)) {

        var relationshipHash = resourceHash[relationshipKey];
        if (relationshipMeta.kind === "hasMany") {
          /* Salesforce Relationship: {size: 3, done: true, records: []} */

          /* Need to assign records array into Hash */
          if (relationshipHash && relationshipHash.hasOwnProperty('records')) {
            /* Overwrite Hash with Array */
            resourceHash[relationshipKey] = relationshipHash.records;
          }
        }
      }
    });

    return this._super(modelClass, resourceHash);
  },

  serialize: function(snapshot, options) {
    var json = {};
    snapshot.eachAttribute(function(name) {
      json[name] = snapshot.attr(name);
    });

    /* Do not serialize relationships */
    if (options && options.includeId) {
      json.Id = snapshot.id;
    }

    return json;
  }

});
