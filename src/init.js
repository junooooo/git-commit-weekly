/**
 * Created by nanhuijuan on 2017/5/18.
 */
"use strict";

const fs = require('fs');
const execSync = require('child_process').execSync;
const config = require('../config');


function getGitUsername() {
    const gitName = execSync('git config --get user.name');
    return gitName.toString().trim();
}

function saveAsJson(config) {
    return fs.writeFileSync('weekly.config.json', JSON.stringify(config, null, 4));
}

module.exports = function () {
    const username = getGitUsername();
    config.author = username;
    saveAsJson(config);
    console.log('周报项目已经成功初始化。');
    console.log('请修改 weekly.config.json，配置项目目录及名称。');
    console.log('配置完成后，运行 git-weekly 生成第一份周报吧 ^_^ enjoy');
};

