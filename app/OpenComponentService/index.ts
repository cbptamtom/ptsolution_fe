import * as THREE from "three";
import * as OBC from "openbim-components";
import { RefObject } from "react";
import * as path from "path";
import * as WEBIFC from "web-ifc";

import Stats from "stats.js";
import { importExternalFragment, loadIfcAsFragments } from "./obc-services";
import { FragmentsGroup } from "bim-fragment";

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

			//#region Load IFC
			const fragmentIfcLoader = new OBC.FragmentIfcLoader(components);

			const mainToolbar = new OBC.Toolbar(components, { name: "Main Toolbar", position: "bottom" });
			components.ui.addToolbar(mainToolbar);
			const ifcButton = fragmentIfcLoader.uiElement.get("main") as OBC.Button;
			mainToolbar.addChild(ifcButton);
			ifcButton.onClick.add(() => loadIfcAsFragments(fragmentIfcLoader, scene));

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
			const exploder = new OBC.FragmentExploder(components);
			//#endregion
			const toolbar = new OBC.Toolbar(components, {
				name: "mainToolbar",
				position: "bottom",
			});
			components.ui.addToolbar(toolbar);
			const loadButton = new OBC.Button(components, {
				materialIconName: "upload",
				tooltip: "Load model",
			});
			toolbar.addChild(loadButton);
			const culler = new OBC.ScreenCuller(components);

			//#region Highlight elem
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
			//#endregion

			//#region Export to fragment file
			const exportFragments = () => {
				if (!fragments.groups.length) return;
				const group = fragments.groups[0];
				const data = fragments.export(group);
				const blob = new Blob([data]);
				const file = new File([blob], "small.frag");
				download(file);
			};

			const download = (file: File) => {
				const link = document.createElement("a");
				link.href = URL.createObjectURL(file);
				link.download = file.name;
				document.body.appendChild(link);
				link.click();
				link.remove();
			};

			const exportButton = new OBC.Button(components);
			exportButton.materialIcon = "exit_to_app";
			exportButton.tooltip = "Export model";
			toolbar.addChild(exportButton);
			exportButton.onClick.add(() => exportFragments());
			//#endregion

			//#region explore model => callback under

			containerRef.current?.addEventListener("mouseup", () => (culler.needsUpdate = true));
			containerRef.current?.addEventListener("wheel", () => (culler.needsUpdate = true));
			culler.needsUpdate = true;
			//#endregion

			//#region fragment plan
			const clipper = new OBC.EdgesClipper(components);
			const sectionMaterial = new THREE.LineBasicMaterial({ color: "black" });
			const fillMaterial = new THREE.MeshBasicMaterial({ color: "gray", side: 2 });
			const fillOutline = new THREE.MeshBasicMaterial({
				color: "black",
				side: 1,
				opacity: 0.5,
				transparent: true,
			});
			clipper.styles.create("filled", new Set(), sectionMaterial, fillMaterial, fillOutline);
			clipper.styles.create("projected", new Set(), sectionMaterial);
			const styles = clipper.styles.get();
			//#endregion

			loadButton.onClick.add(async () => {
				const model = (await importExternalFragment(fragments)) as FragmentsGroup;
				if (model) {
					const classifier = components.tools.get(OBC.FragmentClassifier);
					const properties = await fetch("small.json");
					model.properties = await properties.json();
					classifier.byEntity(model);
					classifier.byStorey(model);
					for (const fragment of model.items) {
						culler.add(fragment.mesh);
					}
					const found = classifier.find({ entities: ["IFCWALLSTANDARDCASE", "IFCWALL"] });
					for (const fragID in found) {
						const { mesh } = fragments.list[fragID];
						styles.filled.fragments[fragID] = new Set(found[fragID]);
						styles.filled.meshes.add(mesh);
					}
					const meshes = [];
					for (const fragment of model.items) {
						const { mesh } = fragment;
						meshes.push(mesh);
						styles.projected.meshes.add(mesh);
					}

					const whiteColor = new THREE.Color("white");
					const whiteMaterial = new THREE.MeshBasicMaterial({ color: whiteColor });
					const materialManager = new OBC.MaterialManager(components);
					materialManager.addMaterial("white", whiteMaterial);
					materialManager.addMeshes("white", meshes);

					const plans = new OBC.FragmentPlans(components);
					await plans.computeAllPlanViews(model);
					const hider = new OBC.FragmentHider(components);
					const highlighter = components.tools.get(OBC.FragmentHighlighter);
					const highlightMat = new THREE.MeshBasicMaterial({
						depthTest: false,
						color: 0xbcf124,
						transparent: true,
						opacity: 0.3,
					});
					highlighter.add("default", [highlightMat]);
					const canvas = components.renderer.get().domElement;
					canvas.addEventListener("click", () => highlighter.clear("default"));
					highlighter.update();

					plans.commands = {
						Select: async (plan) => {
							if (plan) {
								const found = classifier.find({ storeys: [plan.name] });
								highlighter.highlightByID("default", found);
							}
						},
						Show: async (plan) => {
							if (plan) {
								const found = classifier.find({ storeys: [plan.name] });
								hider.set(true, found);
							}
						},
						Hide: async (plan) => {
							if (plan) {
								const found = classifier.find({ storeys: [plan.name] });
								hider.set(false, found);
							}
						},
					};

					const mainToolbar = new OBC.Toolbar(components);
					mainToolbar.name = "Main Toolbar";
					components.ui.addToolbar(mainToolbar);
					mainToolbar.addChild(plans.uiElement.get("main"));
					const customEffects = (components.renderer as OBC.PostproductionRenderer).postproduction
						.customEffects;
					plans.onNavigated.add(() => {
						customEffects.glossEnabled = false;
						materialManager.setBackgroundColor(whiteColor);
						materialManager.set(true, ["white"]);
						grid.visible = false;
					});
					plans.onExited.add(() => {
						customEffects.glossEnabled = true;
						materialManager.resetBackgroundColor();
						materialManager.set(false, ["white"]);
						grid.visible = true;
					});

					//#region IFC Properties

					////////
					const propsProcessor = new OBC.IfcPropertiesProcessor(components);
					propsProcessor.uiElement.get("propertiesWindow").visible = true;
					propsProcessor.process(model);

					highlighter.onSetup.add(() => {
						const highlighterEvents = highlighter.events;
						highlighterEvents.select.onClear.add(() => {
							propsProcessor.cleanPropertiesList();
						});
						highlighterEvents.select.onHighlight.add((selection) => {
							const fragmentID = Object.keys(selection)[0];
							const expressID = Number(Array.from(selection[fragmentID])[0]);
							let model;
							for (const group of fragments.groups) {
								const fragmentFound = Object.values(group.keyFragments).find((id) => id === fragmentID);
								if (fragmentFound) model = group;
							}
							if (model) {
								propsProcessor.renderProperties(model, expressID);
							}
						});
					});

					highlighter.setup();

					// // highlighterEvents.select.onClear.add(() => {
					// // 	propsProcessor.cleanPropertiesList();
					// // });
					// highlighterEvents.select.onHighlight.add((selection) => {
					// 	const fragmentID = Object.keys(selection)[0];
					// 	// const expressID = Number([...selection[fragmentID]][0]);
					// 	const expressID = Number(Array.from(selection[fragmentID])[0]);
					// 	// const expressID = Number(Array.prototype.slice.call(selection[fragmentID])[0]);
					// 	let model;
					// 	for (const group of fragments.groups) {
					// 		const fragmentFound = Object.values(group.keyFragments).find((id) => id === fragmentID);
					// 		if (fragmentFound) model = group;
					// 	}
					// 	if (model) {
					// 		propsProcessor.renderProperties(model, expressID);
					// 	}
					// });

					components.ui.addToolbar(mainToolbar);
					mainToolbar.addChild(propsProcessor.uiElement.get("main"));
					//#endregion
				}
			});
		}
	}
};

export default openComponent;
