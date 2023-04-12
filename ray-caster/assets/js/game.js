class Game {
    constructor() {
        this.player = new Player(this);
        this.fps = 60;
        this.map = new Map(this);
        this.pressedKeys = []; // contains objects example {key: 'a', pos: {x: 1, y; 21}}
        this.mousePos = {x: null, y: null};
        this.addEventListeners();
    }
    
    clearScreen() {
        drawRect('black', [0, 0, _$canvas.width, _$canvas.height]);
    }

    draw() {
        this.clearScreen();
        this.map.draw();
        this.player.draw();
    }

    update() {
        if (this.pressedKeys.some(obj => obj.key === 'z')) {
            this.player.move('forward');
        } if (this.pressedKeys.some(obj => obj.key === 's')) {
            this.player.move('backward');
        } if (this.pressedKeys.some(obj => obj.key === 'q')) {
            this.player.move('left');
        } if (this.pressedKeys.some(obj => obj.key === 'd')) {
            this.player.move('right');
        } 

        if (this.pressedKeys.some(obj => obj.key === 'arrowright')) {
            this.player.turn('right');
        } if (this.pressedKeys.some(obj => obj.key === 'arrowleft')) {
            this.player.turn('left');
        }

        if (this.pressedKeys.some(obj => obj.key === 'a')) {
            this.handleWallAdd(this.pressedKeys.find(obj => obj.key === 'a').pos);
        } if (this.pressedKeys.some(obj => obj.key === 'r')) {
            this.handleWallRem(this.pressedKeys.find(obj => obj.key === 'r').pos);
        }
        
        this.player.castRays();
    }

    handleWallRem(coords) {
        const col = Math.floor(coords.x / this.map.cellLength);
        const row = Math.floor(coords.y / this.map.cellLength);
        this.map.remWall(col, row);
    }
    
    handleWallAdd(coords) {
        const col = Math.floor(coords.x / this.map.cellLength);
        const row = Math.floor(coords.y / this.map.cellLength);
        this.map.addWall(col, row);
    }

    storeMousePos(e) {
        var rect = _$canvas.getBoundingClientRect();
        this.mousePos = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    run() {
        // main game loop
        setInterval(() => {
            this.update();
            this.draw();
        }, 1000 / this.fps);
    }

    addPressedKey(e) {
        // remove previous obj with same key
        this.removePressedKey(e);
        // add new obj
        this.pressedKeys.push({
            key: e.key.toLowerCase(),
            pos: this.mousePos
        });
    }
            
    removePressedKey(e) {
        this.pressedKeys = this.pressedKeys.filter(obj => obj.key !== e.key.toLowerCase());
    }
    addEventListeners() {
        document.addEventListener('keydown', (e) => this.addPressedKey(e));
        document.addEventListener('keyup', (e) => this.removePressedKey(e));
        document.addEventListener('mousemove', (e) => this.storeMousePos(e));
        document.querySelector('#ray-count').addEventListener('change', () => this.player.rayCount = document.querySelector('#ray-count').value);
    }
}
