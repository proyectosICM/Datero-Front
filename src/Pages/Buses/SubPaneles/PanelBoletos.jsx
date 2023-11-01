import React from 'react'

export function PanelBoletos(){
    return(
      <div className="panel-boletos" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h5 style={{ textAlign: "center" }}>Conteo de Boletos</h5>
        <h5 style={{ textAlign: "center" }}>22/10/2023</h5>
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