# welcome
[![CircleCI](https://circleci.com/gh/AlisProject/welcome.svg?style=svg)](https://circleci.com/gh/AlisProject/welcome)

[![ALIS](./src/img/logo.png)](https://alismedia.jp)  
The website resources of [ALIS project website.](https://alismedia.jp)

# Prerequisite 
- node
    - see: `.node-version`
- yarn@1.6.0
    - `npm i -g yarn@1.6.0`

# Installation

    git clone https://github.com/AlisProject/welcome.git
    cd welcome
    yarn

# Run

    yarn watch
    
Local resources be opened automatically.

# Linting

    yarn test

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

        yarn deploy

1. Now you can see: 
    
        open http://example.com.s3-website-ap-northeast-1.amazonaws.com 

# Licence
- [MIT](LICENCE)
