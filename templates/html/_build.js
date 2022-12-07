const fs = require('fs');

const buildDirectory = "./dist/";
const files = fs.readdirSync(buildDirectory);

if (fs.existsSync(buildDirectory)){
  fs.rmSync(buildDirectory, { recursive: true });
}
fs.mkdirSync(buildDirectory, { recursive: true });

for (let i = 0; i < files.length; i++) {
  const file = files[i];

  if (file.endsWith('.htm') || file.endsWith('.html')) {
      fs.copyFileSync("src/"+file, buildDirectory+file);
  }
}

if (!fs.existsSync(buildDirectory+"assets/css/")){
  fs.mkdirSync(buildDirectory+"assets/css/", { recursive: true });
}

fs.copyFileSync("./src/assets/css/main.css", buildDirectory+"assets/css/main.css");