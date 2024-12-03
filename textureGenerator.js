import * as THREE from 'three';

class TextureGenerator {
    static generateNoiseTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');
        
        const imageData = ctx.createImageData(1024, 1024);
        const data = imageData.data;
        
        // Улучшенный шум Перлина с большим количеством октав
        for (let y = 0; y < 1024; y++) {
            for (let x = 0; x < 1024; x++) {
                const i = (y * 1024 + x) * 4;
                let value = 0;
                let scale = 1;
                let amplitude = 1;
                let totalAmplitude = 0;
                
                // Увеличиваем количество октав для большей детализации
                for (let o = 0; o < 8; o++) {
                    value += this.noise(x * scale / 1024, y * scale / 1024) * amplitude;
                    totalAmplitude += amplitude;
                    scale *= 2;
                    amplitude *= 0.5;
                }
                
                // Нормализуем значение
                value = (value / totalAmplitude + 1) * 0.5;
                // Усиливаем контраст
                value = Math.pow(value, 1.5);
                
                const pixelValue = value * 255;
                data[i] = data[i + 1] = data[i + 2] = pixelValue;
                data[i + 3] = 255;
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
        return canvas.toDataURL();
    }

    static generateCloudTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 2048;
        canvas.height = 2048;
        const ctx = canvas.getContext('2d');
        
        // Очищаем канвас
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 2048, 2048);
        
        // Создаем более реалистичную структуру облаков
        for (let layer = 0; layer < 8; layer++) { // Больше слоев
            // Создаем кластеры облаков
            for (let cluster = 0; cluster < 15; cluster++) {
                const centerX = 1024 + (Math.random() - 0.5) * 1600;
                const centerY = 1024 + (Math.random() - 0.5) * 1600;
                
                // Основной градиент для объемности
                const gradient = ctx.createRadialGradient(
                    centerX, centerY, 0,
                    centerX, centerY, 300 + Math.random() * 200
                );
                
                const alpha = (0.15 - layer * 0.02) * (1 - layer / 8);
                gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 1.2})`);
                gradient.addColorStop(0.4, `rgba(255, 255, 255, ${alpha})`);
                gradient.addColorStop(0.7, `rgba(255, 255, 255, ${alpha * 0.5})`);
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(centerX, centerY, 400 + Math.random() * 200, 0, Math.PI * 2);
                ctx.fill();
                
                // Добавляем детали и текстуру
                const detailsCount = 80 - layer * 8;
                for (let i = 0; i < detailsCount; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const distance = Math.random() * 200;
                    const x = centerX + Math.cos(angle) * distance;
                    const y = centerY + Math.sin(angle) * distance;
                    const size = 20 + Math.random() * 80;
                    
                    const detailGradient = ctx.createRadialGradient(
                        x, y, 0,
                        x, y, size
                    );
                    
                    const detailAlpha = (0.1 - layer * 0.01) * Math.random();
                    detailGradient.addColorStop(0, `rgba(255, 255, 255, ${detailAlpha * 1.5})`);
                    detailGradient.addColorStop(0.5, `rgba(255, 255, 255, ${detailAlpha})`);
                    detailGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                    
                    ctx.fillStyle = detailGradient;
                    ctx.beginPath();
                    
                    // Случайная деформация для более естественного вида
                    ctx.moveTo(x + size, y);
                    for (let angle = 0; angle <= Math.PI * 2; angle += Math.PI / 16) {
                        const radius = size * (0.9 + Math.random() * 0.2);
                        const px = x + Math.cos(angle) * radius;
                        const py = y + Math.sin(angle) * radius;
                        ctx.lineTo(px, py);
                    }
                    ctx.closePath();
                    ctx.fill();
                }
            }
            
            // Добавляем тонкие детали
            for (let i = 0; i < 200; i++) {
                const x = Math.random() * 2048;
                const y = Math.random() * 2048;
                const size = 5 + Math.random() * 15;
                
                ctx.fillStyle = `rgba(255, 255, 255, ${0.02 + Math.random() * 0.03})`;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Применяем пост-обработку
        const imageData = ctx.getImageData(0, 0, 2048, 2048);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            // Добавляем шум и улучшаем контраст
            const noise = (Math.random() - 0.5) * 15;
            data[i] += noise;
            data[i + 1] += noise;
            data[i + 2] += noise;
            
            // Усиливаем яркие области
            const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
            if (brightness > 180) {
                const factor = 1.2;
                data[i] = Math.min(255, data[i] * factor);
                data[i + 1] = Math.min(255, data[i + 1] * factor);
                data[i + 2] = Math.min(255, data[i + 2] * factor);
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
        return canvas.toDataURL();
    }

    static generateTechSprayerTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');
        
        // Clear canvas with dark background
        ctx.fillStyle = 'rgb(10, 12, 18)';
        ctx.fillRect(0, 0, 1024, 1024);
        
        // Create tech-inspired particle effect
        for (let layer = 0; layer < 3; layer++) {
            const particleCount = 200 - layer * 30;
            
            for (let i = 0; i < particleCount; i++) {
                const x = Math.random() * 1024;
                const y = Math.random() * 1024;
                const size = 2 + Math.random() * 6;
                
                // Create high-tech particle glow
                const glowGradient = ctx.createRadialGradient(
                    x, y, 0,
                    x, y, size * 3
                );
                
                // Generate tech-inspired colors
                const hue = 180 + Math.random() * 60; // Cyan to blue range
                const mainColor = `hsla(${hue}, 100%, 70%, ${0.7 - layer * 0.2})`;
                const glowColor = `hsla(${hue}, 100%, 50%, ${0.3 - layer * 0.1})`;
                
                glowGradient.addColorStop(0, mainColor);
                glowGradient.addColorStop(0.5, glowColor);
                glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                
                ctx.fillStyle = glowGradient;
                ctx.beginPath();
                ctx.arc(x, y, size * 3, 0, Math.PI * 2);
                ctx.fill();
                
                // Add central bright spot
                ctx.fillStyle = `hsla(${hue}, 100%, 90%, ${0.9 - layer * 0.2})`;
                ctx.beginPath();
                ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Add tech grid pattern
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i < 20; i++) {
            const pos = i * (1024 / 20);
            
            // Horizontal lines
            ctx.beginPath();
            ctx.moveTo(0, pos);
            ctx.lineTo(1024, pos);
            ctx.stroke();
            
            // Vertical lines
            ctx.beginPath();
            ctx.moveTo(pos, 0);
            ctx.lineTo(pos, 1024);
            ctx.stroke();
        }
        
        // Apply post-processing effects
        const imageData = ctx.getImageData(0, 0, 1024, 1024);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            // Add slight noise and enhance contrast
            const noise = (Math.random() - 0.5) * 10;
            data[i] += noise;
            data[i + 1] += noise;
            data[i + 2] += noise;
            
            // Add subtle bloom effect
            const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
            if (brightness > 200) {
                data[i] = Math.min(255, data[i] * 1.2);
                data[i + 1] = Math.min(255, data[i + 1] * 1.2);
                data[i + 2] = Math.min(255, data[i + 2] * 1.2);
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
        return canvas.toDataURL();
    }

    static generateSprayTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.5)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
        
        return canvas.toDataURL();
    }

    // Вспомогательные функции для шума Перлина
    static noise(x, y) {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        x -= Math.floor(x);
        y -= Math.floor(y);
        
        const u = this.fade(x);
        const v = this.fade(y);
        
        const A = this.p[X] + Y;
        const B = this.p[X + 1] + Y;
        
        return this.lerp(v,
            this.lerp(u,
                this.grad(this.p[A], x, y),
                this.grad(this.p[B], x - 1, y)
            ),
            this.lerp(u,
                this.grad(this.p[A + 1], x, y - 1),
                this.grad(this.p[B + 1], x - 1, y - 1)
            )
        );
    }

    static fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    static lerp(t, a, b) {
        return a + t * (b - a);
    }

    static grad(hash, x, y) {
        const h = hash & 15;
        const grad = 1 + (h & 7);
        return ((h & 8) ? -grad : grad) * x + ((h & 4) ? -grad : grad) * y;
    }

    static p = new Array(512);
    static {
        const permutation = new Array(256).fill(0).map((_, i) => i);
        for (let i = 255; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [permutation[i], permutation[j]] = [permutation[j], permutation[i]];
        }
        for (let i = 0; i < 512; i++) {
            this.p[i] = permutation[i & 255];
        }
    }

    static generateGroundTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 2048;
        canvas.height = 2048;
        const ctx = canvas.getContext('2d');
        
        // Базовые цвета земли
        const colors = {
            soil: '#2d5a27',      // Темно-зеленый для растительности
            rock: '#3d3d3d',      // Серый для скал
            grass: '#3d7e35',     // Зеленый для травы
            sand: '#8b7355'       // Песочный цвет
        };
        
        // Заполняем базовым цветом
        ctx.fillStyle = colors.soil;
        ctx.fillRect(0, 0, 2048, 2048);
        
        // Создаем различные слои ландшафта
        for(let layer = 0; layer < 5; layer++) {
            const imageData = ctx.getImageData(0, 0, 2048, 2048);
            const data = imageData.data;
            
            for(let y = 0; y < 2048; y++) {
                for(let x = 0; x < 2048; x++) {
                    const i = (y * 2048 + x) * 4;
                    
                    // Создаем сложный шум для реалистичного ландшафта
                    let noise = 0;
                    let frequency = 1;
                    let amplitude = 1;
                    
                    for(let o = 0; o < 6; o++) {
                        noise += this.noise(x * frequency / 1000, y * frequency / 1000) * amplitude;
                        frequency *= 2;
                        amplitude *= 0.5;
                    }
                    
                    noise = (noise + 1) * 0.5;
                    
                    // Смешиваем различные типы поверхности
                    let color;
                    if(noise < 0.3) {
                        color = this.hexToRgb(colors.soil);
                    } else if(noise < 0.6) {
                        color = this.hexToRgb(colors.grass);
                    } else if(noise < 0.8) {
                        color = this.hexToRgb(colors.rock);
                    } else {
                        color = this.hexToRgb(colors.sand);
                    }
                    
                    // Добавляем вариации цвета
                    const variation = (Math.random() - 0.5) * 20;
                    data[i] = Math.min(255, Math.max(0, color.r + variation));
                    data[i + 1] = Math.min(255, Math.max(0, color.g + variation));
                    data[i + 2] = Math.min(255, Math.max(0, color.b + variation));
                    data[i + 3] = 255;
                }
            }
            
            ctx.putImageData(imageData, 0, 0);
        }
        
        return canvas.toDataURL();
    }

    // Вспомогательный метод для конвертации HEX в RGB
    static hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    static generateNormalMap() {
        const canvas = document.createElement('canvas');
        canvas.width = 2048;
        canvas.height = 2048;
        const ctx = canvas.getContext('2d');
        
        // Создаем карту нормалей
        const imageData = ctx.createImageData(2048, 2048);
        const data = imageData.data;
        
        for(let y = 0; y < 2048; y++) {
            for(let x = 0; x < 2048; x++) {
                const i = (y * 2048 + x) * 4;
                
                // Создаем нрмали на основе шума Перлина
                const nx = this.noise(x/100, y/100) * 2 - 1;
                const ny = this.noise((x+100)/100, (y+100)/100) * 2 - 1;
                const nz = 1.0;
                
                // Нормализуем вектор
                const length = Math.sqrt(nx*nx + ny*ny + nz*nz);
                
                // Преобразуем нормали в цвета (r,g,b)
                data[i] = ((nx / length) * 0.5 + 0.5) * 255;
                data[i+1] = ((ny / length) * 0.5 + 0.5) * 255;
                data[i+2] = ((nz / length) * 0.5 + 0.5) * 255;
                data[i+3] = 255;
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
        return canvas.toDataURL();
    }

    static generateRoughnessMap() {
        const canvas = document.createElement('canvas');
        canvas.width = 2048;
        canvas.height = 2048;
        const ctx = canvas.getContext('2d');
        
        // Создаем карту неровностей
        const imageData = ctx.createImageData(2048, 2048);
        const data = imageData.data;
        
        for(let y = 0; y < 2048; y++) {
            for(let x = 0; x < 2048; x++) {
                const i = (y * 2048 + x) * 4;
                
                // Используем несколько октав шума для создания более интересной текстуры
                let value = 0;
                let amplitude = 1.0;
                let frequency = 1.0;
                
                for(let o = 0; o < 4; o++) {
                    value += this.noise(x * frequency / 200, y * frequency / 200) * amplitude;
                    amplitude *= 0.5;
                    frequency *= 2.0;
                }
                
                // Нормализуем значение
                value = (value + 1) * 0.5;
                const pixelValue = value * 255;
                
                data[i] = pixelValue;
                data[i+1] = pixelValue;
                data[i+2] = pixelValue;
                data[i+3] = 255;
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
        return canvas.toDataURL();
    }

    static generateHyperFanTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        
        // Создаем технологичный фон
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, 512, 512);
        
        // Добавляем технологичные линии
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 2;
        
        // Создаем круговые линии
        for(let i = 0; i < 5; i++) {
            const radius = 100 + i * 30;
            ctx.beginPath();
            ctx.arc(256, 256, radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.3 - i * 0.05})`;
            ctx.stroke();
        }
        
        // Добавляем радиальные линии
        for(let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            ctx.beginPath();
            ctx.moveTo(256, 256);
            const x = 256 + Math.cos(angle) * 240;
            const y = 256 + Math.sin(angle) * 240;
            ctx.lineTo(x, y);
            ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';
            ctx.stroke();
        }
        
        // Добавляем технологичные детали
        for(let i = 0; i < 36; i++) {
            const angle = (i / 36) * Math.PI * 2;
            const radius = 200;
            const x = 256 + Math.cos(angle) * radius;
            const y = 256 + Math.sin(angle) * radius;
            
            ctx.fillStyle = 'rgba(0, 255, 255, 0.15)';
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
        }
        
        return canvas.toDataURL();
    }

    static generateNanoTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Создаем фон с нано-паттерном
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, 512, 512);

        // Добавляем сетку нано-частиц
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 0.5;
        for(let i = 0; i < 50; i++) {
            for(let j = 0; j < 50; j++) {
                const x = i * 10 + Math.random() * 5;
                const y = j * 10 + Math.random() * 5;
                ctx.beginPath();
                ctx.arc(x, y, 1, 0, Math.PI * 2);
                ctx.stroke();
                
                // Соединяющие линии
                if(Math.random() < 0.3) {
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + 10, y + 10);
                    ctx.stroke();
                }
            }
        }

        return canvas.toDataURL();
    }

    static generateMissileTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        // Основной цвет ракеты
        const gradient = ctx.createLinearGradient(0, 0, 256, 256);
        gradient.addColorStop(0, '#2a2a2a');
        gradient.addColorStop(0.5, '#3a3a3a');
        gradient.addColorStop(1, '#2a2a2a');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);

        // Технологические линии
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 2;
        for(let i = 0; i < 10; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * 25);
            ctx.lineTo(256, i * 25);
            ctx.stroke();
        }

        // Предупреждающие знаки
        ctx.fillStyle = '#ff0000';
        ctx.font = '20px Arial';
        ctx.fillText('DANGER', 100, 128);

        return canvas.toDataURL();
    }
}

export default TextureGenerator;