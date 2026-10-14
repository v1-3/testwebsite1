
        if (window.tailwind) tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        velvet: '#120710',
                        roseGold: '#E8B4B8',
                        deepRose: '#881337',
                        softPink: '#FCE7F3',
                    },
                    fontFamily: {
                        romantic: ['"Great Vibes"', 'cursive'],
                        serifHeader: ['"Playfair Display"', 'serif'],
                        sansBody: ['"Montserrat"', 'sans-serif'],
                    },
                    animation: {
                        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        'float': 'float 6s ease-in-out infinite',
                        'glow': 'glow 3s infinite alternate',
                    },
                    keyframes: {
                        float: {
                            '0%, 100%': { transform: 'translateY(0px)' },
                            '50%': { transform: 'translateY(-15px)' },
                        },
                        glow: {
                            '0%': { filter: 'drop-shadow(0 0 10px rgba(232, 180, 184, 0.4))' },
                            '100%': { filter: 'drop-shadow(0 0 25px rgba(225, 29, 72, 0.8))' },
                        }
                    }
                }
            }
        }
    