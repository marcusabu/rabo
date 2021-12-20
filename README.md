# Marcus Abukari

[![CI](https://github.com/marcusabu/rabo/actions/workflows/main.yml/badge.svg)](https://github.com/marcusabu/rabo/actions/workflows/main.yml)

## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

## Time estimation

- Functional implementation: 2 hours
- UI: 1 hour
- Unit tests: 1 hour

## Tools used

### create-react-app

Industry standard for quickly creating react apps, includes all the required building tools out of the box.

### axios

Somewhat cleaning syntax compared to the native fetch and does automatic JSON parsing.

### prettier

Does automatic formatting (in VSCode) preventing the need for manual indentation which saves time.

### react-testing-tools

Seems to be the standard for React unit testing now instead of enzyme. Allows to query the DOM by text which simulates user behaviour.

### bootstrap

Allows for quickly building a simple UI. I'm already familiar with the (class name) syntax, not so much with Tailwind.

## Future work

Currently the inputs are hardcoded which leads to duplicate code. Preferably there should be a seperate input component which takes a form config as an input. The required time did not allow for this implementation.

E.g.:

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
{
  formFields.map((field, index) => {
    <FormInput
      key={index}
      onChange={(e) => field.setter(e.target.value)}
      placeholder={field.placeholder}
      validationFn={field.validationFn}
    />;
  });
}
```
