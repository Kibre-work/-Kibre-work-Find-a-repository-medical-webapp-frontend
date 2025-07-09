import React, { useState, useEffect } from 'react';
import { isAuthenticated, getEnvironmentInfo, getFetchOptions } from '../utils/auth';
import config from '../config';

const AuthTest = () => {
  const [authStatus, setAuthStatus] = useState('Checking...');
  const [envInfo, setEnvInfo] = useState({});
  const [testResults, setTestResults] = useState({});
  const [networkTests, setNetworkTests] = useState({});

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await isAuthenticated();
        setAuthStatus(authenticated ? 'Authenticated' : 'Not Authenticated');
      } catch (error) {
        setAuthStatus(`Error: ${error.message}`);
      }
    };

    // Get environment information
    setEnvInfo(getEnvironmentInfo());
    
    checkAuth();
  }, []);

  const testNetworkConnectivity = async () => {
    const tests = {};
    
    // Test 1: Basic connectivity to API base URL
    try {
      const response = await fetch(`${config.API_BASE_URL}/`, {
        method: 'GET',
        credentials: 'include',
      });
      tests.basicConnectivity = {
        status: 'success',
        message: `Connected to ${config.API_BASE_URL}`,
        statusCode: response.status
      };
    } catch (error) {
      tests.basicConnectivity = {
        status: 'error',
        message: `Cannot connect to ${config.API_BASE_URL}`,
        error: error.message
      };
    }

    // Test 2: CORS preflight
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/`, {
        method: 'OPTIONS',
        credentials: 'include',
      });
      tests.corsPreflight = {
        status: 'success',
        message: 'CORS preflight successful',
        statusCode: response.status
      };
    } catch (error) {
      tests.corsPreflight = {
        status: 'error',
        message: 'CORS preflight failed',
        error: error.message
      };
    }

    // Test 3: API endpoint with proper headers
    try {
      const options = getFetchOptions('GET');
      const response = await fetch(`${config.API_BASE_URL}/api/feedback/all/`, options);
      tests.apiEndpoint = {
        status: 'success',
        message: 'API endpoint accessible',
        statusCode: response.status
      };
    } catch (error) {
      tests.apiEndpoint = {
        status: 'error',
        message: 'API endpoint failed',
        error: error.message
      };
    }

    setNetworkTests(tests);
  };

  const testFeedbackAPI = async () => {
    try {
      const options = getFetchOptions('GET');
      const response = await fetch(`${config.API_BASE_URL}/api/feedback/all/`, options);
      
      if (response.ok) {
        const data = await response.json();
        setTestResults({
          status: 'success',
          message: `Success! Found ${data.length} feedback items`,
          statusCode: response.status,
          headers: Object.fromEntries(response.headers.entries())
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        setTestResults({
          status: 'error',
          message: `Error ${response.status}: ${errorData.detail || response.statusText}`,
          statusCode: response.status,
          headers: Object.fromEntries(response.headers.entries())
        });
      }
    } catch (error) {
      setTestResults({
        status: 'error',
        message: `Network error: ${error.message}`,
        statusCode: 'N/A',
        headers: {},
        errorType: error.name,
        errorDetails: error.toString()
      });
    }
  };

  const analyzeCookies = () => {
    const cookies = document.cookie;
    if (!cookies) return [];
    
    const cookieList = cookies.split(';').map(cookie => {
      const [name, value] = cookie.trim().split('=');
      return { name, value: value || 'No value' };
    });
    
    return cookieList;
  };

  const getTroubleshootingSteps = () => {
    const steps = [];
    
    if (networkTests.basicConnectivity?.status === 'error') {
      steps.push('1. Check if Django backend is running on port 8000');
      steps.push('2. Verify the API_BASE_URL in config.js');
      steps.push('3. Check for firewall or antivirus blocking connections');
    }
    
    if (networkTests.corsPreflight?.status === 'error') {
      steps.push('4. Configure CORS in Django settings.py');
      steps.push('5. Install django-cors-headers: pip install django-cors-headers');
      steps.push('6. Add CORS_ALLOW_CREDENTIALS = True');
    }
    
    if (testResults.status === 'error' && testResults.errorType === 'TypeError') {
      steps.push('7. Check if the API endpoint exists in Django');
      steps.push('8. Verify URL patterns in Django urls.py');
    }
    
    return steps;
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Authentication Status</h5>
            </div>
            <div className="card-body">
              <p><strong>Auth Status:</strong> <span className={`badge ${authStatus === 'Authenticated' ? 'bg-success' : 'bg-danger'}`}>{authStatus}</span></p>
              <button 
                className="btn btn-primary me-2" 
                onClick={testFeedbackAPI}
              >
                Test Feedback API
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={testNetworkConnectivity}
              >
                Test Network
              </button>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Environment Info</h5>
            </div>
            <div className="card-body">
              <p><strong>Protocol:</strong> <span className={`badge ${envInfo.isHttps ? 'bg-success' : 'bg-warning'}`}>{envInfo.protocol}</span></p>
              <p><strong>HTTPS:</strong> {envInfo.isHttps ? 'Yes' : 'No'}</p>
              <p><strong>API Base URL:</strong> <code>{envInfo.apiBaseUrl}</code></p>
              <p><strong>Development:</strong> {envInfo.isDevelopment ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Network Tests */}
      {Object.keys(networkTests).length > 0 && (
        <div className="row mt-3">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5>Network Connectivity Tests</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {Object.entries(networkTests).map(([testName, result]) => (
                    <div key={testName} className="col-md-4">
                      <div className={`alert ${result.status === 'success' ? 'alert-success' : 'alert-danger'}`}>
                        <strong>{testName}:</strong> {result.message}
                        {result.statusCode && <br />}
                        {result.statusCode && <small>Status: {result.statusCode}</small>}
                        {result.error && <br />}
                        {result.error && <small>Error: {result.error}</small>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row mt-3">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Cookies Analysis</h5>
            </div>
            <div className="card-body">
              <h6>Current Cookies:</h6>
              <ul className="list-unstyled">
                {analyzeCookies().map((cookie, index) => (
                  <li key={index} className="mb-1">
                    <code>{cookie.name}</code>: {cookie.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Test Results</h5>
            </div>
            <div className="card-body">
              {testResults.status && (
                <div>
                  <p><strong>Status:</strong> <span className={`badge ${testResults.status === 'success' ? 'bg-success' : 'bg-danger'}`}>{testResults.status}</span></p>
                  <p><strong>Message:</strong> {testResults.message}</p>
                  <p><strong>Status Code:</strong> {testResults.statusCode}</p>
                  {testResults.errorType && (
                    <p><strong>Error Type:</strong> {testResults.errorType}</p>
                  )}
                  {testResults.errorDetails && (
                    <p><strong>Error Details:</strong> <code>{testResults.errorDetails}</code></p>
                  )}
                  {testResults.headers && Object.keys(testResults.headers).length > 0 && (
                    <div>
                      <strong>Response Headers:</strong>
                      <ul className="list-unstyled">
                        {Object.entries(testResults.headers).map(([key, value]) => (
                          <li key={key}><small><code>{key}: {value}</code></small></li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Troubleshooting Steps */}
      {getTroubleshootingSteps().length > 0 && (
        <div className="row mt-3">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5>🔧 Troubleshooting Steps</h5>
              </div>
              <div className="card-body">
                <ol>
                  {getTroubleshootingSteps().map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row mt-3">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5>Security Recommendations</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <h6>HTTPS Support</h6>
                  <ul className="list-unstyled">
                    <li>✅ Environment-based API URLs</li>
                    <li>✅ Protocol detection</li>
                    <li>⚠️ Configure VITE_API_URL for production</li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <h6>HTTP-Only Cookies</h6>
                  <ul className="list-unstyled">
                    <li>✅ credentials: 'include' used</li>
                    <li>✅ No client-side token access</li>
                    <li>⚠️ Backend must set HttpOnly flag</li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <h6>SameSite Support</h6>
                  <ul className="list-unstyled">
                    <li>✅ CSRF tokens for state changes</li>
                    <li>⚠️ Backend must set SameSite attribute</li>
                    <li>⚠️ Configure CORS properly</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthTest; 