describe('Factory: AdminEmails', function() {
  var factory;

  // Before each test load our Braniac module
  beforeEach(angular.mock.module('Braniac'));

  // Before each test set our injected AdminEmails factory to our local factory variable
  beforeEach(inject(function(AdminEmails) {
    factory = AdminEmails;
  }));

  // Test to verify the AdminEmails factory exists
  it('should exist', function() {
    expect(factory).toBeDefined();
  });

});