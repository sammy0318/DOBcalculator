async function fetchAge() {
  const dobInput = document.getElementById('dob').value;

  if (!dobInput) {
    document.getElementById('result').innerText = "Please select your Date of Birth.";
    return;
  }

  const response = await fetch('http://localhost:3000/dob-calculator', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dob: dobInput }),
  });

  if (!response.ok) {
    document.getElementById('result').innerText = "Error calculating age. Please try again.";
    return;
  }

  const data = await response.json();

  document.getElementById('result').innerHTML = `
    <h2>Your Age Details</h2>
    <p><strong>Years:</strong> ${data.years}</p>
    <p><strong>Months:</strong> ${data.months}</p>
    <p><strong>Weeks:</strong> ${data.weeks}</p>
    <p><strong>Days:</strong> ${data.days}</p>
    <p><strong>Hours:</strong> ${data.hours}</p>
    <p><strong>Minutes:</strong> ${data.minutes}</p>
    <p><strong>Seconds:</strong> ${data.seconds}</p>
  `;
}
