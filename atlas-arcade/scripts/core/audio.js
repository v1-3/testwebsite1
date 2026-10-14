
        // Interactive Web Audio Music & Click Sound Controller
        let audioCtx = null;
        let masterGain = null;
        let isAudioPlaying = false;
        let inactivityTimer = null;
        let activeInterval = null;

        function initAudio() {
            if (audioCtx) return;
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            masterGain = audioCtx.createGain();
            masterGain.gain.setValueAtTime(0.4, audioCtx.currentTime);
            masterGain.connect(audioCtx.destination);
        }

        const chordNotes = [
            [261.63, 329.63, 392.00, 523.25], // C Major
            [220.00, 261.63, 329.63, 440.00], // A Minor
            [174.61, 220.00, 261.63, 349.23], // F Major
            [196.00, 246.94, 293.66, 392.00]  // G Major
        ];
        let noteIndex = 0;

        function playSoftChord() {
            if (!audioCtx || !isAudioPlaying || audioCtx.state !== 'running') return;
            const notes = chordNotes[noteIndex % chordNotes.length];
            noteIndex++;

            notes.forEach((freq, idx) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();

                osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

                gain.gain.setValueAtTime(0, audioCtx.currentTime);
                gain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.8);
                gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3.5);

                osc.connect(gain);
                gain.connect(masterGain);

                osc.start();
                osc.stop(audioCtx.currentTime + 3.5);
            });
        }

        function playClickSound() {
            if (!audioCtx) return;
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
            osc.frequency.exponentialRampToValueAtTime(880.00, audioCtx.currentTime + 0.08); // A5

            gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1);

            osc.connect(gain);
            gain.connect(masterGain);

            osc.start();
            osc.stop(audioCtx.currentTime + 0.1);
        }

        async function startInteractionMusic() {
            initAudio();
            if (audioCtx.state === 'suspended') {
                await audioCtx.resume();
            }

            if (!isAudioPlaying) {
                isAudioPlaying = true;
                document.getElementById('audio-icon').className = "fa-solid fa-volume-high text-rose-400 animate-pulse";
                document.getElementById('audio-text').innerText = "Música ativa por clique";
                playSoftChord();
                activeInterval = setInterval(playSoftChord, 3000);
            }

            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(() => {
                stopInteractionMusic();
            }, 3500);
        }

        function stopInteractionMusic() {
            if (!isAudioPlaying) return;
            isAudioPlaying = false;
            clearInterval(activeInterval);
            document.getElementById('audio-icon').className = "fa-solid fa-volume-xmark text-rose-400";
            document.getElementById('audio-text').innerText = "Clique para tocar";
        }

        window.addEventListener('click', () => {
            const welcome = document.getElementById('welcome-screen');
            if (welcome.style.display === 'none') {
                startInteractionMusic().catch(() => {});
            }
            playClickSound();
        });

