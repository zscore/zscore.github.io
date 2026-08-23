# zscore.github.io

My website. Plain HTML and CSS — no build step, no dependencies, nothing to
`bundle install`. GitHub Pages serves the files exactly as they are in this repo
(that's what the empty `.nojekyll` is for).

## Editing

| What | Where |
| --- | --- |
| Projects list | `index.html` — one `<li class="card">` per project |
| Styles | `css/site.css` — colours are custom properties at the top |
| A new post | copy a folder under `blog/`, edit it, add a link in `index.html` and `feed.xml` |

Markdown sources for the old posts are kept in `_posts/` and `_drafts/` for
reference; nothing reads them any more.

## Local preview

    python3 -m http.server 8000

Then open <http://localhost:8000>.
