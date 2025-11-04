import { IsNumber, IsOptional, IsString, Length, IsInt } from 'class-validator';
import { Transform, Type } from "class-transformer";

export class ArticuloDto {
    @IsString({message: 'El campo item debe ser una cadena de texto'})
    @Length(1, 40, {message: 'El campo item debe tener entre 1 y 40 caracteres'})
    item: string;

    @Transform(({ value}) => parseFloat(value))
    @IsNumber({ maxDecimalPlaces: 4 }, { message: 'La cantidad debe tener máximo 4 decimales' })
    cantidad: number;


    @Transform(({ value}) => parseFloat(value))
    @IsNumber({ maxDecimalPlaces: 4 }, { message: 'El cos_uni debe tener máximo 4 decimales' })
    cos_uni: number;

    @IsNumber({ maxDecimalPlaces: 4 }, { message: 'El pre_vta debe tener máximo 4 decimales'})
    pre_vta: number;

    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 4 })
    cos_unai?: number;

    @IsNumber({ maxDecimalPlaces: 4 }, { message: 'La por_des debe tener máximo 4 decimales'})
    por_des: number;

    @IsOptional()
    @IsString({message: 'El usr_descrip_cue debe ser una cadena de texto'})
    @Length(1, 200, { message: 'El campo num_fact debe tener entre 1 y 14 caracteres' })
    usr_descrip_cue?: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value ?? null)
    bodega?: string | null;

    @IsOptional()
    @IsNumber({})
    dia_pla: number;

}
