/**
 * Created by Greg on 04-Dec-15.
 */
function User(_id, firstname, surname ,emailadres, products, createdOn){
    this.id = _id;
    this.firstname = firstname;
    this.surname = surname;
    this.emailadres = emailadres;
    this.products = products;
    this.createdOn = createdOn;
}

User.prototype.toString = function(){
    return this.firstname + " " + this.lastname;
};
