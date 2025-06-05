useEffect(() => {
  async function fetchProfesores() {
    try {
      const response = await fetch("http://localhost:8090/api/cursos/profesores");
      if (!response.ok) throw new Error("Error al obtener los profesores");

      const data = await response.json();

      const profesoresPublicos = data.filter((prof: any) => prof.publico === 1);

      // Asegura que formData.Profesor no sea null/undefined
      if (formData.Profesor != null) {
        const yaIncluido = profesoresPublicos.some(p => p.id_emp === formData.Profesor);

        if (!yaIncluido) {
          const profesorOriginal = data.find((p: any) => p.id_emp === formData.Profesor);

          if (profesorOriginal) {
            profesoresPublicos.push({
              id_emp: profesorOriginal.id_emp,
              nombre: profesorOriginal.nombre || "Profesor no público",
            });
          } else {
            // Opción si no se encuentra en data (inconsistencia)
            profesoresPublicos.push({
              id_emp: formData.Profesor,
              nombre: "Profesor no registrado",
            });
          }
        }
      }

      setProfesores(profesoresPublicos);
    } catch (error) {
      console.error("Error cargando los profesores:", error);
    }
  }

  fetchProfesores();
}, [formData.Profesor]);