# Atlas Arcade source files

Open `../index.html` or `../atlas_arcade_geography_clue_text_white_fixed.html`. Keep that
file beside this entire `atlas-arcade` folder when moving or sharing the site.

Both entry pages are generated from the same sources and only assemble secondary files. The original page is saved
unchanged in `backup/original.html`.

## Where to edit

- `ui/`: readable HTML for the opening screen, shared layout, anniversary cards,
  letter, catalog, and each game. `head.html` holds metadata and external assets.
- `styles/`: CSS only, including page design, game styles, themes, and contrast
  fixes. `index.css` is generated from the ordered stylesheet list in `page.json`.
- `scripts/ui/`: navigation, opening animation, themes, and interface behavior.
- `scripts/core/`: audio, countdowns, particles, shared dictionary games, drawing,
  love interactions, crossword, and Hanoi.
- `scripts/games/`: individual game controllers.
- `data/countries.js`: country and special-location data used by geography.
- `embeds/solar/`: solar simulator HTML, CSS, scripts, and texture data.
- `embeds/visual-pinball/`: second pinball game's HTML, CSS, physics, controller,
  GPL license, and self-contained source download.
- `page.json`: component order, stylesheet order, and controller loading order.

CSS and controller changes apply immediately when the browser reloads. After
editing HTML components, embedded page HTML, `head.html`, or `page.json`, rebuild:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\atlas-arcade\build.ps1
```

Run this command from the folder containing the main HTML file. The build also
works from another directory when given the absolute path to `build.ps1`. No
package installation or local web server is required.

## Generated files

`generated/ui/` contains parser-time JavaScript adapters for the source HTML.
They allow separate HTML components to load when the main page is opened with
`file://`. Edit the corresponding `ui/*.html` file and rebuild; do not edit an
adapter directly.

`generated/embeds/` registers the two embedded page shells. Their asset base URLs
are computed relative to the adapters, so the folder can be moved. The frames
use `srcdoc` to retain access from the parent page during local-file use. Their
styles and controllers remain separate files. Solar texture data stays in its
own script so canvas pixel reads continue to work with local-file origins.

Scripts deliberately retain their original classic-script order. Do not add
`async`, `defer`, or `type="module"` without adapting shared globals and startup.

Online features keep their existing external services and CDN dependencies.

The build regenerates Visual Pinball's `complete-source.html` and
`download-source.js` from its current HTML, CSS, physics, and controller. Rebuild
after changing those files to update the self-contained source download too.

## Verification

`verification.json` records the static audit and browser checks: all 28 catalog
entries, solar and pinball behavior, desktop/mobile layouts, themes, native
controls, and a playable standalone pinball source export. These checks produced
no uncaught runtime errors. Before/after catalog screenshots were also reviewed.

The older intro test stops at a personalized-text assertion on both the original
backup and the modular page. This refactor preserves the existing page text.
