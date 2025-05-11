const courses = [
    { code: "WDD 130", name: "Web Fundamentals", credits: 2, type: "WDD", completed: true },
    { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 2, type: "WDD", completed: true },
    { code: "WDD 230", name: "Web Frontend Development I", credits: 2, type: "WDD", completed: false },
    { code: "CSE 110", name: "Introduction to Programming", credits: 2, type: "CSE", completed: true },
    { code: "CSE 111", name: "Programming with Functions", credits: 2, type: "CSE", completed: false },
    { code: "CSE 210", name: "Programming with Classes", credits: 2, type: "CSE", completed: false },
    { code: "CSE 121B", name: "JavaScript Language", credits: 2, type: "CSE", completed: true }
  ];
  
  const container = document.getElementById("course-container");
  const totalCreditsEl = document.getElementById("total-credits");
  
  function displayCourses(courseList) {
    container.innerHTML = "";
  
    courseList.forEach(course => {
      const card = document.createElement("div");
      card.className = "course-card";
      if (course.completed) card.classList.add("completed");
  
      card.innerHTML = `
        <h3>${course.code}</h3>
        <p>${course.name}</p>
        <p><strong>Créditos:</strong> ${course.credits}</p>
      `;
  
      container.appendChild(card);
    });
  
    const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsEl.textContent = `Créditos Totais: ${totalCredits}`;
  }
  
  // Botões
  document.getElementById("all-btn").addEventListener("click", () => {
    displayCourses(courses);
  });
  
  document.getElementById("wdd-btn").addEventListener("click", () => {
    const filtered = courses.filter(c => c.type === "WDD");
    displayCourses(filtered);
  });
  
  document.getElementById("cse-btn").addEventListener("click", () => {
    const filtered = courses.filter(c => c.type === "CSE");
    displayCourses(filtered);
  });
  
  // Exibe todos ao carregar
  displayCourses(courses);
  