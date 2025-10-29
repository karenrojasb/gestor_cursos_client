for (const articulo of Articulos) {
    const { item, cantidad, cos_uni, pre_vta, cos_unai, por_des, usr_descrip_cue, bodega, dia_pla } = articulo;

    // Validar info del item si es necesario
    const itemInfo = await this.prismaService.$queryRawUnsafe<any[]>(`
      SELECT cod_ret_com, por_ret, por_iva, por_iva_ng
      FROM inv_items
      WHERE cod_item = '${item}'
    `);

    const infoItem = itemInfo[0] || {};