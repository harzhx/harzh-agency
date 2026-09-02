import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  console.log("Launching puppeteer...");
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set viewport to desktop to capture desktop layout initially
  await page.setViewport({ width: 1440, height: 900 });
  
  console.log("Navigating to http://localhost:4321...");
  await page.goto('http://localhost:4321', { waitUntil: 'networkidle0' });
  
  console.log("Waiting for components to settle...");
  // Wait a bit for animations, fonts, and video to size properly
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  console.log("Extracting static HTML...");
  const rootHtml = await page.evaluate(() => {
    // Remove scripts and dynamic elements that shouldn't be in the skeleton
    const appRoot = document.getElementById('app-root');
    if (appRoot) {
      // Remove all canvases (background effects) so they don't break the HTML or make it huge
      const canvases = appRoot.querySelectorAll('canvas');
      canvases.forEach(c => c.remove());
      
      // Remove the video player so it doesn't double-play or conflict before React loads
      // We'll just leave its container which has the correct aspect ratio/size!
      const videos = appRoot.querySelectorAll('video');
      videos.forEach(v => {
        v.style.display = 'none'; 
      });
    }
    const root = document.getElementById('root');
    return root ? root.innerHTML : '';
  });
  
  console.log("Injecting into index.html...");
  const indexPath = path.join(__dirname, 'index.html');
  let indexHtml = fs.readFileSync(indexPath, 'utf8');
  
  // Replace everything inside <div id="root">...</div> with the skeleton
  indexHtml = indexHtml.replace(/<div id="root">.*?<\/div>/s, `<div id="root">${rootHtml}</div>`);
  
  fs.writeFileSync(indexPath, indexHtml);
  console.log("Done! index.html now has a perfectly pre-rendered skeleton.");
  
  await browser.close();
})();
