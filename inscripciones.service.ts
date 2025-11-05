// Ejecutar el procedimiento almacenado de Novasoft con todos los parámetros requeridos
await this.prismaService.$queryRawUnsafe<any[]>(`
    EXEC dbo.USR_sp_gen_afeinv_preciso 
        @iano_doc = '${getNowDate().getFullYear()}',
        @fano_doc = '${getNowDate().getFullYear()}',
        @iper_doc = '${getCurrentMonth()}',
        @fper_doc = '${getCurrentMonth()}',
        @isub_tip = '${data.sub_tip}',
        @fsub_tip = '${data.sub_tip}',
        @inum_doc = '${num_doc}',
        @fnum_doc = '${num_doc}',
        @ifec_doc = '${formatoDateToDDMMYYYY()}',
        @ffec_doc = '${formatoDateToDDMMYYYY()}',
        @indver = 0
`);