// Three.js 라이브러리를 가져오는 부분
import * as THREE from 'three'; // 경로 수정
// OrbitControls를 가져오는 부분
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // 경로 수정

class App {
    constructor() {
        // 웹 페이지에서 해당 요소를 찾습니다.
        const divContainer = document.querySelector("#webgl-container");
        this._divContainer = divContainer;

        // Three.js WebGL 렌더러를 생성하고 설정합니다.
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);
        this._renderer = renderer;

        // Three.js 장면을 생성합니다.
        const scene = new THREE.Scene();
        this._scene = scene;

        // 카메라, 라이트, 모델, 컨트롤러 등을 초기화합니다.
        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();

        // 창 크기 변경 시 호출되는 이벤트 핸들러를 등록하고 초기 크기 설정합니다.
        window.onresize = this.resize.bind(this);
        this.resize();

        // 애니메이션 프레임을 요청하여 렌더링을 시작합니다.
        requestAnimationFrame(this.render.bind(this));
    }

    // 컨트롤러를 설정합니다.
    _setupControls() {
        new OrbitControls(this._camera, this._renderer.domElement);
    }

    // 기본적인 큐브 모델을 설정합니다.
    _setupModel() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({ color: 0x44a88 });
        const cube = new THREE.Mesh(geometry, material);
        this._scene.add(cube);
    }

    // 카메라를 설정합니다.
    _setupCamera() {
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            100
        );
        camera.position.z = 2;
        this._camera = camera;
    }

    // 조명을 설정합니다.
    _setupLight() {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);
    }

    // 시간에 따라 업데이트되는 메서드를 정의합니다.
    update(time) {
        time *= 0.001; // 초 단위로 변환
    }

    // 렌더링 메서드를 정의하고 애니메이션 프레임을 요청합니다.
    render(time) {
        this._renderer.render(this._scene, this._camera);
        this.update(time);

        requestAnimationFrame(this.render.bind(this));
    }

    // 창 크기가 변경될 때 호출되는 메서드를 정의합니다.
    resize() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height);
    }
}

// 페이지 로드 시 App 클래스의 인스턴스를 생성합니다.
window.onload = function () {
    new App();
}
