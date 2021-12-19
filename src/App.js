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

  function inputIsValid(input) {
    return input && input !== "";
  }

  function passwordIsValid(password) {
    if (!password) return false;
    if (password.length < 8) return false;
    if (password === password.toLowerCase()) return false;
    if (password === password.toUpperCase()) return false;
    if (firstName !== "" && password.includes(firstName)) return false;
    if (lastName !== "" && password.includes(lastName)) return false;
    return true;
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
      setIsLoading(true);

      await axios
        .post("https://demo-api.now.sh/users", {
          firstName,
          lastName,
          email,
          password,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch(() => {
          setErrorMessage("Error uploading data");
        });

      await setTimeout(async () => {
        await axios
          .get("https://demo-api.now.sh/users")
          .then((response) => {
            console.log(response.data);
            setServerOutput(response.data);
          })
          .catch(() => {
            setErrorMessage("Error fetching data");
          });
      }, 4000);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setErrorMessage("");
    setFormIsValid(true);

    if (!inputIsValid(firstName)) {
      setFormIsValid(false);
      setErrorMessage("First name is required");
    }
    if (!inputIsValid(lastName)) {
      setFormIsValid(false);
      setErrorMessage("Last name is required");
    }
    if (!passwordIsValid(password)) {
      setFormIsValid(false);
      setErrorMessage("Password must meet the requirements");
    }
    if (!inputIsValid(email)) {
      setFormIsValid(false);
      setErrorMessage("Email is required");
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
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
                  <div className="form-group">
                    <label htmlFor="firstnameInput">First name</label>
                    <input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      type="text"
                      className="form-control"
                      id="firstnameInput"
                      placeholder="First name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastnameInput">Last name</label>
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      className="form-control"
                      id="lastnameInput"
                      placeholder="Last name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="emailInput">Email address</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      className="form-control"
                      id="emailInput"
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="passwordInput">Password</label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="form-control"
                      id="passwordInput"
                      placeholder="Password"
                    />
                    <small id="passwordInput" className="form-text text-muted">
                      Requirements:
                      <ul>
                        <li>Should be a minimum of 8 characters</li>
                        <li>Should contain lower and uppercase letters</li>
                        <li>Should not contain your first or last name</li>
                      </ul>
                    </small>
                  </div>
                  {errorMessage && formSubmitted && (
                    <div
                      data-testid="form-error"
                      className="alert alert-danger"
                      role="alert"
                    >
                      {errorMessage}
                    </div>
                  )}
                  <button
                    data-testid="submit-btn"
                    type="submit"
                    className="btn btn-primary"
                  >
                    Send
                  </button>
                </form>
                {isLoading && (
                  <div className="spinner-border text-dark" role="status"></div>
                )}
                {serverOutput && serverOutput !== "" && (
                  <div data-testid="server-output">
                    <h2>Server output</h2>
                    <code>{JSON.stringify(serverOutput)}</code>
                  </div>
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
