# PowerShell script to create and push all 59 projects to individual GitHub repositories with CLEAN names (no numeric prefixes)

$projectFolders = @(
  "01-ecommerce-platform",
  "02-online-food-delivery",
  "03-inventory-management",
  "04-learning-management-system",
  "05-social-media-platform",
  "06-healthcare-appointment",
  "07-employee-management",
  "08-video-streaming",
  "09-expense-tracker",
  "10-online-exam",
  "11-car-rental",
  "12-weather-app",
  "13-online-voting",
  "14-fitness-tracker",
  "15-file-sharing",
  "16-cms",
  "17-online-banking",
  "18-event-management",
  "19-health-records",
  "20-travel-booking",
  "21-learning-hub",
  "22-hospital-management",
  "23-online-art-gallery",
  "24-crm-system",
  "25-news-aggregator",
  "26-expense-sharing",
  "27-food-recipe",
  "28-property-management",
  "29-online-auction",
  "30-personal-portfolio",
  "31-ride-sharing",
  "32-online-grocery",
  "33-music-streaming",
  "34-forum-app",
  "35-ticket-booking",
  "36-student-report",
  "37-task-management",
  "38-quiz-builder",
  "39-food-waste-management",
  "40-pet-adoption",
  "41-online-donation",
  "42-disaster-management",
  "43-budget-planner",
  "44-blood-bank",
  "45-agriculture-marketplace",
  "46-hotel-booking",
  "47-online-library",
  "48-feedback-management",
  "49-home-tutor-finder",
  "50-music-discovery",
  "51-freelancer-marketplace",
  "52-job-application-tracker",
  "53-research-journal",
  "54-crowdfunding",
  "55-sports-league",
  "56-digital-wallet",
  "57-gaming-tournament",
  "58-virtual-stock-trading",
  "59-home-services-booking"
)

$baseDir = Get-Location

Write-Host "Starting deployment of $($projectFolders.Count) repositories with CLEAN names..." -ForegroundColor Cyan

for ($i = 0; $i -lt $projectFolders.Count; $i++) {
    $folderName = $projectFolders[$i]
    $projectPath = Join-Path $baseDir $folderName

    # Strip numeric prefix (e.g. "53-research-journal" -> "research-journal")
    $cleanRepoName = $folderName -replace '^\d+-', ''

    if (-not (Test-Path $projectPath)) {
        Write-Host "[$($i + 1)/$($projectFolders.Count)] Directory $folderName does not exist. Skipping." -ForegroundColor Yellow
        continue
    }

    Write-Host "`n========================================================" -ForegroundColor Magenta
    Write-Host "[$($i + 1)/$($projectFolders.Count)] Folder: $folderName" -ForegroundColor Cyan
    Write-Host "Repository Name: $cleanRepoName" -ForegroundColor Yellow
    Write-Host "========================================================" -ForegroundColor Magenta

    Set-Location $projectPath

    # 1. Initialize git
    if (-not (Test-Path ".git")) {
        git init -b main
    }

    # 2. Stage & Commit
    git add .
    git commit -m "Initial commit: Full-stack implementation" 2>$null

    # 3. Create repo with clean name and push
    gh repo create "$cleanRepoName" --public --source=. --remote=origin --push

    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Published successfully: https://github.com/$cleanRepoName" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Notice for $cleanRepoName" -ForegroundColor Yellow
    }
}

Set-Location $baseDir
Write-Host "`n🎉 Completed deploying all 59 repositories with clean names!" -ForegroundColor Green
