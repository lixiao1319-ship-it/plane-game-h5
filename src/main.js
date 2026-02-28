import { Game } from './core/Game.js';
import { LoadScene } from './scenes/LoadScene.js';
import { MenuScene } from './scenes/MenuScene.js';
import { GameScene } from './scenes/GameScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';

const canvas = document.getElementById('game-canvas');
const game = new Game(canvas);

// 注册所有场景
game.registerScene('load', new LoadScene(game));
game.registerScene('menu', new MenuScene(game));
game.registerScene('game', new GameScene(game));
game.registerScene('gameOver', new GameOverScene(game));

// 启动游戏循环并进入加载场景
game.start();
game.switchScene('load');
