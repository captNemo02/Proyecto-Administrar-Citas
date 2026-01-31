# Administrador de Citas – Veterinaria (CRUD)

Aplicación web para registrar y administrar citas/pacientes de una veterinaria.
Proyecto orientado a practicar JavaScript (POO), manejo de estado en memoria y manipulación del DOM.

# Funcionalidades
- Registrar paciente/cita (formulario con validación)
- Listar citas registradas
- Editar una cita existente (modo edición + “Guardar Cambios”)
- Eliminar citas
- Alertas de éxito/error (sin duplicarse)
- Mensaje “No Hay Pacientes” cuando el listado está vacío
- Generación de ID con formato: `CIT-XXXXXX-YYYY`

# Aprendizajes / Conceptos usados
- **Programación Orientada a Objetos (POO)** con clases:
  - `Cita` (modelo de datos)
  - `GestionarCita` (manejo de estado: agregar, editar, eliminar)
  - `UI` (renderizado, alertas, limpieza de UI)
- **Métodos de arrays**:
  - `map()` para reemplazar una cita al editar
  - `filter()` para eliminar por id
  - spread `...` para agregar sin mutar el array
- **Manipulación del DOM**:
  - creación dinámica de elementos
  - `insertBefore` para mostrar alertas encima del formulario
  - limpieza de contenedores para evitar duplicados

# Tecnologías
- HTML
- CSS (Tailwind compilado en `dist/output.css`)
- JavaScript

# Notas
El proyecto actualmente maneja el estado en memoria.
Como mejora futura, se puede agregar persistencia con LocalStorage o integrarlo con una API/BD

Mejoras futuras (ideas)
- Persistencia con LocalStorage
- Separar el código en módulos ES (import/export) y carpetas (MVC simple)
- Validación adicional (formato de email, fechas)
- Búsqueda / filtro por paciente o propietario
