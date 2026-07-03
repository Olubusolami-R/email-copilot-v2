const emailBodyInput = document.getElementById("emailBody");
const draftReplyInput = document.getElementById("draftReply");
const generateButton = document.getElementById("generateButton");
const statusText = document.getElementById("status");
const metadata = document.getElementById("metadata");

const API_URL = "http://127.0.0.1:8000/draft-reply";
const copyButton = document.getElementById("copyButton");

generateButton.addEventListener("click", async () => {
  const emailBody = emailBodyInput.value.trim();

  if (!emailBody) {
    statusText.textContent = "Please paste an email first.";
    return;
  }

  statusText.textContent = "Generating reply...";
  draftReplyInput.value = "";
  metadata.textContent = "";
  generateButton.disabled = true;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email_body: emailBody })
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }

    const data = await response.json();

    draftReplyInput.value = data.draft;
    metadata.textContent = `Intent: ${data.intent} | Confidence: ${data.confidence} | Needs review: ${data.needs_review}`;
    statusText.textContent = "Draft generated.";
  } catch (error) {
    statusText.textContent = `Error: ${error.message}`;
  } finally {
    generateButton.disabled = false;
  }
});
copyButton.addEventListener("click", async () => {
  const draft = draftReplyInput.value.trim();

  if (!draft) {
    statusText.textContent = "No draft to copy yet.";
    return;
  }

  try {
    await navigator.clipboard.writeText(draft);
    statusText.textContent = "Draft copied.";
  } catch (error) {
    statusText.textContent = "Could not copy draft.";
  }
});