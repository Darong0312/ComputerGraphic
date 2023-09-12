
var brown = [1,0.9,0.4,1];
var black = [0,0,0,1];
var blue = [0,0,1,1];
var green = [0,1,0,1];

function drawAssignment(){
    // Specify the color for clearing <canvas>

    gl.clear(gl.COLOR_BUFFER_BIT);

    // wall
    let square_wall = new Point();
    square_wall.position = [0,0];
    square_wall.size = 400;
    square_wall.color = [1,1,1,1];

    g_shapeList.push(square_wall);

    // table formation
    let square1_table = new Point();
    let square2_table = new Point();
    let square3_table = new Point();
    let square4_table = new Point();

    square1_table.position = [-0.75,-0.7];
    square2_table.position = [-0.25,-0.7];
    square3_table.position = [0.25,-0.7];
    square4_table.position = [0.75,-0.7];

    square1_table.size = 150;
    square2_table.size = 150;
    square3_table.size = 150;
    square4_table.size = 150;

    square1_table.color = brown;
    square2_table.color = brown;
    square3_table.color = brown;
    square4_table.color = brown;

    g_shapeList.push(square1_table);
    g_shapeList.push(square2_table);
    g_shapeList.push(square3_table);
    g_shapeList.push(square4_table);


    // pc stand
    let pc_stand1 = new Point();
    let pc_stand2 = new Point();
    let pc_stand3 = new Point();
    let pc_stand4 = new Point();
    let pc_stand5 = new Point();
    let pc_stand6 = new Point();
    let pc_stand7 = new Point();

    pc_stand6.position = [-0.45,-0.5];
    pc_stand4.position = [-0.3,-0.5];
    pc_stand1.position = [-0.15,-0.5];
    pc_stand2.position = [0,-0.5];
    pc_stand3.position = [0.15,-0.5];
    pc_stand5.position = [0.3,-0.5];
    pc_stand7.position = [0.45,-0.5];

    pc_stand1.color = black;
    pc_stand2.color = black;
    pc_stand3.color = black;
    pc_stand4.color = black;
    pc_stand5.color = black;
    pc_stand6.color = black;
    pc_stand7.color = black;

    pc_stand1.size = 30;
    pc_stand2.size = 30;
    pc_stand3.size = 30;
    pc_stand4.size = 30;
    pc_stand5.size = 30;
    pc_stand6.size = 30;
    pc_stand7.size = 30;

    g_shapeList.push(pc_stand1);
    g_shapeList.push(pc_stand2);
    g_shapeList.push(pc_stand3);
    g_shapeList.push(pc_stand4);
    g_shapeList.push(pc_stand5);
    g_shapeList.push(pc_stand6);
    g_shapeList.push(pc_stand7);

    // connect stand and monitor 
    let pc_verticleStand1 = new Point();
    let pc_verticleStand2 = new Point();

    pc_verticleStand1.position = [0,-0.4];
    pc_verticleStand2.position = [0,-0.3];

    pc_verticleStand1.color = black;
    pc_verticleStand2.color = black;

    pc_verticleStand1.size = 20;
    pc_verticleStand2.size = 20;

    g_shapeList.push(pc_verticleStand1);
    g_shapeList.push(pc_verticleStand2);
    
    // monitor
    let pc_monitor1 = new Point();
    let pc_monitor2 = new Point();

    pc_monitor1.position = [0.3,0.05];
    pc_monitor2.position = [-0.3,0.05];

    pc_monitor1.color = black;
    pc_monitor2.color = black;

    pc_monitor1.size = 125;
    pc_monitor2.size = 125;

    g_shapeList.push(pc_monitor1);
    g_shapeList.push(pc_monitor2);

    // blue screen
    let blue_screen1 = new Point();
    let blue_screen2 = new Point();
    let blue_screen3 = new Point();

    blue_screen1.position = [-0.3,0.05];
    blue_screen2.position = [0,0.05];
    blue_screen3.position = [0.3,0.05];

    blue_screen1.size = 90;
    blue_screen2.size = 90;
    blue_screen3.size = 90;

    blue_screen1.color = blue;
    blue_screen2.color = blue;
    blue_screen3.color = blue;

    g_shapeList.push(blue_screen1);
    g_shapeList.push(blue_screen2);
    g_shapeList.push(blue_screen3);

    // plant
    let plant = new Circle();

    plant.position = [0.8,-0.1];
    plant.size = 30;
    plant.color = green;

    g_shapeList.push(plant);
    
    // pot
    let pot = new Point();
    
    pot.position = [0.8,-0.3];

    pot.size = 60;

    pot.color = [0.96,0.4,0,1];

    g_shapeList.push(pot);



    renderAllShapes();
}

function drawTable(){
    
}
