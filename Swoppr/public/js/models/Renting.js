/**
 * Created by Greg on 04-Dec-15.
 */
function Renting(renterId, userId,productId, fromDate, toDate, daysToRent, totalPrice) {
    this.renterFrom = renterId;
    this.renterTo = userId;
    this.productId = productId;
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.daysToRent = daysToRent;
    this.totalPrice = totalPrice;
}

Renting.prototype.toString = function(){
    return this.renterFrom;
};