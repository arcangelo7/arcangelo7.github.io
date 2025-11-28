// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightObsidian, { obsidianSidebarGroup } from 'starlight-obsidian';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Tu vuo far el phdino',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/arcangelo7' }],
			sidebar: [
				obsidianSidebarGroup,
			],
			plugins: [
				starlightObsidian({
					vault: '/home/arcangelo/Documents/obsidian',
					ignore: [
						'Autismo/**',
						'Casa/**',
						'Filosofia/**',
						'Note/**',
						'UnoStrano/**',
						'User Testing Heritrace/**',
						'*.png',
					],
					sidebar: {
						label: 'PhD Journal',
						collapsed: false,
					},
					skipGeneration: !!process.env.SKIP_OBSIDIAN_GENERATION,
				}),
			],
		}),
	],
});
