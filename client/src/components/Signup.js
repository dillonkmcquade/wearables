import React from "react";
import { styled } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

const Signup = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/auth/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((parse) => {
        if (parse.status === 201) {
          window.localStorage.setItem("accessToken", parse.accessToken);
          window.localStorage.setItem("refreshToken", parse.refreshToken);
          navigate("/");
        } else {
          setError(parse.message);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Wrapper>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Sign up</Title>
        <Flex>
          <FormGroup>
            <label htmlFor="email">Email:</label>
            <Input
              type="email"
              id="email"
              required
              onChange={(event) =>
                handleChange(event.target.id, event.target.value)
              }
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="firstName">First Name:</label>
            <Input
              type="text"
              id="firstName"
              required
              onChange={(event) =>
                handleChange(event.target.id, event.target.value)
              }
            />
          </FormGroup>
          <FormGroup>
            <label>Last Name:</label>
            <Input
              type="text"
              id="lastName"
              required
              onChange={(event) =>
                handleChange(event.target.id, event.target.value)
              }
            />
          </FormGroup>
          <FormGroup>
            <label>Phone Number:</label>
            <Input
              type="text"
              id="phoneNumber"
              required
              onChange={(event) =>
                handleChange(event.target.id, event.target.value)
              }
            />
          </FormGroup>
          <FormGroup>
            <label>Address:</label>
            <Input
              type="text"
              id="address"
              required
              onChange={(event) =>
                handleChange(event.target.id, event.target.value)
              }
            />
          </FormGroup>
          <FormGroup>
            <label>Password:</label>
            <Input
              type="password"
              id="password"
              required
              onChange={(event) =>
                handleChange(event.target.id, event.target.value)
              }
            />
          </FormGroup>
        </Flex>
        <Button type="submit">Sign up!</Button>
        {error && (
          <Alert severity="error" sx={{ margin: "1rem 0" }}>
            {error}
          </Alert>
        )}
      </LoginForm>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 3em);
  width: 100vw;
  color: black;
`;
const LoginForm = styled.form`
  background-color: white;
  height: 500px;
  width: 500px;
  min-height: 300px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 0.2em;
  align-items: center;
  justify-content: center;
  padding: 3em 3em 2em 3em;
`;
const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  align-items: center;
  font-size: 2em;
`;
const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const Input = styled.input`
  border-radius: 0.2em;
  border: 2px solid black;
  margin-left: 1em;
  height: 2em;
  width: 18em;
  outline: none;
`;
const FormGroup = styled.div`
  margin-bottom: 1em;
`;
const Button = styled.button`
  margin-top: 1em;
  padding: 0.5em;
  border-radius: 0.4em;
  border: 2px solid black;
  font-weight: bold;
  cursor: pointer;
  width: 20em;
  transition: all ease-in-out 0.3s;

  &:hover {
    background-color: black;
    color: white;
  }
`;
export default Signup;
