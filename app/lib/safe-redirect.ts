const DEFAULT_REDIRECT = "/";

/**
 * Safe redirect path
 * - Support form value, string
 * - Auto trim spaces
 * - Reject full URL
 * - Reject paths containing .. or \
 * @param to User provided redirect path
 * @param defaultRedirect Default path
 */
export function safeRedirectPath(
	to: FormDataEntryValue | string | null | undefined,
	defaultRedirect: string = DEFAULT_REDIRECT,
): string {
	if (!to || typeof to !== "string") return defaultRedirect;

	const trimmedTo = to.trim();

	// Basic checks
	if (
		!trimmedTo.startsWith("/") || // Must start with /
		trimmedTo.startsWith("//") || // Forbidden //
		trimmedTo.startsWith("/\\") || // Forbidden /\
		trimmedTo.includes("..") // Forbidden relative path traversal
	) {
		return defaultRedirect;
	}

	// Try to parse as full URL, forbidden to redirect to external domain
	try {
		new URL(trimmedTo);
		// If no exception is thrown, it is a full URL, return default
		return defaultRedirect;
	} catch {
		// If parsing fails, it is a relative path, continue validation
	}

	// Parse as relative path to ensure security
	try {
		const url = new URL(trimmedTo, "https://example.com");
		if (url.hostname !== "example.com") return defaultRedirect;
	} catch {
		return defaultRedirect;
	}

	return trimmedTo;
}
