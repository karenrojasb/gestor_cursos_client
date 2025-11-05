await this.prismaService.$queryRawUnsafe<any[]>(`
    EXEC dbo.USR_sp_gen_afeinv_preciso 
        @ano_doc = ${getNowDate().getFullYear()}, 
        @per_doc = '${getCurrentMonth()}', 
        @sub_tip = '${data.sub_tip}', 
        @tip_doc = '${tip_doc}', 
        @num_doc = ${num_doc}
`);

retu