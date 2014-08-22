CREATE PROCEDURE [dbo].[USP_AddEditEMailInfo] 
(	
	@Contactid int,
	@ContactEMailId varchar(50) = '0', -- (0 or ContactEMailId#
	@CAFunction varchar(50) = 'Get', -- (Save, Get, Delete)
	@EMailTypeId int = 0,
	@ContactEMail	varchar(200) = '',
	@PrimaryEMail varchar(250) = '' 	
)
--Explain
-- If @ContactEMailId = 0	and @CAFunction = Get 		Get ContactEMail List
-- If @ContactEMailId > 0	and @CAFunction = Get 		Get ContactEMail Record
-- If @ContactEMailId = 0	and @CAFunction = Save 		Add New ContactEMail
-- If @ContactEMailId > 0	and @CAFunction = Save 		Save ContactEMail Record
-- If @ContactEMailId > 0	and @CAFunction = Delete	Delete ContactEMail Record
AS 
BEGIN
BEGIN  TRY
Declare	@RunSql nvarchar(2000),
			@ParamDef  nvarchar(1000),
			@strDBName VARCHAR(MAX),
			@NewContactEMailId int


/* finding agency according to CAccountKey*/

		If @ContactEMailId = 0 and @CAFunction = 'Get'
			Begin
					SELECT CE.ContactEMailID, 
						CE.ContactID, 
						CE.EMailTypeID,
						CE.ContactEMail, 
						CE.PrimaryEMail, 
						DT.EMailType
					FROM  dbo.ContactEMail CE 
					INNER JOIN  dbo.lkpEmailType DT on (CE.EMailTypeId = DT.EMailTypeId)
					WHERE ContactId =  @ContactId  
					ORDER BY EmailSequence asc 
				
			End
		
		If @ContactEMailId > 0 and @CAFunction = 'Get'
			Begin
				 SELECT CE.EMailTypeID,
						CE.ContactEMail, 
						CE.PrimaryEMail, 
						DT.EMailType
					FROM  dbo.ContactEMail CE 
					INNER JOIN dbo.lkpEmailType DT on (CE.EMailTypeId = DT.EMailTypeId)
				WHERE  ContactEMailID = @ContactEMailId  
				
			End
		If @ContactEMailId = 0 and @CAFunction = 'Save'
			Begin
				If @PrimaryEMail = '1' or @PrimaryEMail = 'Yes'
					Begin
						 Update  dbo.ContactEMail
							Set PrimaryEmail = 0
							Where ContactId = @ContactId						
					End
				Set @ParamDef = '@NewContactEMailId int output'
				Set @Runsql = 'exec '+ @strDBName + '.dbo.ContactEMail_Insert ' + cast(@Contactid as varchar(200)) + ',
																									' + cast(@EMailTypeId as varchar(200)) + ',
																									''' + @ContactEMail + ''',
																									''' + @PrimaryEMail + ''',
																									@NewContactEMailId output '

				Print @Runsql
				Exec sp_executesql @Runsql,@ParamDef,@NewContactEMailId=@NewContactEMailId output
				Select @NewContactEMailId as ContactEMailId

			End

		If @ContactEMailId > 0 and @CAFunction = 'Save'
			Begin
				If @PrimaryEMail = '1' or @PrimaryEMail = 'Yes'
					Begin
						 Update  dbo.ContactEMail
							Set PrimaryEmail = 0
							Where ContactId =  @ContactId						
					End
				
				 exec  dbo.ContactEMail_Update  @ContactEMailId , @EMailTypeId , @ContactEMail , @PrimaryEMail  
				 Select @ContactEMailId as ContactEMailId
							
			End

		If @ContactEMailId > 0 and @CAFunction = 'Delete'
			Begin
				 Delete from dbo.ContactEMail 
									Where ContactEMailId = @ContactEMailId 

				Select @ContactEMailId as ContactEMailId
			End

END TRY
BEGIN CATCH
	Select 0 as ContactEMailId
END CATCH
END
