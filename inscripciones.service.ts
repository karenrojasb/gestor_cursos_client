type ProfesorAPI = {
  id_emp: string;
  nombre: string;
  publico: number;
};

type ProfesorState = {
  id_emp: number;
  nombre: string;
};

useEffect(() => {
  async function fetchProfesores() {
    try {
      const response = await fetch("http://localhost:8090/api/cursos/profesores");
      if (!response.ok) throw new Error("Error al obtener los profesores");

      const data: ProfesorAPI[] = await response.json();

      // Filtramos los profesores públicos
      let profesoresPublicos: ProfesorState[] = data
        .filter((prof: ProfesorAPI) => prof.publico === 1)
        .map((prof: ProfesorAPI) => ({
          id_emp: Number(prof.id_emp), // Convertimos a number
          nombre: prof.nombre,
        }));

      const profesorIdNum = Number(formData.Profesor);

      // Si el profesor del curso no está en la lista de públicos, lo añadimos
      const profesorCurso = profesoresPublicos.find(p => p.id_emp === profesorIdNum);
      if (!profesorCurso && formData.Profesor) {
        const profesorEncontrado = data.find((p: ProfesorAPI) => Number(p.id_emp) === profesorIdNum);
        profesoresPublicos.push({
          id_emp: profesorIdNum,
          nombre: profesorEncontrado ? profesorEncontrado.nombre : "Profesor no público",
        });
      }

      setProfesores(profesoresPublicos);
    } catch (error) {
      console.error("Error cargando los profesores:", error);
    }
  }

  fetchProfesores();
}, [formData.Profesor]);