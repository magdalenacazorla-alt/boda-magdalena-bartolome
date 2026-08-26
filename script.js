(() => {
  // 30 de octubre de 2027, 13:00 en Pozoblanco (España).
  // Ese día España está en horario UTC+2.
  const target = new Date("2027-10-30T13:00:00+02:00").getTime();

  const els = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
  };

  function pad(n, length) {
    return String(Math.max(0, n)).padStart(length, "0");
  }

  function updateCountdown() {
    const diff = Math.max(0, target - Date.now());
    const totalSeconds = Math.floor(diff / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    els.days.textContent = pad(days, 3);
    els.hours.textContent = pad(hours, 2);
    els.minutes.textContent = pad(minutes, 2);
    els.seconds.textContent = pad(seconds, 2);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();
