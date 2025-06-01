document.addEventListener('DOMContentLoaded', () => {
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);

  // Function to display parameter value or a default message
  const displayParam = (id, paramName) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = urlParams.get(paramName) || 'N/A';
    }
  };

  // Display the required fields
  displayParam('displayFname', 'fname');
  displayParam('displayLname', 'lname');
  displayParam('displayEmail', 'email');
  displayParam('displayPhone', 'phone');
  displayParam('displayBizName', 'bizName');

  // Format and display the timestamp
  const timestampElement = document.getElementById('displayTimestamp');
  if (timestampElement) {
    const timestampValue = urlParams.get('timestamp');
    if (timestampValue) {
      try {
        const date = new Date(timestampValue);
        // Format the date and time nicely, e.g., "May 29, 2025 at 10:53 AM"
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        };
        timestampElement.textContent = date.toLocaleString('en-US', options);
      } catch (e) {
        timestampElement.textContent = timestampValue; // Fallback to raw value
        console.error("Error parsing timestamp:", e);
      }
    } else {
      timestampElement.textContent = 'N/A';
    }
  }

  // Update the last modified date in the footer
  document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;
});