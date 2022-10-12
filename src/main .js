import Intro from './scenes/Intro .js';
import Bootloader from './Bootloader.js';
//Carga la configuracion y la inicializa
const config = {
    title: "Megaman Intro",
    type: Phaser.AUTO,
    scale: {
        parent: "phaser_container",
        width: 512,
        height: 480,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    // backgroundColor: 
    pixelArt: true,
    scene: [Bootloader, Intro]
};

new Phaser.Game(config);