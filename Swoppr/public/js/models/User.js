/**
 * Created by Greg on 04-Dec-15.
 */
function User(_id, firstname, surname, local, google, products){
    this.id = _id;
    this.firstname = firstname;
    this.surname = surname;
    this.local = local;
    this.google = google;
    this.products = products;
}

User.prototype.toString = function(){
    return this.firstname + " " + this.surname;
};