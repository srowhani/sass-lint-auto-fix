VERSION=$(node -e "console.log(require('./package.json').version)");

git add -A .;
git commit -m "build($VERSION): v$VERSION";
git tag "v$VERSION";

git push origin master;
git push origin --tags;
