const canvas1 = document.getElementById("canvas1")
const pov = canvas1.getContext("2d")

const data = {
    H: 0.001
}

function getRadius(d, seta) {
    return 1 * d * Math.tan(seta / 2)
}

class Star {
    constructor(x, y, distance, R, T) {
        this.distance = distance
        this.x = x
        this.y = y
        this.R = R
        this.T = T
        this.color = 'rgb(255, 105, 0)'
    }
    draw() {
        this.seta = Math.acos(1 - (4 * this.R ** 2) / (2 * this.distance ** 2))
        var r = getRadius(this.distance, this.seta)
        console.log(`${this.distance}`)
        if (isNaN(r)) {
            r = 15
        }
        pov.beginPath()
        pov.fillStyle = this.color
        pov.arc(this.x, this.y, r**2, 0, 2 * Math.PI)
        pov.fill()
        pov.closePath()
    }
    move() {
       this.distance += data.H * this.distance
    }
}

var stars = [new Star(200, 200, 100, 10, 10000)]

function render() {
    pov.clearRect(0, 0, pov.width, pov.height)
    for (var i in stars) {
        stars[i].draw()
        stars[i].move()
    }
    requestAnimationFrame(render)
}
render()