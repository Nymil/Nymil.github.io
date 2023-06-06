"use strict";

class Main {
    constructor() {
        this.backgroundColor = '#8C8C8C';
        this.fps = 60;
        this.field = new Field();
        this.simulationStarted = false;
        this.addEventListeners()
    }

    draw() {
        drawRect(this.backgroundColor, [0, 0, _$canvas.width, _$canvas.height]);
        this.field.draw();
    }

    update() {
        if (!this.simulationStarted) return;
        this.field.innactForces();
    }

    handleMouseClick(e) {
        e.preventDefault();
        const clickedPos = this.getMousePos(e);
        if (e.which === 1 && this.simulationStarted) {
            this.field.setGrabbedNode(clickedPos);
        }
        if (e.which === 3 && this.simulationStarted) {
            this.field.setCutMousePos(clickedPos);
        }
        if (this.simulationStarted) return;
        this.field.statifyClick(clickedPos);
    }

    getMousePos(e) {
        const rect = _$canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left - 2, // minus two so the position is the tip of the mouse
            y: e.clientY - rect.top - 2
        };
    }

    startSimulation(e) {
        e.preventDefault();
        this.simulationStarted = true;
    }

    handleCanvasHover(e) {
        e.preventDefault();
        const pos = this.getMousePos(e);
        this.field.moveGrabbedNode(pos);
        this.field.checkCut(pos);
    }

    releaseMouse(e) {
        if (e.which === 1) {
            this.field.clearGrabbedNode();
        }
        if (e.which === 3) {
            this.field.clearCutMousePos();
        }
    }

    run() {
        // main loop
        setInterval(() => {
            this.update();
            this.draw();
        }, 1000 / this.fps);
    }


    addEventListeners() {
        document.querySelector('canvas').addEventListener('mousedown', (e) => this.handleMouseClick(e));
        document.querySelector('#start-simulation').addEventListener('mousedown', (e) => this.startSimulation(e));
        document.querySelector('canvas').addEventListener('contextmenu', (e) => e.preventDefault());
        document.querySelector('canvas').addEventListener('mousemove', (e) => this.handleCanvasHover(e));
        document.querySelector('canvas').addEventListener('mouseleave', (e) => this.field.clearCutMousePos());
        document.addEventListener('mouseup', (e) => this.releaseMouse(e));
    }
}