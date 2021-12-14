import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [serverOutput, setServerOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function textIsValid(name) {
    return name && name !== "";
  }

  function passwordIsValid(password) {
    return password && password.length >= 8;
  }

  function resetForm() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setServerOutput("");
    setFormSubmitted(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormSubmitted(true);

    if (formIsValid) {
      resetForm();
      console.log("Form submitted");
      setIsLoading(true);

      await axios
        .post("https://demo-api.now.sh/users", {
          firstName,
          lastName,
          email,
          password,
        })
        .then((response) => {
          console.log(response);
        })
        .catch(() => {
          setErrorMessage("Error uploading data");
        });
      await axios
        .get(`https://demo-api.now.sh/users`)
        .then((response) => {
          console.log(response);
          setServerOutput(response.data);
        })
        .catch(() => {
          setErrorMessage("Error fetching data");
        });

      setIsLoading(false);
    }
  }

  useEffect(() => {
    setErrorMessage("");
    setFormIsValid(true);

    if (!textIsValid(firstName)) {
      setFormIsValid(false);
      setErrorMessage("First name is required");
    }
    if (!textIsValid(lastName)) {
      setFormIsValid(false);
      setErrorMessage("Last name is required");
    }
    if (!passwordIsValid(password)) {
      setFormIsValid(false);
      setErrorMessage("Password must meet the requirements");
    }
    if (!textIsValid(email)) {
      setFormIsValid(false);
      setErrorMessage("Email is required");
    }
  }, [firstName, lastName, email, password]);

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title">Sign Up</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div class="form-group">
                    <label for="firstnameInput">First name</label>
                    <input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      type="text"
                      class="form-control"
                      id="firstnameInput"
                      placeholder="First name"
                    />
                  </div>
                  <div class="form-group">
                    <label for="lastnameInput">Last name</label>
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      class="form-control"
                      id="lastnameInput"
                      placeholder="Last name"
                    />
                  </div>
                  <div class="form-group">
                    <label for="emailInput">Email address</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      class="form-control"
                      id="emailInput"
                      placeholder="Enter email"
                    />
                  </div>
                  <div class="form-group">
                    <label for="passwordInput">Password</label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      class="form-control"
                      id="passwordInput"
                      placeholder="Password"
                    />
                    <small id="passwordInput" class="form-text text-muted">
                      Requirements:
                      <ul>
                        <li>Should be a minimum of 8 characters</li>
                        <li>Should contain lower and uppercase letters</li>
                        <li>Should not contain your first or last name</li>
                      </ul>
                    </small>
                  </div>
                  {errorMessage && formSubmitted && (
                    <div class="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  )}
                  <button type="submit" class="btn btn-primary">
                    Send
                  </button>
                </form>
                {isLoading && (
                  <div class="spinner-border text-dark" role="status"></div>
                )}
                {serverOutput && serverOutput !== "" && (
                  <>
                    <h2>Server output</h2>
                    <code>{JSON.stringify(serverOutput)}</code>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
