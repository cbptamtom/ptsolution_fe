import * as THREE from "three";
import * as OBC from "openbim-components";
import { RefObject } from "react";
import * as path from "path";
import * as WEBIFC from "web-ifc";

import Stats from "stats.js";
import { importExternalFragment } from "./obc-services";

const openComponent = async (containerRef: RefObject<HTMLDivElement> | null) => {
	if (containerRef && containerRef.current) {
		const container = containerRef.current;
		if (container) {
			const components = new OBC.Components();
			components.scene = new OBC.SimpleScene(components);
			components.renderer = new OBC.PostproductionRenderer(components, container);
			components.camera = new OBC.SimpleCamera(components);
			components.raycaster = new OBC.SimpleRaycaster(components);

			components.init();
			const scene = components.scene.get();
			const fragments = new OBC.FragmentManager(components);

			const directionalLight = new THREE.DirectionalLight();
			directionalLight.position.set(5, 10, 3);
			directionalLight.intensity = 0.5;
			scene.add(directionalLight);

			const ambientLight = new THREE.AmbientLight();
			ambientLight.intensity = 0.5;
			scene.add(ambientLight);

			const grid = new OBC.SimpleGrid(components, new THREE.Color(0x666666));
			components.tools.add("2fd526fe-c428-49c3-9c51-f02707d9a46c", grid);

			const toolbar = new OBC.Toolbar(components);
			components.ui.addToolbar(toolbar);
			const loadButton = new OBC.Button(components);
			loadButton.materialIcon = "Load Model";
			toolbar.addChild(loadButton);
			loadButton.onClick.add(() => importExternalFragment(fragments));

			//I want to need make new tool - highlight element when select
			const highlighter = new OBC.FragmentHighlighter(components);
			highlighter.outlineEnabled = true;
			(components.renderer as OBC.PostproductionRenderer).postproduction.enabled = true;

			const highlightElementOnClick = async () => {
				if (!highlighter.highlightMats["mySelect"]) {
					highlighter.setup({
						selectName: "mySelect",
					});
				}
				await highlighter.highlight("mySelect", true, false);
			};

			containerRef?.current.addEventListener("click", async () => {
				await highlightElementOnClick();
			});
		}
	}
};

export default openComponent;
