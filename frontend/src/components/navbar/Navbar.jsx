import React from 'react'
import Container from '../Container'
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import useAuthStore from '../../store/useAuthStore';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const Navbar = () => {

    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);

    return (
        <header className="fixed top-0 w-full z-50 border-b border-neutral-300 bg-transparent backdrop-blur-2xl ">

            <Container className="flex h-15 items-center justify-between">


                <NavLink to="/">
                <p className='text-primary font-extrabold text-4xl'>Auxizon</p>
                </NavLink>

                <ul className="hidden md:flex md:justify-center md:items-center gap-10 text-sm">

                    <li className="hover:cursor-pointer">
                        <NavLink to='/category-page'>
                        Services
                    </NavLink>   
                    </li>
                    <li className="hover:cursor-pointer">How It Works</li>
                    <li className="hover:cursor-pointer">
                        <NavLink to='/register-provider'>
                            Become a Provider
                        </NavLink>  
                    </li>

                </ul>

                <div className="flex gap-3">

                    {!user ? (
                        <>
                            <NavLink to="/login">
                                <Button className="hover:cursor-pointer bg-primary shadow-derek">
                                    Login
                                </Button>
                            </NavLink>



                            <NavLink to="/signup">
                                <Button className="hover:cursor-pointer bg-primary shadow-derek">
                                    Signup
                                </Button>
                            </NavLink>
                        </>
                    ) : (
                        <>
                            {/* 🔑 Primary CTA when logged in */}
                            <NavLink to={`/${user.role}/dashboard`}>
                                <Button size="sm">Go to Dashboard</Button>
                            </NavLink>

                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>{user?.fullName?.[0] ?? "U"}</AvatarFallback>
                            </Avatar>
                        </>
                    )}

                    

                </div>

            </Container>

        </header>
    )
}

export default Navbar