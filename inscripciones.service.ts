const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;

  const camposNumericos = ["Publico", "Linea", "Modalidad", "Estado", "Unidad", "IdTipoCurso", "Valor", "CupoMax", "Horas", "Profesor", "SegundoPro"];
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



<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label>Profesor</label>
    <select
      name="Profesor"
      value={formData.Profesor ?? ""}
      onChange={handleChange}
      className="w-full border p-2 rounded-lg"
    >
      <option value="">
        {formData.Profesor || "Selecciona una opción"}
      </option>
      {profesores.map((p) => (
        <option key={p.id_emp} value={p.id_emp}>
          {p.nombre}
        </option>
      ))}
    </select>
  </div>

  <div>
    <label>Segundo Profesor</label>
    <select
      name="SegundoPro"
      value={formData.SegundoPro ?? ""}
      onChange={handleChange}
      className="w-full border p-2 rounded-lg"
    >
      <option value="">
        {formData.NombreSegundoPro || "Selecciona una opción"}
      </option>
      {profesores.map((p) => (
        <option key={p.id_emp} value={p.id_emp}>
          {p.nombre}
        </option>
      ))}
    </select>
  </div>
</div>
