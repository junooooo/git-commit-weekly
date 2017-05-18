#!/usr/bin/env node
/**
 * Created by nanhuijuan on 2017/4/27.
 */
"use strict";

const fs = require('fs');
const program = require('commander');
const moment = require('moment');
const path = require('path');
const generate = require('./generate');
const PKG = require('../package.json');
const init = require('./init');

program
    .version(PKG.version);

program
    .option('-c, --config [config-file]', '指定配置文件')
    .option('-o, --output [output-dir]', '指定报告存放的路径')
    .option('-p, --prev <numberOfWeek>', '指定生成 n 周前的报告');

program.command('init')
    .description('初始化配置')
    .action(init);

program.parse(process.argv);


if (program.rawArgs[2] === 'init')
    return;

const config = getConfig();
const startOfWeek = getStartOfWeek();
const outputDir = getOutputDir();

generate(config, startOfWeek, outputDir);

function getStartOfWeek() {
    let weekOffset = program.prev || 0;
    weekOffset = parseInt(weekOffset, 10);

    let startOfWeek = moment().startOf('week').add(1, 'd');
    if (weekOffset > 0) startOfWeek.subtract(weekOffset, 'weeks');
    return startOfWeek.toDate();
}

function getConfig(){
    let configPath;
    if (program.config) {
        return require(program.config);
    }
    else if (configPath = getLocalConfig()){
        return require(configPath);
    } else {
        throw new Error('本地和输入参数中都没发现配置文件');
    }
}

function getLocalConfig() {
    const localConfigPath = path.resolve(process.cwd(), 'weekly.config.json');
    return fs.existsSync(localConfigPath) && localConfigPath;
}

function getOutputDir() {
    if (program.output && fs.lstatSync(program.output).isDirectory()) {
        return program.output;
    }

    const localOutput = path.resolve(process.cwd(), 'output');
    if (!fs.existsSync(localOutput)) fs.mkdirSync(localOutput);
    return localOutput;
}