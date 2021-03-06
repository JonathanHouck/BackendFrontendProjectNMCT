/**
 * Created by Greg on 18-Jan-16.
 */
describe("Product Service Test", function () {
    var service;
    beforeEach(function() {
        service = ProductService;
    });

    it("should be able to call a service", function () {
        expect(service).toBeDefined();
    });

    it("should contain a byId method", function () {
        expect(service).toHaveMethod("byId");
    });

    it("should contain a byIdUser method", function () {
        expect(service).toHaveMethod("byIdUser");
    });

    it("should contain an all method", function () {
        expect(service).toHaveMethod("all");
    });

    it("should contain an add method", function () {
        expect(service).toHaveMethod("add");
    });

    it("should contain na edit method", function () {
        expect(service).toHaveMethod("edit");
    });

    it("should contain a remove method", function () {
        expect(service).toHaveMethod("remove");
    });
})


