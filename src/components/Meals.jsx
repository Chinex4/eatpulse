import React, { useState } from 'react'
import { useEffect } from 'react'
import Meal from './Meal';
import useHttp from '../hooks/useHttp';
import Error from './Error';

const requestConfig = {}

const Meals = () => {
    const {
        data: meals,
        isLoading,
        error 
    } = useHttp('http://localhost:4000/meals', requestConfig, [])


    if (isLoading) {
        return <p className='center'>Featching Meals...</p>
    }

    if (error) {
        return <Error title="Failed to fetch meals" message={error}/>
    }

    return (
        <ul id='meals'>
            {
                meals.map(meal => {
                    return (
                        <Meal key={meal.id} meal={meal} />
                    )
                })
            }
        </ul>
    )
}

export default Meals
