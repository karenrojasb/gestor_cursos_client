const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;

  const camposNumericos = ["Publico","Linea", "Modalidad", "Estado", "Unidad", "IdTipoCurso", "Valor", "CupoMax", "Horas"];
  const camposProfesor = ["Profesor", "SegundoPro"];

  const nuevoValor = camposNumericos.includes(name) ? Number(value) : value;

  let nombreCampoExtra = {};
  if (camposProfesor.includes(name)) {
    const prof = profesores.find(p => p.id_emp === Number(value));
    if (name === "Profesor") {
      nombreCampoExtra = { NombreProfesor: prof?.nombre || "" };
    } else if (name === "SegundoPro") {
      nombreCampoExtra = { NombreSegundoPro: prof?.nombre || "" };
    }
  }

  setFormData((prev) => ({
    ...prev,
    [name]: nuevoValor, 
    ...nombreCampoExtra, 
  }));
};
