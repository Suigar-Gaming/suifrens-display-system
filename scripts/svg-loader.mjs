import { readFileSync } from 'node:fs';
import { registerHooks } from 'node:module';

// The API runs TSX directly in Node. Imported artwork must remain usable in the
// standalone SVG response rather than referring to a file on the server's disk.
registerHooks({
	load(url, context, nextLoad) {
		if (url.startsWith('file:') && url.endsWith('.svg')) {
			const source = readFileSync(new URL(url), 'utf8');
			return {
				format: 'module',
				shortCircuit: true,
				source: `export default ${JSON.stringify(`data:image/svg+xml;base64,${Buffer.from(source).toString('base64')}`)};`,
			};
		}
		return nextLoad(url, context);
	},
});
