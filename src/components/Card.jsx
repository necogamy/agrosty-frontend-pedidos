import React from 'react';

export function Card({ title, subtitle }) {
    return (
        <article className='bg-white py-3 px-5 mt-2'>
            <h3 className='font-medium'>{title}</h3>
            <p>{subtitle}</p>
        </article>
    );
}
