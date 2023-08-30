cp package.json README.md dist/
rm -rf ./dist/types/__tests__
rm -rf ./dist/esm/__tests__

cat >dist/cjs/package.json <<!EOF
{
    "type": "commonjs"
}
!EOF

cat >dist/esm/package.json <<!EOF
{
    "type": "module"
}
!EOF