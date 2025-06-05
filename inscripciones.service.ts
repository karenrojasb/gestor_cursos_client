type Profesor = {
  id_emp: string;
  nombre: string;
  publico: number;
};

useEffect(() => {
  async function fetchProfesores() {
    try {
      const response = await fetch("http://localhost:8090/api/cursos/profesores");
      if (!response.ok) throw new Error("Error al obtener los profesores");

      const data: Profesor[] = await response.json();

      const profesoresPublicos = data.filter((prof: Profesor) => prof.publico === 1);

      const profesorId = formData.Profesor ? formData.Profesor.toString() : "";
      const profesorCurso = profesoresPublicos.find((p: Profesor) => p.id_emp.toString() === profesorId);

      if (!profesorCurso && profesorId) {
        const profesorEncontrado = data.find((p: Profesor) => p.id_emp.toString() === profesorId);
        profesoresPublicos.push({
          id_emp: profesorId,
          nombre: profesorEncontrado ? profesorEncontrado.nombre : profesorId,
          publico: 0, // o el valor que tenga sentido
        });
      }

      setProfesores(profesoresPublicos);
    } catch (error) {
      console.error("Error cargando los profesores:", error);
    }
  }

  fetchProfesores();
}, [formData.Profesor]);