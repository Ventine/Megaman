class Edificios extends Phaser.GameObjects.Group {
   //constructor
    constructor(Scene, key, cant = 0) {
        const pos = {
            x: 410,
            y: 288
        }
        //Constructor parametrico Acumular edificios
        super(Scene, {
            key: key,
            frame: 'edificio',
            repeat: cant - 1,
            setXY: {
                x: pos.x,
                y: pos.y,
                stepY: -96
            } 
        });
        //Terraza edificio
        this.create(pos.x, this.getLast(true).y - 144, key, 'edificio_top');

        this.children.iterate(x => {
            x.setScale(2);
            x.setAlpha(0);
            x.setScrollFactor(0.9)
        });
    }
}
export default Edificios;