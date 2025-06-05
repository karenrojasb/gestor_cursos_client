useEffect(() => {
  async function fetchProfesores() {
    try {
      const response = await fetch("http://localhost:8090/api/cursos/profesores");
      if (!response.ok) throw new Error("Error al obtener los profesores");

      const data = await response.json();

      const profesoresPublicos = data.filter((prof: { publico: number }) => prof.publico === 1);

      const profesorCurso = profesoresPublicos.find(p => p.id_emp.toString() === formData.Profesor.toString());
      if (!profesorCurso && formData.Profesor) {
        const profesorEncontrado = data.find((p: any) => p.id_emp.toString() === formData.Profesor.toString());
        profesoresPublicos.push({
          id_emp: formData.Profesor,
          nombre: profesorEncontrado ? profesorEncontrado.nombre : formData.Profesor.toString(),
        });
      }

      setProfesores(profesoresPublicos);
    } catch (error) {
      console.error("Error cargando los profesores:", error);
    }
  }

  fetchProfesores();
}, [formData.Profesor]);