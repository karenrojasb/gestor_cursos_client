.then((data) => {
  console.log("Datos del curso recibidos:", data);
  if (data) {
    setFormData({
      ...data,
      Profesor: Number(data.Profesor), // <- aquí
    });
  } else {
    throw new Error("Datos del curso vacíos");
  }
})