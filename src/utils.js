  
  // utilidades.js
export function formatearTiempo(valor) {
  const partes = valor.slice(1, -1).split(',');
  const dias = parseInt(partes[0]);
  const horas = parseInt(partes[1]);
  const minutos = parseInt(partes[2]);

  let resultado = '';

  if (dias > 0) {
    resultado += `${dias} day${dias > 1 ? 's' : ''} `;
  }

  if (horas > 0) {
    resultado += `${horas} hour${horas > 1 ? 's' : ''} `;
  }

  if (minutos > 0) {
    resultado += `${minutos} minutes${minutos > 1 ? 's' : ''}`;
  }

  return resultado.trim();
}