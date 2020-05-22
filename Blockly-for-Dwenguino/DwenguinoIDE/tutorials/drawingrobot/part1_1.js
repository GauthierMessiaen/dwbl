/**
 * Implementation of this tour with Hopscotch
 */

tutorials.drawingRobot1_1 = {
    category: "drawingrobot",
    targets: [
      document.body,  // 0
      tutorialTargets.simulatorButton,  // 1
      tutorialTargets.simulatorScenarioDrawingRobot,  // 2
      tutorialTargets.toolbox,  // 3
      tutorialTargets.toolbox,  // 4
      tutorialTargets.simulatorStartButton, // 5
      tutorialTargets.simulatorStartButton, // 6
      tutorialTargets.difficultyMenu,  // 7
      tutorialTargets.difficultyMenu,  // 8
      tutorialTargets.difficultyMenu,  // 9
    ],
    placements: [
      "top",    // 0 (intro)
      "left",   // 1 (open sim)
      "left",   // 2 (draw sim)
      "right",  // 3 (setup)
      "right",  // 4 (select square)
      "bottom", // 5 (change values)
      "left",   // 6 (play)
      "bottom",  // 7  (info)
      "bottom",  // 8 (select circle)
      "bottom",  // 9
    ],
    nrOfSteps: 14,
    xOffsets: [
      500,  // 0
      0,    // 1
      -10,  // 2
      100,  // 3
      0,    // 4
      -200, // 5
      0,    // 6
      0,  // 7
      0,    // 8
      0,  // 9
    ],
    yOffsets: [
      500,  // 0
      0,    // 1
      -27,  // 2
      0,    // 3
      160,  // 4
      0,    // 5
      0,    // 6
      0,  // 7
      0,  // 8
      0,  // 9 
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
          title: MSG.tutorials.drawingrobot['part1_1'].stepTitles[i],
          content: MSG.tutorials.drawingrobot['part1_1'].stepContents[i],
          target: this.targets[i],
          placement: this.placements[i],
          showCloseButton:"true",
          width: 400,
          xOffset: this.xOffsets[i],
          yOffset: this.yOffsets[i],
        });
      }
    },
    id: "part1_1",
    label: MSG.tutorials.drawingrobot['part1_1'].label,
    onStart: function(){
      DwenguinoBlockly.loadFileXmlIntoWorkspace('<xml><block type="setup_loop_structure" id="Pk`h)EM}qg!)OyIV5]4P" x="10" y="10"></block></xml>');
      
      var cats = ["catDrawingRobot"]; // catLogic catLoops catMath catText catVariables catDwenguino catSocialRobot catDrawingRobot catComments
      var blocks = ["drawingrobot_rectangle", "drawingrobot_circle", "drawingrobot_color"];
      drawingrobotTutorialChecks.toolboxUpdate(cats,blocks, true,true);
    },
    onEnd: function(){
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      DwenguinoBlockly.setDifficultyLevel(0);
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("endTutorial", DwenguinoBlockly.tutorialId + ",xml:"+JSON.stringify(xml.innerHTML)));
      TutorialMenu.endTutorial();
    },
    onNext: function(){
      var curr = hopscotch.getCurrStepNum();
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("tutorialNextStep", DwenguinoBlockly.tutorialIdSetting + ",step" + curr + ",xml:"+JSON.stringify(xml.innerHTML)));
      // console.log(DwenguinoBlockly.createEvent("tutorialNextStep", DwenguinoBlockly.tutorialIdSetting));

      
      if(curr === 2){
        drawingrobotTutorialChecks.simulationPaneOpen();
      }

      if(curr === 3){
        drawingrobotTutorialChecks.drawingPaneOpen();
      }

      if(curr === 5 ){
        drawingrobotTutorialChecks.rectangleAdded();
      }

      if( curr === 9 ){
        drawingrobotTutorialChecks.circleAdded();
      }
    },

    onPrev: function(){
      var curr = hopscotch.getCurrStepNum();
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("tutorialPrevStep", DwenguinoBlockly.tutorialIdSetting + ",step" + curr));
      // console.log(DwenguinoBlockly.createEvent("tutorialPrevStep", DwenguinoBlockly.tutorialIdSetting));
    },

    onClose: function() {
      DwenguinoBlockly.setDifficultyLevel(0);
    },
    onError: function() {
      DwenguinoBlockly.setDifficultyLevel(0);
    },

    onShow: function(){
        var curr = hopscotch.getCurrStepNum();
        if(curr === 0  || curr >= 7 ){
          $('.hopscotch-bubble-arrow-container').css('visibility', 'hidden');
        }
    },
    
};