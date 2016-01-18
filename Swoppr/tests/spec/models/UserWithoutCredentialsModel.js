/**
 * Created by Greg on 17-Nov-15.
 */

var userWithoutCredentials = new UserWithoutCredentials(1,"Greg", "Ameye", "Greg@ameye.com", product);

describe("UserWithoutCredentials Model", function(){
    describe("Properties", function(){
        it("should be defined", function(){
            expect(userWithoutCredentials).toBeDefined();
        });

        it("should have all his properties", function(){
            expect(userWithoutCredentials.id).toEqual(1);
            expect(userWithoutCredentials.firstname).toEqual("Greg");
            expect(userWithoutCredentials.surname).toEqual("Ameye");
            expect(userWithoutCredentials.emailadres).toEqual("Greg@ameye.com");
            expect(userWithoutCredentials.product).toEqual(product);
        });

        it("toString() should return the renter", function(){
            expect(userWithoutCredentials.toString()).toEqual(userWithoutCredentials.firstname + " "+userWithCredentials.surname);
        });
    });
});
