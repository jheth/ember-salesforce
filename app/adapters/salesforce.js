import Ember from 'ember';
import DS from 'ember-data';
/* global jsforce  */

export default DS.Adapter.extend(Ember.Evented, {
  defaultSerializer: 'salesforce',
  coalesceFindRequests: false,
  connection: null,
  serverUrl: null,
  sessionId: null,
  proxyUrl: null,

  shouldReloadAll() {
    return true;
  },
  //
  // // opportunity => Opportunity
  // pathForType: function(type) {
  //   return Ember.String.capitalize(type.modelName);
  // },
  //
  /**
    This is the main entry point into finding records. The first parameter to
    this method is the model's name as a string.

    @method find
    @param {DS.Model} type
    @param {Object|String|Integer|null} id
   */
  findRecord: function(store, type, id, snapshot) {
    var self = this;
    console.log("find: ", type, id);

    this.conn();

    return new Ember.RSVP.Promise(function(resolve, reject) {
      // Single record retrieval
      return self.connection.sobject(type.modelName.capitalize()).retrieve(id, function(err, data) {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log("Id : " + data.Id);
          console.log("Name : " + data.Name);
          // ...
          console.log(data);
          data.id = data.Id;
          resolve(data);
        }
      });

    });
  },

  findAll: function(store, type, sinceToken) {
    var self = this;
    this.conn();

    var fields = ['Id'];
    type.eachAttribute(function(name, meta) {
      if (name !== 'attributes') {
        fields.push(name);
      }
    });

    type.eachRelationship(function(relationshipName, descriptor) {
      var kind = descriptor.kind;
      var relatedModel = store.modelFor(descriptor.type);

      /**
       * belongsTo:
       *
       * SELECT Id, Name, Account.id, Account.Name FROM Opportunity WHERE Id = 'X'
       */
      if (kind === "belongsTo") {
        fields.push(relationshipName + ".Id");

        relatedModel.eachAttribute(function(fname, meta) {
          var relatedField = relationshipName + "." + fname;
          if (fname !== 'attributes') {
            fields.push(relatedField);
          }
        });

      } else if (kind === "hasMany") {
        /**
         * hasMany:
         *
         * SELECT Id, Name, (SELECT Id, Name FROM Opportunities) FROM Account WHERE Id = 'X'
         */
        var subquery_fields = [];
        subquery_fields.push("Id");
        relatedModel.eachAttribute(function(fname, meta) {
          if (fname !== 'attributes') {
            subquery_fields.push(fname);
          }
        });
        var subquery = '(SELECT ' + subquery_fields.join(', ') + " FROM " + relationshipName + ')';
        fields.push(subquery);
      }
    });

    return new Ember.RSVP.Promise(function(resolve, reject) {

      var records = [];
      var soql = "SELECT " + fields.join(', ') + " FROM " + type.modelName.capitalize();
      console.log(soql);
      return self.connection.query(soql, function(err, result) {
        if (err) { return console.error(err); }

        console.log("total : " + result.totalSize);
        console.log("fetched : " + result.records.length);
        console.log("done ? : " + result.done);
        if (!result.done) {
          // you can use the locator to fetch next records set.
          // Connection#queryMore()
          console.log("next records URL : " + result.nextRecordsUrl);
        }

        for (var i = 0; i < result.records.length; i++) {
          console.log(result.records[i]);
          records.push(Ember.copy(result.records[i]));
        }
        resolve(records);
      });
    });
  },

  createRecord: function(store, type, snapshot) {
    // var data = {};
    // var serializer = store.serializerFor(type.modelName);
    // serializer.serializeIntoHash(data, type, record, { includeId: true });

    var data = this.serialize(snapshot, { includeId: true });

    console.log("Create : ", type, " with ", data);
    var self = this;
    this.conn();
    return new Ember.RSVP.Promise(function(resolve, reject) {
      // Single record creation
      self.connection.sobject(type.modelName).create(data, function(err, ret) {
        if (err || !ret.success) { return console.error(err, ret); }
        console.log("Created record id : " + ret.id);
        // ...
        if (ret.success === true) {
          console.log('resolve', ret);
          resolve(ret);
        }
      });
    });
  },

  updateRecord: function (store, type, snapshot) {
    //var data = {};
    //var serializer = store.serializerFor(type.modelName);
    //serializer.serializeIntoHash(data, type, record, { includeId: true });
    var data = this.serialize(snapshot, { includeId: true });

    var self = this;
    this.conn();
    return new Ember.RSVP.Promise(function(resolve, reject) {
      // Single record update
      self.connection.sobject(type.modelName).update(data, function(err, ret) {
        if (err || !ret.success) { return console.error(err, ret); }
        console.log('Updated Successfully : ' + ret.id);
        if (ret.success === true && ret.errors.length === 0) {
          resolve(ret);
        }
        // ...
        console.log(ret);
      });

    });
  },

  deleteRecord: function (store, type, snapshot) {
    var id = snapshot.id;

    console.log('Delete ' + type + ' ' + id);
    var self = this;

    this.conn();
    return new Ember.RSVP.Promise(function(resolve, reject) {
      // Single record deletion
      return self.connection.sobject(type.modelName).destroy(id, function(err, ret) {
        if (err || !ret.success) { return console.error(err, ret); }
        console.log('Deleted Successfully : ' + ret.id);
        if (ret.success === true) {
          console.log('resolve', ret);
          resolve(ret);
        }
      });
    });
  },

  conn: function() {
    if (this.connection === null) {
      this.connection = new jsforce.Connection({
        serverUrl : this.serverUrl,
        sessionId : this.sessionId,
        proxyUrl: this.proxyUrl
      });
    }
    return this.connection;
  }

});
