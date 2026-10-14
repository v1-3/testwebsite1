param()

$ErrorActionPreference = 'Stop'
$projectRoot = $PSScriptRoot
$utf8 = New-Object System.Text.UTF8Encoding($false)
$manifest = [IO.File]::ReadAllText((Join-Path $projectRoot 'page.json')) | ConvertFrom-Json

function Read-Source([string]$relativePath) {
    return [IO.File]::ReadAllText((Join-Path $projectRoot $relativePath))
}

function Write-OutputFile([string]$relativePath, [string]$content) {
    $targetPath = [IO.Path]::GetFullPath((Join-Path $projectRoot $relativePath))
    [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($targetPath)) | Out-Null
    [IO.File]::WriteAllText($targetPath, $content, $utf8)
}

function Js-String([string]$value) {
    # PowerShell JSON encoding preserves Unicode and safely escapes JavaScript strings.
    return ConvertTo-Json -InputObject $value -Compress
}

# Keep the existing self-contained GPL source download in sync with modular edits.
$pinballDirectory = 'embeds/visual-pinball/'
$pinballSource = Read-Source ($pinballDirectory + 'index.html')
$pinballSource = [regex]::Replace($pinballSource, '<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>', [System.Text.RegularExpressions.MatchEvaluator]{
    param($match)
    $cssPath = $pinballDirectory + $match.Groups[1].Value.TrimStart('.', '/')
    return "<style>`n" + (Read-Source $cssPath) + "`n</style>"
})
$pinballSource = [regex]::Replace($pinballSource, '<script\b[^>]*src="([^"]+)"[^>]*>\s*</script>', [System.Text.RegularExpressions.MatchEvaluator]{
    param($match)
    $scriptName = $match.Groups[1].Value.TrimStart('.', '/')
    if ($scriptName -eq 'download-source.js') { return '' }
    $scriptBody = Read-Source ($pinballDirectory + $scriptName)
    $scriptBody = $scriptBody.Replace('</script', '<\/script')
    return "<script>`n" + $scriptBody + "`n</script>"
})
Write-OutputFile ($pinballDirectory + 'complete-source.html') $pinballSource
Write-OutputFile ($pinballDirectory + 'download-source.js') ('// Generated self-contained corresponding source; rebuild after editing the table.' + "`n" + 'window.PJVPSource = ' + (Js-String $pinballSource) + ';' + "`n")

$htmlLines = New-Object 'System.Collections.Generic.List[string]'
$htmlLines.Add('<!DOCTYPE html>')
$htmlLines.Add('<html ' + $manifest.htmlAttributes + '>')
$htmlLines.Add('<head>')
$htmlLines.Add((Read-Source $manifest.head).Trim())
$htmlLines.Add('</head>')
$htmlLines.Add('<body ' + $manifest.bodyAttributes + '>')

foreach ($component in $manifest.ui) {
    $componentName = [IO.Path]::GetFileNameWithoutExtension($component)
    $generatedPath = 'generated/ui/' + $componentName + '.js'
    $adapter = '// Generated from ' + $component + '; edit that HTML file and run build.ps1.' + "`n"
    $adapter += '// Parser-time insertion preserves classic-script order and works with file://.' + "`n"
    $adapter += 'document.write(' + (Js-String (Read-Source $component)) + ');' + "`n"
    Write-OutputFile $generatedPath $adapter
    $htmlLines.Add('<script src="atlas-arcade/' + $generatedPath + '"></script>')
}

foreach ($embed in $manifest.embeds) {
    $generatedPath = 'generated/embeds/' + $embed.name + '.js'
    $embedDirectory = [IO.Path]::GetDirectoryName($embed.path).Replace('\', '/') + '/'
    $adapter = '// Generated from ' + $embed.path + '; edit the source and run build.ps1.' + "`n"
    $adapter += '(function () {' + "`n"
    $adapter += '  const base = new URL(' + (Js-String ('../../' + $embedDirectory)) + ', document.currentScript.src).href;' + "`n"
    $adapter += '  const source = ' + (Js-String (Read-Source $embed.path)) + ';' + "`n"
    $adapter += '  const baseElement = ''<base href="'' + base.replace(/&/g, ''&amp;'').replace(/"/g, ''&quot;'') + ''">'';' + "`n"
    $adapter += '  window.AtlasArcadeEmbeds = window.AtlasArcadeEmbeds || {};' + "`n"
    $adapter += '  window.AtlasArcadeEmbeds[' + (Js-String $embed.name) + '] = source.replace(/<head\b[^>]*>/i, head => head + baseElement);' + "`n"
    $adapter += '})();' + "`n"
    Write-OutputFile $generatedPath $adapter
    $htmlLines.Add('<script src="atlas-arcade/' + $generatedPath + '"></script>')
}

$htmlLines.Add('<script src="atlas-arcade/scripts/ui/load-solar.js"></script>')
foreach ($script in $manifest.scripts) {
    if ($script.external) {
        $htmlLines.Add('<script src="' + $script.external + '"></script>')
    } else {
        $idAttribute = if ($script.id) { ' id="' + $script.id + '"' } else { '' }
        $htmlLines.Add('<script' + $idAttribute + ' src="atlas-arcade/' + $script.path + '"></script>')
    }
}
$htmlLines.Add('</body>')
$htmlLines.Add('</html>')

$imports = foreach ($stylesheet in $manifest.styles) {
    '@import url("' + $stylesheet.Substring('styles/'.Length) + '");'
}
Write-OutputFile 'styles/index.css' (($imports -join "`n") + "`n")
Write-OutputFile $manifest.mainFile (($htmlLines -join "`n") + "`n")
if ($manifest.entryAlias) {
    Write-OutputFile $manifest.entryAlias (($htmlLines -join "`n") + "`n")
}
Write-Output ('Built ' + $manifest.mainFile + ' with ' + $manifest.ui.Count + ' UI components and ' + $manifest.scripts.Count + ' ordered script loads.')
