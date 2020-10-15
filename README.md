# welcome
[![CircleCI](https://circleci.com/gh/AlisProject/welcome.svg?style=svg)](https://circleci.com/gh/AlisProject/welcome)

[![ALIS](./src/img/logo.png)](https://alismedia.jp)  
The website resources of [ALIS project website.](https://alismedia.jp)

# Prerequisite 
- node
    - see: `.node-version`

# Installation

    git clone https://github.com/AlisProject/welcome.git
    cd welcome
    npm i

# Linting

    npm test

# Deployment
Prerequisite: `aws-cli`  
Also you need correct AWS settings.  
Please change `example.com` to your S3 bucket name.

1. Create S3 bucket.
    
        aws s3 mb s3://example.com
    
1. Setting bucket to static website hosting.

        aws s3 website s3://example.com --index-document index.html
        
1. Add environment variables.

        export S3_BUCKET_DEVELOP=example.com
        
1. Deployment.

        npm run s3sync:develop

1. Now you can see: 
    
        open http://example.com.s3-website-ap-northeast-1.amazonaws.com 

# Licence
- [MIT](LICENCE)
