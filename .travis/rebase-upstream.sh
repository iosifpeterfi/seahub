#!/bin/bash

git branch

git fetch git@github.com:haiwen/seahub.git master:master

git rebase master
