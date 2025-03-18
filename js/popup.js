document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const response = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getTicketData,
  });

  const result = response[0].result || 'Not found';

  document.getElementById('ticketNumber').value = result.ticketNumber;
  document.getElementById('ticketTitle').value = result.ticketTitle;

  updateBranchName();
});

// Extract ticket number and title from Jira's DOM
function getTicketData() {
  const ticketNumberElement = document.querySelector(
    '[data-testid="issue.views.issue-base.foundation.breadcrumbs.current-issue.item"]'
  );
  const ticketTitleElement = document.querySelector(
    '[data-testid="issue.views.issue-base.foundation.summary.heading"]'
  );

  return {
    ticketNumber: ticketNumberElement?.innerText.trim() || '',
    ticketTitle: ticketTitleElement?.innerText.trim() || '',
  };
}

// Update branch name based on inputs
function updateBranchName() {
  const ticketType = document.getElementById('ticketType').value;
  const ticketNumber = document.getElementById('ticketNumber').value.trim();
  const ticketTitle = document.getElementById('ticketTitle').value.trim();
  const branchNameField = document.getElementById('branchName');

  if (ticketNumber && ticketTitle) {
    const formattedTitle = ticketTitle
      .replace(/[^\w\s-]/g, '') // Remove special characters except dashes and spaces
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with dashes
      .replace(/-+/g, '-'); // Replace multiple consecutive dashes with a single dash

    branchNameField.value = `${ticketType}/${ticketNumber.toLowerCase()}-${formattedTitle}`;
  } else {
    branchNameField.value = '';
  }
}

// Copy the branch name to clipboard
function copyToClipboard() {
  const branchName = document.getElementById('branchName').value;
  const copyButtonText = document.getElementById('copy-button-text');

  navigator.clipboard
    .writeText(branchName)
    .then(() => {
      copyButtonText.innerText = 'Copied!';
      setTimeout(() => (copyButtonText.innerText = 'Copy'), 1500);
    })
    .catch((err) => alert('Failed to copy: ' + err));
}

document
  .getElementById('copy-button')
  .addEventListener('click', copyToClipboard);

// Attach event listeners for real-time updates
['ticketType', 'ticketNumber', 'ticketTitle'].forEach((id) =>
  document.getElementById(id).addEventListener('input', updateBranchName)
);
