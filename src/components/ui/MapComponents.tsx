import { onMount } from 'solid-js'

declare global {
	namespace ymaps3 {
		// Здесь можно добавить необходимые типы
		interface YMapOptions {
			location: {
				center: [number, number]
				zoom: number
			}
		}

		class YMap {
			constructor(element: HTMLElement, options: YMapOptions)
			addChild(layer: any): void
		}

		class YMapDefaultSchemeLayer {
			constructor(options?: {})
		}
	}
}

interface MapProps {
	width?: string
	height?: string
	center?: [number, number]
	zoom?: number
}

export const MapComponent = (props: MapProps) => {
	let mapContainer: HTMLDivElement | undefined

	onMount(async () => {
		await new Promise<void>(resolve => {
			if (window.ymaps3) return resolve()

			const checkApi = () => {
				if (window.ymaps3) return resolve()
				setTimeout(checkApi, 100)
			}

			checkApi()
		})

		const map = new ymaps3.YMap(mapContainer!, {
			location: {
				center: props.center || [37.588144, 55.733842],
				zoom: props.zoom || 10,
			},
		})

		map.addChild(new ymaps3.YMapDefaultSchemeLayer({}))
	})

	return (
		<div
			ref={mapContainer}
			style={{
				width: props.width || '600px',
				height: props.height || '400px',
			}}
		/>
	)
}
