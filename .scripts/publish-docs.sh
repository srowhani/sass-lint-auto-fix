REMOTE=$(git config --get remote.origin.url);
VERSION=$(node -e "console.log(require('./package.json').version)");

cd docs;
rm -rf .git;
git init;
git remote add origin $REMOTE;
git checkout -b gh-pages;
git add -A .;
git commit -m "docs($VERSION)";
git push origin gh-pages -f;
COMMIT_HASH=$(git rev-parse --verify HEAD);
echo "Published: $COMMIT_HASH!";
cd ..;
