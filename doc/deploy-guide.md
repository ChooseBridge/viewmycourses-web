Ubuntu
-----
### 安装 node
```
sudo yum install -y nodejs
```
查看node版本和npm版本
```
node -v
npm -v
```
默认的 node 需要先升级到最新版

### 升级 node
安装 nrm 依赖
```
npm i -g nrm --registry=https://registry.npm.taobao.org
```
查看当前 registry 为 taobao
```
nrm use taobao
```
安装n模块升级nodejs
```apple js
sudo npm i -g n
```
安装成功后执行
```apple js
sudo n stable
```
再次查看版本号
```apple js
node -v
```

### 安装 pm2 进程管理器
```
npm i -g pm2
```
### 代码构建
```
npm run build
```

### 启动项目
```
pm2 start npm -- start 
```