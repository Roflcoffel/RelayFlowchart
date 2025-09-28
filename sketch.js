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
    strokeWeight(4);
  
    //From the start until SIIv has fallen
    let s_relay = {
        "iv":     new fcText("Iv", 0, 1, false),
        "vv":     new fcText("Vv", 0, 2, false),
        "fdiv":   new fcText("FdIv", -100, 3, true),
        "rvv":    new fcText("RVv", 0, 3, false),
        "vsv":    new fcText("Vsv", 100, 4, true),
        "bell":   new fcVs(imgs["bell"], 0, 4, true),
        "krs":    new fcVs(imgs["motvägr"], -100, 4, false),
        "vf":     new fcVs(imgs["mottågv"], 100, 5, false),
        "sv":     new fcText("Sv", 0, 6, false),
        "fdsv":   new fcText("FdSv", 0, 7, true),
        "iiv":    new fcText("IIv", 0, 8, false)
    }

    // "Avkopplnings" relay, after SIIv has fallen
    let a_relay = {
        "iv":      new fcText("Iv", 0, 9, true),
        "trakvb":  new fcText("TrAkvB", 0, 10, true),
        "trakvb2": new fcText("TrAkvB", 130, 11, false),
        "akv":     new fcText("Akv", 0, 11, true),
        "fdiv":    new fcText("FdIv", -130, 11, ),
        "vsv":     new fcText("Vsv", 0, 12, false),
        "vf":      new fcVs(imgs["mottågr"], 0, 13, false),
        "sv":      new fcText("Sv", 0, 15, true),
        "vv":      new fcText("Vv", 0, 16, true),
        "fdsv":    new fcText("FdSv", -100, 17, false),
        "rvv":     new fcText("RVv", 0, 17, true),
        "krs":     new fcVs(imgs["motvägv"], 0, 18, false),
        "bell":    new fcVs(imgs["bell"], -100, 18, false),
        "iiv":     new fcText("IIv", 0, 20, true),
        "akv2":    new fcText("Akv", 0, 21, false)
    }

    for (const name in s_relay) {
        s_relay[name].Draw()
    }

    for (const name in a_relay) {
        a_relay[name].Draw()
    }
    
    strokeWeight(2);
    //Section 1 - iv faller
    lineBetween(
        [s_relay["iv"], s_relay["vv"], s_relay["rvv"], s_relay["bell"]], 
        [s_relay["fdiv"], s_relay["rvv"]]
    )
    lineBetween(
        [s_relay["vsv"], s_relay["vf"]],
        [s_relay["krs"], s_relay["bell"], s_relay["vsv"]]
    )
    //Section 2 - iv, sv faller
    lineBetween([s_relay["sv"], s_relay["fdsv"]], [])

    //Section 3 - iv, sv, iiv faller
    //Contains only iiv, which is not connected to anything.

    //Section 4 - iv drar, sv, iiv faller
    lineBetween(
        [a_relay["iv"], a_relay["trakvb"], a_relay["akv"], a_relay["vsv"], a_relay["vf"]],
        [a_relay["fdiv"], a_relay["akv"], a_relay["trakvb2"]]
    )

    //Section 5 - iv, sv drar, iiv faller
    lineBetween([a_relay["sv"],a_relay["vv"],a_relay["rvv"],a_relay["krs"]],[a_relay["bell"], a_relay["krs"]])
    
    //Section 6 - iv, sv, iiv drar
    lineBetween([a_relay["iiv"],a_relay["akv2"]], [a_relay["fdsv"], a_relay["rvv"]])
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

function markAllConors() {
    point(0,0)
    point(w_canvas,h_canvas)
    point(w_canvas,0)
    point(0,h_canvas)
}