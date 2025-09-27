class fcVs {
    constructor(image, offset, row, isPowered) {
        this.img = image
        this.x = width/2+offset,
        this.y = fcGap*row,
        this.isPowered = isPowered
    }

    PowerToggle() {
        this.isPowered = !this.isPowered
    }

    Draw() {
        image(this.img, this.x-(this.img.width/2), this.y-(this.img.height/2))
        
        if(this.isPowered) {
            strokeWeight(4)
            line(
                this.x-(this.img.width/2),
                this.y+this.img.height-(this.img.height/2)+5,
                this.x+this.img.width-(this.img.width/2),
                this.y+this.img.height-(this.img.height/2)+5
            )
        }
    }
}