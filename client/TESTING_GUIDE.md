# Website Testing Guide

## Overview
This guide provides a systematic approach to testing the LEO Satellite Hub website across different browsers, devices, and screen sizes.

## Browser Compatibility Testing

### Desktop Browsers
Test on the following browsers with minimum versions:
- **Chrome** (v90+)
- **Firefox** (v88+)
- **Safari** (v14+)
- **Edge** (v90+)

### Mobile Browsers
- **Safari iOS** (iOS 14+)
- **Chrome Android** (v90+)
- **Samsung Internet** (v14+)

### Testing Checklist for Each Browser
- [ ] All pages load without errors
- [ ] Navigation links work correctly
- [ ] Mobile menu toggles properly (on mobile/tablet)
- [ ] 3D STL models render and rotate smoothly
- [ ] Forms submit successfully (Contact page)
- [ ] FAQ accordion expands/collapses correctly
- [ ] All animations and transitions work smoothly
- [ ] CSS variables are supported and render correctly
- [ ] Fonts load properly
- [ ] Images and assets load correctly

## Responsive Design Testing

### Breakpoints to Test
1. **Mobile Small**: 320px - 480px
2. **Mobile Large**: 481px - 767px
3. **Tablet**: 768px - 1024px
4. **Desktop**: 1025px - 1440px
5. **Large Desktop**: 1441px+

### Device Testing
**Mobile Devices:**
- iPhone SE (375x667)
- iPhone 12/13 (390x844)
- iPhone 14 Pro Max (430x932)
- Samsung Galaxy S21 (360x800)
- Google Pixel 5 (393x851)

**Tablets:**
- iPad Mini (768x1024)
- iPad Air (820x1180)
- iPad Pro 12.9" (1024x1366)

**Desktop:**
- 1366x768 (common laptop)
- 1920x1080 (Full HD)
- 2560x1440 (2K)

### Responsive Testing Checklist
- [ ] Mobile menu appears at 768px and below
- [ ] Desktop navigation appears at 769px and above
- [ ] All text is readable without horizontal scrolling
- [ ] Images scale appropriately
- [ ] 3D viewer adjusts height on mobile (400px on 768px, 300px on 480px)
- [ ] Grid layouts stack properly on mobile
- [ ] Buttons are touch-friendly (minimum 44x44px)
- [ ] Form inputs are easily tappable on mobile
- [ ] Footer content stacks on mobile
- [ ] No content overflow or horizontal scrolling

## Page-Specific Testing

### Landing Page
- [ ] Hero section displays correctly
- [ ] 3D STL model loads and auto-rotates
- [ ] CTA buttons are visible and clickable
- [ ] Features grid displays properly (4 columns → 1 column on mobile)
- [ ] Stats section is readable
- [ ] Animations trigger on page load

### Business Model Page
- [ ] Page header gradient displays correctly
- [ ] Problem/solution cards display in grid
- [ ] Pricing cards are properly aligned
- [ ] Featured pricing card scales correctly
- [ ] Roadmap timeline displays properly
- [ ] CTA section at bottom is visible

### Technology (STL Explanation) Page
- [ ] Multiple 3D models load correctly
- [ ] View mode toggle works (grid/list)
- [ ] Category filters function properly
- [ ] Component cards expand/collapse
- [ ] Technical specifications table is readable
- [ ] Annotations display correctly on 3D models

### Dashboard Page
- [ ] Placeholder content displays correctly
- [ ] Features grid displays properly
- [ ] Integration notice is visible
- [ ] NPM dashboard container is ready for embedding

### Contact Page
- [ ] Form layout is two columns on desktop, single column on mobile
- [ ] All form fields are accessible
- [ ] Form validation works
- [ ] Submit button is functional
- [ ] Contact info section displays correctly

### FAQ Page
- [ ] FAQ items display as accordion
- [ ] Click to expand/collapse works
- [ ] Only one FAQ open at a time (or multiple, depending on implementation)
- [ ] Toggle icons (+/-) change correctly
- [ ] Contact CTA at bottom is visible

## Performance Testing

### Metrics to Check
- [ ] First Contentful Paint (FCP) < 1.8s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Time to Interactive (TTI) < 3.8s
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] Total page size < 3MB per page

### Tools
- Chrome DevTools Lighthouse
- WebPageTest.org
- GTmetrix
- Google PageSpeed Insights

## Accessibility Testing

### WCAG 2.1 Level AA Compliance
- [ ] All images have alt text
- [ ] Color contrast ratio ≥ 4.5:1 for normal text
- [ ] Color contrast ratio ≥ 3:1 for large text
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus indicators are visible
- [ ] ARIA labels on interactive elements
- [ ] Form labels are properly associated
- [ ] Heading hierarchy is logical (h1 → h2 → h3)

### Tools
- Chrome DevTools Accessibility Inspector
- axe DevTools browser extension
- WAVE browser extension
- Keyboard-only navigation testing

## 3D Model Testing

### STL Viewer Specific Tests
- [ ] Models load within 3 seconds
- [ ] Loading spinner displays during load
- [ ] Error message displays if model fails to load
- [ ] Auto-rotation works smoothly (no jank)
- [ ] Manual rotation with mouse/touch works
- [ ] Zoom in/out functions properly
- [ ] Pan functionality works
- [ ] Models are centered correctly
- [ ] Lighting renders models clearly
- [ ] Performance is smooth (60fps) on mid-range devices

## Animation & Transition Testing

### Verify Smooth Animations
- [ ] Page load fade-in animations (fadeInUp)
- [ ] Hover effects on cards and buttons
- [ ] Mobile menu slide-down animation
- [ ] Hamburger icon transformation (to X)
- [ ] FAQ accordion expand/collapse
- [ ] Button hover states (translateY, color change)
- [ ] Loading spinner rotation
- [ ] Skeleton loading animation

## Common Issues to Check

### CSS Issues
- [ ] No CSS variable fallbacks needed (all modern browsers)
- [ ] No layout shifts during page load
- [ ] No z-index conflicts
- [ ] No overflow issues

### JavaScript Issues
- [ ] No console errors
- [ ] React hydration works correctly
- [ ] State management functions properly
- [ ] Event listeners work on all devices

### Asset Loading
- [ ] All fonts load correctly
- [ ] STL files load from /public/models/
- [ ] No 404 errors in network tab
- [ ] Images are optimized and load quickly

## Testing Tools & Resources

### Browser DevTools
- Chrome DevTools (Device Mode for responsive testing)
- Firefox Developer Tools
- Safari Web Inspector

### Online Testing Services
- BrowserStack (cross-browser testing)
- LambdaTest (cross-browser testing)
- Responsinator (responsive design testing)
- Am I Responsive? (quick responsive preview)

### Local Testing
```bash
# Run development server
cd client
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Mobile Testing
- Use Chrome DevTools Device Mode
- Test on actual devices when possible
- Use remote debugging for mobile browsers

## Bug Reporting Template

When reporting issues, include:

**Browser/Device:**
- Browser name and version
- Operating system
- Device (if mobile/tablet)
- Screen resolution

**Issue Description:**
- What happened
- What was expected
- Steps to reproduce
- Screenshots/video if applicable

**Console Errors:**
- Any JavaScript errors
- Network errors
- CSS warnings

## Sign-Off Checklist

Before deploying to production:
- [ ] All pages tested on Chrome, Firefox, Safari, Edge
- [ ] Mobile menu works on all mobile devices
- [ ] All 3D models load and render correctly
- [ ] Forms submit successfully
- [ ] No console errors on any page
- [ ] Lighthouse score > 90 for Performance, Accessibility, Best Practices
- [ ] All responsive breakpoints tested
- [ ] Cross-browser compatibility verified
- [ ] Accessibility standards met (WCAG 2.1 AA)
- [ ] Loading states work correctly
- [ ] All animations are smooth

## Continuous Testing

After deployment:
- Monitor real user metrics (Core Web Vitals)
- Set up error tracking (e.g., Sentry)
- Regularly test on new browser versions
- Test after any dependency updates
- Gather user feedback on usability

---

**Last Updated:** [Current Date]
**Maintained By:** Development Team
