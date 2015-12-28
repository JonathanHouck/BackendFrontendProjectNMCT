/**
 * Created by Greg on 04-Dec-15.
 */
function Product(_id, productName, pricePerDay, description, url, publicid, place, longitude, latitude, isDeleted){
    this.id = _id;
    this.productName = productName;
    this.pricePerDay = pricePerDay;
    this.description = description;
    this.url = url;
    this.publicid = publicid;
    this.place = place;
    this.longitude = longitude;
    this.latitude = latitude;
    this.isDeleted = isDeleted;
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