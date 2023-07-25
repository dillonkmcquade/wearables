import React, { useContext } from "react";
import { styled } from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({});

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const request = await fetch("/auth/signin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await request.json();
      if (data.status === 200) {
        window.alert("Signed in Succesfully!");
        setCurrentUser(data["data"]);
        navigate("/");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Wrapper>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Login</Title>
        <Flex>
          <FormGroup>
            <label htmlFor="email">Email:</label>
            <Input
              type="email@email.com"
              id="email"
              placeholder="email"
              required
              onChange={(event) =>
                handleChange(event.target.id, event.target.value)
              }
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Password:</label>
            <Input
              type="password"
              id="password"
              placeholder="password"
              required
              onChange={(event) =>
                handleChange(event.target.id, event.target.value)
              }
            />
          </FormGroup>
        </Flex>
        <Signup to="/signup">Don't have an account? sign up now!</Signup>
        <Button type="submit">Log In</Button>
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
const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2em;
`;
const Input = styled.input`
  border-radius: 0.2em;
  border: 2px solid black;
  margin-left: 1em;
  height: 2em;
  width: 20em;
  outline: none;
`;
const FormGroup = styled.div`
  margin-bottom: 1em;
`;
const Signup = styled(NavLink)`
  text-decoration: none;
  margin-bottom: 1em;
  transition: 300ms;
  &:hover {
    cursor: pointer;
    color: lightblue;
    transition: 300ms;
  }
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
export default Login;
