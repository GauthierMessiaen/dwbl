/**
 * Implementation of this tour with Hopscotch
 */

tutorials.drawingRobot1_2 = {
    category: "drawingrobot",
    targets: [
      tutorialTargets.simulatorStopButton,
    ],
    placements: [
      "right"
    ],
    nrOfSteps: 3,
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
          title: MSG.tutorials.drawingrobot['part1_2'].stepTitles[i],
          content: MSG.tutorials.drawingrobot['part1_2'].stepContents[i],
          target: this.targets[0],
          placement: this.placements[0],
          showCloseButton:"true",
          width: 450,
          xOffset: this.xOffsets[0],
          yOffset: this.yOffsets[0],
        });
      }
    },
    id: "part1_2",
    label: MSG.tutorials.drawingrobot['part1_2'].label,
    onStart: function(){
      //Load blocks with xml file
      DwenguinoBlockly.loadFileXmlIntoWorkspace('<xml><block type="setup_loop_structure" id="Pk`h)EM}qg!)OyIV5]4P" x="10" y="10"></block></xml>');
      
      
      var cats = ["catDrawingRobot"]; // catLogic catLoops catMath catText catVariables catDwenguino catSocialRobot catDrawingRobot catComments
      var blocks = ["drawingrobot_rectangle", "drawingrobot_circle", "drawingrobot_color"];
      drawingrobotTutorialChecks.toolboxUpdate(cats,blocks, true,true);

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
    },
    onEnd: function(){
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      DwenguinoBlockly.setDifficultyLevel(0);
      $("#tutorial_example").remove();
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("endTutorial", DwenguinoBlockly.tutorialId+ ",xml:"+JSON.stringify(xml.innerHTML)));
      TutorialMenu.endTutorial();
    },
    onNext: function(){
      var curr = hopscotch.getCurrStepNum();
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("tutorialNextStep", DwenguinoBlockly.tutorialIdSetting + ",step" + curr + ",xml:"+JSON.stringify(xml.innerHTML)));
      // console.log(DwenguinoBlockly.createEvent("tutorialNextStep", DwenguinoBlockly.tutorialIdSetting));
      
      
      if(curr === 1 ){
        $('#tutorial_example_img').attr("src","./DwenguinoIDE/img/tutorials/drawingrobot/1.png");
      }

      if(curr === 2 ){
        drawingrobotTutorialChecks.checkExercise1();
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
        $('.hopscotch-bubble-arrow-container').css('visibility', 'hidden');
    },
};

