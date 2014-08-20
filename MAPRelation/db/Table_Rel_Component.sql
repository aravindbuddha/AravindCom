
/****** Object:  Table [dbo].[Rel_Component]    Script Date: 8/18/2014 1:14:51 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Rel_Component](
	[Rel_ComponentId] [int] IDENTITY(1,1) NOT NULL,
	[field_id] [int] NULL,
	[RelationshipSubTypeIds] [varchar](500) NULL,
	[RelationsshipTypeIds] [varchar](500) NULL,
	[SubForms] [varchar](500) NULL,
 CONSTRAINT [PK_Rel_Component] PRIMARY KEY CLUSTERED 
(
	[Rel_ComponentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


