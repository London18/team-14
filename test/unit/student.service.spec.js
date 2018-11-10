describe('Factory: Students', function() {
  var factory;

  // Before each test load our Braniac module
  beforeEach(angular.mock.module('Braniac'));

  // Before each test set our injected Students factory to our local factory variable
  beforeEach(inject(function(Students) {
    factory = Students;
  }));

  // Test to verify the Students factory exists
  it('should exist', function() {
    expect(factory).toBeDefined();
  });

});