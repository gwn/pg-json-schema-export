var assert = require('assert');
var _ = require('lodash');
var pgSchema = require('./');

describe('pg-json-schema-export', function () {
  var options = {
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DATABASE || 'postgres',
    port: process.env.POSTGRES_PORT || 5432
  };

  describe('#toJSON', function () {
    var schema;
    before(function (done) {
      pgSchema.toJSON(options)
        .then(function (_schema) {
          schema = _schema;
          done();
        })
        .catch(done);
    });

    it('should return an object', function () {
      //console.log(JSON.stringify(schema, null, 2));
      assert(_.isObject(schema));
    });

    describe('can access specific columns with js dot-notation', function () {
      it('public.cashrcpt.cashrcpt_notes', function () {
        assert(_.isObject(schema.public));
        assert(_.isObject(schema.public.cashrcpt));
        assert(_.isObject(schema.public.cashrcpt.cashrcpt_notes));
      });
      it('public.atlasmap.atlasmap_headerline.col_description', function () {
        assert(_.isString(schema.public.atlasmap.atlasmap_headerline.col_description));
      });
    });

  });

});