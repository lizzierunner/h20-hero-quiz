# 🚀 Deployment Guide

## GitHub Pages Deployment

### Quick Setup
1. **Push to GitHub**: Your repository is ready to push
2. **Enable GitHub Pages**: Go to repository Settings → Pages
3. **Select Source**: Choose "Deploy from a branch"
4. **Select Branch**: Choose `main` branch and `/ (root)` folder
5. **Save**: GitHub will automatically deploy your game

### Your game will be available at:
```
https://yourusername.github.io/h2o-hero-quiz/
```

### Custom Domain (Optional)
1. Add a `CNAME` file with your domain
2. Configure DNS settings
3. Enable HTTPS in GitHub Pages settings

## Local Development

### Start Local Server
```bash
# Using Python 3
python3 -m http.server 8080

# Using Python 2
python -m SimpleHTTPServer 8080

# Using Node.js
npx http-server -p 8080

# Using PHP
php -S localhost:8080
```

### Then visit: `http://localhost:8080`

## Performance Optimization

### For Production
- All assets are already optimized
- Uses CDN for external dependencies
- Responsive images and efficient CSS
- Minified particle.js from CDN

### Speed Improvements
- Enable GitHub Pages CDN
- Use custom domain with Cloudflare
- Enable browser caching headers

## 🌟 Share Your Game

Once deployed, share your spectacular game:
- Update README.md with your live URL
- Share on social media with #H2OHero #charitywater
- Submit to educational game directories
- Share with charity:water community

## 🔧 Troubleshooting

### Common Issues
1. **Particles not working**: Check CDN connection
2. **Audio not playing**: Requires user interaction first
3. **Mobile issues**: Test on actual devices
4. **Font issues**: Google Fonts CDN dependency

### Debug Mode
Add `?debug=true` to URL for console logging
