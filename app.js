function sendPromt() {
    let txtPromt= document.getElementById("txtPromt").value ;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-goog-api-key", "AIzaSyDsG6-MR338Q1Pa67rT8kTIB4Je-E0I1kw");

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
    .then((result) => 
    document.getElementById("output").innerHTML = result.candidates[0].content.parts[0].text
    )
    .catch((error) => console.error(error));
}
