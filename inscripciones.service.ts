import { Injectable } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
import { getCurrentMonth, getNowDate, formatoDateToDDMMYYYY } from 'src/utils/date.util'; 
import { generarIngresoDto } from './dto/generaringreso.dto';

@Injectable()
export class GenerarIngresoService {
  constructor(private readonly prisma: PrismaService) {}

  async generarIngreso(data: generarIngresoDto ) {
    const { referencia, tipo, ano_o, per_o, num_o, solicitante } = data;

    
    //Declaración de variables
    let tipoIngreso: string;
    let contenedorIngreso: string;
    let subProceso: string;

    //Switch para asignar valores según el tipo
    switch (tipo.toLowerCase()) {
      case 'contractual':
        tipoIngreso = 'contractual';
        contenedorIngreso = '73';
        subProceso = 'Contractual';
        break;
      case 'regular':
        tipoIngreso = 'regular';
        contenedorIngreso = '110';
        subProceso = 'Regular';
        break;
      case 'proveedor unico':
        tipoIngreso = 'proveedor unico';
        contenedorIngreso = '128';
        subProceso = 'Proveedor Único';
        break;
      case 'transporte':
        tipoIngreso = 'transporte';
        contenedorIngreso = '';
        subProceso = 'transporte';
        break;
      default:
        throw new Error(`Tipo no reconocido: ${tipo}`);
    }

    //Constante de tipo de documento
    const INGRESOALMACEN = '008';

    //Consulta de subtipo
    const cod_sub = await this.prisma.$queryRawUnsafe<any[]>(`
      SELECT cod_sub 
      FROM gen_subtipodoc 
      WHERE cod_tip = '${INGRESOALMACEN}' 
        AND cod_sub LIKE '${tipoIngreso.charAt(0).toUpperCase()}%'
    `);


    //Consulta de items
    const consultaitems = `
    DECLARE @sub_o CHAR(5);
    DECLARE @ano_o CHAR(4) = '${ano_o}';
    DECLARE @per_o CHAR(2) = '${per_o}';
    DECLARE @num_o CHAR(14) = '${num_o}';
    DECLARE @tip_a CHAR(5) = (SELECT cod_tip FROM gen_subtipodoc WHERE cod_sub = '${cod_sub[0].cod_sub}');
    DECLARE @referencia CHAR(20) = '${referencia}';

    IF EXISTS 
        ( 
        SELECT sub_tip FROM inv_inf_inv WHERE asig_numero = num_o
        AND tip_doc = '007'
        AND ons_orc LIKE '%' + @referencia + '%' 
        )

    BEGIN 
        SELECT @sub_o = sub_tip
        FROM inv_inf_inv
        WHERE asig_numero = @num_o
        AND tip_doc = '007'
        AND ons_orc LIKE '%' + @referencia + '%' 
        END

    ELSE
    BEGIN 
    SELECT @sub_o = sub_tip 
    FROM inv_cuedoc 
    WHERE  num_doc = @num_o 
    AND tip_doc = '007'
    AND ano_doc = @ano_o 
    AND per_doc = @per_o 
END; 
SELECT      CONVERT(CHAR(4), FORMAT(@fec_a, 'yyyy')) ano_doc, CONVERT(CHAR(2), 
FORMAT(@fec_a, 'MM')) per_doc, @sub_a sub_tip, @tip_a tip_doc, '' num_doc, 
            CUE.reg_doc, CONVERT(VARCHAR(MAX), @fec_a, 112) fecha, CAB.vendedor, 
        CAB.cod_suc, CUE.cod_cco, 
            CUE.cod_cl1, CUE.cod_cl2, CUE.cod_cl3, CAB.cliente, CAB.provee, 
            CAB.lista, CAB.dia_pla, CAB.ind_mp, CONVERT(VARCHAR(MAX), 
        CAB.fec_tas, 112) fec_tas, CAB.tasa, 
            CAB.obs_orc, CAB.fac_pro, CAB.cod_caja, CUE.bodega, CUE.bod_des, 
            CUE.cant_uni, CUE.item, CUE.alterno, '32002' trans, CONVERT(INT, 
        CUE.cantidad) cantidad, 
            + CUE.fac_con, CUE.cos_uni, CUE.pre_vta, CUE.por_des, CUE.por_iva, 
            CUE.por_iva_ng, CUE.por_ret, CUE.por_com, CUE.cos_unai, 
        CONVERT(VARCHAR(MAX), CUE.fec_ent, 112) fec_ent, 
            CUE.suc_des, CUE.ven_lote, CUE.cod_lote, '' ind_tra, 1 asig_num, 
            CUE.ind_refac, CUE.cod_conv, CUE.conv_suc, CUE.conv_cco, 
        CUE.conv_cl1, 
            CUE.conv_cl2, CUE.conv_cl3, CUE.num_fact, CUE.ord_fact, CUE.por_adm, 
            CUE.por_imp, CUE.por_uti, CUE.mon_adm, CUE.mon_imp, CUE.mon_uti, 
            NULL asig_numero, CUE.ind_afe, @ano_o usr_ano_ped, @per_o usr_per_ped, @sub_o usr_sub_ped, 
            @num_o usr_pedido, CUE.reg_doc usr_reg_ped, '${solicitante}' usr_tercero, 

            NULL ano_cdp, NULL per_cdp, 
            CUE.sub_cdp, CUE.num_cdp, CUE.cod_rubro, NULL usr_ano_des, NULL usr_per_des, 
            NULL usr_sub_des, NULL usr_despa, NULL usr_reg_des, CUE.descrip_cue usr_descrip_cue 
FROM   inv_cuedoc CUE 
    INNER JOIN inv_cabdoc CAB ON (
                                        CUE.ano_doc = CAB.ano_doc 
                                        AND CUE.per_doc = CAB.per_doc 
                                        AND CUE.sub_tip = CAB.sub_tip 
                                        AND CUE.num_doc = CAB.num_doc
                                    )
WHERE   CAB.ano_doc = @ano_o 
        AND CAB.per_doc = @per_o 
        AND CAB.sub_tip = @sub_o 
        AND CAB.num_doc = @num_o


    ` 
    const items = await this.prisma.$queryRawUnsafe<any[]>(`
    ${consultaitems}`);



    //Validación de resultado
    if (cod_sub.length === 0) {
      return {
        mensaje: `No se encontró subtipo para el tipo ${tipoIngreso}`,
        tipoIngreso,
        contenedorIngreso,
        subProceso,
        subtipo: null,
      };
    }

    const subtipo = cod_sub[0].cod_sub;


    //Retorno de datos
    return {
      referencia,
      tipoIngreso,
      contenedorIngreso,
      subProceso,
      subtipo,
      cantidaditems: items.length,
      items,
    };
  }
}
