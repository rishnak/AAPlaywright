# Git Repository Setup Script for Windows (PowerShell)
# This script initializes Git and pushes the Playwright framework to a remote repository

Write-Host "
========================================" -ForegroundColor Cyan
Write-Host "  Git Repository Setup Wizard" -ForegroundColor Cyan
Write-Host "  Playwright POM Framework" -ForegroundColor Cyan
Write-Host "========================================
" -ForegroundColor Cyan

# Check if Git is installed
Write-Host "[1/8] Checking Git installation..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "✓ Git installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git is not installed!" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# Check if already a Git repository
if (Test-Path .git) {
    Write-Host "
⚠ This directory is already a Git repository" -ForegroundColor Yellow
    $reinit = Read-Host "Do you want to reinitialize? (yes/no)"
    if ($reinit -ne "yes") {
        Write-Host "Setup cancelled." -ForegroundColor Yellow
        exit 0
    }
}

# Configure Git user
Write-Host "
[2/8] Configuring Git user..." -ForegroundColor Yellow
$currentName = git config user.name 2>$null
$currentEmail = git config user.email 2>$null

if ($currentName) {
    Write-Host "Current name: $currentName" -ForegroundColor Cyan
    $useCurrent = Read-Host "Use this name? (yes/no)"
    if ($useCurrent -eq "yes") {
        $name = $currentName
    } else {
        $name = Read-Host "Enter your name"
    }
} else {
    $name = Read-Host "Enter your name"
}

if ($currentEmail) {
    Write-Host "Current email: $currentEmail" -ForegroundColor Cyan
    $useCurrent = Read-Host "Use this email? (yes/no)"
    if ($useCurrent -eq "yes") {
        $email = $currentEmail
    } else {
        $email = Read-Host "Enter your email"
    }
} else {
    $email = Read-Host "Enter your email"
}

git config user.name "$name"
git config user.email "$email"
Write-Host "✓ Git user configured" -ForegroundColor Green

# Initialize Git repository
Write-Host "
[3/8] Initializing Git repository..." -ForegroundColor Yellow
if (Test-Path .git) {
    Write-Host "✓ Git repository already initialized" -ForegroundColor Green
} else {
    git init
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
}

# Show current status
Write-Host "
[4/8] Checking repository status..." -ForegroundColor Yellow
$untracked = (git status --porcelain | Measure-Object).Count
Write-Host "✓ Found $untracked files to add" -ForegroundColor Green

# Add files
Write-Host "
[5/8] Adding files to Git..." -ForegroundColor Yellow
git add .
Write-Host "✓ All files added to staging area" -ForegroundColor Green

# Commit files
Write-Host "
[6/8] Committing files..." -ForegroundColor Yellow
$commitMsg = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    $commitMsg = "Initial commit: Playwright POM framework with Jenkins integration"
}
git commit -m "$commitMsg"
Write-Host "✓ Files committed" -ForegroundColor Green

# Add remote repository
Write-Host "
[7/8] Adding remote repository..." -ForegroundColor Yellow
Write-Host "
Select your Git provider:" -ForegroundColor Cyan
Write-Host "1. GitHub (https://github.com)" -ForegroundColor White
Write-Host "2. GitLab (https://gitlab.com)" -ForegroundColor White
Write-Host "3. Bitbucket (https://bitbucket.org)" -ForegroundColor White
Write-Host "4. Azure DevOps (https://dev.azure.com)" -ForegroundColor White
Write-Host "5. Custom URL" -ForegroundColor White

$provider = Read-Host "Enter choice (1-5)"

switch ($provider) {
    "1" {
        $username = Read-Host "Enter your GitHub username"
        $repoName = Read-Host "Enter repository name (e.g., playwright-pom-framework)"
        $repoUrl = "https://github.com/$username/$repoName.git"
    }
    "2" {
        $username = Read-Host "Enter your GitLab username"
        $repoName = Read-Host "Enter repository name"
        $repoUrl = "https://gitlab.com/$username/$repoName.git"
    }
    "3" {
        $username = Read-Host "Enter your Bitbucket username"
        $repoName = Read-Host "Enter repository name"
        $repoUrl = "https://$username@bitbucket.org/$username/$repoName.git"
    }
    "4" {
        $org = Read-Host "Enter your Azure DevOps organization"
        $project = Read-Host "Enter project name"
        $repoName = Read-Host "Enter repository name"
        $repoUrl = "https://$org@dev.azure.com/$org/$project/_git/$repoName"
    }
    "5" {
        $repoUrl = Read-Host "Enter full repository URL"
    }
    default {
        Write-Host "✗ Invalid choice" -ForegroundColor Red
        exit 1
    }
}

Write-Host "
Repository URL: $repoUrl" -ForegroundColor Cyan
$confirm = Read-Host "Is this correct? (yes/no)"
if ($confirm -ne "yes") {
    Write-Host "Setup cancelled." -ForegroundColor Yellow
    exit 0
}

# Check if remote already exists
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host "⚠ Remote 'origin' already exists: $existingRemote" -ForegroundColor Yellow
    $overwrite = Read-Host "Overwrite? (yes/no)"
    if ($overwrite -eq "yes") {
        git remote set-url origin $repoUrl
        Write-Host "✓ Remote updated" -ForegroundColor Green
    }
} else {
    git remote add origin $repoUrl
    Write-Host "✓ Remote repository added" -ForegroundColor Green
}

# Push to remote
Write-Host "
[8/8] Pushing to remote repository..." -ForegroundColor Yellow
Write-Host "⚠ You may be prompted for credentials" -ForegroundColor Yellow
Write-Host "   Use Personal Access Token as password (not your account password)" -ForegroundColor Yellow

git branch -M main

try {
    git push -u origin main
    Write-Host "
========================================" -ForegroundColor Green
    Write-Host "  ✓ SUCCESS!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "
Your repository is now on Git!" -ForegroundColor Green
    Write-Host "Repository URL: $repoUrl" -ForegroundColor Cyan
    Write-Host "
Next steps:" -ForegroundColor Yellow
    Write-Host "1. Visit your repository in a browser" -ForegroundColor White
    Write-Host "2. Verify all files are uploaded" -ForegroundColor White
    Write-Host "3. Set up Jenkins integration (see JENKINS_SETUP.md)" -ForegroundColor White
} catch {
    Write-Host "
========================================" -ForegroundColor Red
    Write-Host "  ✗ PUSH FAILED" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "
Troubleshooting:" -ForegroundColor Yellow
    Write-Host "1. Make sure the repository exists on the remote server" -ForegroundColor White
    Write-Host "2. Check your authentication (use Personal Access Token)" -ForegroundColor White
    Write-Host "3. Verify the repository URL is correct" -ForegroundColor White
    Write-Host "4. See GIT_SETUP.md for detailed help" -ForegroundColor White
    Write-Host "
Error details:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host "
Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")