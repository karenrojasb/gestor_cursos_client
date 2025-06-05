<div>
  <label>Profesor</label>
  <select
    name="Profesor"
    value={formData.Profesor ?? ""}
    onChange={handleChange}
    className="w-full border p-2 rounded-lg"
  >
    <option value="">Selecciona una opción</option>
    {profesores.map((prof) => (
      <option key={prof.id_emp} value={prof.id_emp}>
        {prof.nombre}
      </option>
    ))}
  </select>
</div>


