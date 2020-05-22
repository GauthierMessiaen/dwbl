/**
 * Implementation of this tour with Hopscotch
 */

tutorials.drawingRobot2_2_1 = {
    category: "drawingrobot2",
    targets: [
      tutorialTargets.difficultyMenu
    ],
    placements: [
      "bottom"
    ],
    nrOfSteps: 10,
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
      // Question 1
      var question1Text = MSG.tutorials.drawingrobot['part2_1'].questions[0];
      var answer1_a = new TutorialAnswer(0,MSG.tutorials.drawingrobot['part2_1'].answers[0]);
      var answer1_b = new TutorialAnswer(1,MSG.tutorials.drawingrobot['part2_1'].answers[1]);
      var answer1_c = new TutorialAnswer(2,MSG.tutorials.drawingrobot['part2_1'].answers[2]);
      var answer1_d = new TutorialAnswer(3,MSG.tutorials.drawingrobot['part2_1'].answers[3]);
      var answers1 = [answer1_a, answer1_b, answer1_c, answer1_d];
      question1 = new TutorialMultipleChoiceQuestion("q1", question1Text, answers1, answer1_c);
      MSG.tutorials.drawingrobot['part2_1'].stepContents2[5] = question1.getHtml();

      for (var i = 0 ; i < this.nrOfSteps ; i++){
        this.steps.push({
          title: MSG.tutorials.drawingrobot['part2_1'].stepTitles2[i],
          content: MSG.tutorials.drawingrobot['part2_1'].stepContents2[i],
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


      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("endTutorial", DwenguinoBlockly.tutorialId + ",xml:" + JSON.stringify(xml.innerHTML) + ",timeTaken:" + t));
      TutorialMenu.endTutorial();
    },
    onNext: function(){
      var curr = hopscotch.getCurrStepNum();
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("tutorialNextStep", DwenguinoBlockly.tutorialIdSetting + ",step" + curr + ",xml:"+JSON.stringify(xml.innerHTML)));
      // console.log(DwenguinoBlockly.createEvent("tutorialNextStep", DwenguinoBlockly.tutorialIdSetting));
      
      
      // // ---FOR TESTING---
      // if(curr === 1){
      //     hopscotch.showStep(5);
      // }
      // // -------
      
  
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

      if(curr === 6){
        drawingrobotTutorialChecks.checkAnswer(question1);
      }

      if(curr === 8){
        drawingrobotTutorialChecks.upDownAdded();
      }
    },

    onPrev: function(){
    },

    onClose: function() {
      DwenguinoBlockly.setDifficultyLevel(0);
    },
    onError: function() {
      DwenguinoBlockly.setDifficultyLevel(0);
    },

    onShow: function(){    
      var curr = hopscotch.getCurrStepNum();    
      $('.hopscotch-bubble-arrow-container').css('visibility', 'hidden');
      $("#sim_menu").show();
      $("#sim_scenarioTag").css("margin-top","0px"); 

      if( curr === 4 || curr === 5){
        $("#sim_menu").hide();
        $("#sim_scenarioTag").css("margin-top","60px"); 
      }

      if(curr === 5){
        $("#0")[0].nextSibling.textContent = "";
        $("#0").after("<img src='./DwenguinoIDE/img/tutorials/drawingrobot/question2_1_c.png'>");
        
        $("#1")[0].nextSibling.textContent = "";
        $("#1").after("<img src='./DwenguinoIDE/img/tutorials/drawingrobot/question2_1_d.png'>");

        $("#2")[0].nextSibling.textContent = "";
        $("#2").after("<img src='./DwenguinoIDE/img/tutorials/drawingrobot/question2_1_a.png'>");

        $("#3")[0].nextSibling.textContent = "";
        $("#3").after("<img src='./DwenguinoIDE/img/tutorials/drawingrobot/question2_1_b.png'>");

        $("#myform")[0].lastChild.remove();
      }

        
    },
};


