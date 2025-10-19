# PowerShell script to deploy Next.js static export to gh-pages branch
# Usage: Run this script from the project root after npm run export

$ErrorActionPreference = 'Stop'

# Ensure out/ exists
if (!(Test-Path -Path "out")) {
    Write-Error "Static export folder 'out/' not found. Run 'npm run export' first."
    exit 1
}

# Initialize a temporary git repo in out/
Set-Location out
if (!(Test-Path -Path ".git")) {
    git init
}

git remote add origin https://github.com/GilClacio/craftsyrph.git 2>$null

git checkout -b gh-pages 2>$null

git add .
git commit -m "Deploy static site to gh-pages"
git push origin gh-pages --force

Set-Location ..
Write-Host "Deployment to gh-pages complete!"
