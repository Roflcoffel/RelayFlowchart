class BComplex {
    constructor() {
        this.sections = {}

        this.sections["S1"] = [
            {"v": [1,2,3,100], "h": [3, 4, 6, 7,8]},
            new fcVs("Iv", 1, 1, false),
            new fcVs("Vv", 1, 2, false),
            new fcVs("FdIv", 1, 3, true),
            new fcVs("RVv", 100, 3, false),
            new fcVs(imgs["bell"], -100, 4, true),
            new fcVs("Mv", 2, 4, false),
            new fcVs(imgs["motvägr"], 2, 4.8, false),
            new fcVs("Fv", 100, 4, false), //Indikera fördröjning på något sätt
            new fcVs("N1", 100, 6, true),
            new fcVs("N2", 3, 6, true),
            new fcVs(imgs["bomupp"], 3, 7, false),
            new fcVs("", 100, 7, false),
            new fcVs("Rlv1", 101, 8, false),
            new fcVs("Rlv2", 0, 8, false),
            new fcVs(imgs["bomupp"], 0, 8, false),
            new fcVs("Vsv", 0, 9, true),
            new fcVs("Rfv1", 0, 9, true),
            new fcVs("Rfv2", 0, 9, true),
            new fcVs("Vf", 0, 10, false),
            new fcVs("Vs", 0, 10, false),
            new fcVs("N1", 0, 10, false),
            new fcVs("N2", 0, 10, false),
            new fcVs(imgs["vffast"], 0, 11, false),
            new fcVs(imgs["mottågv"], 0, 11, false),
            new fcVs("Motor Stop", 0, 11, false)
        ]

        this.sections["S2"] = [

        ]

        this.sections["S3"] = [

        ]

        this.sections["S4"] = [

        ]
        
        this.sections["S5"] = [

        ]
        
        this.sections["S6"] = [

        ]
        
    }

    Draw() {
        strokeWeight(4);
        for (const name in this.sections) {
            for (let i = 1; i < this.sections[name].length; i++) {
                this.sections[name][i].Draw()
            }
        }
       
    }
}