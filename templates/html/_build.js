const fs = require('fs');
const cssbeautify = require('cssbeautify');

const buildDirectory = "./dist/";
const sourceDirectory = "./src/";

if (fs.existsSync(buildDirectory)){
  fs.rmSync(buildDirectory, { recursive: true });
}
fs.mkdirSync(buildDirectory, { recursive: true });

const files = fs.readdirSync(sourceDirectory);

for (let i = 0; i < files.length; i++) {
  const file = files[i];

  if (file.endsWith('.htm') || file.endsWith('.html')) {
      fs.copyFileSync(sourceDirectory+file, buildDirectory+file);
  }
}

if (!fs.existsSync(buildDirectory+"assets/css/")){
  fs.mkdirSync(buildDirectory+"assets/css/", { recursive: true });
}

fs.copyFileSync(sourceDirectory+"assets/css/main.css", buildDirectory+"assets/css/main.css");

const css = fs.readFileSync(buildDirectory+"assets/css/main.css", 'utf8');

fs.writeFileSync(buildDirectory+"assets/css/main.css", cssbeautify(css, { indent: '  ' }));