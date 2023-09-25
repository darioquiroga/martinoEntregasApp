export const estadosCartaPosicion = {
    Ingreso: 1,
    Demorado: 2,
    Rechazo: 3,
    Desviado: 4,
    Descargado: 5,
    A_Descargar: 6,
    Autorizado: 7,
    Descargado_Pendiente: 8,
    Pendiente_Desvio: 9,
    Pendiente_Autorizacion: 10
}


export const estadosCartaPosicionPuertos = {
    Demorado: 2,
    Descargado: 5,
    Rechazado: 3,
    Desviado: 4,
    Calado: 1,
    Autorizado: 7,
    Laboratorio: 6,
    Gerencia: 11,
    Rec_Oficial: 8,
    Entrega_Autorizado: 9,
    Entrega_Desviado: 10
}

// Estados de las cartas (solo en los puertos) (sería estado_posi de la tabla PORTE)
export const estadosEnPuertos = {
    POSICION: 0,
    DEMORADO: 1,
    A_DESCARGAR: 2,
    CALADO: 3,
    AUTORIZADO: 4,
    LABORATORIO: 5,
    GERENCIA: 6,
    DESVIO: 7,
    REC_OFICIAL: 8,
    CONSULTA: 9,
    ENTREGA_AUTORIZADO: 10,
    ENTREGA_DESVIADO: 11
}



// export const estadosCartaPosicionPuertos = {
//     Posicion: 0,
//     Demorado: 1,
//     A_Descargar: 2,
//     Calado: 3,
//     Autorizado: 4,
//     Laboratorio: 5,
//     Gerencia: 6,
//     Desvio: 7,
//     Rec_Oficial: 8,
//     Consulta: 9,
//     Entrega_Autorizado: 10,
//     Entrega_Desviado: 11
// }


// idEstadoPuerto === 1 ? 2 :  // Demorado      |       Demorado
//         idEstadoPuerto === 2 ? 6 :  // A Descargar   |       A Descargar
//         idEstadoPuerto === 4 ? 7 :  // Autorizado
//         idEstadoPuerto === 7 ? 4 :  // Desvio/Desviado
//         idEstadoPuerto === 10 ? 1 : // Pendiente Autorizacion | Entrega Autorizado
//         idEstadoPuerto === 11 ? 9 : // Pendiente Desvio| Entrega Desvio
//         1                           // Posicion para todo el resto







// -1 -> Cualquier estado
// Estados condicionados por porteEstado: Descargado, Rechazado, Desviado. El resto es equivalente a la tabla 'estado_posi' de la sybase de puertos
    // Descargado: {
    //     porteEstado: 4,
    //     estado: -1
    // },
    // Rechazado: {
    //     porteEstado: 5,
    //     estado: 0
    // },
    // Desviado: {
    //     porteEstado: 5,
    //     estado: 7,
    //     fechaAut: new Date
    // },
    // Posicion: 0,
    // Demorado: 1,
    // A_Descargar: 2,
    // Calado: 3,
    // Autorizado: 4,
    // Laboratorio: 5,
    // Gerencia: 6,
    // // Desvio: 7,
    // Rec_Oficial: 8,
    // Consulta: 9,
    // Entrega_Autorizado: 10,
    // Entrega_Desviado: 11
