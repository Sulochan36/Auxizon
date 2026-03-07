
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
        <section className='flex justify-center items-center'>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items start w-full'>
                <div>
                    <h2>Create Account</h2>
                    <p>Join Auxiaon to start your journey.</p>
                </div>

                <div className='flex flex-col justify-center items-center'>
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
                    />

                    <FormInput
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

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

                <div className='flex flex-col justify-center items-center w-full'>
                    <Button type="submit" className="bg-primary py-6 text-[18px] rounded-full hover:cursor-pointer w-full mb-4 hover:bg-secondary shadow-derek">
                        Submit
                    </Button>

                    <span>Already have an account? <NavLink className="text-indigo-600 font-semibold hover:text-indigo-700" to="/signup"> Login</NavLink></span>
                </div>

            </form>
        </section>
    )
}

export default RegisterCustomer