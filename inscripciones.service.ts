const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;

  const camposNumericos = ["Publico", "Profesor", "SegundoPro", "Linea", "Modalidad", "Estado", "Unidad", "IdTipoCurso", "Valor", "CupoMax", "Horas"];
  const nuevoValor = camposNumericos.includes(name) ? Number(value) : value;

  const prof = (name === "Profesor" || name === "SegundoPro")
    ? profesores.find(p => p.id_emp === Number(value))
    : null;

  const nombreCampoExtra = name === "Profesor"
    ? { NombreProfesor: prof?.nombre || "" }
    : name === "SegundoPro"
    ? { NombreSegundoPro: prof?.nombre || "" }
    : {};

  setFormData(prev => ({
    ...prev,
    [name]: nuevoValor,
    ...nombreCampoExtra,
  }));
};
