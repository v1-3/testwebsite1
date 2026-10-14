# Atlas Arcade

Open [index.html](index.html) to use the website. Keep it beside the entire
`atlas-arcade` folder when moving the project.

[Complete file map](atlas-arcade/FILE_MAP.md) lists every website file and its
purpose. [Editing guide](atlas-arcade/README.md) explains the source structure
and build process.

After editing UI HTML or the assembly manifest, rebuild from the project root:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\atlas-arcade\build.ps1
```

The build updates both `index.html` and the original named entry page. Styles,
controllers, data, and the two embedded game pages live in separate files.

Browser verification covers all 28 game entries, desktop/mobile layouts, themes,
solar simulation, both pinball games, and their native controls. Details are in
[verification.json](atlas-arcade/verification.json).
