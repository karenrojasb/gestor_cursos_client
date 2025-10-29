import { Transform } from 'class-transformer';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class GenerarOrdenDto {
  @Transform(({ value }) => parseFloat(value))
  @IsNumber(
    { maxDecimalPlaces: 4 },
    { message: 'La cantidad debe tener máximo 4 decimales' },
  )
  @IsNotEmpty({ message: 'La cantidad es obligatoria' })
  cantidad: number;
}

@IsNumber({ maxDecimalPlaces: 4 })
  cantidad: number;

@Transform(({ value}) => parseFloat(value))
    @IsNumber({ maxDecimalPlaces: 4 }, { message: 'La cantidad debe tener máximo 4 decimales' })
    cantidad: number;

import { BadRequestException, HttpException, InternalServerErrorException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { GenerarOrdenDto } from "./dto/generarorden.dto";
import { formatDateToYMD, getNowDate } from 'src/utils/date.util';


@Injectable()
export class generarOrdenService{ 
    constructor( 
            private readonly prismaService: PrismaService,
            
        ) { }

   async GenerarOrden(data: GenerarOrdenDto){
    const {  item, num_cdp, provee} = data;


//Validar que el NIT exista
    const NIT = await this.prismaService.$queryRawUnsafe<any[]>(`
        SELECT provee, ret_iva, ret_iva_ng, cod_pai, cod_dep, cod_ciu 
        from cxp_provee 
        WHERE provee = '${provee}'`);

    if (NIT.length === 0){
        throw new BadRequestException(`El NIT ${provee}, no existe`)
        ;
    }
  
    const datosProveedor = NIT [0];


// Obtener el consecutivo num_doc
    const consecutivo = await this.prismaService.$queryRawUnsafe<any[]>(`
    SELECT ISNULL(MAX(CONVERT(INT, num_doc)), 0) + 1 AS numDoc 
    FROM inv_inf_inv
     `);
    const num_doc = consecutivo[0].numDoc;


// Obtener el consecutivo de reg_doc (inicia en 1 para cada num_doc)
const consecutivoReg = await this.prismaService.$queryRawUnsafe<any[]>(`
  SELECT ISNULL(MAX(CONVERT(INT, reg_doc)), 0) + 1 AS regDoc
  FROM inv_inf_inv
  WHERE num_doc = '${num_doc}'
`);
const reg_doc = consecutivoReg[0].regDoc;


//Obtener la información del item
    const itemInfo = await this.prismaService.$queryRawUnsafe<any[]>(`
        SELECT cod_ret_com, por_ret, por_iva, por_iva_ng
        FROM inv_items
        WHERE cod_item = '${item}'
        `);
    
        const infoItem = itemInfo[0] || {};


//Obtener la información de CDP 
    const cdpInfo = await this.prismaService.$queryRawUnsafe<any[]>(`
        SELECT ano_doc AS ano_cdp, per_doc AS per_cdp
        FROM PRE_cuedoc
        WHERE num_cdp = '${num_cdp}'
        `);

        const infoCdp = cdpInfo[0] || {};




//Insertar la orden
        await this.prismaService.$queryRawUnsafe<any[]>(`
            INSERT INTO inv_inf_inv (
            ano_doc, per_doc, sub_tip, num_doc, tip_doc, reg_doc, fecha,
            vendedor, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3,
            cliente, provee, lista, dia_pla, ind_mp, fec_tas, tasa, obs_orc,
            bodega, bod_des, fac_pro, cod_caja, cant_uni, item, alterno,
            trans, cantidad, fac_con, cos_uni, pre_vta, por_des, por_iva,
            por_iva_ng, cod_ret, por_ret, por_com, cos_unai, fec_ent,
            suc_des, ind_tra, asig_num, ind_refac, cod_conv, conv_suc,
            conv_cco, conv_cl1, conv_cl2, conv_cl3, num_fact, ord_fact,
            por_adm, por_imp, por_uti, mon_adm, mon_imp, mon_uti,
            usr_ano_ped, usr_per_ped, usr_sub_ped,  usr_pedido, usr_reg_ped,
            usr_tercero, ano_cdp, per_cdp, sub_cdp, num_cdp, cod_rubro,
            usr_descrip_cue, tar_rii, tar_rii_ng, pai_doc, dep_doc, ciu_doc)

            VALUES (
            '${getNowDate().getFullYear()}', '${getNowDate().getMonth()}', '${data.sub_tip}',${num_doc}, '${reg_doc}', '${formatDateToYMD()}',
            '${data.vendedor}', '${data.cod_suc}', '${data.cod_cco}', '${data.cod_cl1}', '${data.cod_cl2}', '${data.cod_cl3}', 
            '${data.cliente}', '${data.provee}', '${data.lista}', '${data.dia_pla}', '${data.ind_mp}', '${formatDateToYMD()}', '${data.tasa}', '${data.obs_orc}',
            '${data.bodega}', '${data.bod_des}', '${data.fac_pro}', '${data.cod_caja}', '${data.cant_uni}', '${data.item}', '${data.alterno}',
            '${data.trans}', ${data.cantidad}, '${data.fac_con}', '${data.cos_uni}', '${data.pre_vta}', '${data.por_des}', '${data.por_iva}',
            '${data.por_iva_ng}','${data.cod_ret}', '${data.por_ret}', '${data.por_com}', '${data.cos_unai}', '${data.fec_ent}',
            '${data.conv_cco}', '${data.conv_cl1}', '${data.conv_cl2}', '${data.conv_cl3}', '${data.num_fact}', '${data.ord_fact}',
            '${data.por_adm}', '${data.por_imp}', '${data.por_uti}', '${data.mon_adm}', '${data.mon_imp}', '${data.mon_uti}',
            '${data.usr_ano_ped}', '${data.usr_per_ped}', '${data.usr_sub_ped}', '${data.usr_pedido}', '${data.usr_reg_ped}',
            '${data.usr_tercero}', '${data.ano_cdp}', '${data.per_cdp}', '${data.sub_cdp}', '${data.num_cdp}','${data.cod_rubro}',
            '${data.usr_descrip_cue}', '${data.tar_rii}', '${data.tar_rii_ng}', '${data.pai_doc}', '${data.dep_doc}', '${data.ciu_doc}'
            )
            `);

            return {
                Codigo: `200`,
                Mensaje: `Consulta realiza con éxito`,
                num_doc,
                proveedor: provee
            };
            

    } catch (error){
        console.error("Error al generar la orden:", error.mensaje);
        if (error instanceof HttpException) throw error;

       console.log('Error al reasignar el cdp', error);
                   throw new InternalServerErrorException('Error al generar la consulta')
            

    }
}
