// Portfolio Website JavaScript

// DOM Elements
const projectsGrid = document.getElementById('projectsGrid');
const contactForm = document.getElementById('contactForm');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');

// Projects data storage
let projects = [];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeProjects();
    setupEventListeners();
    setupSmoothScrolling();
    loadSampleProjects();
    setupBackgroundVideo();
});

// Setup event listeners
function setupEventListeners() {
    // Form submissions
    contactForm.addEventListener('submit', handleContactSubmission);

    // Mobile navigation
    hamburger.addEventListener('click', toggleMobileNav);
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile nav if open
            navLinksContainer.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Mobile navigation toggle
function toggleMobileNav() {
    navLinksContainer.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Setup background video
function setupBackgroundVideo() {
    const backgroundVideo = document.querySelector('.hero-background-video');
    if (backgroundVideo) {
        console.log('Background video element found');
        
        // Set playback rate to 10x when metadata loads
        backgroundVideo.addEventListener('loadedmetadata', function() {
            console.log('Video metadata loaded, setting playback rate to 10x');
            backgroundVideo.playbackRate = 10.0;
        });
        
        // Start playing when ready
        backgroundVideo.addEventListener('canplay', function() {
            console.log('Video can start playing');
            backgroundVideo.play().catch(error => {
                console.log('Background video autoplay failed:', error);
            });
        });
        
        // Try to start playback after a short delay
        setTimeout(() => {
            backgroundVideo.playbackRate = 10.0;
            backgroundVideo.play().catch(error => {
                console.log('Background video autoplay failed:', error);
            });
        }, 100);
        
    } else {
        console.log('Background video element not found');
    }
}

// Initialize projects from localStorage
function initializeProjects() {
    // Temporarily force reload projects (remove this line after first load)
    localStorage.removeItem('portfolioProjects');
    
    const savedProjects = localStorage.getItem('portfolioProjects');
    if (savedProjects) {
        projects = JSON.parse(savedProjects);
        renderProjects();
    }
}

// Save projects to localStorage
function saveProjects() {
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
}

// Load sample projects for demonstration
function loadSampleProjects() {
    if (projects.length === 0) {
        const sampleProjects = [
            {
                id: 'rocket-nozzle-cfd',
                title: 'SpaceX Merlin Engine Rocket Nozzle CFD Simulations',
                briefDescription: 'Three CFD simulations of the SpaceX Merlin engine exploring how chamber pressure variations affect flow patterns, nozzle efficiency, and choked flow characteristics',
                fullDescription: '<strong>What I did:</strong> I created three CFD simulations of the SpaceX Merlin engine. Specifically, I wanted to understand the effects on flow patterns and engine efficiency when varying chamber pressure. The three simulations show examples of the concepts of choked flow, over and under expansion, nozzle pressure ratios, and more.<br><br>I used OpenFOAM for the simulation, SolidWorks for creating geometry, Paraview for visualization, and Ansys Fluent for creating a mesh from my geometry.<br><br><strong>How I did it:</strong> I began this project by researching dimensions and specifications of the SpaceX Merlin rocket engine. I found real industry dimensions for the engine\'s de Laval nozzle including throat area, nozzle area, area expansion ratio, and more. I also found data for the performance specifications for the engine including thrust at sea level, thrust in a vacuum, chamber pressure and more.<br><br><div class="inline-image-container"><img src="nozzleProject/merlinEngineSpecs.png" alt="Merlin Engine Specifications" class="inline-project-image"><p class="image-subtitle">Merlin Engine Specifications</p></div><br><div class="inline-image-container"><img src="nozzleProject/nozzleGeom.png" alt="Nozzle exit geometry modeled from a regression with the area expansion ratio" class="inline-project-image"><p class="image-subtitle">Nozzle exit geometry modeled from a regression with the area expansion ratio</p></div><br><br>I then projected these dimensions into SolidWorks to generate the geometry that I will turn into a usable mesh with Ansys Fluent. After generating the mesh with Ansys, I imported the mesh to OpenFOAM. I then needed to decide on a solver, specify boundary conditions, and choose other simulation parameters. The solver I used was SonicFoam due to its robust industry standard use. My simulation parameter files can be found here on my GitHub under the "SpaceX-Merlin-Engine-Nozzle-CFD-OpenFOAM" project: <a href="https://github.com/prycegood/SpaceX-Merlin-Engine-Nozzle-CFD-OpenFOAM" target="_blank" class="github-link"><i class="fab fa-github"></i> View on GitHub</a><br><br><div class="inline-image-container"><img src="nozzleProject/paraview.png" alt="Raw mesh generated by Ansys Fluent as seen in Paraview" class="inline-project-image"><p class="image-subtitle">Raw mesh generated by Ansys Fluent as seen in Paraview</p></div><br><br>Becuase I am interested in the effects of varying chamber pressure, I tested the SpaceX standard P0 (9.72 MPa) as a control, a higher P0 (15 MPa), and a lower P0 (3 MPa). My simulations can be seen below.<br><br><div class="large-videos-container"><div class="large-video-section"><h4 class="large-video-header">p0 (<em>Chamber Pressure</em>) = 9.72 MPa</h4><div class="large-video-combo"><div class="large-main-video"><video class="large-featured-video fast-video" autoplay muted loop playsinline controls><source src="nozzleProject/normalP0.mp4" type="video/mp4">Your browser does not support the video tag.</video></div><div class="large-supplementary-image"><img src="nozzleProject/UMagScaleNormal.png" alt="SpaceX Merlin Engine Rocket Nozzle CFD Simulations - Analysis 1" class="large-combo-image"></div></div><div class="video-analysis"><p>Other than the mesmerizing shock diamonds visible, we can see that the flow looks decently standard with it stabilizing into a roughly ambient and slightly underexpanded shape. We are reaching choked flow which is justifying our use of a de Laval nozzle (converging-diverging) rather than a simple converging nozzle. The velocity of the flow peaks around 2700 m/s.</p></div></div><div class="large-video-section"><h4 class="large-video-header">p0 (<em>Chamber Pressure</em>) = 15 MPa</h4><div class="large-video-combo"><div class="large-main-video"><video class="large-featured-video fast-video" autoplay muted loop playsinline controls><source src="nozzleProject/HighP0.mp4" type="video/mp4">Your browser does not support the video tag.</video></div><div class="large-supplementary-image"><img src="nozzleProject/UMagScaleHigh.png" alt="SpaceX Merlin Engine Rocket Nozzle CFD Simulations - Analysis 2" class="large-combo-image"></div></div><div class="video-analysis"><p>Here we see that increasing the chamber pressure gives a flow that becomes grossly underexpanded. Although our peak velocity increases by a few hundred m/s, the diminishing returns of increasing chamber pressure are noticeable. We are still achieving choked flow at the throat.</p></div></div><div class="large-video-section"><h4 class="large-video-header">p0 (<em>Chamber Pressure</em>) = 3 MPa</h4><div class="large-video-combo"><div class="large-main-video"><video class="large-featured-video fast-video" autoplay muted loop playsinline controls><source src="nozzleProject/LowP0.mp4" type="video/mp4">Your browser does not support the video tag.</video></div><div class="large-supplementary-image"><img src="nozzleProject/UMagScaleLow.png" alt="SpaceX Merlin Engine Rocket Nozzle CFD Simulations - Analysis 3" class="large-combo-image"></div></div><div class="video-analysis"><p>Decreasing the chamber pressure aggressively down by ~6 MPa gave counter intuitive results. The nozzle is giving data indicative of underexpanded flow when I was expecting the flow to be grossly overexpanded. This is likely due to simulation peculiarities, and I still need to do more work to investigate the cause of these results. We are again achieving choked flow at the throat.</p></div></div></div>',
                whyInteresting: '<strong>Why it\'s interesting: </strong> While the mathematics behind rocket nozzles is fascinating, seeing visual simulations gives the mathematics an intuitive feel. In this project, I was able to perform a robust CFD simulation from start to finish on one of the greatest engines ever designed. I confirmed relationships between chamber pressure and its effects on flow patterns, nozzle pressure ratio, and more. In the completion of this project, I have a greater understanding of de Laval nozzles and their intricacies.',
                category: 'cfd',
                technologies: 'OpenFOAM, ANSYS Fluent, SolidWorks, Paraview',
                previewImage: 'nozzleProject/nozzlePic.png',
                mediaUrl: ['nozzleProject/normalP0.mp4', 'nozzleProject/HighP0.mp4', 'nozzleProject/LowP0.mp4'],
                mediaType: 'video',
                supplementaryImage: ['nozzleProject/UMagScaleNormal.png', 'nozzleProject/UMagScaleHigh.png', 'nozzleProject/UMagScaleLow.png'],
                layoutType: 'nozzle-horizontal-videos',
                isFeatured: true,
                isSample: true
            },
            {
                id: 'flownet-cfd-platform',
                title: 'FlowNet - Web-Based CFD Simulation Platform',
                briefDescription: 'Web-based computational fluid dynamics platform designed for students and CFD enthusiasts with real-time simulation capabilities.',
                fullDescription: '<strong>What I did:</strong> I am developing a web based CFD platform targeted at students and hobbyists to run simple CFD simulations and develop an intuition for fluid behavior. I created and implemented my own incompressible flow solver to be light enough to run on the browser in real time. For more complicated CFD simulations, I am linking common OpenFOAM solvers to an intuitive graphical user interface. The problem of OpenFOAM not having a native GUI is a large barrier to entry for those at the beginning of their CFD journey.<br><br><div class="flownet-horizontal-container"><div class="flownet-horizontal-row"><div class="flownet-media-item"><h4 class="flownet-media-label">Parameter Input Interface</h4><img src="flowNet/flowNetImage.png" alt="FlowNet - Web-Based CFD Simulation Platform - Parameter Interface" class="flownet-horizontal-image"></div><div class="flownet-media-item"><h4 class="flownet-media-label">Real-Time Simulation Results</h4><video class="flownet-horizontal-video" autoplay muted loop playsinline controls><source src="flowNet/flowNetVideo.mp4" type="video/mp4">Your browser does not support the video tag.</video></div></div></div><br><br><strong>How I did it:</strong> I first needed to have a motive and a vision. I want users to be able to easily upload .stl and .obj files into the website and seamlessly run real time aerodynamics simulations. Currently, in order to run simulations, prospective CFD enthusiasts would have to spend thousands of dollars for a service like Ansys or navigate the convoluted user experience of downloadable open source CFD software. Neither of these options are realistic for those wanting to learn the fundamentals or wishing to run simulations quickly and seamlessly for a low price.<br><br>After defining a motivation, I needed to develop a solver that captures my aim. A light solver built on the discretization of the incompressible Navier-Stokes equations was my goal. I used Gmsh to generate tetrahedral meshes from the user inputted geometry. I then used the finite difference method to skip putting the Navier-Stokes equations into a variational (weak) form or an \'M\' form. I used the differential form of the equations to generate a Taylor series expansion to be applied to discrete points within the domain. To handle time stepping, I used the forward Euler method. I also am creating a simple interface for the user to specify boundary conditions.<br><br>I am also implementing compatibility with OpenFOAM\'s icoFoam and simpleFoam solvers so that users have a plethora of options when deciding their desired complexity.',
                whyInteresting: '<strong>Why it\'s interesting:</strong> FlowNet changes the way people can understand and interact with computational fluid dynamics. I don\'t want this field to be exclusive to college level courses and phd candidates. I want anyone interested in physics to be able to experiment with CFD simulations. For example, a high schooler designing a project for school, or an amateur rocket builder would be able to easily simulate the aerodynamics of their design in real time with little resistance.',
                category: 'cfd',
                technologies: 'C++, OpenFOAM, Docker, JavaScript, Three.js',
                previewImage: 'flowNet/flowNetThumbNail.png',
                mediaUrl: ['flowNet/flowNetImage.png', 'flowNet/flowNetVideo.mp4'],
                mediaType: 'custom',
                layoutType: 'flownet-horizontal-media',
                isFeatured: true,
                isSample: false
            },
            {
                id: 'ideal-gas-calculator',
                title: 'Ideal Gas Mixture Calculator for Four-Stroke Engine Analysis',
                briefDescription: 'Excel-based thermodynamic calculator for analyzing ideal gas mixtures in four-stroke gasoline engines.',
                fullDescription: '<strong>What I did:</strong> I created an ideal gas mixture property calculator in excel using knowledge of thermal fluid analysis. The goal of the project was to use this calculator to analyze the efficiency and other various properties of a four-stroke gasoline engine.<br><br><strong>How I did it:</strong> To help calculate thermodynamic properties of the working fluid(s) encountered in the engine thermodynamic cycle, I developed code to compute the thermodynamic properties of an ideal gas mixture consisting of the common components found in atmosphere air and combustion products. The constituent components of the ideal gas mixture were:<br><br>Nitrogen, N2<br>Oxygen, O2<br>Argon, Ar<br>Water (vapor), H2O<br>Hydrogen, H2<br>Carbon Dioxide, CO2<br>Carbon Monoxide, CO<br><br>The property calculator developed was capable of computing the thermodynamic properties of an ideal gas mixture composed of any fraction of the seven components. Gas mixture constants computed from the mixture composition include the mixture molecular weight (M, kg/kmol) and gas constant (R, kJ/kg-K). Two intensive thermodynamic properties are required to compute the remaining thermodynamic properties. The calculator was capable of accepting any two intensive properties as input and computing the remaining properties as output. The input/output intensive properties include:<br><br>T, Absolute temperature (K)<br>P, Absolute pressure (kPA)<br>v, Specific volume (m3/kg)<br>u, Specific Internal Energy (kJ/kg)*<br>h, Specific Enthalpy (kJ/kg)*<br>s, Specific Entropy (kJ/kg-K)*<br>(*relative to reference condition sref = uref = href = 0)',
                whyInteresting: '<strong>Why it\'s interesting:</strong> Knowing how to solve for intensive properties of an ideal gas mixture is not just useful for the specific case of analyzing a four-stroke gasoline engine. This project built the intuition I need about ideal gases and thermal fluid analysis to tackle a wide variety of problems in various domains. For example, ideal gas mixture calculations are critical in aerospace propulsion systems, power plant thermodynamics, gas cooled nuclear reactors, and so much more.',
                category: 'analysis',
                technologies: 'Microsoft Excel, Thermodynamics, Gas Dynamics',
                previewImage: 'engineAnalysisProject/neopolotin.png',
                mediaUrl: 'engineAnalysisProject/IdealGasMixtureCalculator.xlsx',
                mediaType: 'excel',
                layoutType: 'excel-download',
                isSample: false
            },
            {
                id: 'urban-heat-island-analysis',
                title: 'Urban Heat Island Analysis Using Drone-Based Atmospheric Measurements',
                briefDescription: 'Comprehensive analysis of urban heat island effects using drone-collected atmospheric temperature and dew point data across five different surface types.',
                fullDescription: '<strong>What I did:</strong> The city of college station funded a research project to understand the effectiveness of combatting urban heat islands by planting more vegetation. The city believes that increasing the ground surface area ratio of vegetation (trees, grass, etc.) to urban materials (asphalt, concrete, etc.) will lower ambient air temperatures resulting in a more pleasant city to live in.<br><br>Multiple student groups took it upon themselves to help in the collection of data to be presented to the city. I was part of a group that collected, parsed, and analyzed data to support the city\'s decision on the project.<br><br><strong>How I did it:</strong> We went to a park in college station that had large areas of each different surface type that we wanted to test. Equipped with a dji drone and a sensor capable of capturing the atmospheric conditions of ambient air temperature, dew point, and heat index, we ran trials starting with the drone on the ground carrying the sensor. We recorded data measured by the sensor as a function of altitude over the different surface types. The surfaces tested included an asphalt parking lot, a post oak forest, a large grass field, a metal roof, and a large pond. The data was parsed and graphed in Python using matplotlib. The code I developed to parse analyze my atmospheric data can be found in my GitHub. The graphs of ambient air temperature and dew point as a function of altitude generated by my code can be seen here:<br><br>Our data combined with the data of many other student groups participating confirmed the city\'s beliefs about combatting urban heat islands. Increasing the ground surface area of vegetation is likely to help reduce ambient air temperatures in the city.',
                whyInteresting: '<strong>Why it\'s interesting:</strong> Urban heating is a problem popping up more and more around the world. With this project, we quantified the relationship between differing surface types and atmospheric conditions. Urban heat islands can effectively be countered with increasing the surface area vegetation on the ground. Most urban planners understand this and are using this knowledge to inform future urban development.',
                category: 'analysis',
                technologies: 'Python, Data science',
                previewImage: 'heatIslandProject/metalRoofing.png',
                mediaUrl: ['heatIslandProject/asphaltParkingLot.png', 'heatIslandProject/postOakSavana.png', 'heatIslandProject/grassfield.png', 'heatIslandProject/metalRoofing.png', 'heatIslandProject/syntheticTurf.png'],
                mediaType: 'custom',
                layoutType: 'heat-island-surfaces',
                isSample: false
            },
            {
                id: 'cable-barrier-detection',
                title: 'Intelligent Highway Cable Barrier Detection System',
                briefDescription: 'Intelligent collision detection system for highway cable barriers using Python force simulations, Arduino programming, and Bluetooth communication for emergency response.',
                fullDescription: '<strong>What I did:</strong> My team and I designed and prototyped an intelligent highway cable barrier system that is capable of detecting a collision in rural areas. The product can notify TXDOT of the location, time, and severity of the impact. The system also notifies emergency services of the event when the collision is severe enough.<br><div class="inline-pdf-link-container"><h4 class="pdf-subtitle">Full Report Here</h4><a href="cableBarrierProject/cableBarrierReport.docx.pdf" target="_blank" class="pdf-report-link"><i class="fas fa-file-pdf"></i> View Full Report</a></div><strong>How I did it:</strong> I began my work on the project by writing Python simulations of force equations that I modeled after vehicle collisions with a highway cable barrier. Those calculations can be seen here:<br><br><div class="inline-image-container"><img src="cableBarrierProject/calculations.png" alt="Cable Barrier Force Calculations" class="inline-project-image"></div><br><div class="inline-image-container"><img src="cableBarrierProject/calculations2.png" alt="Cable Barrier Force Calculations 2" class="inline-project-image"></div><br><div class="inline-image-container"><img src="cableBarrierProject/energyGraph.png" alt="Energy Analysis Graph" class="inline-project-image"></div>After understanding the forces we were working with, I began to program the on board arduino board with the desired behavior of the prototype. The code detects a collision through our sensors and then is able to classify severity of the collision as mild, medium, and severe. I then programmed the device to handle Bluetooth communications to a nearby hub that would relay radio signals to the desired recipients.',
                whyInteresting: '<strong>Why it\'s interesting:</strong> This project makes the roads we and our loved ones drive on safer. In addition to this device creating faster response times to severe vehicle collisions in remote areas, the health/status of the cable barriers themselves can be monitored remotely in real time. Cable barriers are required to be held at certain tensions to meet standard, and our device helps notify TXDOT of tension deviances.',
                category: 'programming',
                technologies: 'Python, SolidWorks, AutoCAD, Arduino IDE',
                previewImage: 'cableBarrierProject/cableBarrier.png',
                mediaUrl: 'cableBarrierProject/cableBarrierReport.docx.pdf',
                mediaType: 'pdf',
                layoutType: 'standard',
                isSample: false
            },
            {
                id: 'cpp-ray-tracer',
                title: 'C++ Ray Tracer',
                briefDescription: 'Ray tracer developed from base C++ with recursive reflections, implementing ray collision algorithms and mathematical rendering using linear algebra principles.',
                fullDescription: '<strong>What I did:</strong> I developed a fully functional ray tracer from base C++ that supports recursive reflections. The ray tracer takes scene geometry and light sources as input and outputs fully rendered and polished scenes.<br><br><strong>How I did it:</strong> I first developed my class structures for object oriented programming and then began work on my ray collision function. This function calculates where in the scene a ray intersects the surface of geometric objects that are input as scene setup parameters. Using the dot product of the surface vector of the scene geometry and the direction vector from light sources, I am able to determine how that point should be rendered. Here is an illustration of the mathematics:<br><br>I was then able to support reflections and other advanced visual features by implementing a recursive structure into the way the rays originate and subsequently intersect with more scene geometry. The code for my project is available in my GitHub: <a href="https://github.com/prycegood" target="_blank" class="github-link"><i class="fab fa-github"></i> View on GitHub</a>',
                whyInteresting: '<strong>Why it\'s interesting:</strong> Ray tracing is not just an exercise in software engineering. This project leverages many advanced ideas in linear algebra including space transformations, non commutative operations, and more. Mastery over these mathematical tools refines my ability to take on problems from a first principles approach.',
                category: 'programming',
                technologies: 'C++, Linear Algebra',
                previewImage: 'rayTracer/rayTrace1.png',
                mediaUrl: ['rayTracer/rayTrace1.png', 'rayTracer/rayTrace2.png', 'rayTracer/rayTrace3.png'],
                mediaType: 'custom',
                layoutType: 'image-gallery',
                isSample: true
            }
        ];
        g
        projects = sampleProjects;
        saveProjects();
        renderProjects();
    }
}



// Handle contact form submission
function handleContactSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Create mailto URL with form data
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoUrl = `mailto:hundleypryce@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoUrl;
    
    // Show success message and reset form
    showNotification('Your email client will open with the message ready to send!', 'success');
    contactForm.reset();
}

// Render projects in the list
function renderProjects() {
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectItem = createProjectItem(project);
        projectsGrid.appendChild(projectItem);
    });
    
    // Main page uses simplified cards - no video speed adjustment needed
}

// Create project item element (simplified for main page)
function createProjectItem(project) {
    const item = document.createElement('div');
    item.className = 'project-card-simple';
    
    const categoryDisplayNames = {
        'cfd': 'CFD Analysis',
        'simulation': 'Mechanical Simulation',
        'programming': 'Scientific Programming',
        'mathematics': 'Applied Mathematics',
        'analysis': 'Engineering Analysis'
    };
    
    // Create preview image
    let previewElement = '';
    if (project.previewImage) {
        let thumbnailClass = 'project-preview-image';
        if (project.id === 'urban-heat-island-analysis') {
            thumbnailClass += ' heat-island-thumbnail';
        } else if (project.id === 'ideal-gas-calculator') {
            thumbnailClass += ' engine-analysis-thumbnail';
        } else if (project.id === 'cable-barrier-detection') {
            thumbnailClass += ' cable-barrier-thumbnail';
        }
        previewElement = `<img src="${project.previewImage}" alt="${project.title}" class="${thumbnailClass}">`;
    } else {
        previewElement = `
            <div class="project-preview-placeholder">
                <i class="fas fa-code"></i>
                <p>Project Preview</p>
            </div>
        `;
    }
    
    item.innerHTML = `
        ${previewElement}
        <div class="project-card-content">
            <h3 class="project-card-title">${project.title}</h3>
            <p class="project-card-description">${project.briefDescription}</p>
            <div class="project-card-meta">
                <button class="view-project-btn" onclick="openProjectPage('${project.id}')">View Project</button>
            </div>
        </div>
    `;
    
    return item;
}

// Open project page
function openProjectPage(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    // Store current project in session storage
    sessionStorage.setItem('currentProject', JSON.stringify(project));
    
    // Navigate to project page
    window.location.href = `project.html?id=${projectId}`;
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
}

// Add notification styles dynamically
const notificationStyles = `
    .notification {
        position: fixed;
        top: 90px;
        right: 20px;
        z-index: 3000;
        max-width: 300px;
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        background: #ffffff;
        color: #000000;
        border: 2px solid #ffffff;
        font-weight: 600;
    }
    
    .notification-error {
        background: #666666;
        color: white;
        border: 2px solid #666666;
        font-weight: 600;
    }
    
    .notification-info {
        background: #ffffff;
        color: #000000;
        border: 2px solid #ffffff;
        font-weight: 600;
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    

    

    
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 2rem;
            transform: translateY(-100%);
            transition: transform 0.3s ease;
            border-bottom: 1px solid var(--border-color);
        }
        
        .nav-links.active {
            transform: translateY(0);
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        .notification {
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.expertise-item, .project-card, .contact-content > *');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
