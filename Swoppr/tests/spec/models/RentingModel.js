/**
 * Created by Greg on 17-Nov-15.
 */

var renting = new Renting(1,"renter1", "user1", 200, "20 oktober", "30 oktober", 2, 200);

describe("RentingModel", function(){
        it("should be defined", function(){
            expect(renting).toBeDefined();
        });

        it("should have all his properties", function(){
            expect(renting.id).toEqual(1);
            expect(renting.renterFrom).toEqual("renter1");
            expect(renting.renterTo).toEqual("user1");
            expect(renting.productId).toEqual(200);
            expect(renting.fromDate).toEqual("20 oktober");
            expect(renting.toDate).toEqual("30 oktober");
            expect(renting.daysToRent).toEqual(2);
            expect(renting.totalPrice).toEqual(200);
        });

        it("toString() should return the renter", function(){
            expect(renting.toString()).toEqual(renting.renterFrom);
        });
});
