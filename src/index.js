#!/usr/bin/env node
/**
 * Created by nanhuijuan on 2017/4/27.
 */
"use strict";

const gitlog = require('gitlog');
const moment = require('moment');
const path = require('path');
const config = require('../config');
const util = require('./util');
const weeklyToString = require('./weeklyToString');

let weekOffset = process.env.npm_config_prev;

let startOfWeek = moment().startOf('week').add(1, 'd');
if (weekOffset > 0) startOfWeek.subtract(weekOffset, 'weeks');
startOfWeek = startOfWeek.toDate();

const task = config.repos.map(function (repo) {
    return weeklyForOneRepo(repo.path);
});

Promise.all(task)
    .then(function (weekly) {
        const log = weeklyToString(startOfWeek, config.repos, weekly);
        return util.writerFile(formatOutputPath(log.title), log.str);
    })
    .then( () => console.log('周报已生成，请前往 output 文件夹查看'))
    .catch( err => {
        console.log('出错啦', err);
    });

function weeklyForOneRepo(repo) {
    const _weekly = new Array(7);
    return getLogs(repo, config.author, startOfWeek)
        .then(logs => {
            logs.forEach(log => {
                if (util.isMergeMessage(log.subject)) return;

                const _date = new Date(log.authorDate.replace('@end@', ''));
                const dayOfWeek = util.calDiffInDays(_date, startOfWeek);
                _weekly[dayOfWeek] = _weekly[dayOfWeek] || [];
                _weekly[dayOfWeek].push(log.subject);
            });
            return _weekly;
        });
}


function getLogs(repo, author, startDay) {
    const options =
        {
            repo: repo,
            number: 1000,
            author: author,
            fields: [
                'hash',
                'abbrevHash',
                'subject',
                'authorName',
                'authorDateRel',
                'authorDate'
            ],
            after: startDay,
            all: true
        };

    return new Promise((resolve, reject) => {
        gitlog(options, function (error, commits) {
            if (error) {
                return reject(error);
            }
            return resolve(commits);
        });
    })
}

function formatOutputPath(title){
    return path.join(__dirname, '../output', title + '.md');
}
