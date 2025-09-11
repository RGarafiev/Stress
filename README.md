## Project structure

This is a TypeScript React app scaffolded to match the landing + game + legal pages spec. No packages were installed here; install your preferred router/types tooling when ready.

```
src/
  app/
    providers/
      AppProviders.tsx
      AuthProvider.tsx
      ModalProvider.tsx
      ToastProvider.tsx
    routes/
      AppRoutes.tsx
  components/
    layout/
      GameLayout.tsx
      MainLayout.tsx
    shared/
      SiteFooter.tsx
      SiteHeader.tsx
    ui/
      Button.tsx
      Input.tsx
      Modal.tsx
      Toast.tsx
  features/
    auth/
      modals/
        AuthModals.tsx
  pages/
    game/
      GamePage.tsx
    home/
      HomePage.tsx
    legal/
      PrivacyPage.tsx
      TermsPage.tsx
  styles/
    globals.css
  types/
    global.d.ts
  App.tsx
  index.tsx
```

### Pages & routes
- `/` — Landing with sections: hero, rules, mission, blog-integration placeholder, CTA.
- `/game` — Game page with translucent header and Unity WebGL placeholder.
- `/privacy` — Privacy policy (stub).
- `/terms` — Terms of use (stub).

### Popups (modals)
- Login, Registration, Password reset, Email confirmation, Profile (change password, reset progress).

### Contexts
- AuthProvider — mock auth with timeouts (replace with real API).
- ModalProvider — central modal state by id.
- ToastProvider — system notifications (success/error/warning/info).

### UI primitives
- Button, Input, Modal, Toast viewport.

### Getting started
Install dependencies you prefer for TS + routing (example):

```
react-router-dom
@types/react
@types/react-dom
typescript
```

Then run the dev server as usual for your setup.

### Design reference
Landing sections are laid out following the provided design reference: `https://pixso.net/app/design/ECLIvDSGz2FIYtum1bVAeg?icon_type=1&page-id=4%3A3`.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
