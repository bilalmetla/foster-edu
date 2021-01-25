
#!/usr/bin/env bash

cd ../

git status
git add .
git commit -m "publishing to heroku"
git push heroku master
