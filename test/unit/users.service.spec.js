describe('Factory: Users', function() {
  var factory;

  // Before each test load our Braniac module
  beforeEach(angular.mock.module('Braniac'));

  // Before each test set our injected Users factory to our local factory variable
  beforeEach(inject(function(Users) {
    factory = Users;
  }));

  // Test to verify the Users factory exists
  it('should exist', function() {
    expect(factory).toBeDefined();
  });

});