import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function Orders() {
  return (
    <section className='flex items-center justify-center w-full h-full flex-col'>
      <h2 className='font-medium mb-4'>Pedidos</h2>
      <ul className='flex flex-col gap-2'>
        <li><Link to='/pedidos/12'>12</Link></li>
        <li><Link to='/pedidos/28'>28</Link></li>
        <li><Link to='/pedidos/29'>29</Link></li>
        <li><Link to='/pedidos/30'>30</Link></li>
        <li><Link to='/pedidos/37'>37</Link></li>
      </ul>
    </section>
  );
}
