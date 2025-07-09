# Troubleshooting Guide

## 🔍 "Failed to fetch" Error

This error occurs when the frontend cannot connect to the backend API. Here's how to diagnose and fix it:

### Step 1: Check Backend Status

**Is your Django backend running?**

```bash
# Check if Django is running on port 8000
curl http://localhost:8000/

# Or visit in browser
http://localhost:8000/
```

**If not running, start it:**
```bash
cd your-django-project
python manage.py runserver
```

### Step 2: Verify API URL Configuration

**Check your current API URL:**
1. Visit `/auth-test` in your React app
2. Look at the "Environment Info" section
3. Verify the "API Base URL" is correct

**Expected values:**
- Development: `http://localhost:8000`
- Production: `https://your-api-domain.com`

### Step 3: Test Network Connectivity

**Use the enhanced debug component:**
1. Go to `/auth-test`
2. Click "Test Network" button
3. Review the results for each test:
   - **Basic Connectivity**: Can reach the server
   - **CORS Preflight**: CORS is configured properly
   - **API Endpoint**: Specific endpoint is accessible

### Step 4: Common Issues & Solutions

#### Issue 1: Backend Not Running
```
Error: Cannot connect to http://localhost:8000
```
**Solution:**
```bash
# Start Django backend
python manage.py runserver

# Check for errors in Django console
```

#### Issue 2: Wrong Port
```
Error: Connection refused
```
**Solution:**
- Verify Django is running on port 8000
- Check if another service is using the port
- Update `config.js` if using different port

#### Issue 3: CORS Error
```
Error: CORS preflight failed
```
**Solution:**
```python
# In Django settings.py
INSTALLED_APPS = [
    'corsheaders',
    # ...
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Must be first
    'django.middleware.common.CommonMiddleware',
    # ...
]

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Your React dev server
]
```

#### Issue 4: API Endpoint Not Found
```
Error: 404 Not Found
```
**Solution:**
- Check Django `urls.py` for the endpoint
- Verify the URL pattern matches
- Check if the view exists

#### Issue 5: Firewall/Antivirus Blocking
```
Error: Network error
```
**Solution:**
- Temporarily disable firewall/antivirus
- Check Windows Defender settings
- Add localhost to allowed hosts

### Step 5: Quick Fixes

#### For Development:
```bash
# 1. Start Django backend
python manage.py runserver

# 2. Start React frontend (in another terminal)
npm run dev

# 3. Test connection
curl http://localhost:8000/api/
```

#### For Production:
```bash
# 1. Set environment variable
export VITE_API_URL=https://your-api-domain.com

# 2. Build and deploy
npm run build
```

### Step 6: Debug Commands

**Test API endpoints manually:**
```bash
# Test basic connectivity
curl -v http://localhost:8000/

# Test CORS preflight
curl -X OPTIONS -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: X-Requested-With" \
  http://localhost:8000/api/

# Test with credentials
curl -v --cookie "sessionid=your-session-id" \
  http://localhost:8000/api/feedback/all/
```

**Check Django logs:**
```bash
# Run Django with verbose output
python manage.py runserver --verbosity=2

# Check for CORS errors in console
```

### Step 7: Environment Configuration

**Create `.env` file in React project root:**
```env
# Development
VITE_API_URL=http://localhost:8000

# Production
VITE_API_URL=https://your-api-domain.com
```

**Update Django settings for development:**
```python
# settings.py
DEBUG = True
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# CORS settings for development
CORS_ALLOW_ALL_ORIGINS = True  # Only in development
CORS_ALLOW_CREDENTIALS = True
```

### Step 8: Browser Developer Tools

**Check Network tab:**
1. Open Developer Tools (F12)
2. Go to Network tab
3. Try the failing request
4. Look for:
   - Request URL
   - Response status
   - CORS errors
   - Network errors

**Check Console tab:**
- Look for JavaScript errors
- Check for CORS policy errors
- Verify fetch requests

### Step 9: Common Django Backend Issues

#### Missing CORS Headers:
```python
# Install django-cors-headers
pip install django-cors-headers

# Add to INSTALLED_APPS and MIDDLEWARE
```

#### Missing API Endpoints:
```python
# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('api/feedback/all/', views.feedback_list, name='feedback_list'),
    path('api/feedback/<int:id>/', views.feedback_detail, name='feedback_detail'),
]
```

#### Authentication Issues:
```python
# views.py
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
@login_required
def feedback_list(request):
    # Your view logic
    pass
```

### Step 10: Still Having Issues?

**Run the complete diagnostic:**
1. Visit `/auth-test`
2. Click both "Test Network" and "Test Feedback API"
3. Review all error messages
4. Check the troubleshooting steps provided
5. Verify backend logs for errors

**Common final checks:**
- [ ] Django backend is running
- [ ] React frontend is running
- [ ] Ports are correct (3000 for React, 8000 for Django)
- [ ] CORS is configured
- [ ] API endpoints exist
- [ ] No firewall blocking
- [ ] Environment variables are set correctly

If you're still having issues, please share:
1. The exact error message from `/auth-test`
2. Django console output
3. Browser console errors
4. Network tab details 