// Obtener el consecutivo
const consecutivo = await this.prismaService.$queryRawUnsafe<any[]>(`
  SELECT ISNULL(MAX(CONVERT(INT, num_doc)), 0) + 1 AS numDoc 
  FROM inv_inf_inv
`);
const num_doc = consecutivo[0].numDoc;