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
      document.body,  // 5 (mistake in step 4)
      document.body,  // 6 (mistake in step 4)
      tutorialTargets.simulatorStartButton, // 7
      tutorialTargets.simulatorStartButton, // 8
      document.body,  // 9
      document.body,  // 10
      document.body,  // 11 (mistake in step 9)
      document.body,  // 12 (mistake in step 9)
      document.body,  // 13
    ],
    placements: [
      "top",    // 0 (intro)
      "left",   // 1 (open sim)
      "left",   // 2 (draw sim)
      "right",  // 3 (setup)
      "right",  // 4 (select square)
      "top",    // 5 (mistake in step 4)
      "top",    // 6 (mistake in step 4)
      "bottom", // 7 (change values)
      "left",   // 8 (play)
      "top",    // 9  (info)
      "top",    // 10 (select circle)
      "top",    // 11 (mistake in step 10)
      "top",    // 12 (mistake in step 10)
      "top",    // 13
    ],
    nrOfSteps: 14,
    xOffsets: [
      500,  // 0
      0,    // 1
      -10,  // 2
      100,  // 3
      0,    // 4
      500,  // 5 (mistake in step 4)
      500,  // 6 (mistake in step 4)
      -200, // 7
      0,    // 8
      500,  // 9
      500,    // 10
      500,  // 11 (mistake in step 10)
      500,  // 12 (mistake in step 10)
      500,  // 13
    ],
    yOffsets: [
      500,  // 0
      0,    // 1
      -27,  // 2
      0,    // 3
      160,  // 4
      500,  // 5 (mistake in step 4)
      500,  // 6 (mistake in step 4)
      0,    // 7
      0,    // 8
      500,  // 9
      500,  // 10
      500,  // 11 (mistake in step 10)
      500,  // 12 (mistake in step 10)
      500,  // 13 
    ],
    steps: [],
    i18n: {
        nextBtn: MSG.tutorials.next,
        prevBtn: MSG.tutorials.previous,
        doneBtn: MSG.tutorials.done,
        skipBtn: MSG.tutorials.skip,
        closeTooltip: MSG.tutorials.close,
        stepNums: [1,2,3,4,5,5,5,6,7,8,9,9,9,10]
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

    },
    onEnd: function(){
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
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

      if(curr === 5 || curr === 6 || curr === 7){
        drawingrobotTutorialChecks.rectangleAdded();
      }

      if( curr === 11 || curr === 12 || curr === 13){
        drawingrobotTutorialChecks.circleAdded();
      }
    },

    onPrev: function(){
      var curr = hopscotch.getCurrStepNum();
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("tutorialPrevStep", DwenguinoBlockly.tutorialIdSetting + ",step" + curr));
      // console.log(DwenguinoBlockly.createEvent("tutorialPrevStep", DwenguinoBlockly.tutorialIdSetting));

      
      if(curr === 5 || curr === 6){
        hopscotch.showStep(4); 
      }

      if(curr === 11 || curr === 12){
        hopscotch.showStep(10); 
      }
    },

    onShow: function(){
        var curr = hopscotch.getCurrStepNum();
        if(curr === 0 || curr === 5 || curr === 6 || curr >= 9 ){
          $('.hopscotch-bubble-arrow-container').css('visibility', 'hidden');
        }
    },
    
};