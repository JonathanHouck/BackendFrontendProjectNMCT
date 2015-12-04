/**
 * Created by Greg on 04-Dec-15.
 */
function User(lastname, firstname,emailadres, products, createdOn){
    this.lastname = lastname;
    this.firstname = firstname;
    this.emailadres = emailadres;
    this.products = products;
    this.createdOn = createdOn;
}

User.prototype.toString = function(){
    return this.firstname + " " + this.lastname;
};