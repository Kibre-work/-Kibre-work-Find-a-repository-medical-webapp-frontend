# Security Features Documentation

This application implements comprehensive security measures for authentication and data protection.

## HTTPS Support

### ✅ Implemented Features
- **Environment-based API URLs**: Uses `VITE_API_URL` environment variable
- **Protocol Detection**: Automatically detects HTTPS vs HTTP
- **Secure Cookie Configuration**: Cookies are marked as secure in HTTPS environments
- **CORS Credentials**: Properly configured for cross-origin requests

### 🔧 Configuration
```bash
# Development
VITE_API_URL=http://localhost:8000

# Production with HTTPS
VITE_API_URL=https://your-api-domain.com
```

## HTTP-Only Cookies

### ✅ Implemented Features
- **Automatic Cookie Transmission**: Uses `credentials: 'include'` for all requests
- **No Client-Side Token Access**: JWT tokens are never accessible via JavaScript
- **CSRF Protection**: CSRF tokens are included for state-changing operations
- **Centralized Auth Utilities**: Consistent authentication handling across components

### 🔧 Backend Requirements
Your Django backend must set cookies with these attributes:
```python
response.set_cookie(
    'jwt_token',
    token,
    httponly=True,  # Required
    secure=True,    # In production
    samesite='Lax', # Recommended
    max_age=3600    # 1 hour
)
```

## SameSite Support

### ✅ Implemented Features
- **CSRF Token Handling**: Automatic CSRF token inclusion for POST/PUT/DELETE
- **Cookie Analysis**: Debug component shows cookie attributes
- **Cross-Site Request Protection**: Proper SameSite configuration

### 🔧 Backend Requirements
```python
# Django settings.py
CSRF_COOKIE_SECURE = True  # In production
CSRF_COOKIE_SAMESITE = 'Lax'
SESSION_COOKIE_SECURE = True  # In production
SESSION_COOKIE_SAMESITE = 'Lax'
```

## Security Checklist

### Frontend ✅
- [x] Environment-based API URLs
- [x] HTTPS protocol detection
- [x] HTTP-only cookie support
- [x] CSRF token handling
- [x] Secure fetch options
- [x] No client-side token storage
- [x] Proper CORS credentials

### Backend Requirements ⚠️
- [ ] Set `httponly=True` on JWT cookies
- [ ] Set `secure=True` in production
- [ ] Configure `samesite='Lax'` or `'Strict'`
- [ ] Enable CORS with credentials
- [ ] Implement CSRF protection
- [ ] Use HTTPS in production

## Testing

Use the debug component at `/auth-test` to verify:
- Authentication status
- Cookie attributes
- HTTPS detection
- API connectivity
- Security configuration

## Environment Variables

Create a `.env` file in the project root:
```env
# Development
VITE_API_URL=http://localhost:8000

# Production
VITE_API_URL=https://your-api-domain.com
```

## Security Recommendations

1. **Always use HTTPS in production**
2. **Set proper cookie attributes on the backend**
3. **Configure CORS properly**
4. **Implement rate limiting**
5. **Use secure headers**
6. **Regular security audits**
7. **Keep dependencies updated** 