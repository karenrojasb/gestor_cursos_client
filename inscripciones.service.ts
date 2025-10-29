import { IsNumber, IsString, Length, Min, Max, IsOptional, IsDateString,  IsBoolean, IsNotEmpty, ValidateNested } from "class-validator";

import { Transform, Type } from "class-transformer";

export class ArticuloDto {
  @IsString()
  @Length(1, 40)
  item: string;

  @Transform(({ value}) => parseFloat(value))
    @IsNumber({ maxDecimalPlaces: 4 }, { message: 'La cantidad debe tener máximo 4 decimales' })
    cantidad: number;


  @Transform(({ value}) => parseFloat(value))
  @IsNumber({ maxDecimalPlaces: 4 }, { message: 'El cos_uni debe tener máximo 4 decimales' })
  cos_uni: number;

  @IsNumber({ maxDecimalPlaces: 4 })
  pre_vta: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 4 })
  cos_unai?: number;

  @IsNumber({ maxDecimalPlaces: 4 })
  por_des: number;

  @IsOptional()
  @IsString()
  @Length(1, 200)
  usr_descrip_cue?: string;

  @IsOptional()
  @IsString()
  @Length(1, 3)
  bodega?: string;

  @IsOptional()
  @IsNumber()
  dia_pla?: number;
}

export class GenerarOrdenDto {

  

    @IsString({ message: 'El campo sub_tip debe ser una cadena de texto' })
    @Length(1, 5, { message: 'El campo sub_tip debe tener entre 1 y 5 caracteres' })
    sub_tip: string;
    @ValidateNested({ each: true})
    @Type(() => ArticuloDto)
    Articulos: ArticuloDto[];


    @IsOptional()
    @IsString({ message: 'El campo tipo doc debe ser una cadena de texto' })
    @Length(1, 3, { message: 'El campo tipo doc debe tener entre 1 y 3 caracteres' })
    tip_doc?: string;


    @IsOptional()
    @IsString({ message: 'El campo vendedor debe ser una cadena de texto' })
    @Length(1, 3, { message: 'El campo vendedor debe tener entre 1 y 3 caracteres' })
    vendedor?: string; 

    @IsOptional()
    @IsString({ message: 'El campo cod_suc debe ser una cadena de texto' })
    @Length(1, 3, { message: 'El campo cod_suc debe tener entre 1 y 3 caracteres' })
    cod_suc?: string; 

    @IsOptional()
    @IsString({ message: 'El campo cod_cco debe ser una cadena de texto' })
    @Length(1, 10, { message: 'El campo cod_cco debe tener entre 1 y 10 caracteres' })
    cod_cco?: string; 

    @IsOptional()
    @IsString({ message: 'El campo cod_cl1 debe ser una cadena de texto' })
    @Length(1, 12, { message: 'El campo cod_cl1 debe tener entre 1 y 12 caracteres' })
    cod_cl1?: string; 

    @IsOptional()
    @IsString({ message: 'El campo cod_cl2 debe ser una cadena de texto' })
    @Length(1, 12, { message: 'El campo cod_cl2 debe tener entre 1 y 12 caracteres' })
    cod_cl2?: string; 

    @IsOptional()
    @IsString({ message: 'El campo cod_cl3 debe ser una cadena de texto' })
    @Length(1, 12, { message: 'El campo cod_cl3 debe tener entre 1 y 12 caracteres' })
    cod_cl3?: string;
    
    @IsOptional()
    @IsString({ message: 'El campo cliente debe ser una cadena de texto' })
    @Length(1, 15, { message: 'El campo cliente debe tener entre 1 y 15 caracteres' })
    cliente?: string; 

    @IsOptional()
    @IsString({ message: 'El campo provee debe ser una cadena de texto' })
    @Length(1, 15, { message: 'El campo provee debe tener entre 1 y 15 caracteres' })
    provee?: string; 

    @IsOptional()
    @IsString({ message: 'El campo lista debe ser una cadena de texto' })
    @Length(1, 2, { message: 'El campo lista debe tener entre 1 y 2 caracteres' })
    lista?: string; 

    @IsOptional()
    @IsNumber({ allowNaN: false, allowInfinity: false},{ message: 'El campo dia_pla debe ser un número válido'})
    @Length(1, 9)
    @Min(9)
    @Max(18)
    dia_pla?: number; 

    @IsOptional()
    @IsString({ message: 'El campo ind_mp debe ser una cadena de texto' })
    @Length(1, 2, { message: 'El campo ind_mp debe tener entre 1 y 2 caracteres' })
    ind_mp?: string; 


    @IsOptional()
    @IsNumber({ maxDecimalPlaces : 4 }, { message: 'La tasa debe tener máximo 4 decimales' })
    @Length(1, 8)
    @Min(0)
    @Max(19)
    tasa?: number;
                 
    @IsOptional()
    @IsString({ message: 'El campo obs_orc debe ser una cadena de texto' })
    @Length(1, 200, { message: 'El campo obs_ors debe tener entre 1 y 200 caracteres' })
    obs_orc?: string; 

    @IsOptional()
    @IsString({ message: 'El campo bodega debe ser una cadena de texto' })
    @Length(1, 3, { message: 'El campo bodega debe tener entre 1 y 3 caracteres' })
    bodega?: string;

    @IsOptional()
    @IsString({ message: 'El campo bos_des debe ser una cadena de texto' })
    @Length(1, 3, { message: 'El campo bod_des debe tener entre 1 y 3 caracteres' })
    bod_des?: string;

    @IsOptional()
    @IsString({ message: 'El campo fac_pro debe ser una cadena de texto' })
    @Length(1, 14, { message: 'El campo fac_pro debe tener entre 1 y 14 caracteres' })
    fac_pro?: string;

    @IsOptional()
    @IsString({ message: 'El campo cod_caja debe ser una cadena de texto' })
    @Length(1, 3, { message: 'El campo cod_caja debe tener entre 1 y 3 caracteres' })
    cod_caja?: string;

    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 4}, { message: 'La cant_uni debe tener máximo 4 decimales'} )
    cant_uni?: number;

    @IsOptional()
    @IsString({ message: 'El campo item debe ser una cadena de texto' })
    @Length(1, 40, { message: 'El campo item debe tener entre 1 y 40 caracteres' })
    item?: string;

    @IsOptional()
    @IsString({ message: 'El campo alterno debe ser una cadena de texto' })
    @Length(1, 15, { message: 'El campo alterno debe tener entre 1 y 15 caracteres' })
    alterno?: string;

    @IsOptional()
    @IsString({ message: 'El campo trans debe ser una cadena de texto' })
    @Length(1, 5, { message: 'El campo trans debe tener entre 1 y 5 caracteres' })
    trans?: string;

    @Transform(({ value}) => parseFloat(value))
    @IsNumber({ maxDecimalPlaces: 4 }, { message: 'La cantidad debe tener máximo 4 decimales' })
    cantidad: number;

    @IsOptional()
    @IsString({ message: 'El campo fac_con debe ser una cadena de texto' })
    @Length(1, 3, { message: 'El campo fac_con debe tener entre 1 y 3 caracteres' })
    fac_con?: string;

    @Transform(({ value}) => parseFloat(value))
    @IsNumber({ maxDecimalPlaces: 4 }, { message: 'El cos_uni debe tener máximo 4 decimales' })
    cos_uni: number;

    @IsNumber({ maxDecimalPlaces: 4 }, { message: 'El pre_vta debe tener máximo 4 decimales'})
    pre_vta: number;

    @IsNumber({ maxDecimalPlaces: 4 }, { message: 'La por_des debe tener máximo 4 decimales'})
    por_des: number;

    @IsNumber({ maxDecimalPlaces: 4}, { message: 'La por_iva debe tener máximo 4 decimales'})
    por_iva: number;

    @IsNumber({ maxDecimalPlaces: 4}, { message: 'La por_iva_ng debe tener máximo 4 decimales'})
    por_iva_ng: number;

    @IsOptional()
    @IsString({ message: 'El campo cod_ret debe ser una cadena de texto' })
    @Length(1, 3, { message: 'El campo cod_ret debe tener entre 1 y 3 caracteres' })
    cod_ret?: string;

    @IsNumber({ maxDecimalPlaces: 4}, { message: 'la por_ret debe tener máximo 4 decimales'})
    por_ret: number;

    @IsNumber({ maxDecimalPlaces: 4 }, { message: 'La por_com debe tener máximo 4 decimales' })
    por_com: number;

    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 4 }, { message: 'La cos_unai debe tener máximo 4 decimales' })
    cos_unai?: number;

    @IsOptional()
    @IsDateString()
    fec_ent?: string;
    
    @IsOptional()
    @IsString({ message: 'El campo suc_des debe ser una cadena de texto' })
    @Length(1, 3, { message: 'El campo suc_des debe tener entre 1 y 3 caracteres' })
    suc_des?: string;

    @IsOptional()
    @IsString({ message: 'El campo obs_orc debe ser una cadena de texto' })
    @Length(1, 1, { message: 'El campo obs_ors debe tener entre 1 y 1 caracteres' })
    ind_tra?: string;

    @IsBoolean()
    asing_num: boolean;;

    @IsBoolean()
    ind_refact: boolean;

    @IsOptional()
    @IsString({ message: 'El campo cod_conv debe ser una cadena de texto' })
    @Length(1, 15, { message: 'El campo cod_conv debe tener entre 1 y 15 caracteres' })
    cod_conv?: string;

    @IsString({ message: 'El campo conv_suc debe ser una cadena de texto' })
    @Length(1, 3, { message: 'El campo conv_suc debe tener entre 1 y 200 caracteres' })
    conv_suc: string;

    @IsString({ message: 'El campo conv_cco debe ser una cadena de texto' })
    @Length(1, 10, { message: 'El campo conv_cco debe tener entre 1 y 10 caracteres' })
    conv_cco: string;

    @IsString({ message: 'El campo conv_cl1 debe ser una cadena de texto' })
    @Length(1, 12, { message: 'El campo conv_cl1 debe tener entre 1 y 12 caracteres' })
    conv_cl1: string;

    @IsString({ message: 'El campo conv_cl2 debe ser una cadena de texto' })
    @Length(1, 12, { message: 'El campo conv_cl2 debe tener entre 1 y 12 caracteres' })
    conv_cl2: string;

    @IsString({ message: 'El campo conv_cl3 debe ser una cadena de texto' })
    @Length(1, 12, { message: 'El campo conv_cl3 debe tener entre 1 y 12 caracteres' })
    conv_cl3: string;

    @IsOptional()
    @IsString({ message: 'El campo num_fact debe ser una cadena de texto' })
    @Length(1, 14, { message: 'El campo num_fact debe tener entre 1 y 14 caracteres' })
    num_fact?: string;

    @IsOptional()
    @IsNumber({ allowNaN: false, allowInfinity: false}, { message: 'El valor ord_fact debe ser un número válido'})
    @Length(1, 8)
    @Min(0, { message: 'El ord_fact debe ser mayor o igual a 0'})
    @Max(10, { message: 'El ord_fact debe ser menor o igual a 10'})
    ord_fact?: number;

    @IsNumber({ maxDecimalPlaces: 4}, { message: 'El por_adm debe tener máximo 4 decimales' })
    por_adm: number;

    @IsNumber({ maxDecimalPlaces: 4}, { message: 'El por_imp debe tener máximo 4 decimales'})
    por_imp: number;

    @IsNumber({ maxDecimalPlaces: 4 }, { message: 'El por_uti debe tener máximo 4 decimales' })
    por_uti: number;

    @IsNumber({ maxDecimalPlaces: 4}, { message: 'El mon_adm debe tener máximo 4 decimales' })
    mon_adm: number;

    @IsNumber({ maxDecimalPlaces: 4}, { message: 'El mon_imp debe tener máximo 4 decimales' })
    mon_imp: number;

    @IsNumber({ maxDecimalPlaces: 4}, { message: 'El mon_util debe tener máximo 4 decimales'})
    mon_uti: number;

    @IsOptional()
    @IsString({ message: 'El campo usr_ano_ped debe ser una cadena de texto' })
    @Length(1, 4, { message: 'El campo usr_ano_ped debe tener entre 1 y 4 caracteres' })
    usr_ano_ped?: string;

    @IsOptional()
    @IsString({ message: 'El campo usr_per_ped debe ser una cadena de texto' })
    @Length(1, 2, { message: 'El campo usr_per_ped debe tener entre 1 y 2 caracteres' })
    usr_per_ped?: string;

    @IsOptional()
    @IsString({ message: 'El campo usr_sub_ped debe ser una cadena de texto' })
    @Length(1, 5, { message: 'El campo usr_sub_ped debe tener entre 1 y 5 caracteres' })
    usr_sub_ped?: string;

    @IsOptional()
    @IsString({ message: 'El campo usr_pedido debe ser una cadena de texto' })
    @Length(1, 14, { message: 'El campo usr_pedido debe tener entre 1 y 14 caracteres' })
    usr_pedido: string;

    @IsOptional()
    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'El campo valor cdp debe ser un número válido' })
    @Length(1, 4, { message: 'El campo usr_reg_ped debe tener entre 1 y 4 caracteres' })
    @Min(0, { message: 'El usr_reg_ped debe ser mayor o igual a 0' })
    @Max(10, { message: 'El urs_reg_ped debe ser menor o igual a 10' })
    usr_reg_ped?: number;

    @IsOptional()
    @IsString({ message: 'El campo tercero debe ser una cadena de texto' })
    @Length(1, 15, { message: 'El campo tercero debe tener entre 1 y 5 caracteres' })
    usr_tercero?: string;


    @IsOptional()
    @IsString({ message: 'El campo ano_cdp debe ser una cadena de texto' })
    @Length(1, 4, { message: 'El campo ano_cdp debe tener entre 1 y 4 caracteres' })
    ano_cdp?: string;

    @IsOptional()
    @IsString({ message: 'El campo per_cdp debe ser una cadena de texto' })
    @Length(1, 2, { message: 'El campo per_cdp debe tener entre 1 y 2 caracteres' })
    per_cdp?: string;

    @IsOptional()
    @IsString({ message: 'El campo sub_cdp debe ser una cadena de texto' })
    @Length(1, 5, { message: 'El campo sub_cdp debe tener entre 1 y 5 caracteres' })
    sub_cdp?: string;

    @IsOptional()
    @IsString({ message: 'El campo num_cdp debe ser una cadena de texto' })
    @Length(1, 14, { message: 'El campo num_cdp debe tener entre 1 y 14 caracteres' })
    num_cdp?: string;

    @IsOptional()
    @IsString({ message: 'El campo cod_rubro debe ser una cadena de texto' })
    @Length(1, 17, { message: 'El campo cod_rubro debe tener entre 1 y 17 caracteres' })
    cod_rubro?: string;

    @IsOptional()
    @IsString({ message: 'El campo usr_descrip_cue debe ser una cadena de texto' })
    @Length(1, 200, { message: 'El campo usr_descrip_cue debe tener entre 1 y 200 caracteres' })
    usr_descrip_cue?: string;

    @IsNumber({ maxDecimalPlaces: 4 }, { message: 'El tar_rii debe tener máximo 4 decimales' } )
    tar_rii: number;

    @IsNumber({ maxDecimalPlaces: 4}, { message: 'El tar_rii_ng debe tener máximo 4 decimales'})
    tar_rii_ng: number;
    
    @IsString({ message: 'El campo pai_doc debe ser una cadena de texto' })
    @Length(1, 3, { message: 'El campo pai_doc debe tener entre 1 y 3 caracteres' })
    pai_doc: string;

    @IsString({ message: 'El campo dep_doc debe ser una cadena de texto' })
    @Length(1, 2, { message: 'El campo dep_doc debe tener entre 1 y 2 caracteres' })
    dep_doc: string;

    @IsString({ message: 'El campo ciu_doc debe ser una cadena de texto' })
    @Length(1, 5, { message: 'El campo ciu_doc debe tener entre 1 y 5 caracteres' })
    ciu_doc: string;




}
