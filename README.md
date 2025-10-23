# Guestogram - Coming Soon Website

A modern, responsive "Coming Soon" landing page for Guestogram, the ultimate guest management platform.

## Features

- **Responsive Design**: Works beautifully on all devices (desktop, tablet, mobile)
- **Countdown Timer**: Live countdown to launch date
- **Email Signup**: Collects early access email addresses with validation
- **Modern Animations**: Smooth CSS animations and particle effects
- **Progressive Web App**: Service Worker for offline functionality
- **SEO Optimized**: Meta tags for social media sharing
- **Accessibility**: WCAG compliant with keyboard navigation
- **Performance**: Optimized for fast loading

## File Structure

```
GuestogramComingSoon/
├── index.html          # Main HTML file
├── favicon.ico         # Website favicon
├── sw.js              # Service Worker for PWA
├── css/
│   └── style.css      # Main stylesheet
├── js/
│   └── script.js      # JavaScript functionality
├── images/
│   ├── logo.svg       # SVG logo
│   ├── logo.png       # PNG logo
│   └── og-image.jpg   # Open Graph image for social sharing
└── fonts/             # Custom fonts (if needed)
```

## Getting Started

1. **Local Development**:
   - Open `index.html` in a web browser
   - Or use a local server: `python -m http.server 8000` or `npx serve`

2. **Customization**:
   - **Launch Date**: Edit the `launchDate` in `js/script.js`
   - **Colors**: Modify CSS variables in `css/style.css`
   - **Logo**: Replace files in `/images/` folder
   - **Content**: Update text in `index.html`

3. **Email Integration**:
   - Replace the mock email submission in `js/script.js`
   - Integrate with your backend API or service (Mailchimp, ConvertKit, etc.)

## Configuration

### Launch Date
```javascript
// In js/script.js, line ~8
const launchDate = new Date();
launchDate.setDate(launchDate.getDate() + 30); // 30 days from now
```

### Email Service Integration
Replace the `submitEmail` function in `js/script.js` with your email service API:

```javascript
async function submitEmail(email) {
    const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
    });
    
    if (!response.ok) {
        throw new Error('Signup failed');
    }
    
    return response.json();
}
```

### Social Media Links
Update the social media links in the footer section of `index.html`:

```html
<a href="https://facebook.com/guestogram" class="social-link" aria-label="Facebook">
<a href="https://twitter.com/guestogram" class="social-link" aria-label="Twitter">
<!-- etc. -->
```

## SEO and Social Media

The site includes meta tags for:
- Open Graph (Facebook, LinkedIn)
- Twitter Cards
- Search Engine Optimization

Update these in the `<head>` section of `index.html`:

```html
<meta property="og:title" content="Guestogram - Coming Soon">
<meta property="og:description" content="Your custom description">
<meta property="og:url" content="https://yourdomain.com">
```

## Performance

- **Images**: All images are optimized SVGs for crisp display
- **Fonts**: Uses system fonts with Google Fonts as fallback
- **CSS**: Minified and optimized for production
- **JavaScript**: Efficient, non-blocking code
- **Service Worker**: Caches resources for offline access

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Analytics Integration

To add analytics, include your tracking code in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Deployment

### Static Hosting (Recommended)
- **Netlify**: Connect your Git repository for automatic deployments
- **Vercel**: Zero-config deployment with Git integration  
- **GitHub Pages**: Free hosting for public repositories
- **Cloudflare Pages**: Fast global CDN with Git integration

### Traditional Web Hosting
1. Upload all files to your web server
2. Ensure `index.html` is in the root directory
3. Set up HTTPS (recommended for PWA features)

### Domain Configuration
1. Point your domain to the hosting service
2. Update the `og:url` meta tag with your final domain
3. Update any hardcoded URLs in the code

## Customization Guide

### Colors
The site uses CSS custom properties for easy color customization:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --accent-color: #ff6b6b;
  --text-color: #ffffff;
}
```

### Animations
To disable animations for users who prefer reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
  }
}
```

### Content
- Edit the tagline and description in `index.html`
- Update feature descriptions in the features grid
- Modify the footer text and copyright information

## Security

- Form validation on both client and server side
- HTTPS recommended for production
- Content Security Policy headers recommended
- Email validation prevents malicious input

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or issues:
- Open an issue in the repository
- Contact the development team
- Check the documentation for common solutions

---

Built with ❤️ for Guestogram