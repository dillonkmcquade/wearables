import React, { useState } from "react"
import { styled } from "styled-components"
import { GiHamburgerMenu } from 'react-icons/gi'
import { NavLink } from "react-router-dom"

const CatBurger = () => {

    const [open, setOpen] = useState(false)

    return (
        <Wrapper>
            <MenuContainer>
                <MenuTrigger onClick={() => {setOpen(!open)}}>
                    <GiHamburgerMenu size = {20} />
                </MenuTrigger>
                <Menu className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                    <h3>Categories</h3>
                    <ul>
                        <Item to = "/categories/Lifestyle">LifeStyle</Item>
                        <Item to = "/categories/Fitness">Fitness</Item>
                        <Item to = "/categories/Medical">Medical</Item>
                        <Item to = "/categories/Entertainment">Entertainment</Item>
                        <Item to = "/categories/Industrial">Industrial</Item>
                        <Item to = "/categories/Pets-and-Animals">Pets and Animals</Item>
                        <Item to = "/categories/Gaming">Gaming</Item>
                    </ul>
                </Menu>
            </MenuContainer>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    color: white;
    margin-right: 1em;
    z-index: 100;
`
const MenuContainer = styled.div`

`
const MenuTrigger = styled.div`
    cursor: pointer;
`
const Menu = styled.div`
    position: absolute;
    margin-top: 1.5em;
    background-color: white;
    color: black;
    padding: 1em 0.5em 1em 0.5em;
    box-shadow: 0px 0px 13px 0px #000000;
    border-radius: 25px;
    transition: 500ms;
    ul{
        display: flex;
        flex-direction: column;
        
    }
    h3{
        margin-bottom: 1em;
        text-align: center;
        border-bottom: 1px black solid;
    }
    &:active {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
        transition: var(--speed) ease;
    }
    &.inactive {
        opacity: 0;
        visibility: hidden;
        transform: translateY(-20);
        transition: var(--speed) ease;
        transition: 500ms;
    }
`
const Item = styled(NavLink)`
    text-decoration: none;
    text-align: center;
    margin-bottom: 0.4em;
    color: black;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    margin-top: 0.2em;
    transition: 300ms;
    &:hover{
        cursor: pointer;
        color: red;
        transition: 300ms;
    }
`


export default CatBurger;