# CLAUDE.md

Guidance for AI assistants working in this repository.

## What this is

`zscore.github.io` — Zane Blanton's personal site: a project portfolio, an
about page, two long-form write-ups, and two browser demos.

It is **plain static HTML and CSS**. There is no build step, no package
manager, no framework, no test suite, and no CI. GitHub Pages serves the files
exactly as they sit in the repo; the empty `.nojekyll` file is what stops Pages
from running Jekyll over them. The site was previously a Jekyll blog and was
rebuilt as flat HTML (commit `97313cb`).

**Deployment:** pushing to `master` publishes the site. Nothing else runs.

## Layout

```
index.html                  Portfolio home — the project card list
about/index.html            About page
blog/<slug>/index.html      Long-form posts (2: bicycle-pavement-data,
                            l-systems-for-language-generation)
css/site.css                The only stylesheet — every page loads it
feed.xml                    Hand-maintained RSS 2.0 feed
l_systems/                  The two live demos + their shared JS
_posts/  _drafts/           Dead Jekyll markdown, kept for reference only
data/YYYY/MM/DD/*.html      Redirect stubs for the old Jekyll post URLs
.nojekyll                   Empty; disables Jekyll on GitHub Pages
```

Every user-facing page is a **complete standalone HTML document**. There is no
templating, no includes, no partials — the `<head>` block, header, nav, and
footer are duplicated by hand in all six pages:

- `index.html`
- `about/index.html`
- `blog/bicycle-pavement-data/index.html`
- `blog/l-systems-for-language-generation/index.html`
- `l_systems/l-system.html`
- `l_systems/weasel.html`

**A change to the nav, footer, or shared head markup must be applied to all six
files.** Check with `grep -rln 'class="site-footer"' --include=*.html .`

## Local preview

```
python3 -m http.server 8000    # then open http://localhost:8000
```

Serve from the repo root. All internal links and the stylesheet use
root-absolute paths (`/css/site.css`, `/about/`, `/l_systems/l-system.html`),
so opening a file directly with `file://` will render unstyled and the links
will break.

There are no linters or tests. Verification means: load the pages you touched
in the local server, confirm they render in both colour schemes, and click the
links you added or changed.

## Conventions

### HTML

- HTML5, `<!doctype html>`, `<html lang="en">`, 2-space indent, lowercase tags,
  no self-closing slashes on void elements.
- Typographic characters are written as entities: `&mdash;` `&ndash;` `&larr;`
  `&rarr;`, and `&amp;` inside URLs.
- Every page's `<head>` carries, in this order: charset, viewport, `<title>`,
  `description`, `author`, `og:title`, `og:description`, `og:type`, `og:url`,
  `rel="canonical"`, the RSS `<link rel="alternate">`, then the stylesheet.
  Titles are `Page name — Zane Blanton` (em dash); the home page is just
  `Zane Blanton`. `og:type` is `website` on the home page, `profile` on About,
  `article` on posts.
- Accessibility is deliberate and should be preserved: the `skip-link` as the
  first element of `<body>`, `<main id="main">`, `aria-label="Main"` on the
  nav, `aria-current="page"` on the current nav link, `aria-label` on every
  demo input, and `aria-live="polite"` on demo output regions.

### CSS

`css/site.css` is the whole design system. Colours and metrics are custom
properties declared at the top of `:root`; the palette is **dark by default**
with a light-scheme override in a `@media (prefers-color-scheme: light)`
block. Any new colour must be added to both blocks — never hard-code a hex
value in a rule. `prefers-reduced-motion` is honoured globally.

Class vocabulary, by section of the file:

| Area | Classes |
| --- | --- |
| Shell | `.wrap` `.site-header` `.wordmark` `.site-nav` `.site-footer` `.skip-link` |
| Home | `.hero` `.section-head` + `.count` |
| Project cards | `.projects` `.card` `.card-top` `.card-foot` `.year` `.tag` `.repo` `.live` |
| Post lists | `.posts` `.post-date` `.post-title` |
| Article pages | `.prose` `.meta` `.back` `.prose-foot` |
| Demos | `.demo` `.toolbar` `.btn` `.btn-primary` `.hint` `.banks` `.bank` `.output` |

Prefer reusing these over inventing new ones. `--measure: 68ch` caps prose
width; `.wrap` caps everything else.

## Common tasks

### Add or edit a project

Projects live in `index.html` as one `<li class="card">` each, ordered
**newest year first**. The shape is fixed:

```html
<li class="card">
  <div class="card-top">
    <h3><a href="PRIMARY_URL">project name</a></h3>
    <span class="year">2026</span>
  </div>
  <p>Two or three sentences on what it actually does.</p>
  <div class="card-foot">
    <a class="live" href="...">live</a>     <!-- only if it runs in-browser -->
    <a class="repo" href="...">repo</a>     <!-- also: medium, instagram, slides, write-up, analysis -->
    <span class="tag">JavaScript</span>
  </div>
</li>
```

Then **update the card count** in the `<span class="count">` of the Projects
`.section-head` — it is hard-coded (currently `12`) and does not compute
itself.

Card-click gotcha: only the `<h3>` link is a real link; `.card h3 a::after`
stretches an invisible overlay across the whole card. That is why `.live` and
`.repo` carry `position: relative; z-index: 1` — without them the overlay
swallows their clicks. Keep those properties on anything clickable inside a
card.

Project names are lowercase in the card titles, except where the project's own
name is capitalised.

### Add a blog post

1. Create `blog/<slug>/index.html` by copying an existing post — it is the
   fastest way to get the head block, header, and footer right.
2. Update the head metadata (`title`, `description`, both `og:` copies,
   `og:url`, `canonical`) to the new slug.
3. Body shape: `<article class="prose">` containing `<a class="back" href="/">
   &larr; projects</a>`, an `<h1>`, a `<p class="meta">Month D, YYYY</p>`, then
   `<h2>` sections.
4. Link it from `index.html` — either a new card, or a `write-up` link in an
   existing card's `.card-foot`.
5. Add an `<item>` at the **top** of `feed.xml`: `title`, `link`, `guid
   isPermaLink="true"` (same absolute URL as the link), an RFC-822 `pubDate`,
   and a one-sentence `description`. The feed is written by hand and is not
   generated from anything.

There is no automatic index of posts, and no `/blog/` landing page — posts are
reachable only from the project cards and the feed.

### Touch the demos

`l_systems/l_system.js` holds the shared stochastic grammar: a global `rules`
object mapping a part-of-speech tag to `[cumulative_probability, [tag, tag,
tag]]` pairs, plus `l_transform(text, l_rules)` which rewrites a tag array one
generation forward. It is ES5, script-tag global scope, no modules.

`l-system.html` and `weasel.html` both `<script src="./l_system.js">` and then
define their own `pos_to_word`, `grow_system()`, and `clear_box()` inline,
wired up with inline `onclick` handlers. `l-system.html` reads its vocabulary
from the user's input banks; `weasel.html` hard-codes a weasel vocabulary.
Keep the two pages' script blocks in sync when changing shared behaviour.

Known quirk: in `l_system.js` the `rules['P']` productions are built by
concatenating onto `rules['N']` rather than `rules['P']`. This is pre-existing
behaviour that shapes the output; do not "fix" it unless asked.

## Legacy files — leave them alone

- `_posts/` and `_drafts/` are the original Jekyll markdown sources. Nothing
  reads them. The live HTML in `blog/` is the source of truth; editing the
  markdown changes nothing.
- `data/2016/09/11/project-pavement.html` and
  `data/2017/10/03/l-system-generation.html` are meta-refresh redirect stubs
  pointing at the current `blog/` URLs. They exist to keep old inbound links
  working — keep them, and add a matching stub if a post URL ever moves again.
- `l_systems/bootstrap-3.2.0-dist/` and `l_systems/styles/main.css` are
  unreferenced leftovers from the pre-rebuild demos. No page loads them.

## Working agreements

- Do not introduce a build step, a bundler, a framework, or a dependency
  without being asked. "No build step, no dependencies" is the point of the
  repo, and `README.md` states it.
- No images are currently committed anywhere in the site; if you add one, use
  `<img>` with explicit dimensions (the global `img` rule already handles
  responsive sizing).
- Keep the prose voice: lowercase project names, plain declarative sentences,
  em dashes, no marketing register.
- `README.md` carries a short editing table that mirrors this file — if the
  editing workflow changes, update both.
