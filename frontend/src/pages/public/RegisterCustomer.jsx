
import { useState } from "react";
import FormInput from '../../components/forms/FormInput'
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import useAuthStore from "../../store/useAuthStore";
import { signupCustomer } from "../../api/authApi";

const RegisterCustomer = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        city:"",
    });



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data being sent:", form);
        try {
            setLoading(true);
            const data = await signupCustomer(form);
            console.log("Response from server:", data);
            setLoading(false);

            if (data) {
                useAuthStore.getState().setUser(data);
                navigate("/login");
            }
            
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    return (
        <section className='flex justify-center items-center min-h-screen'>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-start bg-white mt-10 mb-5 md:min-w-2xl px-20 py-10 rounded-2xl'>
                <div className="mb-10">
                    <h2 className="font-extrabold text-5xl tracking-tight text-balance text-shadow-black text-shadow-2xs mb-2">Customer SignUp</h2>
                    <p className="text-[16px] font-bold text-neutral-400 tracking-tight text-balance">Join Auxizon to start your journey.</p>
                </div>

                <div className='flex flex-col justify-center items-center w-full'>
                    <FormInput
                        label="Full Name"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                    />

                    <FormInput
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <FormInput
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        placeholder="Enter phone number"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />

                    <div className="w-full flex flex-col justify-center gap-0 mb-5">
                        <FormInput
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="********"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="mb-0"
                        />
                        <p className="text-[12px] text-neutral-400 font-semibold">Must be atleast 8 characters long with a mix of letters and numbers</p>
                    </div>
                    

                    <FormInput
                        label="City"
                        name="city"
                        type="text"
                        placeholder="Enter city you live"
                        value={form.city}
                        onChange={handleChange}
                        required
                    />

                
                </div>

                <div className='flex flex-col justify-center items-center w-full mt-4'>
                    <Button type="submit" className="bg-primary py-6 text-[18px] rounded-full hover:cursor-pointer w-full mb-4 hover:bg-secondary shadow-derek hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        Create Account
                    </Button>

                    <span className="text-neutral-600 text-[12px]">Don't want to create account? <NavLink className="text-indigo-600 font-semibold hover:text-indigo-700" to="/"> Continue as guest</NavLink></span>
                </div>

            </form>
        </section>
    )
}

export default RegisterCustomer