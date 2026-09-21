// SPDX-FileCopyrightText: 2025-2026 Arcangelo Massari <info@arcangelomassari.com>
//
// SPDX-License-Identifier: ISC

// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightObsidian, { obsidianSidebarEntries } from 'starlight-obsidian';
import { unified } from '@astrojs/markdown-remark';
import remarkBreaks from 'remark-breaks';
import remarkImageGrid from './src/plugins/remark-image-grid.mjs';

// https://astro.build/config
export default defineConfig({
	markdown: {
		processor: unified({ remarkPlugins: [remarkBreaks, remarkImageGrid] }),
	},
	integrations: [
		starlight({
			title: 'Tu vuo far el contrattino',
			logo: {
				src: './src/assets/logo.png',
				alt: 'PhD Journal Logo',
				replacesTitle: false,
			},
			favicon: '/favicon.png',
			customCss: ['./src/styles/image-grid.css'],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/arcangelo7/arcangelo7.github.io' }],
			components: {
				Sidebar: './src/components/Sidebar.astro',
				Pagination: './src/components/Pagination.astro',
			},
			sidebar: [
				{ label: 'Tu vuo far el contrattino', collapsed: false, items: [obsidianSidebarEntries] },
			],
			plugins: [
				starlightObsidian({
					vault: '/home/arcangelo/Documents/obsidian/diario',
					configFolder: '../.obsidian',
					ignore: [
						'*.png',
					],
					skipGeneration: !!process.env.SKIP_OBSIDIAN_GENERATION,
				}),
			],
		}),
	],
});
