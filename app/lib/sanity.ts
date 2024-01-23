import { createClient } from "next-sanity";

export const client = createClient({
	apiVersion: "2024-01-23",
	dataset: "production",
	projectId: "3tkzxoc3",
	useCdn: false,
});
