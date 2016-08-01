'use strict';

var helpers = {};

helpers.getRandom = function(){
  var tile_index = String(Math.floor((Math.random() * 16) + 1));
  var tile_number_arr = ['2','4'];
  var tile_number = tile_number_arr[Math.floor(Math.random() * tile_number_arr.length)];
  return [tile_index, tile_number];
};

helpers.serveInitial = function(){
  var tile_1 = helpers.getRandom();
  var tile_2 = helpers.getRandom();
  while (tile_1[0] == tile_2[0]) {
    tile_2 = helpers.getRandom();
  }
  return [tile_1, tile_2];
};

helpers.shiftDirection = function(rows){
  var new_rows = Array.apply(null, Array(4)).map(function(){return ['', '', '', '']});
  rows.forEach(function(row, row_idx){
    row.forEach(function(tile, tile_idx){
      new_rows[tile_idx][row_idx] = tile;
    });
  });
  return new_rows;
};

helpers.newTile = function(){
  var new_tile = helpers.getRandom();
  while ($('.' + new_tile[0]).text()) {
    new_tile = helpers.getRandom();
  }
  return new_tile;
};

helpers.addTile = function(){
  var new_tile = helpers.newTile();
  $('.' + new_tile[0]).text(new_tile[1]);
}

helpers.getRows = function(){
  var rows = [];
  var working_row = [];
  var tile_number, tile_value;
  $('.tile').each(function(){
    tile_number = Number($(this).attr('class').split(' ')[1]);
    tile_value = $(this).text();
    working_row.push(tile_value);
    if (tile_number % 4 === 0) {
      rows.push(working_row);
      working_row = [];
    }
  });  
  return rows;
};

helpers.orderRow = function(row){
  var working_row = [];
  var new_row = [];
  var tile_number, new_tile_number;
  var last_tile = '';

  row.forEach(function(tile, idx){
    if (tile){
      working_row.push(tile);
    }
  });

  working_row.forEach(function(tile, idx){
    if (tile === last_tile){
      new_row.push(String(Number(tile) * 2));
      last_tile = '';
    } else if (idx === (working_row.length - 1)) {
      if (last_tile){
        new_row.push(last_tile);
      }
      new_row.push(tile);
    } else {
      if (last_tile){
        new_row.push(last_tile);
      } 
      last_tile = tile;
    }
  });
  
  var empties_arr = Array.apply(null, Array(4 - new_row.length)).map(function(){return ""});
  new_row.push.apply(new_row, empties_arr);
  return new_row;
}

helpers.writeRows = function(new_rows, rows){
  if (JSON.stringify(new_rows) == JSON.stringify(rows)){
    return false;
  }

  var tile_pos;
  new_rows.forEach(function(row, row_idx){
    row.forEach(function(tile, tile_idx){
      tile_pos = row_idx * 4 + tile_idx + 1;
      $('.' + String(tile_pos)).text(tile);
    });
  });

  helpers.addTile();

  if (helpers.checkGameOver()) {
    alert('Game Over!');
  }

  if (helpers.checkWonGame()) {
    alert('Congratulations! You win!');
  }

  helpers.renderColors();
};

helpers.checkWonGame = function(){
  var won_game = false;
  $('.tile').each(function(){
    if ($(this).text() === '2048'){
      won_game = true;
    }
  });
  return won_game;
};

helpers.checkGameOver = function(){
  var rows = helpers.getRows();
  var vert_rows = helpers.shiftDirection(rows);
  var game_over = true;

  rows.some(function(row){
    if (helpers.checkValidRow(row)){
      game_over = false;
      return false;
    }
  });

  vert_rows.some(function(row){
    if (helpers.checkValidRow(row)){
      game_over = false;
      return false;
    }
  });

  return game_over;
};

helpers.checkValidRow = function(row){
  var valid_row = false;
  var last_tile = '';
  row.some(function(tile){
    if (!tile || tile == last_tile){
      valid_row = true;
      return false;
    }
    last_tile = tile;
  });
  return valid_row;
};

helpers.renderColors = function(){
  var tile_text, half_tile_text, classes, tile;
  $('.tile').each(function(){
    classes = $(this).attr('class').split(' ');
    tile = this;
    classes.some(function(hit){
      if (hit.match(/tile_/)){
        $(tile).removeClass(hit);
      }
    });
    if ($(tile).text()){
      tile_text = $(tile).text();
      half_tile_text = String(Number(tile_text) / 2.0)
      $(tile).addClass('tile_' + tile_text);
    }
  });
};