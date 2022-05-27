#!/bin/bash
###
 # @Author: your name
 # @Date: 2020-11-23 18:01:50
 # @LastEditTime: 2021-09-17 18:37:45
 # @LastEditors: HFL
 # @Description: In User Settings Edit
 # @FilePath: \beehub-mobile-v3d:\Project\chain-wallet\entrypoint.sh
### 

# replace the frented params
sed -i "s|BASEURL[[:space:]]*=.*|BASEURL='$BASEURL'|g" /usr/share/nginx/html/conf.js
sed -i "s|IS_OPEN_ONEAPM[[:space:]]*=.*|IS_OPEN_ONEAPM='$IS_OPEN_ONEAPM'|g" /usr/share/nginx/html/conf.js

sed -i "s|ETHERSCAN_URL[[:space:]]*=.*|ETHERSCAN_URL='$ETHERSCAN_URL'|g" /usr/share/nginx/html/conf.js
sed -i "s|WEB3_PROVIDER_HTTP[[:space:]]*=.*|WEB3_PROVIDER_HTTP='$WEB3_PROVIDER_HTTP'|g" /usr/share/nginx/html/conf.js
sed -i "s|CHAIN_ID[[:space:]]*=.*|CHAIN_ID='$CHAIN_ID'|g" /usr/share/nginx/html/conf.js


# wallet connect
sed -i "s|RELAY_URL[[:space:]]*=.*|RELAY_URL='$RELAY_URL'|g" /usr/share/nginx/html/conf.js
sed -i "s|BLOCKCHAIN_API[[:space:]]*=.*|BLOCKCHAIN_API='$BLOCKCHAIN_API'|g" /usr/share/nginx/html/conf.js
sed -i "s|PROJECT_ID[[:space:]]*=.*|PROJECT_ID='$PROJECT_ID'|g" /usr/share/nginx/html/conf.js
sed -i "s|SUPPORTED_CHAINS[[:space:]]*=.*|SUPPORTED_CHAINS='$SUPPORTED_CHAINS'|g" /usr/share/nginx/html/conf.js


sed -i "s|TIMEOUT[[:space:]]*=.*|TIMEOUT='${TIMEOUT}*1000'|g" /usr/share/nginx/html/conf.js




# run nginx
exec /usr/sbin/nginx -g "daemon off;"

