# Git Repository Setup Guide

Complete guide to push your Playwright framework to Git (GitHub, GitLab, Bitbucket, Azure DevOps).

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Method 1: GitHub](#method-1-github-recommended)
3. [Method 2: GitLab](#method-2-gitlab)
4. [Method 3: Bitbucket](#method-3-bitbucket)
5. [Method 4: Azure DevOps](#method-4-azure-devops)
6. [Git Commands Reference](#git-commands-reference)
7. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

### **1. Install Git**

**Check if Git is installed:**
```bash
git --version
```

**If not installed:**

**Windows:**
- Download from: https://git-scm.com/download/win
- Run installer with default settings

**Mac:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt-get install git
```

### **2. Configure Git**

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

---

## 🚀 Method 1: GitHub (Recommended)

### **Step 1: Create GitHub Account**

1. Go to https://github.com
2. Click **Sign up**
3. Follow registration steps
4. Verify your email

### **Step 2: Create New Repository on GitHub**

#### **Option A: Using GitHub Website**

1. Login to GitHub
2. Click **+** (top right) → **New repository**
3. Fill in details:
   ```
   Repository name:    playwright-pom-framework
   Description:        Playwright Page Object Model Test Automation Framework
   Visibility:         ○ Public  ● Private (recommended)
   
   ⬜ Initialize repository with:
      ⬜ Add a README file        (Don't check - we have one)
      ⬜ Add .gitignore           (Don't check - we have one)
      ⬜ Choose a license         (Optional)
   ```
4. Click **Create repository**
5. **Copy the repository URL** (e.g., `https://github.com/username/playwright-pom-framework.git`)

#### **Option B: Using GitHub CLI** (Advanced)

```bash
# Install GitHub CLI
winget install GitHub.cli

# Login
gh auth login

# Create repository
gh repo create playwright-pom-framework --private --source=. --remote=origin
```

### **Step 3: Initialize Local Git Repository**

Open terminal in your project folder (`c:\Users\risk\AAPlaywright`):

```bash
# Initialize Git repository
git init

# Check status
git status
```

### **Step 4: Add Files to Git**

```bash
# Add all files
git add .

# Check what will be committed
git status

# Commit files
git commit -m "Initial commit: Playwright POM framework with Jenkins integration"
```

### **Step 5: Connect to GitHub Repository**

```bash
# Add remote repository (replace with your URL)
git remote add origin https://github.com/YOUR_USERNAME/playwright-pom-framework.git

# Verify remote
git remote -v
```

### **Step 6: Push to GitHub**

```bash
# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### **Step 7: Verify on GitHub**

1. Go to your repository URL
2. You should see all your files!
3. Check README.md is displayed

### **Step 8: Set Up Authentication** (If prompted)

#### **Option A: Personal Access Token (Recommended)**

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click **Generate new token (classic)**
3. Settings:
   ```
   Note:        Playwright Framework Access
   Expiration:  90 days (or custom)
   Scopes:      ✓ repo (all)
   ```
4. Click **Generate token**
5. **Copy the token** (you won't see it again!)
6. When pushing, use token as password:
   ```
   Username: your_github_username
   Password: paste_your_token_here
   ```

#### **Option B: SSH Key** (Advanced)

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add to GitHub:
# GitHub → Settings → SSH and GPG keys → New SSH key
# Paste the public key

# Change remote to SSH
git remote set-url origin git@github.com:YOUR_USERNAME/playwright-pom-framework.git
```

---

## 🦊 Method 2: GitLab

### **Step 1: Create GitLab Account**

1. Go to https://gitlab.com
2. Sign up and verify email

### **Step 2: Create New Project**

1. Click **New project** → **Create blank project**
2. Fill in:
   ```
   Project name:         playwright-pom-framework
   Project slug:         playwright-pom-framework
   Visibility Level:     ● Private
   
   ⬜ Initialize repository with a README (uncheck)
   ```
3. Click **Create project**

### **Step 3: Push to GitLab**

```bash
# Initialize and add files
git init
git add .
git commit -m "Initial commit: Playwright POM framework"

# Add GitLab remote (replace with your URL)
git remote add origin https://gitlab.com/YOUR_USERNAME/playwright-pom-framework.git

# Push
git branch -M main
git push -u origin main
```

---

## 🪣 Method 3: Bitbucket

### **Step 1: Create Bitbucket Account**

1. Go to https://bitbucket.org
2. Sign up with Atlassian account

### **Step 2: Create Repository**

1. Click **Create** → **Repository**
2. Fill in:
   ```
   Workspace:           Your workspace
   Project:             Select or create
   Repository name:     playwright-pom-framework
   Access level:        ● Private repository
   
   Advanced settings:
   ⬜ Include a README    (uncheck)
   ⬜ Include .gitignore  (uncheck)
   ```
3. Click **Create repository**

### **Step 3: Push to Bitbucket**

```bash
# Initialize and commit
git init
git add .
git commit -m "Initial commit"

# Add Bitbucket remote
git remote add origin https://YOUR_USERNAME@bitbucket.org/YOUR_USERNAME/playwright-pom-framework.git

# Push
git branch -M main
git push -u origin main
```

---

## ☁️ Method 4: Azure DevOps

### **Step 1: Create Azure DevOps Account**

1. Go to https://dev.azure.com
2. Sign in with Microsoft account

### **Step 2: Create Project**

1. Click **New project**
2. Fill in:
   ```
   Project name:        PlaywrightFramework
   Description:         Playwright POM Test Automation
   Visibility:          ● Private
   Version control:     Git
   ```
3. Click **Create**

### **Step 3: Create Repository**

1. Go to **Repos** → **Files**
2. Copy the repository URL

### **Step 4: Push to Azure DevOps**

```bash
# Initialize and commit
git init
git add .
git commit -m "Initial commit"

# Add Azure DevOps remote
git remote add origin https://YOUR_ORG@dev.azure.com/YOUR_ORG/PlaywrightFramework/_git/PlaywrightFramework

# Push
git branch -M main
git push -u origin main
```

---

## 📝 Git Commands Reference

### **Basic Commands**

```bash
# Initialize repository
git init

# Check status
git status

# Add files
git add .                    # Add all files
git add file.txt             # Add specific file

# Commit changes
git commit -m "Your message"

# Push changes
git push

# Pull latest changes
git pull

# View commit history
git log
git log --oneline            # Compact view
```

### **Branch Management**

```bash
# Create new branch
git branch feature-name

# Switch to branch
git checkout feature-name

# Create and switch in one command
git checkout -b feature-name

# List branches
git branch

# Merge branch
git checkout main
git merge feature-name

# Delete branch
git branch -d feature-name
```

### **Remote Management**

```bash
# Add remote
git remote add origin URL

# View remotes
git remote -v

# Change remote URL
git remote set-url origin NEW_URL

# Remove remote
git remote remove origin
```

### **Undo Changes**

```bash
# Discard changes in file
git checkout -- file.txt

# Unstage file
git reset HEAD file.txt

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

---

## 🔧 Complete Setup Script

### **For Windows (PowerShell)**

Save as `setup-git.ps1`:

```powershell
# Navigate to project directory
cd c:\Users\risk\AAPlaywright

# Initialize Git
git init

# Configure user (replace with your details)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Playwright POM framework with Jenkins integration"

# Add remote (replace with your repository URL)
$repoUrl = Read-Host "Enter your Git repository URL"
git remote add origin $repoUrl

# Push to remote
git branch -M main
git push -u origin main

Write-Host "✓ Repository setup complete!" -ForegroundColor Green
```

Run with:
```powershell
.\setup-git.ps1
```

### **For Mac/Linux (Bash)**

Save as `setup-git.sh`:

```bash
#!/bin/bash

# Navigate to project directory
cd /path/to/AAPlaywright

# Initialize Git
git init

# Configure user
read -p "Enter your name: " name
read -p "Enter your email: " email
git config user.name "$name"
git config user.email "$email"

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Playwright POM framework"

# Add remote
read -p "Enter your Git repository URL: " repo_url
git remote add origin "$repo_url"

# Push
git branch -M main
git push -u origin main

echo "✓ Repository setup complete!"
```

Run with:
```bash
chmod +x setup-git.sh
./setup-git.sh
```

---

## 🎯 Quick Setup (Step-by-Step)

### **1. Open Terminal in Project Folder**

**Windows:**
- Navigate to `c:\Users\risk\AAPlaywright`
- Right-click → **Git Bash Here** (or **Open in Terminal**)

**Mac/Linux:**
```bash
cd /path/to/AAPlaywright
```

### **2. Run These Commands**

```bash
# 1. Initialize Git
git init

# 2. Configure Git (first time only)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 3. Add all files
git add .

# 4. Commit files
git commit -m "Initial commit: Playwright POM framework"

# 5. Add remote (replace URL with yours)
git remote add origin https://github.com/YOUR_USERNAME/playwright-pom-framework.git

# 6. Push to remote
git branch -M main
git push -u origin main
```

### **3. Enter Credentials When Prompted**

- Username: Your GitHub username
- Password: Your personal access token (not your GitHub password)

---

## 🔐 Authentication Options

### **Option 1: HTTPS with Personal Access Token**

**Pros**: Easy, works everywhere
**Cons**: Need to manage token

**Setup**:
1. Create token on GitHub/GitLab/etc.
2. Use as password when pushing
3. Can be cached with credential helper

### **Option 2: SSH Key**

**Pros**: More secure, no password needed
**Cons**: Initial setup required

**Setup**:
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add to GitHub/GitLab (Settings → SSH Keys)

# Use SSH URL
git remote add origin git@github.com:username/repo.git
```

### **Option 3: GitHub Desktop** (Easiest)

1. Download: https://desktop.github.com
2. Install and login
3. File → Add Local Repository → Select your folder
4. Publish repository

---

## 🛠️ Troubleshooting

### **Issue 1: Permission Denied**

```
Permission denied (publickey)
```

**Solution**: Set up SSH key or use HTTPS with token

### **Issue 2: Repository Not Found**

```
remote: Repository not found
```

**Solution**: Check URL is correct
```bash
git remote -v
git remote set-url origin CORRECT_URL
```

### **Issue 3: Authentication Failed**

```
Authentication failed
```

**Solution**: Use Personal Access Token, not password

### **Issue 4: Merge Conflicts**

```
AUTO-MERGING failed
```

**Solution**:
```bash
git pull --rebase
# Fix conflicts in files
git add .
git rebase --continue
git push
```

### **Issue 5: Large Files**

```
file is larger than 100 MB
```

**Solution**: Add to `.gitignore` or use Git LFS
```bash
# Add to .gitignore
echo "large-file.zip" >> .gitignore
git rm --cached large-file.zip
git commit -m "Remove large file"
```

---

## 📋 Daily Git Workflow

### **Making Changes**

```bash
# 1. Pull latest changes
git pull

# 2. Make your changes (edit files)

# 3. Check what changed
git status
git diff

# 4. Add changes
git add .

# 5. Commit with meaningful message
git commit -m "Add new test for AA homepage"

# 6. Push to remote
git push
```

### **Working with Branches**

```bash
# 1. Create feature branch
git checkout -b feature/add-aa-tests

# 2. Make changes and commit
git add .
git commit -m "Add AA website tests"

# 3. Push branch
git push -u origin feature/add-aa-tests

# 4. Create Pull Request on GitHub

# 5. After merge, switch back to main
git checkout main
git pull

# 6. Delete feature branch
git branch -d feature/add-aa-tests
```

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Repository created on GitHub/GitLab/etc.
- [ ] All files pushed successfully
- [ ] README.md displays correctly
- [ ] `.gitignore` working (node_modules not in repo)
- [ ] Can clone repository in another folder
- [ ] Can push new changes
- [ ] Jenkins can access repository

---

## 🎓 Next Steps

1. **Clone on another machine** to test:
   ```bash
   git clone https://github.com/username/playwright-pom-framework.git
   cd playwright-pom-framework
   npm install
   npx playwright install
   npm test
   ```

2. **Set up branch protection** (GitHub):
   - Settings → Branches → Add rule
   - Require pull request reviews
   - Require status checks to pass

3. **Enable GitHub Actions** for CI/CD (optional)

4. **Configure Jenkins** to pull from this repository

---

## 📚 Additional Resources

- **Git Documentation**: https://git-scm.com/doc
- **GitHub Guides**: https://guides.github.com
- **GitLab Docs**: https://docs.gitlab.com
- **Atlassian Git Tutorial**: https://www.atlassian.com/git/tutorials

---

**🎉 Your Playwright framework is now version controlled with Git!**