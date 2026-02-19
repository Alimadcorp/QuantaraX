// ==========================================
// QuantaraX Blog - Functionality
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const filterToggle = document.getElementById('filterToggle');
    const filterPanel = document.getElementById('filterPanel');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sortSelect');
    const blogContainer = document.getElementById('blogContainer');
    const noResults = document.getElementById('noResults');

    let allBlogs = Array.from(document.querySelectorAll('.blog-item'));

    // Initialize Lucide
    if (window.lucide) lucide.createIcons();

    // Toggle Filter Panel
    filterToggle?.addEventListener('click', () => {
        const isActive = filterPanel.classList.toggle('active');
        filterToggle.classList.toggle('active', isActive);
    });

    // Main Update Function
    const updateDisplay = () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const activeCategory = document.querySelector('.filter-btn.active').getAttribute('data-category');
        let visibleCount = 0;

        allBlogs.forEach(blog => {
            const matchesSearch = ['blog-title', 'blog-description', 'blog-category'].some(cls =>
                blog.querySelector(`.${cls}`).textContent.toLowerCase().includes(searchTerm)
            );
            const matchesCategory = activeCategory === 'all' || blog.getAttribute('data-category') === activeCategory;

            const isVisible = matchesSearch && matchesCategory;
            blog.classList.toggle('hidden', !isVisible);
            if (isVisible) visibleCount++;
        });

        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        blogContainer.style.display = visibleCount === 0 ? 'none' : 'block';
    };

    // Sort Function
    const sortBlogs = () => {
        const sortType = sortSelect.value;
        allBlogs.sort((a, b) => {
            const dateA = new Date(a.getAttribute('data-date'));
            const dateB = new Date(b.getAttribute('data-date'));
            return sortType === 'newest' ? dateB - dateA : dateA - dateB;
        });
        allBlogs.forEach(blog => blogContainer.appendChild(blog));
    };

    // Event Listeners
    searchInput.addEventListener('input', updateDisplay);

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateDisplay();
        });
    });

    sortSelect.addEventListener('change', sortBlogs);

    // Initial Sort and Display
    sortBlogs();
    updateDisplay();
});