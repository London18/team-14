describe('Factory: Messages', function() {
  var factory;

  // Before each test load our Braniac module
  beforeEach(angular.mock.module('Braniac'));

  // Before each test set our injected Messages factory to our local factory variable
  beforeEach(inject(function(Messages) {
    factory = Messages;
  }));

  // Test to verify the Messages factory exists
  it('should exist', function() {
    expect(factory).toBeDefined();
  });

});