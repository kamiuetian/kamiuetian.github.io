# Muhammad Kamran — CV & portfolio

Static, accessible CV website for <https://kamiuetian.github.io/>. Includes experience, education, a downloadable résumé, six screenshot-based project thumbnails and 27 project descriptions.

## Update

- Edit `projects.json` for project descriptions, categories and URLs.
- Edit `index.template.html` for CV content.
- Run `npm run build` to regenerate `index.html`, then `npm run check`.
- Preview with `python -m http.server 8137 --bind 127.0.0.1`.
- GitHub Pages serves the `main` branch root. There is no build service or runtime dependency.

All content is available without JavaScript; JavaScript adds filtering and expansion. Assets are local, and the page does not use analytics, external fonts or a contact-form backend.

## Content and images

Experience and education are based on the supplied CV and muhammadkamran.dev. Project descriptions are supported by the existing portfolio, public GitHub repositories, project documentation, Codex work and the hosting inventory. `source` fields in `projects.json` record the basis for each entry. A hosted domain alone is not presented as a shipped personal product.

The six featured images use screenshots captured on 16 October 2026 and the built-in image generation tool to add editorial backgrounds and browser framing. The interface, product branding and core content remain recognizable. The portrait uses the supplied personal photograph with the background removed. Local source captures, design concepts and generation prompts are excluded from publication.

The existing public résumé PDF is supplied unchanged. Older or unavailable live projects link to portfolio notes or source code.

## ExamFlow guide

The existing <https://kamiuetian.github.io/examflow-video-guide/> is served by its own `kamiuetian/examflow-video-guide` repository. This repository links to it and does not contain, overwrite or deploy that project. Do not add a CNAME or redirect that changes the GitHub Pages hostname without checking the guide.
