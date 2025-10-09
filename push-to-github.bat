@echo off
echo ========================================
echo  StackScope - Push to GitHub
echo ========================================
echo.

echo Step 1: Initializing Git repository...
git init

echo.
echo Step 2: Adding all files...
git add .

echo.
echo Step 3: Creating initial commit...
git commit -m "Initial commit: StackScope - 2,390+ Technology Detector with stunning UI"

echo.
echo Step 4: Renaming branch to main...
git branch -M main

echo.
echo Step 5: Adding remote repository...
git remote add origin https://github.com/kreggscode/stackscope.git

echo.
echo Step 6: Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo  SUCCESS! Your code is now on GitHub!
echo ========================================
echo.
echo Next steps:
echo 1. Visit: https://github.com/kreggscode/stackscope
echo 2. Go to Settings ^> Pages
echo 3. Set Source to: main branch, /docs folder
echo 4. Your website will be live at:
echo    https://kreggscode.github.io/stackscope/
echo.
pause
