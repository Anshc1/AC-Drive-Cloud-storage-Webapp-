# AC Drive - Cloud Storage WebApp

AC Drive is a secure cloud storage web application built using Firebase and React. This application allows users to manage their data and media files with ease, ensuring a seamless experience for uploading, downloading, and organizing files. The following README provides an overview of the project, its features, the file structure, installation instructions, usage guidelines, and a hosted link.

## Features

- Secure Cloud Storage: AC Drive provides a secure environment for users to store their data and media files using Firebase's cloud storage services.
- User Authentication: Firebase auth service is integrated for account creation, updates, and password recovery, ensuring secure and authenticated access.
- File Management: Users can upload and download files effortlessly, making data management convenient and efficient.
- Responsive Design: The web app is designed to provide a consistent experience across different devices.

## Hosted Link

Visit the hosted AC Drive web application: [https://acdrive.netlify.app/](https://acdrive.netlify.app/)

## File Structure

```
- public
  - _redirects
  - favicon.ico
  - icons8-google-drive.gif
  - icons8-google-drive.json
  - index.html
  - logo192.png
  - logo512.png
  - manifest.json
  - robots.txt
- src
  - components
    - AddFolder.js
    - Centre.js
    - ChangePassword.js
    - DisplayFile.js
    - FileSection.js
    - NavBar.js
    - UploadFile.js
    - CommonForm.js
    - Dashboard.js
    - ImgMain.png
    - Welcome.js
  - App.css
  - App.js
  - App.test.js
  - firebaseConfig.js
  - index.css
  - index.js
  - logo.svg
  - reportWebVitals.js
  - setupTests.js
- .firebaserc
- .gitignore
- README.md
- database.rules.json
- firebase.json
- package-lock.json
- package.json
```

## Installation

1. Clone the repository: `git clone https://github.com/your-username/ac-drive.git`
2. Navigate to the project directory: `cd ac-drive`
3. Install dependencies: `npm install`
4. Configure Firebase: Update `firebaseConfig.js` with your Firebase configuration details.
5. Start the development server: `npm start`

## Usage

1. Open the web app in your browser or visit the hosted link.
2. Create an account or log in using your existing credentials.
3. Once logged in, you can upload files, create folders, and manage your data.
4. Download files from your cloud storage whenever needed.
5. Use the Change Password feature to update your account's password.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, fork the repository, make your changes, and submit a pull request.

---

For any questions or assistance, please contact us at contact@acdrive.com. We hope you find AC Drive's Cloud Storage WebApp a valuable tool for managing your data securely!
