let S = []; // Attraction points vector
let N; // Number of points
let D; // Grow distance
let radI; // radius of influence
let t; // Minimum number of branches in the trunk
let bMin; // Minimum distance between two branches

let tree;
let grow = true;

function setup(){
    createCanvas(600, 600);

    // Init
    N = 500;
    D = 10;
    radI = 8*D;
    t = 10;
    bMin = 10;

    // Generate random attraction points inside a ellipse
    for(let i = 0; i < N; i++){
        let angle = random(0, 2*Math.PI);
        let rad = random(0, (height/2) - height/8);
        let x = width/2 + Math.sin(angle)*rad*random(0.8,1.2);
        let y = height/2 - height/10 + Math.cos(angle)*rad*random(0.8,1.2);
        S.push(createVector(x, y));
    }

    tree = new Tree(S);
    tree.growTrunk();
}

function draw(){
    background(220);
    tree.draw();

    if(frameCount % 2 === 0 && grow){
        let sB = tree.B.length;
        tree.growTree();
        if(tree.points.length <= 0 || sB === tree.B.length){
            grow = false;
        }
    }

    if(!grow && tree.points.length >= tree.initPointsN*0.9){
        S = [];
        for(let i = 0; i < N; i++){
            let angle = random(0, 2*Math.PI);
            let rad = random(0, (height/2) - height/8);
            let x = width/2 + Math.sin(angle)*rad*random(0.8,1.2);
            let y = height/2 - height/10 + Math.cos(angle)*rad*random(0.8,1.2);
            S.push(createVector(x, y));
        }

        tree = new Tree(S);
        tree.growTrunk();

        grow = true;
    }else if(!grow){
        tree.points = [];
    }
}

function keyPressed(){
    console.log(keyCode);
    if(keyCode === 13)/*ENTER*/{
        tree.growTree();
    }
    if(keyCode === 82)/*R*/{
        tree.B[0].getRad();
    }
    if(keyCode === 68)/*D*/{
        tree.nodeDecimation();
    }
    if(keyCode === 76)/*L*/{
        tree.nodeRelocation();
    }

}