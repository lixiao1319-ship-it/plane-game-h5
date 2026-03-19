/**
 * 简易静态文件服务器 - 用于在 Windows 本地运行飞机大战游戏
 * 无需额外依赖，使用 Node.js 内置模块
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PORT = 8080;
const DIST_DIR = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.mp3':  'audio/mpeg',
  '.wav':  'audio/wav',
  '.ogg':  'audio/ogg',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
};

// 检查 dist 目录是否存在
if (!fs.existsSync(DIST_DIR)) {
  console.log('[构建] dist 目录不存在，正在执行构建...');
  try {
    execSync('npm run build', { stdio: 'inherit', cwd: __dirname });
    console.log('[构建] 构建完成！');
  } catch (e) {
    console.error('[错误] 构建失败，请检查项目依赖是否安装完整（运行 npm install）');
    process.exit(1);
  }
}

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';

  const filePath = path.join(DIST_DIR, urlPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // 找不到文件时回退到 index.html（SPA 支持）
      fs.readFile(path.join(DIST_DIR, 'index.html'), (err2, data2) => {
        if (err2) {
          res.writeHead(404);
          res.end('404 Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(data2);
        }
      });
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const url = `http://localhost:${PORT}`;
  console.log('========================================');
  console.log('   飞机大战 H5 游戏 - 本地服务器');
  console.log('========================================');
  console.log(`  访问地址: ${url}`);
  console.log('  按 Ctrl+C 停止服务器');
  console.log('========================================');

  // Windows 下自动打开浏览器
  try {
    execSync(`start ${url}`);
  } catch (_) {
    // 非 Windows 环境忽略
  }
});
