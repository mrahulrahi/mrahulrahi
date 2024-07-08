'use client'
import AOS from 'aos';
import { useEffect } from 'react';

const importAOS = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, [])
    return null;
}

export default importAOS