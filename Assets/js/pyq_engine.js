function renderScalablePYQs(fileLinks) {
    const container = document.getElementById('pyqs-grid-container');
    if (!container) return;

    container.innerHTML = ''; // Clear loading state

    // 1. Group Data: { "sem1": ["ct1", "end"], "sem2": ... }
    const semesters = {};
    Object.keys(fileLinks).forEach(key => {
        // Expected key format: sem1_ct1_24-25_Question Paper
        const parts = key.split('_');
        if (parts.length >= 2) {
            const sem = parts[0];
            const exam = parts[1];
            if (!semesters[sem]) semesters[sem] = new Set();
            semesters[sem].add(exam);
        }
    });

    // 2. sort Semesters (sem1, sem2, ... sem8)
    const sortedSems = Object.keys(semesters).sort((a, b) => {
        const numA = parseInt(a.replace(/\D/g, '')) || 0;
        const numB = parseInt(b.replace(/\D/g, '')) || 0;
        return numA - numB;
    });

    // 3. Build HTML
    sortedSems.forEach(semKey => {
        const semNum = semKey.replace(/\D/g, '');
        const card = document.createElement('div');
        card.className = 'semester-card fade-in';
        
        // Convert Set to Array and Sort Exams (CT1 -> CT2 -> END)
        const exams = Array.from(semesters[semKey]).sort();

        card.innerHTML = `
            <div class="semester-header">
                <div class="semester-icon">📘</div>
                <h3>Semester ${semNum}</h3>
            </div>
            <div class="subjects-list">
                ${exams.map(examType => `
                    <div class="subject-item">
                        <span class="subject-name">${examType.toUpperCase().replace('END', 'END SEM')}</span>
                        <button class="download-btn" onclick="openPapers('${semKey}', '${examType}')">
                            Download
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(card);
    });
}