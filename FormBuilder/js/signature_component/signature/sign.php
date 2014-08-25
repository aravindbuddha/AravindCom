<html>
 <head>
  <title>SuperSignature PHP</title>
  <script language="javascript" type="text/javascript">
        document.oncontextmenu = new Function("return false;");
  </script>
      <style>
        .Button
        {
            font-family: Segoe UI,Tahoma;
            font-size: 12px;
            font-weight: bolder;
            color: #000000;
            background-repeat: no-repeat;
            width: 80px;
            height: 20px;
            border: none;
            border: solid 1px #DCDCDC;
            margin-left: 13px;
            margin-top:-5px;
        }
        li input
        {
            margin: 5px;
        }
        body
        {
            font-family: Segoe UI,Tahoma;
            font-size: 12px;
        }
    </style>
 </head>
 <body>
  <noscript>
        <meta http-equiv="refresh" content="1; URL='/'" />
    </noscript>
  <form method="post" action="super-signature.php">
    <h1>SuperSignature PHP</h1>
    <iframe id="frmSign" name="frmSign" src="control.php" width="300px" height="290px" style="width:300px;height:290px;" scrolling="no" frameborder="0"></iframe>
    <br /><input type="button" value="Sign Again!" class="Button" onclick="javascript:document.getElementById('frmSign').src = 'control.php';" />
 </body>
</html>