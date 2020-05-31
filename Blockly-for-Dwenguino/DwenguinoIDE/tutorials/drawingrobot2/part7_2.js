/**
 * Implementation of this tour with Hopscotch
 */

tutorials.drawingRobot2_7_2 = {
  category: "drawingrobot2",
  targets: new Array(17).fill(tutorialTargets.difficultyMenu),
  placements: new Array(17).fill("bottom"),
  nrOfSteps: 17,
  xOffsets: new Array(17).fill(0),
  yOffsets: new Array(17).fill(0),
  steps: [],
  i18n: {
    nextBtn: MSG.tutorials.next,
    prevBtn: MSG.tutorials.previous,
    doneBtn: MSG.tutorials.done,
    skipBtn: MSG.tutorials.skip,
    closeTooltip: MSG.tutorials.close,
  },
  // Create the steps array dynamically by using the different arrays
  initSteps: function(){
    //initialize multiple choice questions
    // Question 1
    var questionText1 = MSG.tutorials.drawingrobot['part7_2'].questions[0];
    var answer1_a = new TutorialAnswer(0,MSG.tutorials.drawingrobot['part7_2'].answers[0]);
    var answer1_b = new TutorialAnswer(1,MSG.tutorials.drawingrobot['part7_2'].answers[1]);
    var answer1_c = new TutorialAnswer(2,MSG.tutorials.drawingrobot['part7_2'].answers[2]);
    var answers = [answer1_a, answer1_b, answer1_c];
    question1 = new TutorialMultipleChoiceQuestion("q1", questionText1, answers, answer1_a);
    MSG.tutorials.drawingrobot['part7_2'].stepContents2[1] = question1.getHtml();
    // Question 2
    var questionText2 = MSG.tutorials.drawingrobot['part7_2'].questions[1];
    question2 = new TutorialMultipleChoiceQuestion("q2", questionText2, answers, answer1_b);
    MSG.tutorials.drawingrobot['part7_2'].stepContents2[3] = question2.getHtml();
    // Question 3
    var questionText3 = MSG.tutorials.drawingrobot['part7_2'].questions[2];
    question3 = new TutorialMultipleChoiceQuestion("q3", questionText3, answers, answer1_c);
    MSG.tutorials.drawingrobot['part7_2'].stepContents2[5] = question3.getHtml();


    this.targets[1] = tutorialTargets.openButton;
    this.placements[1] = "bottom";
    this.xOffsets[1] = -300;
    this.yOffsets[1] = 0;
    var i;
    for (i = 0 ; i < this.nrOfSteps ; i++){
      this.steps.push({
        title: MSG.tutorials.drawingrobot['part7_2'].stepTitles2[i],
        content: MSG.tutorials.drawingrobot['part7_2'].stepContents2[i],
        target: this.targets[i],
        placement: this.placements[i],
        showCloseButton:"true",
        width: 450,
        xOffset: this.xOffsets[i],
        yOffset: this.yOffsets[i],
      });
    }
  },
  id: "part7_2",
  label: MSG.tutorials.drawingrobot['part7_2'].label,
  onStart: function(){
    //Load blocks with xml file
    DwenguinoBlockly.loadFileXmlIntoWorkspace('<xml><block type="setup_loop_structure" id="Pk`h)EM}qg!)OyIV5]4P" x="10" y="10"></block></xml>');
          
  },
  onEnd: function(){
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    // DwenguinoBlockly.setDifficultyLevel(0)
    var data = {
      tutorialname: DwenguinoBlockly.tutorialIdSetting,
      xml: xml.innerHTML,
    }
    data = JSON.stringify(data);
    DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("endTutorial", data));
    TutorialMenu.endTutorial();
  },
  onNext: function(){
    var curr = hopscotch.getCurrStepNum();
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    var data = {
      tutorialname: DwenguinoBlockly.tutorialIdSetting,
      step: curr,
      xml: xml.innerHTML,
    }
    data = JSON.stringify(data);
    DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("tutorialNextStep", data ));
    // console.log(DwenguinoBlockly.createEvent("tutorialNextStep", DwenguinoBlockly.tutorialIdSetting));
    


    if(curr === 2){
      drawingrobotTutorialChecks.checkAnswer(question1);
      setTimeout(function() {
        var curr2 = hopscotch.getCurrStepNum();
        if( curr2 === 2){
          DwenguinoBlockly.loadFileXmlIntoWorkspace('<xml xmlns="https://developers.google.com/blockly/xml"><variables><variable type="Number" id="_9wznW1koG0k+Yd3v:MU">getal</variable><variable type="Number" id="?F5hzvd)#Z2}p-N;8C)E">i</variable></variables><block type="setup_loop_structure" id="1I]~r.6S`{OYV=[Y(aoR" x="-89" y="137"><statement name="SETUP"><block type="variables_declare_set_int" id="OyV{|yD;DpFSDeobGRuO"><field name="VAR" id="_9wznW1koG0k+Yd3v:MU" variabletype="Number">getal</field><value name="VALUE"><block type="char_type" id="%B}?MVUE`I8Vy=iE%E1/"><field name="BITMASK">100</field></block></value><next><block type="controls_for" id=",Dz0C%)o}DdnVPC3F]nC"><field name="VAR" id="?F5hzvd)#Z2}p-N;8C)E" variabletype="Number">i</field><value name="FROM"><block type="char_type" id="4$:A?*o.R`x#Y]21%DjR"><field name="BITMASK">1</field></block></value><value name="TO"><block type="char_type" id="Y?kl.0Kvxf7=23[tU_KJ"><field name="BITMASK">3</field></block></value><value name="BY"><block type="char_type" id="6oHDwa|UZp5ig*hq1RRl"><field name="BITMASK">1</field></block></value><statement name="DO"><block type="line_comment" id="sOJnGtBL;4_jq#V_$q,O"><field name="TEXT">Verplaats stylo</field><next><block type="drawingrobot_lift_stylus" id="lQuXy_f$r|2XSLxG$In0"><next><block type="drawingrobot_line" id="@LPn.%_(Zud2GCMZrO5K"><value name="x"><block type="variables_get_int" id="PZ,kB?N;6Y9X_+29?aZ|"><field name="VAR" id="_9wznW1koG0k+Yd3v:MU" variabletype="Number">getal</field></block></value><value name="y"><block type="math_number" id="w3Os`M1)aro!?10)-Gna"><field name="NUM">100</field></block></value><next><block type="drawingrobot_lower_stylus" id=",;BftY/.z{#,@cAo_y^9"><next><block type="line_comment" id="{Gl[SeDd*gYUsE-eq-my"><field name="TEXT">Teken een cirkel</field><next><block type="drawingrobot_circle" id=";V.|{~tDBM!Y9A5xnZ@p"><value name="radius"><block type="math_number" id="kK9bUm)*,ArZNV%y*4/~"><field name="NUM">20</field></block></value><next><block type="variables_declare_set_int" id="mJw~:|30I-t.}uhJvvg{"><field name="VAR" id="_9wznW1koG0k+Yd3v:MU" variabletype="Number">getal</field><value name="VALUE"><block type="math_arithmetic" id="TM419nUPCG_DbA2GMyKI"><field name="OP">ADD</field><value name="A"><block type="variables_get_int" id="XYTN1qXRH68!D5D0e$AA"><field name="VAR" id="_9wznW1koG0k+Yd3v:MU" variabletype="Number">getal</field></block></value><value name="B"><block type="char_type" id="bfp+[Aw_VO~a,D%];C@q"><field name="BITMASK">100</field></block></value></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></next></block></statement></block></xml>');
        }
      }, 30);
    }


    if(curr === 4){
      drawingrobotTutorialChecks.checkAnswer(question2);
      setTimeout(function() {
        var curr2 = hopscotch.getCurrStepNum();
        if( curr2 === 4){
          DwenguinoBlockly.loadFileXmlIntoWorkspace('<xml xmlns="https://developers.google.com/blockly/xml"><variables><variable id="}_T=)8|t0_$O9er{xfXc">x</variable><variable id="-JI8}5rAq@-Bf+_46J?V">y</variable></variables><block type="procedures_defnoreturn" id="N=7$Oof_FQ[Ee-0.4?T]" x="318" y="21"><mutation><arg name="x" varid="}_T=)8|t0_$O9er{xfXc"/><arg name="y" varid="-JI8}5rAq@-Bf+_46J?V"/></mutation><field name="NAME">Verplaatds de stylo</field><comment pinned="false" h="80" w="160">Deze functie beschrijven...</comment><statement name="STACK"><block type="drawingrobot_lift_stylus" id="kDp/80k:cZrHZ!eUS/(w"><next><block type="drawingrobot_line" id="+y_G#hWe.2-qd12hm#*%"><value name="x"><block type="variables_get" id="qA(U:v@^T]z6lo.4p_g]"><field name="VAR" id="}_T=)8|t0_$O9er{xfXc">x</field></block></value><value name="y"><block type="variables_get" id="*9b~4FYhBQD$#yGQfKTO"><field name="VAR" id="-JI8}5rAq@-Bf+_46J?V">y</field></block></value><next><block type="drawingrobot_lower_stylus" id="V$]?G}~r%YqK(!UmKwZ="/></next></block></next></block></statement></block><block type="setup_loop_structure" id="1I]~r.6S`{OYV=[Y(aoR" x="47" y="36"><statement name="SETUP"><block type="line_comment" id="sOJnGtBL;4_jq#V_$q,O"><field name="TEXT">Verplaats stylo</field><next><block type="procedures_callnoreturn" id="v:|AAdqh8yQA|!effa+Y"><mutation name="Verplaatds de stylo"><arg name="x"/><arg name="y"/></mutation><value name="ARG0"><block type="math_number" id="}/%Q[6*P{@R[-*VDZV~P"><field name="NUM">100</field></block></value><value name="ARG1"><block type="math_number" id="H%gGJP:u(R{em($A|JIp"><field name="NUM">100</field></block></value><next><block type="line_comment" id="{Gl[SeDd*gYUsE-eq-my"><field name="TEXT">Tekenen</field><next><block type="drawingrobot_circle" id=";V.|{~tDBM!Y9A5xnZ@p"><value name="radius"><block type="math_number" id="kK9bUm)*,ArZNV%y*4/~"><field name="NUM">20</field></block></value><next><block type="line_comment" id="-J$S%ti]YP/|tsuuU#vD"><field name="TEXT">Verplaats stylo</field><next><block type="procedures_callnoreturn" id="%;[Y}/RzHj[^qJ;mBfU^"><mutation name="Verplaatds de stylo"><arg name="x"/><arg name="y"/></mutation><value name="ARG0"><block type="math_number" id="M4!(v_{K$;hivA+{BBQ0"><field name="NUM">200</field></block></value><value name="ARG1"><block type="math_number" id="JWvMi+tIJ3dx4={RQG#/"><field name="NUM">100</field></block></value><next><block type="line_comment" id="}$aSh[~-pWd}6`u9sS;I"><field name="TEXT">Tekenen</field><next><block type="drawingrobot_rectangle" id="Q|OT{Sda6$o$JJWICii5"><value name="width"><block type="math_number" id="hEz3^gb,(?+!Av{?5zu@"><field name="NUM">10</field></block></value><value name="height"><block type="math_number" id="pO,1~=Xd`KVl1}CD9w3t"><field name="NUM">10</field></block></value><next><block type="line_comment" id="/ZQZ[~i^BkVSe]TDS{h#"><field name="TEXT">Verplaats stylo</field><next><block type="procedures_callnoreturn" id="HTy0@~-FGi|,oy:wFQ}="><mutation name="Verplaatds de stylo"><arg name="x"/><arg name="y"/></mutation><value name="ARG0"><block type="math_number" id="^^!6|xRVj(OwJf{C.JX{"><field name="NUM">300</field></block></value><value name="ARG1"><block type="math_number" id="F?_$fB:eg@UpiK+wxlT-"><field name="NUM">100</field></block></value><next><block type="line_comment" id="b[otvefd-Dk}mT~8+]zo"><field name="TEXT">Tekenen</field><next><block type="drawingrobot_rectangle" id="s%gBnkW,TWyH$aBV|z{}"><value name="width"><block type="math_number" id="!~.fWtx.^r9kq%{A-C(u"><field name="NUM">20</field></block></value><value name="height"><block type="math_number" id="Ave=sQhk^lNfnE*RQ5z)"><field name="NUM">30</field></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></xml>');
        }
      }, 30);
    }

    
    if(curr === 6){
      drawingrobotTutorialChecks.checkAnswer(question3);
    }

    if(curr === 7){
      // show an example image
      if($('#tutorial_example_close')[0]){
        $('#tutorial_example_img').attr("src","./DwenguinoIDE/img/tutorials/drawingrobot/6_3.png")
      } else {
        var div = '<div id="tutorial_example" class="hopscotch-bubble animated draggable" style="top: 348px; left: 500px; position: absolute;">'
        + '<div class="hopscotch-bubble-container" style="width: 400px; padding: 15px;">'
        + '  <div>'
        + '    <h3 class="hopscotch-title">' + MSG.example + '</h3>'
        + '    <div class="hopscotch-content">'
        + '      <img id="tutorial_example_img" class="tutorial tutorial_img_txt tutorial_img" src="./DwenguinoIDE/img/tutorials/drawingrobot/6_3.png">'
        + '    </div>'
        + '  </div>'
        + '  <button id="tutorial_example_close" class="hopscotch-bubble-close">Sluiten</button>'
        + '</div>'
        + '</div>';

        $(div).appendTo("#db_body");
      }

      $('#tutorial_example_close').click(function() {
        $("#tutorial_example").remove();
      });
    }

    if(curr === 16){
        drawingrobotTutorialChecks.checkExercise7_2();
    }

    
  },

  onPrev: function(){
    var curr = hopscotch.getCurrStepNum();
    var data = {
      tutorialname: DwenguinoBlockly.tutorialIdSetting,
      step: curr,
    }
    data = JSON.stringify(data);
    DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("tutorialPrevStep", data ));
    // console.log(DwenguinoBlockly.createEvent("tutorialPrevStep", DwenguinoBlockly.tutorialIdSetting));

  },
  onClose: function(){
    $("#tutorial_example").remove();
  },
  onShow: function(){      
    var curr = hopscotch.getCurrStepNum();  
    if (curr !== 1 ){
      $('.hopscotch-bubble-arrow-container').css('visibility', 'hidden');
    }

    if(curr === 8) {
      $('div.hopscotch-bubble .hopscotch-bubble-arrow-container.up').css('left','305px');
      
      $('#btn_exercise7').click(function() {
        DwenguinoBlockly.loadFileXmlIntoWorkspace('<xml xmlns="https://developers.google.com/blockly/xml"><variables><variable type="Number" id="Y:EBDE0RQ?1?|}2i/~DP">straal</variable><variable type="Number" id="@}]n?Kq_D6UeW(:5;Tyk">lengte</variable><variable type="Number" id="?kO+%Vpg3@bi~7VO;Haq">j</variable></variables><block type="setup_loop_structure" id="=At@k+au|yV[qW7du(|1" x="-36" y="86"><statement name="SETUP"><block type="drawingrobot_lift_stylus" id="!/+:0yH_?jAJ18r5+qm@"><next><block type="drawingrobot_line" id=";!^;y)-yep$b_ZZOH9fl"><value name="x"><block type="math_number" id="q8/fsL,1VYk-[W[uHLNI"><field name="NUM">230</field></block></value><value name="y"><block type="math_number" id="dAjn}Iy6+8]$7EfY)]VF"><field name="NUM">200</field></block></value><next><block type="drawingrobot_lower_stylus" id="51]s((FlR.[l*z]KBK^}"><next><block type="variables_declare_set_int" id="d:!z[slYVuat5n@YaO[Z"><field name="VAR" id="Y:EBDE0RQ?1?|}2i/~DP" variabletype="Number">straal</field><value name="VALUE"><block type="char_type" id="Q$S4/0]cg8o2EAZMwDG0"><field name="BITMASK">5</field></block></value><next><block type="variables_declare_set_int" id="Y]p_b}e:Ov=V{h+6k~Fq"><field name="VAR" id="@}]n?Kq_D6UeW(:5;Tyk" variabletype="Number">lengte</field><value name="VALUE"><block type="char_type" id="?8.-v28yKNoyi@4E)sul"><field name="BITMASK">20</field></block></value><next><block type="controls_for" id="YiJAy*}!V;A)Mkem-8/6"><field name="VAR" id="?kO+%Vpg3@bi~7VO;Haq" variabletype="Number">j</field><value name="FROM"><shadow type="char_type" id="c9jjb!Pl/Pf/~vqMDXEK"><field name="BITMASK">0</field></shadow></value><value name="TO"><shadow type="char_type" id="Prf^}W8g]7}N,5M[y;mZ"><field name="BITMASK">2</field></shadow></value><value name="BY"><shadow type="char_type" id="Kt6x*z${O;MENEZ|!HlQ"><field name="BITMASK">1</field></shadow></value><statement name="DO"><block type="drawingrobot_color" id="tx2pSISoV[vM+v#C|jV{"><field name="col">#996633</field><next><block type="drawingrobot_rectangle" id="YDXu*COjY(Ut#x$}[)4M"><value name="width"><block type="math_arithmetic" id="]ZWue{,545Vt9+7nE]N0"><field name="OP">DIVIDE</field><value name="A"><block type="variables_get_int" id=";?t1SJi$P6)H$+2T/bAa"><field name="VAR" id="@}]n?Kq_D6UeW(:5;Tyk" variabletype="Number">lengte</field></block></value><value name="B"><block type="char_type" id="u{dCXG(W[L!w$FtA8S|G"><field name="BITMASK">2</field></block></value></block></value><value name="height"><block type="variables_get_int" id="SNn}HCV?TshxZG@}1a~E"><field name="VAR" id="@}]n?Kq_D6UeW(:5;Tyk" variabletype="Number">lengte</field></block></value><next><block type="drawingrobot_lift_stylus" id="eaF)CQ),GWeJeU!/;J%I"><next><block type="drawingrobot_move" id="GDdif3r1KR/dec@Dw:O_"><field name="direction">0</field><value name="amount"><block type="math_number" id="?9x0c;x?PuH=vK9irrs/"><field name="NUM">8</field></block></value><next><block type="drawingrobot_move" id="hj7I%tA;hD]iw!AB1)~5"><field name="direction">3</field><value name="amount"><block type="math_number" id="+~G+vLL.O_,ZcP$;nvac"><field name="NUM">8</field></block></value><next><block type="drawingrobot_lower_stylus" id="pU#oOM^+vB,Qg!~#)^A1"><next><block type="drawingrobot_color" id="@3BxH9p/YqMYjB5MFdjT"><field name="col">#009900</field><next><block type="drawingrobot_circle" id="4K`Cvz4DB.|0(fw?y/t("><value name="radius"><block type="variables_get_int" id="K|+VC}-@+/,sH-1?oI[$"><field name="VAR" id="Y:EBDE0RQ?1?|}2i/~DP" variabletype="Number">straal</field></block></value><next><block type="drawingrobot_lift_stylus" id="oFT?wj)Z^+P4eX)PJ^$f"><next><block type="drawingrobot_move" id="RQ+TQj4t39{?);O|H!N}"><field name="direction">0</field><value name="amount"><block type="math_number" id="MLTR#:Ps$*m_bc=KfyBD"><field name="NUM">8</field></block></value><next><block type="drawingrobot_move" id=")=]`}c6X^j}-bI+Hf.VX"><field name="direction">2</field><value name="amount"><block type="math_number" id="+J;=}l|K[W*^vH{2HJZ~"><field name="NUM">8</field></block></value><next><block type="drawingrobot_lower_stylus" id="@kipJt@BR0g)@yk;tEVy"><next><block type="drawingrobot_circle" id="}lm2{hq9$s*RH.E9x1J9"><value name="radius"><block type="variables_get_int" id="2tqZ/rn:tcri[22~pF;{"><field name="VAR" id="Y:EBDE0RQ?1?|}2i/~DP" variabletype="Number">straal</field></block></value><next><block type="drawingrobot_lift_stylus" id="6^i^7@qVI_kvp2N-jg8c"><next><block type="drawingrobot_move" id="~OIo-L*(tp+`NtH]!89["><field name="direction">1</field><value name="amount"><block type="math_number" id="Pd_|hC8@2nnhS/7KtokM"><field name="NUM">8</field></block></value><next><block type="drawingrobot_move" id="B18z5wzn7#I1?VwjqjM*"><field name="direction">2</field><value name="amount"><block type="math_number" id=":9qv!!WLXI3QN@OaKBhg"><field name="NUM">8</field></block></value><next><block type="drawingrobot_lower_stylus" id="%ldV+:bXIM[!D_oe5erD"><next><block type="drawingrobot_circle" id="2V~_=sE?9e#KZ9W~UF-`"><value name="radius"><block type="variables_get_int" id="u!kghwf@eSY;IqvYVw1e"><field name="VAR" id="Y:EBDE0RQ?1?|}2i/~DP" variabletype="Number">straal</field></block></value><next><block type="drawingrobot_lift_stylus" id="yDwCz(I/@qX$YzA1euGt"><next><block type="drawingrobot_move" id="vLEzaIpI[xpU$txK7(eD"><field name="direction">1</field><value name="amount"><block type="math_number" id="^]jjhDtF.{YI6LaBB(r!"><field name="NUM">8</field></block></value><next><block type="drawingrobot_move" id="N+Y;Dgbm%wr}OqY`wLSm"><field name="direction">3</field><value name="amount"><block type="math_arithmetic" id="Fz75PyW]a%WRsEjZKp`8"><field name="OP">ADD</field><value name="A"><block type="variables_get_int" id="O[g%Ij;DZucfmD3Q,_2W"><field name="VAR" id="@}]n?Kq_D6UeW(:5;Tyk" variabletype="Number">lengte</field></block></value><value name="B"><block type="math_number" id="4G/CfQz{T!,H+vc,SpWm"><field name="NUM">20</field></block></value></block></value><next><block type="drawingrobot_move" id="VvYG?jVMk{NGR:+~vycL"><field name="direction">0</field><value name="amount"><block type="math_number" id="{Zwymz.4%KK!d`G=ArMu"><field name="NUM">10</field></block></value><next><block type="drawingrobot_lower_stylus" id="i8qOzzA`###@CSJIal}1"><next><block type="variables_declare_set_int" id="HeuttX5u(s?1NJoWA7:)"><field name="VAR" id="Y:EBDE0RQ?1?|}2i/~DP" variabletype="Number">straal</field><value name="VALUE"><block type="math_arithmetic" id="7^1._wk@Y2}C5}ZD5sa|"><field name="OP">ADD</field><value name="A"><block type="variables_get_int" id="PKq~^b.O8vt$*Ye}#,IS"><field name="VAR" id="Y:EBDE0RQ?1?|}2i/~DP" variabletype="Number">straal</field></block></value><value name="B"><block type="char_type" id="{dm;#I}e0Zj,Tj~=A*p9"><field name="BITMASK">2</field></block></value></block></value><next><block type="variables_declare_set_int" id="xth!cBg.sN/8P9*Bt(xi"><field name="VAR" id="@}]n?Kq_D6UeW(:5;Tyk" variabletype="Number">lengte</field><value name="VALUE"><block type="math_arithmetic" id="u_1U69*{!i(U2!sSEprk"><field name="OP">ADD</field><value name="A"><block type="variables_get_int" id="di_ixP,v~K,t4?^U:NyF"><field name="VAR" id="@}]n?Kq_D6UeW(:5;Tyk" variabletype="Number">lengte</field></block></value><value name="B"><block type="char_type" id="()B.h#-q438RX_QsJGR)"><field name="BITMASK">10</field></block></value></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></next></block></next></block></next></block></next></block></next></block></statement></block></xml>');
      });
      
    }

    if( curr === 1 || curr === 3 || curr === 5 ){
      $("#myform")[0].lastChild.remove();
    }

    if( curr === 1 ){
      DwenguinoBlockly.loadFileXmlIntoWorkspace('<xml xmlns="https://developers.google.com/blockly/xml"><block type="setup_loop_structure" id="1I]~r.6S`{OYV=[Y(aoR" x="-60" y="2"><statement name="SETUP"><block type="line_comment" id="sOJnGtBL;4_jq#V_$q,O"><field name="TEXT">Verplaats stylo</field><next><block type="drawingrobot_lift_stylus" id="lQuXy_f$r|2XSLxG$In0"><next><block type="drawingrobot_line" id="@LPn.%_(Zud2GCMZrO5K"><value name="x"><block type="char_type" id="~LZawhNQ*ihuO@d~naz}"><field name="BITMASK">100</field></block></value><value name="y"><block type="char_type" id="d,gt[M-bH_VHAApH|9ZV"><field name="BITMASK">100</field></block></value><next><block type="drawingrobot_lower_stylus" id=",;BftY/.z{#,@cAo_y^9"><next><block type="line_comment" id="{Gl[SeDd*gYUsE-eq-my"><field name="TEXT">Teken een cirkel</field><next><block type="drawingrobot_circle" id=";V.|{~tDBM!Y9A5xnZ@p"><value name="radius"><block type="math_number" id="kK9bUm)*,ArZNV%y*4/~"><field name="NUM">20</field></block></value><next><block type="line_comment" id="-J$S%ti]YP/|tsuuU#vD"><field name="TEXT">Verplaats stylo</field><next><block type="drawingrobot_lift_stylus" id="JI5o6~kzv}irMO$z{[R7"><next><block type="drawingrobot_line" id="?y8j/k+CXYf;rQAZndes"><value name="x"><block type="char_type" id="#*~Cxd%]y@pIa%88QK:U"><field name="BITMASK">200</field></block></value><value name="y"><block type="char_type" id="j74M{QeAp`YH!g47aOh-"><field name="BITMASK">100</field></block></value><next><block type="drawingrobot_lower_stylus" id="DFca%?jU)`J%G%PGRofD"><next><block type="line_comment" id="}$aSh[~-pWd}6`u9sS;I"><field name="TEXT">Teken een cirkel</field><next><block type="drawingrobot_circle" id="TZipYX|=M$VVj@X,@IX6"><value name="radius"><block type="math_number" id="8?!,mNB^B6]#okx;HST("><field name="NUM">20</field></block></value><next><block type="line_comment" id="/ZQZ[~i^BkVSe]TDS{h#"><field name="TEXT">Verplaats stylo</field><next><block type="drawingrobot_lift_stylus" id="K)L*I4/dyjzZCXa{$,:{"><next><block type="drawingrobot_line" id="Tdrg~D`;k3m;FZU12u`z"><value name="x"><block type="char_type" id="r*?{+}rm=+R!cX+~k8QO"><field name="BITMASK">300</field></block></value><value name="y"><block type="char_type" id="_y;1%vCR@:3.#/U;M#N("><field name="BITMASK">100</field></block></value><next><block type="drawingrobot_lower_stylus" id="2cQVA{}jPl+@Etk{A2^S"><next><block type="line_comment" id="b[otvefd-Dk}mT~8+]zo"><field name="TEXT">Teken een cirkel</field><next><block type="drawingrobot_circle" id="XG$Hf6Z~ka2)G$[~)0:;"><value name="radius"><block type="math_number" id="EfhS+uv27-HJ+W:fjHO~"><field name="NUM">20</field></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></xml>');
    }
    if( curr === 3 ){
      DwenguinoBlockly.loadFileXmlIntoWorkspace('<xml xmlns="https://developers.google.com/blockly/xml"><block type="setup_loop_structure" id="1I]~r.6S`{OYV=[Y(aoR" x="10" y="10"><statement name="SETUP"><block type="line_comment" id="sOJnGtBL;4_jq#V_$q,O"><field name="TEXT">Verplaats stylo</field><next><block type="drawingrobot_lift_stylus" id="kDp/80k:cZrHZ!eUS/(w"><next><block type="drawingrobot_line" id="+y_G#hWe.2-qd12hm#*%"><value name="x"><block type="math_number" id="jx:V?p~F2,M@h^L}tK6i"><field name="NUM">100</field></block></value><value name="y"><block type="math_number" id="w9YJTnU%|o#BcSzSvT=V"><field name="NUM">100</field></block></value><next><block type="drawingrobot_lower_stylus" id="V$]?G}~r%YqK(!UmKwZ="><next><block type="line_comment" id="{Gl[SeDd*gYUsE-eq-my"><field name="TEXT">Tekenen</field><next><block type="drawingrobot_circle" id=";V.|{~tDBM!Y9A5xnZ@p"><value name="radius"><block type="math_number" id="kK9bUm)*,ArZNV%y*4/~"><field name="NUM">20</field></block></value><next><block type="line_comment" id="-J$S%ti]YP/|tsuuU#vD"><field name="TEXT">Verplaats stylo</field><next><block type="drawingrobot_lift_stylus" id="93j-E/%usu?vd}cr=F[J"><next><block type="drawingrobot_line" id="cH{gyGv|!u%xn;k;^aYm"><value name="x"><block type="math_number" id="M4!(v_{K$;hivA+{BBQ0"><field name="NUM">200</field></block></value><value name="y"><block type="math_number" id="JWvMi+tIJ3dx4={RQG#/"><field name="NUM">100</field></block></value><next><block type="drawingrobot_lower_stylus" id="06.F3Qkggamre)lxt;Qn"><next><block type="line_comment" id="}$aSh[~-pWd}6`u9sS;I"><field name="TEXT">Tekenen</field><next><block type="drawingrobot_rectangle" id="Q|OT{Sda6$o$JJWICii5"><value name="width"><block type="math_number" id="hEz3^gb,(?+!Av{?5zu@"><field name="NUM">10</field></block></value><value name="height"><block type="math_number" id="pO,1~=Xd`KVl1}CD9w3t"><field name="NUM">10</field></block></value><next><block type="line_comment" id="/ZQZ[~i^BkVSe]TDS{h#"><field name="TEXT">Verplaats stylo</field><next><block type="drawingrobot_lift_stylus" id="lQuXy_f$r|2XSLxG$In0"><next><block type="drawingrobot_line" id="@LPn.%_(Zud2GCMZrO5K"><value name="x"><block type="math_number" id="^^!6|xRVj(OwJf{C.JX{"><field name="NUM">300</field></block></value><value name="y"><block type="math_number" id="F?_$fB:eg@UpiK+wxlT-"><field name="NUM">100</field></block></value><next><block type="drawingrobot_lower_stylus" id=",;BftY/.z{#,@cAo_y^9"><next><block type="line_comment" id="b[otvefd-Dk}mT~8+]zo"><field name="TEXT">Tekenen</field><next><block type="drawingrobot_rectangle" id="s%gBnkW,TWyH$aBV|z{}"><value name="width"><block type="math_number" id="!~.fWtx.^r9kq%{A-C(u"><field name="NUM">20</field></block></value><value name="height"><block type="math_number" id="Ave=sQhk^lNfnE*RQ5z)"><field name="NUM">30</field></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></xml>');
    }
    if( curr === 5 ){
      DwenguinoBlockly.loadFileXmlIntoWorkspace('<xml xmlns="https://developers.google.com/blockly/xml"><block type="setup_loop_structure" id="1I]~r.6S`{OYV=[Y(aoR" x="10" y="10"><statement name="SETUP"><block type="line_comment" id="sOJnGtBL;4_jq#V_$q,O"><field name="TEXT">Verplaats stylo</field><next><block type="drawingrobot_lift_stylus" id="kDp/80k:cZrHZ!eUS/(w"><next><block type="drawingrobot_line" id="+y_G#hWe.2-qd12hm#*%"><value name="x"><block type="math_number" id="jx:V?p~F2,M@h^L}tK6i"><field name="NUM">100</field></block></value><value name="y"><block type="math_number" id="w9YJTnU%|o#BcSzSvT=V"><field name="NUM">100</field></block></value><next><block type="drawingrobot_lower_stylus" id="V$]?G}~r%YqK(!UmKwZ="><next><block type="line_comment" id="{Gl[SeDd*gYUsE-eq-my"><field name="TEXT">Tekenen</field><next><block type="drawingrobot_circle" id=";V.|{~tDBM!Y9A5xnZ@p"><value name="radius"><block type="math_number" id="kK9bUm)*,ArZNV%y*4/~"><field name="NUM">20</field></block></value><next><block type="line_comment" id="-J$S%ti]YP/|tsuuU#vD"><field name="TEXT">Verplaats stylo</field><next><block type="drawingrobot_lift_stylus" id="93j-E/%usu?vd}cr=F[J"><next><block type="drawingrobot_move" id="c`I9Scgy9iCxsTL%r*yd"><field name="direction">3</field><value name="amount"><block type="math_number" id="Jhz*~N%_,2u:}}*Z!|@}"><field name="NUM">30</field></block></value><next><block type="drawingrobot_lower_stylus" id="06.F3Qkggamre)lxt;Qn"><next><block type="line_comment" id="}$aSh[~-pWd}6`u9sS;I"><field name="TEXT">Tekenen</field><next><block type="drawingrobot_rectangle" id="Q|OT{Sda6$o$JJWICii5"><value name="width"><block type="math_number" id="hEz3^gb,(?+!Av{?5zu@"><field name="NUM">10</field></block></value><value name="height"><block type="math_number" id="pO,1~=Xd`KVl1}CD9w3t"><field name="NUM">10</field></block></value><next><block type="line_comment" id="/ZQZ[~i^BkVSe]TDS{h#"><field name="TEXT">Verplaats stylo</field><next><block type="drawingrobot_lift_stylus" id="lQuXy_f$r|2XSLxG$In0"><next><block type="drawingrobot_move" id="`m-I$q[0T[q{7%h[4%nt"><field name="direction">1</field><value name="amount"><block type="math_number" id="IO~vnB.w+20{IA$N:yJx"><field name="NUM">50</field></block></value><next><block type="drawingrobot_lower_stylus" id=",;BftY/.z{#,@cAo_y^9"><next><block type="line_comment" id="b[otvefd-Dk}mT~8+]zo"><field name="TEXT">Tekenen</field><next><block type="drawingrobot_rectangle" id="s%gBnkW,TWyH$aBV|z{}"><value name="width"><block type="math_number" id="!~.fWtx.^r9kq%{A-C(u"><field name="NUM">20</field></block></value><value name="height"><block type="math_number" id="Ave=sQhk^lNfnE*RQ5z)"><field name="NUM">30</field></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></xml>');
    }
  },
};


