<?php
$upqgpn_0 = 300;
$mntrkc_1 = 200;
$ebsmeh_2 = 4;
$mcnycn_3;
$ppjzrj_4;
$ujkzdl_5 = False;
$uvpyzu_6 = 0;
$uxrcwf_7 = '';
function GetSignatureImage($lglilo_8)
{
    $wgmhiu_9 = base64_decode($lglilo_8);
    if (1 == 1) {
        $zwgofa_10 = explode(base64_decode('Ow=='), $wgmhiu_9);
        $xynxma_11 = explode(base64_decode('LA=='), $zwgofa_10[0]);
        if (count($xynxma_11) == 8) {
            $mcnycn_3  = Html2RGB($xynxma_11[1]);
            $upqgpn_0  = $xynxma_11[3];
            $mntrkc_1  = $xynxma_11[4];
            $ujkzdl_5  = strtoupper($xynxma_11[5]);
            $uvpyzu_6  = (integer) $xynxma_11[6];
            $uxrcwf_7  = $xynxma_11[7];
            $raeezd_12 = imagecreatetruecolor($upqgpn_0, $mntrkc_1);
            $uewdxc_13 = imagecolorallocate($raeezd_12, $mcnycn_3[0], $mcnycn_3[1], $mcnycn_3[2]);
            imagefill($raeezd_12, 0, 0, $uewdxc_13);
            if ($ujkzdl_5 == base64_decode('VFJVRQ==')) {
                imagecolortransparent($raeezd_12, $uewdxc_13);
            }
            for ($ffvqri_14 = 1; $ffvqri_14 < count($zwgofa_10); $ffvqri_14++) {
                if (strlen($zwgofa_10[$ffvqri_14]) > 0) {
                    $vzbxaq_15 = explode(base64_decode('IA=='), trim($zwgofa_10[$ffvqri_14]));
                    $zosaxd_16 = explode(base64_decode('LA=='), $vzbxaq_15[0]);
                    $ebsmeh_2  = $zosaxd_16[0];
                    $ppjzrj_4  = Html2RGB($zosaxd_16[1]);
                    $tcpvis_17 = imagecolorallocate($raeezd_12, $ppjzrj_4[0], $ppjzrj_4[1], $ppjzrj_4[2]);
                    for ($tsdzag_18 = 1; $tsdzag_18 < count($vzbxaq_15) - 1; $tsdzag_18++) {
                        $qjqpti_19 = explode(base64_decode('LA=='), trim($vzbxaq_15[$tsdzag_18]));
                        $uscpwh_20 = explode(base64_decode('LA=='), trim($vzbxaq_15[$tsdzag_18 + 1]));
                        imgdrawLine($raeezd_12, $qjqpti_19[0], $qjqpti_19[1], $uscpwh_20[0], $uscpwh_20[1], $tcpvis_17, $ebsmeh_2);
                        imgdrawLine($raeezd_12, $qjqpti_19[0], $qjqpti_19[1], $uscpwh_20[0], $uscpwh_20[1], $tcpvis_17, $ebsmeh_2 + 1);
                    }
                }
            }
            return $raeezd_12;
        }
    }
    return null;
}
function imgdrawLine($yzcgpc_21, $lnibzd_22, $acthgd_23, $wvapwz_24, $uyktkk_25, $tfqsog_26, $qkfddy_27)
{
    $qkfddy_27 = abs($qkfddy_27 / 2);
    $vooejq_28 = 1 - $qkfddy_27;
    $twliok_29 = 1;
    $vnaehz_30 = -2 * $qkfddy_27;
    $jxkkok_31 = 0;
    $wwxmrt_32 = $qkfddy_27;
    imageline($yzcgpc_21, $lnibzd_22, $acthgd_23 + $qkfddy_27, $wvapwz_24, $uyktkk_25 + $qkfddy_27, $tfqsog_26);
    imageline($yzcgpc_21, $lnibzd_22, $acthgd_23 - $qkfddy_27, $wvapwz_24, $uyktkk_25 - $qkfddy_27, $tfqsog_26);
    imageline($yzcgpc_21, $lnibzd_22 + $qkfddy_27, $acthgd_23, $wvapwz_24 + $qkfddy_27, $uyktkk_25, $tfqsog_26);
    imageline($yzcgpc_21, $lnibzd_22 - $qkfddy_27, $acthgd_23, $wvapwz_24 - $qkfddy_27, $uyktkk_25, $tfqsog_26);
    while ($jxkkok_31 < $wwxmrt_32) {
        if ($vooejq_28 >= 0) {
            $wwxmrt_32--;
            $vnaehz_30 += 2;
            $vooejq_28 += $vnaehz_30;
        }
        $jxkkok_31++;
        $twliok_29 += 2;
        $vooejq_28 += $twliok_29;
        imageline($yzcgpc_21, $lnibzd_22 + $jxkkok_31, $acthgd_23 + $wwxmrt_32, $wvapwz_24 + $jxkkok_31, $uyktkk_25 + $wwxmrt_32, $tfqsog_26);
        imageline($yzcgpc_21, $lnibzd_22 - $jxkkok_31, $acthgd_23 + $wwxmrt_32, $wvapwz_24 - $jxkkok_31, $uyktkk_25 + $wwxmrt_32, $tfqsog_26);
        imageline($yzcgpc_21, $lnibzd_22 + $jxkkok_31, $acthgd_23 - $wwxmrt_32, $wvapwz_24 + $jxkkok_31, $uyktkk_25 - $wwxmrt_32, $tfqsog_26);
        imageline($yzcgpc_21, $lnibzd_22 - $jxkkok_31, $acthgd_23 - $wwxmrt_32, $wvapwz_24 - $jxkkok_31, $uyktkk_25 - $wwxmrt_32, $tfqsog_26);
        imageline($yzcgpc_21, $lnibzd_22 + $wwxmrt_32, $acthgd_23 + $jxkkok_31, $wvapwz_24 + $wwxmrt_32, $uyktkk_25 + $jxkkok_31, $tfqsog_26);
        imageline($yzcgpc_21, $lnibzd_22 - $wwxmrt_32, $acthgd_23 + $jxkkok_31, $wvapwz_24 - $wwxmrt_32, $uyktkk_25 + $jxkkok_31, $tfqsog_26);
        imageline($yzcgpc_21, $lnibzd_22 + $wwxmrt_32, $acthgd_23 - $jxkkok_31, $wvapwz_24 + $wwxmrt_32, $uyktkk_25 - $jxkkok_31, $tfqsog_26);
        imageline($yzcgpc_21, $lnibzd_22 - $wwxmrt_32, $acthgd_23 - $jxkkok_31, $wvapwz_24 - $wwxmrt_32, $uyktkk_25 - $jxkkok_31, $tfqsog_26);
    }
}
function Html2RGB($tfqsog_26)
{
    if ($tfqsog_26[0] == base64_decode('Iw=='))
        $tfqsog_26 = substr($tfqsog_26, 1);
    if (strlen($tfqsog_26) == 6)
        list($ezfjfq_33, $hzayyb_34, $phtpvs_35) = array(
            $tfqsog_26[0] . $tfqsog_26[1],
            $tfqsog_26[2] . $tfqsog_26[3],
            $tfqsog_26[4] . $tfqsog_26[5]
        );
    elseif (strlen($tfqsog_26) == 3)
        list($ezfjfq_33, $hzayyb_34, $phtpvs_35) = array(
            $tfqsog_26[0] . $tfqsog_26[0],
            $tfqsog_26[1] . $tfqsog_26[1],
            $tfqsog_26[2] . $tfqsog_26[2]
        );
    else
        return false;
    $ezfjfq_33 = hexdec($ezfjfq_33);
    $hzayyb_34 = hexdec($hzayyb_34);
    $phtpvs_35 = hexdec($phtpvs_35);
    return array(
        $ezfjfq_33,
        $hzayyb_34,
        $phtpvs_35
    );
}
?>