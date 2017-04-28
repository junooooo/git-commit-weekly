/**
 * Created by nanhuijuan on 2017/4/28.
 */
"use strict";

const moment = require('moment');
const {contentFormat} = require('./config');

const TITLE_PREFIX = contentFormat.titlePrefix || '# ';
const NAME_OF_DAY_OF_WEEK = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const WEEK_NAME_PREFIX = contentFormat.weekNamePrefix || '### ';
const REPO_NAME_PREFIX = contentFormat.repoNamePrefix || '- ';
const ITEM_PREFIX = contentFormat.itemPrefix || '    - ';

module.exports = function weeklyToString(startOfWeek, repos, weekly) {
    const title = weeklyTitle(startOfWeek);
    let str = TITLE_PREFIX + title + '\n';
    const numOfDays = 7;

    for (let i = 0; i < numOfDays ; i++) {
        str += (WEEK_NAME_PREFIX + NAME_OF_DAY_OF_WEEK[i] + '\n');

        repos.forEach(function (repo, repoIndex) {
            const items = weekly[repoIndex][i];
            if (Array.isArray(items) && items.length > 0) {
                str +=  (REPO_NAME_PREFIX + repo.name + '\n');
                str += ITEM_PREFIX;
                str += items.join('\n' + ITEM_PREFIX);
                str += '\n';
            }
        })
    }

    return {title, str};
};

function weeklyTitle(startOfWeek) {
    const _startOfWeek = moment(startOfWeek);
    const _endOfWeek = moment(startOfWeek).add(6, 'd');
    const titleFormat = 'YYYYMMDD';

    return _startOfWeek.format(titleFormat) + '-' + _endOfWeek.format(titleFormat);
}