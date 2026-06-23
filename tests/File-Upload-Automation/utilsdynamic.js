//dynamic data generation for uploading files test
function generateFiles() {
    const files = ['EPP.pdf', 'Leave Management System.pdf', 'text.tex', 'image.jpeg', 'sound.mp3'];
    return files[Math.floor(Math.random() * files.length)]; // Randomly select a file from the array
}

module.exports = { generateFiles };