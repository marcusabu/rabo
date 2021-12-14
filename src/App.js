import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Sign Up</h5>
                <form>
                  <div class="form-group">
                    <label for="firstnameInput">First name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="firstnameInput"
                      placeholder="First name"
                    />
                  </div>
                  <div class="form-group">
                    <label for="lastnameInput">Last name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="lastnameInput"
                      placeholder="Last name"
                    />
                  </div>
                  <div class="form-group">
                    <label for="emailInput">Email address</label>
                    <input
                      type="email"
                      class="form-control"
                      id="emailInput"
                      placeholder="Enter email"
                    />
                  </div>
                  <div class="form-group">
                    <label for="passwordInput">Password</label>
                    <input
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
                  <button type="submit" class="btn btn-primary">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
