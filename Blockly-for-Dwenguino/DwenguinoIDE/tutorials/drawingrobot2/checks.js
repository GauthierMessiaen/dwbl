var drawingrobotTutorialChecks = {
  hintCounter: 0,
  currentstep: 0,
  /* toolboxUpdate: show only allowed blocks
  * categories: the categories to filter
  * blocks: the allowed blocks
  * allowedCat: true: only items in 'categories' are allowed
  *             false: only items NOT in 'categories' are allowed
  * allowedBlock: true: only items in 'blocks' are allowed
  *               false: only items NOT in 'blocks' are not allowed
  */
  toolboxUpdate: function(categories,blocks, allowedCat, allowedBlock) {
    var xml = $("#toolbox");

    // remove the unnecessary categories from the toolbox
    if(categories.length > 0){ // if the list is empty: allow all the categories
      xml.children().each( function() {
        if(allowedCat){
          if( !categories.includes($(this).attr("id"))) { // if category not in list -> delete
            $(this).remove();
          }
        } else {
          if( categories.includes($(this).attr("id"))) { // if category in list -> delete
            $(this).remove();
          }
        }
      });
    }


    // remove the unnecessary blocks in the categories
    if(blocks.length > 0){ // if the list is empty: allow all the blocks
      for( var i = 0; i < categories.length; i++){
        cat = xml.find("category[id='" + categories[i] + "']");
        if(cat.length > 0) {
          cat.children().each( function() {

            if(allowedBlock){
              if( !blocks.includes($(this).attr("type"))) { // if block not in list -> delete
                $(this).remove();
              }
            } else {
              if( blocks.includes($(this).attr("type"))) { // if block in list -> delete
                $(this).remove();
              }
            }
            
          });
        }
      }
    }

    var xml_string = (new XMLSerializer()).serializeToString(xml[0]);
    DwenguinoBlockly.workspace.updateToolbox(xml_string);

  },

  //Check if there are blocks present in the "loop" block
  loop: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    var loop = false;
    var statements = xml.getElementsByTagName("statement");
    for(var i = 0; i < statements.length; i++){
      if(statements[i].getAttribute("name") === "LOOP"){
        loop = true;
      }
    }

    return loop;
  },

  failed: function(data) {
    var curr = hopscotch.getCurrStepNum();
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
  
    if(drawingrobotTutorialChecks.currentstep !== curr-1){
      drawingrobotTutorialChecks.currentstep = curr-1;
      drawingrobotTutorialChecks.hintCounter = 0;
    } else {
      drawingrobotTutorialChecks.hintCounter++;
    }

    hopscotch.showStep(curr-1);
    $(".hopscotch-title").text(MSG.tutorials.drawingrobot.error);
    $(".tutorial_error_message").append(MSG.tutorials.drawingrobot.error_requirements);

    DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("tutorialCheckFailed", DwenguinoBlockly.tutorialIdSetting + ";step" + curr + ",xml:"+JSON.stringify(xml.innerHTML)));

    if(drawingrobotTutorialChecks.hintCounter >= 3 && data != "") {
      $(".hopscotch-title").text(MSG.tutorials.drawingrobot.hint);
      var hints = "<ul>" + data + "</ul>";
      $(".tutorial_error_message").prepend(hints);
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("tutorialCheckHints", DwenguinoBlockly.tutorialIdSetting + ";step" + curr + ",xml:"+JSON.stringify(xml.innerHTML)));
    }
  },

  clear: function() {
    var xml = '<xml xmlns="https://developers.google.com/blockly/xml"><block type="setup_loop_structure" id="5U$4`B]FOId3$9a6~|wl" x="10" y="10"/></xml>'
    DwenguinoBlockly.loadFileXmlIntoWorkspace(xml);
  },

  //Check if simulation pane is open
  simulationPaneOpen: function(){
    var curr = hopscotch.getCurrStepNum();
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    
    if($("#db_infopane").width() === 0){ 
      hopscotch.showStep(curr-1);
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("tutorialCheckFailed", DwenguinoBlockly.tutorialIdSetting + ";step" + curr + ",xml:"+JSON.stringify(xml.innerHTML)));
    }
  },
  //Check if drawing robot scenario is open
  drawingPaneOpen: function(){
    var curr = hopscotch.getCurrStepNum();
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);

    if(!$("#sim_scenario_drawingrobot").prop("checked")){
      hopscotch.showStep(curr-1);
      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("tutorialCheckFailed", DwenguinoBlockly.tutorialIdSetting + ";step" + curr + ",xml:"+JSON.stringify(xml.innerHTML)));
    }
  },

  // ---------- Part 1_1 ----------
  rectangleAdded: function(){
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    var blocks = xml.getElementsByTagName("block");
    var failed = false;

    if(blocks[0].firstChild === null || blocks[0].firstChild.firstChild === null){ // No blocks used
      failed = true;
    } else if(blocks[0].firstChild.getAttribute("name") !== "SETUP"){ //Blocks not in "setup"
      failed = true;
    } else if (blocks[0].firstChild.firstChild.getAttribute("type") !== "drawingrobot_rectangle"){ //circle block not found
      failed = true;
    }

    if(failed) {
      drawingrobotTutorialChecks.failed("",false);
    }

  },

  circleAdded: function(){
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    var blocks = xml.getElementsByTagName("block");

    var failed = false;

    if(blocks[0].firstChild === null || blocks[0].firstChild.firstChild === null){ // No blocks used
      failed = true;
    } else if(blocks[0].firstChild.getAttribute("name") !== "SETUP"){ //Blocks not in "setup"
      failed = true;
    } else {
      var c = 0;
      for(var i = 0; i < blocks.length; i++){
        if(blocks[i].getAttribute("type") === "drawingrobot_rectangle"){ //rectangle block found
          failed = true;
        } else if(blocks[i].getAttribute("type") === "drawingrobot_circle"){ //circle block found
          c++;
        }
      }
    }

    if(failed || c !== 1) {
      drawingrobotTutorialChecks.failed("");
    }
  },

  // ---------- Part 1_2---------- 
  checkExercise1: function(){
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    var hints = "";
    
    // check if: code is in setup and not in loop
    var failed = drawingrobotTutorialChecks.loop();
    if(failed){
      hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[0] );
    }

    var blocks = xml.getElementsByTagName("block");
    var r = 0;
    var c = 0;
    // check if: enough blocks are added to have a possibly correct answer
    for(var i = 0; i < blocks.length; i++){
      if(blocks[i].getAttribute("type") === "drawingrobot_rectangle"){
        r++;
      } else if(blocks[i].getAttribute("type") === "drawingrobot_circle"){
        c++;
      }
    }

    if(failed || c !== 1 || r !== 1 && !loop) {
      drawingrobotTutorialChecks.failed(hints);
    }
  },

  // ---------- Part 2_1 ----------
  moveAdded: function(){
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    var hints = "";
    //check if: blocks are not in loop -> only "Setup" is allowed here
    var failed = drawingrobotTutorialChecks.loop();
    if(failed){
      hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[0] );
    }

    // check if: 2 move blocks are added
    var blocks = xml.getElementsByTagName("block");
    var m = 0;
    for(var i = 0; i < blocks.length; i++){
      if(blocks[i].getAttribute("type") === "drawingrobot_move"){
        m++;
      }
    }

    if( m != 2){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[2] );
    }

    //check if: 2 different directions are used
    var directions = [];
    var fields = xml.getElementsByTagName("field");
    for(var i = 0; i < fields.length; i++){
      if( fields[i].getAttribute("name") === "direction"){
        directions.push(fields[i].innerHTML);
      }
    }
    var findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index);
    var duplicates = findDuplicates(directions);

    if(duplicates.length > 0){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[3] );
    }


    if(failed){
      drawingrobotTutorialChecks.failed(hints);
    }
  },

  lineAdded: function(){
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    var hints = "";

    //check if: blocks are not in loop -> only "Setup" is allowed here
    var failed = drawingrobotTutorialChecks.loop();
    if(failed){
      hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[0] );
    }

    // check if: 3 line blocks are added (and no other blocks)
    var blocks = xml.getElementsByTagName("block");
    var l = 0;
    for(var i = 0; i < blocks.length; i++){
      var type = blocks[i].getAttribute("type");
      if(type === "drawingrobot_line"){
        l++;
      }
      if(type !== "setup_loop_structure" && type !== "drawingrobot_line" && type !== "math_number" && type !== "drawingrobot_color"){ //only allow these blocks
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[1] );
      }
    }
    if( l !== 3){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[4] );
    }

    // check if: the correct coodinates are used
    if(!failed){
      var points = [];
      var c1 = 0;
      var c2 = 0;
      var fields = xml.getElementsByTagName("field");
      for(var i = 0; i < fields.length; i++){
        if(fields[i].getAttribute("name") === "NUM"){
          if(c1 % 2 === 0){
            points.push([fields[i].innerHTML,0]);
          } else {
            points[c2][1] = fields[i].innerHTML;
            c2++;
          }
          c1++;
        }
      }
      if(points.length === 3){
        (points[0][0] != '190') && (failed = true);
        (points[0][1] != '100') && (failed = true);

        (points[1][0] != '250') && (failed = true);
        (points[1][1] != '100') && (failed = true);

        (points[2][0] != '190') && (failed = true);
        (points[2][1] != '40') && (failed = true);
      } else {
        failed = true;
      }

      if(failed){
        hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[5] );
      }
    }


    if( failed ) {
      drawingrobotTutorialChecks.failed(hints);
    }
  },

  upDownAdded: function(){
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    var hints = "";

    //check if: blocks are in loop -> only "Setup" is allowed here
    var failed = drawingrobotTutorialChecks.loop();
    if(failed){
      hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[0] );
    }

    // check if: 3 line blocks added + 1 lower block is added + 1 lift block is added + no other blocks are added
    var blocks = xml.getElementsByTagName("block");
    var l = 0;
    var l1 = 0;
    var l2 = 0;
    for(var i = 0; i < blocks.length; i++){
      var type = blocks[i].getAttribute("type");
      if(type === "drawingrobot_line"){
        l++;
      } else if(type === "drawingrobot_lift_stylus"){
        l1++;
      } else if(type === "drawingrobot_lower_stylus"){
        l2++;
      } else if(type !== "setup_loop_structure" && type !== "math_number" && type !== "drawingrobot_color"){ //only allow these other blocks
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[1] );
      }
    }

    if( l !== 3){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[4] ); 
    }
    if( l1 !== 1){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[5] ); 
    }
    if( l2 !== 1){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[6] ); 
    }


    if( failed ) {
      drawingrobotTutorialChecks.failed(hints);
    }
  },


  // ---------- Part 2_2 ---------- 
  checkExercise2_2_1: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    var hints = "";

    //check if: blocks are in loop -> only "Setup" is allowed here
    var failed = drawingrobotTutorialChecks.loop();
    if(failed){
      hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[0] );
    }

    // check if: the correct blocks are used
    var blocks = xml.getElementsByTagName("block");
    var l = 0;  // line blocks
    var m = 0;  // move blocks
    var l1 = 0; // lift blocks
    var l2 = 0; // lower blocks
    for(var i = 0; i < blocks.length; i++){
      var type = blocks[i].getAttribute("type");
      if(type === "drawingrobot_line"){
        l++;
      } else if(type === "drawingrobot_move"){
        m++;
      } else if ( type === "drawingrobot_lift_stylus") {
        l1++;
      } else if ( type === "drawingrobot_lower_stylus") {
        l2++;
      } else if(type !== "setup_loop_structure" && type !== "math_number" && type !== "drawingrobot_color"){
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[1] );
      }
    }

    if( l < 1){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part2_2'].hints[0] ); 
    }
    if( m < 1){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part2_2'].hints[1] ); 
    }
    if( l1 < 1){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part2_2'].hints[2] ); 
    }
    if( l2 < 1){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part2_2'].hints[3] ); 
    }
    if( l+m < 5){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part2_2'].hints[4] ); 
    } else if ( l+m > 5){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part2_2'].hints[5] ); 
    }



    if( failed ){
      drawingrobotTutorialChecks.failed(hints);
    }

    // the exercise is correct, but it can be improved = don't fail the exercise, but let the student know it can be improved
    var improvable = (m  < 4 || l > 1); // if a square is drawn with the "line" objects instead of the "move" objects
    if(improvable){
      setTimeout( function() { // use a timeout to show the text, otherwise the text won't be shown.
        $(".tutorial_error_message").append(MSG.tutorials.drawingrobot.better);
      }, 20);
    }
  },
  checkExercise2_2_2: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    var hints = "";

    //check if: blocks are in loop -> only "Setup" is allowed here
    var failed = drawingrobotTutorialChecks.loop();
    if(failed){
      hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[0] );
    }

    // check if: the correct blocks are used
    var blocks = xml.getElementsByTagName("block");
    var counter = 0;
    var l1 =0;
    var l2 =0;
    for(var i = 0; i < blocks.length; i++){
      var type = blocks[i].getAttribute("type");
      if(type !== "setup_loop_structure" && type !== "math_number" && type !== "drawingrobot_move" && type !== "drawingrobot_line" && type !== "drawingrobot_lift_stylus" && type !== "drawingrobot_lower_stylus" && type !== "drawingrobot_rectangle" && type !== "drawingrobot_circle" && type !== "drawingrobot_color"){
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[1] );
      } else if(type !== "setup_loop_structure" && type !== "math_number" && type !== "drawingrobot_lift_stylus" && type !== "drawingrobot_lower_stylus"){
        counter++;
      } else if(type === "drawingrobot_lift_stylus"){
        l1++;
      } else if(type === "drawingrobot_lower_stylus"){
        l2++;
      }
    }

    if (l1 < 1 || l2 < 1){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part2_2'].hints[6] );
    }
    if(counter < 4) {
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part2_2'].hints[4] );
    }

    if( failed ){
      drawingrobotTutorialChecks.failed(hints);
    }
  },


  // ---------- Part 3_2 ----------
  fillExercise3_2_1: function() {
    var xml = '<xml xmlns="https://developers.google.com/blockly/xml"><block type="setup_loop_structure" id="=At@k+au|yV[qW7du(|1" x="-131" y="268"><statement name="SETUP"><block type="drawingrobot_move" id="GzS-o9B_@;$cyQd)LvE|"><field name="direction">1</field><value name="amount"><block type="math_number" id="EfF9k|B3X$1UoM-@5pj#"><field name="NUM">40</field></block></value><next><block type="drawingrobot_line" id=",$FiKb!K0s/@-fB^A9uy"><value name="x"><block type="math_number" id="Yr)qikt%A1%Ywc??|5a-"><field name="NUM">230</field></block></value><value name="y"><block type="math_number" id=")lL`Nk3+p@QzEPU@|9t_"><field name="NUM">30</field></block></value><next><block type="drawingrobot_move" id="?%PfW26Wf.92kRjb+3M_"><field name="direction">2</field><value name="amount"><block type="math_number" id="G5-{`lFDerk*io#+(#Y:"><field name="NUM">40</field></block></value></block></next></block></next></block></statement></block></xml>';

    DwenguinoBlockly.loadFileXmlIntoWorkspace(xml);
  },

  checkExercise3_2: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    var hints = "";

    //check if: blocks are in loop -> only "Setup" is allowed here
    var failed = drawingrobotTutorialChecks.loop();
    if(failed){
      hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[0] );
    }


    var blocks = xml.getElementsByTagName("block");
    var l = 0;
    var m = 0;
    for(var i = 0; i < blocks.length; i++){
      var type = blocks[i].getAttribute("type");
      if(type === "drawingrobot_line"){
        l++;
      } else if(type === "drawingrobot_move"){
        m++;
      } else if(type !== "setup_loop_structure" && type !== "math_number" && type !== "drawingrobot_color"){
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[1] );
      }
    }
    
    //Only move in each direction once
    var lineDirection = [0,0,0,0];
    var fields = xml.getElementsByTagName("field");
    for(var i = 0; i < fields.length; i++){
      var name = fields[i].getAttribute("name");
      if(name === "direction"){
        var direction = fields[i].innerHTML;
        if(lineDirection[direction] === 0){
          lineDirection[direction]++;
        } else {
          failed = true;
        }
      }
    }


    //draw line to correct points
    for(var i = 0; i < blocks.length; i++){
      var type = blocks[i].getAttribute("type");
      if(type === "drawingrobot_line"){
        var x = blocks[i].children[0].textContent;
        var y = blocks[i].children[1].textContent;
        console.log(x,y);
        if( (x != 230 || y != 40) && (x != 230 || y != 80) && (x != 190 || y != 40) && (x != 190 || y != 80)){
          failed = true;
        }
      } 
    }

    // check if 4 blocks are used
    if( (l + m !== 4) ){
      failed = true;
    }

    if( failed ){
      var hints = MSG.tutorials.drawingrobot['part1_1'].hints[0];
      drawingrobotTutorialChecks.failed(hints);
    }
  },



    // ---------- Part 4_1 ----------
    checkExercise4_1_allowed_blocks: function(xml) {
      var list = ["setup_loop_structure",
                  "variables_declare_set_int",
                  "char_type",
                  "drawingrobot_rectangle",
                  "variables_get_int",
                  "math_arithmetic",
                  "math_number",
                  "drawingrobot_color"]
      var failed = false;
      var blocks = xml.getElementsByTagName("block");
      for(var i = 0; i < blocks.length; i++){
        var type = blocks[i].getAttribute("type");
        if (!list.includes(type)) {
          failed = true;
        }
        // if(type !== "setup_loop_structure" && type !== "variables_declare_set_int" && type !== "char_type" && type !== "drawingrobot_rectangle" && type !== "variables_get_int" && type !== "math_arithmetic"){
        //   failed = true;
        // }
      }

      return failed;
    },

    checkExercise4_1_variable: function(xml) {
      var failed = false;
      var blocks = xml.getElementsByTagName("variable");
      if(blocks !== undefined && blocks.length != 1){
        failed = true;
      } else {
        var type = blocks[0].getAttribute("type");
        // check if: variable has correct type
        if(type !== "Number"){
          failed = true;
        }
        // check if: variable has correct name
        if(blocks[0].innerHTML.toLowerCase() !== "lengte" ){
          failed = true;
        }
      }

      return failed;
    },

    checkNext: function(xml, type, nr) {
      var failed = false;
      var blocks = xml.getElementsByTagName("block");
      var counter = 0;
      for(var i = 0; i < blocks.length; i++){
        var attr = blocks[i].getAttribute("type");
        if(attr === type){
          counter++;
          if(counter === nr){
            if (blocks[i].lastElementChild.nodeName.toLowerCase() !== "next"){
              failed = true;
            }
          }
        }
      }

      return failed;
    },

    checkExercise4_1_1: function() {
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      var hints = "";
      //check if: blocks are in loop -> only "Setup" is allowed here
      var failed = drawingrobotTutorialChecks.loop();
      if(failed){
        hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[0] );
      }

      // check if: the correct blocks are used
      if(!failed){
        failed = drawingrobotTutorialChecks.checkExercise4_1_allowed_blocks(xml);
        if(failed){
          hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[1] );
        }
      }
      // check if: variable has correct name/type
      if(!failed){
        failed = drawingrobotTutorialChecks.checkExercise4_1_variable(xml);
        if(failed){
          hints = hints.concat( MSG.tutorials.drawingrobot['part4_1'].hints[0] );
        }
      }

      if( failed ){
        drawingrobotTutorialChecks.failed(hints);
      }
    },

    checkExercise4_1_2: function() {
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      var hints = "";

      // -- Previous checks that still have to succeed
      var failed = drawingrobotTutorialChecks.loop();
      if(failed){
        hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[0] );
      }


      if(!failed){
        failed = drawingrobotTutorialChecks.checkExercise4_1_allowed_blocks(xml);
        if(failed){
          hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[1] );
        }
      }
      if(!failed){
        failed = drawingrobotTutorialChecks.checkExercise4_1_variable(xml);
        if(failed){
          hints = hints.concat( MSG.tutorials.drawingrobot['part4_1'].hints[0] );
        }
      }
      //--

      //check if: There is a number and it's 30
      var nr_block = $(xml).find("block[type='char_type']");
      if( nr_block ) {
        if(nr_block.text() !== "30"){
          failed = true;
          hints = hints.concat( MSG.tutorials.drawingrobot['part4_1'].hints[1] );
        }
        if( nr_block.parent() || nr_block.parent().attr("name") !== "VALUE" ) {
          failed = true;
          hints = hints.concat( MSG.tutorials.drawingrobot['part4_1'].hints[2] );
        }
      }
      
  
      if( failed ){
        drawingrobotTutorialChecks.failed(hints);
      }
    },

    checkExercise4_1_3: function() {
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      var hints = "";

      // -- Previous checks that still have to succeed
      var failed = drawingrobotTutorialChecks.loop();
      if(failed){
        hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[0] );
      }

      if(!failed){
        failed = drawingrobotTutorialChecks.checkExercise4_1_allowed_blocks(xml);
        if(failed){
          hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[1] );
        }

      }
      if(!failed){
        failed = drawingrobotTutorialChecks.checkExercise4_1_variable(xml);
        if(failed){
          hints = hints.concat( MSG.tutorials.drawingrobot['part4_1'].hints[0] );
        }
      }
      //--

      // check if: Variable is declared before rectangle is drawn
      if(!failed){
        failed = drawingrobotTutorialChecks.checkNext(xml,"variables_declare_set_int",1);
        if(failed){
          hints = hints.concat( MSG.tutorials.drawingrobot['part4_1'].hints[3] );
        }
      }
      
      if( failed ){
        drawingrobotTutorialChecks.failed(hints);
      }
    },

    checkExercise4_1_4: function() {
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      var hints = "";

      // -- Previous checks that still have to succeed
      var failed = drawingrobotTutorialChecks.loop();
      if(failed){
        hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[0] );
      }

      if(!failed){
        failed = drawingrobotTutorialChecks.checkExercise4_1_allowed_blocks(xml);
        if(failed){
          hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[1] );
        }

      }
      if(!failed){
        failed = drawingrobotTutorialChecks.checkExercise4_1_variable(xml);
        if(failed){
          hints = hints.concat( MSG.tutorials.drawingrobot['part4_1'].hints[0] );
        }
      }

      // check if: Variable is declared before rectangle is drawn
      if(!failed){
        failed = drawingrobotTutorialChecks.checkNext(xml,"variables_declare_set_int",1);
        if(failed){
          hints = hints.concat( MSG.tutorials.drawingrobot['part4_1'].hints[3] );
        }
      }
      //--


      // check if: Variable is used in rectangle
      var rectangle = $(xml).find("block[type='drawingrobot_rectangle']");
      if( rectangle ){
        if ( rectangle.find("block[type='variables_get_int']").length !== 2 ) {
          failed = true;
          hints = hints.concat( MSG.tutorials.drawingrobot['part4_1'].hints[4] );
        }
      } // else: failed will already be true from the previous checks -> no else needed
      
      if( failed ){
        drawingrobotTutorialChecks.failed(hints);
      }
    },

    checkExercise4_1_5: function() {
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      var hints = "";

      // -- Previous checks that still have to succeed
      var failed = drawingrobotTutorialChecks.loop();
      if(failed){
        hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[0] );
      }

      if(!failed){
        failed = drawingrobotTutorialChecks.checkExercise4_1_allowed_blocks(xml);
        if(failed){
          hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[1] );
        }

      }
      if(!failed){
        failed = drawingrobotTutorialChecks.checkExercise4_1_variable(xml);
        if(failed){
          hints = hints.concat( MSG.tutorials.drawingrobot['part4_1'].hints[0] );
        }
      }
      //--

      // check if: Variable is declared before rectangle is drawn
      if(!failed){
        failed = drawingrobotTutorialChecks.checkNext(xml,"variables_declare_set_int",1);
        if(failed){
          hints = hints.concat( MSG.tutorials.drawingrobot['part4_1'].hints[3] );
        }
      }

      // check if: rectangle is drawn before variable is changed
      if(!failed){
        failed = drawingrobotTutorialChecks.checkNext(xml,"drawingrobot_rectangle",1);
        if(failed){
          hints = hints.concat( MSG.tutorials.drawingrobot['part4_1'].hints[8] );
        }
      }

      // check if: All the blocks are correct
      var blocks = xml.getElementsByTagName("block");
      var block_var = 0;
      var block_rect = 0;
      var block_length = 0;
      var block_nr = 0;
      var block_plus = 0;
      for(var i = 0; i < blocks.length; i++){
        var type = blocks[i].getAttribute("type");
        switch(type) {
          case "variables_declare_set_int": // block: set variable
            block_var++;
            break;
          case "char_type": // block: number
            if(blocks[i].textContent == "20" || blocks[i].textContent == "30"){
              block_nr++;
            } else {
              failed = true;
              hints = hints.concat( MSG.tutorials.drawingrobot['part4_1'].hints[5] );
            }
            break;
          case "drawingrobot_rectangle": // block: draw rectangle
            if(blocks[i].children[0].firstChild.getAttribute('type') === "variables_get_int" && blocks[i].children[1].firstChild.getAttribute('type') === "variables_get_int"){
              block_rect++;
            } else {
              failed = true;
            }
            break;
          case "variables_get_int": // block: variable
            // check if: variable is a number
            // check if: variable is called lengte
            if(blocks[i].firstChild.textContent.toLowerCase() === "lengte" && blocks[i].firstChild.getAttribute("variabletype") === "Number"){
              block_length++;
            } else {
              failed = true;
              hints = hints.concat( MSG.tutorials.drawingrobot['part4_1'].hints[4] );
            }
            break;
          case "math_arithmetic": // block: ... + ...
            var checkAdd = false;
            var checkVarPlusValue = false;
            var checkValuePlusVar = false;

            // check if: ... + ... block is added
            if(blocks[i].firstChild.textContent === "ADD") {
              checkAdd = true;
            }

            //check if: lengte + value
            if(blocks[i].children[1] && blocks[i].children[1].firstChild && blocks[i].children[2] && blocks[i].children[2].firstChild) {
              if(blocks[i].children[1].firstChild.getAttribute("type") === "variables_get_int" && blocks[i].children[2].firstChild.getAttribute("type") === "char_type") {
                checkVarPlusValue = true;
              }
              //check if: value + lengte
              if(blocks[i].children[2].firstChild.getAttribute("type") === "variables_get_int" && blocks[i].children[1].firstChild.getAttribute("type") === "char_type") {
                checkValuePlusVar = true;
              }
            }
            

            if(checkAdd && (checkValuePlusVar || checkVarPlusValue)){
              block_plus++;
            } else {
              failed = true;
              hints = hints.concat( MSG.tutorials.drawingrobot['part4_1'].hints[6] );
            }
            break;
        }
      }
      
      if( block_var !== 2 || block_rect !== 1 || block_length !== 3 || block_nr !== 2 || block_plus !== 1){
        failed = true;
      }
      
      if( failed ){
        drawingrobotTutorialChecks.failed(hints);
      }
    },

    checkExercise4_1_6: function() {
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      var hints = "";

      // -- Previous checks that still have to succeed
      var failed = drawingrobotTutorialChecks.loop();
      if(failed){
        hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[0] );
      }

      if(!failed){
        failed = drawingrobotTutorialChecks.checkExercise4_1_allowed_blocks(xml);
        if(failed){
          hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[1] );
        }

      }
      if(!failed){
        failed = drawingrobotTutorialChecks.checkExercise4_1_variable(xml);
        if(failed){
          hints = hints.concat( MSG.tutorials.drawingrobot['part4_1'].hints[0] );
        }
      }
      //--

       // check if: Variable is declared before rectangle is drawn
       if(!failed){
        failed = drawingrobotTutorialChecks.checkNext(xml,"variables_declare_set_int",1);
        if(failed){
          hints = hints.concat( MSG.tutorials.drawingrobot['part4_1'].hints[3] );
        }
      }

      // check if: rectangle is drawn before variable is changed
      if(!failed){
        failed = drawingrobotTutorialChecks.checkNext(xml,"drawingrobot_rectangle",1);
        if(failed){
          hints = hints.concat( MSG.tutorials.drawingrobot['part4_1'].hints[8] );
        }
      }

      // check if: variable is changed before second rectangle is drawn
      if(!failed){
        failed = drawingrobotTutorialChecks.checkNext(xml,"variables_declare_set_int",2);
        if(failed){
          hints = hints.concat( MSG.tutorials.drawingrobot['part4_1'].hints[3] );
        }
      }
      
      // check if: All the blocks are correct
      var blocks = xml.getElementsByTagName("block");
      var block_var = 0;
      var block_rect = 0;
      var block_length = 0;
      var block_nr = 0;
      var block_plus = 0;
      for(var i = 0; i < blocks.length; i++){
        var type = blocks[i].getAttribute("type");
        switch(type) {
          case "variables_declare_set_int": // block: set variable
            block_var++;
            break;
          case "char_type": // block: number
            if(blocks[i].textContent == "20" || blocks[i].textContent == "30"){
              block_nr++;
            } else {
              failed = true;
              hints = hints.concat( MSG.tutorials.drawingrobot['part4_1'].hints[5] );
            }
            break;
          case "drawingrobot_rectangle": // block: draw rectangle
            if(blocks[i].children[0].firstChild.getAttribute('type') === "variables_get_int" && blocks[i].children[1].firstChild.getAttribute('type') === "variables_get_int"){
              block_rect++;
            } else {
              failed = true;
            }
            break;
          case "variables_get_int": // block: variable
            // check if: variable is a number
            // check if: variable is called lengte
            
            if(blocks[i].firstChild.textContent.toLowerCase() === "lengte" && blocks[i].firstChild.getAttribute("variabletype") === "Number"){
              block_length++;
            } else {
              failed = true;
              hints = hints.concat( MSG.tutorials.drawingrobot['part4_1'].hints[4] );
            }
            break;
            case "math_arithmetic": // block: ... + ...
            var checkAdd = false;
            var checkVarPlusValue = false;
            var checkValuePlusVar = false;

            // check if: ... + ... block is added
            if(blocks[i].firstChild.textContent === "ADD") {
              checkAdd = true;
            }

            //check if: lengte + value
            if(blocks[i].children[1] && blocks[i].children[1].firstChild && blocks[i].children[2] && blocks[i].children[2].firstChild) {
              if(blocks[i].children[1].firstChild.getAttribute("type") === "variables_get_int" && blocks[i].children[2].firstChild.getAttribute("type") === "char_type") {
                checkVarPlusValue = true;
              }
              //check if: value + lengte
              if(blocks[i].children[2].firstChild.getAttribute("type") === "variables_get_int" && blocks[i].children[1].firstChild.getAttribute("type") === "char_type") {
                checkValuePlusVar = true;
              }
            }
            

            if(checkAdd && (checkValuePlusVar || checkVarPlusValue)){
              block_plus++;
            } else {
              failed = true;
              hints = hints.concat( MSG.tutorials.drawingrobot['part4_1'].hints[6] );
            }
            break;
        }
      }
      
      if( block_var !== 2 || block_length !== 5 || block_nr !== 2 || block_plus !== 1){
        failed = true;
      }

      if( block_rect !== 2) {
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part4_1'].hints[7] );
      }
      
      if( failed ){
        drawingrobotTutorialChecks.failed(hints);
      }
    },

  // ---------- Part 4_2 ----------
    checkExercise4_2: function() {
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      var hints = "";

      var failed = false;

      // check if: 3 variables are used and have the correct name
      var blocks = xml.getElementsByTagName("variable");
      for(var i = 0; i < blocks.length; i++){
        var type = blocks[i].getAttribute("type");
        if(type !== "Number"){
          failed = true;
          hints = hints.concat( MSG.tutorials.drawingrobot['part4_2'].hints[0] );
        }
        var answers = ["a","b","c"];
        if(!answers.includes(blocks[i].innerHTML.toLowerCase()) ){
          failed = true;
          hints = hints.concat( MSG.tutorials.drawingrobot['part4_2'].hints[1] );
        }
      }
      
      var blocks = xml.getElementsByTagName("block");
      var block_var = 0;    // nr of declare variable blocks
      var block_nr = 0;     //nr of Number blocks
      var block_a = 0;      //nr of a blocks
      var block_b = 0;      //nr of b blocks
      var block_c = 0;      //nr of c blocks
      var block_mult = 0;   //nr of ... x ... blocks
      var block_minus = 0;  //nr of ... - ... blocks
      for(var i = 0; i < blocks.length; i++){
        var type = blocks[i].getAttribute("type");
        switch(type) {
          case "variables_declare_set_int": // block: set variable
            block_var++;
            break;
          case "char_type": // block: number
            block_nr++;
            break;
          case "variables_get_int": // block: use variable
            if(blocks[i].firstChild.textContent.toLowerCase() === "a"){
              block_a++;
            } else  if(blocks[i].firstChild.textContent.toLowerCase() === "b"){
              block_b++;
            } else  if(blocks[i].firstChild.textContent.toLowerCase() === "c"){
              block_c++;
            }
            break;
          case "math_arithmetic": // block: ... -|x ...
            if(blocks[i].firstChild.textContent === "MINUS") {
              block_minus++;
              var left = blocks[i].children[1].firstChild.textContent;
              var right = blocks[4].children[2].firstChild.textContent;
              if(left !== "a" || right !== "10"){
                failed = true;
                hints = hints.concat( MSG.tutorials.drawingrobot['part4_2'].hints[7] );
              }
            }

            if(blocks[i].firstChild.textContent === "MULTIPLY") {
              block_mult++;
              var left = blocks[i].children[1].firstChild.textContent;
              var right = blocks[i].children[2].firstChild.textContent;
              if((left !== "a" || right !== "b") && (left !== "b" || right !== "a")){
                failed = true;
                hints = hints.concat( MSG.tutorials.drawingrobot['part4_2'].hints[8] );
              }
            }
            break;
        }
      }
      // check if: enough blocks are used
      if(blocks.length <= 11) {
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part4_2'].hints[2] );
      }
      // check if: 3 variables are used
      if ( block_var < 3 ){
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part4_2'].hints[3] );
      }
      // check if: ...x... block is used
      if ( block_mult < 1 ){
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part4_2'].hints[4] );
      }
      // check if: ...-... block is used
      if ( block_minus < 1 ){
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part4_2'].hints[5] );
      }
      // check if: each variable is used at least once
      if ( block_a < 3 || block_b < 2 || block_c < 1 ){
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part4_2'].hints[6] );
      }
      // check if: at least 2 number blocks are used
      if(  block_nr < 2 ){
        failed = true;
      }
      
      if( failed ){
        drawingrobotTutorialChecks.failed(hints);
      }
    },



  // ---------- Part 5_1 ----------
  checkExercise5_1_allowed_blocks: ["setup_loop_structure",
                                    "variables_declare_set_int",
                                    "char_type",
                                    "controls_if",
                                    "logic_compare",
                                    "drawingrobot_circle",
                                    "drawingrobot_rectangle",
                                    "variables_get_int",
                                    "math_number",
                                    "drawingrobot_color"
                                  ],
  checkExercise5_1_1: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    var hints = "";

    var failed = drawingrobotTutorialChecks.loop();
    if(failed){
      hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[0] );
    }
  
    var counter = [0,0,0];
    var blocks = xml.getElementsByTagName("block");
    for(var i = 0; i < blocks.length; i++){
      var type = blocks[i].getAttribute("type");

      // check if: all used block types are allowed
      if (!drawingrobotTutorialChecks.checkExercise5_1_allowed_blocks.includes(type)) {
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[1] );
      }
      
      if(type === "controls_if" && blocks[i].firstChild.getAttribute("else") === "1"){
        counter[0]++;
      } else if (type === "variables_declare_set_int") {
        counter[1]++;
      } else if (type === "char_type" && blocks[i].textContent === "0") {
        counter[2]++;
      }
    }
    
    // check if: 'if...then...else' blok is added
    if(counter[0] < 1) {
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[0] );
    }
    // check if: variable is created
    if(counter[1] < 1) {
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[1] );
    }
    // check if: variable has correct value
    if(counter[2] < 1) {
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[2] );
    }

    if( failed ){
      drawingrobotTutorialChecks.failed(hints);
    }

  },

  checkExercise5_1_2: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    var hints = "";

    var failed = false;

    var counter = [0,0,0,0];
    var blocks = xml.getElementsByTagName("block");
    for(var i = 0; i < blocks.length; i++){
      var type = blocks[i].getAttribute("type");
      // check if: all used block types are allowed
      if (!drawingrobotTutorialChecks.checkExercise5_1_allowed_blocks.includes(type)) {
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[1] );
      }
      
      if(type === "controls_if" && blocks[i].firstChild.getAttribute("else") === "1"){
        counter[0]++;
        // check if controls_if has a compare block in if statement
        var ifeq = (blocks[i].children[1] !== undefined && blocks[i].children[1].firstChild.getAttribute("type") === "logic_compare");
        if(!ifeq){
          failed = true;
          hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[4] );
        }
      } else if (type === "variables_declare_set_int") {
        counter[1]++;
      } else if (type === "char_type" && blocks[i].textContent === "0") {
        counter[2]++;
      } else if (type === "logic_compare" && blocks[i].firstChild.textContent === "EQ"){
        counter[3]++;
      }
    }

    if( counter[3] < 1 ){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[5] );
    }
    
    if(counter[0] < 1 || counter[1] < 1 || counter[2] < 1){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[3] );
    }

    
    if( failed ){
      drawingrobotTutorialChecks.failed(hints);
    }
  },

  checkExercise5_1_3: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    var hints = "";

    var failed = false;

    var counter = [0,0,0,0,0,0]; // 0:if, 1:var, 2:nr, 3:=, 4:rectangle, 5:circle 
    var blocks = xml.getElementsByTagName("block");
    for(var i = 0; i < blocks.length; i++){
      var type = blocks[i].getAttribute("type");
      // check if: all used block types are allowed
      if (!drawingrobotTutorialChecks.checkExercise5_1_allowed_blocks.includes(type)) {
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[1] );
      }
      
      if(type === "controls_if" && blocks[i].firstChild.getAttribute("else") === "1"){
        counter[0]++;
        // check if: controls_if has a compare block in "if"
        var ifeq = (blocks[i].children[1] !== undefined && blocks[i].children[1].firstChild.getAttribute("type") === "logic_compare");
        // check if: controls_if has a rectangle block in "do"
        var rectangle = (blocks[i].children[2] !== undefined && blocks[i].children[2].firstChild.getAttribute("type") === "drawingrobot_rectangle");
        // check if: controls_if has a circle block in "else"
        var circle = (blocks[i].children[3] !== undefined && blocks[i].children[3].firstChild.getAttribute("type") === "drawingrobot_circle");

        if(!ifeq){
          failed = true;
          hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[4] );
        }
        if(!rectangle){
          failed = true;
          hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[6] );
        }
        if(!circle){
          failed = true;
          hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[7] );
        }

      } else if (type === "variables_declare_set_int") {
        counter[1]++;
      } else if (type === "char_type") {
        counter[2]++;
      } else if (type === "logic_compare"){
        var eq = (blocks[i].firstChild.textContent === "EQ"); // ... = ... (not <,>,...)
        var compare1 = false;
        var compare2 = false;

        // left = right
        if(blocks[i].children[1] !== undefined && blocks[i].children[1].firstChild !== undefined){
          var left = blocks[i].children[1].firstChild.getAttribute("type"); 
        } else {
          failed = true;
          hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[8] );
        }
        if(blocks[i].children[2] !== undefined && blocks[i].children[2].firstChild !== undefined){
          var right = blocks[i].children[2].firstChild.getAttribute("type");
        } else {
          failed = true;
          hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[8] );
        }
        if(!failed){
          compare1 = (left === "variables_get_int" && right === "char_type" && blocks[i].children[2].firstChild.textContent === "0");
          compare2 = (right === "variables_get_int" && left === "char_type" && blocks[i].children[1].firstChild.textContent === "0");
          if( !eq ){
            failed = true;
            hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[10] );
          }
          if(!compare1 && !compare2){
            failed = true;
            hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[9] );
          }
        }
        counter[3]++;
      } else if(type === "drawingrobot_rectangle") {
        counter[4]++;
      } else if (type === "drawingrobot_circle") {
        counter[5]++;
      }
    }
    
    if(counter[0] < 1 || counter[1] < 1 || counter[2] < 2 || counter[3] < 1){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[3] );
    }
    if( counter[4] < 1 || counter[5] < 1 ){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[11] );
    }
    
    if( failed ){
      drawingrobotTutorialChecks.failed(hints);
    }
  },

  // part 2
  checkExercise5_1_4: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    var hints = "";

    var failed = drawingrobotTutorialChecks.loop();
    if(failed){
      hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[0] );
    }

    // find correct block
    var block = $(xml).find("block[type='dwenguino_digital_read_switch']")[0];
    if(!block){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[12] );
    }

    //check if block has correct parents
    if(!failed){
      if(block.parentNode && block.parentNode.parentNode && block.parentNode.parentNode.parentNode){
        //check if: block in '... = ...'
        if(block.parentNode.nodeName !== "value") {
          failed = true;
          hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[13] );
        }
        if(block.parentNode.parentNode.nodeName !== "block"){
          failed = true;
          hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[13] );
        }
        if(block.parentNode.parentNode.getAttribute("type") !== "logic_compare"){
          failed = true;
          hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[13] );
        }
        //check if: '...=...' block in 'if'
        if(block.parentNode.parentNode.parentNode.nodeName !== "value"){
          failed = true;
          hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[14] );
        }
        if(block.parentNode.parentNode.parentNode.getAttribute("name") !== "IF0"){
          failed = true;
          hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[14] );
        }
      } else {
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[13] );
      }
    }


    if( failed ){
      drawingrobotTutorialChecks.failed(hints);
    }
  },

  checkExercise5_1_5: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    var hints = "";

    var failed = drawingrobotTutorialChecks.loop();
    if(failed){
      hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[0] );
    }


    // find correct block
    var block = $(xml).find("block[type='dwenguino_pressed']")[0];
    if(!block){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[15] );
    }

    //check if block has correct parents
    if(!failed){
      if(block.parentNode && block.parentNode.parentNode && block.parentNode.parentNode.parentNode){
        //check if: block in '... = ...'
        if(block.parentNode.nodeName !== "value") {
          failed = true;
          hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[16] );
        }
        if(block.parentNode.parentNode.nodeName !== "block"){
          failed = true;
          hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[16] );
        }
        if(block.parentNode.parentNode.getAttribute("type") !== "logic_compare"){
          failed = true;
          hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[16] );
        }
        //check if: '...=...' block in 'if'
        if(block.parentNode.parentNode.parentNode.nodeName !== "value"){
          failed = true;
          hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[14] );
        }
        if(block.parentNode.parentNode.parentNode.getAttribute("name") !== "IF0"){
          failed = true;
          hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[14] );
        }
      } else {
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[16] );
      }
    }

    if( failed ){
      drawingrobotTutorialChecks.failed(hints);
    }
  },

  checkExercise5_1_6: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    var hints = "";

    var failed = drawingrobotTutorialChecks.loop();
    if(failed){
      hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[0] );
    }

    // check if: correct block is used
    var block = $(xml).find("block[type='dwenguino_delay']")[0];
    if( !block ) {
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[17] );
    }

    // check if: block is above 'if' block
    if(!failed) {
      var block_if = $(block).find("next").find("block[type='controls_if']")[0];
      if(!block_if) {
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[18] );
      }

      //check if delay >= 1000ms
      $(block).find('next').remove();
      if( Number( $(block).text() ) < 1000 ){
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part5_1'].hints[19] );
      }

    }

    if( failed ){
      drawingrobotTutorialChecks.failed(hints);
    }
  },


// ---------- Part 6_1 ----------
// -- for loop --
  checkExercise6_1_1: function(a) {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    var hints = "";

    var failed = drawingrobotTutorialChecks.loop();
    if(failed){
      hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[0] );
    }

    if(a >= 0){
      if( $(xml).find("block[type='controls_for']").length !== 1 ){
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[0] );
      }
    }

    // check if: var i
    if(a >= 1){
      if ($(xml).find("field[name='VAR']").text() !== "i"){
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[1] );
      }
    }
    
    // check if: from 0
    if(a >= 2){
      if ($(xml).find("value[name='FROM']").text() !== "1"){
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[2] );
      }
    }

    // check if: to 4
    if(a >= 3){
      if ($(xml).find("value[name='TO']").text() !== "5"){
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[3] );
      }
    }

    // check if: by 1
    if(a >= 4){
      if ($(xml).find("value[name='BY']").text() !== "1"){
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[4] );
      }
    }

    if( failed ){
      drawingrobotTutorialChecks.failed(hints);
    }
  },

  checkExercise6_1_2: function() {
    // do previous checks
    drawingrobotTutorialChecks.checkExercise6_1_1();
    // If the previous steps where incorrect, then this function doesn't need to run anymore
    if(hopscotch.getCurrStepNum() !== 6){
      return;
    }

    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    var hints = "";
    
    var failed = false;

    // moves = find all the "drawingrobot_move" blocks
    var moves = $(xml).find("block[type='drawingrobot_move']");
    var s = $(xml).find("statement[name='DO']")[0];


    // check if: 2 move blocks are added
    if (moves.length !== 2 ){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[5] );
    }

    // check if: all the move blocks are in the loop
    moves.each(function(){
      var self = this;
      while ( self.parentNode !== null && self !== s) {
          self = self.parentNode;
      }
      if( self !== s){
          failed = true;
          hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[6] );
      }
    });

    if( !failed ){
      // check if: first move direction is 3 (right)
      if ($(moves).find("field[name='direction']")[0].textContent !== "3") {
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[7] );
      }
      // check if: first move direction is 1 (down)
      if ($(moves).find("field[name='direction']")[1].textContent !== "1") {
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[7] );
      }

      // check if: first move amount is 20
      if ($(moves).find("field[name='NUM']")[0].textContent !== "20") {
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[8] );
      }
      // check if: first move amount is 20
      if ($(moves).find("field[name='NUM']")[1].textContent !== "20") {
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[8] );
      }
    }

    if( failed ){
      drawingrobotTutorialChecks.failed(hints);
    }
  },
  // -- infinite loop --
  checkExercise6_1_3: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    var hints = "";

    var failed = false;

    //check if: circle in SETUP
    if ($(xml).find("statement[name='SETUP']").find("block[type='drawingrobot_circle']").length !== 1){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[9] );
    }

    //check if: rectangle in LOOP
    if ($(xml).find("statement[name='LOOP']").find("block[type='drawingrobot_rectangle']").length !== 1){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[10] );
    }

    if( failed ){
      drawingrobotTutorialChecks.failed(hints);
    }
  },

// -- while loop --
  checkExercise6_1_4: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    var hints = "";

    var failed = false;

    // check if: variable names are "x" and "y"
    var var1 = $($(xml).find("block[type='variables_declare_set_int']").find("field[variabletype='Number']")[0]).text();
    var var2 = $($(xml).find("block[type='variables_declare_set_int']").find("field[variabletype='Number']")[1]).text();
    var1 = var1.toLowerCase();
    var2 = var2.toLowerCase();
    if ( (var1 !== "x" || var2 !== "y") && (var2 !== "x" || var1 !== "y") ) {
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[11] );
    }

    // check if: variable values are "190" and "40" for "x" and "y"
    var nr1 = $($(xml).find("field[name='BITMASK']")[0]).text();
    var nr2 = $($(xml).find("field[name='BITMASK']")[1]).text();
    if( (var1 === "x" && nr1 !== "190") || (var2 === "x" && nr2 !== "190")){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[12] );
    }
    if( (var1 === "y" && nr1 !== "40") || (var2 === "y" && nr2 !== "40")){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[12] );
    }

    // check if: while loop is added
    var loop = $(xml).find("block[type='controls_whileUntil']");
    if( loop.length !== 1) {
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[13] );
    }
    if( loop.find("field[name='MODE']").text() !== "WHILE"){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[13] );
    }

    if( failed ){
      drawingrobotTutorialChecks.failed(hints);
    }
  },

  checkExercise6_1_5: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    var hints = "";

    var failed = false;

    // Get the 'loop' block
    var loop = $(xml).find("block[type='controls_whileUntil']")[0];
    // Get the 'draw line' block
    var line = $(loop).find("block[type='drawingrobot_line']")[0];
    // Get the 'next' block, save it in a variable and remove it from line -> when searching in line, we don't want to also search in next
    var next = $(line).find("next")[0];
    $(next).remove()

    // check if: draw line is filled in with x and y
    if( $(line).find("field[variabletype='Number']").text().toLowerCase() !== "xy") {
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[14] );
    }


    var vars = $(next).find("block[type='variables_declare_set_int']");
    // check if: 2 variables are replaced
    if(vars.length !== 2){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[15] );
    }

    // check if: the 2 variables are x and y
    // check if: the '... + ...' block is used
    vars.each( function() {
      $(this).find("next").remove();
      
      // check if: the 2 variables are x and y
      var varName = $($(this).find("field[variabletype='Number']")[0]).text().toLowerCase();
      if(varName !== "x" && varName !== "y") {
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[16] );
      }

      // check if: the '... + ...' block is used
      if ( $($(this).find("block[type='math_arithmetic']")[0]).find("field[name='OP']").text() !== "ADD" ){
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[17] );
      }

      // check if: the variable names are correct
      var varName2 = $(this).find("value[name='A']").find("field[name='VAR']").text()
      if( varName !== varName2 ){
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[18] );
      }
      // check if: the number >= 5
      var nr = $($(this).find("field[name='BITMASK']")[0]).text();
      if( Number(nr) < 5){
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[19] );
      }
    });

    if( failed ){
      drawingrobotTutorialChecks.failed(hints);
    }
  },

  checkExercise6_1_6: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    var hints = "";

    var failed = false;
    
    // Get the 'loop' block
    var loop = $(xml).find("block[type='controls_whileUntil']")[0];
    // Get the '... AND ...' block
    var logic = $(loop).find("value[name='BOOL']").find("block[type='logic_operation']");
    
    // check if: the block exists and if it's an 'AND' block
    if(logic.length !== 1 || logic.find("field[name='OP']").text() !== "AND"){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[20] );
    }

    if( failed ){
      drawingrobotTutorialChecks.failed(hints);
    }
  },

  checkExercise6_1_7: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    var hints = "";

    var failed = false;

    var logic = $(xml).find("block[type='logic_operation']")[0];
    
    var compare = $(logic).find("block[type='logic_compare']")
    // check if: 2 compare blocks are added
    if( logic.children.length !== 3 || compare.length !== 2){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[21] );
    }
    
    compare.each( function() {
      // check if: the 2 compare blocks are added left and right of the '...AND...' block
      if( this.parentNode === null || this.parentNode.parentNode === null || this.parentNode.parentNode.getAttribute("type") !== "logic_operation"){
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[22] );
      }

      // check if: all compare blocks are '<'
      if($(this).find("field[name='OP']").text() !== "LT"){
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[23] );
      }
    });

    if( failed ){
      drawingrobotTutorialChecks.failed(hints);
    }
  },

  checkExercise6_1_8: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    var hints = "";

    var failed = false;

    // Get the first equation/compare block (... < ...)
    if( $(xml).find("block[type='logic_operation']")[0] ){
      var equation = $($(xml).find("block[type='logic_operation']")[0].children[1]).find("block[type='logic_compare']")[0];
    }
    if(equation === undefined){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[21] );
    }
    // check if: Left and right of '<' are filled in
    if(equation.children.length !== 3){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[24] );
    }

    if(!failed){
      // check if: left = x
      if( $(equation.children[1]).find("field[variabletype='Number']").text().toLowerCase() !== "x") {
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[25] );
      }

      // check if: right = 360
      if( $(equation.children[2]).find("field[name='BITMASK']").text() !== "380") {
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[25] );
      }

    }

    if( failed ){
      drawingrobotTutorialChecks.failed(hints);
    }

  },

  checkExercise6_1_9: function() {
    var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
    var hints = "";

    var failed = false;

    // Get the second equation/compare block (... < ...)
    var equation = $($(xml).find("block[type='logic_operation']")[0].children[2]).find("block[type='logic_compare']")[0];
    if(equation === undefined){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[21] );
    }
    // check if: Left and right of '<' are filled in
    if(equation.children.length !== 3){
      failed = true;
      hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[26] );
    }

    if(!failed){
      // check if: left = x
      if( $(equation.children[1]).find("field[variabletype='Number']").text().toLowerCase() !== "y") {
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[27] );
      }

      // check if: right = 360
      if( $(equation.children[2]).find("field[name='BITMASK']").text() !== "270") {
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[27] );
      }

    }

    if( failed ){
      drawingrobotTutorialChecks.failed(hints);
    }
  },




  // ---------- Part 6_2 ----------
    checkExercise6_2_1: function() {
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      var hints = "";

      var failed = drawingrobotTutorialChecks.loop();
      if(failed){
        hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[0] );
      }

      //statistics
      var stat_loop_for_nr = 0;
      var stat_loop_while_nr = 0;
      var stat_move_nr = 0;
      var stat_move_directions_nr = [0,0,0,0];

      // check if: at least 1 'lifts stylus' blok
      // check if: 'draw line' blok hangs below 'lift stylus' blok
      var lift = $(xml).find("block[type='drawingrobot_lift_stylus']" || lift[0].firstChild === null || lift[0].firstChild.firstChild === null || lift[0].firstChild.firstChild.getAttribute("type") !== "drawingrobot_line");
      if ( lift.length < 1 ){
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part6_1'].hints[0] );
      }
      // check if: at least 1 'lower stylus' blok
      // check if: 'lower stylus' blok hangs below 'draw line' blok
      var lower = $(xml).find("block[type='drawingrobot_lower_stylus']");
      if ( lower.length < 1 || lower[0].parentNode === null || lower[0].parentNode.parentNode === null || lower[0].parentNode.parentNode.getAttribute("type") !== "drawingrobot_line"){
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part6_2'].hints[0] );
      }

      //check if: draw line to (110,200) exists
      var line = $(xml).find("block[type='drawingrobot_line']")[0];
      if (!line) {
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part6_2'].hints[0] );
      }
      
      // find the loop
      var loop_for = $(xml).find("block[type='controls_for']");
      var loop_while = $(xml).find("block[type='controls_whileUntil']");

      // check if: at least 1 loop and max 2 loops are used
      stat_loop_for_nr = loop_for.length;
      stat_loop_while_nr = loop_while.length;
      if( (stat_loop_for_nr < 1 && stat_loop_while_nr < 1) || (stat_loop_for_nr + stat_loop_while_nr > 2) ){
        failed = true;
        hints = hints.concat( MSG.tutorials.drawingrobot['part6_2'].hints[1] );
      }
      var code;
      // checks for 'for' loop
      var nrOfSteps = 9;
      if( stat_loop_for_nr + stat_loop_while_nr === 2){
        nrOfSteps = 4;
      }

      if(stat_loop_for_nr > 0){
        var from = Number(loop_for.find("value[name='FROM']").text());
        var to = Number(loop_for.find("value[name='TO']").text());
        var by = Number(loop_for.find("value[name='BY']").text());

        // check if: the loop in the program runs nrOfStep+1 times
        if( ((to-from) / by ) !== nrOfSteps){
          failed = true;
          hints = hints.concat( MSG.tutorials.drawingrobot['part6_2'].hints[2] );
        }

        code = loop_for.find("statement[name='DO']")
      }
      // checks for 'while' loop
      if(stat_loop_while_nr > 0){


      }
      if(!failed){
        //check if: there are at least 3 move blocks
        stat_move_nr = code.find("block[type='drawingrobot_move']").length;
        if( stat_move_nr < 3){
          failed = true;
          hints = hints.concat( MSG.tutorials.drawingrobot['part6_2'].hints[3] );
        }

        //check if: There is at least 1 move block in every necessary direction (up,left,right = 0,2,3)
        code.find("block[type='drawingrobot_move']").each( function() {
          var dir = Number($(this).find("field[name='direction']")[0].textContent);
          stat_move_directions_nr[dir]++;

          var amount = Number($(this).find("field[name='NUM']")[0].textContent);
          if(amount !== 10){
            failed = true;
            hints = hints.concat( MSG.tutorials.drawingrobot['part6_2'].hints[4] );
          }
        });
        if(stat_move_directions_nr[0] < 1 || stat_move_directions_nr[2] < 1 || stat_move_directions_nr[3] < 1){
          failed = true;
          hints = hints.concat( MSG.tutorials.drawingrobot['part6_2'].hints[5] );
        }

        // check if: IF statement is present, but only when 1 loop is used
        if(nrOfSteps === 9){
          if ( code.find("block[type='controls_if']").length > 1) {
            failed = true;
            hints = hints.concat( MSG.tutorials.drawingrobot['part6_2'].hints[6] );
          }
        }
      }

      var data = {
        info : ["forBlocks","whileBlocks","moveBlocks","moveBlocksUp","moveBlocksDown","moveBlocksLeft","moveBlocksRight"],
        forBlocks : stat_loop_for_nr,
        whileBlocks : stat_loop_while_nr,
        moveBlocks : stat_move_nr,
        moveBlocksUp : stat_move_directions_nr[0],
        moveBlocksDown : stat_move_directions_nr[1],
        moveBlocksLeft : stat_move_directions_nr[2],
        moveBlocksRight : stat_move_directions_nr[3],
      }
      
      // console.log("---- STATISTICS ----");
      // console.log("nr of FOR loops: " + stat_loop_for_nr);
      // console.log("nr of WHILE loops: " + stat_loop_while_nr);
      // console.log("nr of MOVE blocks: " + stat_move_nr);
      // console.log("nr of MOVE blocks UP: " + stat_move_directions_nr[0]);
      // console.log("nr of MOVE blocks DOWN: " + stat_move_directions_nr[1]);
      // console.log("nr of MOVE blocks LEFT: " + stat_move_directions_nr[2]);
      // console.log("nr of MOVE blocks RIGHT: " + stat_move_directions_nr[3]);
      // console.log("--------------------");

      if( failed ){
        drawingrobotTutorialChecks.failed(hints);
      } else {
        DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("exercice6_2_stats", DwenguinoBlockly.tutorialIdSetting + ",data:" + data));
      }
    },


    // ---------- Part 7_1 ----------
    checkExercise7_1_1: function() {
      // check if: difficulty level is correct
      if ( DwenguinoBlockly.difficultyLevel !== 1 ){
        drawingrobotTutorialChecks.failed("",false);
      }
    },
    checkExercise7_1_2: function() {
      // check if: function block is added
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);

      if ($(xml).find("block[type='procedures_defnoreturn']").length !== 1 ) {
        drawingrobotTutorialChecks.failed("",false);
      }
    },
    checkExercise7_1_3: function() {
      // check if: function block has correct name
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      
      if ($(xml).find("block[type='procedures_defnoreturn']").find("field[name='NAME']").html().toLowerCase() !== "teken rechthoek") {
        drawingrobotTutorialChecks.failed("",false);
      }
    },
    checkExercise7_1_4: function() {
      // check if:  4 move blocks are in the function
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      var hints = "";

      var failed = false;

      // find move blocks
      blocks = $(xml).find("block[type='procedures_defnoreturn']").find("block[type='drawingrobot_move']");
      // remove next blocks = isolate the move blocks from eachother
      $(blocks[0]).find("next").remove()

      //check if: first move block is correct
      var direction = Number($(blocks[0]).find("field[name='direction']").html());
      var num = Number($(blocks[0]).find("field[name='NUM']").html());
      if(direction !== 3 || num !== 20){
        failed = true;
      }
      // check if: second move block is correct
      direction = Number($(blocks[1]).find("field[name='direction']").html());
      num = Number($(blocks[1]).find("field[name='NUM']").html());
      if(direction !== 1 || num !== 20){
        failed = true;
      }
      // check if: third move block is correct
      direction = Number($(blocks[2]).find("field[name='direction']").html());
      num = Number($(blocks[2]).find("field[name='NUM']").html());
      if(direction !== 2 || num !== 20){
        failed = true;
      }
      // check if: fourth move block is correct
      direction = Number($(blocks[3]).find("field[name='direction']").html());
      num = Number($(blocks[3]).find("field[name='NUM']").html());
      if(direction !== 0 || num !== 20){
        failed = true;
      }

      if( failed ){
        drawingrobotTutorialChecks.failed(hints, true);
      }
    },
    checkExercise7_1_5: function() {
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      var hints = "";

      blocks = $(xml).find("block[type='setup_loop_structure']").find("block[type='drawingrobot_move']");
      // check if: move blocks are removed
      var failed = ( blocks.length !== 3 );
      
      // check if: first move block is correct
      var direction = Number($(blocks[0]).find("field[name='direction']").html());
      if(direction !== 1){
        failed = true;
      }
      // check if: second move block is correct
      direction = Number($(blocks[1]).find("field[name='direction']").html());
      if(direction !== 2){
        failed = true;
      }
      // check if: third move block is correct
      direction = Number($(blocks[2]).find("field[name='direction']").html());
      if(direction !== 0){
        failed = true;
      }
  
      if( failed ){
        drawingrobotTutorialChecks.failed(hints, true);
      }
    },
    checkExercise7_1_6: function() {
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      var hints = "";

      // find function blocks
      var blocks = $(xml).find("block[type='setup_loop_structure']").find("block[type='procedures_callnoreturn']");
      // remove next blocks  = isolate the blocks from eachother
      blocks.find("next").remove();

      // check if: the function is used 4 times
      var failed = ( blocks.length !== 4 );

      // check if: the correct funtion is used
      if( !failed ){
        blocks.each(function() {
          if ( $(blocks[0]).find("mutation").attr("name").toLowerCase() !== "teken rechthoek" ) {
            failed = true;
          }
          if ( $(blocks[1]).find("mutation").attr("name").toLowerCase() !== "teken rechthoek" ) {
            failed = true;
          }
          if ( $(blocks[2]).find("mutation").attr("name").toLowerCase() !== "teken rechthoek" ) {
            failed = true;
          }
          if ( $(blocks[3]).find("mutation").attr("name").toLowerCase() !== "teken rechthoek" ) {
            failed = true;
          }
        });
      }
      

      if( failed ){
        drawingrobotTutorialChecks.failed(hints,true);
      }
    },

    // ----- part 2 -----
    checkExercise7_1_7: function() {
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      var hints = "";

      // find function block
      var block = $(xml).find("block[type='procedures_defreturn']");

      // check if: function has correct name
      var failed = (block.length !== 1 );
      var word = block.find("field[name='NAME']").html();
       if ( word !== undefined && word.toLowerCase() !== "procent berekenen" ){
         failed = true;
       }

      if( failed ){
        drawingrobotTutorialChecks.failed(hints, true);
      }
    },
    checkExercise7_1_8: function() {
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      var hints = "";
      
      // find function block
      var block = $(xml).find("block[type='procedures_defreturn']");
      
      //check if: function has 2 variables: x and y
      var failed = ( block.find("arg[name='x']").length !== 1 || block.find("arg[name='y']").length !== 1)

      if( failed ){
        drawingrobotTutorialChecks.failed(hints, true);
      }
    },
    checkExercise7_1_9: function() {
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      var hints = "";

      // find function implementation
      var block = $(xml).find("block[type='procedures_defreturn']").find("block[type='variables_declare_set_int']");

      // check if: a variable is filled in
      var failed = ( block.find("field[variabletype='Number']").length !== 1 );

      
      /* All possibilities:
      * (x/y) * 100 || 100 * (x/y)  => MULTIPLYDIVIDExy100 || MULTIPLY100DIVIDExy
      * (x*100) / y || (100*x) / y  => DIVIDEMULTIPLYx100y || DIVIDEMULTIPLY100xy
      * (100/y) * x || x * (100/y)  => MULTIPLYxDIVIDE100y || MULTIPLYDIVIDE100yx
     */
      var calc = block.find("value[name='VALUE']").text();
      var possibilities = ["MULTIPLYDIVIDExy100", "MULTIPLY100DIVIDExy","DIVIDEMULTIPLYx100y", "DIVIDEMULTIPLY100xy","MULTIPLYxDIVIDE100y","MULTIPLYDIVIDE100yx"];
      // check if correct calculation is made:
      if( !possibilities.includes(calc) ){
        failed = true;
      }


      if( failed ){
        drawingrobotTutorialChecks.failed(hints,true);
      }
    },
    checkExercise7_1_10: function() {
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      var hints = "";

      //check if: function has a return value
      block = $(xml).find("block[type='procedures_defreturn']").find("value[name='RETURN']")
      var failed = ( block.length !== 1 );

      //check if: return has correct block (type)
      if( block.find("block[type='text_join']").length !== 1){
        failed = true;
      }
      //check if: return has correct block (nr of items)
      if ( Number(block.find("mutation").attr("items")) !== 2 ) {
        failed = true;
      }

      if( failed ){
        drawingrobotTutorialChecks.failed(hints);
      }
    },
    checkExercise7_1_11: function() {
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      var hints = "";

      block = $(xml).find("block[type='procedures_defreturn']").find("value[name='RETURN']");

      // check if: first item is a variable
      var failed = ( block.find("value[name='ADD0']").find("field[variabletype='Number']").length !== 1 );
      // check if: the correct variable is used
      var varName = $(xml).find("block[type='procedures_defreturn']").find("block[type='variables_declare_set_int']").find("field[variabletype='Number']").text();
      if ( block.find("value[name='ADD0']").text() !== varName ) {
        failed = true;
      }

      // check if: second item is a string
      if (block.find("value[name='ADD1']").find("block[type='text']").length !== 1) {
        failed = true;
      }
      // check if: string is '%'
      if (block.find("value[name='ADD1']").find("block[type='text']").text() !== "%") {
        failed = true;
      }



      if( failed ){
        drawingrobotTutorialChecks.failed(hints);
      }
    },
    checkExercise7_1_12: function() {
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      var hints = "";

      var failed = drawingrobotTutorialChecks.loop();
      if(failed){
        hints = hints.concat( MSG.tutorials.drawingrobot['part2_1'].hints[0] );
      }

      block = $(xml).find("statement[name='SETUP']").find("block[type='dwenguino_lcd']");

      //check if: dwenguino lcd block is used
      if( block.length !== 1){
        failed = true;
      }

      //check if: function is used as text
      var func = block.find("value[name='text']").find("block[type='procedures_callreturn']");
      if( func.length !== 1){
        failed = true;
      }

      if ( func.find("block[type='char_type']").length !== 2 ){
        failed = true;
      }

      if( failed ){
        drawingrobotTutorialChecks.failed(hints);
      }
    },

    // ---------- Part 7_1 ----------
    checkExercise7_2: function() {
      var xml = Blockly.Xml.workspaceToDom(DwenguinoBlockly.workspace);
      var xml_text = $('<div>').append(xml).html();

      // find function names
      var fn = $(xml).find("block[type='procedures_defnoreturn']").find("field[name='NAME']");
      var l = fn.length;
      var fn_names = "";
      for(var i = 0; i < l ; i++){
        fn_names = fn_names.concat(fn[i].innerHTML,",");
      }
      // find function names with return value
      var fn_ret = $(xml).find("block[type='procedures_defreturn']").find("field[name='NAME']");
      l = fn_ret.length;
      var fn_ret_names = "";
      for(var i = 0; i < l ; i++){
        fn_ret_names = fn_ret_names.concat(fn_ret[i].innerHTML,",");
      }

      //find amount of 'color' blocks
      var color = $(xml).find("block[type='drawingrobot_color']").length;
      //find amount of 'for' blocks
      var for_blocks = $(xml).find("block[type='controls_for']").length;
      //find amount of 'if' blocks
      var if_blocks = $(xml).find("block[type='controls_if']").length;

      // find amount of variables + variable names
      var vars = $(xml).find("variable");
      l = vars.length
      var vars_names = "";
      for(var i = 0; i < l ; i++){
        vars_names = vars_names.concat(vars[i].innerHTML,",");
      }

      //find amount of 'while' blocks
      var while_blocks = $(xml).find("block[type='controls_whileUntil']").length;

      //find amount of 'math' blocks (+,-,*,/)
      var math = $(xml).find("block[type='math_arithmetic']").length;


      var data = {
        info : ["functions","function_names","functions_return","functions_return_names","colors","forBlocks","variables","whileBlocks","ifBlocks","mathBlocks","xml"],
        functions: fn.length,
        function_names: fn_names,
        functions_return: fn_ret.length,
        functions_return_names: fn_ret_names,
        colors: color,
        forBlocks : for_blocks,
        variables: vars_names,
        whileBlocks : while_blocks,
        ifBlocks: if_blocks,
        mathBlocks: math,
        xml: xml_text
      }

      DwenguinoBlockly.recordEvent(DwenguinoBlockly.createEvent("exercice7_2_stats", DwenguinoBlockly.tutorialIdSetting + ",data:" + data));
    },
  
}