Prof Anwar Hussain Syed Fine Academy of Sciences — Updated Editable Website

Changes included:
- Room number section removed
- Timetable removed
- Header text no longer uses the short name “AHSAS Academy”
- Email updated to sjamalanwar@gmail.com
- Dr. Syed Jamal Anwar photo added as Chairman of Academy
- Chief of Academy section added for Prof. Anwar Hussain Syed
- Faculty cards include photos in front of names
- Faculty introduction poster section added
- Admin/update panel remains available for daily updates

Open:
- index.html = website
- admin.html = update panel

Daily update method:
1. Open admin.html
2. Edit a section
3. Download updated site-data.js
4. Replace data/site-data.js on your hosting

To replace any faculty photo:
1. Put image in assets/images/faculty/
2. Open admin.html
3. In faculty section, change the photo path

To add faculty posters:
1. Put poster in assets/images/faculty-posters/
2. Open admin.html
3. Add poster path in facultyPosters section


Update added on 2026-05-21:
- Faculty photos/cards were imported from academy_faculty_website_files(1).zip.
- Faculty introduction posters were regenerated using the imported photos.
- Standalone page added: uploaded-faculty.html.

Note: The uploaded DOCX file was not a valid readable Word document, so no extra Word content was imported from it.

Automatic updates (recommended): GitHub Pages
1. Create a new GitHub repository.
2. Upload this full folder to that repository.
3. Keep the file .github/workflows/deploy-pages.yml (already added).
4. In GitHub, open Settings > Pages.
5. In Build and deployment, set Source to GitHub Actions.
6. Every push to main branch will deploy website updates automatically.

Daily update after setup:
1. Edit files (or use admin.html to generate updated data/site-data.js).
2. Commit and push to main branch.
3. Wait about 1-2 minutes; site is updated automatically.

One-click update option:
1. Open this folder.
2. Double-click update-website.bat.
3. It will auto add, commit, and push your latest changes.
4. Wait 1-2 minutes, then refresh the live website.
