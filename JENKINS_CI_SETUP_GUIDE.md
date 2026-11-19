# 🚀 Jenkins CI/CD Pipeline Setup Guide

## 📊 Overview

This guide explains how to set up and use the Jenkins CI/CD pipeline for the Playwright Test Automation Framework.

---

## ✅ What Was Implemented

### **1. Jenkins Pipeline Features**

- ✅ **Declarative Pipeline** syntax
- ✅ **Parameterized builds** (ENVIRONMENT, BROWSER, TEST_TYPE)
- ✅ **Windows agent compatible** (uses `bat` commands)
- ✅ **Environment-specific testing** (QA, UAT, STAGING)
- ✅ **Multi-browser support** (chromium, firefox, webkit)
- ✅ **Test type filtering** (@smoke, @regression tags)
- ✅ **Automatic report publishing** (HTML + JUnit)
- ✅ **Test artifact archiving**
- ✅ **Failure handling** (continues to publish reports even if tests fail)

### **2. Test Tags Added**

| Test File | Test Name | Tags |
|-----------|-----------|------|
| **aa-website-pom.spec.ts** | should load AA homepage | `@smoke` |
| **aa-website-pom.spec.ts** | should verify navigation menu | `@smoke @regression` |
| **aa-website-pom.spec.ts** | should demonstrate scrolling | `@regression` |
| **breakdownflowe2e.spec.ts** | Navigate through breakdown cover flow | `@regression` |

### **3. NPM Scripts Added**

```json
"test:smoke": "playwright test --grep @smoke"
"test:regression": "playwright test --grep @regression"
```

### **4. Configuration Updates**

- ✅ **playwright.config.ts** - Environment-specific URL mapping
- ✅ **package.json** - Smoke/Regression scripts
- ✅ **.env.example** - Environment variable templates
- ✅ **Jenkinsfile** - Complete CI/CD pipeline

---

## 🛠️ Prerequisites

### **1. Jenkins Installation**

Ensure Jenkins is installed and running:
- Jenkins version 2.300+ recommended
- Accessible via browser (e.g., http://localhost:8080)

### **2. Required Jenkins Plugins**

Install these plugins via **Manage Jenkins** > **Manage Plugins**:

| Plugin Name | Purpose |
|-------------|----------|
| **Pipeline** | Declarative pipeline support |
| **Git** | Source code management |
| **NodeJS Plugin** | Node.js installation management |
| **HTML Publisher** | Publish HTML reports |
| **JUnit** | Publish test results |
| **Pipeline: Stage View** | Visual pipeline stages |

**Installation steps:**
1. Go to **Manage Jenkins** > **Manage Plugins**
2. Click **Available** tab
3. Search for each plugin
4. Check the box and click **Install without restart**

### **3. Configure Node.js in Jenkins**

1. Go to **Manage Jenkins** > **Global Tool Configuration**
2. Scroll to **NodeJS** section
3. Click **Add NodeJS**
4. Configure:
   - **Name:** `NodeJS 18` (must match Jenkinsfile)
   - **Version:** Select Node.js 18.x or higher
   - **Global npm packages to install:** (leave empty)
5. Click **Save**

---

## 📁 Files Created/Modified

### **🆕 Created**

1. **Jenkinsfile** - Main CI/CD pipeline
2. **JENKINS_CI_SETUP_GUIDE.md** - This documentation

### **📝 Modified**

1. **playwright.config.ts** - Added environment-specific URL mapping
2. **package.json** - Added `test:smoke` and `test:regression` scripts
3. **.env.example** - Added QA/UAT/STAGING environment variables
4. **tests/aa-website-pom.spec.ts** - Added @smoke and @regression tags
5. **tests/breakdownflowe2e.spec.ts** - Added @regression tag

---

## 🔧 Environment URL Configuration

### **IMPORTANT: Replace Placeholder URLs**

The following URLs are **PLACEHOLDERS** and must be replaced with actual URLs:

**In playwright.config.ts:**
```typescript
'QA': process.env.QA_BASE_URL || 'https://qa.theaa.com',         // ⚠️ PLACEHOLDER
'UAT': process.env.UAT_BASE_URL || 'https://uat.theaa.com',      // ⚠️ PLACEHOLDER
'STAGING': process.env.STAGING_BASE_URL || 'https://staging.theaa.com',  // ⚠️ PLACEHOLDER
```

**In .env.example:**
```env
QA_BASE_URL=https://qa.theaa.com          # ⚠️ Replace with actual QA URL
UAT_BASE_URL=https://uat.theaa.com        # ⚠️ Replace with actual UAT URL
STAGING_BASE_URL=https://staging.theaa.com  # ⚠️ Replace with actual STAGING URL
```

### **How to Update URLs:**

1. **Option 1: Update playwright.config.ts directly**
   ```typescript
   'QA': process.env.QA_BASE_URL || 'https://actual-qa-url.theaa.com',
   ```

2. **Option 2: Use Jenkins credentials/environment**
   - Add environment variables in Jenkins job configuration
   - Set `QA_BASE_URL`, `UAT_BASE_URL`, `STAGING_BASE_URL`

---

## 🔐 Jenkins Credentials Setup

### **For Sensitive Data (Passwords, Tokens)**

1. Go to **Manage Jenkins** > **Manage Credentials**
2. Click **Jenkins** > **Global credentials** > **Add Credentials**
3. Create credentials:

| Credential | Type | ID | Usage |
|------------|------|----|---------|
| Test User Password | Secret text | `TEST_PASSWORD` | Test account |
| Admin Password | Secret text | `ADMIN_PASSWORD` | Admin account |
| QA Base URL | Secret text | `QA_BASE_URL` | QA environment URL (optional) |
| UAT Base URL | Secret text | `UAT_BASE_URL` | UAT environment URL (optional) |

### **Using Credentials in Pipeline (Optional)**

If you need to use credentials, update Jenkinsfile:

```groovy
environment {
    TEST_PASSWORD = credentials('TEST_PASSWORD')
    QA_BASE_URL = credentials('QA_BASE_URL')
}
```

---

## 📦 Creating Jenkins Pipeline Job

### **Method 1: Pipeline Script from SCM (Recommended)**

1. **Create New Job:**
   - Go to Jenkins Dashboard
   - Click **New Item**
   - Enter name: `Playwright-AA-Tests`
   - Select **Pipeline**
   - Click **OK**

2. **Configure Pipeline:**
   - **General** section:
     - ☑️ Check **This project is parameterized**
     - **Note:** Parameters are defined in Jenkinsfile, so you can skip manual parameter setup
   
   - **Pipeline** section:
     - **Definition:** Select **Pipeline script from SCM**
     - **SCM:** Select **Git**
     - **Repository URL:** Enter your Git repo URL
       ```
       https://github.com/your-username/AAPlaywright.git
       ```
     - **Credentials:** Select or add Git credentials
     - **Branch Specifier:** `*/main` (or your branch name)
     - **Script Path:** `Jenkinsfile`
   
3. **Save** the job

4. **First Build:**
   - Click **Build Now** (parameters will appear after first build)
   - After first build, click **Build with Parameters**

### **Method 2: Pipeline Script (For Testing)**

1. Create new Pipeline job
2. In **Pipeline** section:
   - **Definition:** Pipeline script
   - Paste entire Jenkinsfile content
3. Click **Save**

---

## ▶️ Running the Pipeline

### **1. Build with Parameters**

Click **Build with Parameters** and select:

| Parameter | Options | Description |
|-----------|---------|-------------|
| **ENVIRONMENT** | QA, UAT, STAGING | Test environment |
| **BROWSER** | chromium, firefox, webkit | Browser to run tests |
| **TEST_TYPE** | smoke, regression | Type of tests to run |

### **2. Example Configurations**

#### **Example 1: QA Smoke Tests on Chrome**
```
ENVIRONMENT: QA
BROWSER: chromium
TEST_TYPE: smoke
```

#### **Example 2: UAT Regression Tests on Firefox**
```
ENVIRONMENT: UAT
BROWSER: firefox
TEST_TYPE: regression
```

#### **Example 3: STAGING Regression Tests on Safari**
```
ENVIRONMENT: STAGING
BROWSER: webkit
TEST_TYPE: regression
```

### **3. Command Executed by Jenkins**

Based on parameters, Jenkins runs:

```bash
# For QA + chromium + smoke:
npm run test:smoke -- --project=chromium

# For UAT + firefox + regression:
npm run test:regression -- --project=firefox
```

---

## 📊 Pipeline Stages Explained

### **Stage 1: Checkout**
- Checks out code from Git repository
- Displays build parameters
- Shows directory contents

### **Stage 2: Verify Node.js & npm**
- Verifies Node.js installation
- Checks npm version
- Uses NodeJS tool configured in Jenkins

### **Stage 3: Install Dependencies**
- Runs `npm ci` (clean install)
- Faster and more reliable than `npm install`
- Uses package-lock.json

### **Stage 4: Install Playwright Browsers**
- Installs only the selected browser
- Includes system dependencies (`--with-deps`)
- Example: `npx playwright install chromium --with-deps`

### **Stage 5: Execute Playwright Tests**
- Sets environment variables (ENVIRONMENT, CI, HEADLESS)
- Runs smoke or regression tests
- Runs on selected browser
- Uses `catchError` to continue even if tests fail

### **Post Actions (Always Runs):**
- Archives test results (`test-results/**/*`)
- Archives HTML reports (`playwright-report/**/*`)
- Archives screenshots (`screenshots/**/*`)
- Publishes HTML report
- Publishes JUnit results

---

## 📄 Test Reports

### **1. HTML Report**

After build completes:
1. Go to build page
2. Click **Playwright Test Report** in left sidebar
3. View detailed test results with screenshots

### **2. JUnit Report**

- Visible in **Test Result Trend** graph
- Shows pass/fail statistics over time
- Located in build page

### **3. Archived Artifacts**

Click **Build Artifacts** to download:
- `test-results/` - Raw test results
- `playwright-report/` - HTML report
- `screenshots/` - Failure screenshots

---

## 📧 Notifications (Optional)

### **Email Notifications**

To enable email notifications, update Jenkinsfile:

```groovy
post {
    success {
        emailext(
            subject: "✅ Tests Passed - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: """All ${params.TEST_TYPE} tests passed on ${params.ENVIRONMENT}.
                     Browser: ${params.BROWSER}
                     View report: ${env.BUILD_URL}Playwright_20Test_20Report/""",
            to: 'team@example.com'
        )
    }
    failure {
        emailext(
            subject: "❌ Tests Failed - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: """Some tests failed on ${params.ENVIRONMENT}.
                     Browser: ${params.BROWSER}
                     View report: ${env.BUILD_URL}Playwright_20Test_20Report/""",
            to: 'team@example.com'
        )
    }
}
```

**Prerequisites:**
1. Install **Email Extension Plugin**
2. Configure SMTP in **Manage Jenkins** > **Configure System**

---

## 🔧 Troubleshooting

### **Issue 1: "nodejs: command not found"**

**Solution:**
1. Go to **Manage Jenkins** > **Global Tool Configuration**
2. Add NodeJS installation with name `NodeJS 18`
3. Ensure name matches Jenkinsfile (`NODE_VERSION = 'NodeJS 18'`)

### **Issue 2: "Tests not found" or "No tests matched"**

**Solution:**
- Verify test files have correct tags:
  ```typescript
  test('@smoke should load homepage', async () => { ... })
  ```
- Check npm scripts in package.json:
  ```json
  "test:smoke": "playwright test --grep @smoke"
  ```

### **Issue 3: Browser installation fails**

**Solution:**
- For Linux agents: Ensure system has required dependencies
- For Windows agents: May need admin privileges
- Alternative: Pre-install browsers on agent machine

### **Issue 4: Wrong environment URL used**

**Solution:**
1. Check playwright.config.ts has correct URLs
2. Verify ENVIRONMENT variable is passed correctly
3. Check Jenkins console output for `Using QA environment URL: ...`

### **Issue 5: Pipeline uses `sh` instead of `bat`**

**Solution:**
- Jenkinsfile is configured for Windows (`bat` commands)
- If using Linux agent, replace all `bat` with `sh`
- Look for lines like:
  ```groovy
  bat '''...'''  // Windows
  sh '''...'''   // Linux
  ```

---

## 📊 Test Execution Matrix

| Environment | Browser | Test Type | Tests Run | Expected Duration |
|-------------|---------|-----------|-----------|-------------------|
| QA | chromium | smoke | 2 tests | ~30 seconds |
| QA | firefox | smoke | 2 tests | ~35 seconds |
| QA | webkit | smoke | 2 tests | ~40 seconds |
| UAT | chromium | regression | 4 tests | ~2 minutes |
| UAT | firefox | regression | 4 tests | ~2.5 minutes |
| STAGING | chromium | regression | 4 tests | ~2 minutes |

**Smoke tests:** 2 tests (from aa-website-pom.spec.ts)
**Regression tests:** 4 tests (2 from aa-website-pom.spec.ts + 1 from breakdownflowe2e.spec.ts = 3 regression, 1 smoke+regression)

---

## 🚀 Quick Start Commands

### **Local Testing (Before Jenkins)**

```bash
# Test smoke tests with chromium
npm run test:smoke -- --project=chromium

# Test regression tests with firefox
npm run test:regression -- --project=firefox

# Test specific environment
set ENVIRONMENT=QA
npm run test:smoke -- --project=chromium

# View report
npm run test:report
```

### **Example Jenkins Builds**

#### **QA Smoke on Chrome:**
```
Parameter Selection:
  ENVIRONMENT: QA
  BROWSER: chromium
  TEST_TYPE: smoke

Command Executed:
  npm run test:smoke -- --project=chromium

URL Used:
  https://qa.theaa.com (from playwright.config.ts)
```

#### **UAT Regression on Firefox:**
```
Parameter Selection:
  ENVIRONMENT: UAT
  BROWSER: firefox
  TEST_TYPE: regression

Command Executed:
  npm run test:regression -- --project=firefox

URL Used:
  https://uat.theaa.com (from playwright.config.ts)
```

---

## ✔️ Checklist

Before running pipeline, ensure:

- [ ] Jenkins plugins installed (Pipeline, Git, NodeJS, HTML Publisher, JUnit)
- [ ] NodeJS 18 configured in Global Tool Configuration
- [ ] Git repository accessible from Jenkins
- [ ] Actual QA/UAT/STAGING URLs updated in playwright.config.ts
- [ ] Test files have @smoke and @regression tags
- [ ] package.json has test:smoke and test:regression scripts
- [ ] Jenkins job created with Pipeline script from SCM
- [ ] First build completed successfully
- [ ] HTML Publisher plugin allows rendering (disable CSP if needed)

---

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [NodeJS Plugin Documentation](https://plugins.jenkins.io/nodejs/)
- [HTML Publisher Plugin](https://plugins.jenkins.io/htmlpublisher/)

---

## 🆗 Summary

### **What You Can Do Now:**

✅ Run tests on **3 environments** (QA, UAT, STAGING)  
✅ Run tests on **3 browsers** (chromium, firefox, webkit)  
✅ Run **2 test types** (smoke, regression)  
✅ View **HTML reports** in Jenkins  
✅ Download **test artifacts**  
✅ Track **test trends** over time  
✅ **Automated CI/CD** on code push  

### **Total Possible Combinations:**

**3 environments × 3 browsers × 2 test types = 18 possible test runs!**

---

**🎉 Jenkins CI Pipeline is ready to use!**
