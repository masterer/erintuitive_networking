var app = new PIXI.Application();
document.body.appendChild(app.view);

app.stage.interactive = true;

var bg = PIXI.Sprite.fromImage'/assets/img/galaxy.jpg');
bg.anchor.set(0.5);

bg.x = app.screen.width / 2;
bg.y = app.screen.height / 2;

var filter = new PIXI.filters.ColorMatrixFilter();

var container = new PIXI.Container();
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

var bgFront = PIXI.Sprite.fromImage('/assets/img/purple2.jpg');
bgFront.anchor.set(0.5);

container.addChild(bgFront);

var light2 = PIXI.Sprite.fromImage('/assets/img/purple.jpg');
light2.anchor.set(0.5);
container.addChild(light2);

var light1 = PIXI.Sprite.fromImage('/assets/img/displacement_map.jpg');
light1.anchor.set(0.5);
container.addChild(light1);

var chakra =  PIXI.Sprite.fromImage('/assets/img/chakrasmine.png');
chakra.anchor.set(0.5);

container.addChild(chakra);

app.stage.addChild(container);

app.stage.filters = [filter];

var count = 0;
var enabled = true;

app.stage.on('pointertap', function() {
    $("#appView").remove();
});

/*var help = new PIXI.Text('Click or tap to turn filters on / off.', {
    fontFamily: 'Arial',
    fontSize: 12,
    fontWeight:'bold',
    fill: 'white'
});
help.y = app.screen.height - 25;
help.x = 10;

app.stage.addChild(help);*/

app.ticker.add(function(delta) {

//    bg.rotation += 0.01;
  //  bgFront.rotation -= 0.01;
    light1.rotation += 0.02;
    light2.rotation += 0.01;

    chakra.scale.x = 1 + Math.sin(count) * 0.04;
    chakra.scale.y = 1 + Math.cos(count) * 0.04;

    count += 0.1;

    var matrix = filter.matrix;

    matrix[1] = Math.sin(count) * 3;
    matrix[2] = Math.cos(count);
    matrix[3] = Math.cos(count) * 1.5;
    matrix[4] = Math.sin(count / 3) * 2;
    matrix[5] = Math.sin(count / 2);
    matrix[6] = Math.sin(count / 4);
});
