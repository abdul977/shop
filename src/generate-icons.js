import fs from 'fs';
import { createCanvas } from 'canvas';

// Function to create base icon
function createIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, size, size);

    // Add text
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${size/4}px Arial`;
    ctx.fillText('M', size/2, size/2);

    // Add border
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = size/20;
    ctx.strokeRect(size/8, size/8, size*3/4, size*3/4);

    return canvas;
}

// Sizes to generate
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Create icons directory if it doesn't exist
if (!fs.existsSync('public/icons')) {
    fs.mkdirSync('public/icons', { recursive: true });
}

// Generate icons for each size
sizes.forEach(size => {
    const canvas = createIcon(size);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`public/icons/icon-${size}x${size}.png`, buffer);
    
    // Generate maskable icon for 512x512
    if (size === 512) {
        const maskableCanvas = createIcon(size);
        const maskableCtx = maskableCanvas.getContext('2d');
        // Add padding for maskable icon
        maskableCtx.fillStyle = '#000000';
        maskableCtx.fillRect(0, 0, size, size/8);
        maskableCtx.fillRect(0, size*7/8, size, size/8);
        fs.writeFileSync('public/icons/maskable-512x512.png', maskableCanvas.toBuffer('image/png'));
    }
});

console.log('Icons generated successfully!');