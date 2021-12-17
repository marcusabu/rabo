import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import axios from "axios";

jest.mock("axios");
jest.useFakeTimers();

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);

    const linkElement = screen.getByText("Sign Up");
    expect(linkElement).toBeInTheDocument();
  });

  describe("form validation", () => {
    it("validates the form", () => {
      render(<App />);

      expect(screen.queryByTestId("form-error")).not.toBeInTheDocument();
      fireEvent.click(screen.getByText("Send"));
      expect(screen.getByTestId("form-error")).toBeInTheDocument();
    });

    // TODO: test for other input fields
  });

  it("submits the form", async () => {
    render(<App />);

    axios.post.mockResolvedValueOnce({
      data: "Test output",
    });

    axios.get.mockResolvedValueOnce({
      data: [
        {
          _id: "72bc62e8-2c62-4fd9-93dc-8e718f1308dd",
          email: "janedoe@apple.com",
          firstName: "Jane",
          lastName: "Doe",
        },
        {
          _id: "0250ef50-bc62-467a-acd4-dde7dff94f8e",
          email: "artiebits@apple.com",
          firstName: "Artur",
          lastName: "Khusaenov",
          website: "artiebits.com",
        },
      ],
    });

    const firstNameInput = screen.getByLabelText("First name");
    const lastNameInput = screen.getByLabelText("Last name");
    const emailInput = screen.getByLabelText("Email address");
    const passwordInput = screen.getByLabelText("Password");

    const button = screen.getByText("Send");

    fireEvent.change(firstNameInput, { target: { value: "firstName" } });
    fireEvent.change(lastNameInput, { target: { value: "lastName" } });
    fireEvent.change(emailInput, { target: { value: "email" } });
    fireEvent.change(passwordInput, { target: { value: "Password123" } });

    await fireEvent.click(button);
    await screen.findByTestId("server-output");

    expect(axios.post).toHaveBeenCalledWith("https://demo-api.now.sh/users", {
      firstName: "firstName",
      lastName: "lastName",
      email: "email",
      password: "Password123",
    });
    expect(axios.get).toHaveBeenCalledWith("https://demo-api.now.sh/users");

    expect(screen.queryByTestId("form-error")).not.toBeInTheDocument();
    expect(screen.getByTestId("server-output")).toBeInTheDocument();
  });
});
