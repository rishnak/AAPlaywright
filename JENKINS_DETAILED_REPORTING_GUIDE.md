# 📊 Jenkins Detailed Reporting Guide

## 🎯 Overview

This guide explains how to access detailed test execution reports in your Jenkins pipeline, including step-by-step execution details, screenshots, videos, and test results.

---

## ✅ What's Configured

### **1. Playwright Reports (Enhanced)**

Your `playwright.config.js` now generates:

- ✅ **HTML Report** - Interactive web report with step-by-step execution
- ✅ **JUnit XML** - Test results for Jenkins Test Result Trend
- ✅ **JSON Report** - Programmatic access to test data
- ✅ **Screenshots** - Captured on test failures
- ✅ **Videos** - Recorded for failed tests
- ✅ **Trace Files** - Detailed step-by-step execution with network activity

### **2. Jenkins Post-Build Actions**

Your Jenkinsfile automatically:

- ✅ Archives all test artifacts (reports, screenshots, videos)
- ✅ Publishes interactive HTML report
- ✅ Publishes JUnit test results
- ✅ Keeps report history for trend analysis

---

## 📋 How to Access Reports After Each Build

### **Step 1: Navigate to Your Jenkins Build**

1. Open Jenkins: `http://your-jenkins-url`
2. Click on your project: **AAPlaywright** (or your job name)
3. Click on a specific build number (e.g., **#15**)

---

### **Step 2: Access the HTML Report**

#### **Option A: From Build Page**

1. On the build page, look for **"Playwright Test Report"** in the left sidebar
2. Click on it to open the interactive HTML report

#### **Option B: From Build Artifacts**

1. Scroll down to **"Build Artifacts"** section
2. Click on `playwright-report/` folder
3. Click on `index.html`

---

### **Step 3: Explore the HTML Report**

The HTML report shows:

#### **Summary Page**
```
📊 Test Summary
├─ Total Tests: 2
├─ Passed: 2 ✅
├─ Failed: 0 ❌
├─ Skipped: 0 ⏭️
└─ Duration: 10.6s
```

#### **Test Details** (Click on any test)
```
📝 Test: "@smoke should load AA homepage"
├─ Status: ✅ Passed
├─ Duration: 6.5s
├─ Browser: chromium
└─ Steps:
    ├─ 1. Navigate to https://www.theaa.com
    ├─ 2. Click cookie consent button
    ├─ 3. Verify page title contains "AA"
    ├─ 4. Verify URL is correct
    └─ 5. Take screenshot
```

#### **Attachments** (For failed tests)
```
📎 Attachments:
├─ 🖼️ Screenshot (failure.png)
├─ 🎥 Video (test-recording.webm)
└─ 🔍 Trace (trace.zip) ← Click to view step-by-step replay
```

---

### **Step 4: View Test Result Trends**

1. Go back to the **project page** (not build page)
2. Look for **"Test Result Trend"** graph
3. This shows pass/fail history across all builds

---

## 🔍 Detailed Step-by-Step Execution (Trace Viewer)

### **What is Trace Viewer?**

Playwright's Trace Viewer provides:
- ✅ **Timeline** of all actions
- ✅ **DOM snapshots** before/after each action
- ✅ **Network requests** and responses
- ✅ **Console logs**
- ✅ **Action screenshots**

### **How to Access Trace Viewer**

#### **Option 1: From HTML Report (Failed Tests)**

1. Open the HTML report
2. Click on a **failed test**
3. Click on **"trace.zip"** in the Attachments section
4. Download the trace file
5. Open it locally:
   ```bash
   npx playwright show-trace trace.zip
   ```

#### **Option 2: From Jenkins Artifacts**

1. Go to build page → **Build Artifacts**
2. Navigate to `test-results/`
3. Download `trace.zip` files
4. Open locally:
   ```bash
   npx playwright show-trace path/to/trace.zip
   ```

---

## 📸 Screenshots and Videos

### **When Are They Captured?**

- **Screenshots**: Only on test **failures**
- **Videos**: Only for **failed tests**
- **Trace**: Only on **first retry** or **failure**

### **Where to Find Them?**

#### **In HTML Report:**
- Click on a failed test
- Scroll to **"Attachments"** section
- Click to view inline or download

#### **In Jenkins Artifacts:**
```
Build Artifacts:
├─ playwright-report/
│   ├─ index.html          ← Main report
│   └─ data/
│       ├─ screenshots/
│       └─ videos/
└─ test-results/
    ├─ junit.xml           ← Test results
    ├─ results.json        ← JSON data
    └─ traces/             ← Trace files
```

---

## 📊 Report Sections Explained

### **1. Summary Section**

```
All Tests (2)
✅ Passed: 2
❌ Failed: 0
⏭️ Skipped: 0
⏱️ Duration: 10.6s
🌐 Browser: chromium
```

### **2. Test List**

```
✅ tests/aa-website-pom.spec.ts
   ├─ @smoke should load AA homepage (6.5s) ✅
   └─ @smoke @regression should verify navigation (8.5s) ✅
```

### **3. Individual Test Details**

Click any test to see:
- **Test name and tags**
- **Status** (passed/failed/skipped)
- **Duration**
- **Browser/Project**
- **Error message** (if failed)
- **Stack trace** (if failed)
- **Attachments** (screenshots, videos, traces)

---

## 🎥 Trace Viewer Features

### **Opening Trace Viewer**

```bash
# Download trace.zip from Jenkins artifacts
npx playwright show-trace trace.zip
```

### **What You'll See:**

#### **1. Action Timeline**
```
0.0s  │ Navigate to https://www.theaa.com
1.5s  │ Click "Accept Cookies"
2.0s  │ Wait for page load
2.5s  │ Check title contains "AA"
3.0s  │ Verify URL
```

#### **2. DOM Snapshots**
- See the page **before** and **after** each action
- Inspect elements at any point in time

#### **3. Network Tab**
- All HTTP requests/responses
- Request/response headers
- Response bodies

#### **4. Console Logs**
- JavaScript errors
- Console.log outputs
- Warnings

#### **5. Screenshots**
- Automatic screenshots at each step
- Hover timeline to see page state

---

## 📈 Test Result Trend Graph

### **Location:**
Project page (not build page) → **Test Result Trend**

### **What It Shows:**
```
📊 Test Results Over Time

Build #  | Passed | Failed | Skipped | Total
---------|--------|--------|---------|------
#15      |   2    |   0    |    0    |   2
#14      |   1    |   1    |    0    |   2
#13      |   2    |   0    |    0    |   2
#12      |   0    |   2    |    0    |   2
```

---

## 🚀 Quick Access Guide

### **After Each Build:**

1. ✅ **Go to build page** → Click build number (e.g., #15)
2. ✅ **Click "Playwright Test Report"** in left sidebar
3. ✅ **Explore test results:**
   - Summary stats at top
   - Click any test for details
   - View screenshots/videos for failures
   - Download traces for detailed analysis

### **For Failed Tests:**

1. ✅ **Open HTML report** → Click failed test
2. ✅ **View error message** and stack trace
3. ✅ **Check screenshot** to see what happened
4. ✅ **Watch video** to replay the failure
5. ✅ **Download trace** for step-by-step debugging

### **For Trend Analysis:**

1. ✅ **Go to project page** (not build page)
2. ✅ **View "Test Result Trend"** graph
3. ✅ **Compare across builds** to spot patterns

---

## 🎯 Report Enhancements Made

### **Before (Limited Visibility):**
```
❌ No step-by-step execution details
❌ Limited failure information
❌ No trace files
❌ Traces only on first retry
```

### **After (Enhanced Reporting):**
```
✅ Detailed step-by-step execution in HTML report
✅ Screenshots on all failures
✅ Videos for failed tests
✅ Trace files for all failures (not just retries)
✅ JSON report for programmatic access
✅ Enhanced JUnit XML with annotations
✅ All artifacts archived in Jenkins
✅ HTML report published and accessible from build page
```

---

## 📝 Configuration Summary

### **playwright.config.js Changes:**

```javascript
reporter: [
  ['list'],           // Console output
  ['html', {...}],    // Interactive HTML report
  ['junit', {...}],   // Jenkins test results
  ['json', {...}],    // JSON data export
],

use: {
  trace: 'retain-on-failure',    // ← Changed from 'on-first-retry'
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
}
```

### **Jenkinsfile Configuration:**

```groovy
post {
  always {
    // Archive all artifacts
    archiveArtifacts 'playwright-report/**/*'
    archiveArtifacts 'test-results/**/*'
    
    // Publish HTML report
    publishHTML([
      reportDir: 'playwright-report',
      reportFiles: 'index.html',
      reportName: 'Playwright Test Report'
    ])
    
    // Publish JUnit results
    junit 'test-results/junit.xml'
  }
}
```

---

## 🔧 Troubleshooting

### **Issue: Can't see HTML report link**

**Solution:**
1. Check Jenkins → Manage Jenkins → Configure Global Security
2. Under **"Markup Formatter"**, select **"Safe HTML"** or **"Raw HTML"**
3. Click **Save**

### **Issue: HTML report shows "No tests found"**

**Solution:**
1. Verify tests actually ran (check console output)
2. Ensure `playwright-report/` folder exists in workspace
3. Check `playwright.config.js` has `reporter: ['html']`

### **Issue: Trace files not generated**

**Solution:**
1. Verify `trace: 'retain-on-failure'` in `playwright.config.js`
2. Only failed tests generate traces
3. Run a test that fails to verify

---

## 📚 Additional Resources

- **Playwright HTML Reporter:** https://playwright.dev/docs/test-reporters#html-reporter
- **Trace Viewer Guide:** https://playwright.dev/docs/trace-viewer
- **Jenkins HTML Publisher:** https://plugins.jenkins.io/htmlpublisher/

---

## ✅ Next Steps

1. ✅ **Trigger a new Jenkins build**
2. ✅ **Click "Playwright Test Report"** after build completes
3. ✅ **Explore the interactive HTML report**
4. ✅ **Download a trace file** and open with `npx playwright show-trace trace.zip`
5. ✅ **Review the Test Result Trend graph** on the project page

---

**🎉 You now have detailed, step-by-step test execution reports available after every Jenkins build!**
