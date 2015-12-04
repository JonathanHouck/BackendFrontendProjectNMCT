/**
 * Created by Greg on 04-Dec-15.
 */
function Renting(renterId, userId,productId, daysToRent){
    this.renterFrom = renterId;
    this.renterTo = userId;
    this.product = productId;
    this.daysToRent = daysToRent;
}

Renting.prototype.toString = function(){
    return this.renterFrom;
};
