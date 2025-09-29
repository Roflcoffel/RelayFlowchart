class fcVs {
    constructor(visual, offset, row, isPowered) {
        this.visual = visual
        this.x = width/2+offset,
        this.y = fcGap*row,
        this.isPowered = isPowered
    }

    PowerToggle() {
        this.isPowered = !this.isPowered
    }

    Draw() {
        if(typeof this.visual == "string") {
            let tw = textWidth(this.visual)
            let half_tw = tw/2
        
            if(this.isPowered) {    
                line(this.x-half_tw, this.y+5, this.x+tw-half_tw, this.y+5)
                text(this.visual, this.x-half_tw, this.y)
            }
            else {
                text(this.visual, this.x-half_tw, this.y)
            }
        } else if(typeof this.visual == "object") {
          
            image(this.visual, this.x-(this.visual.width/2), this.y-(this.visual.height/2))
        
            if(this.isPowered) {
                strokeWeight(4)
                line(
                    this.x-(this.visual.width/2),
                    this.y+this.visual.height-(this.visual.height/2)+5,
                    this.x+this.visual.width-(this.visual.width/2),
                    this.y+this.visual.height-(this.visual.height/2)+5
                )
            }
        } else {
            console.log("Invalid 'this.visual' value")
        }
        
    }
}