/**
 * 3D文字
 */
class ThreeDText extends THREE.Mesh {
    constructor(text = '', options) {
        const parameters = Object.assign({ // 默认参数
            size: 16,
            height: 4,
            bevelEnabled: true,
            bevelSize: 0.5,
            bevelThickness: 0.5,
            depth: 4
        }, options, {
            font: new THREE.Font(JSON.parse(options.font)),
        });

        const geometry = new THREE.TextBufferGeometry(text, parameters);
        const material = new THREE.MeshPhongMaterial({
            color: options.color || '#ffffff'
        });

        super(geometry, material);

        this.name = text;

        this.userData = {
            type: '3dtext',
            text: text,
            ...options
        };
    }
}

export default ThreeDText;