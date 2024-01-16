import THREE from "three";

export const importExternalFragment = async (fragments: any) => {
	if (fragments.groups.length) return;

	return new Promise((resolve, reject) => {
		const input = document.createElement("input");
		input.type = "file";
		input.onchange = async () => {
			if (input.files && input.files.length > 0) {
				const file = input.files[0];
				if (file.name.includes(".frag")) {
					const url = URL.createObjectURL(file);
					try {
						const result = await fetch(url);
						const data = await result.arrayBuffer();
						const buffer = new Uint8Array(data);
						const model = fragments.load(buffer);

						// Resolve the promise with the loaded model
						resolve(model);
					} catch (error) {
						// Reject the promise if any error occurs
						reject(error);
					}
				}
			}
			input.remove();

			if (!input.files || input.files.length === 0) {
				input.click();
			}
		};
		input.click();
	});
};

export const loadIfcAsFragments = async (fragmentIfcLoader: any, scene: any) => {
	const input = document.createElement("input");
	input.type = "file";
	input.onchange = async () => {
		if (input.files && input.files.length > 0) {
			const file = input.files[0];
			if (file.name.includes(".ifc")) {
				const url = URL.createObjectURL(file);
				const result = await fetch(url);
				const data = await result.arrayBuffer();
				const buffer = new Uint8Array(data);
				scene.add(buffer);
			}
		}
	};
};
