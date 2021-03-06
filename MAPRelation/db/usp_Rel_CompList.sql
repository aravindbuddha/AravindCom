IF EXISTS(SELECT 1 FROM sys.Objects WHERE name=N'SP_RelationshipGridList' and type=N'P')
DROP PROC usp_Rel_CompList

GO

CREATE PROCEDURE [dbo].[usp_Rel_CompList]
    
    @Rel_ComponentId int
    ,@ConnId int
    ,@ConnectionId int  = 0
AS

Declare @Field_Id int
		,@RelationshipSubTypeIds varchar(500)
		,@RelationsshipTypeIds varchar(500)
		,@SubForms varchar(500)
		,@IndConnId1 varchar(500)
		,@IndConnId2 varchar(500)
		,@SqlQry varchar(max)

BEGIN
            
	Set @RelationshipSubTypeIds = ''
	Set @RelationsshipTypeIds = ''
	Set @SubForms = ''
	
    SELECT  @RelationshipSubTypeIds= RelationshipSubTypeIds
			,@RelationsshipTypeIds = RelationsshipTypeIds
			,@SubForms	 = SubForms
    FROM dbo.Rel_Component
    WHERE Rel_ComponentId = @Rel_ComponentId
    
	If @ConnId < 0
		Begin
			Set @IndConnId1 = @ConnId
			Set @IndConnId2 = 0
		End
	Else
		Begin
			Select @IndConnId1 = dbo.udf_CoupleConnId(@ConnId,1)
					,@IndConnId2 = coalesce(dbo.udf_CoupleConnId(@ConnId,2),0)
		End

 	Set @SqlQry = 'SELECT distinct r.ConnId as PrimaryConnId
				,r.DisplayName as PrimaryName
				,r2.ConnId as RelConnId
				,r2.DisplayName as RelName
				,rst.RelationshipSubTypeId
				,rst.RelationshipSubTypeText    
				,r2.connectionid as ConnectionId1
				,rt.RelationshipTypeId as RelTypeid1
				,rt.RelationshipTypeText as RelTypeText1
	    FROM dbo.Rel_Relationship r
		  inner join dbo.Rel_Relationship r2 on r.connectionid = r2.connectionid and (r2.Connid <> ' + @IndConnId1 + ' and r2.Connid <> ' + @IndConnId2 + ')
		  inner join dbo.Rel_lkp_RelationshipType rt on r2.RelationshipTypeId = rt.RelationshipTypeId
		  inner join dbo.Rel_lkp_RelationshipSubType rst on rt.RelationshipSubTypeId = rst.RelationshipSubTypeId
	    WHERE r.connid in (' + @IndConnId1 + ',' + @IndConnId2 + ')'
	    
	If @RelationsshipTypeIds <> ''
		Set @SqlQry = @SqlQry + '
			and r.RelationshipTypeId in (' + @RelationsshipTypeIds + ')'
			
	If @RelationshipSubTypeIds <> ''
		Set @SqlQry = @SqlQry + '
			and rst.RelationshipSubTypeId in (' + @RelationshipSubTypeIds + ')'

	If @ConnectionId <> 0
		Set @SqlQry = @SqlQry + '
			and r.ConnectionId = '+ @ConnectionId

	Set @SqlQry = @SqlQry + '
		Order by rst.RelationshipSubTypeId, rt.RelationshipTypeText'

 Print @SqlQry   
 EXEC(@SqlQry);   
 END
  





