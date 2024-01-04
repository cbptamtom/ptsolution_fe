// Trong file opencomponent.ts
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
			console.log("object")
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

			const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
			const cubeMaterial = new THREE.MeshStandardMaterial({ color: "#6528D7" });
			const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
			cube.position.set(0, 1.5, 0);
			scene.add(cube);
			components.meshes.push(cube);

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

			const mainToolbar = new OBC.Toolbar(components);
			mainToolbar.name = "Main toolbar";
			components.ui.addToolbar(mainToolbar);

			const alertButton = new OBC.Button(components);
			alertButton.materialIcon = "info";
			alertButton.tooltip = "Information";
			mainToolbar.addChild(alertButton);
			alertButton.onClick.add(() => {
				alert("I've been clicked!");
			});

			const cubeTools = new OBC.Button(components);
			cubeTools.materialIcon = "widgets";
			cubeTools.tooltip = "Tools";
			mainToolbar.addChild(cubeTools);

			const createCubeButton = new OBC.Button(components);
			createCubeButton.materialIcon = "add_box";
			createCubeButton.label = "Create box";
			createCubeButton.onClick.add(() => console.log("huuh"));
			cubeTools.addChild(createCubeButton);

			const deleteCubeButtons = new OBC.Button(components);
			deleteCubeButtons.materialIcon = "disabled_by_default";
			deleteCubeButtons.label = "Delete box";
			cubeTools.addChild(deleteCubeButtons);

			const deleteAllCubesButton = new OBC.Button(components);
			deleteAllCubesButton.materialIcon = "disabled_by_default";
			deleteAllCubesButton.label = "All";
			deleteAllCubesButton.onClick.add(() => console.log("haha"));
			deleteCubeButtons.addChild(deleteAllCubesButton);


			const contextDeleteButtons = new OBC.Button(components);
			contextDeleteButtons.materialIcon = 'widgets';
			contextDeleteButtons.label = "Delete";
			const deleteAllCubesContextButton = new OBC.Button(components);
			deleteAllCubesContextButton.materialIcon = "widgets";
			deleteAllCubesContextButton.label = "All cubes";
			deleteAllCubesContextButton.onClick.add(() =>{console.log("hihi")});
			contextDeleteButtons.addChild(deleteAllCubesContextButton);
			components.ui.contextMenu.addChild(contextDeleteButtons);
		}
	}		
};

export default openComponent;
