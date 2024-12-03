import * as THREE from 'three';         
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { textureUtils } from './textureUtils.js';

function createTurretMaterials(textureUtils) {
    return {
        armor: new THREE.MeshStandardMaterial({
            map: textureUtils.generateNanoTexture(),
            normalMap: textureUtils.generateNormalMap(),
            metalness: 0.8,
            roughness: 0.3,
            emissive: new THREE.Color(0x330000),
            emissiveIntensity: 0.2
        }),
        tech: new THREE.MeshStandardMaterial({
            map: textureUtils.generateTechTexture(),
            normalMap: textureUtils.generateNormalMap(),
            metalness: 0.9,
            roughness: 0.2,
            emissive: new THREE.Color(0x001100),
            emissiveIntensity: 0.3
        }),
        metal: new THREE.MeshStandardMaterial({
            map: textureUtils.generateMetalTexture(),
            normalMap: textureUtils.generateNormalMap(),
            metalness: 1,
            roughness: 0.1
        }),
        scope: new THREE.MeshStandardMaterial({
            color: 0x222222,
            metalness: 1,
            roughness: 0.1,
            emissive: 0x00ff00,
            emissiveIntensity: 0.5
        }),
        coolant: new THREE.MeshStandardMaterial({
            color: 0x444444,
            metalness: 1,
            roughness: 0.2,
            emissive: 0x00ffff,
            emissiveIntensity: 0.5
        })
    };
}

function createTurret(materials) {
    const turret = new THREE.Group();
    
    // Создаем материал для энергетического свечения
    const energyMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.8,
        emissive: 0x00ffff,
        emissiveIntensity: 1
    });

    // Создаем материал для плазменного свечения
    const plasmaMaterial = new THREE.MeshBasicMaterial({
        color: 0xff00ff,
        transparent: true,
        opacity: 0.6,
        emissive: 0xff00ff,
        emissiveIntensity: 0.8
    });

    // Основная база турели (более агрессивный дизайн)
    const baseGroup = new THREE.Group();
    
    // Основание с угловатыми формами
    const basePlatform = new THREE.Mesh(
        new THREE.CylinderGeometry(5, 5.5, 2, 8),
        materials.armor
    );
    baseGroup.add(basePlatform);

    // Добавляем энергетические кольца в основание
    const energyRing = new THREE.Mesh(
        new THREE.TorusGeometry(5.2, 0.1, 16, 32),
        energyMaterial
    );
    energyRing.rotation.x = Math.PI / 2;
    baseGroup.add(energyRing);

    // Создаем футуристичную основную часть
    const mainBody = new THREE.Group();
    
    // Центральный корпус с агрессивными линиями
    const core = new THREE.Mesh(
        new THREE.BoxGeometry(8, 4, 6),
        materials.armor
    );
    core.position.y = 3;
    mainBody.add(core);

    // Добавляем энергетические линии на корпус
    for(let i = 0; i < 3; i++) {
        const energyLine = new THREE.Mesh(
            new THREE.BoxGeometry(7.8, 0.1, 0.1),
            energyMaterial
        );
        energyLine.position.set(0, 2 + i, 3.1);
        mainBody.add(energyLine);
        
        const energyLine2 = energyLine.clone();
        energyLine2.position.z = -3.1;
        mainBody.add(energyLine2);
    }

    // Боковы пластины брони с технологичным дизайном
    for(let side = 0; side < 2; side++) {
        const armorPlate = new THREE.Mesh(
            new THREE.BoxGeometry(8.2, 4.2, 0.5),
            materials.tech
        );
        armorPlate.position.set(0, 3, side === 0 ? 3.3 : -3.3);
        
        // Добавляем светящиеся элементы на пластины
        const pattern = new THREE.Group();
        for(let i = 0; i < 3; i++) {
            const line = new THREE.Mesh(
                new THREE.BoxGeometry(0.8, 3, 0.1),
                plasmaMaterial
            );
            line.position.x = -2 + i * 2;
            pattern.add(line);
        }
        armorPlate.add(pattern);
        mainBody.add(armorPlate);
    }

    // Создаем продвинутые ракетные установки
    const weaponPods = new THREE.Group();
    
    // По два оружейных пода с каждой стороны
    for(let side = 0; side < 2; side++) {
        const pod = new THREE.Group();
        
        // Основной корпус пода
        const podHousing = new THREE.Mesh(
            new THREE.BoxGeometry(3, 5, 4),
            materials.armor
        );
        pod.add(podHousing);

        // Энергетическая решетка на поде
        const grid = new THREE.Group();
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 2; j++) {
                const cell = new THREE.Mesh(
                    new THREE.BoxGeometry(0.8, 0.8, 0.1),
                    energyMaterial
                );
                cell.position.set(
                    j * 1 - 0.5,
                    i * 1.5 - 1.5,
                    2.1
                );
                grid.add(cell);
            }
        }
        pod.add(grid);

        // Ракетные трубы нового поколения
        const tubeRack = new THREE.Group();
        for(let row = 0; row < 2; row++) {
            for(let col = 0; col < 3; col++) {
                const tubeAssembly = new THREE.Group();
                
                // Основная труба с гексагональным сечением
                const tube = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.3, 0.35, 5, 6),
                    materials.metal
                );
                tube.rotation.x = Math.PI / 2;
                tubeAssembly.add(tube);

                // Плазменные кольца
                for(let ring = 0; ring < 4; ring++) {
                    const plasmaRing = new THREE.Mesh(
                        new THREE.TorusGeometry(0.4, 0.05, 6, 12),
                        plasmaMaterial
                    );
                    plasmaRing.position.z = -1.5 + ring * 1;
                    plasmaRing.rotation.y = Math.PI / 6;
                    tubeAssembly.add(plasmaRing);
                }

                // Энергетическое свечение внутри трубы
                const innerGlow = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.2, 0.2, 4.8, 6),
                    energyMaterial
                );
                innerGlow.rotation.x = Math.PI / 2;
                tubeAssembly.add(innerGlow);

                tubeAssembly.position.set(
                    row * 1 - 0.5,
                    col * 1.4 - 1.4,
                    1
                );
                tubeRack.add(tubeAssembly);
            }
        }
        pod.add(tubeRack);

        // Система наведения следующего поколения
        const targetingSystem = new THREE.Group();
        
        // Основной сенсор
        const mainSensor = new THREE.Mesh(
            new THREE.BoxGeometry(2.8, 0.8, 1),
            materials.tech
        );
        targetingSystem.add(mainSensor);

        // Голографические прицелы
        for(let i = 0; i < 2; i++) {
            const holoSight = new THREE.Mesh(
                new THREE.RingGeometry(0.3, 0.4, 16),
                energyMaterial
            );
            holoSight.position.set(i === 0 ? -1 : 1, 0, 0.6);
            holoSight.rotation.x = Math.PI / 2;
            targetingSystem.add(holoSight);
        }

        targetingSystem.position.set(0, 2, 2.5);
        pod.add(targetingSystem);

        // Позиционируем под
        pod.position.x = side === 0 ? -5.5 : 5.5;
        pod.position.y = 3;
        pod.rotation.y = side === 0 ? Math.PI / 12 : -Math.PI / 12;
        
        weaponPods.add(pod);
    }

    // Добавляем имена для анимации
    baseGroup.name = 'baseGroup';
    weaponPods.name = 'weaponPods';
    
    // Создаем точки поворота для подов
    weaponPods.children.forEach((pod, index) => {
        // Создаем точку вращения
        const pivotPoint = new THREE.Group();
        pivotPoint.position.copy(pod.position);
        pod.position.set(0, 0, 0); // Сбрасываем позицию пода
        
        // Перемещаем под в точку вращения
        pivotPoint.add(pod);
        weaponPods.children[index] = pivotPoint;
    });
    
    // Добавляем основные пушки
    const mainGuns = new THREE.Group();
    
    // Создаем спаренную пушку
    for(let side = 0; side < 2; side++) {
        const gunMount = new THREE.Group();
        
        // Основание пушки
        const gunBase = new THREE.Mesh(
            new THREE.BoxGeometry(2, 2.5, 3),
            materials.armor
        );
        gunMount.add(gunBase);
        
        // Основной ствол
        const mainBarrel = new THREE.Mesh(
            new THREE.CylinderGeometry(0.4, 0.45, 8, 8),
            materials.metal
        );
        mainBarrel.rotation.x = Math.PI / 2;
        mainBarrel.position.z = 4;
        gunMount.add(mainBarrel);
        
        // Кожух ствола с технологичным дизайном
        const barrelCasing = new THREE.Mesh(
            new THREE.CylinderGeometry(0.6, 0.6, 6, 8),
            materials.tech
        );
        barrelCasing.rotation.x = Math.PI / 2;
        barrelCasing.position.z = 3;
        gunMount.add(barrelCasing);
        
        // Энергетические кьца на стволе
        for(let ring = 0; ring < 4; ring++) {
            const energyRing = new THREE.Mesh(
                new THREE.TorusGeometry(0.65, 0.05, 8, 16),
                new THREE.MeshStandardMaterial({
                    color: 0x00ffff,
                    transparent: true,
                    opacity: 0.7,
                    emissive: 0x00ffff,
                    emissiveIntensity: 0.5
                })
            );
            energyRing.position.z = 1 + ring * 1.5;
            energyRing.rotation.x = Math.PI / 2;
            gunMount.add(energyRing);
        }
        
        // Система охлаждения
        for(let i = 0; i < 3; i++) {
            const coolantPipe = new THREE.Mesh(
                new THREE.CylinderGeometry(0.15, 0.15, 4, 6),
                materials.tech
            );
            const angle = (i / 3) * Math.PI * 2;
            coolantPipe.position.set(
                Math.cos(angle) * 0.7,
                Math.sin(angle) * 0.7,
                2
            );
            coolantPipe.rotation.x = Math.PI / 2;
            gunMount.add(coolantPipe);
        }
        
        // Позиционируем пушку
        gunMount.position.x = side === 0 ? -2 : 2;
        gunMount.position.y = 4;
        gunMount.position.z = 2;
        
        mainGuns.add(gunMount);
    }
    
    // Добавляем систему наведения для пушек
    const gunTargeting = new THREE.Group();
    
    // Основной прицел
    const mainScope = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.4, 1.5, 8),
        materials.tech
    );
    mainScope.rotation.x = Math.PI / 2;
    mainScope.position.set(0, 4.5, 3);
    gunTargeting.add(mainScope);
    
    // Боковые сенсоры
    for(let side = 0; side < 2; side++) {
        const sensor = new THREE.Mesh(
            new THREE.BoxGeometry(0.8, 0.4, 1),
            materials.tech
        );
        sensor.position.set(side === 0 ? -1.2 : 1.2, 4.5, 2.8);
        
        // Добавляем светящиеся линзы
        const lens = new THREE.Mesh(
            new THREE.CircleGeometry(0.15, 8),
            new THREE.MeshStandardMaterial({
                color: 0x00ffff,
                transparent: true,
                opacity: 0.9,
                emissive: 0x00ffff,
                emissiveIntensity: 0.8
            })
        );
        lens.rotation.y = Math.PI / 2;
        lens.position.x = side === 0 ? -0.4 : 0.4;
        sensor.add(lens);
        
        gunTargeting.add(sensor);
    }
    
    mainGuns.add(gunTargeting);
    mainGuns.name = 'mainGuns';
    
    // Добавляем верхние ракетные установки
    const topMissileLaunchers = new THREE.Group();

    // Создаем центральную платформу для ракет
    const launcherPlatform = new THREE.Mesh(
        new THREE.BoxGeometry(6, 1, 4),
        materials.armor
    );
    launcherPlatform.position.y = 6;
    topMissileLaunchers.add(launcherPlatform);

    // Добавляем технологичные детали на платформу
    for(let i = 0; i < 2; i++) {
        const techPanel = new THREE.Mesh(
            new THREE.BoxGeometry(5.8, 0.2, 0.8),
            materials.tech
        );
        techPanel.position.set(0, 6.1, i === 0 ? 1.5 : -1.5);
        
        // Добавляем светящиеся элементы
        for(let j = 0; j < 3; j++) {
            const light = new THREE.Mesh(
                new THREE.BoxGeometry(0.4, 0.3, 0.3),
                new THREE.MeshStandardMaterial({
                    color: 0x00ffff,
                    transparent: true,
                    opacity: 0.8,
                    emissive: 0x00ffff,
                    emissiveIntensity: 0.6
                })
            );
            light.position.x = -2 + j * 2;
            techPanel.add(light);
        }
        topMissileLaunchers.add(techPanel);
    }

    // Создаем вертикальные ракетные шахты
    for(let row = 0; row < 2; row++) {
        for(let col = 0; col < 3; col++) {
            const missileCell = new THREE.Group();
            
            // Основание шахты
            const cellBase = new THREE.Mesh(
                new THREE.CylinderGeometry(0.4, 0.4, 1.2, 8),
                materials.tech
            );
            missileCell.add(cellBase);

            // Ракета внутри
            const missile = new THREE.Group();
            
            // Корпус ракеты
            const missileBody = new THREE.Mesh(
                new THREE.CylinderGeometry(0.25, 0.25, 2, 8),
                materials.metal
            );
            missile.add(missileBody);

            // Наконечник ракеты
            const missileTip = new THREE.Mesh(
                new THREE.ConeGeometry(0.25, 0.5, 8),
                materials.tech
            );
            missileTip.position.y = 1.25;
            missile.add(missileTip);

            // Стабилизаторы
            for(let fin = 0; fin < 4; fin++) {
                const stabilizer = new THREE.Mesh(
                    new THREE.BoxGeometry(0.4, 0.6, 0.05),
                    materials.metal
                );
                stabilizer.position.y = -0.7;
                stabilizer.rotation.y = (fin / 4) * Math.PI * 2;
                stabilizer.translateX(0.25);
                missile.add(stabilizer);
            }

            missile.position.y = 0.6;
            missileCell.add(missile);

            // Энергетичское ольо
            const energyRing = new THREE.Mesh(
                new THREE.TorusGeometry(0.45, 0.05, 8, 16),
                new THREE.MeshBasicMaterial({
                    color: 0xff00ff,
                    transparent: true,
                    opacity: 0.6,
                    emissive: 0xff00ff
                })
            );
            energyRing.rotation.x = Math.PI / 2;
            energyRing.position.y = 0.2;
            missileCell.add(energyRing);

            // Позиционируем ячейку
            missileCell.position.set(
                -2 + col * 2,
                6.6,
                row === 0 ? 0.8 : -0.8
            );
            
            // Добавляем имя для анимации
            missileCell.name = `missileCell_${row}_${col}`;
            
            topMissileLaunchers.add(missileCell);
        }
    }

    topMissileLaunchers.name = 'topMissileLaunchers';
    
    // Добавляем все компоненты к турели
    turret.add(baseGroup);
    turret.add(mainBody);
    turret.add(weaponPods);
    turret.add(mainGuns);
    turret.add(topMissileLaunchers);
    
    // Обновляем анимацию
    const gunPivot = new THREE.Group();
    gunPivot.add(mainGuns);
    gunPivot.name = 'gunPivot';
    turret.add(gunPivot);
    
    // Масштабируем турель
    turret.scale.set(1.5, 1.5, 1.5);
    
    return turret;
}

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(250, 150, 250);
camera.lookAt(0, 50, 0);

const controls = new OrbitControls(camera, renderer.domElement);

// Основное солнечное освещение
const sunLight = new THREE.DirectionalLight(0xFFFFFF, 1.5);
sunLight.position.set(100, 100, 50);
sunLight.castShadow = true;

// Настраиваем тени от солнца
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 500;
sunLight.shadow.camera.left = -100;
sunLight.shadow.camera.right = 100;
sunLight.shadow.camera.top = 100;
sunLight.shadow.camera.bottom = -100;
scene.add(sunLight);

// Основное освещение
const sceneAmbientLight = new THREE.AmbientLight(0xFFFFFF, 0.6);
scene.add(sceneAmbientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(100, 100, 50);
directionalLight.castShadow = true;

// Настраиваем тени
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500;
directionalLight.shadow.camera.left = -100;
directionalLight.shadow.camera.right = 100;
directionalLight.shadow.camera.top = 100;
directionalLight.shadow.camera.bottom = -100;
scene.add(directionalLight);

// Атмосферная дымка
const skyLight = new THREE.HemisphereLight(0xFFFFFF, 0x87CEEB, 0.6);
scene.add(skyLight);

// Настраиваем параметры рендеринга для дневного освещения
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Обновляем материалы для дневного освещения
function updateMaterialsForDaylight(object) {
    if (object.material) {
        // Уменьшаем интенсивность свечения для дневного времени
        if (object.material.emissive) {
            object.material.emissiveIntensity *= 0.3;
        }
        // Настраиваем параметры материалов для дневного освещения
        if (object.material.roughness !== undefined) {
            object.material.roughness = Math.min(object.material.roughness + 0.2, 1.0);
        }
    }
    // Рекурсивно бходим все дочерние объекты
    object.children.forEach(child => updateMaterialsForDaylight(child));
}

// Применяем оновение материалов ко всей сцене
updateMaterialsForDaylight(scene);

// Функция создания частиц для оружия
function createWeaponParticles() {
    const particleCount = 100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 4;
        positions[i + 1] = Math.random() * 4;
        positions[i + 2] = (Math.random() - 0.5) * 4;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            color: { value: new THREE.Color(0xff0000) }
        },
        vertexShader: `
            uniform float time;
            
            void main() {
                vec3 pos = position;
                float safeTime = time;
                
                // Add safety checks for position values
                float maxOffset = 0.1;
                float xOffset = clamp(sin(safeTime + position.y) * maxOffset, -maxOffset, maxOffset);
                float zOffset = clamp(cos(safeTime + position.y) * maxOffset, -maxOffset, maxOffset);
                
                pos.x += xOffset;
                pos.z += zOffset;
                
                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                float size = clamp(300.0 / -mvPosition.z, 0.1, 10.0);
                gl_PointSize = 2.0 * size;
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            uniform vec3 color;
            
            void main() {
                float dist = length(gl_PointCoord - vec2(0.5));
                if(dist > 0.5) discard;
                
                gl_FragColor = vec4(color, 1.0 - dist * 2.0);
            }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending
    });
    
    return new THREE.Points(geometry, material);
}

class DefenseSystem {
    constructor() {
        this.layers = {};
        this.materials = this.createMaterials();
        
        // Создаем слои защиты
        this.createBaseLayers();
        this.createUltraFans();
        this.createMagneticGrids();
        this.createDome();
        this.createSprayers();
        this.createAntiAirDefense();
        
        // Запускаем анимацию
        this.animate();
    }

    createMaterials() {
        return {
            armor: new THREE.MeshStandardMaterial({
                map: textureUtils.generateNanoTexture(),
                normalMap: textureUtils.generateNormalMap(),
                metalness: 0.8,
                roughness: 0.3,
                emissive: new THREE.Color(0x330000),
                emissiveIntensity: 0.2
            }),
            tech: new THREE.MeshStandardMaterial({
                map: textureUtils.generateTechTexture(),
                normalMap: textureUtils.generateNormalMap(),
                metalness: 0.9,
                roughness: 0.2,
                emissive: new THREE.Color(0x001100),
                emissiveIntensity: 0.3
            }),
            metal: new THREE.MeshStandardMaterial({
                map: textureUtils.generateMetalTexture(),
                normalMap: textureUtils.generateNormalMap(),
                metalness: 1,
                roughness: 0.1
            }),
            scope: new THREE.MeshStandardMaterial({
                color: 0x222222,
                metalness: 1,
                roughness: 0.1,
                emissive: 0x00ff00,
                emissiveIntensity: 0.5
            }),
            coolant: new THREE.MeshStandardMaterial({
                color: 0x444444,
                metalness: 1,
                roughness: 0.2,
                emissive: 0x00ffff,
                emissiveIntensity: 0.5
            })
        };
    }

    createBaseLayers() {
        // Ground plane
        const groundGeometry = new THREE.PlaneGeometry(2000, 2000);
        const groundMaterial = new THREE.MeshStandardMaterial({
            map: textureUtils.generateGroundTexture(),
            normalMap: textureUtils.generateGroundNormalMap(),
            roughnessMap: textureUtils.generateGroundRoughnessMap(),
            metalness: 0.8,
            roughness: 0.7,
            envMapIntensity: 0.5
        });
        
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        scene.add(ground);
        
        // Rest of the existing code...
    }

    createUltraFans() {
        const ultraFansGroup = new THREE.Group();

        // Создаем базовый материал е envMap
        const baseMaterial = new THREE.MeshStandardMaterial({
            color: 0x2a2a2a,
            metalness: 0.9,
            roughness: 0.2
        });

        // Создаем материал для воздушного потока
        const airFlowMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color(0x00ffff) },
                opacity: { value: 0.6 }
            },
            vertexShader: `
                varying vec2 vUv;
                varying float vIntensity;
                uniform float time;
                
                void main() {
                    vUv = uv;
                    vec3 pos = position;
                    
                    // Безопасное вычиление высоты
                    float safeHeight = max(0.0001, 45.0);
                    float normalizedHeight = clamp(pos.y / safeHeight, 0.0, 1.0);
                    
                    // Ускореное движение вверх
                    float speed = 6.0;
                    pos.y = mod(pos.y + time * speed, safeHeight);
                    
                    // Более быстрое спиральное движение
                    float heightFactor = 1.0 - normalizedHeight;
                    float spiralRadius = 0.4 * heightFactor;
                    
                    float angle = time * 4.0 + normalizedHeight * 12.0;
                    float safeAngle = mod(angle, 6.28318);
                    
                    vec2 spiral = vec2(
                        cos(safeAngle) * spiralRadius,
                        sin(safeAngle) * spiralRadius
                    );
                    
                    pos.x += spiral.x;
                    pos.z += spiral.y;
                    
                    // Более быстрая пульсация
                    float pulse = sin(time * 3.0 + normalizedHeight * 4.0) * 0.15 + 1.0;
                    pos.x *= pulse;
                    pos.z *= pulse;
                    
                    vIntensity = heightFactor * 1.5;
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 color;
                uniform float opacity;
                uniform float time;
                varying vec2 vUv;
                varying float vIntensity;
                
                void main() {
                    float alpha = vIntensity * opacity * 1.2;
                    
                    // Более частые и заетные линии потока
                    float flow = smoothstep(0.0, 1.0, sin(vUv.y * 80.0 + time * 8.0) * 0.5 + 0.5);
                    flow *= smoothstep(0.0, 1.0, sin(vUv.y * 40.0 - time * 6.0) * 0.5 + 0.5);
                    
                    alpha *= flow;
                    
                    // Более яркие цвета
                    vec3 finalColor = mix(color * 3.0, color * 0.7, vUv.y);
                    float glow = exp(-vUv.y * 2.0) * 0.6;
                    finalColor += color * glow;
                    
                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide
        });

        // Функция сздани оздушного потока
        const createAirFlow = (isOuter) => {
            const height = 45;
            const segments = 40;
            let geometry;
            
            if (isOuter) {
                const points = [];
                const numPoints = 6;
                for (let i = 0; i < numPoints; i++) {
                    const t = i / (numPoints - 1);
                    const y = height * t;
                    const z = height * 0.25 * Math.pow(t, 1.2);
                    points.push(new THREE.Vector3(0, y, z));
                }
                
                const curve = new THREE.CatmullRomCurve3(points);
                geometry = new THREE.TubeGeometry(curve, segments, 2, 12, false);
            } else {
                // Создаем базовую геомтрию с меньшим количеством сегментов
                geometry = new THREE.CylinderGeometry(2.5, 0.4, height, 16, 30, true);
                
                // Безопасная модификаця вершин
                const positions = geometry.attributes.position;
                const tempPos = new THREE.Vector3();
                
                for (let i = 0; i < positions.count; i++) {
                    tempPos.fromBufferAttribute(positions, i);
                    
                    const t = Math.max(0.0001, Math.min(1.0, tempPos.y / height));
                    const angle = t * Math.PI * 3;
                    const radius = 1.0 - Math.pow(t, 1.2) * 0.7;
                    
                    const newX = tempPos.x * (1.0 + Math.sin(angle) * 0.15) * radius;
                    const newZ = tempPos.z * (1.0 + Math.cos(angle) * 0.15) * radius;
                    
                    if (!isNaN(newX) && !isNaN(newZ)) {
                        positions.setXYZ(i, newX, tempPos.y, newZ);
                    }
                }
                
                geometry.computeVertexNormals();
                geometry.computeBoundingSphere();
            }
            
            const material = airFlowMaterial.clone();
            const mesh = new THREE.Mesh(geometry, material);
            mesh.renderOrder = 1;
            return mesh;
        };

        // Внешние вентиляторы по перметру
        for(let i = 0; i < 24; i++) {
            const angle = (i / 24) * Math.PI * 2;
            const radius = 180;
            
            // оздаем наклоный венилятор
            const fanGroup = new THREE.Group();
            
            // Основание
            const baseGroup = new THREE.Group();
            
            // Плоское онование
            const basePlate = new THREE.Mesh(
                new THREE.BoxGeometry(8, 1, 8),
                baseMaterial
            );
            baseGroup.add(basePlate);

            // Стойка
            const stand = new THREE.Mesh(
                new THREE.BoxGeometry(4, 8, 4),
                baseMaterial
            );
            stand.position.y = 4;
            
            // Наклон к куполу
            const targetHeight = 60;
            const horizontalDistance = radius * 0.7;
            const tiltAngle = Math.atan2(targetHeight, horizontalDistance);
            stand.rotation.x = Math.PI/2 - tiltAngle;
            baseGroup.add(stand);

            // Неоновое кольцо
            const baseLight = new THREE.Mesh(
                new THREE.RingGeometry(3.5, 3.7, 32),
                baseMaterial
            );
            baseLight.rotation.x = -Math.PI/2;
            baseLight.position.y = 0.51;
            baseGroup.add(baseLight);

            fanGroup.add(baseGroup);

            // Вентлятор
            const ventGroup = new THREE.Group();
            
            // Корпус вентилятора
            const ventBody = new THREE.Mesh(
                new THREE.CylinderGeometry(5, 5, 2.5, 16),
                baseMaterial
            );
            ventGroup.add(ventBody);

            // Защитная решетка
            const grillGroup = new THREE.Group();
            
            // Внешнее кольцо
            const outerRing = new THREE.Mesh(
                new THREE.TorusGeometry(4.8, 0.15, 16, 32),
                baseMaterial
            );
            grillGroup.add(outerRing);

            // Внутреннее кольцо
            const innerRing = new THREE.Mesh(
                new THREE.TorusGeometry(2, 0.15, 16, 32),
                baseMaterial
            );
            grillGroup.add(innerRing);

            // Пруть решетки
            for(let j = 0; j < 6; j++) {
                const bar = new THREE.Mesh(
                    new THREE.BoxGeometry(0.15, 4.8, 0.15),
                    baseMaterial
                );
                bar.rotation.z = (j / 6) * Math.PI * 2;
                grillGroup.add(bar);
            }

            grillGroup.position.z = 1.3;
            ventGroup.add(grillGroup);

            // Лопасти
            const bladesGroup = new THREE.Group();
            const bladeCount = 4;
            
            for(let j = 0; j < bladeCount; j++) {
                const blade = new THREE.Group();

                // ссновная часть лопасти
                const mainBlade = new THREE.Mesh(
                    new THREE.ExtrudeGeometry(
                        new THREE.Shape()
                            .moveTo(0, 0)
                            .lineTo(1.5, 0.8)
                            .lineTo(1.5, 4)
                            .lineTo(-1.5, 4)
                            .lineTo(-1.5, 0.8)
                            .lineTo(0, 0),
                        {
                            depth: 0.2,
                            bevelEnabled: true,
                            bevelThickness: 0.1,
                            bevelSize: 0.1
                        }
                    ),
                    baseMaterial
                );

                blade.add(mainBlade);
                blade.rotation.y = (j / bladeCount) * Math.PI * 2;
                bladesGroup.add(blade);
            }

            ventGroup.add(bladesGroup);
            ventGroup.userData.blades = bladesGroup;

            // Добавляем эффект воздушного потока
            const airFlow = createAirFlow(true);
            airFlow.position.z = 2;
            ventGroup.add(airFlow);
            ventGroup.userData.airFlow = airFlow;

            // Позиционирование вентилятора
            ventGroup.position.y = 8;
            ventGroup.rotation.x = Math.PI/2 - tiltAngle;
            fanGroup.add(ventGroup);

            // Позициоирование всей группы
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const surfaceHeight = this.terrain ? this.terrain.getHeightAt(x, z) : 0;
            
            fanGroup.position.set(x, surfaceHeight + 0.5, z);
            
            // Направление на купол
            const targetPoint = new THREE.Vector3(
                Math.cos(angle) * radius * 0.3,
                60,
                Math.sin(angle) * radius * 0.3
            );
            fanGroup.lookAt(targetPoint);

            ultraFansGroup.add(fanGroup);
        }

        // Внутренние вентилятры
        for(let i = 0; i < 24; i++) {
            const angle = (i / 24) * Math.PI * 2;
            const radius = 145;
            
            // Создаем вертикальый вентилятор
            const fanGroup = new THREE.Group();
            
            // Основание
            const base = new THREE.Mesh(
                new THREE.CylinderGeometry(4, 5, 2, 8),
                baseMaterial
            );
            fanGroup.add(base);

            // Корпс вентилятора
            const mainBody = new THREE.Mesh(
                new THREE.CylinderGeometry(6, 6, 4, 16),
                baseMaterial
            );
            mainBody.position.y = 3;
            fanGroup.add(mainBody);
            
            // Защитная решетка
            const grillGroup = new THREE.Group();
            grillGroup.position.y = 5;
            grillGroup.rotation.x = Math.PI/2;
            
            // Внешне кольцо
            const outerRing = new THREE.Mesh(
                new THREE.TorusGeometry(5.8, 0.2, 16, 32),
                baseMaterial
            );
            grillGroup.add(outerRing);

            // Внутреннее кольцо
            const innerRing = new THREE.Mesh(
                new THREE.TorusGeometry(3, 0.2, 16, 32),
                baseMaterial
            );
            grillGroup.add(innerRing);

            // Решетка
            for(let j = 0; j < 8; j++) {
                const bar = new THREE.Mesh(
                    new THREE.BoxGeometry(0.2, 5.8, 0.2),
                    baseMaterial
                );
                bar.rotation.z = (j / 8) * Math.PI * 2;
                grillGroup.add(bar);
            }

            fanGroup.add(grillGroup);

            // Лпасти
            const bladesGroup = new THREE.Group();
            bladesGroup.position.y = 5;
            const bladeCount = 6;
            
            for(let j = 0; j < bladeCount; j++) {
                const blade = new THREE.Group();

                // Основная часть лопасти
                const mainBlade = new THREE.Mesh(
                    new THREE.ExtrudeGeometry(
                        new THREE.Shape()
                            .moveTo(0, 0)
                            .lineTo(2, 0.5)
                            .lineTo(2, 4)
                            .lineTo(-2, 4)
                            .lineTo(-2, 0.5)
                            .lineTo(0, 0),
                        {
                            depth: 0.2,
                            bevelEnabled: true,
                            bevelThickness: 0.1,
                            bevelSize: 0.1
                        }
                    ),
                    baseMaterial
                );

                mainBlade.rotation.x = Math.PI/2;
                blade.add(mainBlade);
                blade.rotation.y = (j / bladeCount) * Math.PI * 2;
                bladesGroup.add(blade);
            }

            fanGroup.add(bladesGroup);
            fanGroup.userData.blades = bladesGroup;
            fanGroup.userData.isVertical = true;

            // Добавляем эффект воздушного потока
            const airFlow = createAirFlow(false);
            airFlow.position.y = 6;
            fanGroup.add(airFlow);
            fanGroup.userData.airFlow = airFlow;

            // Неоновая подсветка
            const glow = new THREE.PointLight(0x00ffff, 0.2, 8);
            glow.position.y = 5;
            fanGroup.add(glow);
            
            // Кольцо подсветк
            const glowRing = new THREE.Mesh(
                new THREE.TorusGeometry(5.9, 0.2, 16, 32),
                baseMaterial
            );
            glowRing.rotation.x = Math.PI/2;
            glowRing.position.y = 5;
            fanGroup.add(glowRing);
            
            // Позиционирование
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const surfaceHeight = this.terrain ? this.terrain.getHeightAt(x, z) : 0;
            
            fanGroup.position.set(x, surfaceHeight + 0.5, z);

            ultraFansGroup.add(fanGroup);
        }

        scene.add(ultraFansGroup);
        this.layers.ultraFans = ultraFansGroup;

        // Анимация
        let time = 0;
        const animate = () => {
            time += 0.03;
            
            ultraFansGroup.children.forEach(fan => {
                if (fan.userData.blades) {
                    fan.userData.blades.rotation.y += 0.3;
                }
                
                if (fan.userData.airFlow && fan.userData.airFlow.material) {
                    fan.userData.airFlow.material.uniforms.time.value = time;
                }
            });
            
            requestAnimationFrame(animate);
        };
        animate();

        return ultraFansGroup;
    }

    createMagneticGrids() {
        if (this.layers.magneticGrids) {
            scene.remove(this.layers.magneticGrids);
        }

        const magneticGrids = new THREE.Group();

        // Получаем позиции ТОЛЬКО внутренних вентиляторов
        const internalFans = [];
        this.layers.ultraFans.children.forEach(fan => {
            // Проверяем что это именно внутренний вентилятор
            if (fan.userData && fan.userData.isVertical) {
                const worldPosition = new THREE.Vector3();
                fan.getWorldPosition(worldPosition);
                // Дополнительная проверка на расстояние о центра
                const distanceFromCenter = Math.sqrt(worldPosition.x * worldPosition.x + worldPosition.z * worldPosition.z);
                if (distanceFromCenter > 5) { // Только если вентилятор достаточно далеко от центра
                    internalFans.push({
                        fan: fan,
                        position: worldPosition
                    });
                }
            }
        });

        internalFans.forEach(({fan, position}) => {
            const magnetSystem = new THREE.Group();

            // Основное магнитное кольцо
            const magnetRing = new THREE.Mesh(
                new THREE.TorusGeometry(4, 0.4, 32, 64),
                new THREE.MeshPhongMaterial({
                    color: 0x00ffff,
                    emissive: 0x00ffff,
                    emissiveIntensity: 0.5,
                    transparent: true,
                    opacity: 0.8,
                    shininess: 100
                })
            );
            magnetRing.rotation.x = Math.PI / 2;
            magnetSystem.add(magnetRing);

            // Лазерная сетка
            const gridSize = 8;
            const gridDivisions = 8;
            for(let x = -gridSize/2; x <= gridSize/2; x += gridSize/gridDivisions) {
                for(let z = -gridSize/2; z <= gridSize/2; z += gridSize/gridDivisions) {
                    const laserBeam = new THREE.Mesh(
                        new THREE.BoxGeometry(0.05, 0.05, 0.05),
                        new THREE.MeshPhongMaterial({
                            color: 0x00ffff,
                            emissive: 0x00ffff,
                            emissiveIntensity: 0.8,
                            transparent: true,
                            opacity: 0.6,
                            shininess: 100
                        })
                    );
                    laserBeam.position.set(x, 0, z);
                    magnetSystem.add(laserBeam);
                }
            }

            // Позиционируем магнитную систему ВНУТРЬ от вентилятора (к центру)
            const angle = Math.atan2(position.z, position.x);
            const offset = 12;
            const newX = position.x - Math.cos(angle) * offset;
            const newZ = position.z - Math.sin(angle) * offset;
            magnetSystem.position.set(newX, position.y, newZ);
            magnetSystem.lookAt(position.x, position.y, position.z);
            
            magneticGrids.add(magnetSystem);
        });

        // Анимация
        const animate = () => {
            const time = Date.now() * 0.001;
            magneticGrids.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    if (child.material.opacity) {
                        child.material.opacity = 0.6 + Math.sin(time * 2) * 0.2;
                    }
                    if (child.material.emissiveIntensity) {
                        child.material.emissiveIntensity = 0.5 + Math.sin(time * 3) * 0.3;
                    }
                    child.rotation.y = time * 0.5;
                }
            });
            requestAnimationFrame(animate);
        };
        animate();

        scene.add(magneticGrids);
        this.layers.magneticGrids = magneticGrids;
    }

    createDomeLayer(index, radius) {
        const geometry = new THREE.SphereGeometry(radius, 128, 128, 0, Math.PI * 2, 0, Math.PI / 2);
        const material = new THREE.ShaderMaterial({
            transparent: true,
            uniforms: {
                time: { value: 0 },
                baseColor: { value: new THREE.Color(0x9932CC) },
                pulseColor: { value: new THREE.Color(0xE6E6FA) },
                glowColor: { value: new THREE.Color(0x800080) },
                energyIntensity: { value: 0.6 + (index * 0.1) },
                rotationSpeed: { value: 0.2 - (index * 0.05) }
            },
            vertexShader: `
                varying vec3 vNormal;
                varying vec2 vUv;
                varying vec3 vPosition;
                uniform float time;
                uniform float rotationSpeed;
                
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    vUv = uv;
                    
                    // Добавляем вращение
                    float angle = time * rotationSpeed;
                    mat3 rotationMatrix = mat3(
                        cos(angle), 0.0, sin(angle),
                        0.0, 1.0, 0.0,
                        -sin(angle), 0.0, cos(angle)
                    );
                    
                    // Применяем вращение и добавляем влновой эффект
                    vec3 pos = position;
                    pos = rotationMatrix * pos;
                    
                    // Влновой эффект
                    float wave = sin(pos.y * 4.0 + time * 2.0) * 0.5;
                    pos += normal * wave;
                    
                    vPosition = pos;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec3 baseColor;
                uniform vec3 pulseColor;
                uniform vec3 glowColor;
                uniform float energyIntensity;
                
                varying vec3 vNormal;
                varying vec2 vUv;
                varying vec3 vPosition;
                
                void main() {
                    // Базовая прозрачность с пульсацией
                    float opacity = 0.15 + sin(vUv.y * 20.0 + time) * 0.05;
                    
                    // Энергетические пульсации
                    float pulse = sin(time * 2.0 - length(vPosition) * 0.1) * 0.5 + 0.5;
                    
                    // Улучшенная шестиугольная сетка
                    vec2 hexUv = vUv * vec2(10.0, 20.0);
                    float hexPattern = abs(sin(hexUv.x) + sin(hexUv.y));
                    hexPattern = smoothstep(0.9, 1.0, hexPattern);
                    
                    // Бегущие энергетические линии
                    float energyLine = abs(sin(vUv.y * 50.0 + time * 3.0 + vUv.x * 10.0));
                    energyLine = smoothstep(0.97, 1.0, energyLine) * energyIntensity;
                    
                    // Улучшенное краевое свечение
                    float rimLight = 1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
                    rimLight = pow(rimLight, 3.0);
                    
                    // Динамическое свечение
                    float glow = sin(time * 3.0 + length(vPosition)) * 0.5 + 0.5;
                    
                    // Смешиваем цвета с улученными эффектами
                    vec3 finalColor = mix(baseColor, pulseColor, pulse * 0.3);
                    finalColor = mix(finalColor, glowColor, energyLine);
                    finalColor += glowColor * rimLight * 0.5;
                    finalColor += pulseColor * glow * 0.2;
                    
                    // Добавляем икры
                    float sparkle = fract(sin(dot(vUv, vec2(12.9898, 78.233)) + time) * 43758.5453);
                    finalColor += vec3(1.0, 0.8, 1.0) * step(0.98, sparkle) * energyIntensity;
                    
                    float finalOpacity = (opacity + hexPattern * 0.05 + energyLine * 0.1 + rimLight * 0.05) * 0.7;
                    
                    gl_FragColor = vec4(finalColor, finalOpacity);
                }
            `,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });
        
        const dome = new THREE.Mesh(geometry, material);
        return dome;
    }

    createDome() {
        const domeLayers = [];
        const layerCount = 3;
        
        // Увеличивае базовый радиус и расстояние между слоями
        const baseRadius = 170; // Увеличиваем базовый радиус
        const layerSpacing = 3; // Увеличиваем расстояние мжду слоями
        
        for(let i = 0; i < layerCount; i++) {
            const radius = baseRadius + (i * layerSpacing);
            const layer = this.createDomeLayer(i, radius);
            domeLayers.push(layer);
            scene.add(layer);
        }
        
        return domeLayers;
    }

    createSprayers() {
        const sprayers = new THREE.Group();
        this.sprayParticles = [];

        // Упрощенные материалы
        const metalMaterial = new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load(textureUtils.generateNanoTexture()),
            normalMap: new THREE.TextureLoader().load(textureUtils.generateNormalMap()),
            color: 0x444444,
            metalness: 0.9,
            roughness: 0.3
        });

        const pipeMaterial = new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load(textureUtils.generateNanoTexture()),
            color: 0x666666,
            metalness: 0.8,
            roughness: 0.4,
            emissive: new THREE.Color(0x00ffff),
            emissiveIntensity: 0.2
        });

        const glowMaterial = new THREE.MeshStandardMaterial({
            color: 0x00ffff,
            emissive: 0x00ffff,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.8
        });

        for(let i = 0; i < 24; i++) {
            const angle = (i / 24) * Math.PI * 2;
            const radius = 170;
            
            const sprayerGroup = new THREE.Group();
            
            // Основание (промышленный дизайн)
            const baseGeometry = new THREE.CylinderGeometry(2.5, 3, 4, 8);
            const base = new THREE.Mesh(baseGeometry, metalMaterial);
            
            // Добавляем фланцы к основанию
            const flange = new THREE.Mesh(
                new THREE.CylinderGeometry(3.2, 3.2, 0.5, 8),
                metalMaterial
            );
            flange.position.y = 1.5;
            base.add(flange);

            // Добавляем болты на фланец
            for(let b = 0; b < 8; b++) {
                const boltAngle = (b / 8) * Math.PI * 2;
                const bolt = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.2, 0.2, 0.6, 6),
                    metalMaterial
                );
                bolt.position.set(
                    Math.cos(boltAngle) * 2.8,
                    1.5,
                    Math.sin(boltAngle) * 2.8
                );
                base.add(bolt);
            }
            
            sprayerGroup.add(base);
            
            // Основной ствол с промышленными деталями
            const mainBarrel = new THREE.Mesh(
                new THREE.CylinderGeometry(1.5, 1.8, 12, 8),
                pipeMaterial
            );
            mainBarrel.position.y = 8;
            
            // Охлаждающие ребра
            for(let j = 0; j < 6; j++) {
                const cooling = new THREE.Mesh(
                    new THREE.CylinderGeometry(2, 2, 0.3, 8),
                    metalMaterial
                );
                cooling.position.y = 4 + j * 1.5;
                mainBarrel.add(cooling);
            }
            
            sprayerGroup.add(mainBarrel);

            // Технические кольца с индикаторами
            for(let j = 0; j < 3; j++) {
                const ringGroup = new THREE.Group();
                
                // Основное кольцо
                const ring = new THREE.Mesh(
                    new THREE.TorusGeometry(1.6, 0.2, 16, 32),
                    metalMaterial
                );
                
                // Светящийся индикатор
                const indicator = new THREE.Mesh(
                    new THREE.TorusGeometry(1.6, 0.1, 16, 32),
                    glowMaterial
                );
                indicator.scale.set(0.98, 0.98, 1);
                
                ringGroup.add(ring);
                ringGroup.add(indicator);
                ringGroup.position.y = 6 + j * 3;
                ringGroup.rotation.x = Math.PI / 2;
                sprayerGroup.add(ringGroup);
            }

            // Верхняя часть с форсункой
            const nozzle = new THREE.Mesh(
                new THREE.CylinderGeometry(1.2, 1.5, 2, 8),
                metalMaterial
            );
            nozzle.position.y = 15;
            sprayerGroup.add(nozzle);

            // Система частиц
            const particleSystem = createParticleSystem();
            sprayerGroup.add(particleSystem);
            this.sprayParticles.push(particleSystem);

            // Позиционирование
            sprayerGroup.position.set(
                Math.cos(angle) * radius,
                0,
                Math.sin(angle) * radius
            );

            sprayers.add(sprayerGroup);
        }

        function createParticleSystem() {
            const particleCount = 50;
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const velocities = new Float32Array(particleCount * 3);
            const lifetimes = new Float32Array(particleCount);
            const sizes = new Float32Array(particleCount);

            for(let i = 0; i < particleCount; i++) {
                positions[i * 3] = 0;
                positions[i * 3 + 1] = 14; // Начало из верхней части ствола
                positions[i * 3 + 2] = 0;

                velocities[i * 3] = (Math.random() - 0.5) * 0.05;
                velocities[i * 3 + 1] = 0.6 + Math.random() * 0.2;
                velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05;

                lifetimes[i] = Math.random();
                sizes[i] = 1.5 + Math.random();
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
            geometry.setAttribute('lifetime', new THREE.BufferAttribute(lifetimes, 1));
            geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

            const material = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 },
                    sprayTexture: { value: new THREE.TextureLoader().load(textureUtils.generateSprayTexture()) }
                },
                vertexShader: `
                    uniform float time;
                    attribute vec3 velocity;
                    attribute float lifetime;
                    attribute float size;
                    varying float vAlpha;

                    void main() {
                        float aliveTime = mod(time + lifetime, 1.0);
                        vec3 pos = position + velocity * aliveTime * 50.0;
                        vAlpha = 1.0 - aliveTime;
                        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                        gl_Position = projectionMatrix * mvPosition;
                        gl_PointSize = size * (200.0 / -mvPosition.z) * vAlpha;
                    }
                `,
                fragmentShader: `
                    uniform sampler2D sprayTexture;
                    varying float vAlpha;

                    void main() {
                        vec4 texColor = texture2D(sprayTexture, gl_PointCoord);
                        vec3 color = mix(
                            vec3(0.0, 0.8, 1.0),
                            vec3(0.4, 0.0, 0.8),
                            vAlpha
                        );
                        gl_FragColor = vec4(color, texColor.a * vAlpha * 0.4);
                    }
                `,
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending
            });

            return new THREE.Points(geometry, material);
        }

        const animate = () => {
            const time = Date.now() * 0.001;
            this.sprayParticles.forEach((particles) => {
                if (particles.material.uniforms) {
                    particles.material.uniforms.time.value = time;
                }
            });
            requestAnimationFrame(animate);
        };
        animate();

        scene.add(sprayers);
        this.layers.sprayers = sprayers;
        return sprayers;
    }

    createAntiAirDefense() {
        const turrets = new THREE.Group();
        
        // Соз��аем турели за куполом
        const turretCount = 12;
        const radius = 220; // Увеличиваем радиус, чтобы турели были за куполом
        
        for(let i = 0; i < turretCount; i++) {
            const angle = (i / turretCount) * Math.PI * 2;
            const turret = createTurret(this.materials);
            
            // Позиционируем турель
            turret.position.x = Math.cos(angle) * radius;
            turret.position.z = Math.sin(angle) * radius;
            turret.position.y = 5; // Поднимаем турели немного над землей
            
            // Поворачиваем турели к центру, но не наклоняем их
            turret.rotation.y = angle + Math.PI;
            
            // Убираем наклон турелей
            // turret.rotation.x = -Math.PI / 12; // Удаляем эту строку
            
            // Добавляем данные для анимации
            turret.userData = {
                baseAngle: angle,
                currentAngle: angle + Math.PI,
                targetAngle: angle + Math.PI,
                rotationSpeed: 0.02,
                weaponPodAngle: 0,
                missileStates: Array(6).fill('ready'),
                lastShotTime: 0,
                shotInterval: 2000
            };
            
            turrets.add(turret);
        }
        
        // Анимация турелей
        const animate = () => {
            turrets.children.forEach(turret => {
                const userData = turret.userData;
                
                // Случайное изменение цели с меньшим разбросом
                if (Math.random() < 0.005) {
                    userData.targetAngle = userData.baseAngle + Math.PI + (Math.random() - 0.5) * Math.PI * 0.3;
                }
                
                // Плавный поворот к цели
                const angleDiff = userData.targetAngle - userData.currentAngle;
                if (Math.abs(angleDiff) > 0.01) {
                    userData.currentAngle += Math.sign(angleDiff) * userData.rotationSpeed;
                    turret.rotation.y = userData.currentAngle;
                }
                
                // Анимация оружейных подов
                const weaponPods = turret.getObjectByName('weaponPods');
                if (weaponPods) {
                    userData.weaponPodAngle += 0.02;
                    weaponPods.children.forEach((pod, index) => {
                        const offset = (index / weaponPods.children.length) * Math.PI * 2;
                        pod.rotation.z = Math.sin(userData.weaponPodAngle + offset) * 0.1;
                    });
                }
                
                // Анимация основных пушек с меньшей амплитудой
                const mainGuns = turret.getObjectByName('mainGuns');
                if (mainGuns) {
                    mainGuns.rotation.x = Math.sin(Date.now() * 0.001) * 0.05;
                }
                
                // Анимация ракетных установок
                const topLaunchers = turret.getObjectByName('topMissileLaunchers');
                if (topLaunchers) {
                    topLaunchers.children.forEach(launcher => {
                        if (launcher.name.startsWith('missileCell')) {
                            const now = Date.now();
                            const missileIndex = parseInt(launcher.name.split('_')[2]);
                            
                            // Случайные выстрелы
                            if (userData.missileStates[missileIndex] === 'ready' && 
                                now - userData.lastShotTime > userData.shotInterval && 
                                Math.random() < 0.001) {
                                
                                userData.missileStates[missileIndex] = 'firing';
                                userData.lastShotTime = now;
                                
                                // Анимация запуска
                                const missile = launcher.children.find(child => child instanceof THREE.Group);
                                if (missile) {
                                    const startPos = missile.position.clone();
                                    const endPos = startPos.clone().add(new THREE.Vector3(0, 20, 0));
                                    
                                    // Анимация взлета
                                    new TWEEN.Tween(missile.position)
                                        .to(endPos, 1000)
                                        .easing(TWEEN.Easing.Quadratic.Out)
                                        .onComplete(() => {
                                            missile.position.copy(startPos);
                                            userData.missileStates[missileIndex] = 'ready';
                                        })
                                        .start();
                                }
                            }
                        }
                    });
                }
            });
            
            requestAnimationFrame(animate);
        };
        animate();
        
        scene.add(turrets);
        this.layers.turrets = turrets;
    }

    animate() {
        // ... rest of the code ...
    }
}

// Оовляем настройки существующего освещения для текущего времени суток
if (typeof sceneAmbientLight !== 'undefined') {
    sceneAmbientLight.intensity = 0.6;
}
if (typeof directionalLight !== 'undefined') {
    directionalLight.intensity = 1.5;
}

const bottomLight = new THREE.PointLight(0xff99ff, 0.5);
bottomLight.position.set(0, -50, 0);
scene.add(bottomLight);

const defenseSystem = new DefenseSystem();

// Добавляем атмосферные эффекты после настройки освещеня
// Создаем легкий туман для ощущения глубины
scene.fog = new THREE.FogExp2(0x87CEEB, 0.0015);

// Добавляем солнечные блики на линзах и металлических частях
function addLensFlare() {
    const textureLoader = new THREE.TextureLoader();
    const flareTexture = textureLoader.load('path_to_flare_texture.png');
    
    const flareLight = new THREE.PointLight(0xFFFFFF, 1, 100);
    flareLight.position.copy(sunLight.position);
    scene.add(flareLight);
    
    const flareMaterial = new THREE.SpriteMaterial({
        map: flareTexture,
        color: 0xFFFFFF,
        transparent: true,
        blending: THREE.AdditiveBlending
    });
    
    const flare = new THREE.Sprite(flareMaterial);
    flare.scale.set(10, 10, 1);
    flareLight.add(flare);
}

// обавляем тени от облаков
const cloudShadowLight = new THREE.DirectionalLight(0x000000, 0.2);
cloudShadowLight.position.set(100, 100, 50);
scene.add(cloudShadowLight);

// Добавляем функцию анимации турелей
function animateTurrets(time) {
    if (defenseSystem && defenseSystem.turrets) {
        defenseSystem.turrets.forEach((turret, index) => {
            // Получае компоненты турели
            const base = turret.getObjectByName('baseGroup');
            const gunPivot = turret.getObjectByName('gunPivot');
            const weaponPods = turret.getObjectByName('weaponPods');
            const topLaunchers = turret.getObjectByName('topMissileLaunchers');

            if (base) {
                // Базовая анимация вращения
                base.rotation.y = Math.sin(time * 0.5 + index) * 0.1;
            }

            if (gunPivot) {
                // Анимация пушек
                gunPivot.rotation.x = Math.sin(time * 0.7 + index) * 0.15;
            }

            if (weaponPods) {
                // Анимация оружейных подов
                weaponPods.children.forEach((pod, podIndex) => {
                    pod.rotation.x = Math.sin(time * 0.3 + podIndex + index) * 0.2;
                });
            }

            if (topLaunchers) {
                // Анимция верхних ракетных установок
                topLaunchers.children.forEach(launcher => {
                    if (launcher.name === 'missileCell') {
                        launcher.rotation.y = Math.sin(time * 0.4 + index) * 0.3;
                    }
                });
            }
        });
    }
}

// Modify the main animate function to include all animation logic
let animate = function() {
    requestAnimationFrame(animate);
    const time = performance.now() * 0.001;

    // Keep only the necessary animations
    if (defenseSystem && defenseSystem.domeLayers) {
        defenseSystem.domeLayers.forEach((layer, index) => {
            if (layer.material && layer.material.uniforms) {
                layer.material.uniforms.time.value = time;
                layer.rotation.y = time * (0.1 - index * 0.02);
                layer.position.y = Math.sin(time * 0.5 + index) * 0.5;
            }
        });
    }

    // Keep other necessary animations
    animateTurrets(time);

    if (defenseSystem && defenseSystem.energyParticles && defenseSystem.energyParticles.material) {
        defenseSystem.energyParticles.material.uniforms.time.value = time;
    }

    if (defenseSystem && defenseSystem.floorSystems && defenseSystem.floorSystems.laserGrid) {
        defenseSystem.floorSystems.laserGrid.children.forEach(child => {
            if (child.material && child.material.uniforms) {
                child.material.uniforms.time.value = time;
            }
        });
    }

    if (defenseSystem && defenseSystem.floorSystems) {
        defenseSystem.floorSystems.update(time);
    }

    renderer.render(scene, camera);
};

animate();

// ... rest of the existing code ...
