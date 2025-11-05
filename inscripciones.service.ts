import { BadRequestException, HttpException, InternalServerErrorException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { GenerarOrdenDto } from "./dto/generarorden.dto";
import { getCurrentMonth, getNowDate, formatoDateToDDMMYYYY } from 'src/utils/date.util';
import { Console } from "console";



@Injectable()
export class generarOrdenService {
    constructor(
        private readonly prismaService: PrismaService,

    ) { }

    async GenerarOrden(data: GenerarOrdenDto) {
        const { item, num_cdp, provee, Articulos } = data;
        console.log(Articulos)
        // Variables
        const vendedor = 0;
        const cod_cl2 = 0;
        const cod_cl3 = 0;
        const asig_num = 1;
        const ind_refac = 0;
        const conv_cco = 0;
        const conv_cl1 = 0;
        const conv_cl2 = 0;
        const conv_cl3 = 0;
        const por_adm = 0;
        const por_imp = 0;
        const cliente = 0;
        const bod_des = 0;
        const lista = 0;
        const ind_mp = '00';
        const tasa = 0;
        const fac_pro = 0;
        const cod_caja = 0;
        const tip_doc = '007';
        const cant_uni = 0;
        const alterno = 0;
        const trans = 0;
        const fac_con = 0;
        const por_com = 0;
        const fec_ent = '1900-01-01 00:00:00.000';
        const suc_des = 0;
        const cod_conv = 0;
        const conv_suc = 0;
        const por_uti = 0;
        const mon_adm = 0;
        const mon_imp = 0;
        const mon_uti = 0;
        const usr_ano_ped = 0;
        const usr_per_ped = 0;
        const usr_sub_ped = 0;
        const usr_pedido = 0;
        const usr_reg_ped = 0;
        const sub_cdp = 'U726';


        


        // Buscar cod_suc en la tabla gen_clasif1 y obtener usr_sucursal
        const sucursalInfo = await this.prismaService.$queryRawUnsafe<any[]>(`
    SELECT usr_sucursal FROM gen_clasif1 WHERE codigo = '${data.cod_cl1}'
`);

        if (sucursalInfo.length === 0) {
            throw new BadRequestException(`El código de sucursal ${data.cod_cl1} no existe`);
        }

        const cod_suc = sucursalInfo[0].usr_sucursal;


        //Validar que el NIT exista
        const proveedorInfo = await this.prismaService.$queryRawUnsafe<any[]>(`
        SELECT provee, ret_iva, ret_iva_ng, cod_pai, cod_dep, ciu
        from cxp_provee 
        WHERE provee = '${provee}'`);


        if (proveedorInfo.length === 0) {
            throw new BadRequestException(`El NIT ${provee}, no existe`)
            ;
        }

        const { ret_iva, ret_iva_ng, cod_pai, cod_dep, ciu } = proveedorInfo[0];
        const pai_doc = `${cod_pai}`;
        const dep_doc = `${cod_dep}`;
        const ciu_doc = `${ciu}`;
        const tar_rii = `${ret_iva}`;
        const tar_rii_ng = `${ret_iva_ng}`;



        // Obtener el consecutivo num_doc
        const consecutivo = await this.prismaService.$queryRawUnsafe<any[]>(`
    SELECT ISNULL(MAX(CONVERT(INT, num_doc)), 0) + 1 AS numDoc 
    FROM inv_inf_inv
     `);
        const num_doc = consecutivo[0].numDoc;




        //Obtener la información del item
        const itemInfo = await this.prismaService.$queryRawUnsafe<any[]>(`
        SELECT cod_ret_com, por_ret, por_iva, por_iva_ng
        FROM inv_items
        WHERE cod_item = '${item}'
        `);

        const infoItem = itemInfo[0] || {};


        for (let i = 0; i < Articulos.length; i++) {
            //Validar que el item exista

            console.log(Articulos[i].bodega)
            const { item, cantidad, cos_uni, por_des, bodega, usr_descrip_cue, dia_pla } = Articulos[i];


            // Validar info del item si es necesario
            const itemInfo = await this.prismaService.$queryRawUnsafe<any[]>(`
                SELECT cod_ret_com, por_ret, por_iva, por_iva_ng
                FROM inv_items
                WHERE cod_item = '${item}'
            `);

            if (itemInfo.length == 0) {
                throw new BadRequestException(`El item ${item},  no existe`)
            }

            const { cod_ret_com, por_ret, por_iva, por_iva_ng } = itemInfo[0];
            const cod_ret = `${cod_ret_com}`;

            const infoItem = itemInfo[0] || {};


            //Obtener la información de CDP 
            const cdpInfo = await this.prismaService.$queryRawUnsafe<any[]>(`
                SELECT ano_doc AS ano_cdp, per_doc AS per_cdp
                FROM PRE_cuedoc
                WHERE num_cdp = '${num_cdp}'
            `);

            const ano_cdp = cdpInfo[0]?.ano_cdp || getNowDate().getFullYear();
            const per_cdp = cdpInfo[0]?.per_cdp || 0;
            console.log(data.vendedor)

            const reg_doc = i +1

 
            const cos_unai = cos_uni;
            const pre_vta = cos_uni


          
            
       

            console.log(`
            INSERT INTO inv_inf_inv (
            ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, fecha,
            vendedor, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3,
            cliente, provee, lista, ind_mp, fec_tas, tasa, obs_orc,
            bodega, bod_des, fac_pro, cod_caja, cant_uni, item, alterno,
            trans, cantidad, fac_con, cos_uni, pre_vta, por_des, por_iva,
            por_iva_ng, cod_ret, por_ret, por_com, cos_unai, fec_ent,
            suc_des, ind_tra, asig_num, ind_refac, cod_conv, conv_suc,
            conv_cco, conv_cl1, conv_cl2, conv_cl3, num_fact, ord_fact,
            por_adm, por_imp, por_uti, mon_adm, mon_imp, mon_uti,
            usr_ano_ped, usr_per_ped, usr_sub_ped,  usr_pedido, usr_reg_ped,
            usr_tercero, ano_cdp, per_cdp, sub_cdp, num_cdp, cod_rubro,
            usr_descrip_cue, tar_rii, tar_rii_ng, pai_doc, dep_doc, ciu_doc, dia_pla)

            VALUES (
            '${getNowDate().getFullYear()}', '${getCurrentMonth()}', '${data.sub_tip}', '${tip_doc}','${num_doc}', '${reg_doc}', '${formatoDateToDDMMYYYY()}',
            '${vendedor}', '${cod_suc}', '${data.cod_cco}', '${data.cod_cl1}', '${cod_cl2}', '${cod_cl3}', 
            '${cliente}', '${data.provee}', '${lista}', '${ind_mp}', '${formatoDateToDDMMYYYY()}', '${tasa}', '${data.obs_orc}',
            '${bodega}', '${bod_des}', '${fac_pro}', '${cod_caja}', '${cant_uni}', '${item}', '${alterno}',
            '${trans}', '${cantidad}', '${fac_con}', '${cos_uni}', '${pre_vta}', '${por_des}', '${por_iva}',
            '${por_iva_ng}','${cod_ret}', '${por_ret}', '${por_com}', '${cos_unai}', '${fec_ent}',
            '${suc_des}', '', '${asig_num}', '${ind_refac}', '${cod_conv}', '${conv_suc}',
            '${conv_cco}', '${conv_cl1}', '${conv_cl2}', '${conv_cl3}', NULL, NULL,
            '${por_adm}', '${por_imp}', '${por_uti}', '${mon_adm}', '${mon_imp}', '${mon_uti}',
            '${usr_ano_ped}', '${usr_per_ped}', '${usr_sub_ped}', '${usr_pedido}', '${usr_reg_ped}',
            '${data.usr_tercero}', '${ano_cdp}', '${per_cdp}', '${sub_cdp}', '${num_cdp}','${data.cod_rubro}',
            '${usr_descrip_cue}', '${tar_rii}', '${tar_rii_ng}', '${pai_doc}', '${cod_dep}', '${ciu_doc}', '${dia_pla}'
            )
            `)


            //Insertar la orden
            await this.prismaService.$queryRawUnsafe<any[]>(`
            INSERT INTO inv_inf_inv (
            ano_doc, per_doc, sub_tip, tip_doc, num_doc, reg_doc, fecha,
            vendedor, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3,
            cliente, provee, lista, ind_mp, fec_tas, tasa, obs_orc,
            bodega, bod_des, fac_pro, cod_caja, cant_uni, item, alterno,
            trans, cantidad, fac_con, cos_uni, pre_vta, por_des, por_iva,
            por_iva_ng, cod_ret, por_ret, por_com, cos_unai, fec_ent,
            suc_des, ind_tra, asig_num, ind_refac, cod_conv, conv_suc,
            conv_cco, conv_cl1, conv_cl2, conv_cl3, num_fact, ord_fact,
            por_adm, por_imp, por_uti, mon_adm, mon_imp, mon_uti,
            usr_ano_ped, usr_per_ped, usr_sub_ped,  usr_pedido, usr_reg_ped,
            usr_tercero, ano_cdp, per_cdp, sub_cdp, num_cdp, cod_rubro,
            usr_descrip_cue, tar_rii, tar_rii_ng, pai_doc, dep_doc, ciu_doc, dia_pla)

            VALUES (
            '${getNowDate().getFullYear()}', '${getCurrentMonth()}', '${data.sub_tip}', '${tip_doc}','${num_doc}', '${reg_doc}', '${formatoDateToDDMMYYYY()}',
            '${vendedor}', '${cod_suc}', '${data.cod_cco}', '${data.cod_cl1}', '${cod_cl2}', '${cod_cl3}', 
            '${cliente}', '${data.provee}', '${lista}', '${ind_mp}', '${formatoDateToDDMMYYYY()}', '${tasa}', '${data.obs_orc}',
            '${bodega}', '${bod_des}', '${fac_pro}', '${cod_caja}', '${cant_uni}', '${item}', '${alterno}',
            '${trans}', '${cantidad}', '${fac_con}', '${cos_uni}', '${pre_vta}', '${por_des}', '${por_iva}',
            '${por_iva_ng}','${cod_ret}', '${por_ret}', '${por_com}', '${cos_unai}', '${fec_ent}',
            '${suc_des}', '', '${asig_num}', '${ind_refac}', '${cod_conv}', '${conv_suc}',
            '${conv_cco}', '${conv_cl1}', '${conv_cl2}', '${conv_cl3}', NULL, NULL,
            '${por_adm}', '${por_imp}', '${por_uti}', '${mon_adm}', '${mon_imp}', '${mon_uti}',
            '${usr_ano_ped}', '${usr_per_ped}', '${usr_sub_ped}', '${usr_pedido}', '${usr_reg_ped}',
            '${data.usr_tercero}', '${ano_cdp}', '${per_cdp}', '${sub_cdp}', '${num_cdp}','${data.cod_rubro}',
            '${usr_descrip_cue}', '${tar_rii}', '${tar_rii_ng}', '${pai_doc}', '${dep_doc}', '${ciu_doc}', '${dia_pla}'
            )
            `)
                ;
        }

        //Obtener el asig_numero
        const asigNumeroResult = await this.prismaService.$queryRawUnsafe<any[]>(`
            SELECT DISTINCT asig_numero
            FROM inv_inf_inv
            WHERE ind_tra = 'X'
              AND ano_doc = ${getNowDate().getFullYear()}
              AND per_doc = '${getCurrentMonth()}'
              AND sub_tip = '${data.sub_tip}'
              AND tip_doc = '${tip_doc}'
              AND num_doc = ${num_doc}
        `);
        
        // Si no encuentra nada, dejar en blanco
        const asig_numero = asigNumeroResult.length > 0
            ? asigNumeroResult[0].asig_numero
            : '';

        return {
            Codigo: `200`,
            Mensaje: `Consulta realiza con éxito`,
            asig_numero
        };


    } catch(error) {
        console.error("Error al generar la orden:", error.mensaje);
        if (error instanceof HttpException) throw error;

        console.log('Error al reasignar el cdp', error);
        throw new InternalServerErrorException('Error al generar la consulta')


    }




}
