document.addEventListener("DOMContentLoaded", function () {

  /* ---------------- LOGIN CHECK ---------------- */
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const username = localStorage.getItem("username");

  if (!isLoggedIn) {
    alert("You need to login first.");
    window.location.href = "login.html";
    return;
  }

  document.getElementById("userGreeting").innerText =
    `Welcome, ${username}! 😊`;

  /* ---------------- DATA ---------------- */
  let currentMonth = moment();
  let selectedDate = null;

  // Load bookings from localStorage
  let allBookings = JSON.parse(localStorage.getItem("bookings")) || [];

  /* ---------------- CALENDAR ---------------- */
  function renderCalendar() {
    const startOfMonth = currentMonth.clone().startOf('month');
    const endOfMonth = currentMonth.clone().endOf('month');

    const calendar = document.getElementById('calendar');
    const monthYear = document.getElementById('month-year');

    monthYear.textContent = currentMonth.format('MMMM YYYY');
    calendar.innerHTML = '';

    const firstDay = startOfMonth.day();
    for (let i = 0; i < firstDay; i++) {
      calendar.appendChild(document.createElement('div'));
    }

    for (let day = 1; day <= endOfMonth.date(); day++) {
      const dayCell = document.createElement('div');
      dayCell.classList.add('day');
      dayCell.textContent = day;

      const dayDate = currentMonth.clone().date(day);
      const dateString = dayDate.format('YYYY-MM-DD');

      const bookingsForDate = allBookings.filter(
        b => b.date === dateString
      );

      if (dayDate.isBefore(moment(), 'day')) {
        dayCell.classList.add('booked');
      }
      else if (bookingsForDate.length >= 4) {
        dayCell.classList.add('booked');
        dayCell.title = "Fully Booked";
      }
      else {
        dayCell.classList.add('available');
        dayCell.addEventListener('click', () => selectDate(dayDate));
      }

      calendar.appendChild(dayCell);
    }
  }

  /* ---------------- DATE SELECTION ---------------- */
  function selectDate(date) {
    selectedDate = date;
    document.getElementById('selected-date').innerText =
      selectedDate.format('MMMM Do, YYYY');

    document.getElementById('time-slot-container').style.display = 'block';
    loadTimeSlots();
  }

  /* ---------------- TIME SLOTS ---------------- */
  function loadTimeSlots() {
    const select = document.getElementById('time-slot');
    select.innerHTML = '<option value="">Select Time Slot</option>';

    const slots = [
      '9:00 AM - 11:00 AM',
      '12:00 PM - 2:00 PM',
      '4:00 PM - 6:00 PM',
      '7:00 PM - 9:00 PM'
    ];

    const bookedSlots = allBookings
      .filter(b => b.date === selectedDate.format('YYYY-MM-DD'))
      .map(b => b.timeSlot);

    slots.forEach(slot => {
      const option = document.createElement('option');
      option.value = slot;
      option.textContent = slot;

      if (bookedSlots.includes(slot)) {
        option.disabled = true;
        option.textContent += " (Booked)";
      }

      select.appendChild(option);
    });

    document.getElementById('book-slot-btn').disabled = true;
  }

  document.getElementById('time-slot').addEventListener('change', function () {
    document.getElementById('book-slot-btn').disabled = !this.value;
  });

  /* ---------------- BOOK SLOT ---------------- */
  document.getElementById('book-slot-btn').addEventListener('click', function () {
    const timeSlot = document.getElementById('time-slot').value;
  
    if (!selectedDate || !timeSlot) return;
  
    const booking = {
      username,
      date: selectedDate.format('YYYY-MM-DD'),
      timeSlot
    };
  
    // ✅ Save ONLY ONCE
    allBookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(allBookings));
  
    // ✅ Save current booking
    localStorage.setItem("currentBooking", JSON.stringify(booking));
  
    // ✅ Redirect
    window.location.href = "package.html";
  });
  

  /* ---------------- MONTH NAVIGATION ---------------- */
  document.getElementById('prev-month').addEventListener('click', () => {
    currentMonth.subtract(1, 'month');
    renderCalendar();
  });

  document.getElementById('next-month').addEventListener('click', () => {
    currentMonth.add(1, 'month');
    renderCalendar();
  });

  /* ---------------- INIT ---------------- */
  renderCalendar();
});
