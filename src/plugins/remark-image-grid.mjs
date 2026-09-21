// SPDX-FileCopyrightText: 2025-2026 Arcangelo Massari <info@arcangelomassari.com>
//
// SPDX-License-Identifier: ISC

const isImage = (node) =>
	node.type === 'image' ||
	((node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') && node.name === 'Image')

const isSeparator = (node) =>
	node.type === 'break' || (node.type === 'text' && node.value.trim() === '')

function createGrid(images) {
	for (const image of images) {
		if (image.attributes) {
			image.attributes = image.attributes.filter(
				(attribute) => attribute.name !== 'width' && attribute.name !== 'height',
			)
		}
	}

	return {
		type: 'imageGrid',
		children: images,
		data: { hName: 'div', hProperties: { className: ['image-grid'] } },
	}
}

function readRun(children, start) {
	const run = []
	let cursor = start

	while (cursor < children.length) {
		if (isImage(children[cursor])) {
			run.push(children[cursor])
			cursor++
			continue
		}

		let ahead = cursor
		while (ahead < children.length && isSeparator(children[ahead])) ahead++
		if (run.length > 0 && ahead < children.length && isImage(children[ahead])) {
			cursor = ahead
			continue
		}

		break
	}

	return { run, end: cursor }
}

function splitRuns(children) {
	const segments = []
	let others = []
	let index = 0

	const flushOthers = () => {
		if (others.length > 0) segments.push({ grid: false, children: others })
		others = []
	}

	while (index < children.length) {
		const { run, end } = readRun(children, index)
		if (run.length > 1) {
			flushOthers()
			segments.push({ grid: true, children: run })
			index = end
			continue
		}
		others.push(children[index])
		index++
	}

	flushOthers()

	return segments
}

function rebuild(children, keepOthers) {
	const segments = splitRuns(children)
	if (!segments.some((segment) => segment.grid)) return undefined

	return segments.flatMap((segment) =>
		segment.grid ? createGrid(segment.children) : keepOthers(segment.children),
	)
}

function splitParagraph(paragraph) {
	const keepOthers = (children) => {
		const kept = [...children]
		while (kept.length > 0 && isSeparator(kept[0])) kept.shift()
		while (kept.length > 0 && isSeparator(kept.at(-1))) kept.pop()
		return kept.length > 0 ? [{ ...paragraph, children: kept }] : []
	}

	return rebuild(paragraph.children, keepOthers) ?? [paragraph]
}

function transform(node) {
	if (!node.children) return

	const children = []
	for (const child of node.children) {
		if (child.type === 'paragraph') {
			children.push(...splitParagraph(child))
			continue
		}
		transform(child)
		children.push(child)
	}

	node.children = rebuild(children, (others) => others) ?? children
}

export default function remarkImageGrid() {
	return transform
}
