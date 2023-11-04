import React from 'react'

export function PanelBoletos(){
    return(
      <div className="panel-boletos" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <p className='texto-titulo'>Conteo de Boletos</p>
        <p className='texto-titulo'>22/10/2023</p>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <h5>Zonal</h5>
          <h5>320</h5>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <h5>Interurbano</h5>
          <h5>480</h5>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <h5>Urbano</h5>
          <h5>125</h5>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <h5>Directo</h5>
          <h5>105</h5>
        </div>
      </div>

    );
}