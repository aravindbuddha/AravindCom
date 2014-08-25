#!/usr/bin/perl -W
use strict;
use warnings 'all';

use CGI;
#use utf8;
my $cgi = new CGI;

print $cgi->header(-type => "image/png");
#print $cgi->header();

use CGI::Carp 'fatalsToBrowser';
use JSON;
use File::Path qw{mkpath}; # make_path
use GD;
use Encode;

#use GD::Simple;
# create a new image


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
	my($string, $image_width, $image_height, $font) = @_;
	
	my @bounds = calculate_max_font_size($font, $string, $image_width, $image_height);
	
	my $max_font_size = $bounds[8];
	
	#print $max_font_size;
	#exit;
	#$width = $bounds[2] - $bounds[0];
	#$height = $bounds[3] - $bounds[5];
	
	
	my $im = new GD::Image($image_width, $image_height);
    my $white = $im->colorAllocate(255,255,255);
    my $black = $im->colorAllocate(0,0,0);       
    $im->transparent($white);
    $im->interlaced('true');
	$im->stringFT($black, $font, $max_font_size, 0, ( (-1) * ($bounds[0]) ),  ( $max_font_size - ( $bounds[5] ) ), $string);	
	binmode STDOUT;
	print $im->png;	
}

generate_image('Mark livings', 400, 100, 'fonts/Signerica_Fat.ttf');

#print calculate_max_font_size('fonts/Signerica_Fat.ttf', 'Mark livings', 440, 100);