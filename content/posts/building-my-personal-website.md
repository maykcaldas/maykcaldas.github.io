I wanted my personal website to become a home for my research, software projects, and writing. Rebuilding it also gave me a practical way to learn more about web development: make a design decision, implement it, check the result, and understand which tools made it possible.

This post documents the redesign and the React migration, with help from Codex. It explains the implementation in the repository at the time of writing, including the parts that are still works in progress.

## Starting with the structure

The original site used the Editorial template from HTML5 UP. It already contained useful material: a biography, publications, project links, a CV, teaching resources, and a few blog posts. The redesign started by reorganizing that content rather than inventing a new portfolio from scratch.

I settled on four main pages:

- **Home:** an introduction, selected work, and ways to get in touch.
- **Academic:** publications, education, research directions, and talks.
- **Developer:** software projects and the tools I work with.
- **Blog:** articles and notes about what I am learning.

Initially, I considered separate subdomains such as `academic.maykcaldas.dev`. For now, ordinary paths such as `/academic/` and `/developer/` keep everything in one application and deployment. There is room to separate a future application if it needs its own infrastructure.

## Finding the visual direction

[Inductive Bio](https://www.inductive.bio/) and [Gokulnath Sourirajan’s website](https://gokulnath-sourirajan.vercel.app/) were design references. The resulting site uses warm neutrals, purple accents, large headings, thin dividers, and numbered sections. My existing logo became part of the header and footer, with SVG versions that work in both light and dark themes.

Several improvements came from looking at the actual pages. Publications first appeared as text rows, but restoring their graphical abstracts made the research more visual. Where a TOC graphic was unavailable, we used a representative figure or an official illustration. Toolkit icons also made the Developer page easier to scan.

An editable Figma version provides a place to discuss the design with a designer. It is a separate design document, not a live connection to the code. At the time of writing, the latest publication and toolkit changes are still waiting to be synchronized because the Figma integration reached its tool-call limit.

## Why React, TypeScript, and Vite?

The first redesign used a small static HTML generator. I then asked to migrate the site to React and TypeScript. The goal was to get practice with reusable components, typed data, and interactive behavior while preserving the design and existing content.

These technologies have different jobs:

| Technology | Its job in this website |
| --- | --- |
| React | Describes the interface through components and manages interactive state |
| TypeScript | Checks the shapes of data and the values passed between components |
| Vite | Runs the development server and bundles browser code for production |
| CSS | Defines typography, colors, responsive layouts, and themes |
| Markdown | Stores blog article bodies in readable text files |
| Node.js and npm | Run development commands, build scripts, and tests |
| GitHub Actions and Pages | Provide the configured build, validation, and static hosting workflow |

### React: reusable pieces and local state

A publication row, a project card, and the shared header are components. Each component receives the data it needs through *props* and returns JSX, the markup-like syntax used to describe the interface.

The search and topic filters are a useful example of React state. The filter component stores the current search term and selected topic with `useState`. Changing either value updates the visible items and result count. The same component is used for publications, projects, and blog posts.

For navigation, the site uses ordinary links. A small route table maps paths to page components; there is no separate client-side routing library.

### TypeScript: catching mismatched assumptions

The publication and project interfaces specify which fields are required and which are optional. A publication needs a title and URL, for example, while a code repository link is optional. Components can then handle those optional values explicitly.

TypeScript catches many mistakes before the site runs, but it does not validate arbitrary data at runtime. That is why the content script also checks the JSON post index for invalid dates, filenames, and duplicate slugs. [The TypeScript handbook](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html) explains this distinction between JavaScript execution and static checking.

### Vite: the development and build tool

Running `npm run dev` starts Vite. It serves the application locally and updates it as source files change. Our `vite.config.ts` enables React support, adds Markdown regeneration, and injects the initial theme script.

During a production build, Vite bundles the JavaScript and CSS. Type checking is a separate step: our build command runs `tsc --noEmit` before Vite. Vite itself is not a server that visitors need to connect to after deployment. [Vite’s guide](https://vite.dev/guide/) describes its development-server and production-build roles.

Removing Vite would not automatically make the project simpler. Its responsibilities would still need to be handled elsewhere. The more useful question is whether each custom script earns its place.

## Turning the source into a static website

The production build has three main stages:

1. **Prepare content.** Read the Markdown articles and their JSON metadata, validate the entries, and generate sanitized HTML and excerpts.
2. **Build browser assets.** Check TypeScript and let Vite bundle the application’s JavaScript and CSS.
3. **Generate pages.** Render React components to HTML for every known route, then write page metadata, the RSS feed, sitemap, and compatibility redirects.

The output goes into `dist/`. For example, `/academic/` corresponds to `dist/academic/index.html`. These files can be hosted without a production Node.js server or database.

When someone opens a production page, its text is already in the HTML. React then uses `hydrateRoot` to attach interactive behavior to that existing markup. This is called *hydration*. Publication and article content remains readable without JavaScript; the filters and theme button need JavaScript. The initial React render must match the generated HTML, as explained in the [React hydration documentation](https://react.dev/reference/react-dom/client/hydrateRoot).

This is build-time rendering: HTML is generated when the website is built, rather than for every visitor request.

## Writing a blog post

Articles live in `content/posts/`. Their metadata lives in `content/posts/index.json`, which is the authoritative list of posts. Adding this article involved creating `building-my-personal-website.md` and registering it with an entry like this:

```json
{
  "title": "Building my personal website with React and TypeScript",
  "date": "2026-10-06",
  "tags": ["web development", "react", "typescript", "learning"],
  "file": "building-my-personal-website.md"
}
```

The filename becomes the URL slug: `/blog/building-my-personal-website/`. The build also includes the article in the blog index, RSS feed, and sitemap.

The `marked` package converts Markdown to HTML, and `sanitize-html` removes markup outside the allowed set before React renders the article body. The generated `src/content/posts.generated.json` file is an output, so it is ignored by Git and should not be edited directly.

For now, Markdown and a small index are enough. There is no CMS, login system, or private-post feature. An unlisted URL would not make an article private in a public repository.

## Checking and publishing changes

The local workflow is:

```sh
npm ci
npm run dev
```

Before publishing, I can run:

```sh
npm run check
npm run preview
```

The checks combine TypeScript, a production build, interaction tests, and checks against the generated HTML. Vitest and React Testing Library exercise filters and theme behavior in JSDOM. Node’s test runner checks generated pages, internal links, anchors, assets, metadata, and redirects.

The preview command serves the built files locally, including real 404 responses. That matters because a development server can hide problems that only appear when hosting static files.

The GitHub Actions workflow is configured to check pull requests and build and deploy `dist/` from `main`. The migration still needs GitHub Pages to be configured to use Actions before its first deployment. Writing or previewing a post locally does not publish it.

## Keeping the project understandable

The repository cleanup was another part of the learning process. We removed unused assets and checked which files were actually referenced. We also removed `.nojekyll`, which is unnecessary for our direct artifact-deployment workflow. Meanwhile, `vite.config.ts` stayed because it actively configures development and builds.

React is not required for every personal website, and these custom build scripts come with maintenance work. Here, the structure gives me concrete things to study: a filter to understand state, a publication model to understand types, and a build pipeline to understand how source code becomes a website.

The next step is to use that foundation: write more, add projects worth exploring, and improve the site as I learn what it needs.
