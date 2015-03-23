App.rootElement = '#ember-testing';
App.setupForTesting();
App.injectTestHelpers();
if (Ember.$('#ember-testing').length === 0) {
  Ember.$('<div id="ember-testing"/>').appendTo(document.body);
}
