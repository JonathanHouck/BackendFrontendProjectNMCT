/**
 * Created by Greg on 04-Dec-15.
 */
function Product(productName, pricePerDay, description, createdOn){
    this.productName = productName;
    this.pricePerDay = pricePerDay;
    this.description = description;
    this.createdOn = createdOn;
}

Product.prototype.toString = function(){
    return this.productName;
};