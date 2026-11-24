/**
 * Jenkins Declarative Pipeline for Playwright Test Automation
 * Supports: chromium, firefox, webkit browsers
 * Test Types: smoke, regression
 * Single Environment Configuration
 * 
 * Compatible with Windows agents
 */

pipeline {
    agent any
    
    // Build parameters
    parameters {
        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit'],
            description: 'Select the browser to run tests'
        )
        choice(
            name: 'TEST_TYPE',
            choices: ['smoke', 'regression'],
            description: 'Select the test type to execute'
        )
    }
    
    // Environment variables
    environment {
        // CI flag
        CI = 'true'
        
        // Browser settings
        BROWSER = "${params.BROWSER}"
        HEADLESS = 'true'
        
        // Test type
        TEST_TYPE = "${params.TEST_TYPE}"
        
        // Node.js version (configure in Jenkins Global Tool Configuration)
        NODE_VERSION = 'NodeJS 20'
        
        // Report directories
        REPORT_DIR = 'playwright-report'
        TEST_RESULTS_DIR = 'test-results'
        SCREENSHOTS_DIR = 'screenshots'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo "============================================"
                echo "  CHECKOUT SOURCE CODE"
                echo "============================================"
                echo "Browser: ${params.BROWSER}"
                echo "Test Type: ${params.TEST_TYPE}"
                echo "============================================"
                
                checkout scm
                
                // Display build info
                bat '''
                    echo.
                    echo Current Directory:
                    cd
                    echo.
                    echo Directory Contents:
                    dir
                '''
            }
        }
        
        stage('Verify Node.js & npm') {
            steps {
                echo "Verifying Node.js and npm versions..."
                
                script {
                    // Use NodeJS tool configured in Jenkins
                    nodejs(nodeJSInstallationName: env.NODE_VERSION) {
                        bat '''
                            echo.
                            echo Node.js Version:
                            node --version
                            echo.
                            echo npm Version:
                            npm --version
                            echo.
                        '''
                    }
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies using npm ci..."
                
                script {
                    nodejs(nodeJSInstallationName: env.NODE_VERSION) {
                        bat '''
                            echo.
                            echo Installing dependencies...
                            npm ci
                            echo.
                            echo Dependencies installed successfully!
                        '''
                    }
                }
            }
        }
        
        stage('Install Playwright Browsers') {
            steps {
                echo "Installing Playwright browsers and dependencies..."
                
                script {
                    nodejs(nodeJSInstallationName: env.NODE_VERSION) {
                        // Install only the selected browser + dependencies
                        bat """
                            echo.
                            echo Installing Playwright browser: ${params.BROWSER}
                            npx playwright install ${params.BROWSER} --with-deps
                            echo.
                            echo Browser installation completed!
                        """
                    }
                }
            }
        }
        
        stage('Execute Playwright Tests') {
            steps {
                script {
                    echo "============================================"
                    echo "  EXECUTING ${params.TEST_TYPE.toUpperCase()} TESTS"
                    echo "  Browser: ${params.BROWSER}"
                    echo "============================================"
                    
                    nodejs(nodeJSInstallationName: env.NODE_VERSION) {
                        // Execute tests with environment variables
                        // Use catchError to continue pipeline even if tests fail
                        catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                            bat """
                                @echo off
                                echo.
                                echo Setting environment variables...
                                set CI=true
                                set HEADLESS=true
                                echo.
                                echo Running ${params.TEST_TYPE} tests on ${params.BROWSER}...
                                echo.
                                
                                REM Execute npm script based on test type
                                npm run test:${params.TEST_TYPE} -- --project=${params.BROWSER}
                            """
                        }
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo "============================================"
            echo "  POST-BUILD ACTIONS"
            echo "============================================"
            
            script {
                // Archive test artifacts
                echo "Archiving test results and reports..."
                
                archiveArtifacts(
                    artifacts: "${TEST_RESULTS_DIR}/**/*",
                    allowEmptyArchive: true,
                    fingerprint: true
                )
                
                archiveArtifacts(
                    artifacts: "${REPORT_DIR}/**/*",
                    allowEmptyArchive: true,
                    fingerprint: true
                )
                
                archiveArtifacts(
                    artifacts: "${SCREENSHOTS_DIR}/**/*",
                    allowEmptyArchive: true,
                    fingerprint: true
                )
                
                // Publish HTML report
                echo "Publishing HTML test report..."
                publishHTML([
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: "${REPORT_DIR}",
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report',
                    reportTitles: "${params.BROWSER} - ${params.TEST_TYPE}"
                ])
                
                // Publish JUnit test results
                echo "Publishing JUnit test results..."
                junit(
                    testResults: "${TEST_RESULTS_DIR}/junit.xml",
                    allowEmptyResults: true,
                    skipPublishingChecks: false
                )
            }
            
            echo "============================================"
            echo "  Pipeline completed!"
            echo "============================================"
        }
        
        success {
            echo "BUILD SUCCESSFUL - All tests passed!"
        }
        
        unstable {
            echo "BUILD UNSTABLE - Some tests failed!"
        }
        
        failure {
            echo "BUILD FAILED - Pipeline execution failed!"
        }
    }
}