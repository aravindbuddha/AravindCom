#!/usr/bin/perl -W
use strict;
use warnings 'all';

use CGI;
#use utf8;
my $cgi = new CGI;

print $cgi->header(-type=>"application/json", -charset=>'utf-8'); # 

use CGI::Carp 'fatalsToBrowser';
use JSON;
use File::Path qw{mkpath}; # make_path
use GD;
use Encode;

sub fail
{
	my($err_msg) = @_;
	my %response = (
		status  => "err",
		response =>  $err_msg,
	);     
	my $json = \%response;
	my $json_text = to_json($json);                           
	print $json_text;
	exit;
}

sub success
{
	my($msg, @files) = @_;
	my %response = ( );
	$response{status} = "success";
	$response{response} = $msg;
	if(@files)
	{
		$response{files} = [@files];
	}
    my $json = \%response;
    my $json_text = to_json($json);                           
    print $json_text; 		
}


sub read_dir
{
	my($dir, $web_path, $compare_string) = @_;
	
	chdir $dir or &fail("Could not change the directory. Check the directory structure.");

	opendir(DIR, $dir) or &fail("Could not read the directory. Check the directory structure.");
	
	my @files;
	my $file;
	
	while ($file = readdir DIR)
	{
		my $ediretorio = -d $file;
		my @vettipo=split(/\./, $file);
		my $tipofile=$vettipo[1];
		if($ediretorio ne 1)
		{
		  
				# $compare_string
		  
				#$text_to_search = "example text with [foo] and more";
				#$search_string = "[foo]";
						
				if($file =~ m/$compare_string/)
				{
					my $signature = {
						id	=>	$file,
						name	=>	$file,
						disk_path	=>	$dir,
						web_path	=>	$web_path,
					};
					push(@files, $signature);	
				}
		  
		  
		}
	}
	
	closedir DIR;
	
	my $json = [@files]; # cria hash com nome de $json, insere no hash uma key com nome de andamentos tendo o array @registros no value dessa key
	my $string_json = to_json($json); # encoda o hash com nome de $json em uma string no formato JSON, e atribui à var $string_json
	print $string_json;	
		
}


sub read_dir_fonts
{
	my($dir) = @_;
	
	chdir $dir or &fail("Could not change to the fonts directory. Check the directory structure.");

	opendir(DIR, $dir) or &fail("Could not read the fonts directory. Check the directory structure.");
	
	my @font_files = ();
	my $font_file;
	
	while ($font_file = readdir DIR)
	{
		my $ediretorio = -d $font_file;
		if($ediretorio ne 1)
		{
		  push(@font_files, "$font_file");
		}
	}
	closedir DIR;
	return sort @font_files;
}




sub calculate_max_font_size
{
	my ($font, $string, $image_width, $image_height) = @_;
	my $max_font_width = 1;
	my $width = 0;
	my $height = 0;
	my @bounds;
	for(1..100)
	{
		my $fs = $_ + 1;
		
		
		my $im = new GD::Image($image_width, $image_height);
		# allocate some colors
		my $white = $im->colorAllocate(255,255,255);
		my $black = $im->colorAllocate(0,0,0);       
		# make the background transparent and interlaced
		$im->transparent($white);
		$im->interlaced('true');
		@bounds = $im->stringFT($black, $font, $fs, 0, 0, $fs, $string);
		
		#print 'font size: ' . $fs . '<br>';
		#print $bounds[0] . ' - ' . $bounds[1] . ' - Lower left corner (x,y)<br>';  #
		#print $bounds[2] . ' - ' . $bounds[3] . ' - Lower right corner (x,y)<br>';  #Lower right corner (x,y) 
		#print $bounds[4] . ' - ' . $bounds[5] . ' - Upper right corner (x,y)<br>';  #Upper right corner (x,y)
		#print $bounds[6] . ' - ' . $bounds[7] . ' - Upper left corner (x,y)<br>';  #
		
		#print $bounds[2] . ' - right corner (x)<br>';  #Lower right corner (x,y) 
		
		#print '--------------------------<br><br>';
		
		$width = $bounds[2] - $bounds[0];
		$height = $bounds[3] - $bounds[5];
		#font size: 32
		#-3 - 66 - Lower left corner (x,y)
		#442 - 66 - Lower right corner (x,y)
		#442 - -11 - Upper right corner (x,y)
		#-3 - -11 - Upper left corner (x,y)
		
		$max_font_width = $fs;
		$bounds[8] = $max_font_width;
		
		if($width >= $image_width)
		{
			last;
		}
		if($height >= ( $image_height ))
		{
			last;
		}
	}
	return @bounds;
}


sub generate_image
{
	my($string, $image_width, $image_height, $font, $dir, $file_string) = @_;
	
	my @bounds = calculate_max_font_size($font, $string, $image_width, $image_height);
	
	my $max_font_size = $bounds[8];
	
	my $complement = $font;
	$complement =~ s[.ttf][]isg;
	$complement =~ s[/][]isg; 
	
	$file_string = $file_string . '_' . $complement . '';

	#print $complement;
	#exit;
	my $im = new GD::Image($image_width, $image_height);
    my $white = $im->colorAllocate(255,255,255);
    my $black = $im->colorAllocate(0,0,0);       
    $im->transparent($white);
    $im->interlaced('true');
	$im->stringFT($black, $font, $max_font_size, 0, ( (-1) * ($bounds[0]) ),  ( $max_font_size - ( $bounds[5] ) ), $string);	

	open(SIGNATURE, ">".$dir."".$file_string."_0.jpeg") or &fail("Could not open image for writing.");
	binmode SIGNATURE;
	print SIGNATURE $im->jpeg;
	close SIGNATURE;
	
}




sub run
{
	my($dir, $web_path, $user_name, $file_name, $compare_string, @fonts_list) = @_;
	
	#print $file_name;
	#exit;
	
	if(-d $dir)
	{
		foreach my $font (@fonts_list)
		{
			#print $file_name;
			#exit;
			
			my $font_name_path = 'fonts/' . $font . '';
			generate_image($user_name, 400, 100, $font_name_path, $dir, $file_name);
			select(undef, undef, undef, 0.2);
		}
		
		read_dir($dir, $web_path, $compare_string);
	}else
	{
		#first run - create signature templates
		mkpath($dir) or &fail("Could not create the directory. Check the directory structure.");
		
		foreach my $font (@fonts_list)
		{
			#print $file_name;
			#exit;
			
			my $font_name_path = 'fonts/' . $font . '';
			generate_image($user_name, 400, 100, $font_name_path, $dir, $file_name);
			select(undef, undef, undef, 0.2);
		}

		read_dir($dir, $web_path, $compare_string);
	}
}


my $web_path = $cgi->param('web_path') or &fail("web_path is mandatory"); # 'http://www.web2solutions.com.br/poc/signatures/';
my $file_path_abs = $cgi->param('file_path_abs') || &fail("file_path_abs is mandatory"); # d:/web/localuser/web2solutions/www/poc/signatures/
my $user_name = $cgi->param('user_name') || &fail("user_name is mandatory");
my $user_id = $cgi->param('user_id') || &fail("user_id is mandatory");
my $agency_id = $cgi->param('agency_id') || &fail("agency_id is mandatory");
my $file_name = $cgi->param('file_name') || &fail("file_name is mandatory");

$file_name = $file_name . '_' . $agency_id . '_' . $user_id . '_' . $user_name;

my $string_to_compare = $agency_id . '_' . $user_id . '_' . $user_name;

# filename_agencyID_customerID_CustomerName

#my @fonts = read_dir_fonts('/var/www/html/signature_component/processors/fonts/');

my @fonts = ("01.ttf", "02.ttf", "03.ttf", "04.ttf", "05.ttf", "06.ttf", "07.ttf", "08.ttf", "09.ttf", "10.ttf", "11.ttf", "12.ttf", "13.ttf", "14.ttf", "16.ttf");

run($file_path_abs,	$web_path, $user_name, $file_name, $string_to_compare, @fonts );



#foreach( @fonts )
#{
	#print $_ . '<br>';
#}

#use Data::Dumper qw(Dumper);
 

#print Dumper \@fonts;
