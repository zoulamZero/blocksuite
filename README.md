# BlockSuite

<p align="center">
  <picture style="width: 500px">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/toeverything/blocksuite/master/assets/logo-and-name-h.svg" />
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/toeverything/blocksuite/master/assets/logo-and-name-h-white.svg" />
    <img src="https://raw.githubusercontent.com/toeverything/blocksuite/master/assets/logo-and-name-h.svg" width="500" alt="BlockSuite logo and name" />
  </picture>
</p>

[![Codecov](https://codecov.io/gh/toeverything/blocksuite/branch/master/graph/badge.svg?token=T86JYCDSMN)](https://codecov.io/gh/toeverything/blocksuite)
[![Checks Status](https://img.shields.io/github/checks-status/toeverything/blocksuite/master)](https://github.com/toeverything/blocksuite/actions?query=branch%3Amaster)
[![Issues Closed](https://img.shields.io/github/issues-closed/toeverything/blocksuite?color=6880ff)](https://github.com/toeverything/blocksuite/issues?q=is%3Aissue+is%3Aclosed)
[![NPM Latest Release](https://img.shields.io/npm/v/@blocksuite/store.svg?maxAge=300&color=6880ff)](./packages/store/package.json)
[![NPM Nightly Release](https://img.shields.io/npm/v/@blocksuite/editor/nightly?color=6880ff)](https://github.com/toeverything/blocksuite/actions/workflows/nightly-release.yml?query=branch%3Amaster)
[![Open in CodeSandbox](https://img.shields.io/badge/open%20in-CodeSandbox-black)](https://codesandbox.io/p/github/toeverything/blocksuite/master)
[![Open in StackBlitz](https://img.shields.io/badge/open%20in-StackBlitz-black)](https://stackblitz.com/github/toeverything/blocksuite)
[![Join Discord](https://img.shields.io/discord/959027316334407691)](https://discord.gg/9vwSWmYYcZ)

---

BlockSuite (_pronounced "block sweet"_) is the open-source editor project behind [AFFiNE](https://github.com/toeverything/AFFiNE). It provides an out-of-the-box block-based editor built on top of a framework designed for general-purpose collaborative applications. This monorepo maintains both the editor and the underlying framework.

- 👉 [Try BlockSuite-based AFFiNE online](https://app.affine.pro/)
- 🚀 [Edit this page in BlockSuite](https://codesandbox.io/p/sandbox/blocksuite-starter-316rct?file=%2Fsrc%2Fmain.ts)

> ⚠️ This project is under heavy development and is in a stage of rapid evolution. Stay tuned or [see our roadmap here](https://github.com/orgs/toeverything/projects/10)!

## Introduction

BlockSuite works very differently than traditional rich text frameworks:

- For the data model, BlockSuite eliminates the need to work with data-driven DSLs (e.g., _operations_, _actions_, _commands_, _transforms_). Instead, it utilizes [CRDT](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type) as the single source of truth, offering a strongly-typed block tree model built on [Yjs](https://github.com/yjs/yjs). With BlockSuite, manipulating blocks becomes as simple as updating a todo list. Moreover, by fully harnessing the power of CRDT, it supports zero-cost time travel, real-time collaboration, and out-of-the-box pluggable persistence backends.
- For rich text editing, BlockSuite seamlessly organizes rich text content into discrete blocks. In BlockSuite, a document with 100 paragraphs can be rendered into 100 text blocks or 100 individual rich text editor instances, effectively eliminating the outdated practice of consolidating all content into a single, risky [`contenteditable`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable) monolith.
- At the rendering layer, BlockSuite remains framework agnostic. It doesn't limit the block tree rendering to the DOM. Not only does it implement its entire document editing UI using [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components), but it also offers a hybrid [canvas-based renderer](./packages/phasor/) for whiteboard content sections. Both renderers can coexist on the same page and share a unified centralized data store.

BlockSuite is not intended to be yet another plugin-based rich text editing framework. Instead, **it encourages building various collaborative applications directly through whatever UI framework you're comfortable with**. To this end, we will try to open-source more foundational modules as reusable packages for this in the BlockSuite project.

Although BlockSuite is still in its early stages, you can already use the `@blocksuite/editor` package, the collaborative editor used in AFFiNE Alpha. Note that this editor is also a web component and is completely framework-independent!

## Resources

- 🎁 Examples
  - [Nightly Playground](https://blocksuite-toeverything.vercel.app/?init) ([🔗 source](./packages/playground/src/main.ts))
  - [The `SimpleAffineEditor` Example](https://blocksuite-toeverything.vercel.app/examples/basic/) ([🔗 source](./packages/playground/examples/basic/index.html))
  - [AFFiNE Alpha Editor](https://app.affine.pro/) ([🔗 source](https://github.com/toeverything/AFFiNE/tree/master/apps/web))
  - [Multiple Workspace Example with React](https://blocksuite-react.vercel.app/) ([🔗 source](./packages/react/))
  - [CodeSandbox Starter Template](https://codesandbox.io/p/sandbox/blocksuite-starter-316rct?file=%2Fsrc%2Fmain.ts)
  - [BlockSuite Monorepo in CodeSandbox](https://codesandbox.io/p/github/toeverything/blocksuite/master)
- 🗓️ [GitHub Project](https://github.com/orgs/toeverything/projects/10)
- 📍 [GitHub Issues](https://github.com/toeverything/blocksuite/issues)
- 🎙️ [GitHub Discussions](https://github.com/toeverything/blocksuite/discussions)
- 💬 [Discord Channel](https://discord.gg/9vwSWmYYcZ)
- 🏠 [AFFiNE Community](https://community.affine.pro/c/open-development/)
- 🚀 [Releases](https://github.com/toeverything/blocksuite/releases)

## Getting Started

The `@blocksuite/editor` package contains the editor built into AFFiNE. Its `nightly` versions are released daily based on the master branch, and they are always tested on CI. This means that the `nightly` versions can already be used in real-world projects like AFFiNE at any time:

```sh
pnpm i @blocksuite/editor@nightly
```

If you want to easily reuse most of the rich-text editing features, you can use the `SimpleAffineEditor` web component directly ([code example here](./packages/playground/examples/basic/index.html)):

```ts
import { SimpleAffineEditor } from '@blocksuite/editor';
import '@blocksuite/editor/themes/affine.css';

const editor = new SimpleAffineEditor();
document.body.appendChild(editor);
```

Or equivalently, you can also use the declarative style:

```html
<body>
  <simple-affine-editor></simple-affine-editor>
  <script type="module">
    import '@blocksuite/editor';
    import '@blocksuite/editor/themes/affine.css';
  </script>
</body>
```

👉 [Try `SimpleAffineEditor` online](https://blocksuite-toeverything.vercel.app/examples/basic/)

However, the `SimpleAffineEditor` here is just a [thin wrapper with dozens of lines](https://github.com/toeverything/blocksuite/blob/master/packages/editor/src/components/simple-affine-editor.ts) that doesn't enable the opt-in collaboration and data persistence features. If you are going to support more complicated real-world use cases (e.g., with customized block models and configured data sources), this will involve the use of these three following core packages:

- The `packages/store` package is a data store built for general-purpose state management.
- The `packages/blocks` package holds the default BlockSuite editable blocks.
- The `packages/editor` package ships a complete BlockSuite-based editor.

```sh
pnpm i \
  @blocksuite/store@nightly \
  @blocksuite/blocks@nightly \
  @blocksuite/editor@nightly
```

And here is a minimal collaboration-ready editor showing how these underlying BlockSuite packages are composed together:

> 🚧 Here we will work with the concepts of `Workspace`, `Page`, `Block` and `Slot`. These are the primitives for building a block-based collaborative application. We are preparing a comprehensive documentation about their usage!

```ts
import '@blocksuite/blocks';
import { Workspace, Page } from '@blocksuite/store';
import { AffineSchemas } from '@blocksuite/blocks/models';
import { EditorContainer } from '@blocksuite/editor';

function main() {
  // Create a workspace with one default page
  const workspace = new Workspace({ id: 'test' }).register(AffineSchemas);
  const page = workspace.createPage('page0');

  // Create default blocks in the page
  const pageBlockId = page.addBlock('affine:page');
  const frameId = page.addBlock('affine:frame', {}, pageBlockId);
  page.addBlock('affine:paragraph', {}, frameId);

  // Init editor with the page store
  const editor = new EditorContainer();
  editor.page = page;
  document.body.appendChild(editor);
}

main();
```

For React developers, check out the [`@blocksuite/react`](./packages/react/README.md) doc for React components and hooks support.

## Current Status (`@blocksuite/editor`)

> For more detailed planning and progress, please checkout our [GitHub project](https://github.com/orgs/toeverything/projects/10).

- Basic text editing
  - ✅ Paragraph with inline style
  - ✅ Nested list
  - ✅ Code block
  - ✅ Markdown shortcuts
- Block-level editing
  - ✅ Inline text format bar
  - ✅ Inline slash menu
  - ✅ Block hub
  - ✅ Block drag handle
  - ✅ Block-level selection
- Rich-content
  - ✅ Image block
  - 🚧 Database block
  - 📌 Third-party embedded block
- Whiteboard (edgeless mode)
  - ✅ Zooming and panning
  - ✅ Frame block
  - ⚛️ Shape element
  - ⚛️ Handwriting element
  - 🚧 Shape connector
  - 🚧 Grouping
- Playground
  - ✅ Multiplayer collaboration
  - ✅ Local data persistence
  - ✅ E2E test suite
- Developer experience
  - ✅ Block tree update API
  - ✅ Zero cost time travel (undo/redo)
  - ✅ Reusable NPM package
  - ✅ React hooks integration
  - 🚧 Dynamic component registration
  - 📌 Dynamic block registration

Icons above correspond to the following meanings:

- ✅ - **Beta**
- ⚛️ - **Alpha**
- 🚧 - **Developing**
- 📌 - **Planned**

## Building

See [BUILDING.md](BUILDING.md) for instructions on how to build BlockSuite from source code.

## Contributing

BlockSuite accepts pull requests on GitHub. **Before you start contributing, please make sure you have read and accepted our [Contributor License Agreement](https://github.com/toeverything/blocksuite/edit/master/.github/CLA.md).** To indicate your agreement, simply edit this file and submit a pull request.

## License

[MPL 2.0](./LICENSE)
