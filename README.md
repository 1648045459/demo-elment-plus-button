
# chain-wallet-vue3-ui


## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## docker Setup

```bash
# 制作镜像
sh run_build
# 启动镜像
docker run -d --name template-ui -p 8080:80 -e BASEURL=环境变量值 镜像名
# 查看容器启动情况
docker ps -a
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## docker 启动 ENV

| name              | 描述                        |
| ----------------- | --------------------------- |
| BASEURL           | 后台服务器数据库基础数据接口            |
| ETHERSCAN_URL       | 区块链浏览器网站地址                     |
| WEB3_PROVIDER_HTTP       | 公司私有链id 公网RPC地址                    |
| CHAIN_ID       | 公司私有链id                    |
| IS_OPEN_ONEAPM       |是否打开监测系统ONEAPM                 |
| BLOCKCHAIN_API       | wallet connect 连接以太坊查询链、账户等相关配置数据                  |
| RELAY_URL       | wallet connect 公司部署的中继服务器                  |


-------


###### [NFT 钱包原型设计](https://confluence.paradeum.com/pages/viewpage.action?pageId=44335141)

- 1、项目介绍---ChainWallet
  


- 2、原型图以及资源文件（对应 confluence 位置）
  > [confluence 地址](https://confluence.paradeum.com/pages/viewpage.action?pageId=44335141)
- 3、需求文档
  > [confluence 地址](https://confluence.paradeum.com/pages/viewpage.action?pageId=44335141)
- 4、UI 设计文档
  > [confluence 地址](https://confluence.paradeum.com/pages/viewpage.action?pageId=44335141)
- 5、UI 流程设计图
  > [confluence 地址](https://confluence.paradeum.com/pages/viewpage.action?pageId=44335141)
- 6、开发测试账号
- 7、项目架构+使用第三方框架说明
 
  > vue3、webpack、ts、element-plus、walletconnect……

- 8、项目接口以及自定义功能模块说明
  > 无特殊模块
- 9、项目进度以及存在的问题。
- 10、部署说明
  > [开发、测试、生产](https://confluence.paradeum.com/pages/viewpage.action?pageId=44335109)
- 11、资源存放位置
  > [仓库地址](https://gitlab.paradeum.com/pld/chain-wallet)
- 12、API接口地址 
  > [api k8s](https://dev-en-network-disk.netwarps.com/api/index.html)
  
  > [api master195](http://en-network-disk.devapps.netwarps.com/api/index.html)
  


