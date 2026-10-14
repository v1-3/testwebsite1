# Atlas Arcade — complete file map

This document lists all **179 other website files**, with their locations and purposes. It covers the website and its package; unrelated files in Downloads are outside this map. This index is saved at `atlas-arcade/FILE_MAP.md`.

Every path in the tables is relative to the project root: the folder containing `index.html` and `atlas-arcade/`. File links work relative to this document. Keep the main HTML file beside the entire `atlas-arcade` folder when moving the website.

## Where to start

- **Open the website:** `index.html` (or the original named entry page).
- **Change text or markup:** the appropriate `atlas-arcade/ui/*.html` file.
- **Change appearance:** `atlas-arcade/styles/*.css`; the two iframe pages also have their own styles under `atlas-arcade/embeds/`.
- **Change behavior:** the matching controller in `atlas-arcade/scripts/` or the embedded page’s script folder.
- **Change loading order:** `atlas-arcade/page.json`. The CSS overrides and classic scripts rely on their existing order.

## Editing and rebuilding

**UI source — rebuild** and **Configuration — rebuild** files are editable inputs. After changing them, run this command from the website folder:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\atlas-arcade\build.ps1
```

**Source — reload** files apply when the browser reloads. After editing Visual Pinball CSS, physics, or controller code, also rebuild to refresh its downloadable standalone source.

**Generated — rebuild** files are outputs. Edit their source files and run the build. Each generated UI adapter corresponds to the HTML file with the same name under `ui/`. The iframe adapters come from each embedded `index.html`; the main page and CSS import list come from `page.json` and `ui/head.html`.

**Reference audit** files record the refactor and validation results; the normal build does not refresh those historical records. The ZIP is a local packaged copy, excluded from GitHub, and must be refreshed separately after edits. The original backup is preserved for reference.

## How the page loads

Both entry HTML pages load the styles and generated UI adapters, which insert the readable HTML components without requiring a local server. Embedded-page adapters register the solar and second-pinball page shells with the correct asset base URL. The separate controllers then start in their original classic-script order. Online features retain their existing CDN and service dependencies.

## File inventory

### Entry page and package

| File location | What it does | File type / edit action |
|---|---|---|
| [atlas_arcade_geography_clue_text_white_fixed.html](../atlas_arcade_geography_clue_text_white_fixed.html) | Website entry page. Loads the UI adapters, stylesheets, embedded pages, and controllers in the required order. Open this file in your browser. | Generated entry page |
| [atlas-arcade-modular.zip](../atlas-arcade-modular.zip) | Portable package created during the refactor, containing the entry page and atlas-arcade folder as they were before this file map was added. | Local package — excluded from GitHub |
| [index.html](../index.html) | Standard website entry page for GitHub and static hosting. Generated from the same sources as the original named entry page. | Generated entry page |
| [README.md](../README.md) | Repository overview with website entry, file-map/editing links, build instructions, and verification summary. | Documentation |
| [.gitignore](../.gitignore) | Excludes the optional local ZIP package from version control. | Configuration |

### Build, configuration, and documentation

| File location | What it does | File type / edit action |
|---|---|---|
| [atlas-arcade/README.md](README.md) | Editing and rebuild instructions, folder overview, local-file loading explanation, and verification notes. | Documentation / license |
| [atlas-arcade/build.ps1](build.ps1) | Build command. Recreates both entry HTML pages, UI adapters, iframe registrations, stylesheet import list, and self-contained Visual Pinball source download. | Build tool |
| [atlas-arcade/core-split.json](core-split.json) | Extraction audit for shared controllers and geography data: ordered replacement paths, dependencies, record counts, and original/reconstructed hashes. | Reference audit |
| [atlas-arcade/page.json](page.json) | Assembly configuration: HTML attributes, component order, CSS cascade order, embedded pages, and script loading order. | Configuration — rebuild |
| [atlas-arcade/solar-extraction.json](solar-extraction.json) | Solar extraction audit: original iframe hash, decoded file inventory, encoding, and preservation checks. | Reference audit |
| [atlas-arcade/verification.json](verification.json) | Recorded static audit and browser results, plus the historical intro-text check that also fails on the original page. | Reference audit |
| [atlas-arcade/vpinball-extraction.json](vpinball-extraction.json) | Visual Pinball extraction audit: UI, CSS, controller, physics, source-download, license, registry name, and upstream commit. | Reference audit |

### Page and game UI — atlas-arcade/ui/

| File location | What it does | File type / edit action |
|---|---|---|
| [atlas-arcade/ui/anniversary.html](ui/anniversary.html) | Date and countdown cards, route names, personal messages, and related anniversary controls. | UI source — rebuild |
| [atlas-arcade/ui/astronomy-quiz-section.html](ui/astronomy-quiz-section.html) | Astronomy quiz categories, language/options, question panel, answers, and progress. | UI source — rebuild |
| [atlas-arcade/ui/background.html](ui/background.html) | Particle canvas and ambient background layer. | UI source — rebuild |
| [atlas-arcade/ui/block-blasters-section.html](ui/block-blasters-section.html) | Block Blasters grid, piece tray, score, and action controls. | UI source — rebuild |
| [atlas-arcade/ui/breakout-section.html](ui/breakout-section.html) | Breakout canvas, score/lives/level displays, launch/pause controls, and mobile paddle controls. | UI source — rebuild |
| [atlas-arcade/ui/crossword-section.html](ui/crossword-section.html) | Crossword board, clue panels, language/difficulty controls, and puzzle actions. | UI source — rebuild |
| [atlas-arcade/ui/draw-game-section.html](ui/draw-game-section.html) | Drawing canvas, color/tool buttons, prompt and guessing controls, status, and drawing-link sharing interface. | UI source — rebuild |
| [atlas-arcade/ui/earth-game-section.html](ui/earth-game-section.html) | 360-degree exploration interface, map guessing area, distance/score panels, and round controls. | UI source — rebuild |
| [atlas-arcade/ui/flag-game-section.html](ui/flag-game-section.html) | Flag quiz image area, answer input, timer, and score controls. | UI source — rebuild |
| [atlas-arcade/ui/flap-bird-section.html](ui/flap-bird-section.html) | Flap Bird playfield, flight controls, score/best score, and start/restart overlay. | UI source — rebuild |
| [atlas-arcade/ui/game-library.html](ui/game-library.html) | Game picker, catalog headings, theme controls, and the stage where game sections are moved. | UI source — rebuild |
| [atlas-arcade/ui/geography-game-section.html](ui/geography-game-section.html) | Country/location guessing input, clue cards, round controls, and status display. | UI source — rebuild |
| [atlas-arcade/ui/hanoi-section.html](ui/hanoi-section.html) | Towers of Hanoi board, disk-count controls, move counter, and restart button. | UI source — rebuild |
| [atlas-arcade/ui/head.html](ui/head.html) | Page title, metadata, font/CDN links, and early theme/Tailwind script tags. | UI source — rebuild |
| [atlas-arcade/ui/hill-climb-section.html](ui/hill-climb-section.html) | Hill-driving canvas, vehicle readouts, fuel/score panels, and driving controls. | UI source — rebuild |
| [atlas-arcade/ui/jigsaw-section.html](ui/jigsaw-section.html) | Image-search studio, puzzle workspace, difficulty/tools, and jigsaw controls. | UI source — rebuild |
| [atlas-arcade/ui/letter.html](ui/letter.html) | Personal letter/quote card, love interactions, and Spotify playlist embed. | UI source — rebuild |
| [atlas-arcade/ui/literal-guess-section.html](ui/literal-guess-section.html) | Multilingual animal/object riddle interface, clues, answer input, and game controls. | UI source — rebuild |
| [atlas-arcade/ui/love-toast.html](ui/love-toast.html) | Container for floating love-message notifications. | UI source — rebuild |
| [atlas-arcade/ui/main-close.html](ui/main-close.html) | Closing tag for the shared main-content container. | UI source — rebuild |
| [atlas-arcade/ui/main-open.html](ui/main-open.html) | Opening main-content container and its layout classes. | UI source — rebuild |
| [atlas-arcade/ui/map-game-section.html](ui/map-game-section.html) | Country-map quiz interface and its embedded SVG country shapes. | UI source — rebuild |
| [atlas-arcade/ui/nasa-eyes-section.html](ui/nasa-eyes-section.html) | Official NASA Eyes iframe, Solar System/Earth tabs, explanatory guide, and external links. | UI source — rebuild |
| [atlas-arcade/ui/opening.html](ui/opening.html) | Opening letter dialog, entry button, envelope artwork, and skip control. | UI source — rebuild |
| [atlas-arcade/ui/parking-jam.html](ui/parking-jam.html) | Parking-jam board, vehicle controls, level selection, and move/status displays. | UI source — rebuild |
| [atlas-arcade/ui/pinball-3d-section.html](ui/pinball-3d-section.html) | Original Pinball Odyssey playfield, flipper/plunger controls, HUD, and game overlays. | UI source — rebuild |
| [atlas-arcade/ui/pour-sort.html](ui/pour-sort.html) | Color-sorting containers, difficulty controls, move counter, and restart actions. | UI source — rebuild |
| [atlas-arcade/ui/rubiks-cube-section.html](ui/rubiks-cube-section.html) | Interactive Rubik cube viewport, cube controls, move readouts, and help. | UI source — rebuild |
| [atlas-arcade/ui/site-tools.html](ui/site-tools.html) | Top navigation, light/dark switch, sound indicator, playlist link, and credit. | UI source — rebuild |
| [atlas-arcade/ui/skeeball-section.html](ui/skeeball-section.html) | Skee-Ball canvas, aiming/roll controls, score, and ball history. | UI source — rebuild |
| [atlas-arcade/ui/solar-system-section.html](ui/solar-system-section.html) | Outer solar-simulator section and iframe holder; the simulator itself lives under embeds/solar. | UI source — rebuild |
| [atlas-arcade/ui/space-memory-section.html](ui/space-memory-section.html) | Space-themed matching-card board, language/difficulty controls, timer, and score. | UI source — rebuild |
| [atlas-arcade/ui/tetris-section.html](ui/tetris-section.html) | Tetris board/canvas, score and preview panels, keyboard hints, and mobile controls. | UI source — rebuild |
| [atlas-arcade/ui/visual-pinball-section.html](ui/visual-pinball-section.html) | Outer second-pinball section and iframe holder; the table itself lives under embeds/visual-pinball. | UI source — rebuild |
| [atlas-arcade/ui/whack-a-mole-section.html](ui/whack-a-mole-section.html) | Whack-a-Mole playfield, timer, score, difficulty, and action controls. | UI source — rebuild |
| [atlas-arcade/ui/wordle-section.html](ui/wordle-section.html) | Wordle/Termo controls, letter grid, keyboard, and status display. | UI source — rebuild |
| [atlas-arcade/ui/wordsearch-section.html](ui/wordsearch-section.html) | Word-search grid, word list, language/difficulty controls, and round status. | UI source — rebuild |

### Shared controllers — atlas-arcade/scripts/core/

| File location | What it does | File type / edit action |
|---|---|---|
| [atlas-arcade/scripts/core/audio.js](scripts/core/audio.js) | Web Audio music/chord generation, click sounds, activity tracking, and sound-indicator updates. Defines music functions used by the opening animation. | Source — reload |
| [atlas-arcade/scripts/core/countdown-and-letter.js](scripts/core/countdown-and-letter.js) | Main countdown to 27 January 2028, elapsed/progress readouts, romantic quote rotation, and related letter updates. | Source — reload |
| [atlas-arcade/scripts/core/crossword.js](scripts/core/crossword.js) | Crossword generation, multilingual dictionary lookups, clue/board rendering, answer checking, and puzzle controls. | Source — reload |
| [atlas-arcade/scripts/core/drawing.js](scripts/core/drawing.js) | Drawing-game canvas behavior, strokes/tools, prompts, round state, and shared drawing links. | Source — reload |
| [atlas-arcade/scripts/core/hanoi.js](scripts/core/hanoi.js) | Towers of Hanoi rules, disk movement, minimum-move calculation, board rendering, and game completion. | Source — reload |
| [atlas-arcade/scripts/core/love-interactions.js](scripts/core/love-interactions.js) | Love-button clicks, love counter, randomized affectionate messages, toast notifications, and heart bursts. | Source — reload |
| [atlas-arcade/scripts/core/particles.js](scripts/core/particles.js) | Animated background particles/hearts and the shared createHeartBurst effect. | Source — reload |
| [atlas-arcade/scripts/core/wordle.js](scripts/core/wordle.js) | Wordle gameplay, multilingual word lists, keyboard/input handling, and shared dictionary globals used by other word games. | Source — reload |

### Game controllers — atlas-arcade/scripts/games/

| File location | What it does | File type / edit action |
|---|---|---|
| [atlas-arcade/scripts/games/astronomy-quiz.js](scripts/games/astronomy-quiz.js) | Astronomy quiz questions/translations, categories, answer checking, scoring, and round progression. | Source — reload |
| [atlas-arcade/scripts/games/block-blasters.js](scripts/games/block-blasters.js) | 8 by 8 block-placement rules, piece generation, row/column clearing, scoring, and input. | Source — reload |
| [atlas-arcade/scripts/games/breakout.js](scripts/games/breakout.js) | Breakout paddle/ball physics, bricks, level progression, lives, power-ups, and controls. | Source — reload |
| [atlas-arcade/scripts/games/country-map.js](scripts/games/country-map.js) | Country-map quiz logic, map selection, multilingual answers, timers, and scoring. | Source — reload |
| [atlas-arcade/scripts/games/earth-explorer.js](scripts/games/earth-explorer.js) | 360-degree exploration rounds, Street View links, MapLibre map guesses, distance calculation, and scoring. | Source — reload |
| [atlas-arcade/scripts/games/flags.js](scripts/games/flags.js) | Country flags and multilingual aliases, timed flag questions, answer validation, and scoring. | Source — reload |
| [atlas-arcade/scripts/games/flap-bird.js](scripts/games/flap-bird.js) | Flap Bird flight physics, obstacle generation, collision detection, input, scoring, and saved best score. | Source — reload |
| [atlas-arcade/scripts/games/geography.js](scripts/games/geography.js) | Country/location guessing game: enriches AtlasCountryData, selects clues, checks aliases, and manages rounds. | Source — reload |
| [atlas-arcade/scripts/games/hill-climb.js](scripts/games/hill-climb.js) | Hill-driving physics, generated terrain, fuel/vehicle controls, collision handling, and score. | Source — reload |
| [atlas-arcade/scripts/games/jigsaw.js](scripts/games/jigsaw.js) | Wikimedia image search, puzzle creation, piece interaction, workspace tools, and completion checks. | Source — reload |
| [atlas-arcade/scripts/games/literal-guess.js](scripts/games/literal-guess.js) | Multilingual animal/object riddles, online expansion of available material, hints, answers, and scoring. | Source — reload |
| [atlas-arcade/scripts/games/nasa-eyes.js](scripts/games/nasa-eyes.js) | NASA Eyes Solar System/Earth tab selection, iframe URL/loading state, guide controls, and external launch options. | Source — reload |
| [atlas-arcade/scripts/games/parking-jam.js](scripts/games/parking-jam.js) | Solvable parking-jam levels, vehicle movement, difficulty selection, move counting, and win checks. | Source — reload |
| [atlas-arcade/scripts/games/pinball.js](scripts/games/pinball.js) | Original Pinball Odyssey table physics, flippers, launcher, targets, scoring, audio, and game state. | Source — reload |
| [atlas-arcade/scripts/games/pour-sort.js](scripts/games/pour-sort.js) | Liquid/color-sorting levels, legal pours, container rendering, move counting, and completion checks. | Source — reload |
| [atlas-arcade/scripts/games/rubiks-cube.js](scripts/games/rubiks-cube.js) | Local 3D Rubik cube state, layer rotations, scrambling, move tracking, and view controls. | Source — reload |
| [atlas-arcade/scripts/games/skeeball.js](scripts/games/skeeball.js) | Skee-Ball ball flight/roll physics, aiming, lane scoring, game progression, and input. | Source — reload |
| [atlas-arcade/scripts/games/space-memory.js](scripts/games/space-memory.js) | Space matching-card gameplay, local SVG illustrations, language selection, timing, and scoring. | Source — reload |
| [atlas-arcade/scripts/games/tetris.js](scripts/games/tetris.js) | Falling-block gameplay, seven-bag piece selection, rotations, line clearing, scoring, and mobile/keyboard input. | Source — reload |
| [atlas-arcade/scripts/games/visual-pinball-bridge.js](scripts/games/visual-pinball-bridge.js) | Connects the parent page to the second pinball iframe: srcdoc loading, theme/language state, activation, and iframe height messages. | Source — reload |
| [atlas-arcade/scripts/games/whack-a-mole.js](scripts/games/whack-a-mole.js) | Mole spawning, hit/miss handling, timing, difficulty, scoring, and game state. | Source — reload |
| [atlas-arcade/scripts/games/wordsearch.js](scripts/games/wordsearch.js) | Multilingual word-search puzzle generation, selection checking, word-list updates, and round controls. | Source — reload |

### Interface controllers — atlas-arcade/scripts/ui/

| File location | What it does | File type / edit action |
|---|---|---|
| [atlas-arcade/scripts/ui/anniversary-countdowns.js](scripts/ui/anniversary-countdowns.js) | Updates the three anniversary/birthday date cards and their countdowns using the visitor’s local calendar. | Source — reload |
| [atlas-arcade/scripts/ui/game-picker.js](scripts/ui/game-picker.js) | Moves existing game sections into one stage, switches visibility, resolves NASA aliases and URL/shared-drawing links, and triggers resize after selection. | Source — reload |
| [atlas-arcade/scripts/ui/game-themes.js](scripts/ui/game-themes.js) | Applies per-game color palettes, updates theme-button states, and notifies supported game renderers. | Source — reload |
| [atlas-arcade/scripts/ui/interface.js](scripts/ui/interface.js) | Catalog search, accessible labels, result counts, keyboard shortcuts, game guides, toolbar, fullscreen, and current-game metadata. | Source — reload |
| [atlas-arcade/scripts/ui/load-solar.js](scripts/ui/load-solar.js) | Assigns the generated solar-page HTML to the solar iframe srcdoc so local parent/frame access is preserved. | Source — reload |
| [atlas-arcade/scripts/ui/opening.js](scripts/ui/opening.js) | Opening letter animation, entry/skip actions, focus trapping, background inertness, sound, and final focus restoration. | Source — reload |
| [atlas-arcade/scripts/ui/postcard-catalog.js](scripts/ui/postcard-catalog.js) | Builds cards and category filters from the game selector, adds icons/descriptions, updates counts, and handles catalog/game navigation. | Source — reload |
| [atlas-arcade/scripts/ui/reference-helpers.js](scripts/ui/reference-helpers.js) | Updates route progress, plane position, percentage, and remaining days; toggles the embedded Spotify playlist. | Source — reload |
| [atlas-arcade/scripts/ui/solar-resize.js](scripts/ui/solar-resize.js) | Measures the solar iframe content and adjusts its wrapper/frame height at responsive breakpoints. | Source — reload |
| [atlas-arcade/scripts/ui/tailwind-config.js](scripts/ui/tailwind-config.js) | Custom Tailwind colors, fonts, animations, and keyframes for the page. | Source — reload |
| [atlas-arcade/scripts/ui/theme-controls.js](scripts/ui/theme-controls.js) | Light/dark toggle, button label/icon/state, and saved site-theme preference. | Source — reload |
| [atlas-arcade/scripts/ui/theme-init.js](scripts/ui/theme-init.js) | Sets the initial closed entry state and restores the saved light/dark theme before the page renders. | Source — reload |

### Shared data — atlas-arcade/data/

| File location | What it does | File type / edit action |
|---|---|---|
| [atlas-arcade/data/countries.js](data/countries.js) | Geography dataset: 197 countries and 36 special locations. Defines AtlasCountryData for the geography game. | Source — reload |

### Page and game styles — atlas-arcade/styles/

| File location | What it does | File type / edit action |
|---|---|---|
| [atlas-arcade/styles/atlas-arcade-button-contrast-final.css](styles/atlas-arcade-button-contrast-final.css) | Enabled/disabled button-text and selected-region contrast corrections. | Source — reload |
| [atlas-arcade/styles/atlas-arcade-crossword-border-themes.css](styles/atlas-arcade-crossword-border-themes.css) | White crossword writing surfaces with dark letters; theme and answer feedback are applied to cell borders. | Source — reload |
| [atlas-arcade/styles/atlas-arcade-drawing-dark-mode-visibility.css](styles/atlas-arcade-drawing-dark-mode-visibility.css) | White drawing paper, accurate paint/swatch colors, removal of theme filters, and eraser-preview positioning. | Source — reload |
| [atlas-arcade/styles/atlas-arcade-final-geography-hint-contrast-fix.css](styles/atlas-arcade-final-geography-hint-contrast-fix.css) | Later geography-card override, including text-fill color, to keep inherited rules from darkening clue text. | Source — reload |
| [atlas-arcade/styles/atlas-arcade-game-specific-contrast-repair.css](styles/atlas-arcade-game-specific-contrast-repair.css) | Targeted contrast repairs for flags/maps, drawing, parking vehicles, Tetris, Rubik HUD, original pinball, and Flap Bird. | Source — reload |
| [atlas-arcade/styles/atlas-arcade-geography-clue-readability-fix.css](styles/atlas-arcade-geography-clue-readability-fix.css) | Blue geography clue cards with light text, category labels, and numbered badges. | Source — reload |
| [atlas-arcade/styles/atlas-arcade-lightmode-contrast-fixes.css](styles/atlas-arcade-lightmode-contrast-fixes.css) | Broad light-mode surface and text corrections for shells, panels, controls, statistics, and selected states. | Source — reload |
| [atlas-arcade/styles/atlas-arcade-ui-css.css](styles/atlas-arcade-ui-css.css) | Main Atlas Arcade interface design: tokens, catalog/search layout, toolbar, panels, theme dock, fullscreen, and mobile layout. | Source — reload |
| [atlas-arcade/styles/atlas-arcade-white-mode-readability-fixes.css](styles/atlas-arcade-white-mode-readability-fixes.css) | Further light-mode readability fixes for placeholders, labels, chips, selects, white panels, and feedback states. | Source — reload |
| [atlas-arcade/styles/atlas-dark-text-contrast.css](styles/atlas-dark-text-contrast.css) | Dark-mode surfaces/text for navigation, catalog, game headings, settings, and inputs, with white-paper/colored-card exceptions. | Source — reload |
| [atlas-arcade/styles/atlas-letter-reference-update.css](styles/atlas-letter-reference-update.css) | Ruled-stationery quote card styling and companion-card spacing/typography. | Source — reload |
| [atlas-arcade/styles/atlas-verified-surface-contrast.css](styles/atlas-verified-surface-contrast.css) | Later component-level contrast fixes for panels, controls, NASA previews, quiz answers, overlays, letter feedback, and theme dock. | Source — reload |
| [atlas-arcade/styles/base.css](styles/base.css) | Original shared appearance and game layouts: backgrounds, particles, toasts, boards, maps, controls, and older solar/NASA views. | Source — reload |
| [atlas-arcade/styles/flap-bird-css.css](styles/flap-bird-css.css) | Flap Bird canvas frame, selectors, statistics, overlays, and responsive controls. | Source — reload |
| [atlas-arcade/styles/gg-restored-game-styles.css](styles/gg-restored-game-styles.css) | Shared gg-* layout and controls for restored Wordle, drawing, geography, flags, and country-map games. | Source — reload |
| [atlas-arcade/styles/index.css](styles/index.css) | Generated CSS entry point; imports the other stylesheets in the cascade order defined by page.json. | Generated — rebuild |
| [atlas-arcade/styles/pj-anniversary-redesign.css](styles/pj-anniversary-redesign.css) | Three date/countdown cards, steady digits, celebration states, and responsive layout. | Source — reload |
| [atlas-arcade/styles/pj-breakout-style.css](styles/pj-breakout-style.css) | Breakout playfield frame, layout, controls, statistics, overlays, and component colors. | Source — reload |
| [atlas-arcade/styles/pj-opening-scene.css](styles/pj-opening-scene.css) | Opening dialog envelope, seal, typography, opening motion, and reduced-motion layout. | Source — reload |
| [atlas-arcade/styles/pj-pinball-style.css](styles/pj-pinball-style.css) | Original Pinball Odyssey table surround, scoreboard, controls, instructions, and light/dark colors. | Source — reload |
| [atlas-arcade/styles/pj-reference-style.css](styles/pj-reference-style.css) | Home-page composition and typography: boarding ticket, route, countdown digits, letter layout, and companion cards. | Source — reload |
| [atlas-arcade/styles/pj-skeeball-style.css](styles/pj-skeeball-style.css) | Skee-Ball lane frame, score, aiming/strength controls, instructions, overlays, and color pairings. | Source — reload |
| [atlas-arcade/styles/pj-whackamole-style.css](styles/pj-whackamole-style.css) | Whack-a-Mole board, holes/moles, statistics, controls, round overlays, and responsive colors. | Source — reload |
| [atlas-arcade/styles/postcard-edition-css.css](styles/postcard-edition-css.css) | Postal design foundation: paper/day-night colors, airmail details, boarding pass, date stamps, catalog cards, and envelope. | Source — reload |
| [atlas-arcade/styles/solar-embed.css](styles/solar-embed.css) | Outer solar iframe container, desktop sizing, and expanded/mobile layout; simulator internals have their own CSS. | Source — reload |
| [atlas-arcade/styles/static-ui.css](styles/static-ui.css) | CSS classes replacing the 13 original inline declarations, including color swatches, progress widths, and second-pinball iframe sizing. | Source — reload |
| [atlas-arcade/styles/tp-deep-game-themes-css.css](styles/tp-deep-game-themes-css.css) | Theme colors inside playfields: blocks, cars, liquids, Hanoi disks, cube stickers, memory cards, maps, and puzzle states. | Source — reload |
| [atlas-arcade/styles/tp-game-text-palettes.css](styles/tp-game-text-palettes.css) | Text-color tokens for non-original game themes, including dark playfields and light paper panels. | Source — reload |
| [atlas-arcade/styles/tp-game-themes-css.css](styles/tp-game-themes-css.css) | Theme dock, themed stage backgrounds/borders, and surrounding game panels. | Source — reload |
| [atlas-arcade/styles/tp-heart-game-text-fixes.css](styles/tp-heart-game-text-fixes.css) | Floating-heart visibility and inherited text-color fixes for game controls, swatches, and letter grids. | Source — reload |
| [atlas-arcade/styles/tp-top-tools-style.css](styles/tp-top-tools-style.css) | Compact top utility row, credit, theme switch, and sound indicator. | Source — reload |

### Solar simulator — atlas-arcade/embeds/solar/

| File location | What it does | File type / edit action |
|---|---|---|
| [atlas-arcade/embeds/solar/data/textures.js](embeds/solar/data/textures.js) | Eleven embedded texture data URLs in a dedicated catalog; keeps local-file canvas pixel reads untainted. | Source — reload |
| [atlas-arcade/embeds/solar/index.html](embeds/solar/index.html) | Complete solar-simulator UI document with links to its separate CSS, data, and ordered classic scripts. | UI source — rebuild |
| [atlas-arcade/embeds/solar/scripts/focus-and-diagnostics.js](embeds/solar/scripts/focus-and-diagnostics.js) | Focused planet/moon rendering and diagnostics, plus local-time, zoom, and view adjustments that extend the base simulator. | Source — reload |
| [atlas-arcade/embeds/solar/scripts/knowledge-controller.js](embeds/solar/scripts/knowledge-controller.js) | Planet/star atmosphere, elemental composition, internal-layer explanations, source links, and knowledge-panel updates. | Source — reload |
| [atlas-arcade/embeds/solar/scripts/magnetosphere-controller.js](embeds/solar/scripts/magnetosphere-controller.js) | Magnetosphere/heliosphere diagram drawing, solar-wind effects, view fitting, labels, and related diagnostics. | Source — reload |
| [atlas-arcade/embeds/solar/scripts/magnetosphere-profiles.js](embeds/solar/scripts/magnetosphere-profiles.js) | Educational magnetic-environment profiles, geometry parameters, and explanatory facts for the supported bodies. | Source — reload |
| [atlas-arcade/embeds/solar/scripts/simulation.js](embeds/solar/scripts/simulation.js) | Simulator state, planetary data, orbital/temperature/composition calculations, canvas rendering, custom objects, and base controls. | Source — reload |
| [atlas-arcade/embeds/solar/styles/knowledge.css](embeds/solar/styles/knowledge.css) | Knowledge-panel typography, composition/layer layouts, explanatory content, and source-link styling. | Source — reload |
| [atlas-arcade/embeds/solar/styles/magnetosphere.css](embeds/solar/styles/magnetosphere.css) | Magnetic-environment panels, diagrams, legend/readout styling, and layout adjustments. | Source — reload |
| [atlas-arcade/embeds/solar/styles/simulator.css](embeds/solar/styles/simulator.css) | Core simulator layout, canvas, sidebars, object controls, readouts, and responsive styles. | Source — reload |

### Second pinball — atlas-arcade/embeds/visual-pinball/

| File location | What it does | File type / edit action |
|---|---|---|
| [atlas-arcade/embeds/visual-pinball/COPYING-GPL-3.0.txt](embeds/visual-pinball/COPYING-GPL-3.0.txt) | GNU GPL version 3 license text shipped with the adapted physics and corresponding source. | Documentation / license |
| [atlas-arcade/embeds/visual-pinball/complete-source.html](embeds/visual-pinball/complete-source.html) | Generated self-contained, playable source-download HTML with the current CSS, physics, and controller embedded. | Generated — rebuild |
| [atlas-arcade/embeds/visual-pinball/controller.js](embeds/visual-pinball/controller.js) | Renders and operates the second pinball table: input, HUD, language/themes, audio, game lifecycle, parent messages, and source download. | Source — reload |
| [atlas-arcade/embeds/visual-pinball/download-source.js](embeds/visual-pinball/download-source.js) | Generated registry defining PJVPSource from complete-source.html for the table’s source-download action. | Generated — rebuild |
| [atlas-arcade/embeds/visual-pinball/index.html](embeds/visual-pinball/index.html) | Second pinball’s complete UI shell, linked stylesheet, and ordered physics/source-registry/controller script tags. | UI source — rebuild |
| [atlas-arcade/embeds/visual-pinball/physics.js](embeds/visual-pinball/physics.js) | Visual Pinball-derived browser physics engine: collision geometry, flippers, ball motion, targets, bumpers, and table state. | Source — reload |
| [atlas-arcade/embeds/visual-pinball/styles.css](embeds/visual-pinball/styles.css) | Orbitarium table UI, paired light/dark colors, controls, score panels, overlays, and responsive layout. | Source — reload |

### Generated UI adapters — atlas-arcade/generated/ui/

| File location | What it does | File type / edit action |
|---|---|---|
| [atlas-arcade/generated/ui/anniversary.js](generated/ui/anniversary.js) | Generated browser adapter that inserts anniversary UI from atlas-arcade/ui/anniversary.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/astronomy-quiz-section.js](generated/ui/astronomy-quiz-section.js) | Generated browser adapter that inserts astronomy-quiz-section UI from atlas-arcade/ui/astronomy-quiz-section.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/background.js](generated/ui/background.js) | Generated browser adapter that inserts background UI from atlas-arcade/ui/background.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/block-blasters-section.js](generated/ui/block-blasters-section.js) | Generated browser adapter that inserts block-blasters-section UI from atlas-arcade/ui/block-blasters-section.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/breakout-section.js](generated/ui/breakout-section.js) | Generated browser adapter that inserts breakout-section UI from atlas-arcade/ui/breakout-section.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/crossword-section.js](generated/ui/crossword-section.js) | Generated browser adapter that inserts crossword-section UI from atlas-arcade/ui/crossword-section.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/draw-game-section.js](generated/ui/draw-game-section.js) | Generated browser adapter that inserts draw-game-section UI from atlas-arcade/ui/draw-game-section.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/earth-game-section.js](generated/ui/earth-game-section.js) | Generated browser adapter that inserts earth-game-section UI from atlas-arcade/ui/earth-game-section.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/flag-game-section.js](generated/ui/flag-game-section.js) | Generated browser adapter that inserts flag-game-section UI from atlas-arcade/ui/flag-game-section.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/flap-bird-section.js](generated/ui/flap-bird-section.js) | Generated browser adapter that inserts flap-bird-section UI from atlas-arcade/ui/flap-bird-section.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/game-library.js](generated/ui/game-library.js) | Generated browser adapter that inserts game-library UI from atlas-arcade/ui/game-library.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/geography-game-section.js](generated/ui/geography-game-section.js) | Generated browser adapter that inserts geography-game-section UI from atlas-arcade/ui/geography-game-section.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/hanoi-section.js](generated/ui/hanoi-section.js) | Generated browser adapter that inserts hanoi-section UI from atlas-arcade/ui/hanoi-section.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/hill-climb-section.js](generated/ui/hill-climb-section.js) | Generated browser adapter that inserts hill-climb-section UI from atlas-arcade/ui/hill-climb-section.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/jigsaw-section.js](generated/ui/jigsaw-section.js) | Generated browser adapter that inserts jigsaw-section UI from atlas-arcade/ui/jigsaw-section.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/letter.js](generated/ui/letter.js) | Generated browser adapter that inserts letter UI from atlas-arcade/ui/letter.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/literal-guess-section.js](generated/ui/literal-guess-section.js) | Generated browser adapter that inserts literal-guess-section UI from atlas-arcade/ui/literal-guess-section.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/love-toast.js](generated/ui/love-toast.js) | Generated browser adapter that inserts love-toast UI from atlas-arcade/ui/love-toast.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/main-close.js](generated/ui/main-close.js) | Generated browser adapter that inserts main-close UI from atlas-arcade/ui/main-close.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/main-open.js](generated/ui/main-open.js) | Generated browser adapter that inserts main-open UI from atlas-arcade/ui/main-open.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/map-game-section.js](generated/ui/map-game-section.js) | Generated browser adapter that inserts map-game-section UI from atlas-arcade/ui/map-game-section.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/nasa-eyes-section.js](generated/ui/nasa-eyes-section.js) | Generated browser adapter that inserts nasa-eyes-section UI from atlas-arcade/ui/nasa-eyes-section.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/opening.js](generated/ui/opening.js) | Generated browser adapter that inserts opening UI from atlas-arcade/ui/opening.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/parking-jam.js](generated/ui/parking-jam.js) | Generated browser adapter that inserts parking-jam UI from atlas-arcade/ui/parking-jam.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/pinball-3d-section.js](generated/ui/pinball-3d-section.js) | Generated browser adapter that inserts pinball-3d-section UI from atlas-arcade/ui/pinball-3d-section.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/pour-sort.js](generated/ui/pour-sort.js) | Generated browser adapter that inserts pour-sort UI from atlas-arcade/ui/pour-sort.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/rubiks-cube-section.js](generated/ui/rubiks-cube-section.js) | Generated browser adapter that inserts rubiks-cube-section UI from atlas-arcade/ui/rubiks-cube-section.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/site-tools.js](generated/ui/site-tools.js) | Generated browser adapter that inserts site-tools UI from atlas-arcade/ui/site-tools.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/skeeball-section.js](generated/ui/skeeball-section.js) | Generated browser adapter that inserts skeeball-section UI from atlas-arcade/ui/skeeball-section.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/solar-system-section.js](generated/ui/solar-system-section.js) | Generated browser adapter that inserts solar-system-section UI from atlas-arcade/ui/solar-system-section.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/space-memory-section.js](generated/ui/space-memory-section.js) | Generated browser adapter that inserts space-memory-section UI from atlas-arcade/ui/space-memory-section.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/tetris-section.js](generated/ui/tetris-section.js) | Generated browser adapter that inserts tetris-section UI from atlas-arcade/ui/tetris-section.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/visual-pinball-section.js](generated/ui/visual-pinball-section.js) | Generated browser adapter that inserts visual-pinball-section UI from atlas-arcade/ui/visual-pinball-section.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/whack-a-mole-section.js](generated/ui/whack-a-mole-section.js) | Generated browser adapter that inserts whack-a-mole-section UI from atlas-arcade/ui/whack-a-mole-section.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/wordle-section.js](generated/ui/wordle-section.js) | Generated browser adapter that inserts wordle-section UI from atlas-arcade/ui/wordle-section.html. Rebuild after editing that HTML source. | Generated — rebuild |
| [atlas-arcade/generated/ui/wordsearch-section.js](generated/ui/wordsearch-section.js) | Generated browser adapter that inserts wordsearch-section UI from atlas-arcade/ui/wordsearch-section.html. Rebuild after editing that HTML source. | Generated — rebuild |

### Generated iframe adapters — atlas-arcade/generated/embeds/

| File location | What it does | File type / edit action |
|---|---|---|
| [atlas-arcade/generated/embeds/solar.js](generated/embeds/solar.js) | Generated solar UI registration. Adds the absolute asset base URL and stores the HTML in AtlasArcadeEmbeds.solar. | Generated — rebuild |
| [atlas-arcade/generated/embeds/visualPinball.js](generated/embeds/visualPinball.js) | Generated second-pinball UI registration. Adds the absolute asset base URL and stores the HTML in AtlasArcadeEmbeds.visualPinball. | Generated — rebuild |

### Original backup — atlas-arcade/backup/

| File location | What it does | File type / edit action |
|---|---|---|
| [atlas-arcade/backup/original.html](backup/original.html) | Unchanged original self-contained website saved before the refactor. Reference or restore point; the current page does not load it. | Backup |

