CREATE TABLE [dbo].[tbl_api_access_log](
	[api_access_log_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[token] [varchar](max) NOT NULL,
	[date_authentication] [datetime] NOT NULL,
 CONSTRAINT [api_access_log_pkey] PRIMARY KEY CLUSTERED 
(
	[api_access_log_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]




CREATE TABLE [dbo].[tbl_api_access_token](
	[api_access_token_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[token] [varchar](max) NULL,
	[date_creation] [bigint] NULL,
	[date_expiration] [bigint] NULL,
	[active_status] [int] NOT NULL,
 CONSTRAINT [tbl_api_access_token_pkey] PRIMARY KEY CLUSTERED 
(
	[api_access_token_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]




CREATE TABLE [dbo].[tbl_api_allowed_origin](
	[api_allowed_origin_id] [int] IDENTITY(1,1) NOT NULL,
	[origin] [varchar](max) NOT NULL,
 CONSTRAINT [tbl_api_allowed_origin_pkey] PRIMARY KEY CLUSTERED 
(
	[api_allowed_origin_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]



CREATE TABLE [dbo].[tbl_api_secret](
	[api_secret_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[username] [varchar](max) NOT NULL,
	[first_name] [varchar](max) NOT NULL,
 CONSTRAINT [tbl_api_secret_pkey] PRIMARY KEY CLUSTERED 
(
	[api_secret_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]



CREATE TABLE [dbo].[tbl_api_secrets](
	[api_Secret_Id] [int] IDENTITY(1,1) NOT NULL,
	[User_Id] [int] NULL,
	[User_Email] [varchar](max) NULL,
	[User_first_last_name] [varchar](max) NULL,
 CONSTRAINT [PK_tbl_api_secrets] PRIMARY KEY CLUSTERED 
(
	[api_Secret_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
