# Jenkins CI/CD Integration Guide

Complete guide for running the Playwright Page Object Model framework in Jenkins.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Jenkins Setup](#jenkins-setup)
3. [Pipeline Configuration](#pipeline-configuration)
4. [Running Tests](#running-tests)
5. [Viewing Reports](#viewing-reports)
6. [Troubleshooting](#troubleshooting)
7. [Advanced Configuration](#advanced-configuration)

---

## 🔧 Prerequisites

### On Jenkins Server

#### 1. **Install Required Plugins**

Go to **Jenkins Dashboard** → **Manage Jenkins** → **Manage Plugins** → **Available**

Install these plugins:
- ✅ **NodeJS Plugin** - For Node.js environment
- ✅ **Pipeline Plugin** - For pipeline support
- ✅ **HTML Publisher Plugin** - For HTML reports
- ✅ **JUnit Plugin** - For test results
- ✅ **Git Plugin** - For repository integration
- ✅ **Email Extension Plugin** - For notifications (optional)

#### 2. **Configure Node.js**

Go to **Manage Jenkins** → **Global Tool Configuration** → **NodeJS**

- Click **Add NodeJS**
- Name: `Node 18` (or your preferred version)
- Version: Select `18.x` or latest LTS
- Check **Install automatically**
- Save

#### 3. **System Requirements**

Ensure Jenkins server has:
- Node.js 16+ 
- npm 8+
- Sufficient disk space (500MB+ for browser downloads)
- Chrome/Chromium dependencies installed

---

## 🚀 Jenkins Setup

### Method 1: Using Jenkinsfile (Recommended)

#### **Step 1: Create Jenkins Pipeline Job**

1. Go to **Jenkins Dashboard**
2. Click **New Item**
3. Enter name: `Playwright-E2E-Tests`
4. Select **Pipeline**
5. Click **OK**

#### **Step 2: Configure Pipeline**

**General Tab:**
- ✅ Check **This project is parameterized**
- Add parameters (optional, Jenkinsfile has them defined):

**Build Triggers:**
- ✅ **Poll SCM**: `H/5 * * * *` (checks every 5 minutes)
- ✅ **GitHub hook trigger** (for GitHub integration)

**Pipeline Tab:**
- **Definition**: Pipeline script from SCM
- **SCM**: Git
- **Repository URL**: Your Git repository URL
- **Branch**: `*/main` or your branch
- **Script Path**: `Jenkinsfile`

#### **Step 3: Save and Build**

1. Click **Save**
2. Click **Build with Parameters**
3. Select options:
   - Environment: `production`
   - Browser: `chromium`
   - Test Suite: `all`
   - Base URL: `https://www.theaa.com`
4. Click **Build**

---

### Method 2: Simple Pipeline (Quick Start)

If you want a simpler approach:

1. Create new Pipeline job
2. In **Pipeline** section, select **Pipeline script**
3. Copy content from [`Jenkinsfile.declarative`](Jenkinsfile.declarative)
4. Paste in the script box
5. Save and Build

---

## 📝 Pipeline Configuration Files

### **1. Jenkinsfile (Full-Featured)**

**Location**: [`Jenkinsfile`](Jenkinsfile)

**Features**:
- ✅ Parameterized builds (environment, browser, test suite)
- ✅ Multi-browser support
- ✅ Environment selection (dev/staging/production)
- ✅ Conditional test execution
- ✅ HTML report publishing
- ✅ JUnit test results
- ✅ Artifact archiving
- ✅ Email notifications (configurable)

**Parameters**:
```groovy
ENVIRONMENT:   dev | staging | production
BROWSER:       all | chromium | firefox | webkit
TEST_SUITE:    all | login | home | smoke
BASE_URL:      https://www.theaa.com (customizable)
GENERATE_REPORT: true | false
```

### **2. Jenkinsfile.declarative (Simple)**

**Location**: [`Jenkinsfile.declarative`](Jenkinsfile.declarative)

**Features**:
- ✅ Basic test execution
- ✅ HTML report publishing
- ✅ JUnit results
- ✅ Minimal configuration

---

## 🏃 Running Tests in Jenkins

### **Option 1: Build with Parameters**

1. Go to your Jenkins job
2. Click **Build with Parameters**
3. Configure:
   ```
   ENVIRONMENT:     production
   BROWSER:         chromium
   TEST_SUITE:      all
   BASE_URL:        https://www.theaa.com
   GENERATE_REPORT: ✓ true
   ```
4. Click **Build**

### **Option 2: Automatic Trigger**

**On Git Push:**
```groovy
triggers {
    githubPush()
}
```

**Scheduled (Nightly):**
```groovy
triggers {
    cron('H 2 * * *')  // Runs at 2 AM daily
}
```

**On Merge to Main:**
Configure in Jenkins job → Build Triggers → Branch filter

---

## 📊 Viewing Reports

### **1. HTML Report**

After build completes:
1. Go to build page
2. Click **Playwright Test Report** (left sidebar)
3. View detailed HTML report with:
   - Test results
   - Screenshots on failure
   - Videos (if enabled)
   - Traces
   - Timeline

### **2. JUnit Test Results**

1. Go to build page
2. Click **Test Result** (left sidebar)
3. View:
   - Total tests
   - Pass/Fail counts
   - Test duration
   - Failure details

### **3. Console Output**

1. Go to build page
2. Click **Console Output**
3. View real-time logs

### **4. Artifacts**

1. Go to build page
2. Click **Build Artifacts**
3. Download:
   - Screenshots
   - Videos
   - Traces
   - JSON reports

---

## 🔍 Pipeline Stages Explained

### **Stage 1: Checkout**
```groovy
stage('Checkout') {
    steps {
        checkout scm  // Checks out code from Git
    }
}
```
Pulls latest code from repository.

### **Stage 2: Setup Node.js**
```groovy
stage('Setup Node.js') {
    nodejs(nodeJSInstallationName: "Node 18") {
        sh 'node --version'
    }
}
```
Configures Node.js environment.

### **Stage 3: Install Dependencies**
```groovy
stage('Install Dependencies') {
    sh 'npm ci'  // Clean install
}
```
Installs all npm packages from `package-lock.json`.

### **Stage 4: Install Playwright Browsers**
```groovy
stage('Install Playwright Browsers') {
    sh 'npx playwright install --with-deps'
}
```
Downloads Chromium, Firefox, WebKit browsers.

### **Stage 5: Run Tests**
```groovy
stage('Run Tests') {
    sh 'npm test'
}
```
Executes Playwright tests.

### **Stage 6: Generate Report**
```groovy
publishHTML([
    reportDir: 'playwright-report',
    reportFiles: 'index.html',
    reportName: 'Playwright Report'
])
```
Publishes HTML report in Jenkins.

---

## 🛠️ Environment-Specific Configuration

### **Multiple Environments**

Create environment-specific files:

```bash
.env.dev
.env.staging
.env.production
```

**In Jenkinsfile:**
```groovy
environment {
    BASE_URL = getBaseUrl(params.ENVIRONMENT)
}

def getBaseUrl(env) {
    switch(env) {
        case 'dev':
            return 'https://dev.theaa.com'
        case 'staging':
            return 'https://staging.theaa.com'
        case 'production':
            return 'https://www.theaa.com'
        default:
            return 'https://www.theaa.com'
    }
}
```

---

## 🐛 Troubleshooting

### **Issue 1: Browser Installation Fails**

**Error**: `browserType.launch: Executable doesn't exist`

**Solution**:
```groovy
stage('Install Browsers') {
    sh 'npx playwright install-deps'  // Install system dependencies
    sh 'npx playwright install'
}
```

### **Issue 2: Tests Timeout**

**Error**: `Test timeout of 30000ms exceeded`

**Solution**: Increase timeout in `playwright.config.ts`:
```typescript
timeout: 60 * 1000  // 60 seconds
```

### **Issue 3: Permission Denied**

**Error**: `EACCES: permission denied`

**Solution**:
```bash
sudo chown -R jenkins:jenkins /var/lib/jenkins/workspace
```

### **Issue 4: Report Not Showing**

**Solution**:
1. Install **HTML Publisher Plugin**
2. Configure Content Security Policy:
   ```
   Manage Jenkins → Script Console → Run:
   System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "")
   ```

### **Issue 5: Out of Memory**

**Solution**: Increase heap size
```bash
export NODE_OPTIONS="--max-old-space-size=4096"
```

---

## 🔐 Credentials Management

### **Store Secrets in Jenkins**

1. Go to **Manage Jenkins** → **Manage Credentials**
2. Add credentials:
   - ID: `TEST_USERNAME`
   - Secret: Your username
3. Repeat for password

**In Jenkinsfile:**
```groovy
environment {
    TEST_CREDENTIALS = credentials('test-user-credentials')
}

steps {
    sh '''
        export TEST_USERNAME=${TEST_CREDENTIALS_USR}
        export TEST_PASSWORD=${TEST_CREDENTIALS_PSW}
        npm test
    '''
}
```

---

## 📧 Email Notifications

### **Configure Email**

**In Jenkinsfile:**
```groovy
post {
    success {
        emailext(
            subject: "✅ Tests Passed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: """All tests passed successfully.
            
            Build URL: ${env.BUILD_URL}
            Report: ${env.BUILD_URL}Playwright_20Test_20Report/
            """,
            to: 'team@example.com'
        )
    }
    
    failure {
        emailext(
            subject: "❌ Tests Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: """Tests failed. Please check the build.
            
            Build URL: ${env.BUILD_URL}
            Console: ${env.BUILD_URL}console
            """,
            to: 'team@example.com'
        )
    }
}
```

---

## 🎯 Advanced Configuration

### **1. Parallel Test Execution**

```groovy
stage('Run Tests') {
    parallel {
        stage('Chrome Tests') {
            steps {
                sh 'npx playwright test --project=chromium'
            }
        }
        stage('Firefox Tests') {
            steps {
                sh 'npx playwright test --project=firefox'
            }
        }
        stage('WebKit Tests') {
            steps {
                sh 'npx playwright test --project=webkit'
            }
        }
    }
}
```

### **2. Docker Integration**

```groovy
pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.40.0'
        }
    }
    
    stages {
        stage('Run Tests') {
            steps {
                sh 'npm ci'
                sh 'npm test'
            }
        }
    }
}
```

### **3. Slack Notifications**

```groovy
post {
    success {
        slackSend(
            color: 'good',
            message: "Tests Passed: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
        )
    }
}
```

---

## 📋 Sample Jenkins Job XML

For manual job creation:

```xml
<?xml version='1.1' encoding='UTF-8'?>
<flow-definition plugin="workflow-job@2.40">
  <actions/>
  <description>Playwright E2E Test Automation</description>
  <keepDependencies>false</keepDependencies>
  <properties>
    <jenkins.model.BuildDiscarderProperty>
      <strategy class="hudson.tasks.LogRotator">
        <daysToKeep>30</daysToKeep>
        <numToKeep>10</numToKeep>
      </strategy>
    </jenkins.model.BuildDiscarderProperty>
  </properties>
  <definition class="org.jenkinsci.plugins.workflow.cps.CpsScmFlowDefinition" plugin="workflow-cps@2.90">
    <scm class="hudson.plugins.git.GitSCM" plugin="git@4.7.2">
      <userRemoteConfigs>
        <hudson.plugins.git.UserRemoteConfig>
          <url>https://github.com/your-repo/playwright-tests.git</url>
        </hudson.plugins.git.UserRemoteConfig>
      </userRemoteConfigs>
      <branches>
        <hudson.plugins.git.BranchSpec>
          <name>*/main</name>
        </hudson.plugins.git.BranchSpec>
      </branches>
    </scm>
    <scriptPath>Jenkinsfile</scriptPath>
  </definition>
</flow-definition>
```

---

## 📊 Best Practices

### ✅ Do's

- Use `npm ci` instead of `npm install` for consistent installs
- Cache `node_modules` between builds (if possible)
- Run tests in headless mode on CI
- Archive test artifacts (screenshots, videos, traces)
- Set appropriate timeouts for CI environment
- Use parameterized builds for flexibility
- Clean workspace after builds
- Implement retry logic for flaky tests

### ❌ Don'ts

- Don't hardcode credentials in Jenkinsfile
- Don't run tests in headed mode on CI
- Don't ignore test failures
- Don't skip browser installation
- Don't use `npm install` (use `npm ci`)

---

## 🔗 Quick Reference

### **Jenkins Commands**

```bash
# Install dependencies
npm ci

# Install browsers
npx playwright install --with-deps

# Run all tests
npm test

# Run specific browser
npx playwright test --project=chromium

# Run specific test file
npx playwright test tests/login.spec.ts

# Generate report
npx playwright show-report
```

### **Environment Variables**

```bash
BASE_URL=https://www.theaa.com
CI=true
HEADLESS=true
WORKERS=2
RETRIES=2
```

---

## 📚 Additional Resources

- **Jenkinsfile**: [`Jenkinsfile`](Jenkinsfile) - Full-featured pipeline
- **Simple Pipeline**: [`Jenkinsfile.declarative`](Jenkinsfile.declarative) - Basic setup
- **Framework Docs**: [`README.md`](README.md)
- **Quick Start**: [`QUICK_START.md`](QUICK_START.md)
- **Jenkins Docs**: https://www.jenkins.io/doc/
- **Playwright CI Docs**: https://playwright.dev/docs/ci

---

## 🎓 Step-by-Step First Run

1. **Install Jenkins Plugins** (NodeJS, Pipeline, HTML Publisher)
2. **Configure Node.js** in Global Tool Configuration
3. **Create Pipeline Job** in Jenkins
4. **Configure Git Repository** and select `Jenkinsfile`
5. **Click "Build with Parameters"**
6. **View Report** after build completes
7. **Set up automatic triggers** (GitHub webhook, cron)

---

**🎉 Your Playwright framework is now integrated with Jenkins! Happy Testing!**