// Obtener el consecutivo de reg_doc (inicia en 1 para cada num_doc)
const consecutivoReg = await this.prismaService.$queryRawUnsafe<any[]>(`
  SELECT ISNULL(MAX(CONVERT(INT, reg_doc)), 0) + 1 AS regDoc
  FROM inv_inf_inv
  WHERE num_doc = '${num_doc}'
`);
const reg_doc = consecutivoReg[0].regDoc;
@IsNumber({ maxDecimalPlaces: 4 }, { message: 'La cantidad debe tener máximo 4 decimales' })
    cantidad?: number;
