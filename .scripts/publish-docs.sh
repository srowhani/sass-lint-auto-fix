REMOTE=$(git config --get remote.origin.url);
VERSION=$(node -e "console.log(require('./package.json').version)");

cd docs;
git init;
git remote add origin $REMOTE;
git checkout -b gh-pages;
git add -A .;
git commit -m 'docs($VERSION)';
git push origin gh-pages -f;
cd ..;

echo 'Published @$(git rev-parse --verify HEAD)!'
