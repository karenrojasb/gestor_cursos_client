SELECT  
    fk.name AS NombreRelacion,
    CASE 
        WHEN tp.name = 'inv_inf_inv' THEN 'Es clave foránea en otra tabla (inv_inf_inv es la tabla padre)'
        WHEN tr.name = 'inv_inf_inv' THEN 'Es clave foránea en inv_inf_inv (inv_inf_inv es la tabla hija)'
    END AS TipoRelacion,
    tp.name AS TablaPadre,
    cp.name AS ColumnaPadre,
    tr.name AS TablaRelacionada,
    cr.name AS ColumnaRelacionada
FROM sys.foreign_keys AS fk
INNER JOIN sys.foreign_key_columns AS fkc ON fk.object_id = fkc.constraint_object_id
INNER JOIN sys.tables AS tp ON fkc.parent_object_id = tp.object_id
INNER JOIN sys.columns AS cp ON fkc.parent_object_id = cp.object_id AND fkc.parent_column_id = cp.column_id
INNER JOIN sys.tables AS tr ON fkc.referenced_object_id = tr.object_id
INNER JOIN sys.columns AS cr ON fkc.referenced_object_id = cr.object_id AND fkc.referenced_column_id = cr.column_id
WHERE tp.name = 'inv_inf_inv' OR tr.name = 'inv_inf_inv'
ORDER BY TablaPadre, TablaRelacionada, ColumnaRelacionada;