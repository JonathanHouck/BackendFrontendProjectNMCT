/**
 * Created by jonah on 12/23/2015.
 */
function UserWithoutCredentials(_id, firstname, surname, emailadres, product) {
    this.id = _id;
    this.firstname = firstname;
    this.surname = surname;
    this.emailadres = emailadres;
    this.product = product;
}

UserWithoutCredentials.prototype.toString = function(){
    return this.firstname + " " + this.surname;
};