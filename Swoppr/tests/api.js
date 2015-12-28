/**
 * Created by Greg on 14-Dec-15.
 */
var supertest = require("supertest");
var should = require("should");
var request = require('supertest');
var mongoose = require('mongoose');
var express = require('express');

// This agent refers to PORT where program is runninng.
var server = supertest.agent('http://localhost:3000');

mongoose.connect('mongodb://johna:swoppr@ds053774.mongolab.com:53774/swoppr');
    var productID = "5680abf1e7fa2d5022412575";
    var userID = "5680a63424095d780d70b2e5";
    var secondUserID = "567bfe4208c315042dd9590b";
    var rentingID = "5680b57fb534a2542c1d2fcf";
// UNIT test begin
describe("Api", function() {
    describe("Products", function () {
        it("getAll should return an array of products",function(done){
            server
                .get("/api/product/getAll/")
                .expect('Content-Type', 'application/json; charset=utf-8', done);
        });

        it("getById should return an array of products", function (done) {
            server
                .get('/api/product/getById/' + productID)
                .expect('Content-Type', 'application/json; charset=utf-8', done);
        });

        it("getByIdUser should return a an array of products", function (done) {
            server
                .get('/api/product/getByIdUser/'+userID)
                .expect('Content-Type', 'application/json; charset=utf-8', done);
        });
    });
    describe("Users", function () {

        it("getAll should return an array of users", function (done) {
            server
                .get('/api/user/getAll/')
                .expect('Content-Type', 'application/json; charset=utf-8', done);
        });


        it("gatAllUsersWithProducts should return an array of users", function (done) {
            server
                .get('/api/user/getAllUsersWithProducts/')
                .expect('Content-Type', 'application/json; charset=utf-8', done);
        });

        it("getById should return a user", function (done) {
            server
                .get('/api/user/getById/'+userID)
                .expect('Content-Type', 'application/json; charset=utf-8', done);
        });
    });

    describe("Rentings", function () {
        it("getById should return a renting", function (done) {
            server
                .get('/api/renting/getById/'+rentingID)
                .expect('Content-Type', 'application/json; charset=utf-8', done);
        });

        it("getAllRentingsRenterTo should return an array of rentings", function (done) {
            server
                .get('/api/renting/getAllRentingsRenterTo/'+secondUserID)
                .expect('Content-Type', 'application/json; charset=utf-8', done);
        });

        it("getAllRentingsRenterFrom should return an array og rentings", function (done) {
            server
                .get('/api/renting/getAllRentingsRenterFrom/'+userID)
                .expect('Content-Type', 'application/json; charset=utf-8', done);

        });

        it("getAllRentingsProduct should return an array of rentings", function (done) {
            server
                .get('/api/renting/getAllRentingsProduct/'+productID)
                .expect('Content-Type', 'application/json; charset=utf-8', done);
        });
    });
});