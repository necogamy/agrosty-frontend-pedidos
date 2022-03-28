import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

const contentSpacing = ' px-[5%]';

export default function Layout() {
  return (
    <div className='flex flex-col h-screen bg-[#F6F6F6]'>
      <Header />
      
      <main className='basis-[85%] flex flex-col justify-between'>
        <Outlet context={contentSpacing} />
      </main>

      <footer className={'flex basis-[5%] text-gray-500 justify-between my-4' + contentSpacing}>
        <p className='pl-4'>©2021</p>
        <p className='pr-3'>Políticas de Privacidad</p>
      </footer>
    </div>
  );
}