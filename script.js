document.addEventListener('DOMContentLoaded', () => {
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonthYearEl = document.getElementById('current-month-year');
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');

    let currentDate = new Date();
    const challenges = [
        { id: 'pushups', label: '100 Push-ups' },
        { id: 'situps', label: '100 Sit-ups' },
        { id: 'squats', label: '100 Squats' },
        { id: 'run', label: '10km Run' }
    ];

    function renderCalendar() {
        calendarGrid.innerHTML = '';
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const monthName = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(currentDate);
        currentMonthYearEl.textContent = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`;

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Ajuste para que la semana empiece en Lunes (si getDay() da 0 para Domingo)
        const dayOffset = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;

        // Crear celdas vacías para los días del mes anterior
        for (let i = 0; i < dayOffset; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('day', 'other-month');
            calendarGrid.appendChild(emptyCell);
        }

        // Crear celdas para cada día del mes
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
                const storageKey = `opm-${dateString}-${challenge.id}`;
                
                // Cargar estado guardado
                if (localStorage.getItem(storageKey) === 'true') {
                    checkbox.checked = true;
                }
                
                checkbox.id = `${dateString}-${challenge.id}`;
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

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
});
