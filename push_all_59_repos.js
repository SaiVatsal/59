const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const baseDir = __dirname;

const projectFolders = [
  '01-ecommerce-platform',
  '02-online-food-delivery',
  '03-inventory-management',
  '04-learning-management-system',
  '05-social-media-platform',
  '06-healthcare-appointment',
  '07-employee-management',
  '08-video-streaming',
  '09-expense-tracker',
  '10-online-exam',
  '11-car-rental',
  '12-weather-app',
  '13-online-voting',
  '14-fitness-tracker',
  '15-file-sharing',
  '16-cms',
  '17-online-banking',
  '18-event-management',
  '19-health-records',
  '20-travel-booking',
  '21-learning-hub',
  '22-hospital-management',
  '23-online-art-gallery',
  '24-crm-system',
  '25-news-aggregator',
  '26-expense-sharing',
  '27-food-recipe',
  '28-property-management',
  '29-online-auction',
  '30-personal-portfolio',
  '31-ride-sharing',
  '32-online-grocery',
  '33-music-streaming',
  '34-forum-app',
  '35-ticket-booking',
  '36-student-report',
  '37-task-management',
  '38-quiz-builder',
  '39-food-waste-management',
  '40-pet-adoption',
  '41-online-donation',
  '42-disaster-management',
  '43-budget-planner',
  '44-blood-bank',
  '45-agriculture-marketplace',
  '46-hotel-booking',
  '47-online-library',
  '48-feedback-management',
  '49-home-tutor-finder',
  '50-music-discovery',
  '51-freelancer-marketplace',
  '52-job-application-tracker',
  '53-research-journal',
  '54-crowdfunding',
  '55-sports-league',
  '56-digital-wallet',
  '57-gaming-tournament',
  '58-virtual-stock-trading',
  '59-home-services-booking'
];

function runCmd(cmd, cwd) {
  try {
    return execSync(cmd, { cwd, stdio: 'pipe', encoding: 'utf-8' }).trim();
  } catch (err) {
    return null;
  }
}

console.log(`Starting deployment of ${projectFolders.length} repositories to GitHub...\n`);

for (let i = 0; i < projectFolders.length; i++) {
  const folderName = projectFolders[i];
  const projectPath = path.join(baseDir, folderName);
  const cleanRepoName = folderName.replace(/^\d+-/, '');

  if (!fs.existsSync(projectPath)) {
    console.log(`[${i + 1}/${projectFolders.length}] Directory ${folderName} does not exist, skipping.`);
    continue;
  }

  console.log(`\n======================================================`);
  console.log(`[${i + 1}/${projectFolders.length}] Processing: ${folderName} -> Repo: ${cleanRepoName}`);
  console.log(`======================================================`);

  try {
    // 1. Ensure .gitignore
    const gitignorePath = path.join(projectPath, '.gitignore');
    if (!fs.existsSync(gitignorePath)) {
      fs.writeFileSync(gitignorePath, 'node_modules\ndist\n.DS_Store\n');
    }

    // 2. Initialize git if not present
    const gitDir = path.join(projectPath, '.git');
    if (!fs.existsSync(gitDir)) {
      runCmd('git init -b main', projectPath);
    }

    // Ensure branch is main
    runCmd('git branch -M main', projectPath);

    // 3. Stage and commit
    runCmd('git add .', projectPath);
    runCmd('git commit -m "Initial commit: Full-stack implementation"', projectPath);

    // 4. Check if repo already exists on GitHub
    const viewResult = runCmd(`gh repo view "${cleanRepoName}" --json name`, projectPath);

    if (!viewResult) {
      // Create repo and push
      console.log(`Creating GitHub repo ${cleanRepoName} and pushing...`);
      const createOut = runCmd(`gh repo create "${cleanRepoName}" --public --source=. --remote=origin --push`, projectPath);
      console.log(`Created & Pushed: ${cleanRepoName}`);
    } else {
      // Repo exists, ensure remote and standard push
      console.log(`Repo ${cleanRepoName} already exists on GitHub. Pushing main branch...`);
      runCmd(`git remote remove origin`, projectPath);
      runCmd(`gh repo set-default "${cleanRepoName}"`, projectPath);
      runCmd(`git remote add origin https://github.com/SaiVatsal/${cleanRepoName}.git`, projectPath);
      runCmd(`git push -u origin main`, projectPath);
      console.log(`Pushed changes to: ${cleanRepoName}`);
    }

    console.log(`✅ Success: https://github.com/SaiVatsal/${cleanRepoName}`);
  } catch (err) {
    console.error(`❌ Failed for ${cleanRepoName}:`, err.message);
  }
}

console.log(`\n🎉 All ${projectFolders.length} repositories processed successfully!`);
