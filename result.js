
// NEET Result Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('NEET Result page loaded successfully!');
    
    // Check if user accessed this page directly without login
    const referrer = document.referrer;
    const hasLoginReferrer = referrer.includes('login.html') || 
                            referrer.includes('login') || 
                            sessionStorage.getItem('neet_authenticated') === 'true';
    
    // If no proper referrer and not authenticated, redirect back to login
    if (!hasLoginReferrer && !referrer) {
        alert('Please login to view your result.');
        window.location.href = 'login.html';
        return;
    }
    
    // Set authentication flag
    sessionStorage.setItem('neet_authenticated', 'true');
    
    // Load the correct result based on application number
    loadCorrectResult();
    
    // Add print functionality
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Small delay to ensure button click is registered
            setTimeout(() => {
                window.print();
            }, 100);
        });
    }
    
    // Handle back button
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            // Clear authentication
            sessionStorage.removeItem('neet_authenticated');
            window.location.href = 'login.html';
        });
    }
    
    // Prevent right-click on result image (basic protection)
    const resultImage = document.querySelector('.result-image');
    if (resultImage) {
        resultImage.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });
        
        // Prevent drag and drop
        resultImage.addEventListener('dragstart', function(e) {
            e.preventDefault();
            return false;
        });
    }
    
    // Add warning when user tries to leave the page
    window.addEventListener('beforeunload', function() {
        sessionStorage.removeItem('neet_authenticated');
    });
});

// Load the correct result based on application number
function loadCorrectResult() {
    const currentApplicationNo = sessionStorage.getItem('current_application_no');
    const currentStudentName = sessionStorage.getItem('current_student_name');
    
    console.log('Loading result for application:', currentApplicationNo);
    
    if (!currentApplicationNo) {
        console.error('No application number found');
        alert('Session expired. Please login again.');
        window.location.href = 'login.html';
        return;
    }
    
    // Update the application number display
    const applicationInfo = document.querySelector('.application-info');
    if (applicationInfo) {
        applicationInfo.textContent = `Application Number: ${currentApplicationNo}`;
    }
    
    // Hardcoded result mappings
    const resultMappings = {
        '250411489141': {
            imagePath: 'assets/images/amruta-result.png',
            studentName: 'KHANKI AMRUTA ASHOK'
        },
        '250410121270': {
            imagePath: 'assets/images/aditya-result.png',
            studentName: 'ADITYA KUMAR'
        }
    };
    
    const userResult = resultMappings[currentApplicationNo];
    
    // Update result image and student name if found
    if (userResult) {
        const resultImage = document.querySelector('.result-image');
        if (resultImage) {
            resultImage.src = userResult.imagePath;
            resultImage.alt = `${userResult.studentName} - NEET Result`;
            
            // Add error handling for image loading
            resultImage.onerror = function() {
                console.error('Failed to load result image:', userResult.imagePath);
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzZjNzU3ZCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
            };
            
            resultImage.onload = function() {
                console.log('Result image loaded successfully');
            };
        }
        
        // Update page title with student name
        document.title = `NEET (UG) 2025 Result - ${userResult.studentName}`;
        console.log('Result loaded for:', userResult.studentName);
    } else {
        console.error('No result mapping found for application number:', currentApplicationNo);
        alert('Result not found for this application number.');
    }
}

// Utility function to format current date/time
function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}
