/**
 * Implementation of this tour with Hopscotch
 */

tutorials.drawingRobot2_7_1 = {
    category: "drawingrobot2",
    targets: new Array(22).fill(tutorialTargets.difficultyMenu),
    placements: new Array(22).fill("bottom"),
    nrOfSteps: 22,
    xOffsets: new Array(22).fill(0),
    yOffsets: new Array(22).fill(0),
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
      this.targets[3] = tutorialTargets.difficultyMenu;
      this.placements[3] = "bottom";
      this.xOffsets[3] = 0;
      this.yOffsets[3] = 0;

      
      var i;
      for (i = 0 ; i < this.nrOfSteps ; i++){
        this.steps.push({
          title: MSG.tutorials.drawingrobot['part7_1'].stepTitles[i],
          content: MSG.tutorials.drawingrobot['part7_1'].stepContents[i],
          target: this.targets[i],
          placement: this.placements[i],
          showCloseButton:"true",
          width: 450,
          xOffset: this.xOffsets[i],
          yOffset: this.yOffsets[i],
        });
      }
    },
    id: "part7_1",
    label: MSG.tutorials.drawingrobot['part7_1'].label,
    onStart: function(){
      //Load blocks with xml file
      DwenguinoBlockly.loadFileXmlIntoWorkspace('<xml><block type="setup_loop_structure" id="Pk`h)EM}qg!)OyIV5]4P" x="10" y="10"></block></xml>');

      // var cats = ["catDrawingRobot"]; // catLogic catLoops catMath catText catVariables catDwenguino catSocialRobot catDrawingRobot catComments
      // var blocks = ["drawingrobot_rectangle", "drawingrobot_circle", "drawingrobot_color"];
      // drawingrobotTutorialChecks.toolboxUpdate(cats,blocks, true,true);
    },
    onEnd: function(){
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      // DwenguinoBlockly.setDifficultyLevel(0)
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("endTutorial", DwenguinoBlockly.tutorialId+ ",xml:"+JSON.stringify(xml.innerHTML)));
      TutorialMenu.endTutorial();
    },
    onNext: function(){
      var curr = hopscotch.getCurrStepNum();
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("tutorialNextStep", DwenguinoBlockly.tutorialIdSetting + ",step" + curr + ",xml:"+JSON.stringify(xml.innerHTML)));
      // console.log(DwenguinoBlockly.createEvent("tutorialNextStep", DwenguinoBlockly.tutorialIdSetting));
      
      
    //   // ---FOR TESTING---
    //   if(curr === 1){
    //       hopscotch.showStep(5);
    //   }// -------


      if(curr === 1){
        DwenguinoBlockly.loadFileXmlIntoWorkspace('<xml xmlns="https://developers.google.com/blockly/xml"><block type="setup_loop_structure" id="{!#G/xhK488xxV]YA,#?" x="-9" y="-114"><statement name="SETUP"><block type="line_comment" id="vz~#sP^Bq*4@L#};V}D2"><field name="TEXT">vierkant tekenen</field><next><block type="drawingrobot_move" id="!ZXhAi#MhaUe62+ziSH~"><field name="direction">3</field><value name="amount"><block type="math_number" id="@T..ceu12^2/I6p_h4m`"><field name="NUM">20</field></block></value><next><block type="drawingrobot_move" id="@t?Xt_UqGy-I)]}O@Z:o"><field name="direction">1</field><value name="amount"><block type="math_number" id="=R#T5C_AFPU_XP*0)@uJ"><field name="NUM">20</field></block></value><next><block type="drawingrobot_move" id="oE?`1+Txi=_)-$=RxuSQ"><field name="direction">2</field><value name="amount"><block type="math_number" id="N%tnoT~{[;Q-Jyx-Sv+u"><field name="NUM">20</field></block></value><next><block type="drawingrobot_move" id="lH-]Q5J@*|ytB)B$?TPq"><field name="direction">0</field><value name="amount"><block type="math_number" id="]Hl3`qPR/(=xKFHs_N5f"><field name="NUM">20</field></block></value><next><block type="line_comment" id="b~(s~0Y*QT.6!I#A^Ai,"><field name="TEXT">verplaats naar volgende locatie</field><next><block type="drawingrobot_move" id="ny}xg1Gh:Ai9z3=AI`fe"><field name="direction">1</field><value name="amount"><block type="math_number" id="RbX%+[R#3ib!dAzf]Rnf"><field name="NUM">20</field></block></value><next><block type="line_comment" id="8@*#|m(Vw$)W,du*;0fC"><field name="TEXT">vierkant tekenen</field><next><block type="drawingrobot_move" id="36WSq^;:kvj{E{*Q_FYU"><field name="direction">3</field><value name="amount"><block type="math_number" id="7%.{h~2Z,qQO+Y!IhHn_"><field name="NUM">20</field></block></value><next><block type="drawingrobot_move" id="[*54|@j3$JIXtz_9~h~L"><field name="direction">1</field><value name="amount"><block type="math_number" id="LHf29`feXtTh,-vgi7+w"><field name="NUM">20</field></block></value><next><block type="drawingrobot_move" id="%~YA!WZ?^3u^}0}1Az0@"><field name="direction">2</field><value name="amount"><block type="math_number" id="HX^?3Gv#;4?XJC/waET*"><field name="NUM">20</field></block></value><next><block type="drawingrobot_move" id="P5E%Sg{$fd_c9%2=uN7j"><field name="direction">0</field><value name="amount"><block type="math_number" id=",DcheUHUos@tW5Fr!HYY"><field name="NUM">20</field></block></value><next><block type="line_comment" id="@tDlkwA1ug4k?mxbeI=1"><field name="TEXT">verplaats naar volgende locatie</field><next><block type="drawingrobot_move" id="=|8i_%aZGvR{dj5NO]sU"><field name="direction">2</field><value name="amount"><block type="math_number" id="@3(3jr-Er2|dO8}G3*e2"><field name="NUM">20</field></block></value><next><block type="line_comment" id="M,c#6=MQ!r|1M0no)VJz"><field name="TEXT">vierkant tekenen</field><next><block type="drawingrobot_move" id="=Mkg0(V!_8*A`((%~Ow|"><field name="direction">3</field><value name="amount"><block type="math_number" id="U]Tjy.Kt0XB(-`O{o4Hm"><field name="NUM">20</field></block></value><next><block type="drawingrobot_move" id="z}f!OG~/-d@l4%}nTXrZ"><field name="direction">1</field><value name="amount"><block type="math_number" id="Ij]axjfx*ktge%S|~mPa"><field name="NUM">20</field></block></value><next><block type="drawingrobot_move" id="d[Ly3gzMPGX`3%nxu*K#"><field name="direction">2</field><value name="amount"><block type="math_number" id="d:*vZaN#lG]#!ljDm{@+"><field name="NUM">20</field></block></value><next><block type="drawingrobot_move" id="FV;j/e,E9Q14Km#]k`jy"><field name="direction">0</field><value name="amount"><block type="math_number" id="jdkhEhryL5]}oEAxc,`J"><field name="NUM">20</field></block></value><next><block type="line_comment" id="wf$/Q1{.Mc4nWBuCN)`="><field name="TEXT">verplaats naar volgende locatie</field><next><block type="drawingrobot_move" id="%`2A(bgpaathI*J^Hrk{"><field name="direction">0</field><value name="amount"><block type="math_number" id="/qO~pgHlANDS/K?*)Y$8"><field name="NUM">20</field></block></value><next><block type="line_comment" id=";;gDZN0N$AY-gO/5aN)C"><field name="TEXT">vierkant tekenen</field><next><block type="drawingrobot_move" id="UUi:FS**1%k[etAGto=y"><field name="direction">3</field><value name="amount"><block type="math_number" id="Ox1^eR,sc$z1s}nx~vrq"><field name="NUM">20</field></block></value><next><block type="drawingrobot_move" id="+iRt+iR~hWr7[teZE-i."><field name="direction">1</field><value name="amount"><block type="math_number" id="CwCl}P{v9z*Dra$V$I_e"><field name="NUM">20</field></block></value><next><block type="drawingrobot_move" id="TbcG*L[KW1j*4kFrL@-("><field name="direction">2</field><value name="amount"><block type="math_number" id="0|#Oi[A$O?q-ji5CowMo"><field name="NUM">20</field></block></value><next><block type="drawingrobot_move" id="/t4Io^L%HAMF;Lt3:Vuw"><field name="direction">0</field><value name="amount"><block type="math_number" id="{wwFHV[G3M?DU9Mx..n]"><field name="NUM">20</field></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></xml>');

      }
      if(curr === 11){
        DwenguinoBlockly.loadFileXmlIntoWorkspace('<xml><block type="setup_loop_structure" id="{!#G/xhK488xxV]YA,#?" x="-80" y="-54"></block></xml>');
      }


      // exercise 1
      if(curr === 4){
        drawingrobotTutorialChecks.checkExercise7_1_1();
      }
      if(curr === 5){
        drawingrobotTutorialChecks.checkExercise7_1_2();
      }
      if(curr === 6){
        drawingrobotTutorialChecks.checkExercise7_1_3();
      }
      if(curr === 7){
        drawingrobotTutorialChecks.checkExercise7_1_4();
      }
      if(curr === 8){
        drawingrobotTutorialChecks.checkExercise7_1_5();
      }
      if(curr === 9){
        drawingrobotTutorialChecks.checkExercise7_1_6();
      }
      // exercise 2
      if(curr === 13){
        drawingrobotTutorialChecks.checkExercise7_1_7();
      }
      if(curr === 14){
        drawingrobotTutorialChecks.checkExercise7_1_8();
      }
      if(curr === 16){
        drawingrobotTutorialChecks.checkExercise7_1_9();
      }
      if(curr === 18){
        drawingrobotTutorialChecks.checkExercise7_1_10();
      }
      if(curr === 19){
        drawingrobotTutorialChecks.checkExercise7_1_11();
      }
      if(curr === 20){
        drawingrobotTutorialChecks.checkExercise7_1_12();
      }
    },

    onPrev: function(){
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("tutorialPrevStep", DwenguinoBlockly.tutorialIdSetting));
      console.log(DwenguinoBlockly.createEvent("tutorialPrevStep", DwenguinoBlockly.tutorialIdSetting));

      var curr = hopscotch.getCurrStepNum();
    },
    
    onShow: function(){      
      var curr = hopscotch.getCurrStepNum();  
      if (curr !== 3 ){
        $('.hopscotch-bubble-arrow-container').css('visibility', 'hidden');
      }
    },
};


