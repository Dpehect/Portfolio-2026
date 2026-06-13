const fs = require('fs');

const path = 'src/content/projects/projects.json';
const data = fs.readFileSync(path, 'utf8');
const projects = JSON.parse(data);

for (const project of projects) {
  if (project.slug === 'softbridge') {
    project.content.en.title = "SoftBridge Solutions Netherlands";
    project.content.en.source = "https://github.com/Dpehect/SoftBridgeSolutions-Netherlands";
    
    project.content.tr.title = "SoftBridge Solutions Netherlands";
    project.content.tr.source = "https://github.com/Dpehect/SoftBridgeSolutions-Netherlands";
  }
  if (project.slug === 'artofwebgl') {
    project.content.en.live = "https://art-of-web-gl-website.vercel.app/";
    project.content.tr.live = "https://art-of-web-gl-website.vercel.app/";
  }
}

fs.writeFileSync(path, JSON.stringify(projects, null, 2), 'utf8');
console.log('projects.json updated successfully');
