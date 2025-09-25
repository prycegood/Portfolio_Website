# Mechanical Engineer Portfolio Website

A sleek and modern portfolio website designed for mechanical engineers specializing in CFD, mechanical systems simulation, scientific programming, and mathematics.

## Features

### 🎨 Modern Design
- Clean, professional design with smooth animations
- Responsive layout that works on all devices
- Modern gradient backgrounds and sleek typography
- Interactive floating elements in hero section

### 🚀 Core Sections
- **Hero Section**: Professional introduction with animated background elements
- **About Section**: Expertise areas with interactive cards for CFD, Mechanical Systems, Scientific Programming, and Mathematics
- **Projects Section**: Dynamic project showcase with video upload capabilities
- **Contact Section**: Professional contact form and social links

### 📹 Video Project Showcase
- Upload and display MP4 videos of your engineering projects
- Project categorization (CFD Analysis, Mechanical Simulation, Scientific Programming, Applied Mathematics)
- Technology tags and detailed descriptions
- Local storage for project persistence

### 📱 Responsive Features
- Mobile-friendly navigation with hamburger menu
- Optimized layouts for tablets and smartphones
- Touch-friendly interface elements

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No server setup required - runs entirely in the browser

### Installation

1. **Download the files**: All files are ready to use in your project directory
   ```
   portfolioWebsite/
   ├── index.html
   ├── styles.css
   ├── script.js
   └── README.md
   ```

2. **Open the website**: Simply double-click `index.html` or open it in your web browser

### Customization

#### Personal Information
Edit the following sections in `index.html`:

**Navigation and Title**:
```html
<title>Your Name | Mechanical Engineer</title>
<h2>Your Name</h2>
```

**Hero Section**:
```html
<h1 class="hero-title">Your Professional Title</h1>
<p class="hero-subtitle">Your specialization description</p>
```

**Contact Information**:
```html
<a href="mailto:your.email@example.com" class="contact-link">
<a href="https://linkedin.com/in/yourprofile" class="contact-link">
<a href="https://github.com/yourprofile" class="contact-link">
```

#### Styling Customization
Modify colors and styling in `styles.css`:

```css
:root {
    --primary-color: #2563eb;    /* Main brand color */
    --accent-color: #f59e0b;     /* Accent color for buttons */
    --text-primary: #1e293b;     /* Main text color */
}
```

## Usage Guide

### Adding Projects

1. **Click "Add New Project"** button in the Projects section
2. **Fill out the form**:
   - Project Title
   - Description
   - Category (CFD Analysis, Mechanical Simulation, Scientific Programming, Applied Mathematics)
   - Upload MP4 video file
   - Technologies used

3. **Submit** - Your project will appear in the grid with the uploaded video

### Project Management
- Projects are automatically saved to browser local storage
- Delete projects by hovering over a project card and clicking the delete button
- Videos are stored locally in the browser

### Contact Form
- Contact form provides user feedback
- Form validation ensures all fields are completed
- Success notifications confirm form submission

## Technical Details

### Built With
- **HTML5**: Semantic markup and modern web standards
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript**: No frameworks - pure JavaScript for maximum performance
- **Font Awesome**: Icons for professional appearance
- **Inter Font**: Modern, readable typography

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Features
- Optimized CSS with efficient selectors
- Lazy loading for better performance
- Minimal JavaScript footprint
- Responsive images and media

## File Structure

```
portfolioWebsite/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # Interactive functionality
└── README.md          # Documentation (this file)
```

### Key Components

**HTML Structure**:
- Semantic HTML5 elements
- Accessible navigation
- Modal dialogs for project uploads
- Structured data for better SEO

**CSS Features**:
- CSS Custom Properties for easy theming
- CSS Grid and Flexbox for layouts
- Smooth animations and transitions
- Mobile-first responsive design

**JavaScript Functionality**:
- Project management (add, delete, display)
- Local storage for data persistence
- Form handling and validation
- Smooth scrolling navigation
- Mobile menu toggle
- Intersection Observer for animations

## Customization Examples

### Changing the Color Scheme
```css
:root {
    --primary-color: #10b981;      /* Green theme */
    --accent-color: #f59e0b;       /* Keep orange accent */
    --gradient-primary: linear-gradient(135deg, #10b981 0%, #059669 100%);
}
```

### Adding New Project Categories
In `script.js`, modify the `categoryDisplayNames` object:
```javascript
const categoryDisplayNames = {
    'cfd': 'CFD Analysis',
    'simulation': 'Mechanical Simulation',
    'programming': 'Scientific Programming',
    'mathematics': 'Applied Mathematics',
    'thermal': 'Thermal Analysis',        // New category
    'materials': 'Materials Science'      // New category
};
```

### Modifying the Hero Background
Replace the gradient in `styles.css`:
```css
.hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    /* Or use an image: */
    /* background: url('your-image.jpg') center/cover; */
}
```

## Tips for Best Results

1. **Video Optimization**: 
   - Keep video files under 50MB for best performance
   - Use MP4 format with H.264 encoding
   - Recommended resolution: 1920x1080 or 1280x720

2. **Content Strategy**:
   - Write clear, concise project descriptions
   - Highlight specific technologies and methodologies
   - Include quantitative results when possible

3. **Professional Presentation**:
   - Use consistent terminology
   - Keep descriptions focused on engineering achievements
   - Update contact information regularly

## Troubleshooting

**Videos not playing**:
- Ensure videos are in MP4 format
- Check file size (browsers may limit large files)
- Try a different browser

**Projects not saving**:
- Check if browser has local storage enabled
- Clear browser cache and try again
- Ensure JavaScript is enabled

**Responsive issues**:
- Clear browser cache
- Test in different browsers
- Check for custom CSS conflicts

## License

This portfolio template is free to use and modify for personal and commercial projects.

---

Built with ❤️ for mechanical engineers who want to showcase their computational and analytical work in style.
