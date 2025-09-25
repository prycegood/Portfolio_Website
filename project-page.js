// Project Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    loadProjectDetails();
    setupMobileNav();
});

function loadProjectDetails() {
    // Get project from session storage
    const projectData = sessionStorage.getItem('currentProject');
    if (!projectData) {
        showError('Project not found');
        return;
    }
    
    const project = JSON.parse(projectData);
    renderProjectDetails(project);
}

function renderProjectDetails(project) {
    const projectContent = document.getElementById('projectContent');
    
    const categoryDisplayNames = {
        'cfd': 'CFD Analysis',
        'simulation': 'Mechanical Simulation',
        'programming': 'Scientific Programming',
        'mathematics': 'Applied Mathematics',
        'analysis': 'Engineering Analysis'
    };
    
    // Create media section based on project type
    let mediaSection = '';
    
    if (project.layoutType === 'nozzle-horizontal-videos' && Array.isArray(project.mediaUrl)) {
        // Define chamber pressure values for nozzle simulation
        const chamberPressures = ['9.72 MPa', '15 MPa', '3 MPa'];
        
        mediaSection = `
            <div class="nozzle-horizontal-container">
                <div class="horizontal-videos-row">
                    ${project.mediaUrl.map((videoUrl, index) => `
                        <div class="horizontal-video-item">
                            <h4 class="horizontal-video-label">p0 = ${chamberPressures[index]}</h4>
                            <video class="horizontal-video fast-video" autoplay muted loop playsinline controls>
                                <source src="${videoUrl}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } else if (project.layoutType === 'dual-video' && Array.isArray(project.mediaUrl)) {
        // Define chamber pressure values for nozzle simulation
        const chamberPressures = ['9.72 MPa', '15 MPa', '3 MPa'];
        
        mediaSection = `
            <div class="dual-video-container">
                ${project.mediaUrl.map((videoUrl, index) => `
                    <div class="video-section">
                        <h3 class="video-header">p0 (<em>Chamber Pressure</em>) = ${chamberPressures[index]}</h3>
                        <div class="featured-media-combo">
                            <div class="main-video">
                                <video class="featured-video fast-video" autoplay muted loop playsinline controls>
                                    <source src="${videoUrl}" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div class="supplementary-image">
                                <img src="${project.supplementaryImage[index]}" alt="${project.title} - Analysis ${index + 1}" class="combo-image">
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } else if (project.layoutType === 'image-gallery' && Array.isArray(project.mediaUrl)) {
        mediaSection = `
            <div class="image-gallery">
                ${project.mediaUrl.map((imageUrl, index) => `
                    <img src="${imageUrl}" alt="${project.title} - Image ${index + 1}" class="gallery-image">
                `).join('')}
            </div>
        `;
    } else if (project.layoutType === 'flownet-horizontal-media' && Array.isArray(project.mediaUrl)) {
        // FlowNet uses embedded media in content, so no top-level media section
        mediaSection = ``;
    } else if (project.layoutType === 'flownet-dual-media' && Array.isArray(project.mediaUrl)) {
        mediaSection = `
            <div class="flownet-media-container">
                <div class="flownet-section">
                    <h3 class="media-annotation">Real-Time Simulation Results</h3>
                    <p class="media-description">Live visualization of computational fluid dynamics simulation showing velocity fields, pressure distributions, and flow patterns. Powered by custom C++ solver with OpenFOAM integration for advanced CFD analysis.</p>
                    <div class="flownet-video-wrapper">
                        <video class="flownet-video" autoplay muted loop playsinline controls>
                            <source src="${project.mediaUrl[1]}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
                <div class="flownet-section">
                    <h3 class="media-annotation">Parameter Input Interface</h3>
                    <p class="media-description">Interactive web interface for setting simulation parameters including geometry, boundary conditions, fluid properties, and solver settings. Built with responsive JavaScript for intuitive parameter adjustment.</p>
                    <div class="flownet-image-wrapper">
                        <img src="${project.mediaUrl[0]}" alt="${project.title} - Parameter Interface" class="flownet-image">
                    </div>
                </div>
            </div>
        `;
    } else if (project.layoutType === 'heat-island-surfaces' && Array.isArray(project.mediaUrl)) {
        const surfaceNames = ['Asphalt Parking Lot', 'Post Oak Savanna', 'Grass Field', 'Metal Roofing', 'Synthetic Turf'];
        
        mediaSection = `
            <div class="heat-island-container">
                <div class="heat-island-content">
                    <h3 class="heat-island-title">Surface Types Analyzed</h3>
                    <p class="heat-island-intro-text">
                        Drone-based atmospheric measurements were conducted over five distinct surface types to analyze their contribution to urban heat island effects. 
                        Temperature and dew point data were recorded as a function of altitude above each surface type:
                    </p>
                    
                    ${project.mediaUrl.map((imageUrl, index) => `
                        <div class="surface-paragraph">
                            <div class="surface-name">${surfaceNames[index]}</div>
                            <img src="${imageUrl}" alt="${surfaceNames[index]}" class="surface-main-image">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } else if (project.mediaUrl) {
        if (project.mediaType === 'video') {
            mediaSection = `
                <video class="featured-video" autoplay muted loop playsinline controls>
                    <source src="${project.mediaUrl}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
        } else if (project.mediaType === 'excel') {
            mediaSection = `
                <div class="excel-download-section">
                    <div class="excel-icon">
                        <i class="fas fa-file-excel" style="font-size: 4rem; color: #217346;"></i>
                    </div>
                    <div class="excel-info">
                        <h3>Excel Workbook Download</h3>
                        <p>Download the complete calculator workbook to analyze ideal gas mixtures.</p>
                        <a href="${project.mediaUrl}" download class="btn btn-primary download-btn">
                            <i class="fas fa-download"></i>
                            Download Calculator (.xlsx)
                        </a>
                    </div>
                </div>
                <div class="calculator-results-section">
                    <img src="engineAnalysisProject/calculatorResults.png" alt="Calculator Results" class="calculator-results-image">
                </div>
            `;
        } else if (project.mediaType === 'pdf') {
            mediaSection = `
                <div class="pdf-report-section">
                    <div class="pdf-viewer">
                        <iframe src="${project.mediaUrl}" class="pdf-frame" title="${project.title} Report"></iframe>
                    </div>
                </div>
            `;
        } else {
            mediaSection = `<img src="${project.mediaUrl}" alt="${project.title}" class="featured-image">`;
        }
    }
    
    // Determine if this is a project with horizontal media layout
        const isHorizontalLayout = project.layoutType === 'nozzle-horizontal-videos' || project.layoutType === 'flownet-horizontal-media';
        const isCenteredLayout = project.id === 'cable-barrier-detection';
    
    projectContent.innerHTML = `
        <div class="project-details">
            <div class="project-header-centered">
                <h1 class="project-detail-title">${project.title}</h1>
                <div class="project-detail-meta">
                    <span class="project-detail-technologies"><strong>Technologies:</strong> ${project.technologies}</span>
                </div>
            </div>
            
            ${isHorizontalLayout ? `
                <!-- Nozzle project: Videos at top center, content below -->
                ${mediaSection}
                <div class="nozzle-content-bottom">
                    <div class="project-detail-description">${project.fullDescription}</div>
                    ${project.whyInteresting ? `
                    <div class="project-detail-description">${project.whyInteresting}</div>
                    ` : ''}
                </div>
            ` : isCenteredLayout ? `
                <!-- Centered layout: Single column, no side media -->
                <div class="project-centered-container">
                    <div class="project-detail-description">${project.fullDescription}</div>
                    ${project.whyInteresting ? `
                    <div class="project-detail-description">${project.whyInteresting}</div>
                    ` : ''}
                </div>
            ` : `
                <!-- Standard layout: Side by side -->
                <div class="project-layout-container ${project.id === 'rocket-nozzle-cfd' ? 'nozzle-project-layout' : ''}">
                    <div class="project-content-left">
                        <div class="project-detail-description">${project.fullDescription}</div>
                        
                        ${project.whyInteresting ? `
                        <div class="project-detail-description">${project.whyInteresting}</div>
                        ` : ''}
                    </div>
                    
                    <div class="project-media-right">
                        ${mediaSection}
                    </div>
                </div>
            `}
        </div>
    `;
    
    // Set playback rate for fast videos after content loads
    setTimeout(() => {
        const fastVideos = document.querySelectorAll('.fast-video');
        fastVideos.forEach(video => {
            video.playbackRate = 6.0;
        });
    }, 100);
}

function showError(message) {
    const projectContent = document.getElementById('projectContent');
    projectContent.innerHTML = `
        <div class="error-message">
            <h2>Error</h2>
            <p>${message}</p>
            <a href="index.html#projects" class="btn btn-primary">Back to Projects</a>
        </div>
    `;
}

function setupMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}
