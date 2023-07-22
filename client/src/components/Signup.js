import React from "react";
import { styled } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

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
      firstName: formData.firstName,
      lastName: formData.lastName,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
    };
    const newData = JSON.stringify(data);
    fetch("/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: newData,
    })
      .then((res) => res.json())
      .then((parse) => {
        if (parse.status === 201) {
          window.alert("Account Created Succesfully!");
          navigate("/");
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
          <Title>Sign up</Title>
          <Flex>
            <FormGroup>
              <Label>Email:</Label>
              <Input
                type="email"
                id="email"
                onChange={(event) =>
                  handleChange(event.target.id, event.target.value)
                }
              />
            </FormGroup>
            <FormGroup>
              <Label>First Name:</Label>
              <Input
                type="text"
                id="firstName"
                onChange={(event) =>
                  handleChange(event.target.id, event.target.value)
                }
              />
            </FormGroup>
            <FormGroup>
              <Label>Last Name:</Label>
              <Input
                type="text"
                id="lastName"
                onChange={(event) =>
                  handleChange(event.target.id, event.target.value)
                }
              />
            </FormGroup>
            <FormGroup>
              <Label>Phone Number:</Label>
              <Input
                type="text"
                id="phoneNumber"
                onChange={(event) =>
                  handleChange(event.target.id, event.target.value)
                }
              />
            </FormGroup>
            <FormGroup>
              <Label>Address:</Label>
              <Input
                type="text"
                id="address"
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
          <Button type="submit">Sign up!</Button>
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
  height: 100vh;
  color: white;
`;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #06013b;
  border-radius: 40px;
  box-shadow: 0 2px 4px 0 #808080, 0 4px 10px 0 #808080;
  justify-content: center;
  padding: 3em 3em 2em 3em;
  div {
    margin-bottom: 1em;
  }
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
const Label = styled.label``;
const Input = styled.input`
  border-radius: 20px;
  border: none;
  margin-left: 1em;
  height: 2em;
  width: 20em;
`;
const FormGroup = styled.div``;
const Button = styled.button`
  margin-top: 1em;
  padding: 0.5em;
  border-radius: 20px;
  border: none;
  font-weight: bold;
  cursor: pointer;
`;
export default Signup;
