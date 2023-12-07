import React from 'react';

import ManufacturerProductForm from './ManufacturerProductForm/ManufacturerProductForm';
import Preloader from '../Preloader/Preloader';

import './Manufacturer.css';

function Manufacturer(props) {

  return (
    <section className='manufacturer'>
      <h2 className='manufacturer__title'>Товары производителя</h2>
      {props.isLoadingRecomendations
        ? <Preloader />
        : <ManufacturerProductForm
          onComparePosition={props.onComparePosition}
          onNotComparePosition={props.onNotComparePosition}
          onPostonePosition={props.onPostonePosition}
          recommendation={props.recommendation}
          popup={props.popup}
          error={props.error}
          />}
    </section>
  )
};

export default Manufacturer;
