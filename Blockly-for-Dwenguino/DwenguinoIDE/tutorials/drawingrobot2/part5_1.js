/**
 * Implementation of this tour with Hopscotch
 */

tutorials.drawingRobot5_1 = {
    category: "drawingrobot",
    targets: new Array(14).fill(tutorialTargets.simulatorStopButton),
    placements: new Array(14).fill("right"),
    nrOfSteps: 14,
    xOffsets: new Array(14).fill(0),
    yOffsets: new Array(14).fill(0),
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
      this.targets[10] = tutorialTargets.simulatorButtons;
      this.placements[10] = "left";
      this.xOffsets[10] = 0;
      this.yOffsets[10] = 0;
      var i;
      for (i = 0 ; i < this.nrOfSteps ; i++){
        this.steps.push({
          title: MSG.tutorials.drawingrobot['part5_1'].stepTitles[i],
          content: MSG.tutorials.drawingrobot['part5_1'].stepContents[i],
          target: this.targets[i],
          placement: this.placements[i],
          showCloseButton:"true",
          width: 450,
          xOffset: this.xOffsets[i],
          yOffset: this.yOffsets[i],
        });
      }
    },
    id: "part5_1",
    label: MSG.tutorials.drawingrobot['part5_1'].label,
    onStart: function(){
      //Load blocks with xml file
      DwenguinoBlockly.loadFileXmlIntoWorkspace('<xml><block type="setup_loop_structure" id="Pk`h)EM}qg!)OyIV5]4P" x="10" y="10"></block></xml>');

      var cats = ["catDrawingRobot","catLogic","catVariables","catMath","catDwenguino"]; // catLogic catLoops catMath catText catVariables catDwenguino catSocialRobot catDrawingRobot catComments
      var blocks = [];
      drawingrobotTutorialChecks.toolboxUpdate(cats,blocks, true,false);
    },
    onEnd: function(){
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      DwenguinoBlockly.setDifficultyLevel(0);
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("endTutorial", DwenguinoBlockly.tutorialId+ ",xml:"+JSON.stringify(xml.innerHTML)));
      TutorialMenu.endTutorial();
    },
    onNext: function(){
      var curr = hopscotch.getCurrStepNum();
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("tutorialNextStep", DwenguinoBlockly.tutorialIdSetting + ",step" + curr + ",xml:"+JSON.stringify(xml.innerHTML)));
      // console.log(DwenguinoBlockly.createEvent("tutorialNextStep", DwenguinoBlockly.tutorialIdSetting));

      // if(curr === 1){
      //   hopscotch.showStep(7);
      // }
      
      if(curr === 3){
        drawingrobotTutorialChecks.checkExercise5_1_1();
      }
      if(curr === 4){
        drawingrobotTutorialChecks.checkExercise5_1_2();
      }
      if(curr === 5){
        drawingrobotTutorialChecks.checkExercise5_1_3();
      }

      if(curr === 8){
        DwenguinoBlockly.loadFileXmlIntoWorkspace('<xml xmlns="https://developers.google.com/blockly/xml"><block type="setup_loop_structure" id="Pk`h)EM}qg!)OyIV5]4P" x="10" y="10"><statement name="SETUP"><block type="controls_if" id="q7Dc6j`},M.2Q[]#e5q!"><mutation else="1"/><value name="IF0"><block type="logic_compare" id="?R!?@;S=4xiIi:C^t$QA"><field name="OP">EQ</field></block></value><statement name="DO0"><block type="drawingrobot_rectangle" id="8I,rhm}fM0dY?oK[^W9A"><value name="width"><block type="math_number" id="!,pLJ]`erF6R46unV%s["><field name="NUM">30</field></block></value><value name="height"><block type="math_number" id="}-L#:=,1aaG406r.FY]P"><field name="NUM">30</field></block></value></block></statement><statement name="ELSE"><block type="drawingrobot_circle" id="`XNxtk)cT35{#/p[6Xl^"><value name="radius"><block type="math_number" id="rOF;12!umZHRY*g~b?46"><field name="NUM">30</field></block></value></block></statement></block></statement></block></xml>');
      }

      if(curr === 9){
        drawingrobotTutorialChecks.checkExercise5_1_4();
      }
      if(curr === 10){
        drawingrobotTutorialChecks.checkExercise5_1_5();
      }
      if(curr === 13){
        drawingrobotTutorialChecks.checkExercise5_1_6();
      }
    },

    onPrev: function(){
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("tutorialPrevStep", DwenguinoBlockly.tutorialIdSetting));
      console.log(DwenguinoBlockly.createEvent("tutorialPrevStep", DwenguinoBlockly.tutorialIdSetting));
    },

    onClose: function() {
      DwenguinoBlockly.setDifficultyLevel(0);
    },
    onError: function() {
      DwenguinoBlockly.setDifficultyLevel(0);
    },
    
    onShow: function(){
      var curr = hopscotch.getCurrStepNum();
      if(curr !== 10){   
        $('.hopscotch-bubble-arrow-container').css('visibility', 'hidden');
      }
    },
};


