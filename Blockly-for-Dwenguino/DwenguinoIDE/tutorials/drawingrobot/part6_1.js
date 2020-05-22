/**
 * Implementation of this tour with Hopscotch
 */

tutorials.drawingRobot6_1 = {
    category: "drawingrobot",
    targets: [
      tutorialTargets.difficultyMenu,
    ],
    placements: [
      "bottom",
    ],
    nrOfSteps: 25,
    xOffsets: [
      0,
    ],
    yOffsets: [
      0,
    ],
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
      var i;
      for (i = 0 ; i < this.nrOfSteps ; i++){
        this.steps.push({
          title: MSG.tutorials.drawingrobot['part6_1'].stepTitles[i],
          content: MSG.tutorials.drawingrobot['part6_1'].stepContents[i],
          target: this.targets[0],
          placement: this.placements[0],
          showCloseButton:"true",
          width: 450,
          xOffset: this.xOffsets[0],
          yOffset: this.yOffsets[0],
        });
      }
    },
    id: "part6_1",
    label: MSG.tutorials.drawingrobot['part6_1'].label,
    onStart: function(){
      //Load blocks with xml file
      DwenguinoBlockly.loadFileXmlIntoWorkspace('<xml><block type="setup_loop_structure" id="Pk`h)EM}qg!)OyIV5]4P" x="10" y="10"></block></xml>');

      var cats = ["catText","catSocialRobot","catComments","catDwenguino"]; // catLogic catLoops catMath catText catVariables catDwenguino catSocialRobot catDrawingRobot catComments
      var blocks = [];
      drawingrobotTutorialChecks.toolboxUpdate(cats,blocks, false,false);
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
      
      
      // ---FOR TESTING---
      // if(curr === 1){
      //     hopscotch.showStep(15);
      // }
      // -------

      // for loop
      if(curr === 5){
        drawingrobotTutorialChecks.checkExercise6_1_1(0);
      }
      if(curr === 6){
        drawingrobotTutorialChecks.checkExercise6_1_1(1);
      }
      if(curr === 7){
        drawingrobotTutorialChecks.checkExercise6_1_1(2);
      }
      if(curr === 8){
        drawingrobotTutorialChecks.checkExercise6_1_1(3);
      }
      if(curr === 9){
        drawingrobotTutorialChecks.checkExercise6_1_1(4);
      }

      if(curr === 11){
        drawingrobotTutorialChecks.checkExercise6_1_2();
      }

      // repeat block
      if(curr === 13){
        drawingrobotTutorialChecks.clear();
      }
      if(curr === 15){
        drawingrobotTutorialChecks.checkExercise6_1_3();
      }

      // while loop
      if(curr === 16){
        drawingrobotTutorialChecks.clear();
      }
      if(curr === 18){
        drawingrobotTutorialChecks.checkExercise6_1_4();
      }
      if(curr === 19){
        drawingrobotTutorialChecks.checkExercise6_1_5();
      }
      if(curr === 20){
        drawingrobotTutorialChecks.checkExercise6_1_6();
      }
      if(curr === 21){
        drawingrobotTutorialChecks.checkExercise6_1_7();
      }
      if(curr === 22){
        drawingrobotTutorialChecks.checkExercise6_1_8();
      }
      if(curr === 23){
        drawingrobotTutorialChecks.checkExercise6_1_9();
      }
    },

    onPrev: function(){
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("tutorialPrevStep", DwenguinoBlockly.tutorialIdSetting));
      console.log(DwenguinoBlockly.createEvent("tutorialPrevStep", DwenguinoBlockly.tutorialIdSetting));

      var curr = hopscotch.getCurrStepNum();
    },

    onClose: function() {
      DwenguinoBlockly.setDifficultyLevel(0);
    },
    onError: function() {
      DwenguinoBlockly.setDifficultyLevel(0);
    },
    
    onShow: function(){        
        $('.hopscotch-bubble-arrow-container').css('visibility', 'hidden');
    },
};


