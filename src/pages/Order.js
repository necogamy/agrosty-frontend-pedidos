import React, { Fragment, useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { useOutletContext, useParams, useNavigate } from 'react-router-dom';
import { fetchOrder } from '../services/fetchOrder';
import { Loading } from '../components/Loading';
import { faCheckDouble, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { dateParser } from '../utils/dateParser';

export default function Order() {
  const contentSpacing = useOutletContext();
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [orderInfo, setOrderInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrder(orderId)
      .then(res => res.json())
      .then(json => {
        if (json.code === 401 || json.code === 404) navigate('/error');

        const parsedEstado = json.estado === 'entregado' ? 'Entregado'
          : json.estado === 'encurso' ? 'En curso'
          : json.estado === 'pendiente' ? 'Pendiente'
          : null;

        const color = json.estado === 'entregado' ? 'bg-blue-700'
          : json.estado === 'encurso' ? 'bg-green-600'
          : json.estado === 'pendiente' ? 'bg-gray-700'
          : null;

        let entregaTime = dateParser(json.entrega_estimada_el);
        entregaTime = `${entregaTime.parsedDate}, a la ${entregaTime.atDay}`;

        let despachadoTime = dateParser(json.transporte.despachado_el);
        despachadoTime = `${despachadoTime.parsedDate} a las ${despachadoTime.parsedTime}`;

        setOrderInfo({
          nRemito: json.numero_remito,
          nTransporte: json.transporte.codigo,
          nEntrega: json.codigo,
          detalle: json.detalle,
          parsedEstado,
          estado: json.estado,
          cliente: json.cliente.nombre,
          destinatario: json.destinatario.nombre,
          distribuidor: json.distribuidor.nombre,
          despachado: despachadoTime,
          entregaEstimada: {
            lugar: json.destinatario.direccion,
            hora: entregaTime
          },
          color
        });
      })
      .catch(err => {
        console.error(err);
        navigate('/error');
      })
      .finally(() => setIsLoading(false));
  }, [ orderId ]);

  const styles = {
    header: `${orderInfo.color} flex justify-between text-white py-2 ${contentSpacing}`,
    section: 'flex gap-8 h-[80%]' + contentSpacing,
    sectionTwo: '' + contentSpacing
  }

  return isLoading ? <Loading /> : (
    <Fragment>
      <header className={styles.header}>
        <h2>{orderInfo.parsedEstado}</h2>
        <h2>Nº Transporte {orderInfo.nTransporte}</h2>
      </header>

      <section className={styles.section}>
        <section className='w-[20%]'>
          <h2 className='font-medium my-4'>Nº Entrega {orderInfo.nEntrega}</h2>
          <Card title='Distribuidor:' subtitle={orderInfo.distribuidor} />
          <Card title='Destinatario' subtitle={orderInfo.destinatario} />
          <Card title='Cliente' subtitle={orderInfo.cliente} />
          <Card title='Nº de Remito' subtitle={orderInfo.nRemito} />
        </section>

        <section className='overflow-hidden relative w-full h-full'>
          <h2 className='font-medium my-4'>Artículos</h2>
          <table className='absolute overflow-y-scroll block h-full w-full'>
            <thead className='flex justify-between gap-1'>
              <tr className='w-full flex gap-1'>
                <th className='text-left w-full p-2 bg-white'>Descripcion</th>
                <th className='w-full p-2 bg-white'>Cantidad</th>
                <th className='w-full p-2 bg-white'>Lote</th>
              </tr>
            </thead>
            <tbody className='flex justify-between flex-col gap-1'>
              {
                orderInfo?.detalle?.map((item, counter) => {
                  const ownStyle = (counter + 1) % 2 === 1 ? 'bg-[#F9F9F9]' : 'bg-[#FFFFFF]';

                  return (
                    <tr key={counter + 1} className={'flex gap-1 ' + ownStyle}>
                      <td className='p-2 w-full'>{item.material_descripcion}</td>
                      <td className='p-2 w-full text-center'>{item.cantidad}</td>
                      <td className='p-2 w-full text-center'>{item.lote}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </section>
      </section>

      <section className={styles.sectionTwo}>
        <hr />
        <section className='flex justify-between items-center'>
          <section className='flex my-6'>
            <article className='flex items-baseline basis-[50%] mr-6'>
              <FontAwesomeIcon className='h-6 pr-2' icon={faCheckDouble} />
              <section>
                <h3 className='font-medium'>Despacho</h3>
                <p>Su pedido fue correctamente despachado el {orderInfo.despachado}</p>
              </section>
            </article>
            <article className='flex items-baseline basis-[50%]'>
              <FontAwesomeIcon className='h-6 pr-2' icon={faClock} />
              <section>
                <h3 className='font-medium'>Entrega Estimada</h3>
                <p>{orderInfo.entregaEstimada.lugar}</p>
                <p>{orderInfo.entregaEstimada.hora}</p>
              </section>
            </article>
          </section>
          <button className='text-white bg-[#06936E] px-6 py-2 rounded-lg'>Dejar mensaje</button>
        </section>
        <hr />
      </section>
    </Fragment>
  );
}
