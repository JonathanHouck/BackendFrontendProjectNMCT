/**
 * Created by Greg on 18-Jan-16.
 */
describe("Product Service Test", function () {
    beforeEach(function() {
        //
    });

    /*  byId : byId,
        byIdUser : byIdUser,
        all : all,
        add : add,
        edit : edit,
        remove : remove */
    it("should be able to call a service", inject(function (ProductService) {
        expect(ProductService).toBeDefined();
    }));

    it("should contain a byId method", function () {
        expect(service).toHaveMethod("byId");
    });

    it("should contain a getById method", function () {
        expect(service).toHaveMethod("getById");
    });

    it("should be able to get several parking spots from the opendata service", function () {
        var data = service.get();
        expect(data).toBeDefined();
        expect(data.length).toBeGreaterThan(0);
    });

    it("should be able to get data of type Parking", function () {
        var data = service.get();
        expect(data[0]).toBeTypeOf('Parking');
    });
})


