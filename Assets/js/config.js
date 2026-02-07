const SiteConfig = {
    name: "College Hub - ECE Innovation Center",
    founder: "Ashish Kumar Singh",
    role: "B.Tech ECE Student",
    email: "aksingh1990aks@gmail.com",
    college: "Guru Ghasidas Vishwavidyalaya",
    location: "Koni, Bilaspur, Chhattisgarh, India, 495009",
    links: {
        linkedin: "https://www.linkedin.com/in/ashish-kumar-singh-8a91a3385/",
        github: "https://github.com/aksingh1990aks-eng",
        youtube: "#", // Add your YouTube link when ready
        forms: "https://forms.gle/X1mDAwqW3GLJ84YU7" // Your Google Form
    }
};

// Auto-fill Data on Load
document.addEventListener('DOMContentLoaded', () => {
    // 1. Update Emails
    document.querySelectorAll('.conf-email').forEach(el => {
        el.href = `mailto:${SiteConfig.email}`;
        el.textContent = SiteConfig.email;
    });

    // 2. Update Social Links
    document.querySelectorAll('.conf-linkedin').forEach(el => el.href = SiteConfig.links.linkedin);
    document.querySelectorAll('.conf-github').forEach(el => el.href = SiteConfig.links.github);
    document.querySelectorAll('.conf-youtube').forEach(el => el.href = SiteConfig.links.youtube);
    document.querySelectorAll('.conf-form').forEach(el => el.href = SiteConfig.links.forms); // For "Submit Project" buttons
    
    // 3. Update Text Content
    document.querySelectorAll('.conf-founder').forEach(el => el.textContent = SiteConfig.founder);
    document.querySelectorAll('.conf-college').forEach(el => el.textContent = SiteConfig.college);
    document.querySelectorAll('.conf-year').forEach(el => el.textContent = new Date().getFullYear());
});