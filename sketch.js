let font_size = 38
let fcGap = 80

let imgs = {}

function preload() {
    imgs["bell"] = loadImage("assets/bell.png")
    imgs["motväg"] = loadImage("assets/motväg_röd.png")
    imgs["mottågv"] = loadImage("assets/mottåg_vit.gif")
    imgs["mottågr"] = loadImage("assets/mottåg_röd.gif")
}

function setup() {
    createCanvas(390, 1500)
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
        "krs":    new fcVs(imgs["motväg"], -100, 4, false),
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
        "vf":      new fcVs(imgs["mottågr"], 0, 13, false)
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

    
}

function draw() {}

// This assumes all vertical are on the same y and
// also assumes all horizontal are on the same x
function lineBetween(vertical, horizontal) {
    if(vertical.length == 0) return
    for (let i = 0; i < vertical.length; i++) {
        const text = vertical[i];
        if(i+1 < vertical.length) {
            line(text.x, text.y+5,vertical[i+1].x,vertical[i+1].y-font_size+5)
        }   
    }
    if(horizontal.length == 0) return
    line(horizontal[0].x, horizontal[0].y-font_size-10, horizontal[horizontal.length-1].x, horizontal[horizontal.length-1].y-font_size-10)
    for (let i = 0; i < horizontal.length; i++) {
        const text = horizontal[i];
        line(text.x, text.y-font_size, text.x, text.y-font_size-10)
    }
}

function markAllConors() {
    point(0,0)
    point(w_canvas,h_canvas)
    point(w_canvas,0)
    point(0,h_canvas)
}