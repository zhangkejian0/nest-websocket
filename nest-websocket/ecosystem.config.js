module.exports = {
    apps : [{
      // 应用程序的名称
      name: "nest-websocket-api", 
      // 执行文件
      script: 'dist/main.js',
      // 应用程序所在的目录
      cwd: './',
      // 设置追加日志而不是新建日志
      merge_logs: true,
      // 设置应用程序异常退出重启的次数，默认15次（从0开始计数）,最大异常重启次数，即小于min_uptime运行时间重启次数；
      max_restarts: 20,
      instances: 1,
       // 最大内存限制数，超出自动重启
      max_memory_restart: "2G",
    }],
  
    // deploy : {
    //   production : {
    //     // ssh的用户名，登录远程服务器的用户名
    //     user : 'root',
    //     // 要发布的机器，远程服务器的IP或hostname
    //     host : '47.98.219.78',
    //     // 服务器端口
    //     port : 3100,
    //     // 要发布的代码分支，远端名称及分支名
    //     ref  : 'origin/master',
    //     // 代码Git仓库地址
    //     repo : 'git@gitee.com:zhangkj001/nest-admin-start.git',
    //     // 服务器存储代码地址，远程服务器部署目录，需要填写user具备写入权限的目录，也就是服务器存放上面git库代码的地方
    //     path : '/data/nest-admin-api',
    //     // ssh权限配置
    //     // 'ssh_options': 'StrictHostKeyChecking=no',
    //     // 'ssh_options': ['StrictHostKeyChecking=no', 'PasswordAuthentication=no'],
    //     // // 1、在 setup 前触发，如安装 git
    //     // 'pre-setup': '',
    //     // // 2、在 setup 后触发，如做一些其他配置
    //     // 'post-setup': '',
    //     // // 3、在 deploy 前触发，执行本地脚本
    //     // 'pre-deploy-local': '',
    //     // // 4、在 deploy 前触发，执行远程脚本
    //     // 'pre-deploy': 'git fetch --all',
    //     // 5、在 deploy 后触发，执行远程脚本，如 npm install，部署后需要执行的命令
    //     'post-deploy' : 'cd source/nest-api && yarn install && yarn build && pm2 reload ecosystem.config.js --env production',
    //     // "env": {
    //     //     "NODE_ENV": "production"
    //     // }
    //   }
    // }
  };
  