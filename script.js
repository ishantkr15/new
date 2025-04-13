document.addEventListener('DOMContentLoaded', function() {
    // Remove specific movie if it exists (by title)
    removeMovieByTitle("fghrd");
    
    // Load content from localStorage
    const storedMovies = JSON.parse(localStorage.getItem('movies')) || [];
    const storedApks = JSON.parse(localStorage.getItem('apps')) || [];

    // Render content
    renderContent('#movies .content-grid', storedMovies, 'movie');
    renderContent('#apks .content-grid', storedApks, 'app');

    // Function to render content
    function renderContent(selector, items, type) {
        const container = document.querySelector(selector);
        
        if (items.length === 0) {
            container.innerHTML = '<p class="no-content">No content available yet. Check back later!</p>';
            return;
        }
        
        container.innerHTML = items.map(item => `
            <div class="content-card">
                <img src="${item.image}" alt="${item.title}" class="card-image">
                <div class="card-content">
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-info">${item.info}</p>
                    <a href="details.html?type=${type}&id=${item.id}" class="view-btn">
                        <i class="fas fa-info-circle"></i> View Details
                    </a>
                </div>
            </div>
        `).join('');
    }
    
    // Function to remove a movie by title
    function removeMovieByTitle(title) {
        const movies = JSON.parse(localStorage.getItem('movies')) || [];
        const filteredMovies = movies.filter(movie => 
            !movie.title.toLowerCase().includes(title.toLowerCase())
        );
        
        if (movies.length !== filteredMovies.length) {
            localStorage.setItem('movies', JSON.stringify(filteredMovies));
            console.log(`Removed movie containing "${title}" from storage`);
        }
    }
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    // Toggle theme
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        
        if (body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
});