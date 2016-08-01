'use strict';

(function(){
  $(document).ready(function(){
    var tiles =  helpers.serveInitial();
    $('.' + tiles[0][0]).text(tiles[0][1]);
    $('.' + tiles[1][0]).text(tiles[1][1]);
    helpers.renderColors();
  });

  $(document).on('keydown', function(e){
    var rows, new_rows, vert_rows, new_vert_rows;
    rows = helpers.getRows();
    switch (e.which){
      case 37:
        new_rows = [];
        rows.forEach(function(row){
          new_rows.push(helpers.orderRow(row));
        });
        helpers.writeRows(new_rows, rows);
        break;
      case 38:
        vert_rows = helpers.shiftDirection(rows);
        new_vert_rows = [];
        vert_rows.forEach(function(row){
          new_vert_rows.push(helpers.orderRow(row));
        });
        new_rows = helpers.shiftDirection(new_vert_rows);
        helpers.writeRows(new_rows, rows);
        break;
      case 39: 
        new_rows = [];
        rows.forEach(function(row){
          new_rows.push(helpers.orderRow(row.reverse()).reverse());
        });
        helpers.writeRows(new_rows, helpers.getRows()); // javascript mutates objects, have to re-assess page
        break;
      case 40:
        vert_rows = helpers.shiftDirection(rows);
        new_vert_rows = [];
        vert_rows.forEach(function(row){
          new_vert_rows.push(helpers.orderRow(row.reverse()).reverse());
        });
        new_rows = helpers.shiftDirection(new_vert_rows);
        helpers.writeRows(new_rows, rows);
        break;
    }
  });
})();