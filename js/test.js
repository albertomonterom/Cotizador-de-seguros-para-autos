//Variables globales
const formulario = document.querySelector('#cotizar-seguro');
const cargando = document.querySelector('#cargando');
const resultado = document.querySelector('#resultado');
const btnCotizar = document.querySelector('button[type=submit]');

//Funciones constructoras
function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = Number(year);
    this.tipo = tipo;
}
Seguro.prototype.calcularTotal = function(){
    let cantidad;
    const base = 2000;
    //Dependiendo la marca
    switch(this.marca){
        case 'Americano':
            cantidad = base * 1.05;
            break;
        case 'Asiatico':
            cantidad = base * 1.15;
        case 'Europeo':
            cantidad = base * 1.35;
            break;
    }

    //Dependiendo el año
        //Cada año va a decrementar un 3% del total
        const max = new Date().getFullYear();
        const diferencia = max - this.year;

    cantidad *= Math.pow(0.97, diferencia);


    //Dependiendo el tipo
    if(this.tipo === 'basico'){
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;
    }//Variables globales
const formulario = document.querySelector('#cotizar-seguro');
const resultado = document.querySelector('#resultado');
const cargando = document.querySelector('#cargando');
const btnCotizar = document.querySelector('button[type=submit]');

//Eventos
eventListeners();
function eventListeners(){
    //Mostrar year en el select
    document.addEventListener('DOMContentLoaded', mostrarYears);
    //Submit al formulario
    formulario.addEventListener('submit', agregarSeguro);
}

//Funciones constructoras
function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = Number(year);
    this.tipo = tipo;
}
Seguro.prototype.calcularTotal = function(){
    let cantidad;
    const base = 2000;
    switch(this.marca){
        case 'Asiatico':
            cantidad = base * 1.15;
            break;
        case 'Americano':
            cantidad = base * 1.05;
            break;
        case 'Europeo':
            cantidad = base * 1.35;
            break;
    }

    //Cada año decrementa un 3% sobre la cantidad
    const max = new Date().getFullYear();
    const diferencia = max - this.year;

    cantidad *= Math.pow(0.97, diferencia);

    //Dependiendo el tipo
    if(this.tipo === 'basico'){
        cantidad *= 1.35;
    }else{
        cantidad *= 1.50;
    }

    return Math.trunc(cantidad);
    
}

function UI(){}
UI.prototype.mostrarAlerta = function(mensaje, query){
    //Limpiar alerta
    limpiarAlerta();

    //Crear alerta
    const p = document.createElement('p');
    p.classList.add('alerta');
    p.textContent = mensaje;
    if(query === 'error'){
        p.classList.add('error');
    }else{
        p.classList.add('correcto');
    }

    //Insertar en el HTML
    formulario.insertBefore(p, document.querySelector('#resultado'));

    //Borrar después de tres segundos
    setTimeout(() => {
        p.remove();
    }, 3000);
}
UI.prototype.mostrarHTML = function(objeto, total){
    //Crear div
    const div = document.createElement('div');
    div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Marca: <span class="font-normal">${objeto.marca}</span></p>
        <p class="font-bold">Año: <span class="font-normal">${objeto.year}</span></p>
        <p class="font-bold">Tipo: <span class="font-normal">${objeto.tipo}</span></p>
        <p class="font-bold">Total: <span class="font-normal">$${total}</span></p>
    `;

    //Insertar spin de cargando
    cargando.classList.remove('hidden');

    //Desactivar btnCotizar
    btnCotizar.disabled = true;

    //Insertar div después de tres segundos
    setTimeout(() => {
        //Activar btnCotizar
        btnCotizar.disabled = false;
        //Agregar clase hidden
        cargando.classList.add('hidden');
        //Insertar div
        resultado.appendChild(div);
        //Resetear formulario
        formulario.reset();
    }, 3000);
}

//Instanciar UI
const ui = new UI();


//Funciones
function mostrarYears(){
    const year = document.querySelector('#year');

    const max = new Date().getFullYear();
    const min = max - 20;

    const select = document.createElement('option');
    select.textContent = '- Seleccionar -';
    select.value = '';
    year.appendChild(select);

    for(let i = max; i >= min; i --){
        const option = document.createElement('option');
        option.textContent = i;
        year.appendChild(option);
    }
}
function agregarSeguro(e){
    e.preventDefault();
    const marca = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const tipo = document.querySelector('input[type=radio]:checked').value;
    //Validar campos vacíos
    if(marca === '' || year === '' || tipo === ''){
        ui.mostrarAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    //AQUÍ YA PASÓ LA VALIDACIÓN
    
    //Limpiar HTML
    limpiarHTML();

    //Mostrar mensaje de agregando
    ui.mostrarAlerta('Agregando...', 'correcto');

    //Crear instancia seguro
    const seguro = new Seguro(marca, year, tipo);

    //Calcular total
    const total = seguro.calcularTotal();

    //Mostrar en el HTML
    ui.mostrarHTML(seguro, total);
}
function limpiarAlerta(){
    const alerta = document.querySelector('.alerta');
    if(alerta){
        alerta.remove();
    }
}
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

    return Math.trunc(cantidad);
}


function UI(){};
UI.prototype.mostrarMensaje = function(mensaje, query){
    this.limpiarMensaje();
    const p = document.createElement('p');
    p.classList.add('mensaje');
    p.textContent = mensaje;
    if(query === 'error'){
        p.classList.add('error');
        formulario.appendChild(p);
        setTimeout(() => {
            p.remove();
        }, 3000);
    }else{
        //Desactivar botón
        btnCotizar.disabled = true;
        //Agregar spinner
        cargando.classList.remove('hidden');
        //Agregar mensaje
        p.classList.add('correcto');
        formulario.insertBefore(p, resultado);
        setTimeout(() => {
            //Activar botón
            btnCotizar.disabled = false;
            //Remover spinner
            cargando.classList.add('hidden');
            //Remover mensaje
            p.remove();
        }, 3000);
    }
}
UI.prototype.mostrarHTML = function(objeto, total){
    setTimeout(() => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p class="header">Tu Resumen</p>
            <p class="font-bold">Marca: <span class="font-normal">${objeto.marca}</span></p>
            <p class="font-bold">Año: <span class="font-normal">${objeto.year}</span></p>
            <p class="font-bold">Tipo: <span class="font-normal">${objeto.tipo}</span></p>
            <p class="font-bold">Total: <span class="font-normal">$${total}</span></p>
        `;
        resultado.appendChild(div);
    }, 3000);
}
UI.prototype.limpiarMensaje = function(){
    const mensaje = document.querySelector('.mensaje');
    if(mensaje){
        mensaje.remove();
    }
}

//Instanciar
const ui = new UI();

//Eventos
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', mostrarYears);
    formulario.addEventListener('submit', agregarSeguro);
}

//Funciones
function mostrarYears(){
    const year = document.querySelector('#year');
    const max = new Date().getFullYear();
    const min = max - 20;
    const select = document.createElement('option');
    select.value = '';
    select.textContent = '- Seleccionar -';
    year.appendChild(select);
    for(let i = max; i >= min; i--){
        const option = document.createElement('option');
        option.textContent = i;
        year.appendChild(option);
    }
}
function agregarSeguro(e){
    e.preventDefault();
    const marca = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const tipo = document.querySelector('input[type=radio]:checked').value;
    //Validar campos vacíos
    if(marca === '' || year === '' || tipo === ''){
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }

    //AQUÍ YA PASÓ LAS VALIDACIONES
        //Limpiar
        resultado.innerHTML = '';

        //Crear la instancia seguro
        const seguro = new Seguro(marca, year, tipo);
        //Calcular total
        const total = seguro.calcularTotal();

        //Mostrar mensaje de cotizando
        ui.mostrarMensaje('Cotizando', 'correcto');

        //Mostrar HTML
        ui.mostrarHTML(seguro, total);
}