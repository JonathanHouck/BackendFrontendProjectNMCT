/**
 * Created by Greg on 17-Nov-15.
 */


var userWithCredentials = new UserWithCredentials(1,"Greg", "Ameye", "Greg@ameye.com", "gregn", product);

describe("UserWithCredentials Model", function(){
    describe("Properties", function(){
        it("should be defined", function(){
            expect(userWithCredentials).toBeDefined();
        });

        it("should have all his properties", function(){
            expect(userWithCredentials.id).toEqual(1);
            expect(userWithCredentials.firstname).toEqual("Greg");
            expect(userWithCredentials.surname).toEqual("Ameye");
            expect(userWithCredentials.local).toEqual("Greg@ameye.com");
            expect(userWithCredentials.google).toEqual("gregn");
            expect(userWithCredentials.products).toEqual(product);
        });

        it("toString() should return the renter", function(){
            expect(userWithCredentials.toString()).toEqual(userWithCredentials.firstname + " "+userWithCredentials.surname);
        });
    });
});
