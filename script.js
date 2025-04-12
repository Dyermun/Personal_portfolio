document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('guestbookForm');
    const entriesContainer = document.getElementById('entriesContainer');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    // Load existing entries from localStorage
    loadEntries();
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const comment = document.getElementById('comment').value.trim();
        
        if (!name || !comment) {
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
            return;
        }
        
        errorMessage.style.display = 'none';
        
        // Create new entry
        const entry = {
            name: name,
            comment: comment,
            date: new Date().toLocaleString()
        };
        
        // Save to localStorage
        saveEntry(entry);
        
        // Add to the display
        addEntryToDisplay(entry);
        
        // Show success message
        successMessage.style.display = 'block';
        
        // Reset form
        form.reset();
        
        // Hide success message after 3 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    });
    
    function saveEntry(entry) {
        let entries = JSON.parse(localStorage.getItem('guestbookEntries')) || [];
        entries.unshift(entry); // Add new entry to beginning of array
        localStorage.setItem('guestbookEntries', JSON.stringify(entries));
    }
    
    function loadEntries() {
        const entries = JSON.parse(localStorage.getItem('guestbookEntries')) || [];
        entries.forEach(entry => {
            addEntryToDisplay(entry);
        });
    }
    
    function addEntryToDisplay(entry) {
        const entryElement = document.createElement('div');
        entryElement.className = 'entry';
        entryElement.innerHTML = `
            <div class="entry-name">${entry.name}</div>
            <div class="entry-date">${entry.date}</div>
            <div class="entry-comment">${entry.comment}</div>
        `;
        
        // Add new entry to the top of the container
        entriesContainer.insertBefore(entryElement, entriesContainer.firstChild);
    }
});