# Marcus Abukari

## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

## Tools used

### create-react-app

Industry standard for quickly creating react apps, includes all th required building tools out of the box

### axios

Somewhat cleaning syntax compared to the native fetch and does automatic JSON parsing

### prettier

Does automatic formatting (in VSCode) preventing the need for manual indentation

### react-testing-tools

Seems to be the standard for unit testing. Allows to query the DOM by text which simulates user behaviour.

### bootstrap

Allows for quickly building a simple UI as I'm already familiar with the (class name) syntax.

## Future work

Currently the inputs are hardcoded which leads to duplicate code. Preferably there should be a seperate input component which takes a form config as an input. E.g.:

```javascript
const formFields = [
  {
    setter: setFirstName,
    type: "text",
    placeholder: "First name",
    validationFn: textValidationFn,
  },
  {
    setter: setPassword,
    type: "password",
    placeholder: "Password",
    validationFn: passwordValidationFn,
  },
];
```

```jsx
<FormInput
  key={index}
  onChange={(e) => field.setter(e.target.value)}
  placeholder={field.placeholder}
  validationFn={field.validationFn}
/>
```
