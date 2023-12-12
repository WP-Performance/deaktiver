/**
 *
 * @param ({data: [string]: bool, action: string})
 * @returns json
 */
export const fetchAPI = async (
	{
		data,
		action,
		ajaxUrl,
	}: { data?: { string: string }; action: string; ajaxUrl: string } = {
		action: null,
		ajaxUrl: "",
	},
): Promise<{ success: boolean; data: { string: boolean } }> => {
	if (!action) return;

	const dataToSend = new FormData();
	dataToSend.append("action", action);
	if (data) {
		for (const [key, value] of Object.entries(data)) {
			dataToSend.append(key, value);
		}
	}
	try {
		const call = await fetch(ajaxUrl, {
			method: "POST",
			credentials: "same-origin",
			body: dataToSend,
		});
		const data = await call.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};
