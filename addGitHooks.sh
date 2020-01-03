#!/bin/bash

cat <<EOF > .git/hooks/pre-commit 
eslint src test *.js && npm run allTest
if [ \$? != 0 ]; then 
    echo "\n \n check tests ...\nThere are some failing tests...\n"
    exit 1
fi

commentCount=\$(grep -nrw ./src/* ./test/* -e "//" | wc -l)
if [ \$commentCount -gt 0 ]; then 
    echo "\n\n Clear your comments before commiting....\n\n"
    exit 1
fi
EOF


chmod +x .git/hooks/pre-commit  

cat <<EOF > .git/hooks/pre-push  
npm run lint 
if [ \$? != 0 ]; then 
    exit 1
fi
EOF


chmod +x .git/hooks/pre-push  