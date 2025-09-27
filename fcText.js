//Flowchart Text Object
class fcText {
    constructor(str, offset, row, isPowered) {
        this.str = str
        this.x = (width/2)+offset
        this.y = fcGap*row
        this.isPowered = isPowered
    }

    PowerToggle() {
        this.isPowered = !this.isPowered
    }
    
    Draw() {
        let tw = textWidth(this.str)
        let half_tw = tw/2
        
        if(this.isPowered) {    
            line(this.x-half_tw, this.y+5, this.x+tw-half_tw, this.y+5)
            text(this.str, this.x-half_tw, this.y)
        }
        else {
            text(this.str, this.x-half_tw, this.y)
        }
    }
}