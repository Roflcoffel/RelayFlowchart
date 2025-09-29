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

// This assumes all vertical are on the same y and
// also assumes all horizontal are on the same x
function lineBetween(vertical, horizontal) {
    if(vertical.length) {
        for (let i = 0; i < vertical.length; i++) {
            const text = vertical[i];
            if(i+1 < vertical.length) {
                line(text.x, text.y+5,vertical[i+1].x,vertical[i+1].y-font_size+5)
            }   
        }
    }

    if(horizontal.length) {
        line(horizontal[0].x, horizontal[0].y-font_size-10, horizontal[horizontal.length-1].x, horizontal[horizontal.length-1].y-font_size-10)
        for (let i = 0; i < horizontal.length; i++) {
            const text = horizontal[i];
            line(text.x, text.y-font_size, text.x, text.y-font_size-10)
        }   
    }
    
}

// Change linebetween to take a flowchart section.
function DrawRelayConnections(section) {
    let structure = section[0]
    
    let all_vert = []
    for (let i = 0; i < structure["v"].length; i++) {
        const vert = structure["v"][i];
        all_vert.push(section.filter((v) => {return v.x == vert}))
    }
    
    let all_hor = []
    for (let i = 0; i < structure["h"].length; i++) {
        const hor = structure["h"][i];
        all_hor.push(section.filter((h) => {return h.y == hor}))
    }

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
        {"v": [0], "h": [3, 4]}, // Defines which relays are vertical and which are horizontal
        new fcVs("Iv", 0, 1, false),
        new fcVs("Vv", 0, 2, false),
        new fcVs("FdIv", -100, 3, true),
        new fcVs("RVv", 0, 3, false),
        new fcVs(imgs["motvägr"], -100, 4, false),
        new fcVs(imgs["bell"], 0, 4, true),
        new fcVs("Vsv", 100, 4, true),
        new fcVs(imgs["mottågv"], 100, 5, false)
    ]

    sections["S2"] = [
        new fcVs("Sv", 0, 6, false),
        new fcVs("FdSv", 0, 7, true)
    ]

    sections["S3"] = [
        new fcVs("IIv", 0, 8, false)
    ]

    sections["S4"] = [
        new fcVs("Iv", 0, 9, true),
        new fcVs("TrAkvB", 0, 10, true),
        new fcVs("TrAkvB", 130, 11, false),
        new fcVs("Akv", 0, 11, true),
        new fcVs("FdIv", -130, 11, ),
        new fcVs("Vsv", 0, 12, false),
        new fcVs(imgs["mottågr"], 0, 13, false)
    ]

    sections["S5"] = [
        new fcVs("Sv", 0, 15, true),
        new fcVs("Vv", 0, 16, true),
        new fcVs("FdSv", -100, 17, false),
        new fcVs("RVv", 0, 17, true),
        new fcVs(imgs["motvägv"], 0, 18, false),
        new fcVs(imgs["bell"], -100, 18, false),
    ]

    sections["S6"] = [
        new fcVs("IIv", 0, 20, true),
        new fcVs("Akv", 0, 21, false)
    ]

    //for (const name in sections) {
        //strokeWeight(4);
        //sections[name].Draw()
        //strokeWeight(2);
        //DrawRelayConnections(sections[name])
    //}

    let s_relay = {
        "iv":     new fcVs("Iv", 0, 1, false),
        "vv":     new fcVs("Vv", 0, 2, false),
        "fdiv":   new fcVs("FdIv", -100, 3, true),
        "rvv":    new fcVs("RVv", 0, 3, false),
        "vsv":    new fcVs("Vsv", 100, 4, true),
        "bell":   new fcVs(imgs["bell"], 0, 4, true),
        "krs":    new fcVs(imgs["motvägr"], -100, 4, false),
        "vf":     new fcVs(imgs["mottågv"], 100, 5, false),
        "sv":     new fcVs("Sv", 0, 6, false),
        "fdsv":   new fcVs("FdSv", 0, 7, true),
        "iiv":    new fcVs("IIv", 0, 8, false)
    }

    // "Avkopplnings" relay, after SIIv has fallen
    let a_relay = {
        "iv":      new fcVs("Iv", 0, 9, true),
        "trakvb":  new fcVs("TrAkvB", 0, 10, true),
        "trakvb2": new fcVs("TrAkvB", 130, 11, false),
        "akv":     new fcVs("Akv", 0, 11, true),
        "fdiv":    new fcVs("FdIv", -130, 11, ),
        "vsv":     new fcVs("Vsv", 0, 12, false),
        "vf":      new fcVs(imgs["mottågr"], 0, 13, false),
        "sv":      new fcVs("Sv", 0, 15, true),
        "vv":      new fcVs("Vv", 0, 16, true),
        "fdsv":    new fcVs("FdSv", -100, 17, false),
        "rvv":     new fcVs("RVv", 0, 17, true),
        "krs":     new fcVs(imgs["motvägv"], 0, 18, false),
        "bell":    new fcVs(imgs["bell"], -100, 18, false),
        "iiv":     new fcVs("IIv", 0, 20, true),
        "akv2":    new fcVs("Akv", 0, 21, false)
    }

    for (const name in s_relay) {
        s_relay[name].Draw()
    }

    for (const name in a_relay) {
        a_relay[name].Draw()
    }
    
    strokeWeight(2);
    lineBetween(
        [s_relay["iv"], s_relay["vv"], s_relay["rvv"], s_relay["bell"]], 
        [s_relay["fdiv"], s_relay["rvv"]]
    )
    lineBetween(
        [s_relay["vsv"], s_relay["vf"]],
        [s_relay["krs"], s_relay["bell"], s_relay["vsv"]]
    )
    lineBetween([s_relay["sv"], s_relay["fdsv"]], [])
    lineBetween(
        [a_relay["iv"], a_relay["trakvb"], a_relay["akv"], a_relay["vsv"], a_relay["vf"]],
        [a_relay["fdiv"], a_relay["akv"], a_relay["trakvb2"]]
    )
    lineBetween([a_relay["sv"],a_relay["vv"],a_relay["rvv"],a_relay["krs"]],[a_relay["bell"], a_relay["krs"]])
    lineBetween([a_relay["iiv"],a_relay["akv2"]], [a_relay["fdsv"], a_relay["rvv"]])
}