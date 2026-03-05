import React from 'react'
import { Button } from '../../components/ui/button'
import { NavLink } from 'react-router-dom'

const Signup = () => {
    return (
        <section className='flex flex-1 flex-col items-center justify-center px-4 py-12 '>
            <div className='flex flex-col justify-center items-center text-center gap-2 mb-15' >
                <h2 className='text-5xl font-extrabold tracking-tight'>Welcome to <span className='text-primary'>Auxizon</span></h2>
                <p className='text-neutral-400 tracking-tight'>Select how you want to experience our platform and start <br /> your journey</p>
            </div>

            <div className='grid md:grid-cols-2 md:grid-rows-1 grid-cols-1 grid-row-2 justify-center items-center gap-15 mb-15'>
                <div className='flex flex-1 flex-col justify-center items-start rounded-2xl shadow-derek max-w-[450px]'>
                    <img height={50} className='w-full rounded-t-2xl object-top' src="./assets/images/signup customer.png" alt="signup as customer" />
                    
                    <div className='flex justify-center items-start gap-3'>
                        <h3 className='font-bold tracking-tight text-2xl'>Join as a Customer</h3>
                    </div>

                    <p>
                        Find and book top-rated profressionals for your needs. Verified reviews, and support for all your tasks. 
                    </p>

                    <NavLink className='w-full' to='/register-customer'>
                        <Button className="bg-primary py-6 text-[18px] rounded-full hover:cursor-pointer w-full mb-4 hover:bg-secondary shadow-derek">
                            Sign Up as Customer
                        </Button>
                </NavLink>
                    

                </div>

                <div className='flex flex-1 flex-col justify-center items-start rounded-2xl shadow-derek max-w-[450px]'>
                    <img  className='w-full rounded-t-2xl object-top' src="./assets/images/signup provider.png" alt="signup as customer" />

                    <div className='flex justify-center items-start gap-3'>
                        <h3 className='font-bold tracking-tight text-2xl'>Join as a Provider</h3>
                    </div>

                    <p>
                        Find and book top-rated profressionals for your needs. Verified reviews, and support for all your tasks.
                    </p>

                    <NavLink className='w-full' to='/register-provider'>
                        <Button className="bg-primary py-6 text-[18px] rounded-full hover:cursor-pointer w-full mb-4 hover:bg-secondary shadow-derek">
                            Sign Up as Provider
                        </Button>
                    </NavLink>

                    

                </div>
            </div>

                <div className='flex justify-center items-center'>
                    <p>Already have an account? <NavLink className="font-semibold text-primary hover:text-secondary hover:cursor-pointer" to="/login">Login here</NavLink></p>
                </div>
            
        </section>
    )
}

export default Signup