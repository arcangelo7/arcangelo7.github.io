// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightObsidian, { obsidianSidebarGroup } from 'starlight-obsidian';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Tu vuo far el phdino',
			logo: {
				src: './src/assets/logo.png',
				alt: 'PhD Journal Logo',
				replacesTitle: false,
			},
			favicon: '/favicon.png',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/arcangelo7/arcangelo7.github.io' }],
			components: {
				Sidebar: './src/components/Sidebar.astro',
				Pagination: './src/components/Pagination.astro',
			},
			sidebar: [obsidianSidebarGroup],
			plugins: [
				starlightObsidian({
					vault: '/home/arcangelo/Documents/obsidian',
					ignore: [
						'!(Tu vuo far el phdino|attachments)/**',
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
