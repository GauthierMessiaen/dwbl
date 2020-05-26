/**
 * Implementation of this tour with Hopscotch
 */

tutorials.drawingRobot2_6_1 = {
    category: "drawingrobot2",
    targets: [
      tutorialTargets.difficultyMenu,
    ],
    placements: [
      "bottom",
    ],
    nrOfSteps: 26,
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
      //initialize multiple choice questions
      // Question 1
      var question1Text = MSG.tutorials.drawingrobot['part6_1'].questions[0];
      var answer1_a = new TutorialAnswer(0,MSG.tutorials.drawingrobot['part6_1'].answers[0]);
      var answer1_b = new TutorialAnswer(1,MSG.tutorials.drawingrobot['part6_1'].answers[1]);
      var answer1_c = new TutorialAnswer(2,MSG.tutorials.drawingrobot['part6_1'].answers[2]);
      var answer1_d = new TutorialAnswer(3,MSG.tutorials.drawingrobot['part6_1'].answers[3]);
      var answer1_e = new TutorialAnswer(4,MSG.tutorials.drawingrobot['part6_1'].answers[4]);
      var answer1_f = new TutorialAnswer(5,MSG.tutorials.drawingrobot['part6_1'].answers[5]);
      var answer1_g = new TutorialAnswer(6,MSG.tutorials.drawingrobot['part6_1'].answers[6]);
      var answer1_h = new TutorialAnswer(7,MSG.tutorials.drawingrobot['part6_1'].answers[7]);
      var answers1 = [answer1_a, answer1_b, answer1_c, answer1_d, answer1_e, answer1_f, answer1_g, answer1_h];
      question1 = new TutorialMultipleChoiceQuestion("q1", question1Text, answers1, answer1_e);
      MSG.tutorials.drawingrobot['part6_1'].stepContents2[15] = question1.getHtml();

      for (var i = 0 ; i < this.nrOfSteps ; i++){
        this.steps.push({
          title: MSG.tutorials.drawingrobot['part6_1'].stepTitles2[i],
          content: MSG.tutorials.drawingrobot['part6_1'].stepContents2[i],
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
      
      
      // ---FOR TESTING---
      // if(curr === 1){
      //     hopscotch.showStep(14);
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
      if(curr === 16){
        drawingrobotTutorialChecks.checkAnswer(question1);
      }

      // while loop
      if(curr === 17){
        drawingrobotTutorialChecks.clear();
      }
      if(curr === 19){
        drawingrobotTutorialChecks.checkExercise6_1_4();
      }
      if(curr === 20){
        drawingrobotTutorialChecks.checkExercise6_1_5();
      }
      if(curr === 21){
        drawingrobotTutorialChecks.checkExercise6_1_6();
      }
      if(curr === 22){
        drawingrobotTutorialChecks.checkExercise6_1_7();
      }
      if(curr === 23){
        drawingrobotTutorialChecks.checkExercise6_1_8();
      }
      if(curr === 24){
        drawingrobotTutorialChecks.checkExercise6_1_9();
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

    onClose: function() {
      DwenguinoBlockly.setDifficultyLevel(0);
      $("#tutorial_example").remove();
    },
    onError: function() {
      DwenguinoBlockly.setDifficultyLevel(0);
    },
    
    onShow: function(){
      var curr = hopscotch.getCurrStepNum();  
      $('.hopscotch-bubble-arrow-container').css('visibility', 'hidden');

      $("#sim_menu").show();
      $("#sim_scenarioTag").css("margin-top","0px"); 

      if( curr === 14 ){
        $("#sim_menu").hide();
        $("#sim_scenarioTag").css("margin-top","60px"); 
      }
      if( curr === 15 ){
        $("#myform")[0].lastChild.remove();
        $("#sim_menu").hide();
        $("#sim_scenarioTag").css("margin-top","60px"); 
      }
    },
};


