<select
  name="Profesor"
  value={formData.Profesor?.toString() ?? ""}
  onChange={handleChange}
  className="w-full border p-2 rounded-lg"
>
  <option value="">Selecciona un profesor</option>
  {profesores.map((p) => (
    <option key={p.id_emp} value={p.id_emp}>
      {p.nombre}
    </option>
  ))}
</select>