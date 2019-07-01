var mongoose = require('mongoose');
const config = require('../config');
var mainSchema = require('./mainSchema');

function createCards(inarr) {
    return new Promise((resolve, reject) => {
        connectto()
            .then(() => { return goarr(inarr) })
            .then(() => {
                console.log("YesYesYes!");
                resolve();
            })
            .catch((e) => {
                console.log(e);
                reject();
            })
    })
}

function goarr(inarr) {
    var allparr = [];
    inarr.forEach(function (value, i) {
        allparr[i] = createACard(value);
    })
    return Promise.all(allparr);
}

function createACard([basic, more]) {
    return new Promise((resolve, reject) => {
        inall([basic, more])
            .then(() => {
                resolve();
            })
            .catch((e) => {
                console.log(e);
                reject();
            })
    })
}

function connectto() {
    return new Promise((resolve, reject) => {
        mongoose.connect(config.MONGODBURL, { useNewUrlParser: true, keepAlive: 120 })
            .then(() => { resolve(); })
            .catch(() => { reject("ERR001 Cannot connect to mongodb!"); });
    });
}


function inall([basic, more]) {
    return Promise.all([inbasic(basic), inmore(basic.kind, more)]);
}

function inbasic(input_basic) {
    return new Promise((resolve, reject) => {
        var Cards = mongoose.model("Cards", mainSchema.scCards);
        Cards.create(input_basic)
            .then(() => { resolve(); })
            .catch(() => { reject("ERR002 Cannot insert data"); });
    });
}

function inmore(kind = "flight", input_more) {
    return new Promise((resolve, reject) => {
        var moreSchema = require('./moreSchema/' + kind + '.js');
        var More = mongoose.model(kind, moreSchema.sc);
        More.create(input_more)
            .then(() => { resolve(); })
            .catch(() => { reject("ERR002 Cannot insert data"); });
    });
}

exports.do = createCards;

/*
example

createCards(
[
    [
        {
            uni_id: "m1",
            exist: 0,
            user_id: "wyx",
            kind: "flight",
            createdate: "20190701"
        },
        {
            uni_id: "m1",
            flight_num: "CA4590",
            start_time: "201907021600"
        }
    ],
    [
        {
            uni_id: "m2",
            exist: 0,
            user_id: "wyx",
            kind: "flight",
            createdate: "20190701"
        },
        {
            uni_id: "m2",
            flight_num: "CA4590",
            start_time: "201907021600"
        }
    ]
]
)

*/