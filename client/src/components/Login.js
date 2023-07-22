import React, { useContext } from "react";
import { styled } from "styled-components";

import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { setName, setCurrentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({});

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      email: formData.email,
      password: formData.password,
    };
    const newData = JSON.stringify(data);
    fetch("/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: newData,
    })
      .then((res) => res.json())
      .then((parse) => {
        if (parse.status === 200) {
          window.alert("Signed in Succesfully!");
          window.localStorage.setItem(
            "user",
            JSON.stringify(parse.data.cartId),
          );
          window.localStorage.setItem(
            "name",
            JSON.stringify(parse.data.firstName),
          );
          setName(parse.data.firstName);
          setCurrentUser(parse.data.cartId);
          navigate("/");
        } else if (parse.status === 404) {
          window.alert(JSON.stringify(parse.data));
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  return (
    <Wrapper>
      <Box>
        <LoginForm onSubmit={handleSubmit}>
          <Title>Login</Title>
          <Flex>
            <FormGroup>
              <Label htmlFor="email">Email:</Label>
              <Input
                type="email"
                id="email"
                onChange={(event) =>
                  handleChange(event.target.id, event.target.value)
                }
              />
            </FormGroup>
            <FormGroup>
              <Label>Password:</Label>
              <Input
                type="password"
                id="password"
                onChange={(event) =>
                  handleChange(event.target.id, event.target.value)
                }
              />
            </FormGroup>
          </Flex>
          <Signup to="/signup">Don't have an account? sign up now!</Signup>
          <Button type="submit">Log In</Button>
        </LoginForm>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: lightgrey;
`;
const Box = styled.div`
  font-family: "Open Sans", sans-serif;
  /* background: rgb(2,0,36);
    background: linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(6,1,58,1) 0%, rgba(6,1,59,1) 16%, rgba(255,255,255,1) 100%); */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 95vh;
  color: white;
`;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #06013b;
  border-radius: 40px;
  align-items: center;
  justify-content: center;
  padding: 3em 3em 2em 3em;
  box-shadow:
    0 2px 4px 0 #808080,
    0 4px 10px 0 #808080;
  div {
    margin-bottom: 1em;
  }
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
const Label = styled.label``;
const Input = styled.input`
  border-radius: 20px;
  border: none;
  margin-left: 1em;
  height: 2em;
  width: 20em;
`;
const FormGroup = styled.div``;
const Signup = styled(NavLink)`
  color: white;
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
  border-radius: 20px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  width: 15em;
`;
export default Login;
