@echo off
chcp 65001 >nul
title 飞机大战 H5 游戏启动器

echo ========================================
echo    飞机大战 H5 游戏 - Windows 启动器
echo ========================================
echo.

:: 检查 Node.js 是否安装
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Node.js，请先安装 Node.js
    echo 下载地址: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [信息] Node.js 版本:
node -v
echo.

:: 检查 npm 依赖是否已安装
if not exist "node_modules" (
    echo [安装] 正在安装依赖包，请稍候...
    npm install
    if %errorlevel% neq 0 (
        echo [错误] 依赖安装失败，请检查网络连接
        pause
        exit /b 1
    )
    echo [安装] 依赖安装完成！
    echo.
)

:: 启动服务器（serve.js 会自动构建并打开浏览器）
echo [启动] 正在启动游戏服务器...
echo.
node serve.js

pause
