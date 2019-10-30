export function toSnakeCase(str: string): string {
  if (!str) return '';

	return str
		.replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '')
		.replace(/([a-z])([A-Z])/g, (_, a : string, b : string) => a + '_' + b.toLowerCase())
		.replace(/[^A-Za-z0-9]+|_+/g, '_')
		.toLowerCase();
}
