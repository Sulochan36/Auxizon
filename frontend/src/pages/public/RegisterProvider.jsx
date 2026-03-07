import React, { useEffect, useState } from 'react'
import FormInput from '../../components/forms/FormInput'
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { signupProvider } from '../../api/authApi';
import useAuthStore from '../../store/useAuthStore';
import { useAdminStore } from '../../store/useAdminStore';

const RegisterProvider = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        city: "",
        categoryId: "",
        experienceYears: "",
        bio: "",
        basePrice: "",
        serviceAreas: "",
        governmentIdNumber: "",
    });
    
    const { categories, loadCategories } = useAdminStore();
    useEffect(() => {
        loadCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            serviceAreas: form.serviceAreas
                ? form.serviceAreas.split(",").map(a => a.trim())
                : []
        };
        console.log("Provider Form data being sent:", form);
        try {
            setLoading(true);
            const data = await signupProvider(payload);
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
                    <p>Join Auxizon to start your journey.</p>
                </div>

                <div className='flex flex-col justify-center items-center'>
                    <>
                        {/* User Fields */}
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
                            placeholder="Enter your phone number"
                            value={form.phone}
                            onChange={handleChange}
                            required
                        />

                        <FormInput
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />

                        <FormInput
                            label="City"
                            name="city"
                            placeholder="Enter your city"
                            value={form.city}
                            onChange={handleChange}
                            required
                        />

                        {/* Provider-Specific Fields */}
                        {/* <FormInput
                            label="Category"
                            name="categoryId"
                            placeholder="Select your service category"
                            value={form.categoryId}
                            onChange={handleChange}
                            required
                        /> */}

                        <div className="w-full mb-4">
                            <label className="block mb-1">Category</label>

                            <select
                                name="categoryId"
                                value={form.categoryId}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                required
                            >
                                <option value="">Select Category</option>

                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <FormInput
                            label="Experience (Years)"
                            name="experienceYears"
                            type="number"
                            placeholder="Enter your experience in years"
                            value={form.experienceYears}
                            onChange={handleChange}
                            required
                        />

                        <FormInput
                            label="Bio"
                            name="bio"
                            placeholder="Write a short bio"
                            value={form.bio}
                            onChange={handleChange}
                        />

                        <FormInput
                            label="Base Price"
                            name="basePrice"
                            type="number"
                            placeholder="Enter your base service price"
                            value={form.basePrice}
                            onChange={handleChange}
                            required
                        />

                        <FormInput
                            label="Service Areas"
                            name="serviceAreas"
                            placeholder="Enter service areas (comma separated)"
                            value={form.serviceAreas}
                            onChange={handleChange}
                        />

                        <FormInput
                            label="Government ID Number"
                            name="governmentIdNumber"
                            placeholder="Enter your government ID number"
                            value={form.governmentIdNumber}
                            onChange={handleChange}
                            required
                        />

                        {/* <FormInput
                            label="Upload ID Proof"
                            name="idProofImage"
                            type="file"
                            placeholder="Upload your ID proof"
                            // onChange={handleFileChange}
                            // required
                        />

                        <FormInput
                            label="Work Samples"
                            name="workSamples"
                            type="file"
                            placeholder="Upload your work samples"
                            // onChange={handleMultipleFilesChange}
                            // multiple
                        /> */}
                    </>
                </div>

                <div className='flex flex-col justify-center items-center w-full'>
                    <Button disabled={loading} type="submit" className="bg-primary py-6 text-[18px] rounded-full hover:cursor-pointer w-full mb-4 hover:bg-secondary shadow-derek">
                        
                            {loading ? "Registering..." : "Submit"}
                        
                    </Button>

                    <span>Already have an account? <NavLink className="text-indigo-600 font-semibold hover:text-indigo-700" to="/signup"> Login</NavLink></span>
                </div>

            </form>
        </section>
    )
    
}

export default RegisterProvider