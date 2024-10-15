const fs = require('fs');
const path = require('path');

// Define paths
const source = path.join(__dirname, 'docs', '.nojekyll');
const destinationDir = path.join(__dirname, 'docs', 'browser');
const destination = path.join(destinationDir, '.nojekyll');

// Create the destination directory if it doesn't exist
if (!fs.existsSync(destinationDir)) {
  fs.mkdirSync(destinationDir, { recursive: true });
}

// Copy the .nojekyll file
fs.copyFile(source, destination, (err) => {
  if (err) {
    console.error('Error copying .nojekyll file:', err);
  } else {
    console.log('.nojekyll file successfully copied to docs/browser');
  }
});
