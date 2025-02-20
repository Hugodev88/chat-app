export function formatMessageTime(date: Date) {
	return new Date(date).toLocaleString("pt-BR", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});
}
