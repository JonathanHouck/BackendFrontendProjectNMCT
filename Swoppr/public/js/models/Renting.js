/**
 * Created by Greg on 04-Dec-15.
 */
function Renting(lastname, firstname,emailadres, daysToRent){
    this.renterFrom = lastname;
    this.renterTo = firstname;
    this.product = emailadres;
    this.daysToRent = daysToRent;
}

Renting.prototype.toString = function(){
    return this.renterFrom;
};
