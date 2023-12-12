/**
 * Switch component
 * add focus class to label when switch is focused
 */
export const initSwitch = () => {
	const switchElements: NodeListOf<HTMLInputElement> =
		document.querySelectorAll("input[type=checkbox][role^=switch]");

	for (const switchElement of switchElements) {
		switchElement.addEventListener("focus", (event) => {
			const target = event.target as HTMLInputElement;
			const labelElement = target.closest("label") as HTMLSpanElement;
			labelElement.classList.add("focus");
		});
		switchElement.addEventListener("blur", (event) => {
			const target = event.target as HTMLInputElement;
			const labelElement = target.closest("label") as HTMLSpanElement;
			labelElement.classList.remove("focus");
		});
	}
};
