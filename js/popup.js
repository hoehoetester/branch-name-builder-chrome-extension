document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const response = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getTicketData,
  });

  const result = response[0].result || 'Not found';

  document.getElementById('ticketNumber').value = result.ticketNumber;
  document.getElementById('ticketTitle').value = result.ticketTitle;
  document.getElementById('ticketType').value = result.ticketType;

  updateBranchName();
  updateCommitMessage();
});

// Extract ticket number and title from Jira's DOM
function getTicketData() {
  const ticketNumberElement = document.querySelector(
    '[data-testid="issue.views.issue-base.foundation.breadcrumbs.current-issue.item"]'
  );
  const ticketTitleElement = document.querySelector(
    '[data-testid="issue.views.issue-base.foundation.summary.heading"]'
  );

  const ticketTypeElement = document.querySelector(
    '[data-testid="issue.views.issue-base.foundation.change-issue-type.button"]'
  );

  const ticketTypeButtonLabel = ticketTypeElement?.ariaLabel || '';
  const ticketTypeValue = (() => {
    switch (true) {
      case /feature/i.test(ticketTypeButtonLabel):
        return 'feature';
      case /bug/i.test(ticketTypeButtonLabel):
        return 'bugfix';
      case /task/i.test(ticketTypeButtonLabel):
        return 'task';
      case /test/i.test(ticketTypeButtonLabel):
        return 'test';
      case /experiment/i.test(ticketTypeButtonLabel):
        return 'experiment';
      case /hotfix/i.test(ticketTypeButtonLabel):
        return 'hotfix';
      default:
        return '';
    }
  })();

  return {
    ticketNumber: ticketNumberElement?.innerText.trim() || '',
    ticketTitle: ticketTitleElement?.innerText.trim() || '',
    ticketType: ticketTypeValue,
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

function updateCommitMessage() {
  const ticketNumber = document.getElementById('ticketNumber').value.trim();
  const ticketTitle = document.getElementById('ticketTitle').value.trim();
  const branchNameField = document.getElementById('commitMessage');

  if (ticketNumber && ticketTitle) {
    branchNameField.value = `[${ticketNumber}] ${ticketTitle}`;
  } else {
    branchNameField.value = '';
  }
}

// Copy the branch name to clipboard
function copyToClipboard(copyTextType) {
  const textToCopy = document.getElementById(copyTextType).value;

  const targetButton =
    copyTextType === 'branchName'
      ? 'copy-button-text'
      : 'copy-commit-message-button-text';
  const copyButtonText = document.getElementById(targetButton);

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      copyButtonText.innerText = 'Copied!';
      setTimeout(() => (copyButtonText.innerText = 'Copy'), 1500);
    })
    .catch((err) => alert('Failed to copy: ' + err));
}

document
  .getElementById('copy-button')
  .addEventListener('click', () => copyToClipboard('branchName'));

document
  .getElementById('copy-commit-message-button')
  .addEventListener('click', () => copyToClipboard('commitMessage'));

// Attach event listeners for real-time updates
['ticketType', 'ticketNumber', 'ticketTitle'].forEach((id) =>
  document.getElementById(id).addEventListener('input', () => {
    updateBranchName();
    updateCommitMessage();
  })
);

document.getElementById('close-button').addEventListener('click', () => {
  window.close(); // This closes the popup
});
