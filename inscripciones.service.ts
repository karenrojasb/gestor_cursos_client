<div>
  <label>Profesor</label>
  <select
    name="Profesor"
    value={formData.Profesor ?? ""}
    onChange={handleChange}
    className="w-full border p-2 rounded-lg"
  >
    <option value="">Seleccione una opción</option>
    {profesores.map((p) => (
      <option key={p.id_emp} value={p.id_emp}>
        {p.nombre}
      </option>
    ))}
  </select>

  {/* Mostrar nombre del profesor debajo si existe */}
  {formData.NombreProfesor && (
    <p className="text-sm text-gray-600 mt-1">
      Seleccionado: {formData.NombreProfesor}
    </p>
  )}
</div>