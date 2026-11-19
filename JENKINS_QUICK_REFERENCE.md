# ⚡ Jenkins CI/CD - Quick Reference

## 🛠️ Required Jenkins Plugins

```
☑️ Pipeline
☑️ Git
☑️ NodeJS Plugin
☑️ HTML Publisher
☑️ JUnit
```

---

## 🔧 Jenkins Configuration Steps

### **1. Install Plugins**
```
Manage Jenkins > Manage Plugins > Available
→ Search and install plugins above
```

### **2. Configure NodeJS**
```
Manage Jenkins > Global Tool Configuration > NodeJS
→ Add NodeJS
→ Name: NodeJS 18
→ Version: 18.x or higher
→ Save
```

### **3. Create Pipeline Job**
```
New Item > Pipeline > OK
Pipeline Section:
  → Definition: Pipeline script from SCM
  → SCM: Git
  → Repository URL: https://github.com/your-repo/AAPlaywright.git
  → Branch: */main
  → Script Path: Jenkinsfile
Save
```

---

## 📊 Build Parameters

| Parameter | Options | Description |
|-----------|---------|-------------|
| `ENVIRONMENT` | QA, UAT, STAGING | Test environment |
| `BROWSER` | chromium, firefox, webkit | Browser |
| `TEST_TYPE` | smoke, regression | Test type |

---

## ⚠️ IMPORTANT: Update Placeholder URLs

**File: `playwright.config.ts`**

Replace these with actual URLs:

```typescript
'QA': 'https://qa.theaa.com',         // ⚠️ REPLACE ME
'UAT': 'https://uat.theaa.com',       // ⚠️ REPLACE ME
'STAGING': 'https://staging.theaa.com', // ⚠️ REPLACE ME
```

---

## 🚀 Example Build Configurations

### **QA Smoke Tests (Chrome)**
```
ENVIRONMENT: QA
BROWSER: chromium
TEST_TYPE: smoke

Command: npm run test:smoke -- --project=chromium
URL: https://qa.theaa.com
Tests: 2 smoke tests
Duration: ~30 seconds
```

### **UAT Regression Tests (Firefox)**
```
ENVIRONMENT: UAT
BROWSER: firefox
TEST_TYPE: regression

Command: npm run test:regression -- --project=firefox
URL: https://uat.theaa.com
Tests: 4 regression tests
Duration: ~2 minutes
```

### **STAGING Regression Tests (Safari)**
```
ENVIRONMENT: STAGING
BROWSER: webkit
TEST_TYPE: regression

Command: npm run test:regression -- --project=webkit
URL: https://staging.theaa.com
Tests: 4 regression tests
Duration: ~2.5 minutes
```

---

## 📄 Test Tags

| Test File | Test | Tags |
|-----------|------|------|
| aa-website-pom.spec.ts | load AA homepage | @smoke |
| aa-website-pom.spec.ts | verify navigation menu | @smoke @regression |
| aa-website-pom.spec.ts | demonstrate scrolling | @regression |
| breakdownflowe2e.spec.ts | breakdown cover flow | @regression |

**Smoke:** 2 tests  
**Regression:** 4 tests

---

## 📊 Pipeline Stages

```
1. Checkout          - Get code from Git
2. Verify Node.js    - Check Node.js/npm versions
3. Install Deps      - npm ci
4. Install Browsers  - Install selected browser
5. Execute Tests     - Run smoke/regression tests

Post Actions (Always):
  - Archive test results
  - Publish HTML report
  - Publish JUnit results
```

---

## 📝 NPM Scripts Added

```json
"test:smoke": "playwright test --grep @smoke"
"test:regression": "playwright test --grep @regression"
```

---

## 🔐 Optional: Jenkins Credentials

Create these in **Manage Jenkins > Manage Credentials** if needed:

```
ID: TEST_PASSWORD
Type: Secret text
Value: <your test password>

ID: QA_BASE_URL
Type: Secret text
Value: <your QA URL>

ID: UAT_BASE_URL
Type: Secret text
Value: <your UAT URL>
```

---

## ⚙️ Environment Variables Set by Jenkins

```bash
ENVIRONMENT=${params.ENVIRONMENT}  # QA, UAT, or STAGING
CI=true
HEADLESS=true
BROWSER=${params.BROWSER}
TEST_TYPE=${params.TEST_TYPE}
```

---

## 📊 Viewing Reports

### **HTML Report:**
```
Build Page > Playwright Test Report (left sidebar)
```

### **JUnit Results:**
```
Build Page > Test Result Trend (graph)
```

### **Artifacts:**
```
Build Page > Build Artifacts
  → test-results/
  → playwright-report/
  → screenshots/
```

---

## 🔧 Common Issues

### **Issue: "nodejs: command not found"**
```
Solution: Configure NodeJS in Global Tool Configuration
Name must be: NodeJS 18
```

### **Issue: "No tests matched"**
```
Solution: Verify test tags:
test('@smoke should load', async () => { ... })
```

### **Issue: Wrong URL used**
```
Solution: Update playwright.config.ts with actual URLs
Check console output for "Using QA environment URL: ..."
```

---

## 🚀 Local Testing Commands

```bash
# Smoke tests (chromium)
npm run test:smoke -- --project=chromium

# Regression tests (firefox)
npm run test:regression -- --project=firefox

# Test specific environment
set ENVIRONMENT=QA
npm run test:smoke -- --project=chromium

# View report
npm run test:report
```

---

## ✔️ Pre-Flight Checklist

- [ ] Jenkins plugins installed
- [ ] NodeJS 18 configured
- [ ] Git repo accessible
- [ ] URLs updated in playwright.config.ts
- [ ] Test files have tags
- [ ] package.json has scripts
- [ ] Pipeline job created
- [ ] First build successful

---

## 📊 Test Matrix

**Possible combinations:** 3 envs × 3 browsers × 2 test types = **18 configurations**

---

**📚 Full Documentation:** See `JENKINS_CI_SETUP_GUIDE.md`
