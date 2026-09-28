// SPDX-FileCopyrightText: 2026 Arcangelo Massari <info@arcangelomassari.com>
//
// SPDX-License-Identifier: ISC

export default function removeAstroHeadDirective() {
	return {
		name: 'remove-astro-head-directive',
		apply: 'build',
		enforce: 'post',
		transform: {
			filter: { id: /[?&]astroPropagatedAssets(?:&|$)/ },
			handler(code) {
				// Astro tracks head assets through module metadata; this directive has no consumer.
				// https://github.com/withastro/astro/issues/18087
				return {
					code: code.replace(/^\s*"use astro:head-inject";/, ''),
					map: null,
				};
			},
		},
	};
}
