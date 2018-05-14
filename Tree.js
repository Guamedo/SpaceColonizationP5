class Tree{
    constructor(points, gDist = 5 , trunkDist = 5){
        this.B = [];
        this.B.push(new Branch(width/2, height, null));
        this.points = points;
        this.initPointsN = points.length;
        this.gDist = gDist;
        this.iDist = gDist*8;
        this.rDist = gDist;
        this.trunkDist = trunkDist;
    }

    draw(){
        // Draw the attraction points
        push();
        rectMode(CENTER);
        fill(50, 50, 200, 150);
        noStroke();
        this.points.forEach(p => rect(p.x, p.y, 5, 5));
        pop();

        this.B.forEach(b => b.draw());

        /*
        for(let i = 0; i < this.B.length; i++){
            let b = this.B[i];
            if(b.sons.length === 0){
                push();
                noStroke();
                fill(50, 200, 50, 200);
                ellipse(b.pos.x, b.pos.y, 20, 20);
                pop();
            }
        }*/
    }

    growTrunk() {
        for (let i = 0; i < this.trunkDist; i++) {
            //this.B[this.B.length - 1].atractionPoints.push(this.B[this.B.length - 1].pos.copy().add(createVector(0, -1)));
            this.B.push(this.B[this.B.length - 1].growUpRandom(this.gDist));
        }

        let b = this.B[this.B.length - 1];
        let found = false;
        while(!found) {
            for (let i = 0; i < this.points.length && !found; i++) {
                if (b.pos.dist(this.points[i]) < this.iDist) {
                    found = true;
                }
            }
            if(!found) {
                //this.B[this.B.length - 1].atractionPoints.push(this.B[this.B.length - 1].pos.copy().add(createVector(0, -1)));
                this.B.push(this.B[this.B.length - 1].growUpRandom(this.gDist));
                b = this.B[this.B.length - 1];
            }
        }
        //this.B[0].getRad();
    }

    growTree(){
        this.B.forEach(function (b) {
            b.atractionPoints = [];
        });

        for(let i = 0; i < this.points.length; i++){
            let p = this.points[i];
            let distToNextB = p.dist(this.B[0].pos);
            let nextBranchI = 0;
            for (let j = 1; j < this.B.length; j++){
                let dist = p.dist(this.B[j].pos);
                if(dist < distToNextB){
                    distToNextB = dist;
                    nextBranchI = j;
                }
            }
            if(distToNextB <= this.iDist){
                this.B[nextBranchI].atractionPoints.push(p);
            }
        }

        let bLength = this.B.length;
        for(let i = 0; i < bLength; i++){
            let newBranch = this.B[i].grow(this.gDist);
            if(newBranch !== null){
                this.B.push(newBranch);
            }
        }

        for(let i = 0; i < this.points.length; i++){
            let p = this.points[i];
            let rm = false;
            for(let j = 0; j < this.B.length && !rm; j++){
                if(p.dist(this.B[j].pos) <= this.rDist){
                    this.points.splice(i, 1);
                    rm = true;
                    i--;
                }
            }
        }
    }

    nodeDecimation(){
        for(let i = 0; i < this.B.length; i++){
            this.B[i].pos.x = Math.round(this.B[i].pos.x);
            this.B[i].pos.y = Math.round(this.B[i].pos.y);
        }
    }

    nodeRelocation(){
        for(let i = 0; i < this.B.length; i++){
            let b = this.B[i];
            if(b.parent !== null){
                let dir = b.parent.pos.copy().sub(b.pos.copy()).normalize();
                let dist = b.parent.pos.dist(b.pos);
                b.pos.add(dir.mult(dist/2));
            }
        }
    }


}