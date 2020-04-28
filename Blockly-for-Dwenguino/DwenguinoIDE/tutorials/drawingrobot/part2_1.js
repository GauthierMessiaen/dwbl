/**
 * Implementation of this tour with Hopscotch
 */

tutorials.drawingRobot2_1 = {
    category: "drawingrobot",
    targets: [
      tutorialTargets.simulatorStopButton
    ],
    placements: [
      "right"
    ],
    nrOfSteps: 9,
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
          title: MSG.tutorials.drawingrobot['part2_1'].stepTitles[i],
          content: MSG.tutorials.drawingrobot['part2_1'].stepContents[i],
          target: this.targets[0],
          placement: this.placements[0],
          showCloseButton:"true",
          width: 450,
          xOffset: this.xOffsets[0],
          yOffset: this.yOffsets[0],
        });
      }
    },
    id: "part2_1",
    label: MSG.tutorials.drawingrobot['part2_1'].label,
    onStart: function(){
      //Load blocks with xml file
      DwenguinoBlockly.loadFileXmlIntoWorkspace('<xml><block type="setup_loop_structure" id="Pk`h)EM}qg!)OyIV5]4P" x="10" y="10"></block></xml>');

    },
    onEnd: function(){
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("endTutorial", DwenguinoBlockly.tutorialId+ ",xml:"+JSON.stringify(xml.innerHTML)));
      TutorialMenu.endTutorial();
    },
    onNext: function(){
      var curr = hopscotch.getCurrStepNum();
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("tutorialNextStep", DwenguinoBlockly.tutorialIdSetting + ",step" + curr + ",xml:"+JSON.stringify(xml.innerHTML)));
      // console.log(DwenguinoBlockly.createEvent("tutorialNextStep", DwenguinoBlockly.tutorialIdSetting));
      
      
      // // ---FOR TESTING---
      //     hopscotch.showStep(5);
      // }// -------


      if(curr === 2){
          drawingrobotTutorialChecks.simulationPaneOpen();
          drawingrobotTutorialChecks.drawingPaneOpen();
      }

      if(curr === 3){
          drawingrobotTutorialChecks.moveAdded();
      }

      if(curr === 5){
          drawingrobotTutorialChecks.lineAdded();
      }

      if(curr === 7){
        drawingrobotTutorialChecks.upDownAdded();
    }
    },

    onPrev: function(){
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("tutorialPrevStep", DwenguinoBlockly.tutorialIdSetting));
      console.log(DwenguinoBlockly.createEvent("tutorialPrevStep", DwenguinoBlockly.tutorialIdSetting));

      var curr = hopscotch.getCurrStepNum();
    },

    onShow: function(){        
        $('.hopscotch-bubble-arrow-container').css('visibility', 'hidden');
    },
};


