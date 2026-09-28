// SPDX-FileCopyrightText: 2026 Arcangelo Massari <info@arcangelomassari.com>
//
// SPDX-License-Identifier: ISC

import { glob, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

function normalizeImageImports(content) {
	const identifiers = new Map();
	const normalized = content.replace(
		/^import (\w+) from '((?:\.\.\/)+assets\/notes\/[^'\n]+)'$/gm,
		(_, identifier, path) => {
			const stableIdentifier = `obsidianImage${identifiers.size + 1}`;
			identifiers.set(identifier, stableIdentifier);
			return `import ${stableIdentifier} from '${path}'`;
		},
	);

	return normalized.replace(/<Image src=\{(\w+)\}/g, (match, identifier) =>
		identifiers.has(identifier) ? `<Image src={${identifiers.get(identifier)}}` : match,
	);
}

export default function stableObsidianImages() {
	return {
		name: 'stable-obsidian-images',
		hooks: {
			async 'astro:config:done'({ config }) {
				if (process.env.SKIP_OBSIDIAN_GENERATION) return;

				const directory = fileURLToPath(new URL('content/docs/notes/', config.srcDir));
				for await (const file of glob('**/*.mdx', { cwd: directory })) {
					const path = join(directory, file);
					const content = await readFile(path, 'utf8');
					const normalized = normalizeImageImports(content);
					if (normalized !== content) await writeFile(path, normalized);
				}
			},
		},
	};
}
