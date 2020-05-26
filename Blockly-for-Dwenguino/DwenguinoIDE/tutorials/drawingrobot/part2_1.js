/**
 * Implementation of this tour with Hopscotch
 */

tutorials.drawingRobot2_1 = {
    category: "drawingrobot",
    timeStart: 0,
    timeEnd: 0,
    targets: [
      tutorialTargets.difficultyMenu
    ],
    placements: [
      "bottom"
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

      var cats = ["catDrawingRobot"]; // catLogic catLoops catMath catText catVariables catDwenguino catSocialRobot catDrawingRobot catComments
      var blocks = ["drawingrobot_circle", "drawingrobot_rectangle", "drawingrobot_stepper_motor"];
      drawingrobotTutorialChecks.toolboxUpdate(cats,blocks, true,false);

    },
    onEnd: function(){
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);

      //reset toolbox
      DwenguinoBlockly.setDifficultyLevel(0);

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
      
      
      // // ---FOR TESTING---
      //     hopscotch.showStep(5);
      // // -------

  
      if(curr === 2){
          $("#sim_start").removeClass("sim_item").addClass("sim_item_disabled");
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
      var curr = hopscotch.getCurrStepNum();
      var data = {
        tutorialname: DwenguinoBlockly.tutorialIdSetting,
        step: curr,
      }
      data = JSON.stringify(data);
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("tutorialPrevStep", data ));
      // console.log(DwenguinoBlockly.createEvent("tutorialPrevStep", DwenguinoBlockly.tutorialIdSetting + ",step" + curr + ",xml:"+JSON.stringify(xml.innerHTML)));
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


