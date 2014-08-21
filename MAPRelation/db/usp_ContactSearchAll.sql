IF EXISTS(SELECT 1 FROM sys.Objects WHERE Name =N'usp_ContactSearchAll' and TYpe=N'P')
DROP PROC usp_ContactSearchAll

GO

CREATE PROCEDURE usp_ContactSearchAll  
 @SearchName varchar(500) = ''    

AS  BEGIN   
 declare @strSql varchar(3000)    
 declare @strDBName varchar(max)  
 declare @prechk smallint   
 declare @pcheck  smallint 
  ,@strLName varchar(100) = ' '    
 ,@strFName varchar(100) = ' '    

  
	SELECT @strLName= LTRIM(SUBSTRING(@SearchName, 1, NULLIF(CHARINDEX(' ', @SearchName) - 1,-1))),
			  @strFName  = LTRIM(RTRIM(SUBSTRING(@SearchName, CHARINDEX(' ', @SearchName) + 1, LEN(@SearchName))))
	        
    
	SET @strFName=LTRIM(RTRIM(isnull(@strFName,'')))
	SET @strLName=LTRIM(RTRIM(isnull(@strLName,'')))
Print '@strFName = ' + @strFName
Print '@@strLName = ' + @strLName
	
If @strLName <> ''

	SELECT distinct
	Case
		when isnull(CT.FName,'') + isnull(CT.LName,'') = ''
			then CT.busname
		Else isnull(CT.FName,'') + ' ' +isnull(CT.LName,'')
	End			as FullName
  ,CP.PhoneNumber
  ,CT.ContactId * -1 as ConnId
  	,Case
		when isnull(CT.FName,'') + isnull(CT.LName,'') = ''
			then '1'
		Else '0'
	End			as IsBusiness
 
  FROM dbo.[Contact] CT  
  LEFT outer JOIN dbo.ContactPhone CP on CT.ContactID = CP.ContactID
  WHERE (CT.lname like @strLName + '%' and CT.Fname like @strFName + '%')
	or (CT.lname like @strFName + '%' and CT.Fname like @strLName + '%')
	 or CT.busname like @SearchName + '%'
--	 or CT.busname like @strFName + '%'
	order by FullName
	
Else
  SELECT distinct
	Case
		when isnull(CT.FName,'') + isnull(CT.LName,'') = ''
			then CT.busname
		Else isnull(CT.FName,'') + ' ' +isnull(CT.LName,'')
	End			as FullName
  ,CP.PhoneNumber
  ,CT.ContactId * -1 as ConnId
  ,Case
		when isnull(CT.FName,'') + isnull(CT.LName,'') = ''
			then '1'
		Else '0'
	End			as IsBusiness
  
  FROM dbo.[Contact] CT  
  LEFT outer JOIN dbo.ContactPhone CP on CT.ContactID = CP.ContactID
  WHERE (CT.Fname like @strFName + '%')
	or (CT.lname like @strFName + '%')
	 or CT.busname like @strFName + '%'
	order by FullName
	

 END

