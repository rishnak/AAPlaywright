#!/bin/bash

# Git Repository Setup Script for Mac/Linux (Bash)
# This script initializes Git and pushes the Playwright framework to a remote repository

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}"
echo "========================================"
echo "  Git Repository Setup Wizard"
echo "  Playwright POM Framework"
echo "========================================"
echo -e "${NC}"

# Check if Git is installed
echo -e "${YELLOW}[1/8] Checking Git installation...${NC}"
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    echo -e "${GREEN}✓ Git installed: $GIT_VERSION${NC}"
else
    echo -e "${RED}✗ Git is not installed!${NC}"
    echo -e "${YELLOW}Please install Git:${NC}"
    echo "  Mac: brew install git"
    echo "  Ubuntu/Debian: sudo apt-get install git"
    echo "  CentOS/RHEL: sudo yum install git"
    exit 1
fi

# Check if already a Git repository
if [ -d .git ]; then
    echo -e "\n${YELLOW}⚠ This directory is already a Git repository${NC}"
    read -p "Do you want to reinitialize? (yes/no): " reinit
    if [ "$reinit" != "yes" ]; then
        echo -e "${YELLOW}Setup cancelled.${NC}"
        exit 0
    fi
fi

# Configure Git user
echo -e "\n${YELLOW}[2/8] Configuring Git user...${NC}"
current_name=$(git config user.name 2>/dev/null)
current_email=$(git config user.email 2>/dev/null)

if [ -n "$current_name" ]; then
    echo -e "${CYAN}Current name: $current_name${NC}"
    read -p "Use this name? (yes/no): " use_current
    if [ "$use_current" == "yes" ]; then
        name="$current_name"
    else
        read -p "Enter your name: " name
    fi
else
    read -p "Enter your name: " name
fi

if [ -n "$current_email" ]; then
    echo -e "${CYAN}Current email: $current_email${NC}"
    read -p "Use this email? (yes/no): " use_current
    if [ "$use_current" == "yes" ]; then
        email="$current_email"
    else
        read -p "Enter your email: " email
    fi
else
    read -p "Enter your email: " email
fi

git config user.name "$name"
git config user.email "$email"
echo -e "${GREEN}✓ Git user configured${NC}"

# Initialize Git repository
echo -e "\n${YELLOW}[3/8] Initializing Git repository...${NC}"
if [ -d .git ]; then
    echo -e "${GREEN}✓ Git repository already initialized${NC}"
else
    git init
    echo -e "${GREEN}✓ Git repository initialized${NC}"
fi

# Show current status
echo -e "\n${YELLOW}[4/8] Checking repository status...${NC}"
untracked=$(git status --porcelain | wc -l)
echo -e "${GREEN}✓ Found $untracked files to add${NC}"

# Add files
echo -e "\n${YELLOW}[5/8] Adding files to Git...${NC}"
git add .
echo -e "${GREEN}✓ All files added to staging area${NC}"

# Commit files
echo -e "\n${YELLOW}[6/8] Committing files...${NC}"
read -p "Enter commit message (or press Enter for default): " commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Initial commit: Playwright POM framework with Jenkins integration"
fi
git commit -m "$commit_msg"
echo -e "${GREEN}✓ Files committed${NC}"

# Add remote repository
echo -e "\n${YELLOW}[7/8] Adding remote repository...${NC}"
echo -e "\n${CYAN}Select your Git provider:${NC}"
echo "1. GitHub (https://github.com)"
echo "2. GitLab (https://gitlab.com)"
echo "3. Bitbucket (https://bitbucket.org)"
echo "4. Azure DevOps (https://dev.azure.com)"
echo "5. Custom URL"

read -p "Enter choice (1-5): " provider

case $provider in
    1)
        read -p "Enter your GitHub username: " username
        read -p "Enter repository name (e.g., playwright-pom-framework): " repo_name
        repo_url="https://github.com/$username/$repo_name.git"
        ;;
    2)
        read -p "Enter your GitLab username: " username
        read -p "Enter repository name: " repo_name
        repo_url="https://gitlab.com/$username/$repo_name.git"
        ;;
    3)
        read -p "Enter your Bitbucket username: " username
        read -p "Enter repository name: " repo_name
        repo_url="https://$username@bitbucket.org/$username/$repo_name.git"
        ;;
    4)
        read -p "Enter your Azure DevOps organization: " org
        read -p "Enter project name: " project
        read -p "Enter repository name: " repo_name
        repo_url="https://$org@dev.azure.com/$org/$project/_git/$repo_name"
        ;;
    5)
        read -p "Enter full repository URL: " repo_url
        ;;
    *)
        echo -e "${RED}✗ Invalid choice${NC}"
        exit 1
        ;;
esac

echo -e "\n${CYAN}Repository URL: $repo_url${NC}"
read -p "Is this correct? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
    echo -e "${YELLOW}Setup cancelled.${NC}"
    exit 0
fi

# Check if remote already exists
existing_remote=$(git remote get-url origin 2>/dev/null)
if [ -n "$existing_remote" ]; then
    echo -e "${YELLOW}⚠ Remote 'origin' already exists: $existing_remote${NC}"
    read -p "Overwrite? (yes/no): " overwrite
    if [ "$overwrite" == "yes" ]; then
        git remote set-url origin $repo_url
        echo -e "${GREEN}✓ Remote updated${NC}"
    fi
else
    git remote add origin $repo_url
    echo -e "${GREEN}✓ Remote repository added${NC}"
fi

# Push to remote
echo -e "\n${YELLOW}[8/8] Pushing to remote repository...${NC}"
echo -e "${YELLOW}⚠ You may be prompted for credentials${NC}"
echo -e "${YELLOW}   Use Personal Access Token as password (not your account password)${NC}"

git branch -M main

if git push -u origin main; then
    echo -e "\n${GREEN}========================================${NC}"
    echo -e "${GREEN}  ✓ SUCCESS!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo -e "\n${GREEN}Your repository is now on Git!${NC}"
    echo -e "${CYAN}Repository URL: $repo_url${NC}"
    echo -e "\n${YELLOW}Next steps:${NC}"
    echo "1. Visit your repository in a browser"
    echo "2. Verify all files are uploaded"
    echo "3. Set up Jenkins integration (see JENKINS_SETUP.md)"
else
    echo -e "\n${RED}========================================${NC}"
    echo -e "${RED}  ✗ PUSH FAILED${NC}"
    echo -e "${RED}========================================${NC}"
    echo -e "\n${YELLOW}Troubleshooting:${NC}"
    echo "1. Make sure the repository exists on the remote server"
    echo "2. Check your authentication (use Personal Access Token)"
    echo "3. Verify the repository URL is correct"
    echo "4. See GIT_SETUP.md for detailed help"
fi

echo ""
read -p "Press Enter to exit..."
