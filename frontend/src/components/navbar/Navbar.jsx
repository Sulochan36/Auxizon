import React from 'react'
import Container from '../Container'
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"

const Navbar = () => {

    const navigate = useNavigate();

    return (
        <header className="fixed top-0 w-full z-50 border-b border-neutral-300 bg-white opacity-80">

            <Container className="flex h-15 items-center justify-between">

                <NavLink to="/">
                <p className='text-indigo-600 font-extrabold text-4xl'>Auxizon</p>
                </NavLink>

                <ul className="hidden md:flex md:justify-center md:items-center gap-10 text-sm">

                    <li className="hover:cursor-pointer">Services</li>
                    <li className="hover:cursor-pointer">How It Works</li>
                    <li className="hover:cursor-pointer">Become a Provider</li>

                </ul>

                <div className="flex gap-3">

                    <NavLink to="/login">
                        <Button className="hover:cursor-pointer">
                            Login
                        </Button>
                    </NavLink>
                    
                    <NavLink to="/signup">
                        <Button className="hover:cursor-pointer">
                            Signup
                        </Button>
                    </NavLink>
                    

                </div>

            </Container>

        </header>
    )
}

export default Navbar