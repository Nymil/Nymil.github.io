"use strict";

class Field {
    constructor() {
        this.nodeCount = {
            horizontal: 30,
            vertical: 15
        }
        this.offsetToCorner = 30;
        this.distToBottom = 125;
        this.grabedNode = null;
        this.cutMousePos = null;
        this.nodes = [];
        this.fillNodes();
        this.connections = [];
        this.addConnections();
    }

    addConnections() {
        this.nodes.forEach(node => {
            const nodeId = node.getId();

            if (nodeId % this.nodeCount.horizontal !== this.nodeCount.horizontal - 1) {
                const rightNode = this.getNodeById(nodeId + 1);
                this.connections.push(new Connection(node, rightNode));
            }

            const bottomNode = this.getNodeById(nodeId + this.nodeCount.horizontal);
            if (bottomNode) this.connections.push(new Connection(node, bottomNode));
        });
    }

    setCutMousePos(pos) {
        this.cutMousePos = pos;
    }

    checkCut(pos) {
        if (this.cutMousePos === null) return;
        const cutConnection = this.connections.find(connection => connection.intersects(this.cutMousePos, pos));
        this.cutMousePos = pos;
        if (cutConnection) {
            this.connections = this.connections.filter(connection => connection !== cutConnection);
        }
    }

    clearCutMousePos() {
        this.cutMousePos = null;
    }

    getNodeById(id) {
        return this.nodes.find(node => node.getId() === id);
    }

    fillNodes() {
        const horDistBetween = (_$canvas.width - 2 * this.offsetToCorner) / (this.nodeCount.horizontal - 1);
        const vertDistBetween = (_$canvas.height - this.distToBottom - this.offsetToCorner) / (this.nodeCount.vertical - 1);

        for (let row = 0; row < this.nodeCount.vertical; row++) {
            for (let col = 0; col < this.nodeCount.horizontal; col++) {
                const xPos = this.offsetToCorner + col * horDistBetween;
                const yPos = this.offsetToCorner + row * vertDistBetween;

                const generatedNode = new Node(xPos, yPos);
                if (row === 0 && (col % 5 === 0 || col === this.nodeCount.horizontal - 1)) generatedNode.toggleStatic();
                this.nodes.push(generatedNode);
            }
        }
    }

    moveGrabbedNode(pos) {
        if (!this.grabedNode) return;
        this.grabedNode.setPos(pos);
    }

    clearGrabbedNode() {
        this.grabedNode = null;
    }

    setGrabbedNode(pos) {
        let closestNode = null;
        let closestSquaredLength = null;

        this.nodes.forEach(node => {
            const nextSquaredLength = node.squaredLengthTo(pos);

            if (!node.isStatic() && (closestNode === null || nextSquaredLength < closestSquaredLength)) {
                closestNode = node;
                closestSquaredLength = nextSquaredLength;
            }
        });

        this.grabedNode = closestNode;
    }

    innactForces() {
        this.nodes.forEach(node => node.updateGravity());
        this.connections.forEach(connection => connection.satisfyConnection());
    }

    draw() {
        this.connections.forEach(connection => connection.draw());
        this.nodes.forEach(node => node.draw());
    }

    statifyClick(pos) {
        const clickedNode = this.getNodeAtPos(pos);
        if (clickedNode) clickedNode.toggleStatic();
    }

    getNodeAtPos(pos) {
        return this.nodes.find(node => node.isAtPos(pos));
    }
}
