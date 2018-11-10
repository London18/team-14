describe('Factory: Groups', function() {
  var factory;

  // Before each test load our Braniac module
  beforeEach(angular.mock.module('Braniac'));

  // Before each test set our injected Groups factory to our local factory variable
  beforeEach(inject(function(Groups) {
    factory = Groups;
  }));

  // Test to verify the Groups factory exists
  it('should exist', function() {
    expect(factory).toBeDefined();
  });

});