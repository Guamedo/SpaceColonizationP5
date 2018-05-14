class Branch{
    constructor(x, y, parent = null){
        this.pos = createVector(x, y);
        this.rad = 2.0;
        this.parent = parent;
        this.sons = [];
        this.atractionPoints = [];
    }

    draw(){
        push();
        stroke(139,69,19);
        strokeWeight(1.5*this.rad);
        if(this.parent != null){
            point(this.pos.x, this.pos.y);
            //line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);
        }else{
            point(this.pos.x, this.pos.y);
        }
        pop();
    }

    grow(D){
        let dir = null;
        for(let i = 0; i < this.atractionPoints.length; i++){
            let ap = this.atractionPoints[i];
            if(dir === null){
                dir = ap.copy().sub(this.pos).normalize();
            }else{
                dir.add(ap.copy().sub(this.pos).normalize());
            }
        }
        if(dir !== null) {
            let n = dir.normalize().copy();
            let newPos = (this.pos.copy()).add(n.mult(D));
            if(newPos.dist(this.parent.pos) <= 0.5 || newPos.dist(this.pos) <= 0.5){
                return null;
            }
            for(let i = 0; i < this.sons.length; i++){
                if(newPos.dist(this.sons[i].pos) <= 0.5){
                    return null;
                }
            }
            let branch = new Branch(newPos.x, newPos.y, this);
            this.sons.push(branch);
            return branch;
        }else{
            return null;
        }
    }

    growUp(D){
        let dir = createVector(0, -1);
        let n = dir.normalize().copy();
        let newPos = (this.pos.copy()).add(n.mult(D));// (n.mult(D)).add(this.pos);
        let branch = new Branch(newPos.x, newPos.y, this);
        this.sons.push(branch);
        return branch;
    }

    growUpRandom(D){
        let dir = createVector(random(-0.2, 0.2), -1).normalize();
        let n = dir.normalize().copy();
        let newPos = (this.pos.copy()).add(n.mult(D));// (n.mult(D)).add(this.pos);
        let branch = new Branch(newPos.x, newPos.y, this);
        this.sons.push(branch);
        return branch;
    }

    getRad(){
        if(this.sons.length > 0){
            let sum = 0;
            this.sons.forEach(function (s) {
                sum += Math.pow(s.getRad(), 2.0);
            });
            this.rad = Math.pow(sum, 1/2.0);
            return this.rad;
        }else{
            this.rad = 1.0;
            return this.rad;
        }
    }
}