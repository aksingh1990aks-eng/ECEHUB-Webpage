/* assets/js/announcements-engine.js */

const AnnouncementConfig = {
    // Replace this with your actual Google Sheet CSV link for Announcements
    sheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQEy-pSav0jIUh6-n2i5r-FqQC8p5ir9MxMI2ksFBNv44sTX6MOkVtc9_iP7cdJDFRsNyn5a6HLNCex/pub?output=csv'
};

let allAnnouncements = [];

// Initialize the Engine
document.addEventListener('DOMContentLoaded', initAnnouncements);

async function initAnnouncements() {
    const container = document.getElementById('announcements-container');
    if (!container) return;

    // Show Loading State
    container.innerHTML = '<div class="semester-card" style="text-align:center; opacity:0.7;">Loading latest updates...</div>';

    try {
        const res = await fetch(AnnouncementConfig.sheetUrl);
        const text = await res.text();
        
        // Parse CSV (Handles commas inside quotes)
        const rows = text.split('\n').map(row => {
            // Regex to split by comma ONLY if not inside quotes
            return row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/); 
        }).slice(1); // Skip Header Row

        allAnnouncements = rows.map(row => {
            // Ensure row has enough data (Title, Date, Desc)
            if (row.length < 3) return null;

            // Clean up quotes from CSV cells if present
            const clean = (str) => str ? str.replace(/^"|"$/g, '').trim() : '';

            return {
                title: clean(row[0]),
                date: clean(row[1]),
                description: clean(row[2]),
                priority: clean(row[3] || 'medium').toLowerCase(),
                link: clean(row[4] || '#')
            };
        }).filter(item => item !== null && item.title !== "");

        renderAnnouncements('all');
        setupFilters();

    } catch (e) {
        console.error("Error loading announcements:", e);
        container.innerHTML = '<div class="semester-card" style="text-align:center; color:var(--accent);">Unable to load announcements. Please check your connection.</div>';
    }
}

function renderAnnouncements(filter) {
    const container = document.getElementById('announcements-container');
    container.innerHTML = '';

    const filtered = filter === 'all' 
        ? allAnnouncements 
        : allAnnouncements.filter(a => a.priority === filter);

    if (filtered.length === 0) {
        container.innerHTML = '<div class="semester-card" style="text-align:center; opacity:0.7;">No announcements found for this category.</div>';
        return;
    }

    filtered.forEach(item => {
        // Determine Border Color based on Priority
        let borderStyle = '1px solid var(--border)';
        let icon = '📢';
        
        if (item.priority === 'urgent') {
            borderStyle = '1px solid #ef4444'; // Red
            icon = '🔴';
        } else if (item.priority === 'high') {
            borderStyle = '1px solid var(--accent)'; // Amber
            icon = '🔶';
        }

        const card = document.createElement('div');
        card.className = 'semester-card fade-in';
        card.style.borderLeft = item.priority === 'urgent' ? '4px solid #ef4444' : (item.priority === 'high' ? '4px solid var(--accent)' : '');
        card.style.marginBottom = '1.5rem';

        card.innerHTML = `
            <div class="semester-header" style="justify-content:space-between; align-items: flex-start;">
                <div style="display:flex; gap:10px; align-items:center;">
                    <span style="font-size:1.5rem;">${icon}</span>
                    <h3 style="margin:0; font-size:1.2rem;">${item.title}</h3>
                </div>
                <span style="font-size:0.85rem; color:var(--text-dim); white-space:nowrap;">${item.date}</span>
            </div>
            <p style="color:var(--text-dim); margin: 0.5rem 0 1rem 0;">${item.description}</p>
            
            ${item.link && item.link !== '#' ? `
                <div class="subject-item" style="border:none; padding:0;">
                    <span class="subject-name" style="opacity:0.6; font-size:0.8rem;">Priority: ${item.priority.toUpperCase()}</span>
                    <a href="${item.link}" target="_blank" class="download-btn">View Details</a>
                </div>
            ` : ''}
        `;
        container.appendChild(card);
    });
}

function setupFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all
            buttons.forEach(b => b.style.background = 'transparent');
            buttons.forEach(b => b.style.color = 'var(--text-dim)');
            
            // Add active style to clicked
            e.target.style.background = 'var(--bg-card)';
            e.target.style.color = 'var(--primary)';
            
            renderAnnouncements(e.target.dataset.filter);
        });
    });
}