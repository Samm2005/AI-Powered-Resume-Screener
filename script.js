async function uploadResume() {
    let fileInput = document.getElementById("resumeInput");
    let jobDescription = document.getElementById("jobDescription").value;

    if (!fileInput.files.length || !jobDescription) {
        alert("Please upload a resume and enter job description!");
        return;
    }

    let file = fileInput.files[0];
    let reader = new FileReader();

    reader.onload = async function (event) {
        let resumeText = event.target.result;

        let aiResponse = await fetch("http://localhost:5000/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resumeText, jobDescription })
        });

        let result = await aiResponse.json();
        let score = result.score;

        // Store in Firebase
        db.collection("resumes").add({
            name: file.name,
            score: score
        });

        alert(`Resume uploaded! Score: ${score}`);
        fetchRankedResumes();
    };

    reader.readAsText(file);
}

// Fetch ranked resumes from Firebase
async function fetchRankedResumes() {
    let list = document.getElementById("rankedList");
    list.innerHTML = "";

    let querySnapshot = await db.collection("resumes").orderBy("score", "desc").get();
    querySnapshot.forEach((doc) => {
        let li = document.createElement("li");
        li.textContent = `${doc.data().name} - Score: ${doc.data().score}`;
        list.appendChild(li);
    });
}

// Load ranked resumes on page load
fetchRankedResumes();
