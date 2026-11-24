# 🚀 Jenkins CI/CD Pipeline Setup Guide

## 📊 Overview

Simplified Jenkins CI/CD pipeline for Playwright test automation with:
- ✅ **Multi-browser support** (chromium, firefox, webkit)
- ✅ **Test type filtering** (smoke, regression)
- ✅ **Single environment** configuration
- ✅ **Windows agent** compatible

---

## 🛠️ Prerequisites

### **1. Jenkins Plugins Required**

Install via **Manage Jenkins** > **Manage Plugins** > **Available**:

```
☐ Pipeline
☐ Git
☐ NodeJS Plugin
☐ HTML Publisher
☐ JUnit
```

### **2. Configure NodeJS in Jenkins**

1. Go to **Manage Jenkins** > **Global Tool Configuration**
2. Scroll to **NodeJS** section
3. Click **Add NodeJS**
4. Configure:
   - **Name:** `NodeJS 18` ⚠️ Must match Jenkinsfile
   - **Version:** 18.x or higher
5. Click **Save**

---

## 📋 Build Parameters

The pipeline supports 2 parameters:

| Parameter | Options | Description |
|-----------|---------|-------------|
| **BROWSER** | chromium, firefox, webkit | Browser to run tests |
| **TEST_TYPE** | smoke, regression | Type of tests to execute |

---

## 🏗️ Creating Jenkins Pipeline Job

### **Step 1: Create New Pipeline Job**

1. Go to Jenkins Dashboard
2. Click **New Item**
3. Enter name: `Playwright-AA-Tests`
4. Select **Pipeline**
5. Click **OK**

### **Step 2: Configure Pipeline**

**Pipeline Section:**
- **Definition:** Pipeline script from SCM
- **SCM:** Git
- **Repository URL:** `https://github.com/your-username/AAPlaywright.git`
- **Credentials:** Select or add Git credentials
- **Branch Specifier:** `*/main` (or your branch)
- **Script Path:** `Jenkinsfile`

### **Step 3: Save and Build**

1. Click **Save**
2. Click **Build Now** (parameters will appear after first build)
3. After first build, use **Build with Parameters**

---

## ▶️ Running Tests

### **Build with Parameters**

Click **Build with Parameters** and select:

#### **Example 1: Smoke Tests on Chrome**
```
BROWSER: chromium
TEST_TYPE: smoke
```
**Result:** Runs 2 smoke tests on Chrome (~30 seconds)

#### **Example 2: Regression Tests on Firefox**
```
BROWSER: firefox
TEST_TYPE: regression
```
**Result:** Runs 4 regression tests on Firefox (~2 minutes)

#### **Example 3: Regression Tests on Safari**
```
BROWSER: webkit
TEST_TYPE: regression
```
**Result:** Runs 4 regression tests on Safari (~2.5 minutes)

---

## 📊 Pipeline Stages

```
1. Checkout              → Clone code from Git
2. Verify Node.js & npm  → Check versions
3. Install Dependencies  → Run npm ci
4. Install Browsers      → Install selected browser
5. Execute Tests         → Run smoke/regression tests

Post Actions (Always):
  → Archive test results
  → Publish HTML report
  → Publish JUnit results
```

---

## 📄 Test Reports

### **1. HTML Report**

- Build page → **Playwright Test Report** (left sidebar)
- Interactive report with screenshots and videos

### **2. JUnit Report**

- Build page → **Test Result Trend** graph
- Pass/fail statistics over time

### **3. Archived Artifacts**

- Build page → **Build Artifacts**
- Download `test-results/`, `playwright-report/`, `screenshots/`

---

## 🏷️ Test Tags

| Test File | Test | Tags |
|-----------|------|------|
| aa-website-pom.spec.ts | load AA homepage | `@smoke` |
| aa-website-pom.spec.ts | verify navigation menu | `@smoke @regression` |
| aa-website-pom.spec.ts | demonstrate scrolling | `@regression` |
| breakdownflowe2e.spec.ts | breakdown cover flow | `@regression` |

**Test Counts:**
- **Smoke:** 2 tests
- **Regression:** 4 tests

---

## 🔧 Commands Executed

### **Smoke Tests:**
```bash
npm run test:smoke -- --project=chromium
```

### **Regression Tests:**
```bash
npm run test:regression -- --project=firefox
```

---

## 🔐 Credentials (Optional)

If you need to use credentials:

1. **Manage Jenkins** > **Manage Credentials**
2. Add credentials:
   - ID: `TEST_PASSWORD`
   - Type: Secret text
   - Value: Your test password

3. Update Jenkinsfile:
```groovy
environment {
    TEST_PASSWORD = credentials('TEST_PASSWORD')
}
```

---

## 🔧 Troubleshooting

### **Issue: "nodejs: command not found"**

**Solution:**
- Configure NodeJS in Global Tool Configuration
- Name must be: `NodeJS 18`

### **Issue: "No tests matched"**

**Solution:**
- Verify test tags:
  ```typescript
  test('@smoke should load', async () => { ... })
  ```

### **Issue: Browser installation fails**

**Solution:**
- For Windows: Ensure agent has admin privileges
- Alternative: Pre-install browsers on agent

---

## 📊 Test Execution Matrix

| Browser | Test Type | Tests | Duration |
|---------|-----------|-------|----------|
| chromium | smoke | 2 | ~30s |
| firefox | smoke | 2 | ~35s |
| webkit | smoke | 2 | ~40s |
| chromium | regression | 4 | ~2m |
| firefox | regression | 4 | ~2.5m |
| webkit | regression | 4 | ~3m |

**Total combinations:** 3 browsers × 2 test types = **6 configurations**

---

## 🚀 Local Testing

Test before Jenkins:

```bash
# Smoke tests (chromium)
npm run test:smoke -- --project=chromium

# Regression tests (firefox)
npm run test:regression -- --project=firefox

# View report
npm run test:report
```

---

## ✅ Checklist

Before running pipeline:

- [ ] Jenkins plugins installed
- [ ] NodeJS 18 configured in Global Tool Configuration
- [ ] Git repository accessible
- [ ] Jenkins pipeline job created
- [ ] First build completed
- [ ] Parameters visible in "Build with Parameters"

---

## 📚 NPM Scripts

```json
"test": "playwright test"
"test:headed": "playwright test --headed"
"test:chromium": "playwright test --project=chromium"
"test:firefox": "playwright test --project=firefox"
"test:webkit": "playwright test --project=webkit"
"test:smoke": "playwright test --grep @smoke"
"test:regression": "playwright test --grep @regression"
"test:report": "playwright show-report"
```

---

## 📝 Summary

### **What You Can Do:**

✅ Run tests on **3 browsers** (chromium, firefox, webkit)  
✅ Run **2 test types** (smoke, regression)  
✅ View **HTML reports** in Jenkins  
✅ Download **test artifacts**  
✅ Track **test trends**  
✅ **6 total test configurations**  

---

**🎉 Jenkins CI Pipeline is ready!**
