import Edificios from '../Edificios/Edificios.js';

class Intro extends Phaser.Scene {
    constructor() {
        super({key: 'Intro'});
    }

    init() {
        console.log('Scene: Intro');
        this.camara = this.cameras.main; //Camara principal
        this.audioMega = this.sound.add('megamanAudio', { //Declarando sonido megaman
            loop: false
        });
    }

    create() {
        //Menu principal
        const menuTextArray = [
            '  COMENZAR \n',
            '  CREDITOS \n\n',
            '  '
        ];
        //Logo
        const logo = this.add.image(this.scale.width / 2, - 1195, 'logo').setScale(2); 
        const menuText = this.add.bitmapText(90, -1070, 'font', menuTextArray);
        // Flecha de seleccion del menu
        const selectorPos = [0, 30];
        const selector = this.add.image(100, -1063 + selectorPos[0], 'selector').setScale(2);

        //Bajar y subir flecha
        const cursor = this.input.keyboard.createCursorKeys();
        cursor.down.on('down', () => {
            selector.y = -1063 + selectorPos[1];
        });

        cursor.up.on('down', () => {
            selector.y = -1063 + selectorPos[0];
        });

        //Parpadeo de la felcha
        this.tweens.add({
            targets: selector,
            ease: (e) => Math.round(e),
            repeat: -1,
            alpha: 0,
        });
        //Contenedor del menu
        const menuContainer = this.add.container(0, 0);
        menuContainer.add([
            selector, 
            logo,
            menuText
        ]);
        menuContainer.setAlpha(0);

        const creditsTextArray = [
            //Creditos inicio
            '  UNIVERSIDAD DISTRITAL \n',
            '2022 CAPCOM COLOMBIA INC\n',
            'LICENCIA DE\n',
            'NINTENDO AMERICA\n',
            'JHON TORRES'
        ];

        const textArray = {
            text: [
                //Historia
                'EN EL AÑO 2022\n\nFUE CREADO',
                ' EL ROBOT MEGAMAN\n\n POR EL DR.JHON ',
                'PARA EVITAR EL MAL\n\n DEL DR. PUTIN',
                'SIN EMBARGO EL DR.PUTIN \n\n CREO AL ROBOT KALASHNIKOV',
                'ESTA ES LA HISTORIA...\n\n DE MEGAMAN '
            ],
            count: 0
        };

        // Confiuracion de los Créditos
        const creditsText = this.add.bitmapText(
            this.scale.width / 2,
            this.scale.height / 2, 
            'font',
            creditsTextArray, 17, 1
        ).setOrigin(0.5).setDepth(2);

        // configuracion historia
        const historyText = this.add.bitmapText(0, 0, 'font', textArray.text[0])
            .setCenterAlign()
            .setDepth(2)
            .setAlpha(0);
        //Configuracion cuadro historia
        Phaser.Display.Align.In.BottomCenter(
            historyText,
            this.add.zone(0, -60, 512, 480).setOrigin(0)
        );
        //Configuracion fondo historia
        const background_text = this.add.image(0, this.scale.height, 'background_text')
            .setOrigin(0, 1)
            .setScrollFactor(0.7)
            .setDepth(1);

        // Configuracion Fondo
        const background = this.add.image(0, -104, 'objects', 'background')
            .setScale(2)
            .setOrigin(0)
            .setAlpha(0);
        background.setScrollFactor(0, 0.7);
        //Edificios
        const edificios = new Edificios(this, 'objects', 12);

        // megaman y sus animaciones
        const megaman = this.add.sprite(420, -960, 'megaman')
            .setScale(2)
            .setDepth(2)
            .setScrollFactor(.9);
        megaman.anims.play('idle');

        // Linea de tiempo
        const timeLine = this.tweens.createTimeline();

        timeLine.add({
            targets: creditsText,
            alpha: 0,
            delay: 2000,
            duration: 400,
            onComplete: () => {
                this.cameras.main.flash(400);
                this.audioMega.play();
            }
        });
        //Linea de tiempo de los edificios
        timeLine.add({
            targets: [background, ...edificios.getChildren()],
            alpha: 1,
            duration: 800
        });
        //Linea de tiempo de la historia
        timeLine.add({
            targets: [historyText],
            alpha: 1,
            repeat: textArray.text.length - 1,
            hold: 2600,
            repeatDelay: 90,
            yoyo: true,
            onRepeat: () => {
                textArray.count++;

                historyText.setText(textArray.text[textArray.count]);
                Phaser.Display.Align.In.BottomCenter(
                    historyText,
                    this.add.zone(0, -60, 512, 480).setOrigin(0)
                );
            },
            onComplete: () => {
                this.camara.pan(this.scale.width / 2, -1150, 8000, 'Quad.easeIn');
            }
        });
        //linea de tiempo del menu
        timeLine.add({
            targets: [menuContainer],
            delay: 9500,
            duration: 1,
            alpha: 1
        });

        timeLine.play();
        
    }

}

export default Intro;
