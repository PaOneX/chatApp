function sendPromt() {
  let txtPromt = document.getElementById("txtPromt").value;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-goog-api-key", "AIzaSyAlz9anh85lYf6JYulYYr16hyMQspxNhzw");

  const raw = JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: txtPromt,
          },
        ],
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      let response = marked.parse(result.candidates[0].content.parts[0].text);
      addMessage(response, "ai");
    })
    .catch((error) => console.error(error));
}

function addMessage(message, sender) {
  const output = document.getElementById("output");

  const messageDiv = document.createElement("div");
  messageDiv.className = "message " + sender;

  const contentDiv = document.createElement("div");
  contentDiv.className = "message-content";

  if (sender === "ai") {
    contentDiv.innerHTML = message; // AI uses HTML rendering
  } else {
    contentDiv.innerText = message; // User uses normal text
  }

  messageDiv.appendChild(contentDiv);
  output.appendChild(messageDiv);

  output.scrollTop = output.scrollHeight;
}
