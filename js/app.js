//Variables globales
const formulario = document.querySelector('#cotizar-seguro');
const btnCotizar = document.querySelector('button[type=submit]');
const cargando = document.querySelector('#cargando');
const resultado = document.querySelector('#resultado');

//Eventos
eventListeners();
function eventListeners(){
    formulario.addEventListener('submit', cotizarSeguro);
    document.addEventListener('DOMContentLoaded', mostrarYears);
}

//Funciones constructoras
function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = Number(year);
    this.tipo = tipo;
}
Seguro.prototype.calcularTotal = function(){
    //Dependiendo la marca
    let cantidad;
    const base = 2000;
    switch(this.marca){
        case 'Americano':
            cantidad = base * 1.05;
            break;
        case 'Asiatico':
            cantidad = base * 1.15;
            break;
        case 'Europeo':
            cantidad = base * 1.35;
            break;
    }

    //Dependiendo el year
        //Cada año que pasa decrementa un 3%
    const max = new Date().getFullYear();
    const diferencia = max - this.year;
    cantidad *= Math.pow(0.97, diferencia);

    //Dependiendo el tipo
    if(this.tipo === 'basico'){
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;
    }

    return cantidad.toFixed(2);
}

function UI(){};
UI.prototype.mostrarAlerta = function(mensaje, query){
    //Limpiar alerta
    limpiarAlerta();

    //Crear alerta
    const p = document.createElement('p');
    p.textContent = mensaje;
    p.classList.add('alerta');

    if(query === 'error'){
        p.classList.add('error');
    }else{
        p.classList.add('correcto');
    }

    //Agregar alerta
    formulario.insertBefore(p, resultado);

    //Borrar alerta
    setTimeout(() => {
        p.remove();
    }, 3000);
}
UI.prototype.mostrarHTML = function(objeto, total){
    //Limpiar Seguro
    limpiarSeguro();

    //Crear seguro
    const div = document.createElement('div');
    div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Marca: <span class="font-normal">${objeto.marca}</span></p>
        <p class="font-bold">Año: <span class="font-normal">${objeto.year}</span></p>
        <p class="font-bold">Tipo: <span class="font-normal">${objeto.tipo}</span></p>
        <p class="font-bold">Total: <span class="font-normal">$${total}</span></p>
    `;

    //Spinner de cargando
    cargando.classList.remove('hidden');

    //Desactivar btnCotizar
    btnCotizar.disabled = true;

    //Mostrar en el HTML
    setTimeout(() => {
        //Reset
        formulario.reset();
        //Quitar spinner
        cargando.classList.add('hidden');
        //Activar btnCotizar
        btnCotizar.disabled = false;
        resultado.appendChild(div);
    }, 3000);
}


//Instanciar UI y declarar seguro
const ui = new UI();
let seguro;

//Funciones
function mostrarYears(){
    const year = document.querySelector('#year');
    const max = new Date().getFullYear();
    const min = max - 20;

    const select = document.createElement('option');
    select.textContent = '- Seleccionar -';
    select.value = '';
    year.appendChild(select);
    for(let i = max; i >= min; i--){
        const option = document.createElement('option');
        option.textContent = i;
        year.appendChild(option);
    }
}
function cotizarSeguro(e){
    e.preventDefault();

    const marca = document.querySelector('#marca').value;
    const year  = document.querySelector('#year').value;
    const tipo = document.querySelector('input[type=radio]:checked').value;

    //Validar campos vacíos
    if(marca === '' || year === '' || tipo === ''){
        ui.mostrarAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    //AQUÍ YA PASÓ LAS VALIDACIONES

    //Mostrar mensaje de cotizando
    ui.mostrarAlerta('Cotizando...', 'correcto');

    //Instanciar Seguro
    seguro = new Seguro(marca, year, tipo);

    //Calcular total
    const total = seguro.calcularTotal();

    //Mostrar en el HTML
    ui.mostrarHTML(seguro, total);
}

function limpiarAlerta(){
    const alerta = formulario.querySelector('.alerta');
    if(alerta){
        alerta.remove();
    }
}
function limpiarSeguro(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}