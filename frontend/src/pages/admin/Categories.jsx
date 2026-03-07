import React, { useEffect, useState } from 'react'
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { Button } from '../../components/ui/button';
import { createCategoryApi } from '../../api/adminApi';
import { useAdminStore } from '../../store/useAdminStore';

const Categories = () => {
    const [form,setForm] = useState({name: '', description: ''});

    const [loading, setLoading] = useState(false);
    const { categories, categoriesLoading, loadCategories, createCategory } = useAdminStore();

    useEffect(() => {
        loadCategories();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("Form data being sent:", form);
        try {
            setLoading(true);
            await createCategory(form); 
            setLoading(false);
            setForm({name: '', description: ''});

        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

    return (
        <>
        <header>
            <h2>Categories</h2>

            <div>
                <form onSubmit = {handleSubmit}>
                    <FieldGroup className="w-full">
                        <Field>
                            <FieldLabel htmlFor="block-start-input">Category Name</FieldLabel>
                            <InputGroup className="h-auto">
                                <InputGroupInput
                                    id="block-start-input"
                                    name= "name"
                                    value={form.name}
                                    placeholder="Enter Category name"
                                    onChange = {handleChange}
                                />
                            </InputGroup>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="block-start-textarea">Category Description</FieldLabel>
                            <InputGroup>
                                <InputGroupTextarea
                                    id="block-start-textarea"
                                    placeholder="Add category Description"
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                />
                            </InputGroup>
                        </Field>
                    </FieldGroup>

                    <div>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Adding..." : "Add Category"}
                        </Button>
                    </div>
                </form>
            </div>
        </header>


            {/* Show all categories */}
            <div className="mt-8">
                <h3>Existing Categories:</h3>
                {categoriesLoading ? (
                    <p>Loading categories...</p>
                ) : categories.length === 0 ? (
                    <p>No categories found.</p>
                ) : (
                    <ul>
                        {categories.map(cat => (
                            <li key={cat._id}>
                                <strong>{cat.name}</strong> - {cat.description}
                            </li>
                        ))}
                    </ul>
                )}
            </div>



        </>   
    )
}

export default Categories