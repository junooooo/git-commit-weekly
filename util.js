/**
 * Created by nanhuijuan on 2017/4/28.
 */
"use strict";
const fs = require('fs');

exports.calDiffInDays = function (date1, date2) {
    const milisecondsOfOneDay = 1000*60*60*24;
    const diffInMilisecond = Math.abs(date1 - date2);
    return Math.floor(diffInMilisecond/milisecondsOfOneDay);
};

exports.isMergeMessage = function (msg) {
    const reg = /Merge branch .+ of .+ into .+/;
    return reg.test(msg);
};

exports.writerFile =  function (...args) {
    return new Promise( (resolve, reject) => {
        fs.writeFile(...args, err => {
            if (err) return reject(err);

            resolve();
        });
    });
};