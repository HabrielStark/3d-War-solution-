import * as THREE from 'three';

export const textureUtils = {
    generateHexagonTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        const size = 32;
        const h = size * Math.sqrt(3);
        
        for(let row = 0; row < canvas.height / h + 1; row++) {
            for(let col = 0; col < canvas.width / (size * 3) + 1; col++) {
                const x = col * size * 3;
                const y = row * h;
                const offset = row % 2 ? size * 1.5 : 0;
                
                ctx.beginPath();
                for(let i = 0; i < 6; i++) {
                    const angle = i * Math.PI / 3;
                    const px = x + offset + size * Math.cos(angle);
                    const py = y + size * Math.sin(angle);
                    if(i === 0) ctx.moveTo(px, py);
                    else ctx.lineTo(px, py);
                }
                ctx.closePath();
                ctx.stroke();
            }
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        return texture;
    },

    generateNoiseTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        
        for(let x = 0; x < canvas.width; x++) {
            for(let y = 0; y < canvas.height; y++) {
                const value = Math.random();
                ctx.fillStyle = `rgba(255, 255, 255, ${value})`;
                ctx.fillRect(x, y, 1, 1);
            }
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        return texture;
    },

    generateCloudTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        
        for(let x = 0; x < canvas.width; x++) {
            for(let y = 0; y < canvas.height; y++) {
                const value = Math.random() * 0.5 + 0.5;
                ctx.fillStyle = `rgba(255, 255, 255, ${value})`;
                ctx.fillRect(x, y, 1, 1);
            }
        }
        
        ctx.filter = 'blur(8px)';
        ctx.drawImage(canvas, 0, 0);
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        return texture;
    },

    generateParticleTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        
        const gradient = ctx.createRadialGradient(
            canvas.width/2, canvas.height/2, 0,
            canvas.width/2, canvas.height/2, canvas.width/2
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.5, 'rgba(128, 128, 255, 0.5)');
        gradient.addColorStop(1, 'rgba(0, 0, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    },

    generateSprayTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        
        const gradient = ctx.createRadialGradient(
            canvas.width/2, canvas.height/2, 0,
            canvas.width/2, canvas.height/2, canvas.width/2
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.2, 'rgba(200, 200, 255, 0.6)');
        gradient.addColorStop(1, 'rgba(0, 0, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    },

    generateTechTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        
        const gridSize = 32;
        for(let x = 0; x < canvas.width; x += gridSize) {
            for(let y = 0; y < canvas.height; y += gridSize) {
                if(Math.random() < 0.7) {
                    ctx.strokeRect(x, y, gridSize, gridSize);
                }
                if(Math.random() < 0.3) {
                    ctx.beginPath();
                    ctx.arc(x + gridSize/2, y + gridSize/2, gridSize/4, 0, Math.PI * 2);
                    ctx.stroke();
                }
            }
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        return texture;
    },

    generateNormalMap() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        
        for(let x = 0; x < canvas.width; x++) {
            for(let y = 0; y < canvas.height; y++) {
                const nx = (Math.random() * 2 - 1) * 0.5 + 0.5;
                const ny = (Math.random() * 2 - 1) * 0.5 + 0.5;
                const nz = Math.random() * 0.5 + 0.5;
                ctx.fillStyle = `rgb(${nx * 255}, ${ny * 255}, ${nz * 255})`;
                ctx.fillRect(x, y, 1, 1);
            }
        }
        
        ctx.filter = 'blur(2px)';
        ctx.drawImage(canvas, 0, 0);
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        return texture;
    },

    generateGroundTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');
        
        // Base ground color
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add noise pattern
        for(let x = 0; x < canvas.width; x++) {
            for(let y = 0; y < canvas.height; y++) {
                const noise = Math.random() * 0.15;
                const color = Math.floor(26 + noise * 50);
                ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
                ctx.fillRect(x, y, 1, 1);
            }
        }
        
        // Add tech grid pattern
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        
        // Large grid
        const gridSize = 64;
        for(let x = 0; x < canvas.width; x += gridSize) {
            for(let y = 0; y < canvas.height; y += gridSize) {
                if(Math.random() < 0.7) {
                    ctx.strokeRect(x, y, gridSize, gridSize);
                }
            }
        }
        
        // Small details
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.15)';
        for(let i = 0; i < 1000; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 4 + 2;
            
            if(Math.random() < 0.5) {
                ctx.strokeRect(x, y, size, size);
            } else {
                ctx.beginPath();
                ctx.arc(x, y, size/2, 0, Math.PI * 2);
                ctx.stroke();
            }
        }
        
        // Add some glowing points
        ctx.fillStyle = 'rgba(0, 255, 255, 0.2)';
        for(let i = 0; i < 200; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 3 + 1;
            
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Add some "energy lines"
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
        for(let i = 0; i < 50; i++) {
            const x1 = Math.random() * canvas.width;
            const y1 = Math.random() * canvas.height;
            const x2 = x1 + (Math.random() - 0.5) * 200;
            const y2 = y1 + (Math.random() - 0.5) * 200;
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(4, 4);
        
        return texture;
    },

    generateGroundNormalMap() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');
        
        for(let x = 0; x < canvas.width; x++) {
            for(let y = 0; y < canvas.height; y++) {
                const height = Math.random() * 0.1;
                const nx = 0.5 + (Math.random() - 0.5) * 0.2;
                const ny = 0.5 + (Math.random() - 0.5) * 0.2;
                const nz = 1.0 - height;
                
                ctx.fillStyle = `rgb(${nx * 255}, ${ny * 255}, ${nz * 255})`;
                ctx.fillRect(x, y, 1, 1);
            }
        }
        
        ctx.filter = 'blur(2px)';
        ctx.drawImage(canvas, 0, 0);
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(4, 4);
        
        return texture;
    },

    generateGroundRoughnessMap() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');
        
        for(let x = 0; x < canvas.width; x++) {
            for(let y = 0; y < canvas.height; y++) {
                const roughness = 0.7 + Math.random() * 0.3;
                const value = Math.floor(roughness * 255);
                ctx.fillStyle = `rgb(${value}, ${value}, ${value})`;
                ctx.fillRect(x, y, 1, 1);
            }
        }
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        for(let i = 0; i < 100; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 50 + 20;
            
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(4, 4);
        
        return texture;
    },

    generateNanoTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        
        // Base dark background
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add circuit pattern
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Grid lines
        const gridSize = 32;
        for(let x = 0; x < canvas.width; x += gridSize) {
            for(let y = 0; y < canvas.height; y += gridSize) {
                if(Math.random() < 0.8) {
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + gridSize, y);
                    ctx.stroke();
                    
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x, y + gridSize);
                    ctx.stroke();
                }
            }
        }
        
        // Add small circuit elements
        ctx.fillStyle = 'rgba(0, 255, 255, 0.4)';
        for(let i = 0; i < 200; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 4 + 2;
            
            if(Math.random() < 0.5) {
                // Squares for chips
                ctx.fillRect(x, y, size, size);
            } else {
                // Circles for connection points
                ctx.beginPath();
                ctx.arc(x, y, size/2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Add glowing lines
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
        for(let i = 0; i < 50; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const length = Math.random() * 30 + 10;
            const angle = Math.random() * Math.PI * 2;
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(
                x + Math.cos(angle) * length,
                y + Math.sin(angle) * length
            );
            ctx.stroke();
        }
        
        // Add energy points
        ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
        for(let i = 0; i < 100; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 2 + 1;
            
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Add some horizontal data streams
        for(let y = 0; y < canvas.height; y += 64) {
            if(Math.random() < 0.3) {
                ctx.fillStyle = 'rgba(0, 255, 255, 0.1)';
                ctx.fillRect(0, y, canvas.width, 2);
                
                // Add "data packets"
                ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
                for(let x = 0; x < canvas.width; x += Math.random() * 30 + 20) {
                    ctx.fillRect(x, y, 4, 2);
                }
            }
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 2);
        
        return texture;
    },

    generateMissileTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        
        // Base metallic color
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add metallic noise
        for(let x = 0; x < canvas.width; x++) {
            for(let y = 0; y < canvas.height; y++) {
                const noise = Math.random() * 0.1;
                const value = Math.floor(42 + noise * 40);
                ctx.fillStyle = `rgb(${value}, ${value}, ${value})`;
                ctx.fillRect(x, y, 1, 1);
            }
        }
        
        // Warning stripes
        ctx.fillStyle = 'rgba(255, 255, 0, 0.7)';
        const stripeHeight = 32;
        for(let y = 0; y < canvas.height; y += stripeHeight * 2) {
            ctx.fillRect(0, y, canvas.width, stripeHeight);
            
            // Add wear effect to stripes
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            for(let i = 0; i < 100; i++) {
                const x = Math.random() * canvas.width;
                const h = Math.random() * 5 + 2;
                ctx.fillRect(x, y, 2, h);
            }
            ctx.fillStyle = 'rgba(255, 255, 0, 0.7)';
        }
        
        // Add technical markings
        ctx.font = '16px monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.textAlign = 'center';
        
        // Serial numbers and warning text
        for(let y = 16; y < canvas.height; y += 128) {
            ctx.fillText(`MK-${Math.floor(Math.random() * 999)}-A`, canvas.width/2, y);
            ctx.fillText('CAUTION - HIGH EXPLOSIVE', canvas.width/2, y + 32);
        }
        
        // Technical details and grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Add technical grid
        const gridSize = 64;
        for(let x = 0; x < canvas.width; x += gridSize) {
            for(let y = 0; y < canvas.height; y += gridSize) {
                if(Math.random() < 0.7) {
                    ctx.strokeRect(x, y, gridSize, gridSize);
                    
                    // Add tech details inside grid
                    if(Math.random() < 0.5) {
                        ctx.beginPath();
                        ctx.arc(x + gridSize/2, y + gridSize/2, gridSize/4, 0, Math.PI * 2);
                        ctx.stroke();
                    }
                }
            }
        }
        
        // Add wear and tear
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        for(let i = 0; i < 200; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 4 + 2;
            ctx.fillRect(x, y, size, size);
        }
        
        // Add scratches
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        for(let i = 0; i < 50; i++) {
            const x1 = Math.random() * canvas.width;
            const y1 = Math.random() * canvas.height;
            const length = Math.random() * 30 + 10;
            const angle = Math.random() * Math.PI * 2;
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(
                x1 + Math.cos(angle) * length,
                y1 + Math.sin(angle) * length
            );
            ctx.stroke();
        }
        
        // Add glowing indicators
        ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
        for(let i = 0; i < 20; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 4 + 2;
            
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
            
            // Add glow effect
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
            gradient.addColorStop(0, 'rgba(255, 0, 0, 0.3)');
            gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, size * 2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Create final texture
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        
        return texture;
    },

    generateEnvMap() {
        const size = 512;
        const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(size, {
            format: THREE.RGBAFormat,
            generateMipmaps: true,
            minFilter: THREE.LinearMipmapLinearFilter
        });
        
        // Create temporary scene for environment map
        const scene = new THREE.Scene();
        
        // Create camera for rendering cubemap
        const camera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget);
        
        // Create environment
        const envGeometry = new THREE.SphereGeometry(100, 32, 32);
        
        // Create gradient texture for environment
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');
        
        // Create space-like gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#000033');    // Dark blue at top
        gradient.addColorStop(0.5, '#000066');  // Medium blue in middle
        gradient.addColorStop(1, '#000044');    // Slightly lighter at bottom
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add stars
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        for(let i = 0; i < 1000; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 2 + 0.5;
            
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
            
            // Add glow to some stars
            if(Math.random() < 0.3) {
                const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
                glow.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
                glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.arc(x, y, size * 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            }
        }
        
        // Add some nebula-like effects
        for(let i = 0; i < 20; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = Math.random() * 100 + 50;
            
            const nebulaGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
            const hue = Math.random() * 60 + 200; // Blue to purple range
            nebulaGradient.addColorStop(0, `hsla(${hue}, 100%, 50%, 0.1)`);
            nebulaGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.fillStyle = nebulaGradient;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Add some energy streams
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
        ctx.lineWidth = 2;
        for(let i = 0; i < 30; i++) {
            const x1 = Math.random() * canvas.width;
            const y1 = Math.random() * canvas.height;
            const length = Math.random() * 200 + 100;
            const angle = Math.random() * Math.PI * 2;
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(
                x1 + Math.cos(angle) * length,
                y1 + Math.sin(angle) * length
            );
            ctx.stroke();
        }
        
        // Create texture from canvas
        const texture = new THREE.CanvasTexture(canvas);
        texture.mapping = THREE.EquirectangularReflectionMapping;
        
        // Create material with the texture
        const envMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.BackSide
        });
        
        // Create environment sphere
        const envMesh = new THREE.Mesh(envGeometry, envMaterial);
        scene.add(envMesh);
        
        // Create temporary renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(size, size);
        
        // Render cubemap
        camera.update(renderer, scene);
        
        // Clean up
        renderer.dispose();
        scene.remove(envMesh);
        envGeometry.dispose();
        envMaterial.dispose();
        texture.dispose();
        
        return cubeRenderTarget.texture;
    },

    generateMetalTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const context = canvas.getContext('2d');

        // Создаем металлический фон
        const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#666666');
        gradient.addColorStop(0.5, '#888888');
        gradient.addColorStop(1, '#666666');
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Добавляем царапины
        for (let i = 0; i < 50; i++) {
            context.beginPath();
            context.strokeStyle = `rgba(100, 100, 100, ${Math.random() * 0.2})`;
            context.lineWidth = Math.random() * 2;
            const x1 = Math.random() * canvas.width;
            const y1 = Math.random() * canvas.height;
            const length = 20 + Math.random() * 40;
            const angle = Math.random() * Math.PI * 2;
            context.moveTo(x1, y1);
            context.lineTo(
                x1 + Math.cos(angle) * length,
                y1 + Math.sin(angle) * length
            );
            context.stroke();
        }

        // Добавляем мелкие детали
        for (let i = 0; i < 1000; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 2;
            context.fillStyle = `rgba(${
                150 + Math.random() * 50
            }, ${
                150 + Math.random() * 50
            }, ${
                150 + Math.random() * 50
            }, ${
                Math.random() * 0.3
            })`;
            context.fillRect(x, y, size, size);
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 2);
        
        return texture;
    }
}; 