/**
 * Created by Greg on 18-Jan-16.
 */
describe("Product Service Test", function () {
    var service;
    beforeEach(function() {
        service = MessageService;
    });

    it("should be able to call a service", function () {
        expect(service).toBeDefined();
    });

    it("should contain a byId method", function () {
        expect(service).toHaveMethod("getMessages");
    });

    it("should contain a byIdUser method", function () {
        expect(service).toHaveMethod("addMessage");
    });
})


