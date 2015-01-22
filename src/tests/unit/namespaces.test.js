describe('Namespace', function () {
   describe('window.App', function () {
      it("should be defined", function () {
         // Arrange
         var App = window.App;

         // Assert
         expect(App).toBeDefined();
      });
   });
});
