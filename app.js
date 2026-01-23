// App State
let completedQuestions = new Set();
let currentFilter = 'all';
let currentCategory = 'all';
let currentSeniority = 'all';
let searchQuery = '';
let currentModalQuestion = null;

// Seniority Level Labels
const SENIORITY_LABELS = {
    junior: '🌱 Junior',
    mid: '🌿 Mid',
    senior: '🌳 Senior',
    staff: '🏔️ Staff+'
};

function getSeniorityLabel(seniority) {
    return SENIORITY_LABELS[seniority] || seniority;
}

// DOM Elements
const questionsContainer = document.getElementById('questions-container');
const completedCountEl = document.getElementById('completed-count');
const totalCountEl = document.getElementById('total-count');
const progressPercentageEl = document.getElementById('progress-percentage');
const progressFillEl = document.getElementById('progress-fill');
const searchInput = document.getElementById('search-input');
const categoryButtonsContainer = document.getElementById('category-buttons');
const resetBtn = document.getElementById('reset-btn');
const modal = document.getElementById('answer-modal');
const modalQuestion = document.getElementById('modal-question');
const modalDifficulty = document.getElementById('modal-difficulty');
const modalAnswer = document.getElementById('modal-answer');
const modalClose = document.getElementById('modal-close');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalCompleteBtn = document.getElementById('modal-complete-btn');
const modalSeniority = document.getElementById('modal-seniority');
const seniorityFilter = document.getElementById('seniority-filter');

// Initialize App
function init() {
    loadFromLocalStorage();
    renderCategoryButtons();
    renderQuestions();
    updateProgress();
    setupEventListeners();
}

// Load completed questions from localStorage
function loadFromLocalStorage() {
    const saved = localStorage.getItem('rn-interview-completed');
    if (saved) {
        completedQuestions = new Set(JSON.parse(saved));
    }
}

// Save to localStorage
function saveToLocalStorage() {
    localStorage.setItem('rn-interview-completed', JSON.stringify([...completedQuestions]));
}

// Get unique categories
function getCategories() {
    const categories = [...new Set(questionsData.map(q => q.category))];
    return categories;
}

// Render category buttons
function renderCategoryButtons() {
    const categories = getCategories();
    categoryButtonsContainer.innerHTML = categories.map(category => {
        const icon = questionsData.find(q => q.category === category)?.icon || '📝';
        return `<button class="nav-btn" data-category="${category}">${icon} ${category}</button>`;
    }).join('');
}

// Filter questions
function getFilteredQuestions() {
    let filtered = questionsData;

    // Category filter
    if (currentCategory !== 'all') {
        filtered = filtered.filter(q => q.category === currentCategory);
    }

    // Seniority filter
    if (currentSeniority !== 'all') {
        filtered = filtered.filter(q => q.seniority === currentSeniority);
    }

    // Completion filter
    if (currentFilter === 'completed') {
        filtered = filtered.filter(q => completedQuestions.has(q.id));
    } else if (currentFilter === 'pending') {
        filtered = filtered.filter(q => !completedQuestions.has(q.id));
    }

    // Search filter
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(q =>
            q.question.toLowerCase().includes(query) ||
            q.category.toLowerCase().includes(query) ||
            (q.seniority && q.seniority.toLowerCase().includes(query))
        );
    }

    return filtered;
}

// Render questions
function renderQuestions() {
    const filtered = getFilteredQuestions();

    if (filtered.length === 0) {
        questionsContainer.innerHTML = `
            <div class="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                </svg>
                <p>No questions found</p>
            </div>
        `;
        return;
    }

    // Group by category
    const grouped = {};
    filtered.forEach(q => {
        if (!grouped[q.category]) {
            grouped[q.category] = [];
        }
        grouped[q.category].push(q);
    });

    let html = '';
    Object.keys(grouped).forEach(category => {
        const questions = grouped[category];
        const completedInCategory = questions.filter(q => completedQuestions.has(q.id)).length;
        const icon = questions[0]?.icon || '📝';

        html += `
            <div class="category-section">
                <div class="category-header">
                    <span class="category-icon">${icon}</span>
                    <h2 class="category-title">${category}</h2>
                    <span class="category-count">${completedInCategory}/${questions.length}</span>
                </div>
                <div class="questions-list">
                    ${questions.map(q => renderQuestionCard(q)).join('')}
                </div>
            </div>
        `;
    });

    questionsContainer.innerHTML = html;
}

// Render single question card
function renderQuestionCard(question) {
    const isCompleted = completedQuestions.has(question.id);
    const seniorityBadge = question.seniority
        ? `<span class="seniority-badge ${question.seniority}">${getSeniorityLabel(question.seniority)}</span>`
        : '';

    return `
        <div class="question-card ${isCompleted ? 'completed' : ''}" data-id="${question.id}">
            <div class="checkbox-container">
                <div class="checkbox" data-id="${question.id}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                </div>
            </div>
            <div class="question-content">
                <p class="question-text">${question.question}</p>
                <div class="question-meta">
                    <span class="difficulty-badge ${question.difficulty}">${question.difficulty}</span>
                    ${seniorityBadge}
                    <span class="category-tag">${question.category}</span>
                    <span class="view-answer">Click to view answer →</span>
                </div>
            </div>
        </div>
    `;
}

// Update progress
function updateProgress() {
    const total = questionsData.length;
    const completed = completedQuestions.size;
    const percentage = Math.round((completed / total) * 100);

    completedCountEl.textContent = completed;
    totalCountEl.textContent = total;
    progressPercentageEl.textContent = `${percentage}%`;
    progressFillEl.style.width = `${percentage}%`;
}

// Toggle question completion
function toggleQuestion(id) {
    if (completedQuestions.has(id)) {
        completedQuestions.delete(id);
    } else {
        completedQuestions.add(id);
    }
    saveToLocalStorage();
    renderQuestions();
    updateProgress();
    updateModalButton();
}

// Open modal
function openModal(question) {
    currentModalQuestion = question;
    modalQuestion.textContent = question.question;
    modalDifficulty.textContent = question.difficulty;
    modalDifficulty.className = `difficulty-badge ${question.difficulty}`;

    // Update seniority badge in modal
    if (modalSeniority && question.seniority) {
        modalSeniority.textContent = getSeniorityLabel(question.seniority);
        modalSeniority.className = `seniority-badge ${question.seniority}`;
        modalSeniority.style.display = 'inline-block';
    } else if (modalSeniority) {
        modalSeniority.style.display = 'none';
    }

    modalAnswer.innerHTML = question.answer;
    updateModalButton();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Update modal button
function updateModalButton() {
    if (!currentModalQuestion) return;
    const isCompleted = completedQuestions.has(currentModalQuestion.id);
    modalCompleteBtn.textContent = isCompleted ? '✓ Completed' : 'Mark as Completed';
    modalCompleteBtn.classList.toggle('completed', isCompleted);
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentModalQuestion = null;
}

// Reset progress
function resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        completedQuestions.clear();
        saveToLocalStorage();
        renderQuestions();
        updateProgress();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Question cards
    questionsContainer.addEventListener('click', (e) => {
        const checkbox = e.target.closest('.checkbox');
        const card = e.target.closest('.question-card');

        if (checkbox) {
            e.stopPropagation();
            const id = parseInt(checkbox.dataset.id);
            toggleQuestion(id);
        } else if (card) {
            const id = parseInt(card.dataset.id);
            const question = questionsData.find(q => q.id === id);
            if (question) {
                openModal(question);
            }
        }
    });

    // Category buttons
    document.querySelector('.category-nav').addEventListener('click', (e) => {
        const btn = e.target.closest('.nav-btn');
        if (!btn) return;

        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        renderQuestions();
    });

    // Filter buttons
    document.querySelector('.filter-buttons').addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        document.querySelectorAll('.filter-buttons .filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderQuestions();
    });

    // Seniority filter buttons
    if (seniorityFilter) {
        seniorityFilter.addEventListener('click', (e) => {
            const btn = e.target.closest('.filter-btn');
            if (!btn) return;

            seniorityFilter.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSeniority = btn.dataset.seniority;
            renderQuestions();
        });
    }

    // Search
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderQuestions();
    });

    // Reset button
    resetBtn.addEventListener('click', resetProgress);

    // Modal
    modalClose.addEventListener('click', closeModal);
    modalCloseBtn.addEventListener('click', closeModal);
    modalCompleteBtn.addEventListener('click', () => {
        if (currentModalQuestion) {
            toggleQuestion(currentModalQuestion.id);
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Initialize
init();
