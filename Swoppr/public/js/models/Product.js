/**
 * Created by Greg on 04-Dec-15.
 */
function Product(productName, pricePerDay, description, url, createdOn, userId){
    this.productName = productName;
    this.pricePerDay = pricePerDay;
    this.description = description;
    this.url = url;
    this.createdOn = createdOn;
    this.userId = userId;
}

Product.prototype.toString = function(){
    return this.productName;
};