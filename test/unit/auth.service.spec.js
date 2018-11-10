describe('Factory: Auth', function() {
  var factory;

  // Before each test load our Braniac module
  beforeEach(angular.mock.module('Braniac'));

  // Before each test set our injected Auth factory to our local factory variable
  beforeEach(inject(function(Auth) {
    factory = Auth;
  }));

  // Test to verify the Auth factory exists
  it('should exist', function() {
    expect(factory).toBeDefined();
  });

});
