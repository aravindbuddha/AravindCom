# This Makefile is for the Dancer extension to perl.
#
# It was generated automatically by MakeMaker version
# 6.30 (Revision: Revision: 4535 ) from the contents of
# Makefile.PL. Don't edit this file, edit Makefile.PL instead.
#
#       ANY CHANGES MADE HERE WILL BE LOST!
#
#   MakeMaker ARGV: ()
#
#   MakeMaker Parameters:

#     ABSTRACT => q[A minimal-effort oriented web application framework]
#     EXE_FILES => [q[script/dancer]]
#     NAME => q[Dancer]
#     PREREQ_PM => { HTTP::Server::Simple::PSGI=>q[0.11], Try::Tiny=>q[0.09], URI=>q[1.59], File::Spec=>q[0], HTTP::Body=>q[1.07], MIME::Types=>q[0], Time::HiRes=>q[0], Module::Runtime=>q[0], Encode=>q[0], Test::More=>q[0.94], File::Basename=>q[0], LWP=>q[0] }
#     VERSION_FROM => q[lib/Dancer.pm]
#     clean => { FILES=>q[t/lib/sessions/*.yml logs/*.log t/*/logs/*] }
#     test => { TESTS=>q[t/manifest.t t/pod.t t/00_base/000_create_fake_env.t t/00_base/001_load.t t/00_base/002_strict_and_warnings.t t/00_base/003_syntax.t t/00_base/004_args.t t/00_base/005_module_loader.t t/00_base/007_load_syntax.t t/00_base/008_export.t t/00_base/009_syntax_export.t t/00_base/010_export_script.t t/00_base/06_dancer_object.t t/00_base/08_pod_coverage_dancer.t t/00_base/09_load_app.t t/00_base/11_file_utils.t t/00_base/12_utf8_charset.t t/00_base/13_dancer_singleton.t t/00_base/14_changelog.t t/00_base/15_dependent_modules.t t/00_base/16_version.t t/00_base/17_globalwarnings_config_on.t t/00_base/config.t t/00_base/normalize_path.t t/00_base/optional-module-versions.t t/00_base/uri_for.t t/01_config/01_settings.t t/01_config/02_mime_type.t t/01_config/03_logger.t t/01_config/04_config_file.t t/01_config/05_serializers.t t/01_config/06_config_api.t t/01_config/06_stack_trace.t t/01_config/07_strict_config.t t/01_config/08_environments.t t/01_config/yaml_dependency.t t/02_request/000_create_fake_env.t t/02_request/01_load.t t/02_request/04_custom.t t/02_request/04_forward.t t/02_request/05_cgi_pm_compat.t t/02_request/06_init_env.t t/02_request/07_raw_data.t t/02_request/08_params.t t/02_request/10_mixed_params.t t/02_request/11_accessors.t t/02_request/12_base.t t/02_request/13_ajax.t t/02_request/14_uploads.t t/02_request/15_headers.t t/02_request/16_delete.t t/02_request/17_uri_base.t t/02_request/18_param_accessor.t t/03_route_handler/01_http_methods.t t/03_route_handler/02_params.t t/03_route_handler/03_routes_api.t t/03_route_handler/04_routes_matching.t t/03_route_handler/04_wildcards_megasplat.t t/03_route_handler/05_filter.t t/03_route_handler/05_unicode.t t/03_route_handler/06_redirect.t t/03_route_handler/07_compilation_warning.t t/03_route_handler/08_errors.t t/03_route_handler/12_response.t t/03_route_handler/14_options.t t/03_route_handler/15_prefix.t t/03_route_handler/16_caching.t t/03_route_handler/18_auto_page.t t/03_route_handler/21_ajax.t t/03_route_handler/23_filter_error_catching.t t/03_route_handler/24_multiple_params.t t/03_route_handler/24_named_captures.t t/03_route_handler/28_plack_mount.t t/03_route_handler/29_forward.t t/03_route_handler/29_redirect_immediately.t t/03_route_handler/31_infinite_loop.t t/03_route_handler/33_vars.t t/03_route_handler/34_forward_body_post.t t/03_route_handler/35_no_further_routes.t t/03_route_handler/99_bugs.t t/04_static_file/001_base.t t/04_static_file/003_mime_types_reinit.t t/04_static_file/01_mime_types.t t/04_static_file/02_dir_traversal.t t/05_views/002_view_rendering.t t/05_views/03_layout.t t/06_helpers/000_create_fake_env.t t/06_helpers/01_send_file.t t/06_helpers/02_http_status.t t/06_helpers/03_content_type.t t/06_helpers/04_status.t t/06_helpers/05_send_error.t t/06_helpers/06_load.t t/07_apphandlers/000_create_fake_env.t t/07_apphandlers/01_base.t t/07_apphandlers/02_apache2_plack.t t/07_apphandlers/03_psgi_app.t t/07_apphandlers/04_standalone_app.t t/07_apphandlers/05_middlewares.t t/07_apphandlers/05_psgi_api.t t/07_apphandlers/06_debug.t t/07_apphandlers/07_middleware_map.t t/08_session/000_create_fake_env.t t/08_session/01_load.t t/08_session/02_dependency_check.t t/08_session/03_http_requests.t t/08_session/04_api.t t/08_session/05_yaml.t t/08_session/06_abstract.t t/08_session/07_session_expires.t t/08_session/08_simple.t t/08_session/09_session.t t/08_session/10_filter.t t/08_session/11_session_secure.t t/08_session/12_session_name.t t/08_session/13_session_httponly.t t/08_session/14_session_domain.t t/09_cookies/000_create_fake_env.t t/09_cookies/01_use.t t/09_cookies/02_cookie_object.t t/09_cookies/03_persistence.t t/09_cookies/04_secure.t t/09_cookies/05_api.t t/09_cookies/06_expires.t t/10_template/000_create_fake_env.t t/10_template/01_factory.t t/10_template/02_abstract_class.t t/10_template/03_simple.t t/10_template/05_template_toolkit.t t/10_template/extension.t t/10_template/template.t t/11_logger/000_create_fake_env.t t/11_logger/01_abstract.t t/11_logger/02_factory.t t/11_logger/03_file.t t/11_logger/04_console.t t/11_logger/05_format.t t/11_logger/06_null.t t/11_logger/07_diag.t t/11_logger/08_serialize.t t/11_logger/09_capture.t t/11_logger/10_note.t t/11_logger/11_runtime_file.t t/12_response/000_create_fake_env.t t/12_response/01_CRLF_injection.t t/12_response/02_headers.t t/12_response/03_charset.t t/12_response/04_charset_server.t t/12_response/05_api.t t/12_response/06_filter_halt_status.t t/12_response/07_cookies.t t/12_response/08_drop_content.t t/12_response/09_headers_to_array.t t/12_response/10_error_dumper.t t/12_response/11_CVE-2012-5572.t t/13_engines/00_load.t t/13_engines/02_template_init.t t/14_serializer/01_helpers.t t/14_serializer/02_request_json.t t/14_serializer/03_request_yaml.t t/14_serializer/04_request_xml.t t/14_serializer/05_request_mutable.t t/14_serializer/06_api.t t/14_serializer/17_clear_serializer.t t/14_serializer/99_bugs.t t/15_plugins/000_create_fake_env.t t/15_plugins/01_register.t t/15_plugins/02_config.t t/15_plugins/03_namespace.t t/15_plugins/04_apps_and_plugins.t t/15_plugins/05_keywords.t t/15_plugins/05_plugins_and_OO.t t/15_plugins/06_hook.t t/15_plugins/07_ajax_plack_builder.t t/16_timer/00_base.t t/17_apps/000_create_fake_env.t t/17_apps/00_base.t t/17_apps/01_settings.t t/17_apps/02_load_app.t t/17_apps/03_prefix.t t/17_apps/05_api.t t/19_dancer/01_script.t t/19_dancer/02_script_version_from.t t/20_deprecation/01_api.t t/21_dependents/Dancer-Session-Cookie.t t/22_hooks/00_syntax.t t/22_hooks/01_api.t t/22_hooks/02_before.t t/22_hooks/03_after.t t/22_hooks/04_template.t t/22_hooks/05_layout.t t/22_hooks/06_serializer.t t/22_hooks/07_file.t t/22_hooks/08_error.t t/22_hooks/09_before_error_init.t t/22_hooks/10_error_in_hook.t t/22_hooks/11_error_in_hook.t t/23_dancer_tests/01_basic.t t/23_dancer_tests/02_tests_functions.t t/24_deployment/01_multi_webapp.t t/25_exceptions/01_exceptions.t t/25_exceptions/02_exceptions.t t/25_exceptions/03_exceptions.t t/25_exceptions/04_exceptions_warn.t] }

# --- MakeMaker post_initialize section:


# --- MakeMaker const_config section:

# These definitions are from config.sh (via /usr/lib/perl5/5.8.8/msys/Config.pm)

# They may have been overridden via Makefile.PL or on the command line
AR = ar
CC = gcc
CCCDLFLAGS =  
CCDLFLAGS =  -s
DLEXT = dll
DLSRC = dl_dlopen.xs
LD = ld2
LDDLFLAGS =  -s
LDFLAGS =  -s
LIBC = /usr/lib/libmsys-1.0.dll.a
LIB_EXT = .a
OBJ_EXT = .o
OSNAME = msys
OSVERS = 1.0.11\(0.4632\)
RANLIB = :
SITELIBEXP = /usr/lib/perl5/site_perl/5.8.8
SITEARCHEXP = /usr/lib/perl5/site_perl/5.8.8/msys
SO = dll
EXE_EXT = .exe
FULL_AR = /bin/ar
VENDORARCHEXP = 
VENDORLIBEXP = 


# --- MakeMaker constants section:
AR_STATIC_ARGS = cr
DIRFILESEP = /
DFSEP = $(DIRFILESEP)
NAME = Dancer
NAME_SYM = Dancer
VERSION = 1.3124
VERSION_MACRO = VERSION
VERSION_SYM = 1_3124
DEFINE_VERSION = -D$(VERSION_MACRO)=\"$(VERSION)\"
XS_VERSION = 1.3124
XS_VERSION_MACRO = XS_VERSION
XS_DEFINE_VERSION = -D$(XS_VERSION_MACRO)=\"$(XS_VERSION)\"
INST_ARCHLIB = blib/arch
INST_SCRIPT = blib/script
INST_BIN = blib/bin
INST_LIB = blib/lib
INST_MAN1DIR = blib/man1
INST_MAN3DIR = blib/man3
MAN1EXT = 0
MAN3EXT = 0
INSTALLDIRS = site
DESTDIR = 
PREFIX = $(SITEPREFIX)
PERLPREFIX = /usr
SITEPREFIX = /usr
VENDORPREFIX = 
INSTALLPRIVLIB = /usr/lib/perl5/5.8.8
DESTINSTALLPRIVLIB = $(DESTDIR)$(INSTALLPRIVLIB)
INSTALLSITELIB = /usr/lib/perl5/site_perl/5.8.8
DESTINSTALLSITELIB = $(DESTDIR)$(INSTALLSITELIB)
INSTALLVENDORLIB = 
DESTINSTALLVENDORLIB = $(DESTDIR)$(INSTALLVENDORLIB)
INSTALLARCHLIB = /usr/lib/perl5/5.8.8/msys
DESTINSTALLARCHLIB = $(DESTDIR)$(INSTALLARCHLIB)
INSTALLSITEARCH = /usr/lib/perl5/site_perl/5.8.8/msys
DESTINSTALLSITEARCH = $(DESTDIR)$(INSTALLSITEARCH)
INSTALLVENDORARCH = 
DESTINSTALLVENDORARCH = $(DESTDIR)$(INSTALLVENDORARCH)
INSTALLBIN = /usr/bin
DESTINSTALLBIN = $(DESTDIR)$(INSTALLBIN)
INSTALLSITEBIN = /usr/bin
DESTINSTALLSITEBIN = $(DESTDIR)$(INSTALLSITEBIN)
INSTALLVENDORBIN = 
DESTINSTALLVENDORBIN = $(DESTDIR)$(INSTALLVENDORBIN)
INSTALLSCRIPT = /usr/bin
DESTINSTALLSCRIPT = $(DESTDIR)$(INSTALLSCRIPT)
INSTALLMAN1DIR = none
DESTINSTALLMAN1DIR = $(DESTDIR)$(INSTALLMAN1DIR)
INSTALLSITEMAN1DIR = $(INSTALLMAN1DIR)
DESTINSTALLSITEMAN1DIR = $(DESTDIR)$(INSTALLSITEMAN1DIR)
INSTALLVENDORMAN1DIR = 
DESTINSTALLVENDORMAN1DIR = $(DESTDIR)$(INSTALLVENDORMAN1DIR)
INSTALLMAN3DIR = none
DESTINSTALLMAN3DIR = $(DESTDIR)$(INSTALLMAN3DIR)
INSTALLSITEMAN3DIR = $(INSTALLMAN3DIR)
DESTINSTALLSITEMAN3DIR = $(DESTDIR)$(INSTALLSITEMAN3DIR)
INSTALLVENDORMAN3DIR = 
DESTINSTALLVENDORMAN3DIR = $(DESTDIR)$(INSTALLVENDORMAN3DIR)
PERL_LIB = /usr/lib/perl5/5.8.8
PERL_ARCHLIB = /usr/lib/perl5/5.8.8/msys
LIBPERL_A = libperl.a
FIRST_MAKEFILE = Makefile
MAKEFILE_OLD = Makefile.old
MAKE_APERL_FILE = Makefile.aperl
PERLMAINCC = $(CC)
PERL_INC = /usr/lib/perl5/5.8.8/msys/CORE
PERL = /usr/bin/perl.exe
FULLPERL = /usr/bin/perl.exe
ABSPERL = $(PERL)
PERLRUN = $(PERL)
FULLPERLRUN = $(FULLPERL)
ABSPERLRUN = $(ABSPERL)
PERLRUNINST = $(PERLRUN) "-I$(INST_ARCHLIB)" "-I$(INST_LIB)"
FULLPERLRUNINST = $(FULLPERLRUN) "-I$(INST_ARCHLIB)" "-I$(INST_LIB)"
ABSPERLRUNINST = $(ABSPERLRUN) "-I$(INST_ARCHLIB)" "-I$(INST_LIB)"
PERL_CORE = 0
PERM_RW = 644
PERM_RWX = 755

MAKEMAKER   = /usr/lib/perl5/5.8.8/ExtUtils/MakeMaker.pm
MM_VERSION  = 6.30
MM_REVISION = Revision: 4535 

# FULLEXT = Pathname for extension directory (eg Foo/Bar/Oracle).
# BASEEXT = Basename part of FULLEXT. May be just equal FULLEXT. (eg Oracle)
# PARENT_NAME = NAME without BASEEXT and no trailing :: (eg Foo::Bar)
# DLBASE  = Basename part of dynamic library. May be just equal BASEEXT.
FULLEXT = Dancer
BASEEXT = Dancer
PARENT_NAME = 
DLBASE = $(BASEEXT)
VERSION_FROM = lib/Dancer.pm
OBJECT = 
LDFROM = $(OBJECT)
LINKTYPE = dynamic
BOOTDEP = 

# Handy lists of source code files:
XS_FILES = 
C_FILES  = 
O_FILES  = 
H_FILES  = 
MAN1PODS = 
MAN3PODS = 

# Where is the Config information that we are using/depend on
CONFIGDEP = $(PERL_ARCHLIB)$(DFSEP)Config.pm $(PERL_INC)$(DFSEP)config.h

# Where to build things
INST_LIBDIR      = $(INST_LIB)
INST_ARCHLIBDIR  = $(INST_ARCHLIB)

INST_AUTODIR     = $(INST_LIB)/auto/$(FULLEXT)
INST_ARCHAUTODIR = $(INST_ARCHLIB)/auto/$(FULLEXT)

INST_STATIC      = 
INST_DYNAMIC     = 
INST_BOOT        = 

# Extra linker info
EXPORT_LIST        = 
PERL_ARCHIVE       = $(PERL_INC)/libperl.dll.a
PERL_ARCHIVE_AFTER = 


TO_INST_PM = lib/Dancer.pm \
	lib/Dancer/App.pm \
	lib/Dancer/Config.pm \
	lib/Dancer/Config/Object.pm \
	lib/Dancer/Continuation.pm \
	lib/Dancer/Continuation/Halted.pm \
	lib/Dancer/Continuation/Route.pm \
	lib/Dancer/Continuation/Route/ErrorSent.pm \
	lib/Dancer/Continuation/Route/FileSent.pm \
	lib/Dancer/Continuation/Route/Forwarded.pm \
	lib/Dancer/Continuation/Route/Passed.pm \
	lib/Dancer/Continuation/Route/Templated.pm \
	lib/Dancer/Cookbook.pod \
	lib/Dancer/Cookie.pm \
	lib/Dancer/Cookies.pm \
	lib/Dancer/Deployment.pod \
	lib/Dancer/Deprecation.pm \
	lib/Dancer/Development.pod \
	lib/Dancer/Development/Integration.pod \
	lib/Dancer/Engine.pm \
	lib/Dancer/Error.pm \
	lib/Dancer/Exception.pm \
	lib/Dancer/Exception/Base.pm \
	lib/Dancer/Factory/Hook.pm \
	lib/Dancer/FileUtils.pm \
	lib/Dancer/GetOpt.pm \
	lib/Dancer/HTTP.pm \
	lib/Dancer/Handler.pm \
	lib/Dancer/Handler/Debug.pm \
	lib/Dancer/Handler/PSGI.pm \
	lib/Dancer/Handler/Standalone.pm \
	lib/Dancer/Hook.pm \
	lib/Dancer/Hook/Properties.pm \
	lib/Dancer/Introduction.pod \
	lib/Dancer/Logger.pm \
	lib/Dancer/Logger/Abstract.pm \
	lib/Dancer/Logger/Capture.pm \
	lib/Dancer/Logger/Capture/Trap.pm \
	lib/Dancer/Logger/Console.pm \
	lib/Dancer/Logger/Diag.pm \
	lib/Dancer/Logger/File.pm \
	lib/Dancer/Logger/Note.pm \
	lib/Dancer/Logger/Null.pm \
	lib/Dancer/MIME.pm \
	lib/Dancer/ModuleLoader.pm \
	lib/Dancer/Object.pm \
	lib/Dancer/Object/Singleton.pm \
	lib/Dancer/Plugin.pm \
	lib/Dancer/Plugin/Ajax.pm \
	lib/Dancer/Plugins.pod \
	lib/Dancer/Renderer.pm \
	lib/Dancer/Request.pm \
	lib/Dancer/Request/Upload.pm \
	lib/Dancer/Response.pm \
	lib/Dancer/Route.pm \
	lib/Dancer/Route/Cache.pm \
	lib/Dancer/Route/Registry.pm \
	lib/Dancer/Serializer.pm \
	lib/Dancer/Serializer/Abstract.pm \
	lib/Dancer/Serializer/Dumper.pm \
	lib/Dancer/Serializer/JSON.pm \
	lib/Dancer/Serializer/Mutable.pm \
	lib/Dancer/Serializer/XML.pm \
	lib/Dancer/Serializer/YAML.pm \
	lib/Dancer/Session.pm \
	lib/Dancer/Session/Abstract.pm \
	lib/Dancer/Session/Simple.pm \
	lib/Dancer/Session/YAML.pm \
	lib/Dancer/SharedData.pm \
	lib/Dancer/Template.pm \
	lib/Dancer/Template/Abstract.pm \
	lib/Dancer/Template/Simple.pm \
	lib/Dancer/Template/TemplateToolkit.pm \
	lib/Dancer/Test.pm \
	lib/Dancer/Timer.pm \
	lib/Dancer/Tutorial.pod

PM_TO_BLIB = lib/Dancer/Session/Abstract.pm \
	blib/lib/Dancer/Session/Abstract.pm \
	lib/Dancer/Serializer/Mutable.pm \
	blib/lib/Dancer/Serializer/Mutable.pm \
	lib/Dancer/SharedData.pm \
	blib/lib/Dancer/SharedData.pm \
	lib/Dancer/Route.pm \
	blib/lib/Dancer/Route.pm \
	lib/Dancer/Plugin/Ajax.pm \
	blib/lib/Dancer/Plugin/Ajax.pm \
	lib/Dancer/Hook/Properties.pm \
	blib/lib/Dancer/Hook/Properties.pm \
	lib/Dancer/Hook.pm \
	blib/lib/Dancer/Hook.pm \
	lib/Dancer/Continuation.pm \
	blib/lib/Dancer/Continuation.pm \
	lib/Dancer/Logger/Abstract.pm \
	blib/lib/Dancer/Logger/Abstract.pm \
	lib/Dancer/Error.pm \
	blib/lib/Dancer/Error.pm \
	lib/Dancer/Logger.pm \
	blib/lib/Dancer/Logger.pm \
	lib/Dancer/Route/Registry.pm \
	blib/lib/Dancer/Route/Registry.pm \
	lib/Dancer/ModuleLoader.pm \
	blib/lib/Dancer/ModuleLoader.pm \
	lib/Dancer/Config.pm \
	blib/lib/Dancer/Config.pm \
	lib/Dancer/App.pm \
	blib/lib/Dancer/App.pm \
	lib/Dancer/GetOpt.pm \
	blib/lib/Dancer/GetOpt.pm \
	lib/Dancer/Object/Singleton.pm \
	blib/lib/Dancer/Object/Singleton.pm \
	lib/Dancer/Renderer.pm \
	blib/lib/Dancer/Renderer.pm \
	lib/Dancer/Exception/Base.pm \
	blib/lib/Dancer/Exception/Base.pm \
	lib/Dancer/Logger/File.pm \
	blib/lib/Dancer/Logger/File.pm \
	lib/Dancer/Continuation/Route/ErrorSent.pm \
	blib/lib/Dancer/Continuation/Route/ErrorSent.pm \
	lib/Dancer/Response.pm \
	blib/lib/Dancer/Response.pm \
	lib/Dancer/Tutorial.pod \
	blib/lib/Dancer/Tutorial.pod \
	lib/Dancer/HTTP.pm \
	blib/lib/Dancer/HTTP.pm \
	lib/Dancer/Object.pm \
	blib/lib/Dancer/Object.pm \
	lib/Dancer/Template/Abstract.pm \
	blib/lib/Dancer/Template/Abstract.pm \
	lib/Dancer/Serializer/YAML.pm \
	blib/lib/Dancer/Serializer/YAML.pm \
	lib/Dancer/Plugin.pm \
	blib/lib/Dancer/Plugin.pm \
	lib/Dancer/Handler/Standalone.pm \
	blib/lib/Dancer/Handler/Standalone.pm \
	lib/Dancer/Engine.pm \
	blib/lib/Dancer/Engine.pm \
	lib/Dancer/MIME.pm \
	blib/lib/Dancer/MIME.pm \
	lib/Dancer/Continuation/Halted.pm \
	blib/lib/Dancer/Continuation/Halted.pm \
	lib/Dancer/Development.pod \
	blib/lib/Dancer/Development.pod \
	lib/Dancer/Logger/Console.pm \
	blib/lib/Dancer/Logger/Console.pm \
	lib/Dancer/Continuation/Route/FileSent.pm \
	blib/lib/Dancer/Continuation/Route/FileSent.pm \
	lib/Dancer/Introduction.pod \
	blib/lib/Dancer/Introduction.pod \
	lib/Dancer/Logger/Note.pm \
	blib/lib/Dancer/Logger/Note.pm \
	lib/Dancer/Serializer/XML.pm \
	blib/lib/Dancer/Serializer/XML.pm \
	lib/Dancer/Plugins.pod \
	blib/lib/Dancer/Plugins.pod \
	lib/Dancer/Serializer/Dumper.pm \
	blib/lib/Dancer/Serializer/Dumper.pm \
	lib/Dancer/Route/Cache.pm \
	blib/lib/Dancer/Route/Cache.pm \
	lib/Dancer/Exception.pm \
	blib/lib/Dancer/Exception.pm \
	lib/Dancer/Continuation/Route/Passed.pm \
	blib/lib/Dancer/Continuation/Route/Passed.pm \
	lib/Dancer/Handler.pm \
	blib/lib/Dancer/Handler.pm \
	lib/Dancer/Timer.pm \
	blib/lib/Dancer/Timer.pm \
	lib/Dancer/Cookie.pm \
	blib/lib/Dancer/Cookie.pm \
	lib/Dancer/Request/Upload.pm \
	blib/lib/Dancer/Request/Upload.pm \
	lib/Dancer/Serializer/Abstract.pm \
	blib/lib/Dancer/Serializer/Abstract.pm \
	lib/Dancer/Session.pm \
	blib/lib/Dancer/Session.pm \
	lib/Dancer/Serializer.pm \
	blib/lib/Dancer/Serializer.pm \
	lib/Dancer.pm \
	blib/lib/Dancer.pm \
	lib/Dancer/Deployment.pod \
	blib/lib/Dancer/Deployment.pod \
	lib/Dancer/Continuation/Route/Templated.pm \
	blib/lib/Dancer/Continuation/Route/Templated.pm \
	lib/Dancer/Logger/Null.pm \
	blib/lib/Dancer/Logger/Null.pm \
	lib/Dancer/FileUtils.pm \
	blib/lib/Dancer/FileUtils.pm \
	lib/Dancer/Continuation/Route.pm \
	blib/lib/Dancer/Continuation/Route.pm \
	lib/Dancer/Handler/PSGI.pm \
	blib/lib/Dancer/Handler/PSGI.pm \
	lib/Dancer/Test.pm \
	blib/lib/Dancer/Test.pm \
	lib/Dancer/Development/Integration.pod \
	blib/lib/Dancer/Development/Integration.pod \
	lib/Dancer/Config/Object.pm \
	blib/lib/Dancer/Config/Object.pm \
	lib/Dancer/Continuation/Route/Forwarded.pm \
	blib/lib/Dancer/Continuation/Route/Forwarded.pm \
	lib/Dancer/Handler/Debug.pm \
	blib/lib/Dancer/Handler/Debug.pm \
	lib/Dancer/Template/Simple.pm \
	blib/lib/Dancer/Template/Simple.pm \
	lib/Dancer/Session/YAML.pm \
	blib/lib/Dancer/Session/YAML.pm \
	lib/Dancer/Serializer/JSON.pm \
	blib/lib/Dancer/Serializer/JSON.pm \
	lib/Dancer/Request.pm \
	blib/lib/Dancer/Request.pm \
	lib/Dancer/Cookies.pm \
	blib/lib/Dancer/Cookies.pm \
	lib/Dancer/Cookbook.pod \
	blib/lib/Dancer/Cookbook.pod \
	lib/Dancer/Logger/Capture.pm \
	blib/lib/Dancer/Logger/Capture.pm \
	lib/Dancer/Logger/Capture/Trap.pm \
	blib/lib/Dancer/Logger/Capture/Trap.pm \
	lib/Dancer/Deprecation.pm \
	blib/lib/Dancer/Deprecation.pm \
	lib/Dancer/Template.pm \
	blib/lib/Dancer/Template.pm \
	lib/Dancer/Session/Simple.pm \
	blib/lib/Dancer/Session/Simple.pm \
	lib/Dancer/Logger/Diag.pm \
	blib/lib/Dancer/Logger/Diag.pm \
	lib/Dancer/Factory/Hook.pm \
	blib/lib/Dancer/Factory/Hook.pm \
	lib/Dancer/Template/TemplateToolkit.pm \
	blib/lib/Dancer/Template/TemplateToolkit.pm


# --- MakeMaker platform_constants section:


# --- MakeMaker tool_autosplit section:
# Usage: $(AUTOSPLITFILE) FileToSplit AutoDirToSplitInto
AUTOSPLITFILE = $(ABSPERLRUN)  -e 'use AutoSplit;  autosplit($$ARGV[0], $$ARGV[1], 0, 1, 1)'



# --- MakeMaker tool_xsubpp section:


# --- MakeMaker tools_other section:
SHELL = /bin/sh
CHMOD = chmod
CP = cp
MV = mv
NOOP = $(SHELL) -c true
NOECHO = @
RM_F = rm -f
RM_RF = rm -rf
TEST_F = test -f
TOUCH = touch
UMASK_NULL = umask 0
DEV_NULL = > /dev/null 2>&1
MKPATH = $(ABSPERLRUN) "-MExtUtils::Command" -e mkpath
EQUALIZE_TIMESTAMP = $(ABSPERLRUN) "-MExtUtils::Command" -e eqtime
ECHO = echo
ECHO_N = echo -n
UNINST = 0
VERBINST = 0
MOD_INSTALL = $(ABSPERLRUN) -MExtUtils::Install -e 'install({@ARGV}, '\''$(VERBINST)'\'', 0, '\''$(UNINST)'\'');'
DOC_INSTALL = $(ABSPERLRUN) "-MExtUtils::Command::MM" -e perllocal_install
UNINSTALL = $(ABSPERLRUN) "-MExtUtils::Command::MM" -e uninstall
WARN_IF_OLD_PACKLIST = $(ABSPERLRUN) "-MExtUtils::Command::MM" -e warn_if_old_packlist
MACROSTART = 
MACROEND = 
USEMAKEFILE = -f
FIXIN = $(PERLRUN) "-MExtUtils::MY" -e "MY->fixin(shift)"


# --- MakeMaker makemakerdflt section:
makemakerdflt: all
	$(NOECHO) $(NOOP)


# --- MakeMaker dist section:
TAR = tar
TARFLAGS = cvf
ZIP = zip
ZIPFLAGS = -r
COMPRESS = gzip --best
SUFFIX = .gz
SHAR = shar
PREOP = $(NOECHO) $(NOOP)
POSTOP = $(NOECHO) $(NOOP)
TO_UNIX = $(NOECHO) $(NOOP)
CI = ci -u
RCS_LABEL = rcs -Nv$(VERSION_SYM): -q
DIST_CP = best
DIST_DEFAULT = tardist
DISTNAME = Dancer
DISTVNAME = Dancer-1.3124


# --- MakeMaker macro section:


# --- MakeMaker depend section:


# --- MakeMaker cflags section:


# --- MakeMaker const_loadlibs section:


# --- MakeMaker const_cccmd section:


# --- MakeMaker post_constants section:


# --- MakeMaker pasthru section:

PASTHRU = LIBPERL_A="$(LIBPERL_A)"\
	LINKTYPE="$(LINKTYPE)"\
	PREFIX="$(PREFIX)"


# --- MakeMaker special_targets section:
.SUFFIXES : .xs .c .C .cpp .i .s .cxx .cc $(OBJ_EXT)

.PHONY: all config static dynamic test linkext manifest blibdirs clean realclean disttest distdir



# --- MakeMaker c_o section:


# --- MakeMaker xs_c section:


# --- MakeMaker xs_o section:


# --- MakeMaker top_targets section:
all :: pure_all
	$(NOECHO) $(NOOP)


pure_all :: config pm_to_blib subdirs linkext
	$(NOECHO) $(NOOP)

subdirs :: $(MYEXTLIB)
	$(NOECHO) $(NOOP)

config :: $(FIRST_MAKEFILE) blibdirs
	$(NOECHO) $(NOOP)

help :
	perldoc ExtUtils::MakeMaker


# --- MakeMaker blibdirs section:
blibdirs : $(INST_LIBDIR)$(DFSEP).exists $(INST_ARCHLIB)$(DFSEP).exists $(INST_AUTODIR)$(DFSEP).exists $(INST_ARCHAUTODIR)$(DFSEP).exists $(INST_BIN)$(DFSEP).exists $(INST_SCRIPT)$(DFSEP).exists $(INST_MAN1DIR)$(DFSEP).exists $(INST_MAN3DIR)$(DFSEP).exists
	$(NOECHO) $(NOOP)

# Backwards compat with 6.18 through 6.25
blibdirs.ts : blibdirs
	$(NOECHO) $(NOOP)

$(INST_LIBDIR)$(DFSEP).exists :: Makefile.PL
	$(NOECHO) $(MKPATH) $(INST_LIBDIR)
	$(NOECHO) $(CHMOD) 755 $(INST_LIBDIR)
	$(NOECHO) $(TOUCH) $(INST_LIBDIR)$(DFSEP).exists

$(INST_ARCHLIB)$(DFSEP).exists :: Makefile.PL
	$(NOECHO) $(MKPATH) $(INST_ARCHLIB)
	$(NOECHO) $(CHMOD) 755 $(INST_ARCHLIB)
	$(NOECHO) $(TOUCH) $(INST_ARCHLIB)$(DFSEP).exists

$(INST_AUTODIR)$(DFSEP).exists :: Makefile.PL
	$(NOECHO) $(MKPATH) $(INST_AUTODIR)
	$(NOECHO) $(CHMOD) 755 $(INST_AUTODIR)
	$(NOECHO) $(TOUCH) $(INST_AUTODIR)$(DFSEP).exists

$(INST_ARCHAUTODIR)$(DFSEP).exists :: Makefile.PL
	$(NOECHO) $(MKPATH) $(INST_ARCHAUTODIR)
	$(NOECHO) $(CHMOD) 755 $(INST_ARCHAUTODIR)
	$(NOECHO) $(TOUCH) $(INST_ARCHAUTODIR)$(DFSEP).exists

$(INST_BIN)$(DFSEP).exists :: Makefile.PL
	$(NOECHO) $(MKPATH) $(INST_BIN)
	$(NOECHO) $(CHMOD) 755 $(INST_BIN)
	$(NOECHO) $(TOUCH) $(INST_BIN)$(DFSEP).exists

$(INST_SCRIPT)$(DFSEP).exists :: Makefile.PL
	$(NOECHO) $(MKPATH) $(INST_SCRIPT)
	$(NOECHO) $(CHMOD) 755 $(INST_SCRIPT)
	$(NOECHO) $(TOUCH) $(INST_SCRIPT)$(DFSEP).exists

$(INST_MAN1DIR)$(DFSEP).exists :: Makefile.PL
	$(NOECHO) $(MKPATH) $(INST_MAN1DIR)
	$(NOECHO) $(CHMOD) 755 $(INST_MAN1DIR)
	$(NOECHO) $(TOUCH) $(INST_MAN1DIR)$(DFSEP).exists

$(INST_MAN3DIR)$(DFSEP).exists :: Makefile.PL
	$(NOECHO) $(MKPATH) $(INST_MAN3DIR)
	$(NOECHO) $(CHMOD) 755 $(INST_MAN3DIR)
	$(NOECHO) $(TOUCH) $(INST_MAN3DIR)$(DFSEP).exists



# --- MakeMaker linkext section:

linkext :: $(LINKTYPE)
	$(NOECHO) $(NOOP)


# --- MakeMaker dlsyms section:


# --- MakeMaker dynamic section:

dynamic :: $(FIRST_MAKEFILE) $(INST_DYNAMIC) $(INST_BOOT)
	$(NOECHO) $(NOOP)


# --- MakeMaker dynamic_bs section:

BOOTSTRAP =


# --- MakeMaker dynamic_lib section:


# --- MakeMaker static section:

## $(INST_PM) has been moved to the all: target.
## It remains here for awhile to allow for old usage: "make static"
static :: $(FIRST_MAKEFILE) $(INST_STATIC)
	$(NOECHO) $(NOOP)


# --- MakeMaker static_lib section:


# --- MakeMaker manifypods section:

POD2MAN_EXE = $(PERLRUN) "-MExtUtils::Command::MM" -e pod2man "--"
POD2MAN = $(POD2MAN_EXE)


manifypods : pure_all 
	$(NOECHO) $(NOOP)




# --- MakeMaker processPL section:


# --- MakeMaker installbin section:

EXE_FILES = script/dancer

pure_all :: $(INST_SCRIPT)/dancer
	$(NOECHO) $(NOOP)

realclean ::
	$(RM_F) \
	  $(INST_SCRIPT)/dancer 

$(INST_SCRIPT)/dancer : script/dancer $(FIRST_MAKEFILE) $(INST_SCRIPT)$(DFSEP).exists $(INST_BIN)$(DFSEP).exists
	$(NOECHO) $(RM_F) $(INST_SCRIPT)/dancer
	$(CP) script/dancer $(INST_SCRIPT)/dancer
	$(FIXIN) $(INST_SCRIPT)/dancer
	-$(NOECHO) $(CHMOD) $(PERM_RWX) $(INST_SCRIPT)/dancer



# --- MakeMaker subdirs section:

# none

# --- MakeMaker clean_subdirs section:
clean_subdirs :
	$(NOECHO) $(NOOP)


# --- MakeMaker clean section:

# Delete temporary files but do not touch installed files. We don't delete
# the Makefile here so a later make realclean still has a makefile to use.

clean :: clean_subdirs
	- $(RM_F) \
	  *$(LIB_EXT) core \
	  core.[0-9] $(INST_ARCHAUTODIR)/extralibs.all \
	  core.[0-9][0-9] $(BASEEXT).bso \
	  pm_to_blib.ts core.[0-9][0-9][0-9][0-9] \
	  $(BASEEXT).x $(BOOTSTRAP) \
	  perl$(EXE_EXT) tmon.out \
	  *$(OBJ_EXT) pm_to_blib \
	  $(INST_ARCHAUTODIR)/extralibs.ld blibdirs.ts \
	  core.[0-9][0-9][0-9][0-9][0-9] *perl.core \
	  core.*perl.*.? $(MAKE_APERL_FILE) \
	  perl $(BASEEXT).def \
	  core.[0-9][0-9][0-9] mon.out \
	  lib$(BASEEXT).def perlmain.c \
	  perl.exe so_locations \
	  $(BASEEXT).exp 
	- $(RM_RF) \
	  logs/*.log t/*/logs/* \
	  t/lib/sessions/*.yml blib 
	- $(MV) $(FIRST_MAKEFILE) $(MAKEFILE_OLD) $(DEV_NULL)


# --- MakeMaker realclean_subdirs section:
realclean_subdirs :
	$(NOECHO) $(NOOP)


# --- MakeMaker realclean section:
# Delete temporary files (via clean) and also delete dist files
realclean purge ::  clean realclean_subdirs
	- $(RM_F) \
	  $(MAKEFILE_OLD) $(FIRST_MAKEFILE) 
	- $(RM_RF) \
	  $(DISTVNAME) 


# --- MakeMaker metafile section:
metafile : create_distdir
	$(NOECHO) $(ECHO) Generating META.yml
	$(NOECHO) $(ECHO) '# http://module-build.sourceforge.net/META-spec.html' > META_new.yml
	$(NOECHO) $(ECHO) '#XXXXXXX This is a prototype!!!  It will change in the future!!! XXXXX#' >> META_new.yml
	$(NOECHO) $(ECHO) 'name:         Dancer' >> META_new.yml
	$(NOECHO) $(ECHO) 'version:      1.3124' >> META_new.yml
	$(NOECHO) $(ECHO) 'version_from: lib/Dancer.pm' >> META_new.yml
	$(NOECHO) $(ECHO) 'installdirs:  site' >> META_new.yml
	$(NOECHO) $(ECHO) 'requires:' >> META_new.yml
	$(NOECHO) $(ECHO) '    Encode:                        0' >> META_new.yml
	$(NOECHO) $(ECHO) '    File::Basename:                0' >> META_new.yml
	$(NOECHO) $(ECHO) '    File::Spec:                    0' >> META_new.yml
	$(NOECHO) $(ECHO) '    HTTP::Body:                    1.07' >> META_new.yml
	$(NOECHO) $(ECHO) '    HTTP::Server::Simple::PSGI:    0.11' >> META_new.yml
	$(NOECHO) $(ECHO) '    LWP:                           0' >> META_new.yml
	$(NOECHO) $(ECHO) '    MIME::Types:                   0' >> META_new.yml
	$(NOECHO) $(ECHO) '    Module::Runtime:               0' >> META_new.yml
	$(NOECHO) $(ECHO) '    Test::More:                    0.94' >> META_new.yml
	$(NOECHO) $(ECHO) '    Time::HiRes:                   0' >> META_new.yml
	$(NOECHO) $(ECHO) '    Try::Tiny:                     0.09' >> META_new.yml
	$(NOECHO) $(ECHO) '    URI:                           1.59' >> META_new.yml
	$(NOECHO) $(ECHO) '' >> META_new.yml
	$(NOECHO) $(ECHO) 'distribution_type: module' >> META_new.yml
	$(NOECHO) $(ECHO) 'generated_by: ExtUtils::MakeMaker version 6.30' >> META_new.yml
	-$(NOECHO) $(MV) META_new.yml $(DISTVNAME)/META.yml


# --- MakeMaker signature section:
signature :
	cpansign -s


# --- MakeMaker dist_basics section:
distclean :: realclean distcheck
	$(NOECHO) $(NOOP)

distcheck :
	$(PERLRUN) "-MExtUtils::Manifest=fullcheck" -e fullcheck

skipcheck :
	$(PERLRUN) "-MExtUtils::Manifest=skipcheck" -e skipcheck

manifest :
	$(PERLRUN) "-MExtUtils::Manifest=mkmanifest" -e mkmanifest

veryclean : realclean
	$(RM_F) *~ *.orig */*~ */*.orig



# --- MakeMaker dist_core section:

dist : $(DIST_DEFAULT) $(FIRST_MAKEFILE)
	$(NOECHO) $(ABSPERLRUN) -l -e 'print '\''Warning: Makefile possibly out of date with $(VERSION_FROM)'\''' \
	  -e '    if -e '\''$(VERSION_FROM)'\'' and -M '\''$(VERSION_FROM)'\'' < -M '\''$(FIRST_MAKEFILE)'\'';'

tardist : $(DISTVNAME).tar$(SUFFIX)
	$(NOECHO) $(NOOP)

uutardist : $(DISTVNAME).tar$(SUFFIX)
	uuencode $(DISTVNAME).tar$(SUFFIX) $(DISTVNAME).tar$(SUFFIX) > $(DISTVNAME).tar$(SUFFIX)_uu

$(DISTVNAME).tar$(SUFFIX) : distdir
	$(PREOP)
	$(TO_UNIX)
	$(TAR) $(TARFLAGS) $(DISTVNAME).tar $(DISTVNAME)
	$(RM_RF) $(DISTVNAME)
	$(COMPRESS) $(DISTVNAME).tar
	$(POSTOP)

zipdist : $(DISTVNAME).zip
	$(NOECHO) $(NOOP)

$(DISTVNAME).zip : distdir
	$(PREOP)
	$(ZIP) $(ZIPFLAGS) $(DISTVNAME).zip $(DISTVNAME)
	$(RM_RF) $(DISTVNAME)
	$(POSTOP)

shdist : distdir
	$(PREOP)
	$(SHAR) $(DISTVNAME) > $(DISTVNAME).shar
	$(RM_RF) $(DISTVNAME)
	$(POSTOP)


# --- MakeMaker distdir section:
create_distdir :
	$(RM_RF) $(DISTVNAME)
	$(PERLRUN) "-MExtUtils::Manifest=manicopy,maniread" \
		-e "manicopy(maniread(),'$(DISTVNAME)', '$(DIST_CP)');"

distdir : create_distdir distmeta 
	$(NOECHO) $(NOOP)



# --- MakeMaker dist_test section:
disttest : distdir
	cd $(DISTVNAME) && $(ABSPERLRUN) Makefile.PL 
	cd $(DISTVNAME) && $(MAKE) $(PASTHRU)
	cd $(DISTVNAME) && $(MAKE) test $(PASTHRU)



# --- MakeMaker dist_ci section:

ci :
	$(PERLRUN) "-MExtUtils::Manifest=maniread" \
	  -e "@all = keys %{ maniread() };" \
	  -e "print(qq{Executing $(CI) @all\n}); system(qq{$(CI) @all});" \
	  -e "print(qq{Executing $(RCS_LABEL) ...\n}); system(qq{$(RCS_LABEL) @all});"


# --- MakeMaker distmeta section:
distmeta : create_distdir metafile
	$(NOECHO) cd $(DISTVNAME) && $(ABSPERLRUN) -MExtUtils::Manifest=maniadd -e 'eval { maniadd({q{META.yml} => q{Module meta-data (added by MakeMaker)}}) } ' \
	  -e '    or print "Could not add META.yml to MANIFEST: $${'\''@'\''}\n"'



# --- MakeMaker distsignature section:
distsignature : create_distdir
	$(NOECHO) cd $(DISTVNAME) && $(ABSPERLRUN) -MExtUtils::Manifest=maniadd -e 'eval { maniadd({q{SIGNATURE} => q{Public-key signature (added by MakeMaker)}}) } ' \
	  -e '    or print "Could not add SIGNATURE to MANIFEST: $${'\''@'\''}\n"'
	$(NOECHO) cd $(DISTVNAME) && $(TOUCH) SIGNATURE
	cd $(DISTVNAME) && cpansign -s



# --- MakeMaker install section:

install :: all pure_install doc_install
	$(NOECHO) $(NOOP)

install_perl :: all pure_perl_install doc_perl_install
	$(NOECHO) $(NOOP)

install_site :: all pure_site_install doc_site_install
	$(NOECHO) $(NOOP)

install_vendor :: all pure_vendor_install doc_vendor_install
	$(NOECHO) $(NOOP)

pure_install :: pure_$(INSTALLDIRS)_install
	$(NOECHO) $(NOOP)

doc_install :: doc_$(INSTALLDIRS)_install
	$(NOECHO) $(NOOP)

pure__install : pure_site_install
	$(NOECHO) $(ECHO) INSTALLDIRS not defined, defaulting to INSTALLDIRS=site

doc__install : doc_site_install
	$(NOECHO) $(ECHO) INSTALLDIRS not defined, defaulting to INSTALLDIRS=site

pure_perl_install ::
	$(NOECHO) $(MOD_INSTALL) \
		read $(PERL_ARCHLIB)/auto/$(FULLEXT)/.packlist \
		write $(DESTINSTALLARCHLIB)/auto/$(FULLEXT)/.packlist \
		$(INST_LIB) $(DESTINSTALLPRIVLIB) \
		$(INST_ARCHLIB) $(DESTINSTALLARCHLIB) \
		$(INST_BIN) $(DESTINSTALLBIN) \
		$(INST_SCRIPT) $(DESTINSTALLSCRIPT) \
		$(INST_MAN1DIR) $(DESTINSTALLMAN1DIR) \
		$(INST_MAN3DIR) $(DESTINSTALLMAN3DIR)
	$(NOECHO) $(WARN_IF_OLD_PACKLIST) \
		$(SITEARCHEXP)/auto/$(FULLEXT)


pure_site_install ::
	$(NOECHO) $(MOD_INSTALL) \
		read $(SITEARCHEXP)/auto/$(FULLEXT)/.packlist \
		write $(DESTINSTALLSITEARCH)/auto/$(FULLEXT)/.packlist \
		$(INST_LIB) $(DESTINSTALLSITELIB) \
		$(INST_ARCHLIB) $(DESTINSTALLSITEARCH) \
		$(INST_BIN) $(DESTINSTALLSITEBIN) \
		$(INST_SCRIPT) $(DESTINSTALLSCRIPT) \
		$(INST_MAN1DIR) $(DESTINSTALLSITEMAN1DIR) \
		$(INST_MAN3DIR) $(DESTINSTALLSITEMAN3DIR)
	$(NOECHO) $(WARN_IF_OLD_PACKLIST) \
		$(PERL_ARCHLIB)/auto/$(FULLEXT)

pure_vendor_install ::
	$(NOECHO) $(MOD_INSTALL) \
		read $(VENDORARCHEXP)/auto/$(FULLEXT)/.packlist \
		write $(DESTINSTALLVENDORARCH)/auto/$(FULLEXT)/.packlist \
		$(INST_LIB) $(DESTINSTALLVENDORLIB) \
		$(INST_ARCHLIB) $(DESTINSTALLVENDORARCH) \
		$(INST_BIN) $(DESTINSTALLVENDORBIN) \
		$(INST_SCRIPT) $(DESTINSTALLSCRIPT) \
		$(INST_MAN1DIR) $(DESTINSTALLVENDORMAN1DIR) \
		$(INST_MAN3DIR) $(DESTINSTALLVENDORMAN3DIR)

doc_perl_install ::
	$(NOECHO) $(ECHO) Appending installation info to $(DESTINSTALLARCHLIB)/perllocal.pod
	-$(NOECHO) $(MKPATH) $(DESTINSTALLARCHLIB)
	-$(NOECHO) $(DOC_INSTALL) \
		"Module" "$(NAME)" \
		"installed into" "$(INSTALLPRIVLIB)" \
		LINKTYPE "$(LINKTYPE)" \
		VERSION "$(VERSION)" \
		EXE_FILES "$(EXE_FILES)" \
		>> $(DESTINSTALLARCHLIB)/perllocal.pod

doc_site_install ::
	$(NOECHO) $(ECHO) Appending installation info to $(DESTINSTALLARCHLIB)/perllocal.pod
	-$(NOECHO) $(MKPATH) $(DESTINSTALLARCHLIB)
	-$(NOECHO) $(DOC_INSTALL) \
		"Module" "$(NAME)" \
		"installed into" "$(INSTALLSITELIB)" \
		LINKTYPE "$(LINKTYPE)" \
		VERSION "$(VERSION)" \
		EXE_FILES "$(EXE_FILES)" \
		>> $(DESTINSTALLARCHLIB)/perllocal.pod

doc_vendor_install ::
	$(NOECHO) $(ECHO) Appending installation info to $(DESTINSTALLARCHLIB)/perllocal.pod
	-$(NOECHO) $(MKPATH) $(DESTINSTALLARCHLIB)
	-$(NOECHO) $(DOC_INSTALL) \
		"Module" "$(NAME)" \
		"installed into" "$(INSTALLVENDORLIB)" \
		LINKTYPE "$(LINKTYPE)" \
		VERSION "$(VERSION)" \
		EXE_FILES "$(EXE_FILES)" \
		>> $(DESTINSTALLARCHLIB)/perllocal.pod


uninstall :: uninstall_from_$(INSTALLDIRS)dirs
	$(NOECHO) $(NOOP)

uninstall_from_perldirs ::
	$(NOECHO) $(UNINSTALL) $(PERL_ARCHLIB)/auto/$(FULLEXT)/.packlist

uninstall_from_sitedirs ::
	$(NOECHO) $(UNINSTALL) $(SITEARCHEXP)/auto/$(FULLEXT)/.packlist

uninstall_from_vendordirs ::
	$(NOECHO) $(UNINSTALL) $(VENDORARCHEXP)/auto/$(FULLEXT)/.packlist


# --- MakeMaker force section:
# Phony target to force checking subdirectories.
FORCE:
	$(NOECHO) $(NOOP)


# --- MakeMaker perldepend section:


# --- MakeMaker makefile section:
# We take a very conservative approach here, but it's worth it.
# We move Makefile to Makefile.old here to avoid gnu make looping.
$(FIRST_MAKEFILE) : Makefile.PL $(CONFIGDEP)
	$(NOECHO) $(ECHO) "Makefile out-of-date with respect to $?"
	$(NOECHO) $(ECHO) "Cleaning current config before rebuilding Makefile..."
	-$(NOECHO) $(RM_F) $(MAKEFILE_OLD)
	-$(NOECHO) $(MV)   $(FIRST_MAKEFILE) $(MAKEFILE_OLD)
	- $(MAKE) $(USEMAKEFILE) $(MAKEFILE_OLD) clean $(DEV_NULL)
	$(PERLRUN) Makefile.PL 
	$(NOECHO) $(ECHO) "==> Your Makefile has been rebuilt. <=="
	$(NOECHO) $(ECHO) "==> Please rerun the $(MAKE) command.  <=="
	false



# --- MakeMaker staticmake section:

# --- MakeMaker makeaperl section ---
MAP_TARGET    = perl
FULLPERL      = /usr/bin/perl.exe

$(MAP_TARGET) :: static $(MAKE_APERL_FILE)
	$(MAKE) $(USEMAKEFILE) $(MAKE_APERL_FILE) $@

$(MAKE_APERL_FILE) : $(FIRST_MAKEFILE) pm_to_blib
	$(NOECHO) $(ECHO) Writing \"$(MAKE_APERL_FILE)\" for this $(MAP_TARGET)
	$(NOECHO) $(PERLRUNINST) \
		Makefile.PL DIR= \
		MAKEFILE=$(MAKE_APERL_FILE) LINKTYPE=static \
		MAKEAPERL=1 NORECURS=1 CCCDLFLAGS=


# --- MakeMaker test section:

TEST_VERBOSE=0
TEST_TYPE=test_$(LINKTYPE)
TEST_FILE = test.pl
TEST_FILES = t/manifest.t t/pod.t t/00_base/000_create_fake_env.t t/00_base/001_load.t t/00_base/002_strict_and_warnings.t t/00_base/003_syntax.t t/00_base/004_args.t t/00_base/005_module_loader.t t/00_base/007_load_syntax.t t/00_base/008_export.t t/00_base/009_syntax_export.t t/00_base/010_export_script.t t/00_base/06_dancer_object.t t/00_base/08_pod_coverage_dancer.t t/00_base/09_load_app.t t/00_base/11_file_utils.t t/00_base/12_utf8_charset.t t/00_base/13_dancer_singleton.t t/00_base/14_changelog.t t/00_base/15_dependent_modules.t t/00_base/16_version.t t/00_base/17_globalwarnings_config_on.t t/00_base/config.t t/00_base/normalize_path.t t/00_base/optional-module-versions.t t/00_base/uri_for.t t/01_config/01_settings.t t/01_config/02_mime_type.t t/01_config/03_logger.t t/01_config/04_config_file.t t/01_config/05_serializers.t t/01_config/06_config_api.t t/01_config/06_stack_trace.t t/01_config/07_strict_config.t t/01_config/08_environments.t t/01_config/yaml_dependency.t t/02_request/000_create_fake_env.t t/02_request/01_load.t t/02_request/04_custom.t t/02_request/04_forward.t t/02_request/05_cgi_pm_compat.t t/02_request/06_init_env.t t/02_request/07_raw_data.t t/02_request/08_params.t t/02_request/10_mixed_params.t t/02_request/11_accessors.t t/02_request/12_base.t t/02_request/13_ajax.t t/02_request/14_uploads.t t/02_request/15_headers.t t/02_request/16_delete.t t/02_request/17_uri_base.t t/02_request/18_param_accessor.t t/03_route_handler/01_http_methods.t t/03_route_handler/02_params.t t/03_route_handler/03_routes_api.t t/03_route_handler/04_routes_matching.t t/03_route_handler/04_wildcards_megasplat.t t/03_route_handler/05_filter.t t/03_route_handler/05_unicode.t t/03_route_handler/06_redirect.t t/03_route_handler/07_compilation_warning.t t/03_route_handler/08_errors.t t/03_route_handler/12_response.t t/03_route_handler/14_options.t t/03_route_handler/15_prefix.t t/03_route_handler/16_caching.t t/03_route_handler/18_auto_page.t t/03_route_handler/21_ajax.t t/03_route_handler/23_filter_error_catching.t t/03_route_handler/24_multiple_params.t t/03_route_handler/24_named_captures.t t/03_route_handler/28_plack_mount.t t/03_route_handler/29_forward.t t/03_route_handler/29_redirect_immediately.t t/03_route_handler/31_infinite_loop.t t/03_route_handler/33_vars.t t/03_route_handler/34_forward_body_post.t t/03_route_handler/35_no_further_routes.t t/03_route_handler/99_bugs.t t/04_static_file/001_base.t t/04_static_file/003_mime_types_reinit.t t/04_static_file/01_mime_types.t t/04_static_file/02_dir_traversal.t t/05_views/002_view_rendering.t t/05_views/03_layout.t t/06_helpers/000_create_fake_env.t t/06_helpers/01_send_file.t t/06_helpers/02_http_status.t t/06_helpers/03_content_type.t t/06_helpers/04_status.t t/06_helpers/05_send_error.t t/06_helpers/06_load.t t/07_apphandlers/000_create_fake_env.t t/07_apphandlers/01_base.t t/07_apphandlers/02_apache2_plack.t t/07_apphandlers/03_psgi_app.t t/07_apphandlers/04_standalone_app.t t/07_apphandlers/05_middlewares.t t/07_apphandlers/05_psgi_api.t t/07_apphandlers/06_debug.t t/07_apphandlers/07_middleware_map.t t/08_session/000_create_fake_env.t t/08_session/01_load.t t/08_session/02_dependency_check.t t/08_session/03_http_requests.t t/08_session/04_api.t t/08_session/05_yaml.t t/08_session/06_abstract.t t/08_session/07_session_expires.t t/08_session/08_simple.t t/08_session/09_session.t t/08_session/10_filter.t t/08_session/11_session_secure.t t/08_session/12_session_name.t t/08_session/13_session_httponly.t t/08_session/14_session_domain.t t/09_cookies/000_create_fake_env.t t/09_cookies/01_use.t t/09_cookies/02_cookie_object.t t/09_cookies/03_persistence.t t/09_cookies/04_secure.t t/09_cookies/05_api.t t/09_cookies/06_expires.t t/10_template/000_create_fake_env.t t/10_template/01_factory.t t/10_template/02_abstract_class.t t/10_template/03_simple.t t/10_template/05_template_toolkit.t t/10_template/extension.t t/10_template/template.t t/11_logger/000_create_fake_env.t t/11_logger/01_abstract.t t/11_logger/02_factory.t t/11_logger/03_file.t t/11_logger/04_console.t t/11_logger/05_format.t t/11_logger/06_null.t t/11_logger/07_diag.t t/11_logger/08_serialize.t t/11_logger/09_capture.t t/11_logger/10_note.t t/11_logger/11_runtime_file.t t/12_response/000_create_fake_env.t t/12_response/01_CRLF_injection.t t/12_response/02_headers.t t/12_response/03_charset.t t/12_response/04_charset_server.t t/12_response/05_api.t t/12_response/06_filter_halt_status.t t/12_response/07_cookies.t t/12_response/08_drop_content.t t/12_response/09_headers_to_array.t t/12_response/10_error_dumper.t t/12_response/11_CVE-2012-5572.t t/13_engines/00_load.t t/13_engines/02_template_init.t t/14_serializer/01_helpers.t t/14_serializer/02_request_json.t t/14_serializer/03_request_yaml.t t/14_serializer/04_request_xml.t t/14_serializer/05_request_mutable.t t/14_serializer/06_api.t t/14_serializer/17_clear_serializer.t t/14_serializer/99_bugs.t t/15_plugins/000_create_fake_env.t t/15_plugins/01_register.t t/15_plugins/02_config.t t/15_plugins/03_namespace.t t/15_plugins/04_apps_and_plugins.t t/15_plugins/05_keywords.t t/15_plugins/05_plugins_and_OO.t t/15_plugins/06_hook.t t/15_plugins/07_ajax_plack_builder.t t/16_timer/00_base.t t/17_apps/000_create_fake_env.t t/17_apps/00_base.t t/17_apps/01_settings.t t/17_apps/02_load_app.t t/17_apps/03_prefix.t t/17_apps/05_api.t t/19_dancer/01_script.t t/19_dancer/02_script_version_from.t t/20_deprecation/01_api.t t/21_dependents/Dancer-Session-Cookie.t t/22_hooks/00_syntax.t t/22_hooks/01_api.t t/22_hooks/02_before.t t/22_hooks/03_after.t t/22_hooks/04_template.t t/22_hooks/05_layout.t t/22_hooks/06_serializer.t t/22_hooks/07_file.t t/22_hooks/08_error.t t/22_hooks/09_before_error_init.t t/22_hooks/10_error_in_hook.t t/22_hooks/11_error_in_hook.t t/23_dancer_tests/01_basic.t t/23_dancer_tests/02_tests_functions.t t/24_deployment/01_multi_webapp.t t/25_exceptions/01_exceptions.t t/25_exceptions/02_exceptions.t t/25_exceptions/03_exceptions.t t/25_exceptions/04_exceptions_warn.t
TESTDB_SW = -d

testdb :: testdb_$(LINKTYPE)

test :: $(TEST_TYPE)

test_dynamic :: pure_all
	$(FULLPERLRUN) "-MExtUtils::Command::MM" "-e" "test_harness($(TEST_VERBOSE), '$(INST_LIB)', '$(INST_ARCHLIB)')" $(TEST_FILES)

testdb_dynamic :: pure_all
	$(FULLPERLRUN) $(TESTDB_SW) "-I$(INST_LIB)" "-I$(INST_ARCHLIB)" $(TEST_FILE)

test_ : test_dynamic

test_static :: test_dynamic
testdb_static :: testdb_dynamic


# --- MakeMaker ppd section:
# Creates a PPD (Perl Package Description) for a binary distribution.
ppd:
	$(NOECHO) $(ECHO) '<SOFTPKG NAME="$(DISTNAME)" VERSION="1,3124,0,0">' > $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '    <TITLE>$(DISTNAME)</TITLE>' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '    <ABSTRACT>A minimal-effort oriented web application framework</ABSTRACT>' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '    <AUTHOR></AUTHOR>' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '    <IMPLEMENTATION>' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '        <DEPENDENCY NAME="Encode" VERSION="0,0,0,0" />' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '        <DEPENDENCY NAME="File-Basename" VERSION="0,0,0,0" />' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '        <DEPENDENCY NAME="File-Spec" VERSION="0,0,0,0" />' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '        <DEPENDENCY NAME="HTTP-Body" VERSION="1,07,0,0" />' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '        <DEPENDENCY NAME="HTTP-Server-Simple-PSGI" VERSION="0,11,0,0" />' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '        <DEPENDENCY NAME="LWP" VERSION="0,0,0,0" />' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '        <DEPENDENCY NAME="MIME-Types" VERSION="0,0,0,0" />' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '        <DEPENDENCY NAME="Module-Runtime" VERSION="0,0,0,0" />' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '        <DEPENDENCY NAME="Test-More" VERSION="0,94,0,0" />' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '        <DEPENDENCY NAME="Time-HiRes" VERSION="0,0,0,0" />' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '        <DEPENDENCY NAME="Try-Tiny" VERSION="0,09,0,0" />' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '        <DEPENDENCY NAME="URI" VERSION="1,59,0,0" />' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '        <OS NAME="$(OSNAME)" />' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '        <ARCHITECTURE NAME="msys" />' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '        <CODEBASE HREF="" />' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '    </IMPLEMENTATION>' >> $(DISTNAME).ppd
	$(NOECHO) $(ECHO) '</SOFTPKG>' >> $(DISTNAME).ppd


# --- MakeMaker pm_to_blib section:

pm_to_blib : $(TO_INST_PM)
	$(NOECHO) $(ABSPERLRUN) -MExtUtils::Install -e 'pm_to_blib({@ARGV}, '\''$(INST_LIB)/auto'\'', '\''$(PM_FILTER)'\'')' \
	  lib/Dancer/Session/Abstract.pm blib/lib/Dancer/Session/Abstract.pm \
	  lib/Dancer/Serializer/Mutable.pm blib/lib/Dancer/Serializer/Mutable.pm \
	  lib/Dancer/SharedData.pm blib/lib/Dancer/SharedData.pm \
	  lib/Dancer/Route.pm blib/lib/Dancer/Route.pm \
	  lib/Dancer/Plugin/Ajax.pm blib/lib/Dancer/Plugin/Ajax.pm \
	  lib/Dancer/Hook/Properties.pm blib/lib/Dancer/Hook/Properties.pm \
	  lib/Dancer/Hook.pm blib/lib/Dancer/Hook.pm \
	  lib/Dancer/Continuation.pm blib/lib/Dancer/Continuation.pm \
	  lib/Dancer/Logger/Abstract.pm blib/lib/Dancer/Logger/Abstract.pm \
	  lib/Dancer/Error.pm blib/lib/Dancer/Error.pm \
	  lib/Dancer/Logger.pm blib/lib/Dancer/Logger.pm \
	  lib/Dancer/Route/Registry.pm blib/lib/Dancer/Route/Registry.pm \
	  lib/Dancer/ModuleLoader.pm blib/lib/Dancer/ModuleLoader.pm \
	  lib/Dancer/Config.pm blib/lib/Dancer/Config.pm \
	  lib/Dancer/App.pm blib/lib/Dancer/App.pm \
	  lib/Dancer/GetOpt.pm blib/lib/Dancer/GetOpt.pm \
	  lib/Dancer/Object/Singleton.pm blib/lib/Dancer/Object/Singleton.pm \
	  lib/Dancer/Renderer.pm blib/lib/Dancer/Renderer.pm \
	  lib/Dancer/Exception/Base.pm blib/lib/Dancer/Exception/Base.pm \
	  lib/Dancer/Logger/File.pm blib/lib/Dancer/Logger/File.pm \
	  lib/Dancer/Continuation/Route/ErrorSent.pm blib/lib/Dancer/Continuation/Route/ErrorSent.pm \
	  lib/Dancer/Response.pm blib/lib/Dancer/Response.pm \
	  lib/Dancer/Tutorial.pod blib/lib/Dancer/Tutorial.pod \
	  lib/Dancer/HTTP.pm blib/lib/Dancer/HTTP.pm \
	  lib/Dancer/Object.pm blib/lib/Dancer/Object.pm \
	  lib/Dancer/Template/Abstract.pm blib/lib/Dancer/Template/Abstract.pm \
	  lib/Dancer/Serializer/YAML.pm blib/lib/Dancer/Serializer/YAML.pm \
	  lib/Dancer/Plugin.pm blib/lib/Dancer/Plugin.pm \
	  lib/Dancer/Handler/Standalone.pm blib/lib/Dancer/Handler/Standalone.pm \
	  lib/Dancer/Engine.pm blib/lib/Dancer/Engine.pm \
	  lib/Dancer/MIME.pm blib/lib/Dancer/MIME.pm \
	  lib/Dancer/Continuation/Halted.pm blib/lib/Dancer/Continuation/Halted.pm \
	  lib/Dancer/Development.pod blib/lib/Dancer/Development.pod \
	  lib/Dancer/Logger/Console.pm blib/lib/Dancer/Logger/Console.pm \
	  lib/Dancer/Continuation/Route/FileSent.pm blib/lib/Dancer/Continuation/Route/FileSent.pm \
	  lib/Dancer/Introduction.pod blib/lib/Dancer/Introduction.pod \
	  lib/Dancer/Logger/Note.pm blib/lib/Dancer/Logger/Note.pm \
	  lib/Dancer/Serializer/XML.pm blib/lib/Dancer/Serializer/XML.pm \
	  lib/Dancer/Plugins.pod blib/lib/Dancer/Plugins.pod \
	  lib/Dancer/Serializer/Dumper.pm blib/lib/Dancer/Serializer/Dumper.pm \
	  lib/Dancer/Route/Cache.pm blib/lib/Dancer/Route/Cache.pm \
	  lib/Dancer/Exception.pm blib/lib/Dancer/Exception.pm \
	  lib/Dancer/Continuation/Route/Passed.pm blib/lib/Dancer/Continuation/Route/Passed.pm \
	  lib/Dancer/Handler.pm blib/lib/Dancer/Handler.pm \
	  lib/Dancer/Timer.pm blib/lib/Dancer/Timer.pm \
	  lib/Dancer/Cookie.pm blib/lib/Dancer/Cookie.pm \
	  lib/Dancer/Request/Upload.pm blib/lib/Dancer/Request/Upload.pm \
	  lib/Dancer/Serializer/Abstract.pm blib/lib/Dancer/Serializer/Abstract.pm \
	  lib/Dancer/Session.pm blib/lib/Dancer/Session.pm \
	  lib/Dancer/Serializer.pm blib/lib/Dancer/Serializer.pm \
	  lib/Dancer.pm blib/lib/Dancer.pm 
	$(NOECHO) $(ABSPERLRUN) -MExtUtils::Install -e 'pm_to_blib({@ARGV}, '\''$(INST_LIB)/auto'\'', '\''$(PM_FILTER)'\'')' \
	  lib/Dancer/Deployment.pod blib/lib/Dancer/Deployment.pod \
	  lib/Dancer/Continuation/Route/Templated.pm blib/lib/Dancer/Continuation/Route/Templated.pm \
	  lib/Dancer/Logger/Null.pm blib/lib/Dancer/Logger/Null.pm \
	  lib/Dancer/FileUtils.pm blib/lib/Dancer/FileUtils.pm \
	  lib/Dancer/Continuation/Route.pm blib/lib/Dancer/Continuation/Route.pm \
	  lib/Dancer/Handler/PSGI.pm blib/lib/Dancer/Handler/PSGI.pm \
	  lib/Dancer/Test.pm blib/lib/Dancer/Test.pm \
	  lib/Dancer/Development/Integration.pod blib/lib/Dancer/Development/Integration.pod \
	  lib/Dancer/Config/Object.pm blib/lib/Dancer/Config/Object.pm \
	  lib/Dancer/Continuation/Route/Forwarded.pm blib/lib/Dancer/Continuation/Route/Forwarded.pm \
	  lib/Dancer/Handler/Debug.pm blib/lib/Dancer/Handler/Debug.pm \
	  lib/Dancer/Template/Simple.pm blib/lib/Dancer/Template/Simple.pm \
	  lib/Dancer/Session/YAML.pm blib/lib/Dancer/Session/YAML.pm \
	  lib/Dancer/Serializer/JSON.pm blib/lib/Dancer/Serializer/JSON.pm \
	  lib/Dancer/Request.pm blib/lib/Dancer/Request.pm \
	  lib/Dancer/Cookies.pm blib/lib/Dancer/Cookies.pm \
	  lib/Dancer/Cookbook.pod blib/lib/Dancer/Cookbook.pod \
	  lib/Dancer/Logger/Capture.pm blib/lib/Dancer/Logger/Capture.pm \
	  lib/Dancer/Logger/Capture/Trap.pm blib/lib/Dancer/Logger/Capture/Trap.pm \
	  lib/Dancer/Deprecation.pm blib/lib/Dancer/Deprecation.pm \
	  lib/Dancer/Template.pm blib/lib/Dancer/Template.pm \
	  lib/Dancer/Session/Simple.pm blib/lib/Dancer/Session/Simple.pm \
	  lib/Dancer/Logger/Diag.pm blib/lib/Dancer/Logger/Diag.pm \
	  lib/Dancer/Factory/Hook.pm blib/lib/Dancer/Factory/Hook.pm \
	  lib/Dancer/Template/TemplateToolkit.pm blib/lib/Dancer/Template/TemplateToolkit.pm 
	$(NOECHO) $(TOUCH) pm_to_blib


# --- MakeMaker selfdocument section:


# --- MakeMaker postamble section:
.PHONY: tags

tags:
	ctags -f tags --recurse --totals \
        --exclude=blib \
        --exclude=.git \
        --exclude='*.swp' \
        --languages=Perl --langmap=Perl:+.t 

author_test:
	RELEASE_TESTING=1 $(MAKE) test



# End.
