class CDComplex {
    constructor() {
        this.sections = {}

        // The first object defines which relays are vertical and which are horizontal
        // ex. 0 means match all with 0 offset as vertical
        // meanwhile the horizontal check row instead.
        this.sections["S1"] = [
            {"v": [0,100], "h": [3, 4]}, 
            new fcVs("Iv", 0, 1, false), 
            new fcVs("Vv", 0, 2, false), 
            new fcVs("FdIv", -100, 3, true),
            new fcVs("RVv", 0, 3, false),
            new fcVs(imgs["motvägr"], -100, 4, false),
            new fcVs(imgs["bell"], 0, 4, true),
            new fcVs("Vsv", 100, 4, true),
            new fcVs(imgs["mottågv"], 100, 5, false)
        ]

        this.sections["S2"] = [
            {"v": [0], "h": []},
            new fcVs("Sv", 0, 6, false),
            new fcVs("FdSv", 0, 7, true)
        ]

        this.sections["S3"] = [
            {"v": [], "h": []},
            new fcVs("IIv", 0, 8, false)
        ]

        this.sections["S4"] = [
            {"v": [0], "h": [12]},
            new fcVs("Iv", 0, 9, true),
            new fcVs("TrAkvB", 0, 10, true),
            new fcVs("Akv", 0, 11, true),
            new fcVs("FdIv", -130, 12, false),
            new fcVs("Vsv", 0, 12, false),
            new fcVs("TrAkvB", 130, 12, false),
            new fcVs(imgs["mottågr"], 0, 13, false)
        ]

        this.sections["S5"] = [
            {"v": [0], "h": [16, 18]},
            new fcVs("Sv", 0, 15, true),
            new fcVs("Vv", 0, 16, true),
            new fcVs("FdSv", -100, 16, false),
            new fcVs("RVv", 0, 17, true),
            new fcVs(imgs["motvägv"], 0, 18, false),
            new fcVs(imgs["bell"], -100, 18, false)
        ]

        this.sections["S6"] = [
            {"v": [0], "h": []},
            new fcVs("IIv", 0, 20, true),
            new fcVs("Akv", 0, 21, false)
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