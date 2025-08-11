document.addEventListener('DOMContentLoaded', () => {
    // Grab the DOM elements we need
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonthYearEl = document.getElementById('current-month-year');
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');

    let currentDate = new Date();
    
    // Define the challenges
    const challenges = [
        { id: 'pushups', label: '100 Push-ups' },
        { id: 'situps', label: '100 Sit-ups' },
        { id: 'squats', label: '100 Squats' },
        { id: 'run', label: '10km Run' }
    ];

    // Main function to draw the calendar
    function renderCalendar() {
        calendarGrid.innerHTML = '';
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // Set to 'en-US' for English month names
        const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate);
        currentMonthYearEl.textContent = `${monthName} ${year}`;

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // JS days are 0 (Sun) - 6 (Sat). We want Monday first, so we need to offset.
        const dayOffset = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;

        // Add empty cells for the days of the previous month
        for (let i = 0; i < dayOffset; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('day', 'other-month');
            calendarGrid.appendChild(emptyCell);
        }

        // Fill in the cells for the current month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('day');

            const dayNumber = document.createElement('div');
            dayNumber.classList.add('day-number');
            dayNumber.textContent = day;
            dayCell.appendChild(dayNumber);

            const taskList = document.createElement('ul');
            taskList.classList.add('tasks');

            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            challenges.forEach(challenge => {
                const taskItem = document.createElement('li');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                
                // Key for localStorage, e.g., "opm-2023-10-27-pushups"
                const storageKey = `opm-${dateString}-${challenge.id}`;
                
                // Check localStorage to see if this was already checked
                if (localStorage.getItem(storageKey) === 'true') {
                    checkbox.checked = true;
                }
                
                checkbox.id = `${dateString}-${challenge.id}`;
                
                // Save the new state (checked/unchecked) on every change
                checkbox.addEventListener('change', () => {
                    localStorage.setItem(storageKey, checkbox.checked);
                });

                const label = document.createElement('label');
                label.htmlFor = checkbox.id;
                label.textContent = challenge.label;
                
                taskItem.appendChild(checkbox);
                taskItem.appendChild(label);
                taskList.appendChild(taskItem);
            });

            dayCell.appendChild(taskList);
            calendarGrid.appendChild(dayCell);
        }
    }

    // Hook up the navigation buttons
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Initial render on page load
    renderCalendar();
});
