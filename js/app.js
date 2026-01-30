//===========
//SELECTORES
//===========
const formulario = document.querySelector('#formulario-cita');
const primerBloque = document.querySelector('#primerBloque');
const segundoBloque = document.querySelector('#citas');
//=======
//CLASES
//=======
class Cita {
    constructor(data) {
        this.id = data.id;
        this.paciente = data.paciente;
        this.propietario = data.propietario;
        this.email = data.email;
        this.fecha = data.fecha;
        this.sintomas = data.sintomas;
    }
}

class GestionarCita {
    constructor() {
        this.citasArray = [];
    }

    nuevaCita(citaObj) {
        const nuevaCita = new Cita(citaObj);
        this.citasArray = [...this.citasArray, nuevaCita];
    }
    eliminar(id) {
        this.citasArray = this.citasArray.filter(cita => cita.id !== id);
    }
    editar(citaActualizada) {
        /** ---------------- NOTA SOBRE map() para mi ----------------
        map() recorre el array y devuelve un NUEVO array del mismo tamaño.
        En cada posición decidimos qué elemento va:
        - Si el id de la cita actual coincide con el id de la cita actualizada,
        se reemplaza por la nueva información (citaActualizada).
        - Si no coincide, se mantiene la cita original sin cambios.
        El resultado final es un array igual al anterior,
        pero con la cita editada reemplazada correctamente. */
        this.citasArray = this.citasArray.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
        console.log(this.citasArray);
    }
}

class UI {
    limpiarLista() {
        while (segundoBloque.firstChild) {
            segundoBloque.removeChild(segundoBloque.firstChild);
        }
    }

    limpiarFormulario() {
        formulario.reset();
    }

    listaVacia(citasArray) {
        if (citasArray.length === 0) {
            segundoBloque.innerHTML = '<p class="text-xl mt-5 mb-10 text-center">No Hay Pacientes</p>'
            return
        }
    }

    alerta(tipo, mensaje) {
        const alerta = document.querySelector('.alerta')
        if (alerta != null) {
            alerta.remove();
        }
        const div = document.createElement('div');
        div.classList.add('text-center', 'w-full', 'p-3', 'text-white', 'my-5', 'alert', 'uppercase', 'font-bold', 'text-sm', 'alerta');
        if (tipo == 'error') {
            div.classList.add('bg-red-500');
            div.textContent = mensaje;
        } else {
            div.classList.add('bg-green-500');
            div.textContent = mensaje;
        }
        primerBloque.insertBefore(div, formulario);
        setTimeout(() => {
            div.remove();
        }, 3000);
    }

    pintarCita(citaClase) {

        this.limpiarLista();

        citaClase.forEach(data => {
            const { id, paciente, propietario, email, fecha, sintomas } = data;

            const divCita = document.createElement('div');
            divCita.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10', 'rounded-xl', 'p-3');
            divCita.innerHTML = `
            <p><span class="font-bold uppercase">paciente: </span>${paciente}</p>
            <p><span class="font-bold uppercase">propietario: </span>${propietario}</p>
            <p><span class="font-bold uppercase">e-mail: </span>${email}</p>
            <p><span class="font-bold uppercase">fecha: </span>${fecha}</p>
            <p><span class="font-bold uppercase">síntomas: </span>${sintomas}</p>`;

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2', 'btn-editar');
            btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';
            const clone = structuredClone(data);
            btnEditar.onclick = () => editarCita(clone);

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
            btnEliminar.onclick = () => eliminarCita(id);

            const divBotones = document.createElement('div');
            divBotones.classList.add('flex', 'justify-between', 'mt-10');
            divBotones.appendChild(btnEditar);
            divBotones.appendChild(btnEliminar);

            divCita.appendChild(divBotones);
            segundoBloque.appendChild(divCita);
        });
    }
}
//en el requerimiento de este proyecto no indica que se aplique localstorage pero por mi cuenta lo estoy aplicando esto recien lo hare una vez termine todos los requeriminetos originales solicitados en clase
class Storage { }

//============
//ITERACIONES
//============
const ui = new UI();
const gestion = new GestionarCita();
let editandoId = null;

//========
//EVENTOS
//========
document.addEventListener('DOMContentLoaded', () => {
    formulario.addEventListener('submit', validarcampos);
    ui.listaVacia(gestion.citasArray);
})

//==========
//FUNCIONES
//==========
function validarcampos(e) {
    e.preventDefault();
    const inputPaciente = document.querySelector('#paciente').value.trim();
    const inputPropietario = document.querySelector('#propietario').value.trim();
    const inputEmail = document.querySelector('#email').value.trim();
    const inputFecha = document.querySelector('#fecha').value;
    const inputSintomas = document.querySelector('#sintomas').value.trim();

    if (inputPaciente == '' || inputPropietario == '' || inputEmail == '' || inputFecha == '' || inputSintomas == '') {
        ui.alerta('error', 'todo los campos son obligatorios');
        return;
    }

    const citaObj = {
        id: editandoId ?? agregarID(),
        paciente: inputPaciente,
        propietario: inputPropietario,
        email: inputEmail,
        fecha: inputFecha,
        sintomas: inputSintomas
    }

    if (editandoId) {
        //editar
        gestion.editar(citaObj);
        ui.alerta('correcto', 'Paciente Actualizado');
        editandoId = null;
        const formularioValue = document.querySelector('#formulario-cita [type="submit"]');
        formularioValue.value = 'Registrar Paciente';
    } else {
        //crear
        gestion.nuevaCita(citaObj);
        ui.alerta('correcto', 'Paciente Registrado');
    }

    ui.pintarCita(gestion.citasArray);
    ui.listaVacia(gestion.citasArray);
    ui.limpiarFormulario();
}

function agregarID() {
    //estructura del id:
    //nombre del registro = CIT
    //cuerpo unico = 548548 (numero aleatorio ascendente de 6 digitos)
    //año actual del registro = 2026
    //formato del id: CIT-548547-2026
    const nombre = 'CIT';

    const generarNumeroUnico6Digitos = (function () {
        let ultimoNumero = null;
        const MIN = 100000;
        const MAX = 999999;

        return function () {
            let nuevoNumero;
            // Bucle para asegurar que el nuevo número sea diferente al último
            do {
                // Genera un número entre 100000 y 999999 (ambos inclusive)
                nuevoNumero = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
            } while (nuevoNumero === ultimoNumero);

            // Almacena el número actual para la próxima llamada
            ultimoNumero = nuevoNumero;
            return nuevoNumero;
        };
    })();

    const fecha = new Date();
    const año = fecha.getFullYear().toString();

    const cuerpoID = `${nombre}-${generarNumeroUnico6Digitos()}-${año}`
    return cuerpoID;
}

function eliminarCita(id) {
    //limpiar formulario en caso se elimine una cita que se esta editando
    if (editandoId === id) {
        editandoId = null;
        const btnSubmit = document.querySelector('#formulario-cita [type="submit"]');
        btnSubmit.value = 'Registrar Paciente';
        ui.limpiarFormulario();
    }
    gestion.eliminar(id);
    ui.pintarCita(gestion.citasArray);
    ui.listaVacia(gestion.citasArray);
}

function editarCita(clone) {
    //asignamos el id acutal a editar
    editandoId = clone.id;
    //cambiamos el value del boton para la interfaz editar
    const btnSubmit = document.querySelector('#formulario-cita [type="submit"]');
    btnSubmit.value = 'Guardar Cambios';
    //rellenamos los datos del formulario
    document.querySelector('#paciente').value = clone.paciente;
    document.querySelector('#propietario').value = clone.propietario;
    document.querySelector('#email').value = clone.email;
    document.querySelector('#fecha').value = clone.fecha;
    document.querySelector('#sintomas').value = clone.sintomas;
    //cuando damos a editar hace scroll hacia arriba para mejorar la experiencia de usuario
    window.scrollTo({ top: 0, behavior: 'smooth' });
}