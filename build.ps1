# StackScope Build Script for Windows PowerShell
# This script creates a production-ready ZIP file for Chrome Web Store submission

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  StackScope Build Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get version from manifest.json
$manifestPath = "manifest.json"
if (Test-Path $manifestPath) {
    $manifest = Get-Content $manifestPath | ConvertFrom-Json
    $version = $manifest.version
    Write-Host "Building version: $version" -ForegroundColor Green
} else {
    Write-Host "Error: manifest.json not found!" -ForegroundColor Red
    exit 1
}

# Output filename
$outputFile = ".$version.zip"

# Check if output file already exists
if (Test-Path $outputFile) {
    Write-Host ""
    Write-Host "Warning: $outputFile already exists!" -ForegroundColor Yellow
    $overwrite = Read-Host "Overwrite? (y/n)"
    if ($overwrite -ne "y") {
        Write-Host "Build cancelled." -ForegroundColor Yellow
        exit 0
    }
    Remove-Item $outputFile
}

Write-Host ""
Write-Host "Pre-build checks..." -ForegroundColor Cyan

# Check for placeholder icons warning
if (Test-Path "PLACEHOLDER_ICONS.txt") {
    Write-Host ""
    Write-Host "WARNING: Placeholder icons detected!" -ForegroundColor Yellow
    Write-Host "You should replace icons before publishing to Chrome Web Store." -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne "y") {
        Write-Host "Build cancelled. Please replace icons first." -ForegroundColor Yellow
        exit 0
    }
}

# Check for required files
$requiredFiles = @(
    "manifest.json",
    "background.js",
    "detector.js",
    "fingerprints.json",
    "popup.html",
    "popup.css",
    "popup.js",
    "LICENSE",
    "README.md"
)

$missingFiles = @()
foreach ($file in $requiredFiles) {
    if (-not (Test-Path $file)) {
        $missingFiles += $file
    }
}

if ($missingFiles.Count -gt 0) {
    Write-Host ""
    Write-Host "Error: Missing required files:" -ForegroundColor Red
    foreach ($file in $missingFiles) {
        Write-Host "  - $file" -ForegroundColor Red
    }
    exit 1
}

Write-Host "✓ All required files present" -ForegroundColor Green

# Check for icons directory
if (-not (Test-Path "icons")) {
    Write-Host "Warning: icons directory not found!" -ForegroundColor Yellow
} else {
    Write-Host "✓ Icons directory present" -ForegroundColor Green
}

Write-Host ""
Write-Host "Creating ZIP file..." -ForegroundColor Cyan

# Files and directories to include
$includeItems = @(
    "manifest.json",
    "background.js",
    "detector.js",
    "fingerprints.json",
    "popup.html",
    "popup.css",
    "popup.js",
    "privacy_policy.html",
    "icons",
    "LICENSE",
    "README.md"
)

# Create temporary directory
$tempDir = "temp_build_$version"
if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

# Copy files to temp directory
foreach ($item in $includeItems) {
    if (Test-Path $item) {
        if (Test-Path $item -PathType Container) {
            # Directory
            Copy-Item $item -Destination $tempDir -Recurse
            Write-Host "  + $item/" -ForegroundColor Gray
        } else {
            # File
            Copy-Item $item -Destination $tempDir
            Write-Host "  + $item" -ForegroundColor Gray
        }
    }
}

# Create ZIP file
try {
    Compress-Archive -Path "$tempDir\*" -DestinationPath $outputFile -Force
    Write-Host ""
    Write-Host "✓ ZIP file created successfully!" -ForegroundColor Green
} catch {
    Write-Host ""
    Write-Host "Error creating ZIP file: $_" -ForegroundColor Red
    Remove-Item $tempDir -Recurse -Force
    exit 1
}

# Clean up temp directory
Remove-Item $tempDir -Recurse -Force

# Get file size
$fileSize = (Get-Item $outputFile).Length
$fileSizeMB = [math]::Round($fileSize / 1MB, 2)

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Build Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Output file: $outputFile" -ForegroundColor White
Write-Host "File size: $fileSizeMB MB" -ForegroundColor White
Write-Host ""

# Final checklist
Write-Host "Pre-submission checklist:" -ForegroundColor Cyan
Write-Host "  [ ] Icons replaced with unique artwork" -ForegroundColor Yellow
Write-Host "  [ ] manifest.json updated (author, homepage_url)" -ForegroundColor Yellow
Write-Host "  [ ] Privacy policy URL ready" -ForegroundColor Yellow
Write-Host "  [ ] Screenshots prepared (1280x800)" -ForegroundColor Yellow
Write-Host "  [ ] Store listing text ready" -ForegroundColor Yellow
Write-Host "  [ ] Tested on multiple websites" -ForegroundColor Yellow
Write-Host "  [ ] No console errors" -ForegroundColor Yellow
Write-Host ""
Write-Host "See packaging.md for full publishing guide." -ForegroundColor Cyan
Write-Host ""
Write-Host "Ready to upload to Chrome Web Store!" -ForegroundColor Green
Write-Host ""
