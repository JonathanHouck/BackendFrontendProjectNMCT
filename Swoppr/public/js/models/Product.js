/**
 * Created by Greg on 04-Dec-15.
 */
function Product(_id, productName, pricePerDay, description, url, place, longitude, latitude){
    this.id = _id;
    this.productName = productName;
    this.pricePerDay = pricePerDay;
    this.description = description;
    this.url = url;
    this.place = place;
    this.longitude = longitude;
    this.latitude = latitude;
}

Product.prototype.toString = function(){
    return this.productName;
};

Product.prototype.shortDescription = function() {
    if (!this.description) return "/";

    if (this.description.length < 250) {
        return this.description;
    } else {
        return this.description.substring(0, 250) + " ...";
    }
};

Product.prototype.shortProductName = function() {
    if (this.productName.length < 17) {
        return this.productName;
    } else {
        return this.productName.substring(0, 17) + " ...";
    }
};