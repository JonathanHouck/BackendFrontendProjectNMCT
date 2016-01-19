/**
 * Created by Greg on 18-Jan-16.
 */
describe("Renting Service Test", function () {
    var service;
    beforeEach(function() {
        service = RentingService;
    });
    it("should be able to call a service", function () {
        expect(service).toBeDefined();
    });
    it("should contain a byId method", function () {
        expect(service).toHaveMethod("byId");
    });

    it("should contain a byRenterFrom method", function () {
        expect(service).toHaveMethod("byRenterFrom");
    });

    it("should contain a byRenterTo method", function () {
        expect(service).toHaveMethod("byRenterTo");
    });

    it("should contain an add method", function () {
        expect(service).toHaveMethod("add");
    });

    it("should contain an edit method", function () {
        expect(service).toHaveMethod("edit");
    });

    it("should contain a remove method", function () {
        expect(service).toHaveMethod("remove");
    });
})


