export const textos = {
    buscarCamion: {
        html: {
            titulo: 'Número de carta o patente',
            btnBuscar: 'Buscar'
        },
        noHayCartas: {
            titulo: 'Informacion',
            descripcion: `No se encontró ninguna carta en la posición de hoy con ese nro de carta o esa patente`,
        },
        unauthorized: {
            titulo: 'Informacion',
            descripcion: 'El número de carta (o patente) ingresados no existen',
        }
    },
    buscarCarta: {
        html: {
            titulo: 'Número de carta o patente',
            btnBuscar: 'Buscar',
            tipPatente: 'Para cambiar las fechas presiona sobre ellas',
            tipNroCarta: 'El número de carta debe ingresarse sin prefijo'
        },
        noHayCartas: {
            titulo: 'Informacion',
            descripcion: {
                nroCarta: 'No se encontró ninguna carta, verifique el número ingresado',
                patente: 'No se encontró ninguna carta, pruebe ampliar el intervalo de fechas'
            }
        },
        timeOutError: {
            titulo: 'Informacion',
            descripcion: 'La búsqueda está demorando demasiado. Si está buscando por patente, intente acortar el intervalo de fechas.',
        },
        unauthorized: {
            titulo: 'Informacion',
            descripcion: 'El número de carta (o patente) ingresados no existen',
        }
    },
    login: {
        html: {
            titulo: 'Iniciar Sesion',
            btnIngresar: 'Ingresar',
            btnIngresarCamionero: '¿Sos camionero? Ingresá acá',
            cerealnet: {
                nombre: 'MartinoEntregas.com ® ',
                mail: 'E-Mail : martino@martinoycia.com.ar',
                direccion: 'Córdoba 1365, S2000AWS Rosario, Santa Fe',
                telefono: '+54 (341) 4405504'
            }
        },
        usuarioDesconocido: {
            titulo: 'Usuario desconocido',
            descripcion: 'El usuario ingresado no existe'
        },
        marcaCambioInvalida: {
            titulo: 'Contraseña incorrecta',
            descripcion: 'La contraseña ingresada no corresponde al usuario'
        },
        errorServidor: {
            titulo: 'Error de servidor',
            descripcion: 'Problema de conexión, intente en unos segundos'
        },
        errorLogueo: {
            titulo: 'Error de logueo'
        }
    },
    posicionDia: {
        html: {
            nadaEnPosicion: 'No tiene camiones en posición',
            nadaEnBusqueda: 'No se encontró ninguna carta, pruebe con otra búsqueda',
            btnAccion: {
                desvio: 'Desviar',
                autorizacion: 'Autorizar',
                llamado: 'Solicitar Llamado',
                revision: 'Revision'
            }
        },
        unauthorized: {
            titulo: 'Informacion',
            descripcion: 'El número de carta (o patente) ingresados no existen',
        },
        solicitarAccion: {
            titulo: 'Aviso',
            descripcion: '¿Desea confirmar la acción seleccionada?',
            error: {
                titulo: 'Informacion',
                descripcion: 'Hubo un problema y no se pudo completar la accion'
            }
        },
        solicitarLlamado: {
            titulo: 'Aviso',
            descripcion: '¿Desea que el entregador lo llame?',
            error: {
                titulo: 'Informacion',
                descripcion: 'Hubo un problema, quizás su celular no se encuentra registrado en el sistema'
            }
        },
        solicitarDesvio: {
          titulo: 'Aviso',
          descripcion: '¿Desea desviar el camión?',
          error: {
              titulo: 'Informacion',
              descripcion: 'Hubo un problema, quizás su celular no se encuentra registrado en el sistema'
          }
      },
      solicitarAutorizar: {
        titulo: 'Aviso',
        descripcion: '¿Desea autorizar el camión?',
        error: {
            titulo: 'Informacion',
            descripcion: 'Hubo un problema, quizás su celular no se encuentra registrado en el sistema'
        }
    }
    },
    registerCamionero: {
        html: {
            titulo: 'Ingrese sus datos',
            info: 'Debe ingresar estos datos sólo esta vez. Luego su celular los recordará y ya no será necesario.'
        }
    },
    erroresGenericos: {
        timeOutError: {
            titulo: 'Informacion',
            descripcion: 'Problema de conexión, intente en unos segundos',
        }
    },
    errorNoRespondeEnPoint: {
      timeOutError: {
        titulo: 'Error de conección',
        descripcion:   "Ocurrio un error inesperado, inténte nuevamente más tarde o reingrese nuevamente, sepa disculplar las molestias ocasionadas."

      }
    },

    mensajeContacteConEntregador: {
      titulo: 'ATENCION !',
      descripcion: 'Si tiene algún problema o consulta, no dude en contactarnos para ofrecerle una solución integral a sus necesidades.',

    }
}
