export async function listLabels(gmail) {
  const res = await gmail.users.labels.list({
    userId: "me",
  });
  const labels = res.data.labels;
  if (!labels || labels.length === 0) {
    console.log("No labels found.");
    return;
  }
  console.log("Labels:");
  labels.forEach((label) => {
    console.log(`- ${label.name} + ${label.id}`);
  });
}

export async function listUnreads(gmail) {
  const res = await gmail.users.messages.list({
    userId: "me",
    maxResults: 10,
  });
  const messages = res.data.messages;
  if (!messages || messages.length === 0) {
    console.log("No messages found.");
    return;
  }
  console.log(messages);
}