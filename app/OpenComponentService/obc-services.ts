import THREE from "three";

export const importExternalFragment = (fragments: any) => {
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


