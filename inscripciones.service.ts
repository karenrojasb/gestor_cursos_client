USE [Novasoft]
GO

DECLARE	@return_value int

EXEC	@return_value = [dbo].[USR_sp_gen_afeinv_preciso]
		@iano_doc = N'2025',
		@fano_doc = N'2025',
		@iper_doc = N'11',
		@fper_doc = N'11',
		@isub_tip = N'C007',
		@fsub_tip = N'C007',
		@inum_doc = N'55946',
		@fnum_doc = N'55946',
		@ifec_doc = N'2025-11-04',
		@ffec_doc = N'2025-11-04',
		@indver = false

SELECT	'Return Value' = @return_value

GO
