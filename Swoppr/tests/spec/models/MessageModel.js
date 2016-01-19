/**
 * Created by Greg on 19-Jan-16.
 */
var message = new Message(1,2, "testname", "content", "20 oktober");
describe("Message Model", function(){
        it("should be defined", function(){
            expect(message).toBeDefined();
        });

        it("should have all his properties", function(){

            expect(message.rentingId).toEqual(1);
            expect(message.senderId).toEqual(2);
            expect(message.name).toEqual("testname");
            expect(message.content).toEqual("content");
            expect(message.createdOn).toEqual("20 oktober");
        });
});
