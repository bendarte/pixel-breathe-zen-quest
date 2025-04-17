
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// 8-bit pixel app theme colors
				pixel: {
					'blue': '#5b6ee1',
					'light-blue': '#9badb7',
					'purple': '#9c7683',
					'light-purple': '#d6bcfa',
					'green': '#6abe30',
					'light-green': '#ace4aa',
					'yellow': '#fbf236',
					'orange': '#df7126',
					'brown': '#8e6f5d',
					'dark': '#171614',
					'gray': '#847e87',
					'light-gray': '#eef1f5',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				'pixel': ['Press Start 2P', 'cursive'],
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'breath-in': {
					'0%': {
						transform: 'scale(1)',
						opacity: '0.7'
					},
					'100%': {
						transform: 'scale(1.5)',
						opacity: '1'
					}
				},
				'breath-out': {
					'0%': {
						transform: 'scale(1.5)',
						opacity: '1'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '0.7'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-5px)'
					}
				},
				'pixel-fade-in': {
					'0%': {
						opacity: '0',
					},
					'20%': {
						opacity: '0.2',
					},
					'40%': {
						opacity: '0.4',
					},
					'60%': {
						opacity: '0.6',
					},
					'80%': {
						opacity: '0.8',
					},
					'100%': {
						opacity: '1',
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'breath-in': 'breath-in 4s ease-in-out',
				'breath-out': 'breath-out 4s ease-in-out',
				'float': 'float 3s ease-in-out infinite',
				'pixel-fade-in': 'pixel-fade-in 0.5s steps(5) forwards'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
