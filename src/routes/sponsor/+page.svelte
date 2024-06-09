<script lang="ts">
	import Particles, { particlesInit } from '@tsparticles/svelte';
	import { loadSlim } from '@tsparticles/slim'; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
	import Icon from '@iconify/svelte';
	import ClickToCopy from '$lib/components/ClickToCopy.svelte';

	void particlesInit(async (engine) => {
		// call this once per app
		// you can use main to customize the tsParticles instance adding presets or custom shapes
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		//await loadFull(engine);
		await loadSlim(engine);
	});

	let particlesConfig = {
		autoPlay: true,

		clear: true,
		defaultThemes: {},
		delay: 0,
		detectRetina: true,
		duration: 0,
		fpsLimit: 1000,
		interactivity: {
			detectsOn: 'window',
			events: {
				onDiv: {
					selectors: [],
					enable: false,
					mode: [],
					type: 'circle'
				},
				resize: {
					delay: 0.5,
					enable: true
				}
			},
			modes: {
				trail: {
					delay: 1,
					pauseOnStop: false,
					quantity: 1
				},
				attract: {
					distance: 200,
					duration: 0.4,
					easing: 'ease-out-quad',
					factor: 1,
					maxSpeed: 50,
					speed: 1
				},
				bounce: {
					distance: 200
				},
				bubble: {
					distance: 400,
					duration: 2,
					mix: false,
					opacity: 0.8,
					size: 40,
					divs: {
						distance: 200,
						duration: 0.4,
						mix: false,
						selectors: []
					}
				},
				connect: {
					distance: 80,
					links: {
						opacity: 0.5
					},
					radius: 60
				},
				grab: {
					distance: 400,
					links: {
						blink: false,
						consent: false,
						opacity: 1
					}
				},
				push: {
					default: true,
					groups: [],
					quantity: 4
				},
				remove: {
					quantity: 2
				},
				repulse: {
					distance: 200,
					duration: 0.4,
					factor: 100,
					speed: 1,
					maxSpeed: 50,
					easing: 'ease-out-quad',
					divs: {
						distance: 200,
						duration: 0.4,
						factor: 100,
						speed: 1,
						maxSpeed: 50,
						easing: 'ease-out-quad',
						selectors: []
					}
				},
				slow: {
					factor: 3,
					radius: 200
				},
				light: {
					area: {
						gradient: {
							start: {
								value: '#ffffff'
							},
							stop: {
								value: '#000000'
							}
						},
						radius: 1000
					},
					shadow: {
						color: {
							value: '#000000'
						},
						length: 2000
					}
				}
			}
		},
		manualParticles: [],
		particles: {
			bounce: {
				horizontal: {
					value: 1
				},
				vertical: {
					value: 1
				}
			},
			collisions: {
				absorb: {
					speed: 2
				},
				bounce: {
					horizontal: {
						value: 1
					},
					vertical: {
						value: 1
					}
				},
				enable: false,
				maxSpeed: 50,
				mode: 'bounce',
				overlap: {
					enable: true,
					retries: 0
				}
			},
			color: {
				value: '#ffffff',
				animation: {
					h: {
						count: 0,
						enable: false,
						speed: 1,
						decay: 0,
						delay: 0,
						sync: true,
						offset: 0
					},
					s: {
						count: 0,
						enable: false,
						speed: 1,
						decay: 0,
						delay: 0,
						sync: true,
						offset: 0
					},
					l: {
						count: 0,
						enable: false,
						speed: 1,
						decay: 0,
						delay: 0,
						sync: true,
						offset: 0
					}
				}
			},
			effect: {
				close: true,
				fill: true,
				options: {},
				type: []
			},
			groups: {},
			move: {
				angle: {
					offset: 0,
					value: 90
				},
				attract: {
					distance: 200,
					enable: false,
					rotate: {
						x: 3000,
						y: 3000
					}
				},
				center: {
					x: 50,
					y: 50,
					mode: 'percent',
					radius: 0
				},
				decay: 0,
				distance: {},
				direction: 'none',
				drift: 0,
				enable: true,
				gravity: {
					acceleration: 9.81,
					enable: false,
					inverse: false,
					maxSpeed: 50
				},
				path: {
					clamp: true,
					delay: {
						value: 0
					},
					enable: false,
					options: {}
				},
				outModes: {
					default: 'out',
					bottom: 'out',
					left: 'out',
					right: 'out',
					top: 'out'
				},
				random: false,
				size: false,
				speed: 2,
				spin: {
					acceleration: 0,
					enable: false
				},
				straight: false,
				trail: {
					enable: false,
					length: 10,
					fill: {}
				},
				vibrate: false,
				warp: false
			},
			number: {
				density: {
					enable: true,
					width: 1920,
					height: 1080
				},
				limit: {
					mode: 'delete',
					value: 0
				},
				value: 100
			},
			opacity: {
				value: {
					min: 0.1,
					max: 0.5
				},
				animation: {
					count: 0,
					enable: true,
					speed: 3,
					decay: 0,
					delay: 0,
					sync: false,
					mode: 'auto',
					startValue: 'random',
					destroy: 'none'
				}
			},
			reduceDuplicates: false,
			shadow: {
				blur: 0,
				color: {
					value: '#000'
				},
				enable: false,
				offset: {
					x: 0,
					y: 0
				}
			},
			shape: {
				close: true,
				fill: true,
				options: {},
				type: 'circle'
			},
			size: {
				value: {
					min: 1,
					max: 10
				},
				animation: {
					count: 0,
					enable: true,
					speed: 20,
					decay: 0,
					delay: 0,
					sync: false,
					mode: 'auto',
					startValue: 'random',
					destroy: 'none'
				}
			},
			stroke: {
				width: 0
			},
			zIndex: {
				value: 0,
				opacityRate: 1,
				sizeRate: 1,
				velocityRate: 1
			},
			destroy: {
				bounds: {},
				mode: 'none',
				split: {
					count: 1,
					factor: {
						value: 3
					},
					rate: {
						value: {
							min: 4,
							max: 9
						}
					},
					sizeOffset: true,
					particles: {}
				}
			},
			roll: {
				darken: {
					enable: false,
					value: 0
				},
				enable: false,
				enlighten: {
					enable: false,
					value: 0
				},
				mode: 'vertical',
				speed: 25
			},
			tilt: {
				value: 0,
				animation: {
					enable: false,
					speed: 0,
					decay: 0,
					sync: false
				},
				direction: 'clockwise',
				enable: false
			},
			twinkle: {
				lines: {
					enable: false,
					frequency: 0.05,
					opacity: 1
				},
				particles: {
					enable: false,
					frequency: 0.05,
					opacity: 1
				}
			},
			wobble: {
				distance: 5,
				enable: false,
				speed: {
					angle: 50,
					move: 10
				}
			},
			life: {
				count: 0,
				delay: {
					value: 0,
					sync: false
				},
				duration: {
					value: 0,
					sync: false
				}
			},
			rotate: {
				value: 0,
				animation: {
					enable: false,
					speed: 0,
					decay: 0,
					sync: false
				},
				direction: 'clockwise',
				path: false
			},
			orbit: {
				animation: {
					count: 0,
					enable: false,
					speed: 1,
					decay: 0,
					delay: 0,
					sync: false
				},
				enable: false,
				opacity: 1,
				rotation: {
					value: 45
				},
				width: 1
			},
			links: {
				blink: false,
				color: {
					value: '#ffffff'
				},
				consent: false,
				distance: 150,
				enable: true,
				frequency: 1,
				opacity: 0.4,
				shadow: {
					blur: 5,
					color: {
						value: '#000'
					},
					enable: false
				},
				triangles: {
					enable: false,
					frequency: 1
				},
				width: 1,
				warp: false
			},
			repulse: {
				value: 0,
				enabled: false,
				distance: 1,
				duration: 1,
				factor: 1,
				speed: 1
			}
		},
		pauseOnBlur: true,
		pauseOnOutsideViewport: true,
		responsive: [],
		smooth: true,
		style: {},
		themes: [],
		zLayers: 100,
		name: 'Parallax',
		motion: {
			disable: false,
			reduce: {
				factor: 40,
				value: true
			}
		},
		fullScreen: {
			enable: false,
			zIndex: -1
		}
	} as any;
</script>

<div class="relative -mt-4 w-full overflow-hidden bg-pink-600 py-20">
	<Particles
		id="tsparticles"
		class="pointer-events-none absolute h-full w-full overflow-hidden"
		options={particlesConfig}
	/>

	<h1 class="text-center text-4xl font-black text-white">Sponsor</h1>
	<p class="mt-4 text-center text-2xl text-white">Support the development of Tronic247</p>
</div>

<div class="container mx-auto my-8 grid gap-8 lg:grid-cols-2">
	<div class="col-span-1">
		<h1 class="mb-4 text-lg font-semibold">Why Sponsor?</h1>

		<p class="text-lg">
			Sponsorship is a way to support the development of Tronic247. As it run by a student, it is
			hard to maintain the server and domain costs.
		</p>

		<h1 class="mb-4 mt-8 text-lg font-semibold">What to expect?</h1>

		<p class="text-lg">
			By sponsoring, you will get a chance to advertise your product or service on Tronic247 and its
			other products, have a special article about your product or service, and more benefits.
		</p>
	</div>

	<div class="col-span-1 flex flex-col gap-10 rounded-lg bg-pink-100 p-8">
		<div>
			<h1 class="mb-4 text-lg font-semibold text-pink-600">Via Crypto</h1>

			<p class="text-lg">The easiest way to sponsor is via crypto. You can sponsor via:</p>

			<ul class="mt-4 w-max space-y-4">
				<li class="flex items-center justify-start text-lg">
					<Icon icon="ri:eth-fill" class="mr-2 size-6" /> ETH
					<ClickToCopy val="0x9486DD60CE06C694aeb36208FD8b8a33225614Af" class="ml-4" />
				</li>

				<li class="flex items-center justify-start text-lg">
					<Icon icon="formkit:solana" class="mr-2 size-6" /> SOL
					<ClickToCopy val="HWFvo1CCgeVwae3E7NvWfpH89mmzReRboKMfqzBWawpa" class="ml-4" />
				</li>
			</ul>
		</div>

		<div>
			<h1 class="mb-4 text-lg font-semibold text-pink-600">Via GitHub Sponsors</h1>

			<p class="text-lg">Sponsor via GitHub Sponsors by clicking the button below:</p>

			<a href="https://github.com/sponsors/Posandu/" target="_blank" class="btn mt-4 inline-block">
				Sponsor on GitHub
			</a>
		</div>
	</div>
</div>

<style>
	:global(#tsparticles) {
		position: absolute !important;
		inset: 0 !important;
		right: 0;
		padding: 0;
		margin: 0;
		z-index: 0; /* if you use -1 you have to set to `"window"` the interactivity.detectsOn property */
	}
</style>
