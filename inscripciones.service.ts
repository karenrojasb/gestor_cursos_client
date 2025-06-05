useEffect(() => {
  async function fetchProfesores() {
    try {
      const response = await fetch("http://localhost:8090/api/cursos/profesores");
      if (!response.ok) throw new Error("Error al obtener los profesores");

      const data = await response.json();

      // Aquí con el tipado rápido del parámetro prof
      const profesoresPublicos = data.filter((prof: { publico: number }) => prof.publico === 1);

      // Si ya cargamos el curso y su profesor no está en la lista de públicos, lo añadimos
      const profesorCurso = profesoresPublicos.find(p => p.id_emp === formData.Profesor);
      if (!profesorCurso && formData.Profesor) {
        profesoresPublicos.push({
          id_emp: formData.Profesor,
          nombre: data.find((p: any) => p.id_emp === formData.Profesor)?.nombre || "Profesor no público",
        });
      }

      setProfesores(profesoresPublicos);
    } catch (error) {
      console.error("Error cargando los profesores:", error);
    }
  }

  fetchProfesores();
}, [formData.Profesor]);