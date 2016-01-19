/**
 * Created by Greg on 14-Dec-15.
 */
var supertest = require("supertest");
var should = require("chai").should;
var expect = require('chai').expect;
var request = require('supertest');
var mongoose = require('mongoose');
var express = require('express');

// This agent refers to PORT where program is runninng.
var server = supertest.agent('http://localhost:3000');

mongoose.connect('mongodb://johna:swoppr@ds053774.mongolab.com:53774/swoppr');
var productID = "568fc83a47b13a1100cf0d8d";
var userID = "5680a63424095d780d70b2e5";
var secondUserID = "568fa37bc554d0401296a5fa";
var rentingID = "568fcde954b3a5110042cf56";

// UNIT test begin
describe("Api", function() {
    describe("Products", function () {
        it("getById should return a product", function (done) {
            server
                .get('/api/product/getById/' + productID)
                .expect('Content-Type', 'application/json')
                .end(function(err, res){
                    checkProduct(res.body.ok);
                    done();
                });
        });
        it("getAll should return an array of products",function(done){
            server
                .get("/api/product/getAll/")
                .expect('Content-Type', 'application/json')
                .end(function(err, res) {
                    checkProduct(res.body.ok[0]);
                    done();
                });
        });

        it("getByIdUser should return a user", function (done) {
            server
                .get('/api/product/getByIdUser/'+productID)
                .expect('Content-Type', 'application/json')
                .end(function(err, res) {
                    checkUser(res.body.ok, true);
                    done();
                });
        });
    });

    describe("Users", function () {
        it("getById should return a user", function (done) {
            server
                .get('/api/user/getById/'+userID)
                .expect('Content-Type', 'application/json')
                .end(function(err, res) {
                    checkUser(res.body.ok);
                    done();
                });
        });

        it("getAll should return an array of users", function (done) {
            server
                .get('/api/user/getAll/')
                .expect('Content-Type', 'application/json')
                .end(function(err, res) {
                    checkUser(res.body.ok[0], false);
                    done();
                });
        });


        it("getAllUsersWithProducts should return an array of users", function (done) {
            server
                .get('/api/user/getAllUsersWithProducts/')
                .expect('Content-Type', 'application/json')
                .end(function(err, res) {
                    checkUser(res.body.ok[0], false);
                    done();
                });
        });
    });

    describe("Rentings", function () {
        it("getById should return a renting", function (done) {
            server
                .get('/api/renting/getById/'+rentingID)
                .expect('Content-Type', 'application/json')
                .end(function(err, res) {
                    checkRenting(res.body.ok);
                    done();
                });
        });

        it("getAllRentingsRenterTo should return an array of rentings", function (done) {
            server
                .get('/api/renting/getAllRentingsRenterTo/'+secondUserID)
                .expect('Content-Type', 'application/json')
                .end(function(err, res) {
                    checkRenting(res.body.ok[0]);
                    done();
                });
        });

        it("getAllRentingsRenterFrom should return an array of rentings", function (done) {
            server
                .get('/api/renting/getAllRentingsRenterFrom/'+userID)
                .expect('Content-Type', 'application/json')
                .end(function(err, res) {
                    checkRenting(res.body.ok[0]);
                    done();
                });

        });

        it("getAllRentingsProduct should return an array of rentings", function (done) {
            server
                .get('/api/renting/getAllRentingsProduct/'+productID)
                .expect('Content-Type', 'application/json')
                .end(function(err, res) {
                    checkRenting(res.body.ok[0]);
                    done();
                });
        });
    });
});


var checkProduct = function(item){
    expect(item).to.have.property("latitude");
    expect(item).to.have.property("longitude");
    expect(item).to.have.property("place");
    //expect(item).to.have.property("publicid");
    //expect(item).to.have.property("url");
    expect(item).to.have.property("description");
    expect(item).to.have.property("pricePerDay");
    expect(item).to.have.property("productName");
    expect(item).to.have.property("createdOn");
};

var checkUser = function(item, byproduct){
    expect(item).to.have.property("surname");
    expect(item).to.have.property("firstname");
    expect(item).to.have.property("createdOn");
    expect(item).to.have.property("local");
    expect(item.local).to.have.property("password");
    expect(item.local).to.have.property("email");
    if(byproduct) expect(item).to.have.property("product");
    else expect(item).to.have.property("products");
};


var checkRenting = function(item){
    expect(item).to.have.property("renterFrom");
    expect(item).to.have.property("renterTo");
    expect(item).to.have.property("fromDate");
    expect(item).to.have.property("toDate");
    expect(item).to.have.property("daysToRent");
    expect(item).to.have.property("totalPrice");
    expect(item).to.have.property("createdOn");
};