document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector('form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            // Stop form from refreshing the page
            event.preventDefault();

            let name = document.getElementById("username").value;
            let cgpa = document.getElementById("cgpa").value;

            // Store values securely
            localStorage.setItem("name", name);
            localStorage.setItem("cgpa", cgpa);
            window.location.assign("dashboard.html");
        });
    }
});

if (document.getElementById("companies") || window.location.pathname.includes("dashboard.html")) {

    let name = localStorage.getItem("name") || "Student";
    let cgpa = parseFloat(localStorage.getItem("cgpa")) || 0;

    if (document.getElementById("user")) document.getElementById("user").innerText = name;
    if (document.getElementById("userCgpa")) document.getElementById("userCgpa").innerText = cgpa;

    let companies = [
        { name: "Google", role: "Software Engineer", location: "Bangalore", package: "25 LPA", skills: "DSA, System Design", minCgpa: 8 },
        { name: "Amazon", role: "SDE Intern", location: "Hyderabad", package: "20 LPA", skills: "DSA, OOPs", minCgpa: 7.5 },
        { name: "Microsoft", role: "Software Developer", location: "Noida", package: "22 LPA", skills: "C++, DSA, OS", minCgpa: 8 },
        { name: "Infosys", role: "System Engineer", location: "Pune", package: "6 LPA", skills: "Java, DBMS", minCgpa: 6 },
        { name: "TCS", role: "Assistant System Engineer", location: "Delhi", package: "5 LPA", skills: "Coding, Aptitude", minCgpa: 6 }
    ];

    let container = document.getElementById("companies");
    let appliedList = document.getElementById("applied");

    if (container) {
        container.innerHTML = ""; // Clear old contents
        companies.forEach((c, index) => {
            let div = document.createElement("div");
            div.className = "company";
            div.innerHTML = `
                <h3>${c.name}</h3>
                <p><b>Role:</b> ${c.role}</p>
                <p><b>Location:</b> ${c.location}</p>
                <p><b>Package:</b> ${c.package}</p>
                <p><b>Skills:</b> ${c.skills}</p>
                <p><b>Min CGPA:</b> ${c.minCgpa}</p>
                <button onclick="apply(${index})">Apply</button>
            `;
            container.appendChild(div);
        });
    }

    window.apply = function(index) {
        let applied = JSON.parse(localStorage.getItem("applied")) || [];
        if (applied.includes(companies[index].name)) {
            alert("You have already applied to " + companies[index].name);
            return;
        }
        applied.push(companies[index].name);
        localStorage.setItem("applied", JSON.stringify(applied));
        displayApplied();
    };

    function displayApplied() {
        if (!appliedList) return;
        let applied = JSON.parse(localStorage.getItem("applied")) || [];
        appliedList.innerHTML = "";
        applied.forEach(c => {
            let li = document.createElement("li");
            li.innerText = c;
            appliedList.appendChild(li);
        });
    }

    displayApplied();
}
