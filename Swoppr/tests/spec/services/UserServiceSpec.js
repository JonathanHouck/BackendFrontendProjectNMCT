/**
 * Created by Greg on 18-Jan-16.
 */
describe("User Service Test", function () {
    var service;
    beforeEach(function() {
        service = UserService;
    });

    it("should be able to call a service", function () {
        expect(service).toBeDefined();
    });

    it("should contain a login method", function () {
        expect(service).toHaveMethod("login");
    });

    it("should contain a register method", function () {
        expect(service).toHaveMethod("register");
    });

    it("should contain a logout method", function () {
        expect(service).toHaveMethod("logout");
    });

    it("should contain a userData method", function () {
        expect(service).toHaveMethod("userData");
    });

    it("should contain a byId method", function () {
        expect(service).toHaveMethod("byId");
    });

    it("should contain an AllWithProducts method", function () {
        expect(service).toHaveMethod("AllWithProducts");
    });

    it("should contain an add method", function () {
        expect(service).toHaveMethod("add");
    });

    it("should contain an all method", function () {
        expect(service).toHaveMethod("all");
    });
})


