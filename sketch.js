let font_size = 38
let fcGap = 80

let imgs = {}

function preload() {
    imgs["bell"] = loadImage("assets/bell.png")
    imgs["motvägr"] = loadImage("assets/motväg_röd.png")
    imgs["motvägv"] = loadImage("assets/motväg_vit.png")
    imgs["mottågv"] = loadImage("assets/mottåg_vit.gif")
    imgs["mottågr"] = loadImage("assets/mottåg_röd.gif")
}

function setup() {
    createCanvas(390, 1700)
    //background(255)

    textFont('Roboto');
    textSize(font_size);
    
    CreateCDComplex()
}

function draw() {}

function CreateCDComplex() {
    //From the start until SIIv has fallen
    let cd = new CDComplex()
    cd.Draw()
    
    strokeWeight(2);
    for (const name in cd.sections) {
        DrawRelayConnections(cd.sections[name])
    }
}

function CreateBComplex() {
    console.log("B Complex not yet implemented")
}

function CreateAComplex() {
    console.log("A Complex not yet implemented")
}

function DrawRelayConnections(section) {
    let structure = section[0]
    
    let all_vert = []
    for (let i = 0; i < structure["v"].length; i++) {
        const vert = structure["v"][i];
        all_vert.push(section.filter((v) => {return v.offset == vert}))
    }
    
    let all_hor = []
    for (let i = 0; i < structure["h"].length; i++) {
        const hor = structure["h"][i];
        all_hor.push(section.filter((h) => {return h.row == hor}))
    }

    console.log(all_vert)
    console.log(all_hor)

    //Draw all vertical
    for (let j = 0; j < all_vert.length; j++) {
        const vertical = all_vert[j];
        for (let i = 0; i < vertical.length; i++) {
            const text = vertical[i];
            if(i+1 < vertical.length) {
                line(text.x, text.y+5,vertical[i+1].x,vertical[i+1].y-font_size+5)
            }   
        }
    }

    //Draw all horizontal
    for (let j = 0; j < all_hor.length; j++) {
        const horizontal = all_hor[j]
        line(horizontal[0].x, horizontal[0].y-font_size-10, horizontal[horizontal.length-1].x, horizontal[horizontal.length-1].y-font_size-10)
        for (let i = 0; i < horizontal.length; i++) {
            const text = horizontal[i];
            line(text.x, text.y-font_size, text.x, text.y-font_size-10)
        }   
    }
}
