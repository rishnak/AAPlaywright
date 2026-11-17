# Git Quick Reference

Quick commands for daily Git operations with the Playwright framework.

---

## 🚀 Initial Setup (One-Time)

### **Automated Setup (Recommended)**

**Windows:**
```powershell
.\setup-git.ps1
```

**Mac/Linux:**
```bash
chmod +x setup-git.sh
./setup-git.sh
```

### **Manual Setup**

```bash
# 1. Initialize Git
git init

# 2. Configure user
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 3. Add all files
git add .

# 4. Commit
git commit -m "Initial commit: Playwright POM framework"

# 5. Add remote (replace with your URL)
git remote add origin https://github.com/username/repo.git

# 6. Push
git branch -M main
git push -u origin main
```

---

## 📝 Daily Operations

### **1. Making Changes**

```bash
# See what changed
git status

# See detailed changes
git diff

# Add specific files
git add filename.ts

# Add all changed files
git add .

# Commit with message
git commit -m "Add new AA homepage tests"

# Push to remote
git push
```

### **2. Getting Latest Code**

```bash
# Pull latest changes
git pull

# Pull and rebase
git pull --rebase
```

### **3. Viewing History**

```bash
# Show commit history
git log

# Compact view
git log --oneline

# Last 5 commits
git log -5

# Show changes in last commit
git show
```

---

## 🌱 Working with Branches

### **Create and Switch Branches**

```bash
# Create new branch
git branch feature/add-aa-tests

# Switch to branch
git checkout feature/add-aa-tests

# Create and switch in one command
git checkout -b feature/add-aa-tests

# List all branches
git branch

# List remote branches
git branch -r
```

### **Merge Branches**

```bash
# Switch to main
git checkout main

# Merge feature branch
git merge feature/add-aa-tests

# Delete branch after merge
git branch -d feature/add-aa-tests

# Delete remote branch
git push origin --delete feature/add-aa-tests
```

---

## ⏪ Undo Changes

### **Before Commit**

```bash
# Discard changes in file
git checkout -- filename.ts

# Discard all changes
git checkout -- .

# Unstage file (keep changes)
git reset HEAD filename.ts

# Unstage all files
git reset HEAD
```

### **After Commit**

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Undo last 3 commits
git reset --soft HEAD~3

# Amend last commit message
git commit --amend -m "New message"

# Add files to last commit
git add forgotten-file.ts
git commit --amend --no-edit
```

---

## 🔄 Syncing with Remote

### **Push and Pull**

```bash
# Push current branch
git push

# Push new branch
git push -u origin branch-name

# Force push (use carefully!)
git push --force

# Pull latest changes
git pull

# Fetch without merging
git fetch
```

### **Remote Management**

```bash
# View remotes
git remote -v

# Add remote
git remote add origin URL

# Change remote URL
git remote set-url origin NEW_URL

# Remove remote
git remote remove origin
```

---

## 🔍 Inspection

### **Status and Diff**

```bash
# Show status
git status

# Short status
git status -s

# Show changes (not staged)
git diff

# Show staged changes
git diff --staged

# Show changes in specific file
git diff filename.ts
```

### **Log and History**

```bash
# Full log
git log

# One line per commit
git log --oneline

# Graph view
git log --graph --oneline --all

# Who changed what
git blame filename.ts

# Search commits
git log --grep="test"
```

---

## 🛠️ Useful Shortcuts

### **Stashing Changes**

```bash
# Save changes temporarily
git stash

# Save with message
git stash save "Work in progress"

# List stashes
git stash list

# Apply last stash
git stash pop

# Apply specific stash
git stash apply stash@{0}

# Delete stash
git stash drop
```

### **Tagging**

```bash
# Create tag
git tag v1.0.0

# Create annotated tag
git tag -a v1.0.0 -m "Version 1.0.0"

# List tags
git tag

# Push tag
git push origin v1.0.0

# Push all tags
git push --tags

# Delete tag
git tag -d v1.0.0
git push origin :refs/tags/v1.0.0
```

---

## 📦 Framework-Specific Workflows

### **Adding New Test Files**

```bash
# Create new test file
touch tests/aa-breakdown.spec.ts

# Edit the file
# ... add your tests ...

# Add and commit
git add tests/aa-breakdown.spec.ts
git commit -m "Add breakdown cover tests"
git push
```

### **Updating Page Objects**

```bash
# Edit page object
# ... make changes ...

# See what changed
git diff src/page-objects/LoginPage.ts

# Add and commit
git add src/page-objects/LoginPage.ts
git commit -m "Update login page locators for AA website"
git push
```

### **Updating Configuration**

```bash
# Update playwright config
# ... make changes ...

# Commit
git add playwright.config.ts
git commit -m "Increase timeout for AA website tests"
git push
```

---

## 🎓 Best Practices

### **Commit Messages**

```bash
# Good commit messages
git commit -m "Add login tests for AA website"
git commit -m "Fix: Incorrect selector in home page object"
git commit -m "Update: Increase timeout in playwright config"
git commit -m "Refactor: Extract common methods to BasePage"

# Bad commit messages (avoid)
git commit -m "fixes"           # Too vague
git commit -m "update"          # What was updated?
git commit -m "asdfasdf"        # Meaningless
```

### **Branching Strategy**

```bash
# Feature branches
git checkout -b feature/add-breakdown-tests

# Bug fix branches
git checkout -b bugfix/fix-login-timeout

# Hotfix branches
git checkout -b hotfix/critical-selector-fix

# After work is done
git checkout main
git merge feature/add-breakdown-tests
git branch -d feature/add-breakdown-tests
git push
```

---

## ⚡ Common Scenarios

### **Scenario 1: Made changes, need to switch branch**

```bash
# Save current work
git stash

# Switch branch
git checkout other-branch

# ... do work ...

# Go back and restore work
git checkout main
git stash pop
```

### **Scenario 2: Accidentally committed to wrong branch**

```bash
# On wrong branch - undo commit but keep changes
git reset --soft HEAD~1

# Switch to correct branch
git checkout correct-branch

# Commit on correct branch
git add .
git commit -m "Your message"
```

### **Scenario 3: Need to update commit message**

```bash
# If not pushed yet
git commit --amend -m "New better message"

# If already pushed (use carefully!)
git commit --amend -m "New message"
git push --force
```

### **Scenario 4: Merge conflicts**

```bash
# After git pull shows conflicts
# 1. Open conflicted files and resolve
# 2. Add resolved files
git add .

# 3. Commit the merge
git commit -m "Resolve merge conflicts"

# 4. Push
git push
```

---

## 🔐 GitHub-Specific

### **Pull Requests**

```bash
# 1. Create feature branch
git checkout -b feature/new-tests

# 2. Make changes and commit
git add .
git commit -m "Add new tests"

# 3. Push branch
git push -u origin feature/new-tests

# 4. Go to GitHub and create Pull Request

# 5. After PR is merged, cleanup
git checkout main
git pull
git branch -d feature/new-tests
```

### **Clone Repository**

```bash
# Clone to current directory
git clone https://github.com/username/repo.git

# Clone to specific folder
git clone https://github.com/username/repo.git my-folder

# Clone specific branch
git clone -b branch-name https://github.com/username/repo.git
```

---

## 🛑 Emergency Commands

### **Discard Everything and Reset**

```bash
# WARNING: This will delete all uncommitted changes!
git reset --hard HEAD
git clean -fd
```

### **Reset to Remote State**

```bash
# Get latest remote state
git fetch origin

# Reset to match remote exactly
git reset --hard origin/main
```

### **Recover Deleted Commit**

```bash
# Find lost commit
git reflog

# Restore commit (use hash from reflog)
git checkout <commit-hash>
```

---

## 📊 Git Workflow for This Framework

```bash
# Daily workflow
1. git pull                           # Get latest code
2. git checkout -b feature/my-work    # Create feature branch
3. # Make changes to tests/pages
4. git add .
5. git commit -m "Descriptive message"
6. git push -u origin feature/my-work # Push branch
7. # Create Pull Request on GitHub
8. # After merge:
9. git checkout main
10. git pull
11. git branch -d feature/my-work     # Cleanup
```

---

## 📚 Additional Resources

- **Full Setup Guide**: [GIT_SETUP.md](GIT_SETUP.md)
- **Git Documentation**: https://git-scm.com/doc
- **Interactive Tutorial**: https://learngitbranching.js.org
- **Git Cheat Sheet**: https://education.github.com/git-cheat-sheet-education.pdf

---

**📝 Print this page and keep it handy for quick reference!**