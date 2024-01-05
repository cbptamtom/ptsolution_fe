import * as THREE from "three";
import * as OBC from "openbim-components";
import { RefObject } from "react";
import * as dat from "dat.gui";
const openComponent = async (containerRef: RefObject<HTMLDivElement> | null) => {
	if (containerRef && containerRef.current) {
		const container = containerRef.current;
		if (container) {
			const components = new OBC.Components();
			components.scene = new OBC.SimpleScene(components);
			components.renderer = new OBC.SimpleRenderer(components, container);
			components.camera = new OBC.SimpleCamera(components);
			components.raycaster = new OBC.SimpleRaycaster(components);
			console.log("object");
			components.init();
			const scene = components.scene.get();
			// components.camera.controls.setLookAt(10, 10, 10, 0, 0, 0);
			const grid = new OBC.SimpleGrid(components);

			const directionalLight = new THREE.DirectionalLight();
			directionalLight.position.set(5, 10, 3);
			directionalLight.intensity = 0.5;
			scene.add(directionalLight);

			const ambientLight = new THREE.AmbientLight();
			ambientLight.intensity = 0.5;
			scene.add(ambientLight);

			const fragments = new OBC.FragmentManager(components);

			const file = await fetch("../../resources/small.frag");
			const data = await file.arrayBuffer();
			const buffer = new Uint8Array(data);
			const model = await fragments.load(buffer);
			const meshes = [];
			const culler = new OBC.ScreenCuller(components);
			for (const fragment of model.items) {
				meshes.push(fragment.mesh);
				culler.add(fragment.mesh);
			}
			culler.needsUpdate = true;

			const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
			const cubeMaterial = new THREE.MeshStandardMaterial({ color: "#C0EBA5" });
			const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
			cube.position.set(0, 1.5, 0);

			scene.add(cube);
			components.meshes.push(cube);

			const shadows = new OBC.ShadowDropper(components);
			shadows.shadowExtraScaleFactor = 15;
			shadows.darkness = 2;
			shadows.shadowOffset = 0.1;
			shadows.renderShadow([cube], "example");

			const dimensions = new OBC.LengthMeasurement(components);
			dimensions.enabled = true;
			dimensions.snapDistance = 1;
			container.ondblclick = () => dimensions.create();
			window.onkeydown = (event) => {
				if (event.code === "Delete" || event.code === "Backspace") {
					dimensions.delete();
				}
			};

			const mainToolbar = new OBC.Toolbar(components, { name: "Main Toolbar", position: "bottom" });
			mainToolbar.addChild(dimensions.uiElement.get("main"));
			components.ui.addToolbar(mainToolbar);
		}
	}
};

export default openComponent;
