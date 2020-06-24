#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

cd dist

git init
git config user.name "FengJianxin"
git config user.email "fengjianxin2012@gmail.com"
git checkout -b gh-pages
git add .
git commit -m 'deploy'

git push -f git@github.com:fjx-grd/vue-baidu-map.git gh-pages:gh-pages

cd ..
rm -rf dist
