import React from 'react'
import Container from '../Container'
import { Button } from '../ui/button'

const CategoryHeader = ({ category }) => {
    return (
        <Container className='flex justify-between gap-15 border-2 rounded-2xl shadow-derek h-85 my-10 pr-10 overflow-hidden bg-white'>
            <div className="h-85 w-180 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Category Image</span>
            </div>

            <div className='flex flex-col justify-center items-start'>
                <div className='my-3'>
                    <h2 className='capitalize font-bold text-7xl'>{category.name}</h2>
                </div>

                <div className='mb-5 pr-50 '>
                    <p className="text-xl text-gray-500">
                        {category.description}
                    </p>
                </div>

                <div className='my-2 w-full'>
                    <Button className='w-50 text-md hover:bg-secondary shadow-derek hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:cursor-pointer'>
                        Book a Provider
                    </Button>
                </div>
            </div>
        </Container>
    )
}

export default CategoryHeader