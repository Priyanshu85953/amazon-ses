// javascript.js


// Call updateQuestionCounts whenever question status changes
// Ensure that updateQuestionCounts() is triggered in your existing functions that change question status.



let totalMinutes = 60; // 180 minutes
let timeLeft = totalMinutes * 60; // Convert minutes to seconds
let timerId;
let timerKey = 'timeLeft_10'; // Unique key for the 120-min timer

let additionalTimeInSeconds = 20; // 60 minutes and 30 seconds in seconds
timeLeft += additionalTimeInSeconds;

// Check if there is a saved time in localStorage
// if (localStorage.getItem('timeLeft')) {
//     timeLeft = parseInt(localStorage.getItem('timeLeft'), 10);
// } // basically this code is responsible for not changing time

// Function to start the timer
function startTimer() {
    timerId = setInterval(function() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        // Display the timer
        document.getElementById('time_left').innerHTML = `Time Left: ${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;

          // Save the time left in localStorage every second
          localStorage.setItem('timeLeft', timeLeft);
        if (timeLeft <= 0) {
            clearInterval(timerId);
            autoSubmit();
            localStorage.removeItem('timeLeft'); // Clear storage after submission
        }

        timeLeft--;
    }, 1000);
}

// Function to stop the timer and submit
function stopTimer() {
    clearInterval(timerId);
    localStorage.removeItem('timeLeft'); // Remove time when the test is submitted

}

// Function to handle auto submission
function autoSubmit() {
    alert("Time is over! Submitting the test automatically.");
    document.getElementById('submit').click(); // Simulate click on submit button
}

// Start the timer when the page loads
window.onload = startTimer;

// Stop the timer on submit button click
document.getElementById('submit').onclick = function() {
    stopTimer();
};

// Login handler (assuming there's a login form)
function handleLogin(event) {
    event.preventDefault(); // Prevent form submission

    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;

    // Basic validation to check if the fields are filled
    if (userId === "" || password === "") {
        alert("Please fill in both the ID and Password.");
        return false;
    }

    // Object with valid usernames and their respective passwords
    const validCredentials = {
        "ANSH01": "123",
        "jee02": "124",
        "jee03": "125",
        "jee04": "126"
    };

    // Check if the entered username exists in the object and if the password matches
    if (validCredentials[userId] && validCredentials[userId] === password) {
        // If login is successful
        window.location.href = "exam.html"; // Redirect to another page
    } else {
        // If login fails
        alert("Invalid Username or Password. Hands' up, you are going to arrest!");
    }

    return false;
}

document.addEventListener('DOMContentLoaded', function () {
    let currentSection = "mathsSec1"; // Default section
    let quizSubmitted = false; // Track whether the quiz has been submitted

    const sectionData = {
        // phySec1: [],
        // phySec2: [],
        // chemSec1: [],
        // chemSec2: [],
        mathsSec1: [],
        mathsSec2: []
    };
    
    // Function to generate URLs based on question number
    function generateUrl(section, questionNumber) {
        return `https://firebasestorage.googleapis.com/v0/b/mentorsmantratestportal1.appspot.com/o/${section}%2F${questionNumber}.jpeg?alt=media`;
    }
    
    // Populate phySec1
    // for (let i = 1; i <= 20; i++) {
    //     sectionData.phySec1.push({
    //         questionNumber: i,
    //         url
    //         : i === 15 
    //         ? "https://firebasestorage.googleapis.com/v0/b/mentorsmantratestportal1.appspot.com/o/EMI%20MAINS%20TEST%2F1.jpeg?alt=media&token=26b5b134-1283-476c-b63a-5f4339960f0a"
    //          : i === 17 
    //         ? "https://firebasestorage.googleapis.com/v0/b/mentorsmantratestportal1.appspot.com/o/EMI%20MAINS%20TEST%2F3.jpeg?alt=media&token=00509042-39ff-4ff5-9cf3-7b9a470c3d75"
    //         : i === 19 
    //         ? "https://firebasestorage.googleapis.com/v0/b/mentorsmantratestportal1.appspot.com/o/EMI%20MAINS%20TEST%2F4.jpeg?alt=media&token=8f90060b-c21b-405f-945c-5302750e13c5"
    //         : generateUrl('ROT%20MAINS%20TEST', i),  // Default URL for other questions
    //         options: i === 1 ? ["t1/2", "2t1/3", "3t1/2", "2t1"]
    //         : i === 6 ? ["ML^2/12", "11ML^2/24", "7ML^2/24", "NONE OF THESE"]
    //         : i === 12 ? ["2/5", "1/5", "3/5", "1/4"]
    //         : i === 20 ? ["Wa = 3.22 N-m, Wb = 4.2 N-m", "Wa = 3.12 N-m, Wb = 4.12 N-m", "Wb = 4.22 N-m", "ALL OF THESE"]
    //         : ["A", "B", "C", "D"], // Custom options for question 2
    //         correctAnswer: [/*1*/ "A",
    //                         /*2*/ "C",
    //                         /*3*/ "A",
    //                         /*4*/ "B",
    //                         /*5*/ "B",
    //                         /*6*/ "B",
    //                         /*7*/ "D",
    //                         /*8*/ "C",
    //                         /*9*/ "D",
    //                        /*10*/ "D",
    //                        /*11*/ "B",
    //                        /*12*/ "A",
    //                         /*13*/"A",
    //                         /*14*/"D",
    //                         /*15*/"B",
    //                         /*16*/"A",
    //                         /*17*/"C",
    //                         /*18*/"C",
    //                         /*19*/"C",
    //                         /*20*/"B"][i - 1]  // Adjust correct answers as needed
    //     });
    // }
    
    // Populate phySec2
    // const phySec2CorrectAnswers = [
    //     /*1*/ 5,
    //     /*2*/ 4,
    //     /*3*/ 2,
    //     /*4*/ 8,
    //     /*5*/ 9];
    // for (let i = 21; i <= 25; i++) {
    //     sectionData.phySec2.push({
    //         questionNumber: i,
    //         url: generateUrl('ROT%20MAINS%20TEST', i),
    //         correctAnswer: phySec2CorrectAnswers[i - 21] // Adjusting the index to start from 0
    //     });
    // }
    
    // Populate chemSec1
    // for (let i = 1; i <= 20; i++) {
    //     sectionData.chemSec1.push({
    //         questionNumber: i,
    //         url: generateUrl('aldol%20%2B%20canizaro%20mains%20test', i),
    //         options: ["A", "B", "C", "D"],
    //         correctAnswer: [/*1*/ "B",
    //                         /*2*/ "C",
    //                         /*3*/ "B",
    //                         /*4*/ "A",
    //                         /*5*/ "B",
    //                         /*6*/ "B",
    //                         /*7*/ "B",
    //                         /*8*/ "C",
    //                         /*9*/ "C",
    //                        /*10*/ "C",
    //                        /*11*/ "B",
    //                        /*12*/ "A",
    //                         /*13*/"B",
    //                         /*14*/"B",
    //                         /*15*/"B",
    //                         /*16*/"A",
    //                         /*17*/"A",
    //                         /*18*/"C",
    //                         /*19*/"C",
    //                         /*20*/"C"][i - 1] // Adjust correct answers as needed
    //     });
    // }

    //     // Populate chemSec2
    //     const chemSec2CorrectAnswers = [
    //         /*1*/ 14,
    //         /*2*/ 2,
    //         /*3*/ 3,
    //         /*4*/ 4,
    //         /*5*/ 5];
    //     for (let i = 21; i <= 25; i++) {
    //         sectionData.chemSec2.push({
    //             questionNumber: i,
    //             url: generateUrl('magnetism%20mains%20test', i),
    //             correctAnswer: chemSec2CorrectAnswers[i - 21] // Adjusting the index to start from 0
    //         });
    //     }
        // Populate mathsSec1
    for (let i = 1; i <= 20; i++) {
        sectionData.mathsSec1.push({
            questionNumber: i,
            url: generateUrl('PNC%20MAINS%20TEST', i),
            options: ["A", "B", "C", "D"],
            correctAnswer: [
                /*1*/ "A",
/*2*/ "A",
/*3*/ "C",
/*4*/ "A",
/*5*/ "A",
/*6*/ "C",
/*7*/ "A",
/*8*/ "D",
/*9*/ "A",
/*10*/ "D",
/*11*/ "D",
/*12*/ "C",
/*13*/ "C",
/*14*/ "A",
/*15*/ "D",
/*16*/ "C",
/*17*/ "A",
/*18*/ "D",
/*19*/ "C",
/*20*/ "D"

                ][i - 1]  // Adjust correct answers as needed
        });
    }
    
    // Populate mathsSec2
    const mathsSec2CorrectAnswers = [
        /*1*/ 73,
        /*2*/ 12,
        /*3*/ 2,
        /*4*/ 240,
        /*5*/ 309];
    for (let i = 21; i <= 25; i++) {
        sectionData.mathsSec2.push({
            questionNumber: i,
            url: generateUrl('PNC%20MAINS%20TEST', i),
            correctAnswer: mathsSec2CorrectAnswers[i - 21] // Adjusting the index to start from 0
        });
    }

    const sectionQuestionIndex = {
        // phySec1: 0,
        // phySec2: 0,
        // chemSec1: 0,
        // chemSec2: 0,
        mathsSec1: 0,
        mathsSec2: 0
    };

    const selectedAnswers = {};
    const markedForReview = {}; // New object to track marked for review

    const saveButton = document.getElementById('favourite');
    const saveAndNextButton = document.getElementById('next');
    const markforreviewAndNextButton = document.getElementById('mfran');
    const clearResponseButton = document.getElementById('cr');
    const previousButton = document.getElementById('previous');
    const submitButton = document.getElementById('submit'); // Assuming there's a submit button

    saveButton.addEventListener('click', saveCurrentQuestion);
    saveAndNextButton.addEventListener('click', saveAndNextQuestion);
    markforreviewAndNextButton.addEventListener('click', markforreviewAndNextQuestion);
    clearResponseButton.addEventListener('click', clearResponse);
    previousButton.addEventListener('click', goToPreviousQuestion);
    submitButton.addEventListener('click', submitQuiz);

    function saveCurrentQuestion() {
        if (currentSection.includes("Sec2")) {
            // For Section 2, save numerical answer
            const numericalAnswer = document.getElementById('numerical-answer').value;
    
            if (numericalAnswer) {
                if (!selectedAnswers[currentSection]) {
                    selectedAnswers[currentSection] = {};
                }
                selectedAnswers[currentSection][sectionQuestionIndex[currentSection]] = numericalAnswer;
            }
        } else {
            // For Section 1, save MCQ answers as before
            const selectedOption = document.querySelector(`input[name="option${sectionQuestionIndex[currentSection]}"]:checked`);
    
            if (selectedOption) {
                if (!selectedAnswers[currentSection]) {
                    selectedAnswers[currentSection] = {};
                }
                selectedAnswers[currentSection][sectionQuestionIndex[currentSection]] = selectedOption.value;
            }
        }
    
        updatePaletteItems();
    }
    

    function markforreviewAndNextQuestion() {
        saveCurrentQuestion();
        
        // Initialize the review tracking for the current section if not already done
        if (!markedForReview[currentSection]) {
            markedForReview[currentSection] = {};
        }
        
        // Set the current question as marked for review
        markedForReview[currentSection][sectionQuestionIndex[currentSection]] = true;
        
        updatePaletteItems(); // Update the palette to reflect the change
        
        goToNextQuestion();
    }

    function saveAndNextQuestion() {
        saveCurrentQuestion();
        goToNextQuestion();
    }

    function goToNextQuestion() {
        const currentIndex = sectionQuestionIndex[currentSection];
        if (currentIndex < sectionData[currentSection].length - 1) {
            sectionQuestionIndex[currentSection]++;
            updateQuestionDisplay();
            updatePaletteItems(); // Update palette colors
        } else {
            const nextSection = getNextSection();
            if (nextSection) {
                switchSection(nextSection);
            }
        }
    }

    function goToPreviousQuestion() {
        const currentIndex = sectionQuestionIndex[currentSection];
        if (currentIndex > 0) {
            sectionQuestionIndex[currentSection]--;
            updateQuestionDisplay();
            updatePaletteItems(); // Update palette colors
        }
    }

    function clearResponse() {
        // Clear selected option for the current question
        document.querySelectorAll(`input[name="option${sectionQuestionIndex[currentSection]}"]`).forEach(input => {
            input.checked = false; // Uncheck the radio buttons
        });
        
        if (selectedAnswers[currentSection]) {
            selectedAnswers[currentSection][sectionQuestionIndex[currentSection]] = null; // Clear the selected answer
        }
        
        // Update the palette items to reflect the cleared state
        updatePaletteItems();
    }

    function updateQuestionDisplay() {
        const currentQuestionData = sectionData[currentSection][sectionQuestionIndex[currentSection]];
        document.getElementById('q1').src = currentQuestionData.url;
        document.getElementById('question-title').textContent = `Question no. ${sectionQuestionIndex[currentSection] + 1}`;
    
        const optionsContainer = document.querySelector('.answers');
        optionsContainer.innerHTML = "";  // Clear previous content
    
        if (currentSection.includes("Sec2")) {
            // For Section 2, show a numerical input field
            const inputField = document.createElement('input');
            inputField.type = 'number';
            inputField.id = 'numerical-answer';
            inputField.style.width = "200px";  // Increase the size of the input field
            inputField.style.height = "40px";  // Adjust height
            inputField.placeholder = 'Enter your answer';
    
            if (selectedAnswers[currentSection] && selectedAnswers[currentSection][sectionQuestionIndex[currentSection]] !== undefined) {
                inputField.value = selectedAnswers[currentSection][sectionQuestionIndex[currentSection]];
            }
    
            optionsContainer.appendChild(inputField);
        } else {
            // For Section 1, display MCQs as usual
            currentQuestionData.options.forEach((option, index) => {
                const label = document.createElement('label');
                label.innerHTML = `<input type="radio" name="option${sectionQuestionIndex[currentSection]}" value="${option}"> ${option}`;
                optionsContainer.appendChild(label);
            });
    
            if (selectedAnswers[currentSection] && selectedAnswers[currentSection][sectionQuestionIndex[currentSection]] !== undefined) {
                const selectedValue = selectedAnswers[currentSection][sectionQuestionIndex[currentSection]];
                const selectedInput = document.querySelector(`input[name="option${sectionQuestionIndex[currentSection]}"][value="${selectedValue}"]`);
                if (selectedInput) {
                    selectedInput.checked = true;
                }
            }
        }
    
        if (quizSubmitted) {
            showResults();  // Show results after submission
        }
    
        updatePaletteItems();
    }
    

    function switchSection(section) {
        if (sectionData.hasOwnProperty(section)) {
            currentSection = section;
            updateQuestionDisplay();
            updateSectionColors(); // Change color when switching sections
        } else {
            console.error("Section not found: " + section);
        }
    }

    function getNextSection() {
        const sectionNames = ["mathsSec1", "mathsSec2"];
        const currentIndex = sectionNames.indexOf(currentSection);
        if (currentIndex < sectionNames.length - 1) {
            return sectionNames[currentIndex + 1];
        }
        return null;
    }

    function updatePaletteItems() {
        const paletteList = document.getElementById('palette-list');
        paletteList.innerHTML = ""; // Clear existing palette items
    
        sectionData[currentSection].forEach((_, index) => {
            const paletteItem = document.createElement('div');
            paletteItem.className = 'nv item';
            paletteItem.id = `btn${index + 1}`;
            paletteItem.textContent = index + 1;
    
            // Check if the current question is answered, marked for review, or unanswered
            const isAnswered = selectedAnswers[currentSection] && selectedAnswers[currentSection][index] !== undefined && selectedAnswers[currentSection][index] !== null;
            const isMarkedForReview = markedForReview[currentSection] && markedForReview[currentSection][index];
    
            // Determine the color of the palette item
            if (isMarkedForReview) {
                if (isAnswered) {
                    // Mix of blue and green (e.g., teal)
                    paletteItem.style.backgroundColor = 'purple';
                } else {
                    // Blue for marked for review without an answer
                    paletteItem.style.backgroundColor = '#4B0082';
                }
            } else {
                if (isAnswered) {
                    // Green for answered
                    paletteItem.style.backgroundColor = 'green';
                } else {
                    // Red for visited but unanswered
                    // Check if the question was visited but left unanswered
                    if (selectedAnswers[currentSection] && selectedAnswers[currentSection][index] === null) {
                        paletteItem.style.backgroundColor = 'red';
                    } else {
                        // No color for not visited
                        paletteItem.style.backgroundColor = '';
                    }
                }
            }
    
            // Add a click event listener to update the current question
            paletteItem.addEventListener('click', () => {
                sectionQuestionIndex[currentSection] = index;
                updateQuestionDisplay();
            });
    
            paletteList.appendChild(paletteItem);
        });
    }
    

    function updateSectionColors() {
        const sections = document.querySelectorAll('.section_unselected, .section_selected');

        sections.forEach((section) => {
            section.classList.remove('section_selected');
            section.classList.add('section_unselected');
        });

        // Find the corresponding section element and apply 'section_selected'
        const sectionIndex = Object.keys(sectionData).indexOf(currentSection);
        if (sectionIndex !== -1) {
            sections[sectionIndex].classList.remove('section_unselected');
            sections[sectionIndex].classList.add('section_selected');
        }
    }
    function showResults() {
        const currentQuestionData = sectionData[currentSection][sectionQuestionIndex[currentSection]];
        const correctAnswer = currentQuestionData.correctAnswer;
    
        if (currentSection.includes("Sec2")) {
            // Handle numerical answers for Section 2
            const userAnswer = document.getElementById('numerical-answer').value.trim(); // Get user's answer and trim spaces
    
            if (userAnswer) {
                if (parseFloat(userAnswer) === correctAnswer) {
                    // Correct answer, show in green
                    document.getElementById('numerical-answer').style.border = "2px solid green";
                } else {
                    // Incorrect answer, show in red
                    document.getElementById('numerical-answer').style.border = "2px solid red";
                }
            }
        } else {
            // Handle MCQs for Section 1
            const options = document.querySelectorAll(`input[name="option${sectionQuestionIndex[currentSection]}"]`);
    
            options.forEach(option => {
                const parentLabel = option.parentElement;
                if (option.value === correctAnswer) {
                    parentLabel.style.border = "2px solid green"; // Correct answer in green
                } else if (option.checked) {
                    parentLabel.style.border = "2px solid red"; // Incorrect answer in red
                }
            });
        }
    }
    

    function calculateMarks() {
        let totalMarks = 0;
        let sectionMarks = {};
    
        Object.keys(sectionData).forEach(section => {
            let sectionTotal = 0;
            sectionData[section].forEach((question, index) => {
                const correctAnswer = question.correctAnswer;
                const userAnswer = selectedAnswers[section] ? selectedAnswers[section][index] : null;
    
                if (section.includes("Sec2")) {
                    // Handle numerical answers
                    if (parseFloat(userAnswer) === correctAnswer) {
                        sectionTotal += 4;  // +4 for correct answer
                    } else if (userAnswer) {
                        sectionTotal -= 1;  // -1 for incorrect answer
                    }
                } else {
                    // Handle MCQ answers
                    if (userAnswer === correctAnswer) {
                        sectionTotal += 4;  // +4 for correct answer
                    } else if (userAnswer) {
                        sectionTotal -= 1;  // -1 for incorrect answer
                    }
                }
            });
            sectionMarks[section] = sectionTotal;
            totalMarks += sectionTotal;
        });
    
        return { totalMarks, sectionMarks };
    }

    // Define a function to handle sending the email after submit
    
    



    // Import the sendMail function from sendmail.js


    function submitQuiz() {
        quizSubmitted = true;
        showResults();
    
        const { totalMarks, sectionMarks } = calculateMarks();
        let emailMessage = `Quiz submitted! Your final score is ${totalMarks} marks.<br><br>Section-wise marks:<br>`;
        let alertMessage = `Quiz submitted! Your final score is ${totalMarks} marks.\n\nSection-wise marks:\n`;
    
        for (const section in sectionMarks) {
            emailMessage += `${section}: ${sectionMarks[section]} marks<br>`;
            alertMessage += `${section}: ${sectionMarks[section]} marks\n`;
        }
    
        let userName = "";
        while (!userName) {
            userName = prompt("Please enter your name (This is required):");
        }
    
        emailMessage = `<strong>Name: ${userName}</strong><br><br>` + emailMessage;
        alertMessage = `Name: ${userName}\n\n` + alertMessage;
    
        emailMessage += `<br><br><strong>Selected Answers:</strong><br>`;
        alertMessage += `\n\nSelected Answers:\n`;
    
        Object.keys(sectionData).forEach(section => {
            emailMessage += `<strong>${section}:</strong><br>`;
            alertMessage += `${section}:\n`;
            
            sectionData[section].forEach((question, index) => {
                const correctAnswer = question.correctAnswer;
                const userAnswer = selectedAnswers[section] ? selectedAnswers[section][index] : "No answer";
                emailMessage += `Question ${index + 1}: Selected - ${userAnswer}, Correct - ${correctAnswer}<br>`;
                alertMessage += `Question ${index + 1}: Selected - ${userAnswer}, Correct - ${correctAnswer}\n`;
            });
        });
    
        alert(alertMessage);
    
        // Send email by making a POST request to the server
        fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recipientEmail: "psych9841@gmail.com",
                name: userName,
                emailBody: emailMessage
            })
        })
        .then(response => response.text())
        .then(responseText => alert(responseText))
        .catch(error => console.error("Error sending email:", error));
        


      
        
    
        // Send the email using SMTPJS with the emailMessage
        Email.send({
            Host: "smtp.elasticemail.com", // Elastic Email SMTP server
            Username: "psych9841@gmail.com", // Your verified sender email
            Password: "011A6207C7785653286962372971184C8776", // The API token you obtained
            To: "psych9841@gmail.com", // The recipient email address
            From: "psych9841@gmail.com", // Must be the same as your verified sender
            Subject: `Quiz Results for ${userName}`,
            Body: emailMessage
        })
        .then(function(response) {
            alert("THANK YOU!");
        })
        .catch(function(error) {
            console.error("Error sending email:", error);
        });
    }
    
    
    

    // Add click event listeners for the sections
    document.querySelectorAll('.section_unselected, .section_selected').forEach((element, index) => {
        const sectionNames = ["mathsSec1", "mathsSec2"];
        element.addEventListener('click', () => {
            switchSection(sectionNames[index]);
        });
    });

    updateQuestionDisplay();
    updatePaletteItems();
    updateSectionColors(); // Initialize colors

  
});
