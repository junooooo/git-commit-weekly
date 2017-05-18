/**
 * Created by nanhuijuan on 2017/5/17.
 */
const path = require('path');
const gitlog = require('gitlog');
const util = require('./util');
const weeklyToString = require('./weeklyToString');

module.exports = function generateLogs(config, startOfWeek, outputDir) {
    const task = config.repos.map(function (repo) {
        return weeklyForOneRepo(repo.path, config, startOfWeek);
    });

    Promise.all(task)
        .then(function (weekly) {
            const log = weeklyToString(startOfWeek, config.repos, weekly);
            return util.writerFile(formatOutputPath(outputDir, log.title), log.str);
        })
        .then( () => console.log('周报已生成，请前往 %s 文件夹查看', outputDir))
        .catch( err => {
            console.log('出错啦', err);
        });
};

function weeklyForOneRepo(repo, config, startOfWeek) {
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

function formatOutputPath(dir, title){
    return path.join(dir, title + '.md');
}
