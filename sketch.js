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
    
    CDComplex()
}

function draw() {}

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

function CDComplex() {
    //From the start until SIIv has fallen
    let sections = {}

    sections["S1"] = [
        {"v": [0,100], "h": [3, 4]}, // Defines which relays are vertical and which are horizontal
        new fcVs("Iv", 0, 1, false), // ex. 0 means match all with 0 offset as vertical
        new fcVs("Vv", 0, 2, false), // meanwhile the horizontal check row instead.
        new fcVs("FdIv", -100, 3, true),
        new fcVs("RVv", 0, 3, false),
        new fcVs(imgs["motvägr"], -100, 4, false),
        new fcVs(imgs["bell"], 0, 4, true),
        new fcVs("Vsv", 100, 4, true),
        new fcVs(imgs["mottågv"], 100, 5, false)
    ]

    sections["S2"] = [
        {"v": [0], "h": []},
        new fcVs("Sv", 0, 6, false),
        new fcVs("FdSv", 0, 7, true)
    ]

    sections["S3"] = [
        {"v": [], "h": []},
        new fcVs("IIv", 0, 8, false)
    ]

    sections["S4"] = [
        {"v": [0], "h": [11]},
        new fcVs("Iv", 0, 9, true),
        new fcVs("TrAkvB", 0, 10, true),
        new fcVs("TrAkvB", 130, 11, false),
        new fcVs("Akv", 0, 11, true),
        new fcVs("FdIv", -130, 11, ),
        new fcVs("Vsv", 0, 12, false),
        new fcVs(imgs["mottågr"], 0, 13, false)
    ]

    sections["S5"] = [
        {"v": [0], "h": [17, 18]},
        new fcVs("Sv", 0, 15, true),
        new fcVs("Vv", 0, 16, true),
        new fcVs("FdSv", -100, 17, false),
        new fcVs("RVv", 0, 17, true),
        new fcVs(imgs["motvägv"], 0, 18, false),
        new fcVs(imgs["bell"], -100, 18, false)
    ]

    sections["S6"] = [
        {"v": [0], "h": []},
        new fcVs("IIv", 0, 20, true),
        new fcVs("Akv", 0, 21, false)
    ]

    for (const name in sections) {
        strokeWeight(4);
        for (let i = 1; i < sections[name].length; i++) {
            sections[name][i].Draw()
        }

        strokeWeight(2);
        DrawRelayConnections(sections[name])
    }
}