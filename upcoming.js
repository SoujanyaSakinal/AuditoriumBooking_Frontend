// Sample events data
const events = [
    {
        name: "Annual Music Concert",
        date: "2024-04-15",
        day: "Monday",
        time: "19:00",
        package: "simple",
        status: "available"
    },
    {
        name: "Theater Play - Romeo & Juliet",
        date: "2024-04-20",
        day: "Saturday",
        time: "20:00",
        package: "medium",
        status: "limited"
    },
    {
        name: "Stand-up Comedy Night",
        date: "2024-04-25",
        day: "Thursday",
        time: "21:00",
        package: "premium",
        status: "sold-out"
    },
    // Add more events as needed
];

// Function to display events
function displayEvents(eventsArray) {
    const eventsBody = document.getElementById('eventsBody');
    eventsBody.innerHTML = '';

    eventsArray.forEach(event => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${event.name}</td>
            <td>${formatDate(event.date)}</td>
            <td>${event.day}</td>
            <td>${event.time}</td>
            <td>${event.package}</td>
        `;
        eventsBody.appendChild(row);
    });
}

// Function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredEvents = events.filter(event => 
        event.name.toLowerCase().includes(searchTerm) ||
        event.date.includes(searchTerm) ||
        event.day.toLowerCase().includes(searchTerm) ||
        event.package.toLowerCase().includes(searchTerm)
    );
    displayEvents(filteredEvents);
});

// Initial display
displayEvents(events);