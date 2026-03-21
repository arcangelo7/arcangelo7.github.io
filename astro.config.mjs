// SPDX-FileCopyrightText: 2025-2026 Arcangelo Massari <info@arcangelomassari.com>
//
// SPDX-License-Identifier: ISC

// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightObsidian, { obsidianSidebarGroup, createStarlightObsidianPlugin } from 'starlight-obsidian';

const [kgiPlugin, kgiSidebarGroup] = createStarlightObsidianPlugin();

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
			sidebar: [obsidianSidebarGroup, kgiSidebarGroup],
			plugins: [
				starlightObsidian({
					vault: '/home/arcangelo/Documents/obsidian',
					ignore: [
						'!(Tu vuo far el phdino|attachments)/**',
						'*.png',
					],
					sidebar: {
						label: 'Tu vuo far el phdino',
						collapsed: false,
					},
					skipGeneration: !!process.env.SKIP_OBSIDIAN_GENERATION,
				}),
				kgiPlugin({
					vault: '/home/arcangelo/Documents/obsidian/KG Inversion',
					configFolder: '../.obsidian',
					output: 'kgi',
					ignore: [
						'*.png',
					],
					sidebar: {
						label: 'KGI',
						collapsed: false,
					},
					skipGeneration: !!process.env.SKIP_OBSIDIAN_GENERATION,
				}),
			],
		}),
	],
});
