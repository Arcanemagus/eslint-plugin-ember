'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/order-in-routes');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('order-in-components', rule, {
  valid: [
    {
      code: 'export default Route.extend({currentUser: service(), queryParams: {}, customProp: "test", model() {}, beforeModel() {}, actions: {}, _customAction() {}, _customAction2: function() {}, tSomeTask: task(function* () {}) });',
      parserOptions: {ecmaVersion: 6, sourceType: "module"},
    },
    {
      code: 'export default Route.extend({model() {}, actions: { test() { return this._customAction() } }, _customAction() {} });',
      parserOptions: {ecmaVersion: 6, sourceType: "module"},
    },
  ],
  invalid: [
    {
      code: 'export default Route.extend({queryParams: {}, currentUser: service(), customProp: "test", model() {}, beforeModel() {}, actions: {}, _customAction() {} });',
      parserOptions: {ecmaVersion: 6, sourceType: "module"},
      errors: [{
        message: 'Check order of properties',
      }],
    },
    {
      code: 'export default Route.extend({customProp: "test", queryParams: {}, model() {}, beforeModel() {}, actions: {}, _customAction() {} });',
      parserOptions: {ecmaVersion: 6, sourceType: "module"},
      errors: [{
        message: 'Check order of properties',
      }],
    },
    {
      code: 'export default Route.extend({customProp: "test", queryParams: {}, beforeModel() {}, model() {}, actions: {}, _customAction() {} });',
      parserOptions: {ecmaVersion: 6, sourceType: "module"},
      errors: [{
        message: 'Check order of properties',
      }],
    },
    {
      code: 'export default Route.extend({queryParams: {}, customProp: "test", model() {}, _customAction() {}, actions: {} });',
      parserOptions: {ecmaVersion: 6, sourceType: "module"},
      errors: [{
        message: 'Check order of properties',
      }],
    },
    {
      code: 'export default Route.extend({model() {}, customProp: "test", actions: {} });',
      parserOptions: {ecmaVersion: 6, sourceType: "module"},
      errors: [{
        message: 'Check order of properties',
      }],
    },
  ]
});
