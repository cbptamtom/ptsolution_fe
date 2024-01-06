import * as THREE from "three";
import * as OBC from "openbim-components";
import { RefObject } from "react";
import * as path from "path";
import * as WEBIFC from "web-ifc";

const openComponent = async (containerRef: RefObject<HTMLDivElement> | null) => {
	if (containerRef && containerRef.current) {
		const container = containerRef.current;
		if (container) {
			const components = new OBC.Components();
			components.scene = new OBC.SimpleScene(components);
			components.renderer = new OBC.SimpleRenderer(components, container);
			components.camera = new OBC.SimpleCamera(components);
			components.raycaster = new OBC.SimpleRaycaster(components);
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

			let fragments = new OBC.FragmentManager(components);
			let fragmentIfcLoader = new OBC.FragmentIfcLoader(components);

			const toolbar = new OBC.Toolbar(components);
			components.ui.addToolbar(toolbar);
			toolbar.addChild(fragments.uiElement.get("main"));

			const loadFragments = async () => {
				if (fragments.groups.length) return;
				// const file = await fetch("./../../resources/small.frag");
				const file = await fetch("small.frag");
				console.log(file);
				const data = await file.arrayBuffer();
				const buffer = new Uint8Array(data);
				fragments.load(buffer);
				// const scene = components.scene.get();
				// scene.add(model);
			};
			const loadButton = new OBC.Button(components);
			loadButton.materialIcon = "upload model";
			toolbar.addChild(loadButton);
			loadButton.onClick.add(async () => {
				console.log("load Fragment");
				await loadFragments();
			});

			const exportFragments = () => {
				if (!fragments.groups.length) return;
				const group = fragments.groups[0];
				const data = fragments.export(group);
				const blob = new Blob([data]);
				const file = new File([blob], "small.frag");
				download(file);
			};

			const download = (file: any) => {
				const link = document.createElement("a");
				link.href = URL.createObjectURL(file);
				link.download = file.name;
				document.body.appendChild(link);
				link.click();
				link.remove();
			};
			const exportButton = new OBC.Button(components);
			exportButton.materialIcon = "download model";
			toolbar.addChild(exportButton);
			exportButton.onClick.add(() => exportFragments());

			const disposeFragments = () => {
				fragments.dispose();
			};
			const disposeButton = new OBC.Button(components);
			disposeButton.materialIcon = "delete";
			toolbar.addChild(disposeButton);
			disposeButton.onClick.add(() => disposeFragments());

			const importExternalFragment = () => {
				if (fragments.groups.length) return;
				const input = document.createElement("input");
				input.type = "file";
				input.onchange = async () => {
					if (input.files && input.files.length > 0) {
						const file = input.files[0];
						if (file.name.includes(".frag")) {
							const url = URL.createObjectURL(file);
							const result = await fetch(url);
							const data = await result.arrayBuffer();
							const buffer = new Uint8Array(data);
							fragments.load(buffer);
						}
					}
					input.remove();
					if (!input.files || input.files.length === 0) {
						input.click();
					}
				};
				input.click();
			};

			const openButton = new OBC.Button(components);
			openButton.materialIcon = "folder_open";
			toolbar.addChild(openButton);
			openButton.onClick.add(() => importExternalFragment());

			const mainToolbar = new OBC.Toolbar(components, { name: "Main Toolbar", position: "bottom" });
			components.ui.addToolbar(mainToolbar);
			const ifcButton = fragmentIfcLoader.uiElement.get("main") as OBC.Button;
			console.log(ifcButton.name);
			mainToolbar.addChild(ifcButton);

			fragmentIfcLoader.settings.wasm = {
				path: "https://unpkg.com/web-ifc@0.0.46/",
				absolute: true,
			};

			const excludedCats = [WEBIFC.IFCTENDONANCHOR, WEBIFC.IFCREINFORCINGBAR, WEBIFC.IFCREINFORCINGELEMENT];
			for (const cat of excludedCats) {
				fragmentIfcLoader.settings.excludedCategories.add(cat);
			}

			fragmentIfcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true;
			fragmentIfcLoader.settings.webIfc.OPTIMIZE_PROFILES = true;

			// const loadIfcAsFragments = async () => {
			// 	const file = await fetch("sample01.ifc");
			// 	const data = await file.arrayBuffer();
			// 	const buffer = new Uint8Array(data);
			// 	const model = await fragmentIfcLoader.load(buffer, "example");
			// 	scene.add(model);
			// };
		}
	}
};

export default openComponent;
