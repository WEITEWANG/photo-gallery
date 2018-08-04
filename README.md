# photo-gallery
#采用yeoman脚手架工具搭建
1.安装
npm install -g yo;
2.选择相关的项目生成器
npm i -g generator-react-webpack
本项目基于webpack构建react
linux  
npm ls -g –depth=1 2>/dev/null | grep generator-  
windows  
npm ls -g –depth=1 2>/dev/null | findstr generator-
2代表错误消息，/dev/null代表空设备文件，即将错误信息输出到空设备文件上，不显示出来
我在windows 下，提示，系统找不到指定的路径。
不指定 | findstr generator- ，出了全部的全局一级依赖。
生成项目：
yo react-webpack react-gallery
3.安装项目所需依赖 react、react-dom、sass-loader、json-loader
4.配置weback.webpack的配置文件为cfg文件夹中的default.js文件
