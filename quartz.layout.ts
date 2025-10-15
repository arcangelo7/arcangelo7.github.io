import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/arcangelo7/arcangelo7.github.io",
      "Personal website": "https://arcangelomassari.com/",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      sortFn: (a, b) => {
        // Cartelle prima dei file
        if (a.isFolder && !b.isFolder) return -1
        if (!a.isFolder && b.isFolder) return 1

        // Ordina per data (più recente prima)
        // Le date sono stringhe ISO nel JSON
        const aDate = a.data?.date ? new Date(a.data.date).getTime() : 0
        const bDate = b.data?.date ? new Date(b.data.date).getTime() : 0

        if (aDate !== bDate) {
          return bDate - aDate // Più recente prima
        }

        // Se le date sono uguali, ordina alfabeticamente
        return a.displayName.localeCompare(b.displayName, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      },
    }),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      sortFn: (a, b) => {
        // Cartelle prima dei file
        if (a.isFolder && !b.isFolder) return -1
        if (!a.isFolder && b.isFolder) return 1

        // Ordina per data (più recente prima)
        // Le date sono stringhe ISO nel JSON
        const aDate = a.data?.date ? new Date(a.data.date).getTime() : 0
        const bDate = b.data?.date ? new Date(b.data.date).getTime() : 0

        if (aDate !== bDate) {
          return bDate - aDate // Più recente prima
        }

        // Se le date sono uguali, ordina alfabeticamente
        return a.displayName.localeCompare(b.displayName, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      },
    }),
  ],
  right: [],
}
