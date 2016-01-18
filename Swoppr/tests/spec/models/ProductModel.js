/**
 * Created by Greg on 17-Nov-15.
 */

var product = new Product(1,"name", 200, "description", "url", 2, "place", 200,201,false);
describe("Product Model", function(){
    describe("Properties", function(){
        it("should be defined", function(){
            expect(product).toBeDefined();
        });

       it("should have all his properties", function(){

           expect(product.id).toEqual(1);
           expect(product.productName).toEqual("name");
           expect(product.pricePerDay).toEqual(200);
           expect(product.description).toEqual("description");
           expect(product.url).toEqual("url");
           expect(product.publicid).toEqual(2);
           expect(product.place).toEqual("place");
           expect(product.longitude).toEqual(200);
           expect(product.latitude).toEqual(201);
           expect(product.isDeleted).toEqual(false);
       });

        it("toString() should return the product name", function(){
            expect(product.toString()).toEqual(product.productName);
        });
    });
});
