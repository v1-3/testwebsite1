        const canvas = document.getElementById('particle-canvas');
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        class HeartParticle {
            constructor(x, y, isBurst = false) {
                this.x = x || Math.random() * width;
                this.y = y || height + Math.random() * 20;
                this.size = Math.random() * (isBurst ? 18 : 12) + (isBurst ? 8 : 4);
                this.speedY = isBurst ? (Math.random() * -5 - 2) : (Math.random() * -1.2 - 0.3);
                this.speedX = isBurst ? (Math.random() * 6 - 3) : (Math.random() * 1 - 0.5);
                this.opacity = isBurst ? 1 : Math.random() * 0.6 + 0.2;
                this.fadeRate = isBurst ? 0.015 : 0.002;
                this.color = (document.documentElement.dataset.postcardTheme === 'dark') ? '#ff9fbc' : '#b42350';
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.03;
            }
            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.fillStyle = document.documentElement.dataset.postcardTheme === 'dark' ? '#ff9fbc' : this.color;
                ctx.globalAlpha = Math.min(1, Math.max(0, this.opacity));
                ctx.beginPath();
                const top = this.size * 0.3;
                ctx.moveTo(0, top);
                ctx.bezierCurveTo(-this.size / 2, -top, -this.size, this.size / 3, 0, this.size);
                ctx.bezierCurveTo(this.size, this.size / 3, this.size / 2, -top, 0, top);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            }
            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                this.rotation += this.rotationSpeed;
                this.opacity -= this.fadeRate;
                return !(this.opacity <= 0 || this.y < -30);
            }
        }

        let particles = [];
        for (let i = 0; i < 35; i++) particles.push(new HeartParticle());

        function createHeartBurst(x, y, count = 20) {
            for (let i = 0; i < count; i++) particles.push(new HeartParticle(x, y, true));
        }

        function animateParticles() {
            ctx.clearRect(0, 0, width, height);
            if (Math.random() < 0.1 && particles.length < 70) particles.push(new HeartParticle());
            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].draw();
                if (!particles[i].update()) particles.splice(i, 1);
            }
            requestAnimationFrame(animateParticles);
        }
        animateParticles();


